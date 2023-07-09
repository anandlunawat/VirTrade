// import privateRoute from "../routes/privateRoute";

import Dashboard from "../../Dashboard"
import SideDrawer from "./SideDrawer"

// import { liveFeed } from "../actions/liveFeed"
const Market = ({children}) => {
    // let lf = new liveFeed({})
    // lf.runScript()
    return (        
        <div className="overflow-hidden text-white max-md:h-fit top-16">            
            <SideDrawer />
            <div className="bg-black">{children}</div>                
        </div>
    )
}


export default Market