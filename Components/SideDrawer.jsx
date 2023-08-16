import {LuLayoutDashboard} from 'react-icons/lu'
import {FiTrendingUp} from 'react-icons/fi'
import {AiOutlineTransaction} from 'react-icons/ai'
import {TfiBag} from 'react-icons/tfi'
import {BiNotepad} from 'react-icons/bi'
import {CgProfile} from 'react-icons/cg'
import { useEffect, useState } from 'react'

export default function SideDrawer() {

    const [path,setPath] = useState("")

    useEffect(()=>{
        if(window) {
            setPath(window.location.pathname)            
            console.log(window.location.pathname)
        }
    },[])

    return (
        <div className="fixed rounded-lg left-0 top-[61px] h-[82vh] overflow-y-auto w-[20%]">
            <div className="flex flex-col bg-[#262424] rounded-lg bg-opacity-40 gap-2">
                <div className="flex max-xl:hidden p-3 mr-4 ml-4 flex-col gap-2 pb-4 border-b-2 border-[#262424]">
                    <span>MAIN ACCOUNT BALANCE</span>
                    <div className="flex gap-4 text-xl text-green-500"><span className="text-white">₹</span>223030000</div>
                </div>
                <div className="flex flex-col gap-2 p-3 pt-2 ml-4 max-xl:hidden 2xl:pt-4 2xl:gap-4">
                    <div className="flex flex-row gap-2">
                        <span>Profits (7D)</span>
                        <span className="text-green-500">+10%</span>
                        <div className="ml-auto whitespace-pre">₹ <span className="text-green-500">2362763</span></div>
                    </div>                    
                    <div className="flex flex-row gap-2">
                        <span>Deposit in Orders</span>                        
                        <div className="ml-auto whitespace-pre">₹ <span className="text-green-500">2362763</span></div>
                    </div>                    
                    <div className="flex flex-row gap-2">
                        <span>Withdraw in Progress</span>                        
                        <div className="ml-auto whitespace-pre">₹ <span className="text-green-500">2362763</span></div>
                    </div>
                </div>
                <div className="flex flex-row px-2 pt-4 ml-4 max-xl:hidden">
                    <button className="px-3 py-1 border-2 border-green-500 rounded-lg shadow-sm 2xl:py-3 shadow-green-500 2xl:px-7">DEPOSIT</button>
                    <button className="px-3 py-1 ml-auto border-2 border-red-500 rounded-lg shadow-sm 2xl:py-3 shadow-red-500 2xl:px-7">WITHDRAW</button>
                </div>
                <div className="flex flex-col h-full max-xl:gap-2 max-xl:items-center max-xl:justify-center max-xl:p-1 gap-2 p-4 text-white bg-black max-xl:fixed max-xl:w-[100vw] max-xl:h-[8%] max-xl:bottom-0 max-xl:flex-row bg-opacity-80">
                    <span className="text-white max-xl:hidden border-b-[1px] pb-2 border-b-green-500">Menu</span>
                    <button className={`flex max-xl:p-1 ${path==="/staking" ? "bg-green-500 text-black" : ""} items-center xl:px-[25%] w-full gap-2 rounded-lg xl:p-1 max-xl:flex-col hover:bg-green-500 hover:text-black`} onClick={()=>{window.location = "/Staking"}}><FiTrendingUp /><span className="max-md:text-xs md:max-xl:text-2xl">Staking</span></button>
                    <button className={`flex max-xl:p-1 ${path==="/dashboard" ? "bg-green-500 text-black" : ""} items-center xl:px-[25%] w-full gap-2 rounded-lg xl:p-1 max-xl:flex-col hover:bg-green-500 hover:text-black`} onClick={()=>{window.location = "/Dashboard"}}><LuLayoutDashboard /><span className="max-md:text-xs md:max-xl:text-2xl">Dashboard</span></button>
                    <button className={`flex max-xl:p-1 ${path==="/transactions" ? "bg-green-500 text-black" : ""} items-center xl:px-[25%] w-full gap-2 rounded-lg xl:p-1 max-xl:flex-col hover:bg-green-500 hover:text-black`} onClick={()=>{window.location = "/Transactions"}}><AiOutlineTransaction /><span className='max-md:text-xs md:max-xl:text-2xl'>Transactions</span></button>
                    <button className={`flex max-xl:p-1 ${path==="/portfolio" ? "bg-green-500 text-black" : ""} items-center xl:px-[25%] w-full gap-2 rounded-lg xl:p-1 max-xl:flex-col hover:bg-green-500 hover:text-black`} onClick={()=>{window.location = "/Portfolio"}}><TfiBag /><span className='max-md:text-xs md:max-xl:text-2xl'>Portfolio</span></button>
                    {/* <button className={`flex max-xl:p-1 ${path==="/" ? "bg-green-500 text-black" : ""} items-center xl:px-[25%] w-full gap-2 rounded-lg xl:p-1 max-xl:flex-col hover:bg-green-500 hover:text-black`} onClick={()=>{window.location = "/Transactions"}}><BiNotepad /><span className='max-md:text-xs md:max-xl:text-2xl'>Our Plans</span></button> */}
                    <button className={`flex max-xl:p-1 ${path==="/profile" ? "bg-green-500 text-black" : ""}  items-center xl:px-[25%] w-full gap-2 rounded-lg xl:p-1 max-xl:flex-col hover:bg-green-500 hover:text-black`} onClick={()=>{window.location = "/Profile"}}><CgProfile /><span className='max-md:text-xs md:max-xl:text-2xl'>My Profile</span></button>
                </div>
            </div>
        </div>
    )
}