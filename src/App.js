import { Route, Routes, Link } from "react-router-dom";
import DeckList from "./components/DeckList";
import EditDeck from "./components/EditDeck";
import Deck from "./components/Deck";

function App() {
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
