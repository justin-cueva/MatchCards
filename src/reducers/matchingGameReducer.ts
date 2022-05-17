import { Deck } from "./authReducer";

export type Actions =
  | { type: "CHANGE_GAME_STATUS"; payload: string }
  | { type: "GET_DECK"; payload: Deck };

export const defaultState = { gameStatus: "PREGAME", deck: null };

export type DefaultStateType = {
  gameStatus: string;
  deck: Deck | null;
};

export const matchingGameReducer = (
  state: DefaultStateType = defaultState,
  action: Actions
) => {
  switch (action.type) {
    case "GET_DECK":
      return { ...state, deck: action.payload };
    case "CHANGE_GAME_STATUS":
      return { ...state, gameStatus: action.payload };
    default:
      return state;
  }
};
