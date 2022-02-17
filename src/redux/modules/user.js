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
  user: {
    userID: '',
  },
  is_login: false,
  msg: '',
};


// 미들웨어 자리
// 회원가입
const signupFB = (id, pwd, nickname) => {
  let createdAt = new Date()
  let updatedAt = null

  return function (dispatch, getState, {history}) {
    axios.post('/api/user/new',
    {userID:id, nickname:nickname, password:pwd, createdAt:createdAt, updatedAt: updatedAt,},
    )
    
    .then(function(response) {
      // console.log('회원가입 확인', response);

      window.alert('회원가입 완료! 로그인 후 이용해주세요!')
      history.replace('/login')
    })
    .catch(function (error) {
      console.log('에러확인', error);

      window.alert('입력정보를 조건에 맞게 작성해주세요')
      return
    });


  }
}


// 로그인 된 상태인지 확인
const loginCheckFB = () => {
  return function (dispatch, getState, {history}) {

    axios.get('/api/user/me',
    {
      headers: {'Authorization':`Bearer ${localStorage.getItem("token")}`},}
    )
    
    .then(function(response) {
      console.log("logincheckFB !! ", response);
      
      if(response.data.user) {
        dispatch(setUser({
          userID: response.data.user.userID,
          id:response.data.user.id,
          nickname: response.data.user.nickname,
          token : localStorage.getItem("token"),
        }));
      } else {
        dispatch(logOut());
      }
  })
    
    .catch(function (error) {
      console.log('logincheckFB error !!', error);
    });

  }

  }

// 로그인
const loginFB = (id, pwd) => {
  return function (dispatch, getState, {history}) {

    // axios는 axios.요청타입으로 요청을 보낼 수 있어요. 이 방식을 별칭 메서드라고 불러요.
    // 예시)
    // axios.get(url, config)
    // axios.post(url, data, config)

    // 어떤 요청을 보낼 지, 별칭 메서드 사용
    axios.post('/api/user/login', // 미리 약속한 주소
      {
        userID: id,
        password: pwd,
      }, // 서버가 필요로 하는 데이터를 넘겨주고,
      // {
      //   headers: { 'Authorization': '내 토큰 보내주기' },
      //   // authorization: `Bearer ${localStorage.getItem("token")}`
      // } // 누가 요청했는 지 알려줍니다. (config에서 해요!)
    ).then(function (response) {
      console.log('로그인정보확인',response);

      dispatch(setUser({
        userID: response.data.user.userID,
        id:response.data.user.id,
        nickname: response.data.user.nickname,
        token : response.data.token,
      }));

      history.push('/');
      
    })
    .catch(function (error) {
      window.alert('아이디 혹은 비밀번호가 일치하지 않습니다.');
      console.log(error);
    });

  }
}

// 로그아웃
const logoutFB = () => {
  return function (dispatch, getState, {history}) {
    dispatch(logOut());
    history.replace('/')
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

        localStorage.setItem('token', action.payload.user.token)
        draft.user = action.payload.user;
        draft.is_login = true;
      }),

      [LOG_OUT]: (state, action) => produce(state, (draft)=>{
        localStorage.removeItem('token')
      
        draft.user = '';
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
    logoutFB,
    loginCheckFB,
};

export { actionCreators }