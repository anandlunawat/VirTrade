import { watchListReducer } from "./reducers/watchListReducer";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: {
        watchList : watchListReducer,
    },
})

export default store