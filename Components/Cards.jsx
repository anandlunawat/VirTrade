export default function Cards() {
    return (
        // <div className="flex flex-col p-2 text-white border-[1px] w-48 bg-[#4e4c4b] rounded-lg">
        <div className="flex flex-col md:w-52 p-2 text-white bg-[#262424] bg-opacity-40 rounded-lg">
            <span>Available Balance</span>
            <div className="flex gap-2"><span className="text-green-500">283293</span> ₹</div>
            <span className="pt-1">Investment Amount</span>
            <div className="flex gap-2"><span className="text-green-500">283293</span> ₹</div>
        </div>
    )
}