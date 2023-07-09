import CompanyCards from "./api/Components/CompanyCards";
import Market from "./api/Components/Market";
export default function Staking() {
    return (
        <Market>
            <div className="py-16 h-fit xl:ml-[22%] flex flex-col m-4 gap-2">
                <span>STAKING</span>
                <div className="flex max-md:flex-col md:h-[200px] flex-row gap-2">
                    <div className="flex flex-col gap-2">
                        <button className="flex flex-col p-2 bg-opacity-40 rounded-lg bg-[#262424] md:w-60">
                            <span>NIFTY</span>
                            <span className="text-green-500">19590</span>
                        </button>
                        <button className="flex flex-col p-2 bg-opacity-40 rounded-lg bg-[#262424] md:w-60">
                            <span>SENSEX</span>
                            <span className="text-green-500">65900</span>
                        </button>
                        <button className="flex flex-col p-2 bg-opacity-40 rounded-lg bg-[#262424] md:w-60">
                            <span>NIFTY BANK</span>
                            <span className="text-red-500">50000</span>
                        </button>
                    </div>
                    <div className="md:basis-3/4 rounded-lg bg-opacity-40 bg-[#262424] w-full">                        
                        <img src="/chart.png" alt="Nifty" className="p-2 h-[199px] w-full"/>
                    </div>
                </div>
                <CompanyCards />
            </div>        
        </Market>
    )
}