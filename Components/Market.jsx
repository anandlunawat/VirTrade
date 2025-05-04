import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SideDrawer from "./SideDrawer";
import Loader from "./Loader";
import { stocks } from "../actions/stocks";
import Navbar from '../Components/Navbar'

const CACHE_NAME = "instruments";
const CACHE_KEY = "https://virtrade.netlify.app/";

// Function to check if cache has expired
const isCacheExpired = async () => {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(CACHE_KEY);

  if (!cachedResponse) return true; 

  const cachedDate = cachedResponse.headers.get("x-cache-date");
  if (!cachedDate) return true;

  const cachedTime = new Date(cachedDate).getTime();
  const currentTime = new Date().getTime();

  return new Date(cachedTime).toDateString() !== new Date(currentTime).toDateString();
};

const fetchAndUpdateCache = async (setLoader, setInstruments) => {
  try {
    setLoader(true);
    const responses = await stocks();

    if (responses) {
      const filteredInstruments = responses.filter((response) => !response.symbol.endsWith("-BL"));
      console.log("Setting instruments in Market.jsx by an api.")
      setLoader(false);
      setInstruments(filteredInstruments);

      // Store data in cache with timestamp
      const response = new Response(JSON.stringify(filteredInstruments), {
        headers: {
          "Content-Type": "text/plain",
          "x-cache-date": new Date().toISOString(), // Store timestamp for expiry check
        },
      });

      const cache = await caches.open(CACHE_NAME);
      await cache.put(CACHE_KEY, response);
    }
  } catch (error) {
    console.error("Error fetching stocks:", error);
  }
};

// Function to get cached stocks if valid
const getCachedStocks = async (setLoader, setInstruments) => {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(CACHE_KEY);

  if (cachedResponse) {
    try {
      const responseStocks = await cachedResponse.json();
      console.log("Setting instruments in Market.jsx through a cache.")
      setLoader(false);
      setInstruments(responseStocks.filter((responseStock) => !responseStock.symbol.endsWith("-BL")));
    } catch (error) {
      console.error("Error reading JSON from cached response:", error);
    }
  }
};

const Market = ({ children }) => {
  console.log("In Market.jsx")
  const [loader, setLoader] = useState(true);
  const [instruments, setInstruments] = useState([]);

  useEffect(() => {
    console.log("In cache useEFfect")
    if ("caches" in window) {
      (async () => {
        const expired = await isCacheExpired();

        if (expired) {
          console.log("Cache expired. Fetching fresh data...");
          await fetchAndUpdateCache(setLoader, setInstruments);
        } else {
          console.log("Using cached data...");
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
