import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import {history} from "../configureStore";

// 액션타입
const SET_USER = "SET_USER";

// 액션생성함수
const setUser = createAction(SET_USER, (user) => ({user}))

// 초기값
const initialState = {
    userID: "iamuser",
    nickname: "닉네임",
    password: "12345678",
    passwordCheck: "12345678"
};


// 미들웨어 자리
const signupFB = (id, pwd) => {
  return function (dispatch, getState, {history}) {

    

  }
}



const loginFB = (id, pwd) => {
  return function (dispatch, getState, {history}) {



  }
}






// 리듀서
export default handleActions(
  {
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        // "is_login" : 함수이름, "success" : 저장할 값
        // setCookie("is_login", "success")
        // action creators에서 받아온 값
        draft.user = action.payload.user;
        // draft.is_login = true;
      }),
  },
  initialState
); 


// action creator export
const actionCreators = {
    setUser

};

export { actionCreators }