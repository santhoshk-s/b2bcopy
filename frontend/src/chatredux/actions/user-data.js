export const userDataType = {
    GET_USER_DATA: 'GET_USER_DATA',
    SET_USER_DATA: 'SET_USER_DATA',
  }
  
  export const getUserData = (data) => 
  ({
    type: userDataType.GET_USER_DATA,
    payload: data,
  });
  
  export const setUserData = (data) => 
  ({
    type: userDataType.SET_USER_DATA,
    payload: data,
  });