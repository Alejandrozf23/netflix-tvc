'use client'

import CircleLoader from "@/components/circle-loader";
import ManageAccounts from "@/components/manage-account";
import UnauthPage from "@/components/unauth-page";
import { motion } from "framer-motion";
import { GlobalContext } from "@/context";
import { getAllfavorites, getTVorMovieSearchResults } from "@/utils";
import { useSession } from "next-auth/react"
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import Navbar from "@/components/navbar";
import MediaItem from "@/components/media-item";

export default function Search() {
    
    const params = useParams();
    const { loggedInAccount, searchResults, setSearchResults, pageLoader, setPageLoader } = useContext(GlobalContext);
    const { data: session } = useSession();

    useEffect(() => {
        async function getSearchResults() {
            const origin = "Search-getSearchResults/useEffect"
            const series = await getTVorMovieSearchResults('tv', params.query);
            const movies = await getTVorMovieSearchResults('movie', params.query);
            const allfavorites = await getAllfavorites(session?.user?.uid, loggedInAccount?._id, origin);
            
            setSearchResults(
                [
                    ...series.filter(
                        item => item.backdrop_path !== null && item.poster_path !== null)
                        .map(serieItem => ({
                            ...serieItem,
                            type: 'tv',
                            addedToFavorites: allfavorites && allfavorites.length ?
                                allfavorites.map(fav => fav.movieID).indexOf(serieItem.id) > -1 : false,
                        })),
                    ...movies.filter(
                        item => item.backdrop_path !== null && item.poster_path !== null)
                        .map(movieItem => ({
                            ...movieItem,
                            type: 'movie',
                            addedToFavorites: allfavorites && allfavorites.length ?
                                allfavorites.map(fav => fav.movieID).indexOf(movieItem.id) > -1 : false,
                        })),
                ]
            );
            setPageLoader(false);
        }
        getSearchResults();
    },[loggedInAccount]);

    if (session === null) return <UnauthPage/>

    if (loggedInAccount === null) return <ManageAccounts/>

    if (pageLoader) return <CircleLoader />

    return (<motion.div
        initial={{opacity: 0}}
        whileInView={{opacity: 1}}
        viewport={{once: true}}> 
        <Navbar/>
        <div className="mt-[100px] space-y-0.5 md:space-y-2 px-4">
            <h2 className="cursor-pointer text-sm font-semibold text-[#e5e5e5] transition-colors duration-200 hover:text-white md:text-2xl">
                Showing Results for {decodeURI(params.query)}
            </h2>
            <div className="grid grid-cols-5 gap-3 items-center scrollbar-hide md:p-2">
                {
                    searchResults && searchResults.length ? 
                    searchResults.map(searchItem => (
                        <MediaItem key={searchItem.id} media={searchItem} searchView={true}/>
                    ))
                    : null
                }
            </div>
        </div>
    </motion.div>)
}