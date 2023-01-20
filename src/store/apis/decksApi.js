import uniqid from "uniqid";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const decksApi = createApi({
  reducerPath: "decks",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005" }),
  tagTypes: ["Decks"],
  endpoints(builder) {
    return {
      getDecks: builder.query({
        query: () => {
          return { url: "/decks", method: "GET" };
        },
        providesTags: ["Decks"],
      }),
      getDeckById: builder.query({
        query: (id) => {
          return { url: `decks/${id}` };
        },
        providesTags: ["Decks"],
      }),
      removeDeck: builder.mutation({
        query: (deckId) => {
          return {
            url: `/decks/${deckId}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Decks"],
      }),
      addDeck: builder.mutation({
        query: (deck) => {
          return {
            url: "/decks",
            method: "POST",
            body: { id: uniqid(), name: deck.name },
          };
        },
        invalidatesTags: ["Decks"],
      }),
    };
  },
});

export const {
  useGetDecksQuery,
  useGetDeckByIdQuery,
  useAddDeckMutation,
  useRemoveDeckMutation,
} = decksApi;
