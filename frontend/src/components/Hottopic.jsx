import React from 'react'
import Q from '../assets/q.svg'

const Hottopic = ({ topic, dp, bg }) => {

    return (
        <>
            
                <div className=''>
                    <div className='border-black border-2 relative shadow-lg shadow-slate-300 rounded-2xl h-72 m-4  '>
                        <img className=' w-full h-full object-cover rounded-2xl' src={bg} alt="" />
                        <div className=' absolute left-14 bottom-0 border-4  translate-y-1/2 z-20 h-40 w-40 rounded-full overflow-hidden '>
                            <img className=' h-full w-full object-cover' src={dp} alt="" />
                        </div>
                    </div>
                    <div className='flex items-center gap-2 underline justify-end mr-8 text-center text-4xl font-bold'><img src={Q} alt="" /><span>{topic}</span></div>
                    <div className='h-[1.5px] bg-gray-800 mt-10'></div>
                </div>

          
        </>
    )
}

export default Hottopic
