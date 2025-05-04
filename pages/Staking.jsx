import { useEffect, useState, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import LineChart from "../Components/LineChart";
import Market from "../Components/Market";
import CompanyCards from "../Components/CompanyCards";
import { parseLTP, parseQuote, parseSnapQuote } from "../utils/parsers";
import privateRoute from "../routes/privateRoute";
import { fetchChartData } from "../redux/reducers/chartReducer";
import { marketData } from "../actions/marketData";

const parsers = { 1: parseLTP, 2: parseQuote, 3: parseSnapQuote };

const Staking = () => {
  const [ltp, setLtp] = useState({});
  const [niftyBank, setNiftyBank] = useState(0);
  const [nifty, setNifty] = useState(0);
  const [sensex, setSensex] = useState(0);

  const watchList = useSelector((state) => state.watchList);
  const dispatch = useDispatch();

  /** Optimized Fetching of Market Data (Runs only on Mount) */
  useEffect(() => {
    async function fetchMarketData() {
      try {
        const res = await marketData([
          { token: "99919000", symbol: "SENSEX", exch_seg: "BSE" },
          { token: "99926000", symbol: "Nifty 50", exch_seg: "NSE" },
          { token: "99926009", symbol: "Nifty Bank", exch_seg: "NSE" },
        ]);
        console.log("Res for NSB", res);

        if (res) {
          setNifty(res.find((item) => item.tradingSymbol === "NIFTY" || item.tradingSymbol === "Nifty 50")?.ltp || 0);
          setNiftyBank(res.find((item) => item.tradingSymbol === "Nifty Bank")?.ltp || 0);
          setSensex(res.find((item) => item.tradingSymbol === "SENSEX")?.ltp || 0);
        }
      } catch (e) {
        console.log("Error while fetching data", e);
      }
    }

    fetchMarketData();
    dispatch(fetchChartData({ symboltoken: "99926009", exchange: "NSE" }));
  }, []); // Runs only once on mount

  /** Optimized WebSocket Connection (Re-runs only when watchList changes) */
  // useEffect(() => {
  //   if (!watchList.length) return;

  //   const socket = io("ws://localhost:5000");

  //   socket.on("connect", () => {
  //     console.log("Connected to WebSocket");
  //     const tokens = watchList.map((item) => item.token);
  //     socket.emit("sendData", JSON.stringify(tokens));
  //   });

  //   socket.on("liveFeed", (data) => {
  //     console.log("Received live feed data");
  //     const buffer = Buffer.from(data);
  //     const parser = parsers[buffer[0]];
  //     if (parser) {
  //       setLtp(parser(buffer));
  //     }
  //   });

  //   socket.on("error", (error) => console.error("WebSocket error:", error));
  //   socket.on("disconnect", (reason) => console.warn("Disconnected:", reason));

  //   return () => socket.disconnect();
  // }, [watchList]); // Runs only when watchList changes

  /** Memoized function to prevent unnecessary re-renders */
  const displayChart = useCallback((symbolData) => {
    dispatch(fetchChartData(symbolData));
  }, [dispatch]);

  console.log("Rendering Staking component...");

  return (
    <Market>
      <div className="flex flex-col gap-2">
        <span className="border-b-2 border-b-[#262424] pb-2">STAKING</span>
        <div className="flex max-md:flex-col md:h-[206px] flex-row gap-2">
          <div className="flex flex-col gap-2">
            <button
              onClick={() => displayChart({ symboltoken: "99926000", exchange: "NSE" })}
              className="flex flex-col p-2 bg-opacity-40 rounded-lg bg-[#262424] md:w-60"
            >
              <span>NIFTY</span>
              <span className="text-green-500">{nifty}</span>
            </button>

            <button
              onClick={() => displayChart({ symboltoken: "99919000", exchange: "BSE" })}
              className="flex flex-col p-2 bg-opacity-40 rounded-lg bg-[#262424] md:w-60"
            >
              <span>SENSEX</span>
              <span className="text-green-500">{sensex}</span>
            </button>

            <button
              onClick={() => displayChart({ symboltoken: "99926009", exchange: "NSE" })}
              className="flex flex-col p-2 bg-opacity-40 rounded-lg bg-[#262424] md:w-60"
            >
              <span>Nifty Bank</span>
              <span className="text-red-500">{niftyBank}</span>
            </button>
          </div>
          <div className="md:basis-3/4 rounded-lg bg-opacity-40 bg-[#262424]">
            <LineChart />
          </div>
        </div>
        <CompanyCards ltp={ltp} watchLists={watchList} />
      </div>
    </Market>
  );
};

export default privateRoute(Staking);
