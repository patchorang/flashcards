import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { decksApi } from "./apis/decksApi";
import flashcardsReducer from "./slices/flashcardsSlice";

export const store = configureStore({
  reducer: {
    flashcardManager: flashcardsReducer,
    [decksApi.reducerPath]: decksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(decksApi.middleware),
});

setupListeners(store.dispatch);
