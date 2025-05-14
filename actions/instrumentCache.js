import { stocks } from '../actions/stocks'
import { printLogs } from './logs';

const CACHE_NAME = "instruments";
const CACHE_KEY = "https://virtrade.netlify.app/";

// Function to check if cache has expired
export const isCacheExpired = async () => {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(CACHE_KEY);

  if (!cachedResponse) return true; 

  const cachedDate = cachedResponse.headers.get("x-cache-date");
  if (!cachedDate) return true;

  const cachedTime = new Date(cachedDate).getTime();
  const currentTime = new Date().getTime();

  return new Date(cachedTime).toDateString() !== new Date(currentTime).toDateString();
};

export const fetchAndUpdateCache = async (setLoader, setInstruments) => {
  try {
    setLoader(true);
    const responses = await stocks();

    if (responses) {
      const filteredInstruments = responses.filter((response) => !response.symbol.endsWith("-BL"));
      printLogs("Setting instruments in Market.jsx by an api.")
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
export const getCachedStocks = async (setLoader, setInstruments) => {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(CACHE_KEY);

  if (cachedResponse) {
    try {
      const responseStocks = await cachedResponse.json();
      printLogs("Setting instruments in Market.jsx through a cache.")
      setLoader(false);
      setInstruments(responseStocks.filter((responseStock) => !responseStock.symbol.endsWith("-BL")));
    } catch (error) {
      console.error("Error reading JSON from cached response:", error);
    }
  }
};
