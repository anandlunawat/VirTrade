import SearchBar from "./SearchBar"
import SideDrawer from "./SideDrawer"

const Market = ({children}) => {
    return (        
        <div className="overflow-hidden text-white max-md:h-fit top-16">            
            <div className="flex flex-row">
                <SideDrawer />
                <SearchBar />
            </div>
            <div className="bg-black">{children}</div>                
        </div>
    )
}


export default Market