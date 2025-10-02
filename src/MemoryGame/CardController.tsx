import { useEffect, useMemo, useRef, useState } from "react";
import lodash from "lodash";
import CardGrid from "./CardGrid";
import Bee from "../assets/Bee.png";
import Capybara from "../assets/Capybara.png";
import Dog from "../assets/Dog.png";
import Llama from "../assets/Llama.png";
import Octopus from "../assets/Octopus.png";
import PurpOctopus from "../assets/PurpOctopus.png";
import Spider from "../assets/Spider.png";
import Worker from "../assets/Worker.png";

export default function CardController() {
  const [card1, setCard1] = useState("h");
  const [card2, setCard2] = useState("i");
  const [amountCorrect, setAmountCorrect] = useState(0);
  const totalMoves = useRef<number>(0);

  const shuffledText = useMemo(
    () =>
      lodash.shuffle([
        Bee,
        Bee,
        Capybara,
        Capybara,
        Dog,
        Dog,
        Llama,
        Llama,
        Octopus,
        Octopus,
        PurpOctopus,
        PurpOctopus,
        Spider,
        Spider,
        Worker,
        Worker,
      ]),
    []
  );
  const [flippedCards, setFlippedCards] = useState(0);

  useEffect(() => {
    if (flippedCards === 2) {
      totalMoves.current += 1;
    }
  }, [flippedCards]);

  function onCardFlipped(random: string) {
    if (flippedCards === 0) {
      setCard1(random);
    }
    if (flippedCards === 1) {
      setCard2(random);
    }

    if (flippedCards < 2) {
      setFlippedCards((prev) => prev + 1);
    }
  }

  function onClose(
    setVisText: React.Dispatch<React.SetStateAction<string>>,
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    setDisabled(false);
    setVisText("hi");
  }

  function useEffectCode(
    setIsCorrect: React.Dispatch<React.SetStateAction<boolean>>,
    ranText: string,
    setDisabled: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    if (flippedCards === 2) {
      if (card1 === card2) {
        if (ranText === card1 || ranText === card2) {
          setTimeout(() => {
            setIsCorrect(true);
            setAmountCorrect((prev) => prev + 0.5);

            setDisabled(true);
            setFlippedCards(0);
          }, 1000);
        }
      }

      if (card1 !== card2) {
        setTimeout(() => {
          setFlippedCards(0);
        }, 2000);
      }
    }
  }

  return (
    <CardGrid
      flippedCards={flippedCards}
      shuffledText={shuffledText}
      onCardFlipped={onCardFlipped}
      onClose={onClose}
      setFlippedCards={setFlippedCards}
      useEffectCode={useEffectCode}
      card1={card1}
      card2={card2}
      amountCorrect={amountCorrect}
      totalMoves={totalMoves}
    />
  );
}
