'use client'

import ManageAccounts from "@/components/manage-account"
import UnauthPage from "@/components/unauth-page";
import CommonLayout from "@/components/common-layout";
import { GlobalContext } from "@/context";
import { useSession } from "next-auth/react"
import { useContext, useEffect } from "react";
import { getAllfavorites, getPopularMedias, getTopRatedMedias, getTrendingMedias } from "@/utils";
import CircleLoader from "@/components/circle-loader";

export default function Browse() {

    const { loggedInAccount, mediaData, setMediaData, pageLoader, setPageLoader, } = useContext(GlobalContext);

    const { data: session } = useSession();

    useEffect(() => {
        async function getAllMedias() {
            const trendingTvSHow = await getTrendingMedias('tv');
            const popularTvSHow = await getPopularMedias('tv');
            const topratedTvSHow = await getTopRatedMedias('tv');

            const trendingMovieSHow = await getTrendingMedias('movie');
            const popularMovieSHow = await getPopularMedias('movie');
            const topratedMovieSHow = await getTopRatedMedias('movie');
            const allfavorites = await getAllfavorites(session?.user?.uid, loggedInAccount?._id);

            setMediaData(
                [
                    ...[
                        {
                            id: "trendingtvshows",
                            title: "Trending TV Shows",
                            medias: trendingTvSHow
                        },
                        {
                            id: "populartvshows",
                            title: "Popular TV Shows",
                            medias: popularTvSHow
                        },
                        {
                            id: "topratedtvshows",
                            title: "Top rated TV Shows",
                            medias: topratedTvSHow
                        }
                    ].map(item => ({
                        ...item,
                        medias: item.medias.map(mediaItem => ({
                            ...mediaItem,
                            type: "tv",
                            addedToFavorites: allfavorites && allfavorites.length ?
                                allfavorites.map(fav => fav.movieID).indexOf(mediaItem.id) > -1 : false,
                        }))
                    })),
                    ...[
                        {
                            id: "trendingmoviesshows",
                            title: "Trending Movies Shows",
                            medias: trendingMovieSHow
                        },
                        {
                            id: "popularmoviesshows",
                            title: "Popular Movies Shows",
                            medias: popularMovieSHow
                        },
                        {
                            id: "topratedmoviesshows",
                            title: "Top rated Movies Shows",
                            medias: topratedMovieSHow
                        }
                    ].map(item => ({
                        ...item,
                        medias: item.medias.map(mediaItem => ({
                            ...mediaItem,
                            type: "movie",
                            addedToFavorites: allfavorites && allfavorites.length ?
                                allfavorites.map(fav => fav.movieID).indexOf(mediaItem.id) > -1 : false,
                        }))
                    }))
                ]
            );
            setPageLoader(false);
        }

        getAllMedias();
    }, []);

    if (session === null) return <UnauthPage/>
    
    if (loggedInAccount === null) return <ManageAccounts/>

    if (pageLoader) return <CircleLoader/>



    return <main className="flex min-h-screen flex-col">
        <CommonLayout mediaData={mediaData}/>
    </main>
}