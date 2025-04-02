// store.ts
import { configureStore } from "@reduxjs/toolkit";
import flowchartReducer from "./slices/flowchartData/flowchartData.slice";

export const store = configureStore({
  reducer: {
    flowchart: flowchartReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
