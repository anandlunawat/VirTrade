import Cards from "./Cards";
import Withdrawal from "./Withdrawal";

export default function Dashboard() {
    return (
        <div className="text-white py-20 h-screen ml-[30%] flex flex-col mr-4">
            <span className="text-base">WELCOME!</span>
            <div className="flex pt-2 flex-row w-[100%] gap-4">
                <span className="basis-1/2">User</span>
                <div className="flex gap-4 ml-auto">
                    <button className="px-2 py-1 bg-gray-600 rounded-lg">Send Funds</button>
                    <button className="px-2 py-1 bg-orange-500 rounded-lg">Invest and Earn</button>
                    <button className="px-2 py-1 text-black bg-green-300 rounded-lg">Deposit</button></div>
            </div>
            <div className="flex flex-row gap-16 pt-9">
                <div className="border-b-2 rounded-lg w-52 border-b-orange-500">
                    <Cards />
                </div>
                <div className="border-b-2 rounded-lg w-52 border-b-white">
                    <Cards />
                </div>
                <div className="border-b-2 rounded-lg w-52 border-b-green-300">
                    <Cards />
                </div>
            </div>
            <div className="flex pt-4">
                <span className="font-light basis-1/2">Recent Activity</span>
                <button className="ml-auto font-light text-orange-500 ">See History</button>
            </div>
            <div className="flex flex-col pt-4">
                <Withdrawal />
            </div>
        </div>
    )
}