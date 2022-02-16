import {createAction, handleActions} from "redux-actions"
import {actionCreators as postActions} from "./post";
import {history} from "../configureStore";
import {produce} from "immer"
import axios from "axios";

// 액션타입 만들어줌
const LIKE_POST = "LIKE_POST";
const SET_LIKE = "SET_LIKE";
const CALL_LIKE = "CALL_LIKE";

// 액션 만들어줌
const setLike = createAction(SET_LIKE,(post_list) => ({post_list}))
const callLike = createAction(CALL_LIKE,() => ({}))


const initialState = {
    list:[{postId:"postid", id:"user_id", like:false}],
    click:false,
};


// 미들웨어
const likePostFB = (postId) => {
    return function (dispatch, getState, {history}) {

        
        // true(데이터 추가해야 될 때)
          axios
            .get(`/api/post/${postId}/likes`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then(function (response) {
              console.log('추가된데이터', response);
            //   dispatch(postActions.setPost(response.data))
            // 데이터 하나만 나옴
              dispatch(postActions.likePost(response.data))
            })
            .catch(function (error) {
              console.log(error);
            });
          
        }
    
            
    }

const deleteLikeFB = (postId) => {
    return function (dispatch, getState, {history}) {

    axios
        .delete(`/api/post/${postId}/likes`, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then(function (response) {
          console.log('삭제된데이터',response);
        //   dispatch(postActions.setPost(response.data))
        // 데이터 하나만 나옴
          dispatch(postActions.likePost(response.data))
        })
        .catch(function (error) {
            console.log(error);
        });

    }
    }
        
    


const setLikeFB = () => {
    return function (dispatch, getState, {history}) {
        axios
        .get('/api/posts/likes', {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then(function (response) {
          console.log('setLIKE', response.data);
          dispatch(setLike(response.data))
        // 데이터 하나만 나옴
        })
        .catch(function (error) {
            console.log(error);
        });

    }
    }


// 리듀서
export default handleActions (
    {

        // 내가찜한사진
        [SET_LIKE] : (state, action) => produce(state, (draft)=> {
            draft.list = action.payload.post_list;
            console.log('draft',draft.list)
        }),

        [CALL_LIKE] : (state, action) => produce(state, (draft)=> {
          draft.click = true;
          console.log('버튼클릭 테스트', draft.click)
      }),


    }, initialState
);




const actionCreators = {
    likePostFB,
    setLike,
    setLikeFB,
    deleteLikeFB,
    callLike,
}

export {actionCreators};