'use client'
import { motion } from 'framer-motion'

export default function AccountForm({showAccountForm, formData, setFormData, handleSave}) {
    return (showAccountForm &&
        <motion.div initial={{opacity: 0}} 
            whileInView={{opacity:1}} 
            viewport={{once: true}}>
            <div className='px-8 py-8 h-[300px] fixed top-[10px] gap-3 flex
                flex-col items-start right-[10px] bg-black opacity-[0.85] z-[999]'>
                <div className='flex flex-col gap-5'>
                    <input name='name' type='text' value={formData['name']}
                        onChange={(e) => setFormData({...formData, [e.target.name] : e.target.value})}
                        placeholder='Enter your name!'
                        className='px-5 py-3 rounded-lg placeholder:text-red-700 
                        text-lg text-[#E5B109] outline-none focus:outline-none'/>
                    <input name='pwd' type='password' value={formData['pwd']}
                        onChange={(e) => setFormData({...formData, [e.target.name] : e.target.value})}
                        maxLength={4}
                        placeholder='Enter your password!'
                        className='px-5 py-3 rounded-lg placeholder:text-red-700 
                        text-lg text-[#E5B109] outline-none focus:outline-none'/>
                    <button className='border p-4 bg-[#E5B109] outline-none rounded-lg text-black 
                        text-lg font-bold' onClick={handleSave}>
                        Save
                    </button>
                </div>
            </div>
        </motion.div>
    );
}