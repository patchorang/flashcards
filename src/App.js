import { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import FlashCard from "./components/FlashCard";
import EditCardModal from "./components/EditCardModal";
import AddCardModal from "./components/AddCardModal";
import DeckList from "./components/DeckList";
import EditDeck from "./components/EditDeck";
import Deck from "./components/Deck";
import {
  useGetFlashcardsQuery,
  useAddFlashcardMutation,
} from "./store/apis/flashcardsApi";

function App() {
  // const flashcards = useSelector((state) => state.flashcards.flashcards);
  const { data, error, isLoading } = useGetFlashcardsQuery();
  const [addFlashcard, response] = useAddFlashcardMutation();

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showCardEditor, setShowCardEditor] = useState(false);
  const [showNewCardForm, setShowNewCardForm] = useState(false);

  const toPreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const toNextCard = () => {
    if (currentCardIndex < data.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  const onCloseCardEditor = () => {
    setShowCardEditor(false);
  };

  const onCloseNewCardForm = () => {
    setShowNewCardForm(false);
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<DeckList />} />
        <Route path="/decks/:id" element={<Deck />} />
        <Route path="/decks/edit/:id" element={<EditDeck />} />
      </Routes>
    </>
  );
}
export default App;
