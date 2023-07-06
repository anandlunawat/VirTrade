export default function Cards() {
    return (
        // <div className="flex flex-col p-2 text-white border-[1px] w-48 bg-[#4e4c4b] rounded-lg">
        <div className="flex flex-col w-52 p-2 text-white bg-[#2a2929] bg-opacity-80 rounded-lg">
            <span>Available Balance</span>
            <div className="flex gap-2"><span className="text-orange-500">283293</span> ₹</div>
            <span className="pt-1">Investment Amount</span>
            <div className="flex gap-2"><span className="text-orange-500">283293</span> ₹</div>
        </div>
    )
}