import { configureStore } from "@reduxjs/toolkit";
import speedtest from "./reducers/speedtest";

const store = configureStore({
  reducer: {
    speedtest,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;
