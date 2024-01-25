'use client'

import { getAllQuestions } from "@/utils";
import { PlusIcon } from "@heroicons/react/24/outline";

let questions = [];

export default function Test() {
    async function getAllMedias() {
        questions = await getAllQuestions();
    }

    getAllMedias();
    return (<div>
        {questions.map((item, index) => (
            <div className="flex flex-col gap-3" key={item.key}>
                <div className="flex justify-between p-3 lg:p-5 mt-2 bg-[#303030] cursor-pointer">
                    <h2>{item.question}</h2>
                    <PlusIcon className="h-7 w-7" color="white" />
                </div>
                <div className="p-3 lg:p-5 mt-2 bg-[#303030] cursor-pointer">
                    {item.answer}
                </div>
            </div>
        ))}
    </div>);
}