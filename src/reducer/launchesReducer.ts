 import type { Launch } from '../types/launch';

export type State = {
  launches: Launch[];
  loading: boolean;
  error: string | null;
};

export type Action =
  | {
      type: 'FETCH_START';
    }
  | {
      type: 'FETCH_SUCCESS';
      payload: Launch[];
    }
  | {
      type: 'FETCH_ERROR';
      payload: string;
    };

    export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'FETCH_SUCCESS':
      return {
        ...state,
        launches: action.payload,
        loading: false,
        error: null,
      };

    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};