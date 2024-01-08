'use client'

import CircleLoader from "@/components/circle-loader";
import CommonLayout from "@/components/common-layout";
import ManageAccounts from "@/components/manage-account";
import UnauthPage from "@/components/unauth-page";
import { GlobalContext } from "@/context";
import { getTVorMoviesByGenre } from "@/utils";
import { useSession } from "next-auth/react"
import { useContext, useEffect } from "react";

export default function Movies() {

    const { loggedInAccount, mediaData, setMediaData, pageLoader, setPageLoader, } = useContext(GlobalContext);

    const { data: session } = useSession();

    useEffect(() => {
        async function getAllMedias() {
            const action = await getTVorMoviesByGenre("movie", 28);
            const adventure = await getTVorMoviesByGenre("movie", 12);
            const crime = await getTVorMoviesByGenre("movie", 80);
            const comedy = await getTVorMoviesByGenre("movie", 35);
            const family = await getTVorMoviesByGenre("movie", 10751);
            const mystery = await getTVorMoviesByGenre("movie", 9648);
            const romance = await getTVorMoviesByGenre("movie", 10749);
            const scifiAndFantasy = await getTVorMoviesByGenre("movie", 878);
            const war = await getTVorMoviesByGenre("movie", 10752);
            const history = await getTVorMoviesByGenre("movie", 36);
            const drama = await getTVorMoviesByGenre("movie", 18);
            const thriller = await getTVorMoviesByGenre("movie", 53);
            const horror = await getTVorMoviesByGenre("movie", 27);

            setMediaData(
                [
                    {
                        title: "Action",
                        medias: action,
                        id: 'action',
                    },
                    {
                        title: "Adventure",
                        medias: adventure,
                        id: 'adventure',
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
                        title: "Horror",
                        medias: horror,
                        id: 'horror',
                    },
                    {
                        title: "History",
                        medias: history,
                        id: 'history',
                    },
                    {
                        title: "Romance",
                        medias: romance,
                        id: 'romance',
                    },
                    {
                        title: "Sci-Fi and Fantasy",
                        medias: scifiAndFantasy,
                        id: 'scifiAndFantasy',
                    },
                    {
                        title: "Thriller",
                        medias: thriller,
                        id: 'thriller',
                    },
                    {
                        title: "War",
                        medias: war,
                        id: 'war',
                    },
                    {
                        title: "Dramas",
                        medias: drama,
                        id: 'drama',
                    },
                ].map((item) => ({
                    ...item,
                    medias: item.medias.map((mediaItem) => ({
                        ...mediaItem,
                        type: "movie",
                        addedToFavorites: false
                    })),
                }))
            );
            setPageLoader(false);
        }
        getAllMedias();
    }, [loggedInAccount]);

    if (session === null) return <UnauthPage />

    if (loggedInAccount === null) return <ManageAccounts />

    if (pageLoader) return <CircleLoader />

    return <main className=" flex min-h-screen flex-col">
        <CommonLayout mediaData={mediaData} />
    </main>
}