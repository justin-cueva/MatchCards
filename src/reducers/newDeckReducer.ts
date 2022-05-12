export type ActionTypes =
  | {
      type: "CHANGE_TITLE";
      payload: string;
    }
  | { type: "CHANGE_TERM"; payload: { term: string; cardNumber: number } }
  | {
      type: "CHANGE_DEFINITION";
      payload: { definition: string; cardNumber: number };
    }
  | { type: "ADD_CARD" }
  | { type: "DELETE_CARD"; payload: number }
  | { type: "CREATE_DECK" }
  | { type: "EDIT_DECK"; payload: { deck: ConfigDeckState } }
  | { type: "ADD_CREATION_DATE"; payload: Date };

const timeElapsed = Date.now();
const today = new Date(timeElapsed);
const month = today.getMonth();
const day = today.getDate();
const year = today.getFullYear();
const initDate = `${month + 1}-${day}-${year}`;

export const newDeckInitState = {
  date: initDate,
  key: "",
  title: "",
  cards: [
    { term: "", definition: "", number: 1 },
    { term: "", definition: "", number: 2 },
    { term: "", definition: "", number: 3 },
  ],
};

export type Card = {
  term: string;
  definition: string;
  number: number;
};

type ConfigDeckState = {
  key?: string;
  title: string;
  cards: Card[];
  date?: string;
};

export const configDeckReducer = (
  state: ConfigDeckState,
  action: ActionTypes
) => {
  switch (action.type) {
    case "EDIT_DECK":
      console.log(action.payload.deck);
      return { ...action.payload.deck };
    case "CREATE_DECK":
      return { ...newDeckInitState };
    case "ADD_CARD":
      const cardNumbers = state.cards.map((card) => {
        return card.number;
      });

      const newNum = Math.max(...cardNumbers) + 1;

      return {
        ...state,
        cards: [...state.cards, { term: "", definition: "", number: newNum }],
      };
    case "DELETE_CARD":
      return {
        ...state,
        cards: state.cards.filter((card) => {
          return card.number !== action.payload;
        }),
      };
    case "CHANGE_TITLE":
      return { ...state, title: action.payload };
    case "CHANGE_TERM":
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card.number === action.payload.cardNumber) {
            return { ...card, term: action.payload.term };
          } else {
            return card;
          }
        }),
      };
    case "CHANGE_DEFINITION":
      return {
        ...state,
        cards: state.cards.map((card) => {
          if (card.number === action.payload.cardNumber) {
            return { ...card, definition: action.payload.definition };
          } else {
            return card;
          }
        }),
      };
    default:
      return state;
  }
};
