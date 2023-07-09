import {RiStockLine} from 'react-icons/ri'
// import { useEffect } from 'react'

export default function Details() {
    const style = {
        borderImage : 'linear-gradient(to bottom, #22c55e 30%, #ef4444 80%)',
        borderImageSlice : 1
    }
    return (
        <div className='w-full h-full mt-6'>
            <div className='flex flex-row' id='details'>
                <div className='flex flex-col'>
                    <div className='w-[40px] h-[40px] rounded-full ml-[15px] shadow-[0px_0px_20px_5px] shadow-green-500'>
                        <RiStockLine fill='white' className='p-1 text-4xl'/>
                    </div>
                    <div className='border-l-2 h-[500px] ml-8 mt-6' style={style}></div>
                </div>
                <div className=' flex flex-col ml-[19px] text-white gap-7 2xl:top-[650px] w-11/12 max-sm:top-[800px] max-sm:ml-0'>
                    <div className='text-2xl font-semibold'>
                        Virtual Trading 
                    </div>
                    <div className='flex flex-row text-white'>
                        <div className='text-3xl font-light max-sm:basis-full'>
                        <span> Financial Simulator allow a trader to generate strategies by working on the Virtual Trading platforms that give access to real-time stock data. </span>
                        {/* In Financial simulators, a trader or a player is given virtual money, to begin with the investment and trading process. */}
                        </div>
                        {/* <div className='pointer-events-none basis-1/2'>
                            <img src='/Chart1.jpg' className='h-[70%] float-right'/>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}