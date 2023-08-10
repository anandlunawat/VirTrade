import { useEffect, useState } from "react"
import SearchBar from "./SearchBar"
import SideDrawer from "./SideDrawer"
import Loader from "./Loader"
import { stocks } from "../actions/stocks"

const Market = ({ children }) => {

    const [loader, setLoader] = useState(true)
    const [instruments, setInstruments] = useState([{}])

    useEffect(() => {
        const data = async () => {
            const responses = await stocks();
            console.log("Response", responses)
            if (responses) {
                setLoader(false)
                setInstruments(responses.filter((response) => !(response.symbol.endsWith('-BL'))))
            }
        }
        data()
    }, [])

    return (
        loader ?  <Loader /> :
            <div className="overflow-hidden text-white max-md:h-fit top-16">
                <div className="flex flex-row">
                    <SideDrawer />
                    <SearchBar
                        instruments={instruments}
                    />
                </div>
                <div className="bg-black">{children}</div>
            </div> 
    )
}


export default Market