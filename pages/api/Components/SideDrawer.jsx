import {LuLayoutDashboard} from 'react-icons/lu'
import {FiTrendingUp} from 'react-icons/fi'
import {GrTransaction} from 'react-icons/gr'

export default function SideDrawer() {
    return (
        <div className="fixed max-xl:hidden rounded-lg bg-opacity-70 left-0 top-[61px] h-[82vh] overflow-y-auto w-[20%]">
            <div className="flex flex-col bg-[#262424] rounded-lg bg-opacity-40 gap-2">
                <div className="flex p-3 mr-4 ml-4 flex-col gap-2 pb-4 border-b-2 border-[#262424]">
                    <span>MAIN ACCOUNT BALANCE</span>
                    <div className="flex gap-4 text-xl text-green-500">223030000 <span className="text-white">₹</span></div>
                </div>
                <div className="flex flex-col gap-2 p-3 pt-2 ml-4 2xl:pt-4 2xl:gap-4">
                    <div className="flex flex-row gap-2">
                        <span>Profits (7D)</span>
                        <span className="text-green-500">+10%</span>
                        <div className="ml-auto"><span className="text-green-500">2362763</span> ₹</div>
                    </div>                    
                    <div className="flex flex-row gap-2">
                        <span>Deposit in Orders</span>                        
                        <div className="ml-auto"><span className="text-green-500">2362763</span> ₹</div>
                    </div>                    
                    <div className="flex flex-row gap-2">
                        <span>Withdraw in Progress</span>                        
                        <div className="ml-auto"><span className="text-green-500">2362763</span> ₹</div>
                    </div>
                </div>
                <div className="flex flex-row px-2 pt-4 ml-4">
                    <button className="px-3 py-1 border-2 border-green-500 rounded-lg shadow-sm 2xl:py-3 shadow-green-500 2xl:px-7">DEPOSIT</button>
                    <button className="px-3 py-1 ml-auto border-2 border-red-500 rounded-lg shadow-sm 2xl:py-3 shadow-red-500 2xl:px-7">WITHDRAW</button>
                </div>
                <div className="flex flex-col h-full gap-2 p-4 text-white bg-black bg-opacity-80">
                    <span className="text-white border-b-[1px] pb-2 border-b-green-500">Menu</span>
                    <button className="flex items-center justify-center w-full gap-2 p-1 rounded-lg hover:bg-green-500 hover:text-black" onClick={()=>{window.location = "/Staking"}}><FiTrendingUp />Staking</button>
                    <button className="flex items-center justify-center w-full gap-2 p-1 rounded-lg hover:bg-green-500 hover:text-black" onClick={()=>{window.location = "/Dashboard"}}><LuLayoutDashboard />Dashboard</button>
                    <button className="flex items-center justify-center w-full gap-2 p-1 rounded-lg hover:bg-green-500 hover:text-black" onClick={()=>{window.location = "/Transactions"}}><GrTransaction />Transactions</button>
                    <button className="w-full p-1 text-center rounded-lg hover:bg-green-500 hover:text-black" onClick={()=>{window.location = "/Portfolio"}}>Portfolio</button>
                    <button className="w-full p-1 text-center rounded-lg hover:bg-green-500 hover:text-black">Our Plans</button>
                    <button className="w-full p-1 text-center rounded-lg hover:bg-green-500 hover:text-black">My Profile</button>
                </div>
            </div>
        </div>
    )
}