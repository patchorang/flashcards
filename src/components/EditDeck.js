import { SlTrash } from "react-icons/sl";
import uniqid from "uniqid";
import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetDeckByIdQuery } from "../store/apis/decksApi";
import {
  useUpdateFlashcardMutation,
  useAddFlashcardMutation,
  useRemoveFlashcardMutation,
} from "../store/apis/decksApi";
import { updateEditCardPage } from "../store/slices/flashcardsSlice";
import { useEffect } from "react";
import Button from "./Button";

function EditDeck() {
  const deckId = useParams().id;
  const navigate = useNavigate();
  const { data: deckData } = useGetDeckByIdQuery(deckId);
  const [updateCard] = useUpdateFlashcardMutation();
  const [addCard] = useAddFlashcardMutation();
  const [removeCard] = useRemoveFlashcardMutation();
  const [cardsToRemoveUponCleanup, setCardsToRemoveUponCleanup] = useState([]);
  const [savingChanges, setSavingChanges] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  const { cardValues } = useSelector(
    (state) => state.flashcardManager.editCardPage
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (cardValues && cardValues.length === 0) {
      addCardToTempStorage();
    }
  });

  useEffect(() => {
    dispatch(updateEditCardPage((deckData && deckData.flashcards) || []));
  }, [deckData]);

  const updateCardFront = (event, cardId) => {
    let newFront = event.target.value;
    let newData = [...cardValues];
    var foundIndex = newData.findIndex(
      (card) => card.id === cardId || card.tempId === cardId
    );
    newData[foundIndex] = { ...newData[foundIndex], front: newFront };
    dispatch(updateEditCardPage(newData));
  };

  const updateCardBack = (event, cardId) => {
    let newBack = event.target.value;
    let newData = [...cardValues];
    var foundIndex = newData.findIndex(
      (card) => card.id === cardId || card.tempId === cardId
    );
    newData[foundIndex] = { ...newData[foundIndex], back: newBack };
    dispatch(updateEditCardPage(newData));
  };

  const onRemoveCard = (event, cardId) => {
    let newData = [...cardValues];
    for (var i = 0; i < newData.length; i++) {
      if (newData[i].id === cardId) {
        // this is an existing card we need to delete it later
        setCardsToRemoveUponCleanup([...cardsToRemoveUponCleanup, cardId]);
        break;
      }
    }

    newData = newData.filter((card) => {
      if (card.id) {
        return card.id !== cardId;
      } else {
        return card.tempId !== cardId;
      }
    });
    dispatch(updateEditCardPage(newData));
  };

  const addCardToTempStorage = () => {
    let newData = [...cardValues];
    newData.push({
      front: "",
      back: "",
      tempId: uniqid(),
      deckId: deckId,
    });
    dispatch(updateEditCardPage(newData));
  };

  const inputClasses =
    "flex-auto  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2";

  const inputErrorClasses =
    "flex-auto  bg-gray-50 border border-red-400 text-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-600 block p-2.5 mb-2";

  const getInputClasses = (value) => {
    if (showValidation && value === "") {
      return inputErrorClasses;
    }
    return inputClasses;
  };

  let renderedDeck = <div>Loading cards...</div>;

  const isValid = () => {
    const allValid = cardValues.reduce(
      (val, card) => val && card.front !== "" && card.back !== "",
      true
    );
    return allValid;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setShowValidation(true);
    if (isValid()) {
      setSavingChanges(true);
      for (const id of cardsToRemoveUponCleanup) {
        await removeCard(id);
      }

      for (const card of cardValues) {
        if (card.front || card.back) {
          if (card.id) {
            updateCard(card);
          } else {
            let newCard = { ...card };
            delete newCard.tempId;
            await addCard(newCard);
          }
        }
      }
      setSavingChanges(false);
      navigate(`/decks/${deckId}`);
    }
  };

  const handleAddNewCard = (e) => {
    e.preventDefault();
    addCardToTempStorage();
  };

  let emptyState = (
    <div className="w-full text-center text-l font-medium text-slate-500 mb-4 drop-shadow-lg bg-slate-50 p-4 py-16 rounded-xl">
      What!? You don't have any cards? That's crazy.
    </div>
  );

  let loadingState = (
    <div className="w-full text-center text-l font-medium text-slate-500 mb-4 drop-shadow-lg bg-slate-50 p-4 py-16 rounded-xl">
      Saving deck...
    </div>
  );

  const renderedEditor =
    cardValues &&
    ((
      <div className="flex pb-2">
        <label className="flex-auto text-sm font-medium text-slate-500">
          Front
        </label>
        <label className="flex-auto text-sm font-medium text-slate-500 ml-2">
          Back
        </label>
      </div>
    ),
    cardValues.map((card, index) => {
      return (
        <div key={card.id || card.tempId} className="flex space-x-2">
          <input
            autoFocus
            className={getInputClasses(card.front)}
            value={card.front}
            onChange={(e) => updateCardFront(e, card.id || card.tempId)}
          ></input>
          <input
            className={getInputClasses(card.back)}
            value={card.back}
            onChange={(e) => updateCardBack(e, card.id || card.tempId)}
          ></input>
          <div
            className="grid place-items-center hover:text-red-500 hover:text-red-700 hover:bg-red-100 cursor-pointer text-center w-10 h-10 rounded-lg"
            onClick={(e) => {
              const id = card.id || card.tempId;
              onRemoveCard(e, id);
            }}
          >
            <SlTrash />
          </div>
        </div>
      );
    }));

  let backButton = (
    <Link to="/" className="text-sm font-medium text-slate-500">
      Back to all decks
    </Link>
  );

  let renderedDisplay = emptyState;
  if (savingChanges) {
    renderedDisplay = loadingState;
  } else if (cardValues && cardValues.length > 0) {
    renderedDisplay = renderedEditor;
  }

  const handleDeckName = (e) => {
    const name = e.target.value;
  };

  if (cardValues) {
    renderedDeck = (
      <form onSubmit={onSubmit} className="max-w-lg border-gray-300">
        {backButton}
        <div className="text-xl font-bold">
          {deckData ? deckData.name : "Loading..."}
        </div>
        <div className="pt-4">{renderedDisplay}</div>
        <div className="flex justify-between">
          <Button onClick={handleAddNewCard}>Add card</Button>
          <div className="flex space-x-2">
            <Button danger onClick={() => navigate(`/decks/${deckId}`)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
    );
  }

  return <div className="max-w-lg mx-auto mt-4">{renderedDeck}</div>;
}

export default EditDeck;
