import uniqid from "uniqid";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const flashcardsApi = createApi({
  reducerPath: "flashcards",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3005" }),
  tagTypes: ["Flashcards"],
  endpoints(builder) {
    return {
      getFlashcards: builder.query({
        query: () => {
          return { url: "/flashcards", method: "GET" };
        },
        providesTags: ["Flashcards"],
      }),
      getFlashcardsByDeckId: builder.query({
        query: (deckId) => {
          return { url: `/flashcards/`, params: { deckId: deckId } };
        },
        providesTags: ["Flashcards"],
      }),
      addFlashcard: builder.mutation({
        query: (card) => {
          return {
            url: "/flashcards",
            method: "POST",
            body: { id: uniqid(), ...card },
          };
        },
        invalidatesTags: ["Flashcards"],
      }),
      updateFlashcard: builder.mutation({
        query: (card) => {
          return {
            url: `/flashcards/${card.id}`,
            method: "PUT",
            body: card,
          };
        },
        invalidatesTags: ["Flashcards"],
      }),
      removeFlashcard: builder.mutation({
        query: (id) => {
          return {
            url: `/flashcards/${id}`,
            method: "DELETE",
          };
        },
        invalidatesTags: ["Flashcards"],
      }),
    };
  },
});

export const {
  useGetFlashcardsQuery,
  useAddFlashcardMutation,
  useUpdateFlashcardMutation,
  useGetFlashcardsByDeckIdQuery,
  useRemoveFlashcardMutation,
} = flashcardsApi;
