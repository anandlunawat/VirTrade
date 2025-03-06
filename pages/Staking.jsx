import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

import Market from "../Components/Market";
import CompanyCards from "../Components/CompanyCards";
import { parseLTP, parseQuote, parseSnapQuote } from "../utils/parsers";
import privateRoute from "../routes/privateRoute";

const parsers = { 1: parseLTP, 2: parseQuote, 3: parseSnapQuote };

const Staking = () => {
    const [ltp, setLtp] = useState({});
    const [niftyBank, setNiftyBank] = useState(0);
    const [nifty, setNifty] = useState(0);
    // const [authTokens, setAuthTokens] = useState({ jwtToken: "", feedToken: "" });

    const watchList = useSelector(state => state.watchList);

    // Fetch authentication tokens from localStorage
    // useEffect(() => {
    //     console.log("Fetching authentication tokens...");
    //     setAuthTokens({
    //         jwtToken: localStorage.getItem("jwtToken") || "",
    //         feedToken: localStorage.getItem("feedToken") || "",
    //     });
    // }, []);

    // WebSocket connection setup
    // useEffect(() => {
    //     if (!watchList.length) return;

    //     try {
    //         const headers = {
    //             Authorization: authTokens.jwtToken,
    //             APIKey: "4CoV8TFB",
    //             FeedToken: authTokens.feedToken,
    //             ClientCode: "P334460",
    //         };

    //         const socket = io("ws://localhost:5000", { extraHeaders: headers });

    //         socket.on("connect", () => {
    //             console.log("Connected to the server");

    //             const tokens = watchList.map(item => item.token);
    //             socket.emit("sendData", JSON.stringify(tokens));
    //             console.log("Subscribed tokens:", tokens);
    //         });

    //         socket.on("userId", userId => {
    //             document.cookie = `userId=${userId}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    //         });

    //         socket.on("liveFeed", data => {
    //             console.log("Received live feed data");
    //             const buffer = Buffer.from(data);
    //             const parser = parsers[buffer[0]];
    //             if (parser) {
    //                 setLtp(parser(buffer));
    //             }
    //         });

    //         socket.on("error", error => console.error("WebSocket error:", error));
    //         socket.on("disconnect", reason => console.warn("Disconnected:", reason));

    //         return () => socket.disconnect();
    //     } catch (error) {
    //         console.error("Error establishing WebSocket connection:", error);
    //     }
    // }, [watchList, authTokens]);

    console.log("Rendering Staking component...");

    return (
        <Market>
            <div className="mt-[20px] max-lg:mb-[25%] h-fit xl:ml-[22%] flex flex-col m-4 gap-2">
                <span className="border-b-2 border-b-[#262424] pb-2">STAKING</span>
                <div className="flex max-md:flex-col md:h-[206px] flex-row gap-2">
                    <div className="flex flex-col gap-2">
                        <button className="flex flex-col p-2 bg-opacity-40 rounded-lg bg-[#262424] md:w-60">
                            <span>NIFTY</span>
                            <span className="text-green-500">{nifty}</span>
                        </button>
                        <button className="flex flex-col p-2 bg-opacity-40 rounded-lg bg-[#262424] md:w-60">
                            <span>SENSEX</span>
                            <span className="text-green-500">65,900</span>
                        </button>
                        <button className="flex flex-col p-2 bg-opacity-40 rounded-lg bg-[#262424] md:w-60">
                            <span>Crude Oil</span>
                            <span className="text-red-500">{niftyBank}</span>
                        </button>
                    </div>
                </div>
                <CompanyCards ltp={ltp} watchLists={watchList} />
            </div>
        </Market>
    );
};

export default privateRoute(Staking);
