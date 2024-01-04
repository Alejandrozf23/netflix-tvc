'use client'

import Image from "next/image";

const baseUrl = "https://image.tmdb.org/t/p/original"

export default function Banner({ medias }) {
    const createRandomMedia = medias && medias.length ?
        medias[Math.floor(Math.random() * medias.length)] : null;

    return <div className="flex flex-col space-y-2 py-16 md:space-y-4 
        lg:h-[65vh] lg:justify-end lg:pb-12 lg:pl-24">
        <div className="absolute top-0 left-0 h-[95hv] w-screen -z-10" style={{ height: '25%', width: '100%' }}>
            <Image
                src={`${baseUrl}/${createRandomMedia?.backdrop_path || createRandomMedia?.poster_path}`}
                alt="Banner"
                fill priority
                sizes="(max-width: 100%) 100vw, (max-width: 100%) 50vw, 800px"
                objectfit="cover"/>
            <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20"/>
        </div>
        <h1 className="text-2x1 md:text-4x1 lg:text-7x1 font-bold">
            {createRandomMedia?.title || createRandomMedia?.name || createRandomMedia?.original_name}
        </h1>
    </div>
}