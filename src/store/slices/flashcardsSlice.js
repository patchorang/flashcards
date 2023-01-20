import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newCardForm: {
    front: "",
    back: "",
  },
  editCardForm: {
    front: "",
    back: "",
  },
  newDeckForm: {
    name: "",
  },
  editCardPage: {
    cardValues: [],
  },
  deckToRemove: { id: "" },
};

export const flashcardsSlice = createSlice({
  name: "flashcardsManager",
  initialState,
  reducers: {
    updateNewCardFront: (state, action) => {
      state.newCardForm.front = action.payload.front;
    },
    updateNewCardBack: (state, action) => {
      state.newCardForm.back = action.payload.back;
    },
    updateEditCardForm: (state, action) => {
      state.editCardForm.front = action.payload.front;
      state.editCardForm.back = action.payload.back;
    },
    updateCard: (state, action) => {
      const cardId = action.payload.id;
      const index = state.flashcards.findIndex((card) => card.id === cardId);
      state.flashcards[index].front = action.payload.front;
      state.flashcards[index].back = action.payload.back;
    },
    updateNewDeckForm: (state, action) => {
      state.newDeckForm.name = action.payload.name;
    },
    updateEditCardPage: (state, action) => {
      state.editCardPage.cardValues = action.payload;
    },
    updateDeckToRemove: (state, action) => {
      state.deckToRemove.id = action.payload;
    },
  },
});

export const {
  updateNewCardFront,
  updateNewCardBack,
  updateEditCardForm,
  updateCard,
  updateNewDeckForm,
  updateEditCardPage,
  updateDeckToRemove,
} = flashcardsSlice.actions;
export default flashcardsSlice.reducer;
