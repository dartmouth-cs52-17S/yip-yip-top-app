import {Map} from 'immutable';

// Initial state
const initialState = Map({
  location: String,
  loading: false
});

// Actions
const RESET = 'FeedState/RESET';

// Action creators
export function reset() {
  return {type: RESET};
}

// Reducer
export default function FeedStateReducer(state = initialState, action = {}) {
  switch (action.type) {
    case RESET:
      return initialState;

    default:
      return state;
  }
}
