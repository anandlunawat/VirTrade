import CompanyCards from "./api/Components/CompanyCards";
import Market from "./api/Components/Market";
export default function Staking() {
    return (
        <Market>
            <div className="py-20 h-fit xl:ml-[30%] flex flex-col m-4 gap-2">
                <span>STAKING</span>
                <div className="flex flex-row gap-2">
                    <div className="flex flex-col gap-2">
                        <button className="flex flex-col p-2 rounded-lg bg-[#2a2929] w-60">
                            <span>NIFTY</span>
                            <span className="text-green-500">19590</span>
                        </button>
                        <button className="flex flex-col p-2 rounded-lg bg-[#2a2929] w-60">
                            <span>SENSEX</span>
                            <span className="text-green-500">65900</span>
                        </button>
                        <button className="flex flex-col p-2 rounded-lg bg-[#2a2929] w-60">
                            <span>NIFTY BANK</span>
                            <span className="text-red-500">50000</span>
                        </button>
                    </div>
                    <div className="basis-3/4 bg-[#2a2929] w-full">

                    </div>
                </div>
                <CompanyCards />
            </div>        
        </Market>
    )
}