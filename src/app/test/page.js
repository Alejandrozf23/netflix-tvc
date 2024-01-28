"use client";

import { motion } from "framer-motion";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getAllQuestions } from "@/utils";

let questions = [];

function UnauthBanner({ router }) {
    async function getAllMedias() {
        questions = await getAllQuestions();
        console.log(questions, "questions");
    }

    getAllMedias();
    
    return (<div>{questions.length}</div>);
}

export default function UnauthPage() {
    const router = useRouter();
    const [showCurrentAns, setShowCurrentAns] = useState(null);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}>
            <main>
                <div className="bg-[#000000]">
                    <UnauthBanner router={router} />
                    <div className="border-b-8 border-gray-800 pb-8">
                        <div className="flex flex-col h-[85vh] lg:h-[95vh] text-white px-8 sm:px-14 md:px-28 lg:px-48 xl:px-80 mt-3 sm:mt-14">
                            <h1 className="mb-5 text-xl sm:text-3xl md:text-4xl lg:text-5xl text-bold text-center px-14 md:px-0">
                                Frequently asked questions
                            </h1>
                            {questions.map((item, index) => (
                                <div className="flex flex-col gap-3" key={item.key}>
                                    <div onClick={() => setShowCurrentAns(showCurrentAns === index ? null : index)}
                                        className="flex justify-between p-3 lg:p-5 mt-2 bg-[#303030] cursor-pointer">
                                        <h2>{item.question}</h2>
                                        <PlusIcon className="h-7 w-7" color="white" />
                                    </div>
                                    {showCurrentAns === index && (
                                        <div className="p-3 lg:p-5 mt-2 bg-[#303030] cursor-pointer">
                                            {item.answer}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </motion.div>
    );
}