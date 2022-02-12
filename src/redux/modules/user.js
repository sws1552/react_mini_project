import {createAction, handleActions} from "redux-actions";
import {produce} from "immer";
import {history} from "../configureStore";
import axios from "axios";

// 액션타입
const SET_USER = "SET_USER";
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";

// 액션생성함수
const logOut = createAction(LOG_OUT, (user)=>({user}));
const getUser = createAction(GET_USER, (user)=>({user}));
const setUser = createAction(SET_USER, (user) => ({user}))

// 초기값
const initialState = {
  user: null,
  is_login: false,
};


// 미들웨어 자리
const signupFB = (id, pwd, nickname) => {
  let createdAt = new Date()
  let updatedAt = null

  return function (dispatch, getState, {history}) {
    axios.post('/api/user/new',
    {userID:id, nickname:nickname, password:pwd, createdAt:createdAt, updatedAt: updatedAt,},
    // {header: {'Authorization':'내토큰 보내주기?'},}
    ).then(function(response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    history.push('/login')
  }
}



const loginFB = (id, pwd) => {
  return function (dispatch, getState, {history}) {

    console.log("id, pwd !! ", id, pwd);

    // axios는 axios.요청타입으로 요청을 보낼 수 있어요. 이 방식을 별칭 메서드라고 불러요.
    // 예시)
    // axios.get(url, config)
    // axios.post(url, data, config)

    // 어떤 요청을 보낼 지, 별칭 메서드 사용
    axios.post('http://14.45.204.153:5000/api/user/login', // 미리 약속한 주소
      {
        userID: id, 
        status: pwd,
      }, // 서버가 필요로 하는 데이터를 넘겨주고,
      // {
      //   headers: { 'Authorization': '내 토큰 보내주기' },
      //   // authorization: `Bearer ${localStorage.getItem("token")}`
      // } // 누가 요청했는 지 알려줍니다. (config에서 해요!)
    ).then(function (response) {
      console.log(response);
      history.push('/');
      // localStorage.setItem('token', response.token);
    })
    .catch(function (error) {
      console.log(error);
    });

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

        localStorage.setItem('token', )
        draft.user = action.payload.user;
        draft.is_login = true;
      }),

      [LOG_OUT]: (state, action) => produce(state, (draft)=>{
        localStorage.removeItem('token')
      
        draft.user = null;
        draft.is_login = false;
      }),
  },
  initialState
); 



// action creator export
const actionCreators = {
    setUser,
    logOut,
    getUser,
    signupFB,
    loginFB,

};

export { actionCreators }