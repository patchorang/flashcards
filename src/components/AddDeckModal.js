import { useAddDeckMutation } from "../store/apis/decksApi";
import { useSelector, useDispatch } from "react-redux";
import { updateNewDeckForm } from "../store/slices/flashcardsSlice";
import Modal from "./Modal";
import Button from "./Button";

function AddDeckModal({ onClose }) {
  const [addDeck, result] = useAddDeckMutation();
  const { name } = useSelector((state) => {
    return state.flashcardManager.newDeckForm;
  });
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    addDeck({ name: name });
    dispatch(updateNewDeckForm({ name: "" }));
    onClose();
  };

  const updateDeckForm = (event) => {
    const newName = event.target.value;
    dispatch(updateNewDeckForm({ name: newName }));
  };

  const inputClasses =
    "my-4 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

  return (
    <Modal onClose={onClose}>
      <form
        className="w-96 drop-shadow-lg bg-slate-50 p-8 m-8 rounded-xl"
        onSubmit={onSubmit}
      >
        <label className="text-xl font-bold">Add deck</label>
        <input
          autoFocus
          className={inputClasses}
          value={name}
          onChange={updateDeckForm}
          placeholder="Deck name"
        ></input>
        <div className="flex space-x-2 pt-4">
          <Button type="submit">Add Deck</Button>
          <Button danger onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default AddDeckModal;
