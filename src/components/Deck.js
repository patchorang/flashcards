import { useState } from "react";
// import {
//   useGetFlashcardsByDeckIdQuery,
//   useRemoveFlashcardMutation,
// } from "../store/apis/flashcardsApi";
import { useGetDeckByIdQuery } from "../store/apis/decksApi";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import FlashCard from "./FlashCard";
import Button from "./Button";

function Deck() {
  const deckId = useParams().id;
  const navigate = useNavigate();
  const { data: deckData } = useGetDeckByIdQuery(deckId);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const toPreviousCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    }
  };

  const toNextCard = () => {
    if (currentCardIndex < deckData.flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    }
  };

  let backButton = (
    <Link to="/" className="text-sm font-medium text-slate-500">
      Back to all decks
    </Link>
  );

  let renderedDeck = (
    <div className="max-w-lg mx-auto mt-4">
      {backButton}
      <div className="text-xl font-bold">
        {deckData ? deckData.name : "Loading..."}
      </div>
    </div>
  );

  let renderedCard = "Loading cards...";
  if (deckData && deckData.flashcards && deckData.flashcards.length > 0) {
    renderedCard = (
      <FlashCard
        card={deckData.flashcards[currentCardIndex]}
        toNextCard={toNextCard}
        toPreviousCard={toPreviousCard}
      />
    );
  } else {
    renderedCard = (
      <div className="w-full text-center text-l font-medium text-slate-500 my-4 drop-shadow-lg bg-slate-50 p-4 py-16 rounded-xl">
        No cards in this deck
      </div>
    );
  }

  renderedDeck = (
    <div className="max-w-lg mx-auto mt-4">
      {backButton}
      <div className="text-xl font-bold">
        {deckData ? deckData.name : "Loading..."}
      </div>
      {renderedCard}
      <div className="flex space-x-2">
        <Button onClick={() => navigate(`/decks/edit/${deckId}`)}>
          Edit cards
        </Button>
      </div>
    </div>
  );

  return <div>{renderedDeck}</div>;
}

export default Deck;
