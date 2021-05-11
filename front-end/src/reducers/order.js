import {
  SAVE_ORDER,
} from '../actions';

const INITIAL_STATE = {
  status: '',
};

export default function order(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SAVE_ORDER:
    return { ...state, status: action.message };
  default:
    return state;
  }
}
