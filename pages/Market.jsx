// import privateRoute from "../routes/privateRoute";

import Dashboard from "./api/Components/Dashboard"
import SideDrawer from "./api/Components/SideDrawer"

// import { liveFeed } from "../actions/liveFeed"
const Market = () => {
    // let lf = new liveFeed({})
    // lf.runScript()
    return (
        // <div className="flex flex-row h-screen overflow-hidden text-white max-sm:flex-col">
        <div className="overflow-hidden text-white top-16 h-fit">
            {/* <div className="">                 */}
                <SideDrawer />
                <Dashboard />
            {/* </div> */}
        </div>
    )
}


export default Market