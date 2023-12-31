'use client'

import ManageAccounts from "@/components/manage-account"
import UnauthPage from "@/components/unauth-page";
import CommonLayout from "@/components/common-layout";
import { GlobalContext } from "@/context";
import { useSession } from "next-auth/react"
import { useContext, useEffect } from "react";
import { getPopularMedias, getTopRatedMedias, getTrendingMedias } from "@/utils";
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

            setMediaData(
                [
                    ...[
                        {
                            title: "Trending TV Shows",
                            medias: trendingTvSHow
                        },
                        {
                            title: "Popular TV Shows",
                            medias: popularTvSHow
                        },
                        {
                            title: "Top rated TV Shows",
                            medias: topratedTvSHow
                        }
                    ].map(item => ({
                        ...item,
                        medias: item.medias.map(mediaItem => ({
                            ...mediaItem,
                            type: "tv"
                        }))
                    })),
                    ...[
                        {
                            title: "Trending Movies Shows",
                            medias: trendingMovieSHow
                        },
                        {
                            title: "Popular Movies Shows",
                            medias: popularMovieSHow
                        },
                        {
                            title: "Top rated Movies Shows",
                            medias: topratedMovieSHow
                        }
                    ].map(item => ({
                        ...item,
                        medias: item.medias.map(mediaItem => ({
                            ...mediaItem,
                            type: "movie"
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

    console.log(mediaData);

    return <main className="flex min-h-screen flex-col">
        <CommonLayout/>
    </main>
}