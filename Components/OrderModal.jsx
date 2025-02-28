import { BsThreeDotsVertical } from "react-icons/bs"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { IoMdRefresh } from "react-icons/io"
import { TbHandClick } from "react-icons/tb"

export default function OrderModal(props) {
    return (
        <div className="w-[100vw] h-[100vh] backdrop-blur-sm z-50 fixed inset-0">
            <div className={`flex flex-col sm:ml-[30%] sm:mt-[2%] shadow-[0px_2px_2px_2px] shadow-[#1e1d1d] gap-1 max-sm:w-[100vw] w-[40vw] border-[1px] ${props.type === "BUY" ? "border-[#4d564d]" : "border-[#644646]"} bg-[#262424] bg-opacity-40 rounded-lg z-50 h-[90vh]`}>
            <div className={`flex px-3 flex-row gap-4 bg-[#262424] rounded-t-lg border-b-[1px] ${props.type === "BUY" ? "border-b-[#4d564d]" : "border-b-[#644646]"} py-2`}>
                <button onClick={() => { props.removeModal() }} className="self-center justify-self-center"><AiOutlineArrowLeft /></button>
                <div className="flex flex-col">
                    <span>{props?.stock.name}</span>
                    <span className={`${props.type === "BUY" ? "text-green-500" : "text-red-500"}`}>{props?.stock.exch_seg }:{props?.stock.ltp}</span>
                </div>
                <button className="ml-auto"><BsThreeDotsVertical /></button>
            </div>
            <div className="flex flex-row w-full gap-2 px-3 mt-3 max-lg:flex-col">
                <div className={`flex flex-col bg-black rounded-lg basis-1/2 ${props.type === "BUY" ? "shadow-[#4d564d]" : "shadow-[#644646]"} shadow-[0px_0px_4px_0px]`}>
                    <div className="flex flex-row m-2">
                        <span>Quantity</span>
                        <span className="ml-auto">Lot Size 1</span>
                    </div>
                    <input className="m-2 bg-transparent focus:outline-none" type="number" defaultValue={"1"} />
                </div>
                <div className={`flex flex-col bg-black rounded-lg basis-1/2 ${props.type === "BUY" ? "shadow-[#4d564d]" : "shadow-[#644646]"} shadow-[0px_0px_4px_0px]`}>
                    <div className="flex flex-row m-2">
                        <span>Price</span>
                        <span className="ml-auto">Tick size 0.01</span>
                    </div>
                    <input className="m-2 bg-transparent focus:outline-none" type="number" defaultValue={"2300"} />
                </div>
            </div>
            <span className="px-3 mt-3 text-lg">Product</span>
            <div className="flex flex-row w-full gap-4 px-3 mt-3 text-sm font-normal text-black">
                <button className={`p-2 ${props.type === "BUY" ? "border-green-500 border-2 text-white" : "border-red-500 border-2 text-white"} rounded-lg basis-1/2`}>Intraday</button>
                <button className={`p-2 bg-black text-white rounded-lg shadow-[0px_0px_4px_0px] ${props.type === "BUY" ? "hover:border-green-500 hover:bg-transparent shadow-[#4d564d] hover:border-2" : "hover:border-red-500 shadow-[#644646] hover:bg-transparent hover:border-2"} basis-1/2`}>Overnight</button>
            </div>
            <span className="px-3 mt-3 text-lg">Type</span>
            <div className="flex flex-row w-full gap-4 px-3 mt-3 text-sm font-normal text-black">
                <button className={`p-2 ${props.type === "BUY" ? "border-green-500 border-2 text-white" : "border-red-500 border-2 text-white"} rounded-lg basis-1/3`}>Market</button>
                <button className={`p-2 text-white shadow-[0px_0px_4px_0px] bg-black rounded-lg ${props.type === "BUY" ? "hover:border-green-500 shadow-[#4d564d] hover:bg-transparent hover:border-2" : "hover:border-red-500 shadow-[#644646] hover:bg-transparent hover:border-2"} basis-1/3`}>Limit</button>
                <button className={`p-2 text-white shadow-[0px_0px_4px_0px] bg-black rounded-lg ${props.type === "BUY" ? "hover:border-green-500 shadow-[#4d564d] hover:bg-transparent hover:border-2" : "hover:border-red-500 shadow-[#644646] hover:bg-transparent hover:border-2"} basis-1/3`}>SL</button>
            </div>
            <div className="flex flex-col mt-auto">
                <div className={`flex flex-row items-center border-[1px] ${props.type === "BUY" ? "border-[#4d564d]" : "border-[#644646]"} justify-center gap-4 p-3 bg-[#262424]`}>
                    <div className="flex gap-1"><span className="text-sm font-normal">Margin</span><span className={`font-light ${props.type === "BUY" ? "text-green-500" : "text-red-500"}`}>2380</span></div>
                    <div className="flex gap-1"><span className="text-sm font-normal">Margin</span><span className={`font-light ${props.type === "BUY" ? "text-green-500" : "text-red-500"}`}>2380</span></div>
                    <button className={`ml-auto ${props.type === "BUY" ? "text-green-500" : "text-red-500"}`}><IoMdRefresh /></button>
                </div>
                <button className={`flex items-center justify-center gap-2 p-2 mb-0 text-xl font-semibold text-black ${props.type === "BUY" ? "bg-green-500" : "bg-red-500"} rounded-b-lg`}>
                    <TbHandClick />
                    <span>Click To {props.type}</span>
                </button>
            </div>
        </div>
        </div>
    )
} 