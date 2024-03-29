'use client'

import CircleLoader from "@/components/circle-loader";
import CommonLayout from "@/components/common-layout";
import ManageAccounts from "@/components/manage-account";
import UnauthPage from "@/components/unauth-page";
import { GlobalContext } from "@/context";
import { getAllfavorites, getTVorMoviesByGenre } from "@/utils";
import { useSession } from "next-auth/react"
import { useContext, useEffect } from "react";

export default function TV() {
    const { data: session } = useSession();
    const { loggedInAccount, mediaData, setMediaData, pageLoader, setPageLoader, } = useContext(GlobalContext);

    useEffect(() => {
        async function getAllMedias() {
            const origin = "TV-getAllMedias/useEffect";
            const actionAdventure = await getTVorMoviesByGenre("tv", 10759);
            const crime = await getTVorMoviesByGenre("tv", 80);
            const comedy = await getTVorMoviesByGenre("tv", 35);
            const family = await getTVorMoviesByGenre("tv", 10751);
            const mystery = await getTVorMoviesByGenre("tv", 9648);
            const reality = await getTVorMoviesByGenre("tv", 10764);
            const scifiAndFantasy = await getTVorMoviesByGenre("tv", 10765);
            const war = await getTVorMoviesByGenre("tv", 10768);
            const western = await getTVorMoviesByGenre("tv", 37);
            const dramaMovies = await getTVorMoviesByGenre("tv", 18);
            const allfavorites = await getAllfavorites(session?.user?.uid, loggedInAccount?._id, origin);

            setMediaData(
                [
                    {
                        title: "Action and adventure",
                        medias: actionAdventure,
                        id: 'actionAdventure',
                    },
                    {
                        title: "Crime",
                        medias: crime,
                        id: 'crime',
                    },
                    {
                        title: "Comedy",
                        medias: comedy,
                        id: 'comedy',
                    },
                    {
                        title: "Family",
                        medias: family,
                        id: 'family',
                    },
                    {
                        title: "Mystery",
                        medias: mystery,
                        id: 'mystery',
                    },
                    {
                        title: "Reality",
                        medias: reality,
                        id: 'reality',
                    },
                    {
                        title: "Sci-Fi and Fantasy",
                        medias: scifiAndFantasy,
                        id: 'scifiAndFantasy',
                    },
                    {
                        title: "Western",
                        medias: western,
                        id: 'western',
                    },
                    {
                        title: "War",
                        medias: war,
                        id: 'war',
                    },
                    {
                        title: "Dramas",
                        medias: dramaMovies,
                        id: 'dramaMovies',
                    },
                ].map((item) => ({
                    ...item,
                    medias: item.medias.map((mediaItem) => ({
                        ...mediaItem,
                        type: "tv",
                        addedToFavorites: allfavorites && allfavorites.length ?
                                allfavorites.map(fav => fav.movieID).indexOf(mediaItem.id) > -1 : false,
                    })),
                }))
            );
            setPageLoader(false);
        }

        getAllMedias();
    }, [loggedInAccount]);

    if (session === null) return <UnauthPage />

    if (loggedInAccount === null) return <ManageAccounts />

    if (pageLoader) return <CircleLoader/>

    return <main className="flex min-h-screen flex-col">
        <CommonLayout mediaData={mediaData} />
    </main>
}