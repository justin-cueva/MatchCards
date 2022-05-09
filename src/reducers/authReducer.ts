type AuthActionTypes =
  | { type: "LOGIN"; payload: { userId: string } }
  | { type: "LOGOUT" }
  | { type: "GOT_DECKS"; payload: any[] };

export type Deck = {
  cards: any[];
  title: string;
  date?: string;
};

type DefaultStateType = {
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
    case "GOT_DECKS":
      if (!action.payload) return state;
      return { ...state, myDecks: Object.values(action.payload) };
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
