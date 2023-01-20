// NOT USED ANY MORE
import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import { useAddFlashcardMutation } from "../store/apis/flashcardsApi";
import {
  updateNewCardFront,
  updateNewCardBack,
} from "../store/slices/flashcardsSlice";

function AddCardModal({ onClose }) {
  const deckId = useParams().id;
  const [addFlashcard, result] = useAddFlashcardMutation();
  const { front, back } = useSelector((state) => {
    return state.flashcardManager.newCardForm;
  });

  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    addFlashcard({ front: front, back: back, deckId: deckId });
    dispatch(updateNewCardBack({ back: "" }));
    dispatch(updateNewCardFront({ front: "" }));
    onClose();
  };

  const updateCardFront = (event) => {
    const newFront = event.target.value;
    return dispatch(updateNewCardFront({ front: newFront }));
  };

  const updateCardBack = (event) => {
    const newBack = event.target.value;
    return dispatch(updateNewCardBack({ back: newBack }));
  };

  const inputClasses =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <Modal onClose={onClose}>
      <form
        className="w-96 drop-shadow-lg bg-slate-50 p-8 m-8"
        onSubmit={onSubmit}
      >
        <label className="text-xl font-medium">Add Card</label>
        <input
          autoFocus
          className={inputClasses}
          value={front}
          onChange={updateCardFront}
          placeholder="Front of card"
        ></input>
        <input
          className={inputClasses}
          value={back}
          onChange={updateCardBack}
          placeholder="Back of card"
        ></input>
        <button
          type="submit"
          className="w-24 bg-sky-500 text-white p-2 rounded"
        >
          Add Card
        </button>
        <button
          onClick={onClose}
          className="w-24 border-sky-500 border-2 text-sky-500 p-2 rounded hover:bg-sky-50"
        >
          Cancel
        </button>
      </form>
    </Modal>
  );
}

export default AddCardModal;
