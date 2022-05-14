type AuthActionTypes =
  | { type: "LOGIN"; payload: { userId: string } }
  | { type: "LOGOUT" }
  | { type: "GOT_DECKS"; payload: any[] }
  | { type: "DELETE_DECK"; payload: { deckId: string } };

export type Deck = {
  cards: any[];
  title: string;
  date?: string;
  key: string;
};

export type DefaultStateType = {
  isLoggedIn: boolean;
  userId: string;
  myDecks: Deck[];
};

export const defaultState = {
  isLoggedIn: false,
  userId: "",
  myDecks: [],
};

export default (
  state: DefaultStateType = defaultState,
  action: AuthActionTypes
) => {
  switch (action.type) {
    case "DELETE_DECK":
      const filteredDecks = state.myDecks.filter((deck) => {
        console.log(deck.key);
        console.log(action.payload.deckId);
        return deck.key !== action.payload.deckId;
      });

      console.log(filteredDecks);
      return { ...state, myDecks: filteredDecks };
    case "GOT_DECKS":
      if (!action.payload) return state;
      // console.log(Object.entries(action.payload));
      const x = Object.entries(action.payload).map((ent) => {
        return { ...ent[1], key: ent[0] };
      });

      return { ...state, myDecks: x };
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        userId: action.payload.userId,
      };
    case "LOGOUT":
      return { ...defaultState };
    default:
      return state;
  }
};
