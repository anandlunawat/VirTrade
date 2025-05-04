import { configureStore } from "@reduxjs/toolkit";
import { watchListReducer } from "./reducers/watchListReducer";
import chartReducer from "./reducers/chartReducer"; 

const store = configureStore({
  reducer: {
    watchList: watchListReducer,
    chart: chartReducer,
  },
});

export default store;
