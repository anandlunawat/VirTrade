import Market from "../Components/Market"
import Cards from "../Components/Cards"
import Withdrawal from "../Components/Withdrawal"
import privateRoute from '../routes/privateRoute';
import { printLogs } from "../actions/logs";

const Dashboard = () => {
    printLogs("In Dashboard.jsx")
    return (
        // <Market>
            <div className="text-white">            
                <span className="text-base">WELCOME!</span>
                <div className="flex pt-4 flex-row w-[100%] gap-4">
                    <span className="basis-1/2">User</span>
                    <div className="flex gap-4 ml-auto max-md:text-xs">
                        <button className="px-2 bg-gray-600 rounded-lg sm:py-1">Send Funds</button>
                        <button className="px-2 bg-green-500 rounded-lg sm:py-1">Invest and Earn</button>
                        <button className="px-2 text-black bg-green-300 rounded-lg sm:py-1">Deposit</button>
                    </div>
                </div>
                <div className="flex flex-row gap-16 max-md:flex-col pt-9">
                    <div className="border-b-2 rounded-lg max-md:w-full w-52 border-b-green-500">
                        <Cards />
                    </div>
                    <div className="border-b-2 rounded-lg w-52 max-md:w-full border-b-white">
                        <Cards />
                    </div>
                    <div className="border-b-2 rounded-lg w-52 border-b-green-300 max-md:w-full">
                        <Cards />
                    </div>
                </div>
                <div className="flex pt-4">
                    <span className="font-light basis-1/2">Recent Activity</span>
                    <button className="ml-auto font-light text-green-500 ">See History</button>
                </div>
                <div className="flex flex-col pt-4">
                    <Withdrawal />
                </div>
            </div>
        // </Market>
    )
}

export default privateRoute(Dashboard)