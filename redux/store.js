import { configureStore } from "@reduxjs/toolkit";
import { watchListReducer } from "./reducers/watchListReducer";
import chartReducer from "./reducers/chartReducer"; 
import { orderReducer } from "./reducers/orderReducer";
import { livePriceReducer } from "./reducers/livePriceReducer";

const store = configureStore({
  reducer: {
    watchList: watchListReducer,
    chart: chartReducer,
    livePrice: livePriceReducer
  },
});

export default store;
