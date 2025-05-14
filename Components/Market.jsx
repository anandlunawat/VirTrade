import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SideDrawer from "./SideDrawer";
import Loader from "./Loader";
import Navbar from '../Components/Navbar'
import { isCacheExpired, fetchAndUpdateCache, getCachedStocks } from "../actions/instrumentCache"
import { printLogs } from "../actions/logs";

const Market = ({ children }) => {
  printLogs("In Market.jsx")
  const [loader, setLoader] = useState(true);
  const [instruments, setInstruments] = useState([]);

  useEffect(() => {
    printLogs("In cache useEFfect")
    if ("caches" in window) {
      (async () => {
        const expired = await isCacheExpired();

        if (expired) {
          printLogs("Cache expired. Fetching fresh data...");
          await fetchAndUpdateCache(setLoader, setInstruments);
        } else {
          printLogs("Using cached data...");
          await getCachedStocks(setLoader, setInstruments);
        }
      })();
    }
  }, []);

  return loader ? (
    <Loader />
  ) : (
    <div className="flex flex-col h-screen overflow-hidden text-white">
      <Navbar />
      <div className="xl:flex">
        <SideDrawer />
        <div className="flex flex-col w-full bg-black">
          <SearchBar instruments={instruments} />
          <div className="flex flex-col p-4 h-[70vh] overflow-y-scroll">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;
