import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const decksApi = createApi({
  reducerPath: "decks",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }),
  tagTypes: ["Decks", "Flashcards"],
  endpoints(builder) {
    return {
      getDecks: builder.query({
        query: () => {
          return { url: "/api/decks", method: "GET" };
        },
        providesTags: ["Decks", "Flashcards"],
      }),
      getDeckById: builder.query({
        query: (id) => {
          return { url: `/api/decks/${id}` };
        },
        providesTags: ["Decks", "Flashcards"],
      }),
      removeDeck: builder.mutation({
        query: (deckId) => {
          return {
            url: `/api/decks/${deckId}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Decks", "Flashcards"],
      }),
      addDeck: builder.mutation({
        query: (deck) => {
          return {
            url: "/api/decks",
            method: "POST",
            body: { name: deck.name },
          };
        },
        invalidatesTags: ["Decks", "Flashcards"],
      }),
      addFlashcard: builder.mutation({
        query: (card) => {
          return {
            url: `/api/flashcards/`,
            method: "POST",
            body: card,
          };
        },
        invalidatesTags: ["Decks", "Flashcards"],
      }),
      updateFlashcard: builder.mutation({
        query: (card) => {
          return {
            url: `/api/flashcards/${card.id}`,
            method: "PUT",
            body: card,
          };
        },
        invalidatesTags: ["Decks", "Flashcards"],
      }),

      removeFlashcard: builder.mutation({
        query: (id) => {
          return {
            url: `/api/flashcards/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Decks", "Flashcards"],
      }),
    };
  },
});

export const {
  useGetDecksQuery,
  useGetDeckByIdQuery,
  useAddDeckMutation,
  useRemoveDeckMutation,
  useAddFlashcardMutation,
  useUpdateFlashcardMutation,
  useRemoveFlashcardMutation,
} = decksApi;
