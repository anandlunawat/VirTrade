import { useState , useEffect } from "react";

export default function CompanyCards(props) {  
    
    const[hydrated,isHydrated] = useState(false)
    useEffect(()=>{
      isHydrated(true)
    },[])
    
    return (
        !hydrated ? null :
        <div className="flex flex-row gap-10 pt-4 md:flex-wrap max-md:flex-col">
            {   
                props.watchLists.map((watchList) => (                    
                    <div key={watchList.token} className="flex flex-col bg-opacity-40 gap-2 bg-[#262424] items-center md:w-72 h-fit rounded-lg justify-center px-4 py-2 text-center">                        
                        <span>{props.ltp.token == watchList.token ? props.ltp.lastTradedPrice /100 : ""}</span>
                        <span className="text-green-500">{watchList.symbol}</span>
                        <div className="flex flex-row gap-8 font-bold text-white">
                            <button className="px-3 py-1 border-2 border-green-500 rounded-lg shadow-sm hover:bg-green-500 hover:text-black 2xl:py-3 shadow-green-500 2xl:px-7">BUY</button>
                            <button className="px-3 py-1 ml-auto border-2 border-red-500 rounded-lg shadow-sm hover:bg-red-500 hover:text-black 2xl:py-3 shadow-red-500 2xl:px-7">SELL</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}