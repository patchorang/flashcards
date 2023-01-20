import {
  SlArrowLeftCircle,
  SlArrowRightCircle,
  SlRefresh,
} from "react-icons/sl";
import { useEffect, useState } from "react";
import IconButton from "./IconButton";

function FlashCard({ card, toNextCard, toPreviousCard }) {
  const [displayFront, setDisplayFront] = useState(true);

  useEffect(() => {
    setDisplayFront(true);
  }, [card]);

  const handleOnClick = () => {
    setDisplayFront(!displayFront);
  };

  var cardText = displayFront ? card.front : card.back;

  let renderedText = (
    <div className="text-4xl font-bold w-full text-center p-16">{cardText}</div>
  );

  if (!cardText) {
    renderedText = (
      <div className="text-xl font-regular w-full text-center p-16 text-slate-400">
        No value
      </div>
    );
  }

  return (
    <div className="drop-shadow-lg bg-slate-50 p-4 my-4 rounded-xl">
      <IconButton onClick={handleOnClick} icon={SlRefresh}>
        {displayFront ? "Flip to definition" : "Flip to term"}
      </IconButton>
      {renderedText}
      <div className="flex justify-between mt-4">
        <IconButton onClick={toPreviousCard} icon={SlArrowLeftCircle}>
          Previous card
        </IconButton>
        <IconButton
          onClick={toNextCard}
          icon={SlArrowRightCircle}
          onRight={true}
        >
          Next card
        </IconButton>
      </div>
    </div>
  );
}

export default FlashCard;
