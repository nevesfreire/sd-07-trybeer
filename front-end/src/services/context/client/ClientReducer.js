const CHANGE_MENU = 'CHANGE_MENU';

function ClientReducer(state, action) {
  switch (action.type) {
  case CHANGE_MENU:
    return { ...state, isHiddenMenu: !state.isHiddenMenu };
  default:
    return state;
  }
}

export { CHANGE_MENU, ClientReducer };
