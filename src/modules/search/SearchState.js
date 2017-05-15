import {Map} from 'immutable';

// Initial state
const initialState = Map({
  query: '',
  loading: false
});

// Actions
const RESET = 'SearchState/RESET';

// Action creators
export function reset() {
  return {type: RESET};
}

// Reducer
export default function SearchStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case RESET:
      return initialState;

    default:
      return state;
  }
}
