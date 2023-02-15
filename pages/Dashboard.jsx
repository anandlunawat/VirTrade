import { useEffect } from "react"
import { status } from "./Auth"
import NseIndia from "stock-nse-india"
import { IndexEquityInfo } from "stock-nse-india/dist/interface"
import equityInfo  from "stock-nse-india/dist/interface"
import { Navbar } from "./api/Components/Navbar"

export default function Dashboard() {
    return (
        status ? (
            <div className="bg-[url(/BG_IMAGE.png)] w-screen h-screen absolute top-0 text-white">
                Login Successfully
            </div>
        ) : 
        <div className="bg-[url(/BG_IMAGE.png)] h-screen  absolute top-0 text-white bottom-0 right-0 left-0 text-center w-screen">
            <span className="text-2xl text-red-700">Error..!!</span>Do not try to access it manually.
            Thank You
        </div>
    )
}