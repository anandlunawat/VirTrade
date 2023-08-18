import { useState } from "react"
import Market from "../Components/Market"
import { BsBarChart } from "react-icons/bs"
import Filter from "../Components/Filter"

export default function Profile() {

    const list = [
        { "name":"Segment","value": ["Equity", "Future & Options"] },
        { "name":"P&L","value": ["Combined", "Realized P&L", "Unrealized P&L"] },
    ]

    const inputTypes = [
        {"type" : "date","for" : "Date Start"},
        {"type" : "date","for" : "Date End"}
    ]

    return (
        <Market>
            <div className="mt-[20px] max-lg:mb-[25%] overflow-hidd en h-fit xl:ml-[22%] flex flex-col m-4 gap-4">
                <div className="border-b-2 border-b-[#262424] pb-2">Profile</div>
                <div className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-[#262424] rounded-full"></div>
                    <span>User</span>
                </div>
                <div className="border-b-[#262424] items-center flex gap-2 border-b-2 pb-2">
                    <BsBarChart /><span>P&L</span>
                </div>
                {/* <div className="flex gap-4"> */}
                    <Filter tags={["dropdown","input"]} menu={list} types={inputTypes}/>
                    {/* <Filter type={"input"} menu={inputTypes}/> */}
                {/* </div>                 */}
            </div>
        </Market>
    )
}