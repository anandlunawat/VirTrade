export default function SideDrawer() {
    return (
        <div className="fixed max-xl:hidden left-0 top-[70px] h-[82vh] overflow-y-auto w-[25%]">
            <div className="flex flex-col gap-2 p-2">
                <div className="flex flex-col gap-2 pb-4 border-b-2 border-[#2a2929]">
                    <span>MAIN ACCOUNT BALANCE</span>
                    <div className="flex gap-4 text-xl text-orange-500">223030000 <span className="text-white">₹</span></div>
                </div>
                <div className="flex flex-col gap-2 pt-2 2xl:pt-4 2xl:gap-4">
                    <div className="flex flex-row gap-2">
                        <span>Profits (7D)</span>
                        <span className="text-green-500">+10%</span>
                        <div className="ml-auto"><span className="text-orange-500">2362763</span> ₹</div>
                    </div>                    
                    <div className="flex flex-row gap-2">
                        <span>Deposit in Orders</span>                        
                        <div className="ml-auto"><span className="text-orange-500">2362763</span> ₹</div>
                    </div>                    
                    <div className="flex flex-row gap-2">
                        <span>Withdraw in Progress</span>                        
                        <div className="ml-auto"><span className="text-orange-500">2362763</span> ₹</div>
                    </div>
                </div>
                <div className="flex flex-row pt-4">
                    <button className="px-3 py-1 border-2 border-green-500 rounded-lg shadow-sm 2xl:py-3 shadow-green-500 2xl:px-7">DEPOSIT</button>
                    <button className="px-3 py-1 ml-auto border-2 border-red-500 rounded-lg shadow-sm 2xl:py-3 shadow-red-500 2xl:px-7">WITHDRAW</button>
                </div>
                <div className="flex flex-col p-4 text-white bg-[#2a2929] bg-opacity-80">
                    <span className="text-white">Menu</span>
                    <button className="w-full p-1 pt-1 text-center rounded-lg hover:bg-orange-500 hover:text-black" onClick={()=>{window.location = "/Staking"}}>Staking</button>
                    <button className="w-full p-1 text-center rounded-lg hover:bg-orange-500 hover:text-black" onClick={()=>{window.location = "/Dashboard"}}>Dashboard</button>
                    <button className="w-full p-1 text-center rounded-lg hover:bg-orange-500 hover:text-black" >Transactions</button>
                    <button className="w-full p-1 text-center rounded-lg hover:bg-orange-500 hover:text-black">Investment</button>
                    <button className="w-full p-1 text-center rounded-lg hover:bg-orange-500 hover:text-black">Our Plans</button>
                    <button className="w-full p-1 text-center rounded-lg hover:bg-orange-500 hover:text-black">My Profile</button>
                </div>
            </div>
        </div>
    )
}