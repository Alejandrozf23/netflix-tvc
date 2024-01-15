'use client'

import Image from "next/image"
import { motion } from "framer-motion"
import { PlusIcon, ChevronDownIcon, CheckIcon } from "@heroicons/react/24/outline"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { GlobalContext } from "@/context"
import { useSession } from "next-auth/react"

export default function MediaData({media, searchView = false, similarMovieView = false}) {
    const router = useRouter();
    const { data: session } = useSession();
    const baseUrl = "https://image.tmdb.org/t/p/original";
    const {currentMediaInfoIdAndType, setCurrentMediaInfoIdAndType, 
        showDetailspopup, setShowDetailsPopup, loggedInAccount} = useContext(GlobalContext);

    async function handleAddToFavorites(item) {
        const { backdrop_path, poster_path, id, type } = item;
        const response = await fetch('/api/favorites/add-favorite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                backdrop_path,
                poster_path,
                movieID: id,
                type,
                uid: session?.user?.uid,
                accountID: loggedInAccount?._id,
            }),
        });

        const data = await response.json();

        console.log(data, 'adejesuszf');
    }

    async function handleRemoveFavorites(item) {

    }

    return (<motion.div
        initial={{opacity: 0, scale: 0.5}}
        animate={{opacity: 1, scale: 1}}
        transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
        }}>
        <div className="relative cardWrapper h-28 min-w-[180px] cursor-pointer md:h-36 md:min-w-[260px] transform transition duration-500 hover:scale-110 hover:z-[999]">
            <Image
                src={`${baseUrl}${media?.backdrop_path || media?.poster_path}`}
                alt="Media"
                fill={true}
                sizes="100vw"
                className="rounded sm object-cover md:rounded hover:rounded-sm"
                onClick={() => router.push(`/watch/${media?.type}/${media?.id}`) }
            />
            <div className="space-x-3 hidden absolute p-2 bottom-0 buttonWrapper">
                <button onClick={
                    media?.addedToFavorites 
                        ? () => handleRemoveFavorites(media) 
                        : () => handleAddToFavorites(media)}
                    className="cursor-pointer border flex p-2 items-center gap-x-2 rounded-full text-sm
                    font-semibold transition hover:opacity-90 border-white bg-black opacity-75 text-black">
                    {
                        media?.addedToFavorites ? 
                            (<CheckIcon color="#ffffff" className="h-7 w-7"/>):
                            (<PlusIcon color="#ffffff" className="h-7 w-7"/>)
                    }
                </button>
                <button onClick={() => {
                    setShowDetailsPopup(true);
                    setCurrentMediaInfoIdAndType({
                        type: media?.type,
                        id: media?.id,
                    });
                }}
                    className="cursor-pointer p-2 border flex items-center gap-x-2 rounded-full
                    text-sm font-semibold transition hover:opacity-90 border-white bg-black opacity-75">
                    <ChevronDownIcon  color="#ffffff" className="h-7 w-7"/>
                </button>
            </div>
        </div> 
    </motion.div>);
}