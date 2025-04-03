// store.ts
import { configureStore } from "@reduxjs/toolkit";
import flowchartReducer from "./slices/flowchartData/flowchartData.slice";
import apiFormDataReducer from "./slices/apiFormData/apiFormData.slice";

export const store = configureStore({
  reducer: {
    flowchart: flowchartReducer,
    apiFormData: apiFormDataReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
