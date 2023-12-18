import { useEffect, useState } from "react"
import SearchBar from "./SearchBar"
import SideDrawer from "./SideDrawer"
import Loader from "./Loader"
import { stocks } from "../actions/stocks"

const Market = ({ children }) => {

  const [loader, setLoader] = useState(true)
  const [instruments, setInstruments] = useState([{}])

  useEffect(() => {
    if ("caches" in window) {
      const getCachedStocks = async () => {
        const cacheStorage = await caches.open("instruments");
        const cachedResponse = await cacheStorage.match("https://virtrade.netlify.app/");

        if (!cachedResponse) {
          try {
            const responses = await stocks();

            if (responses) {
              const filteredInstruments = responses.filter((response) => !(response.symbol.endsWith('-BL')));
              setLoader(false);
              setInstruments(filteredInstruments);

              const response = new Response(JSON.stringify(filteredInstruments), {
                headers: { 'Content-Type': 'text/plain' },
              });

              caches.open("instruments").then((cache) => {
                cache.put("https://virtrade.netlify.app/", response);
              });
            }
          } catch (error) {
            console.error("Error fetching stocks:", error);
          }
        } else {
          try {
            const responseStocks = await cachedResponse.json();
            setLoader(false);
            setInstruments(responseStocks.filter((responseStock) => !(responseStock.symbol?.endsWith('-BL'))));
            if(instruments.length === 1){
              const data = async () => {
                const responses = await stocks();
                console.log("Response", responses)
                if (responses) {
                  setLoader(false)
                  setInstruments(responses.filter((response) => !(response.symbol.endsWith('-BL'))))
                }
              }
              data()
            }
          } catch (error) {
            console.error("Error reading JSON from cached response:", error);
          }
        }
      };

      getCachedStocks();
    }
  }, []);


  return (
    loader ? <Loader /> :
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