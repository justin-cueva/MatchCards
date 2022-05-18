import { Deck } from "./authReducer";

export type Actions =
  | { type: "CHANGE_GAME_STATUS"; payload: string }
  | { type: "GET_DECK"; payload: Deck }
  | { type: "SORT_CARD_SIDES"; payload: Card[] }
  | { type: "ADD_TIME" }
  | { type: "SUCCESS"; payload: number }
  | { type: "FIRST_CARD"; payload: { number: number; type: string } }
  | { type: "SECOND_CARD"; payload: { number: number; type: string } }
  | { type: "WRONG" }
  | { type: "ADD_4_SECS" }
  | { type: "FINISHED_GAME" };

type Card = { definition: string; term: string; number: number };

type CardSide = {
  type: string;
  text: string;
  number: number;
};

type ClickedCard = { number: number; type: string };

export type StateType = {
  gameStatus: string;
  deck: Deck | null;
  cardSides: CardSide[];
  stopwatch: number;
  firstClickedCard: ClickedCard | null;
  secondClickedCard: ClickedCard | null;
};

export const defaultState = {
  gameStatus: "PREGAME",
  deck: null,
  cardSides: [],
  stopwatch: 0,
  firstClickedCard: null,
  secondClickedCard: null,
};

export const matchingGameReducer = (
  state: StateType = defaultState,
  action: Actions
) => {
  switch (action.type) {
    case "FINISHED_GAME":
      return { ...defaultState };
    case "ADD_4_SECS":
      return { ...state, stopwatch: state.stopwatch + 4 };
    case "WRONG":
      return {
        ...state,
        secondClickedCard: null,
        firstClickedCard: null,
      };
    case "SECOND_CARD":
      return { ...state, secondClickedCard: action.payload };
    case "FIRST_CARD":
      // the case that we click the same card
      if (
        state.firstClickedCard?.number === action.payload.number &&
        state.firstClickedCard?.type === action.payload.type
      ) {
        return { ...state, firstClickedCard: null };
        // case we click a card for the first time
      } else if (!state.firstClickedCard) {
        return { ...state, firstClickedCard: action.payload };
        // case we click second card
      } else {
        return state;
      }
    case "SUCCESS":
      const newCardSides = state.cardSides.filter((cardSide) => {
        return cardSide.number !== action.payload;
      });
      return {
        ...state,
        cardSides: newCardSides,
        firstClickedCard: null,
        secondClickedCard: null,
      };
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
      console.log(action.payload);
      return { ...state, deck: action.payload };
    case "CHANGE_GAME_STATUS":
      return { ...state, gameStatus: action.payload };
    default:
      return state;
  }
};
