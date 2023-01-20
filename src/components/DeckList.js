import { SlTrash, SlPencil } from "react-icons/sl";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateDeckToRemove } from "../store/slices/flashcardsSlice";
import { useNavigate } from "react-router-dom";
import { useGetDecksQuery } from "../store/apis/decksApi";
import { useGetFlashcardsQuery } from "../store/apis/flashcardsApi";
import AddDeckModal from "./AddDeckModal";
import RemoveDeckModal from "./RemoveDeckModal";
import Button from "./Button";

function DeckList() {
  const { data, error, isLoading } = useGetDecksQuery();
  const { data: allFlashcards } = useGetFlashcardsQuery();
  const [showNewDeckForm, setShowNewDeckForm] = useState(false);
  const [showRemoveDeckModal, setShowRemoveDeckModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onCloseNewDeckForm = () => {
    setShowNewDeckForm(false);
  };

  const onCloseRemoveDeckModal = () => {
    setShowRemoveDeckModal(false);
    dispatch(updateDeckToRemove(""));
  };

  const handleRemoveDeck = (e, id) => {
    dispatch(updateDeckToRemove(id));
    setShowRemoveDeckModal(true);
    e.stopPropagation();
  };

  let renderedDecks = (
    <div className="w-full text-center text-l font-medium text-slate-500 my-4 drop-shadow-lg bg-slate-50 p-4 py-16 rounded-xl">
      What!? You don't have any decks? That's crazy.
    </div>
  );

  const getNumFlashcardsForDeckWithId = (id) => {
    return (
      allFlashcards && allFlashcards.filter((card) => card.deckId === id).length
    );
  };

  if (data && data.length > 0) {
    renderedDecks = data.map((deck) => {
      return (
        <div
          key={deck.id}
          className="cursor-pointer drop-shadow-lg hover:drop-shadow-xl bg-slate-50 p-4 my-4 rounded flex justify-between items-center"
          onClick={() => navigate(`/decks/${deck.id}`)}
        >
          <div>
            <div className="text-xl font-bold pt-2 pl-4">{deck.name}</div>
            <div className="text-sm font-medium text-slate-500 pl-4 pb-2 ">
              {getNumFlashcardsForDeckWithId(deck.id)}{" "}
              {getNumFlashcardsForDeckWithId(deck.id) == 1
                ? "flashcard"
                : "flashcards"}
            </div>
          </div>

          <div className="flex">
            <div
              className="grid place-items-center text-slate-500 hover:text-sky-500 hover:bg-sky-100 cursor-pointer text-center w-10 h-10 rounded-lg "
              onClick={(e) => {
                navigate(`/decks/edit/${deck.id}`);
                e.stopPropagation();
              }}
            >
              <SlPencil className="align-bottom" size={20} />
            </div>
            <div
              className="grid place-items-center text-slate-500 hover:text-red-500 hover:bg-red-100 cursor-pointer text-center w-10 h-10 rounded-lg "
              onClick={(e) => {
                handleRemoveDeck(e, deck.id);
              }}
            >
              <SlTrash className="align-bottom" size={20} />
            </div>
          </div>
        </div>
      );
    });
  }

  return (
    <div className="max-w-lg mx-auto mt-4">
      <div className="text-3xl font-bold">Quizmet</div>
      {renderedDecks}
      <Button
        onClick={() => {
          setShowNewDeckForm(true);
        }}
      >
        Add deck
      </Button>

      {showNewDeckForm && <AddDeckModal onClose={onCloseNewDeckForm} />}
      {showRemoveDeckModal && (
        <RemoveDeckModal onClose={onCloseRemoveDeckModal} />
      )}
    </div>
  );
}

export default DeckList;
