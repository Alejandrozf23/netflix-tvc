'use client'

import Image from "next/image";

const baseUrl = "https://image.tmdb.org/t/p/original"

export default function Banner({ medias }) {
    const createRandomMedia = medias && medias.length ?
        medias[Math.floor(Math.random() * medias.length)] : null;

    return <div className="flex flex-col space-y-2 py-16 md:space-y-4 
        lg:h-[65vh] lg:justify-end lg:pb-12 lg:pl-24">
        <div className="absolute top-0 left-0 h-[95hv] w-screen -z-10" style={{position:"absolute" }}>
            <Image
                src={`${baseUrl}/${createRandomMedia?.backdrop_path || createRandomMedia?.poster_path}`}
                alt="Banner"
                fill priority
                object-fit="cover"                
            />
            <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
        </div>
    </div>
}