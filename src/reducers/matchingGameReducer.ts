import { Deck } from "./authReducer";

type Card = { definition: string; term: string; number: number };

export type Actions =
  | { type: "CHANGE_GAME_STATUS"; payload: string }
  | { type: "GET_DECK"; payload: Deck }
  | { type: "SORT_CARD_SIDES"; payload: Card[] }
  | { type: "ADD_TIME" }
  | { type: "SUCCESS"; payload: number };

export const defaultState = {
  gameStatus: "PREGAME",
  deck: null,
  cardSides: [],
  stopwatch: 0,
};

type CardSide = {
  type: string;
  text: string;
  number: number;
};

export type StateType = {
  gameStatus: string;
  deck: Deck | null;
  cardSides: CardSide[];
  stopwatch: number;
};

export const matchingGameReducer = (
  state: StateType = defaultState,
  action: Actions
) => {
  switch (action.type) {
    case "SUCCESS":
      const newCardSides = state.cardSides.filter((cardSide) => {
        return cardSide.number !== action.payload;
      });

      return { ...state, cardSides: newCardSides };
    case "ADD_TIME":
      return { ...state, stopwatch: state.stopwatch + 0.1 };
    case "SORT_CARD_SIDES":
      const cardDefinitionsArr = action.payload.map((card) => {
        return {
          type: "definition",
          text: card.definition,
          number: card.number,
        };
      });
      const cardTermsArr = action.payload.map((card) => {
        return {
          type: "term",
          text: card.term,
          number: card.number,
        };
      });

      const shuffle = (array: any[]) => {
        let currentIndex = array.length,
          randomIndex;

        while (currentIndex != 0) {
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex],
          ];
        }

        return array;
      };

      const allHalfCardsShuffled = shuffle([
        ...cardDefinitionsArr,
        ...cardTermsArr,
      ]);

      console.log(allHalfCardsShuffled);

      return { ...state, cardSides: allHalfCardsShuffled };
    case "GET_DECK":
      return { ...state, deck: action.payload };
    case "CHANGE_GAME_STATUS":
      return { ...state, gameStatus: action.payload };
    default:
      return state;
  }
};
