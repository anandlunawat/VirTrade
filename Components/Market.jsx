import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import SideDrawer from "./SideDrawer";
import Loader from "./Loader";
import { stocks } from "../actions/stocks";
import { useWhyDidYouRender } from '../actions/useWhyDidYouRender'

const CACHE_NAME = "instruments";
const CACHE_KEY = "https://virtrade.netlify.app/";

// Function to check if cache has expired
const isCacheExpired = async () => {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(CACHE_KEY);

  if (!cachedResponse) return true; // No cache exists, so it's considered expired

  const cachedDate = cachedResponse.headers.get("x-cache-date");
  if (!cachedDate) return true; // If no timestamp exists, consider expired

  const cachedTime = new Date(cachedDate).getTime();
  const currentTime = new Date().getTime();
  
  // Check if the cached data is from a past day
  return new Date(cachedTime).toDateString() !== new Date(currentTime).toDateString();
};

// Function to fetch and update cache
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
  useWhyDidYouRender("Market", { children });

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
    <div className="overflow-hidden text-white max-md:h-fit top-16">
      <div className="flex flex-row">
        <SideDrawer />
        <SearchBar instruments={instruments} />
      </div>
      <div className="bg-black">{children}</div>
    </div>
  );
};

export default Market;
