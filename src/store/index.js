import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { decksApi } from "./apis/decksApi";
import { flashcardsApi } from "./apis/flashcardsApi";
import flashcardsReducer from "./slices/flashcardsSlice";

export const store = configureStore({
  reducer: {
    flashcardManager: flashcardsReducer,
    [flashcardsApi.reducerPath]: flashcardsApi.reducer,
    [decksApi.reducerPath]: decksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      flashcardsApi.middleware,
      decksApi.middleware
    ),
});

setupListeners(store.dispatch);
