'use client'

import { XMarkIcon, PlusIcon, 
    HandThumbUpIcon, SpeakerWaveIcon, 
    SpeakerXMarkIcon } from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import MuiModal from "@mui/material/Modal";

export default function DetailsPopup({show, setShow, media}) {
    function handleClose() {
        setShow(false);
    }

    return (<motion.div initial={{opacity: 0, scale: 0.5}}
        animate={{opacity: 1, scale: 1}}
        transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
        }}>
            <MuiModal
            open={show}
            onClose={handleClose}
            className="fixed !top-7 left-0 right-0 z-50 w-full mx-auto max-w-5x1 
                overflow-hidden overflow-y-scroll rounded-md scrollbar-hide">
                    <div>
                        <button onClick={handleClose}
                            className="modalButton flex items-center justify-center absolute 
                                top-5 right-5 bg-[#181818] !z-40 border-none h-9 w-9">
                            <XMarkIcon className="h-6 w-6"/>
                        </button>
                    </div>
            </MuiModal>
    </motion.div>)
}