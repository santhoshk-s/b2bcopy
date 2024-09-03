import { userDataType } from "../actions"

export const modulesState = {
  userData: null,
}

export const modulesReducer = (state = modulesState, action) => {
  switch(action.type) {
    case userDataType.SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    default: return state;
  }
};