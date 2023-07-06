export default function Withdrawal() {
    return (
        <div className="bg-[#2a2929] text-xs rounded-lg flex flex-col">
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
            </div>            <div className="border-b-[1px] p-2 flex flex-row">
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
    )
}