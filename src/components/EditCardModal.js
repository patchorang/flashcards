import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "./Modal";
import { useUpdateFlashcardMutation } from "../store/apis/flashcardsApi";
import { useParams } from "react-router-dom";
import { updateEditCardForm } from "../store/slices/flashcardsSlice";

function EditCardModal({ card, onClose }) {
  const deckId = useParams().id;

  const { front, back } = useSelector(
    (state) => state.flashcardManager.editCardForm
  );

  const [updateCard, result] = useUpdateFlashcardMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateEditCardForm({ front: card.front, back: card.back }));
  }, [card]);

  const inputClasses =
    "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-2";

  const updateEditFormFront = (event) => {
    const newFront = event.target.value;
    dispatch(updateEditCardForm({ front: newFront, back: back }));
  };

  const updateEditFormBack = (event) => {
    const newBack = event.target.value;
    dispatch(updateEditCardForm({ front: front, back: newBack }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const newCard = { id: card.id, front: front, back: back, deckId: deckId };
    updateCard(newCard);
    onClose && onClose();
  };

  return (
    <Modal onClose={onClose}>
      <form
        onSubmit={onSubmit}
        className="w-96 drop-shadow-lg bg-slate-50 p-8 m-8"
      >
        <label className="text-xl font-medium">Edit Card</label>
        <input
          autoFocus
          className={inputClasses}
          value={front}
          onChange={updateEditFormFront}
        ></input>
        <input
          className={inputClasses}
          value={back}
          onChange={updateEditFormBack}
        ></input>
        <button
          type="submit"
          className="w-24 bg-sky-500 text-white p-2 rounded"
        >
          Save Card
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

export default EditCardModal;
