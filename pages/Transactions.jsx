import Market from "../Components/Market";
export default function Transactions() {
    return (
        <Market>
            <div className="mt-[20px] h-fit xl:ml-[22%] flex flex-col m-4 gap-4">
                <span>Pending Orders</span>
                <div className="flex p-4 flex-row basis-1/2 bg-opacity-40 rounded-lg bg-[#262424]">
                    <div className="flex flex-col gap-4 basis-1/2">
                        <div className="flex gap-8">RELIANCE<span className="text-green-500">NSE</span></div>
                        <span>0/500</span>
                    </div>
                    <div className="flex flex-col gap-4 ml-auto text-center">
                        <span>Ordered Value</span>
                        <span>LTP</span>
                    </div>
                </div>
                <span>Orders Completed</span>
                <div className="bg-[#262424] bg-opacity-40 rounded-lg flex flex-col">
                    <div className="border-b-[1px] p-2 flex flex-row">
                        <div className="flex flex-col gap-1">
                            <span>Withdraw via DLF</span>
                            <span className="text-[#959494]">Date</span>
                        </div>
                        <div className="flex flex-col ml-auto">
                            <div className="flex gap-2 text-green-500">+1.00<span className="text-white">₹</span></div>
                        </div>
                    </div>
                    <div className="border-b-[1px] p-2 flex flex-row">
                        <div className="flex flex-col gap-1">
                            <span>Withdraw via DLF</span>
                            <span className="text-[#959494]">Date</span>
                        </div>
                        <div className="flex flex-col ml-auto">
                            <div className="flex gap-2 text-green-500">+1.00<span className="text-white">₹</span></div>
                        </div>
                    </div>            
                    <div className="border-b-[1px] p-2 flex flex-row">
                        <div className="flex flex-col gap-1">
                            <span>Investment in DLF</span>
                            <span className="text-[#959494]">Date</span>
                        </div>
                        <div className="flex flex-col ml-auto">
                            <div className="flex gap-2 text-red-500">-1.00<span className="text-white">₹</span></div>
                        </div>
                    </div>
                    <div className="border-b-[1px] p-2 flex flex-row">
                        <div className="flex flex-col gap-1">
                            <span>Withdrawn from Balance</span>
                            <span className="text-[#959494]">Date</span>
                        </div>
                        <div className="flex flex-col ml-auto">
                            <div className="flex gap-2 text-red-500">-1.00<span className="text-white">₹</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </Market>
    )
}