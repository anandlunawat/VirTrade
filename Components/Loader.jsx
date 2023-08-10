import styles from "../styles/loader.module.css";

export default function Loader() {
    return (
        <div className="h-screen">
            <div className={`flex flex-row gap-12 border-[1px] p-2 rounded-lg border-gray-800 m-2`}>
                <span className={`text-lg bg-opacity-40 rounded-lg bg-[#262424] font-semibold ${styles.loader}`}></span>                        
                <span className="text-lg font-semibold text-white uppercase basis-1/2"></span>                        
                <button className="w-10 h-10 ml-auto text-2xl"></button>
            </div>            
            <div className={`flex flex-row gap-12 border-[1px] p-2 rounded-lg border-gray-800 m-2`}>
                <span className={`text-lg bg-opacity-40 rounded-lg bg-[#262424] font-semibold ${styles.loader}`}></span>                        
                <span className="text-lg font-semibold text-white uppercase basis-1/2"></span>                        
                <button className="w-10 h-10 ml-auto text-2xl"></button>
            </div>            
            <div className={`flex flex-row gap-12 border-[1px] p-2 rounded-lg border-gray-800 m-2`}>
                <span className={`text-lg bg-opacity-40 rounded-lg bg-[#262424] font-semibold ${styles.loader}`}></span>                        
                <span className="text-lg font-semibold text-white uppercase basis-1/2"></span>                        
                <button className="w-10 h-10 ml-auto text-2xl"></button>
            </div>            
            <div className={`flex flex-row gap-12 border-[1px] p-2 rounded-lg border-gray-800 m-2`}>
                <span className={`text-lg bg-opacity-40 rounded-lg bg-[#262424] font-semibold ${styles.loader}`}></span>                        
                <span className="text-lg font-semibold text-white uppercase basis-1/2"></span>                        
                <button className="w-10 h-10 ml-auto text-2xl"></button>
            </div>            
            <div className={`flex flex-row gap-12 border-[1px] p-2 rounded-lg border-gray-800 m-2`}>
                <span className={`text-lg bg-opacity-40 rounded-lg bg-[#262424] font-semibold ${styles.loader}`}></span>                        
                <span className="text-lg font-semibold text-white uppercase basis-1/2"></span>                        
                <button className="w-10 h-10 ml-auto text-2xl"></button>
            </div>
        </div>
    )
}