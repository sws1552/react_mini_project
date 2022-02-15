import {createAction, handleActions} from "redux-actions"
import {history} from "../configureStore";
import {produce} from "immer"
import axios from "axios";

// 액션타입 만들어줌
const LIKE_POST = "LIKE_POST";
const LIKE_SET = "LIKE_SET";

// 액션 만들어줌
// likePost는 리덕스 없어도 되나?
const likePost = createAction(LIKE_POST,(user_id,likers) => ({user_id,likers}))
const setLike = createAction(LIKE_SET,(post_list) => ({post_list}))


const initialState = {
    like:false,
};


// 미들웨어
const likePostFB = (postId, islike) => {
    return function (dispatch, getState, {history}) {
        const _user = getState().user.user;
        // console.log('유저정보확인', _user)
        // console.log('겟!', getState().likes.like)

        if(getState().likes.like === true) {
            axios.delete(`/api/post/15/likes`,
            {headers: {'Authorization':`Bearer ${localStorage.getItem("token")}`},})
            .then(function (response) {
                console.log(response.data.Likers)
                // dispatch(likePost(_user.id,response.data.Likers))
              })
              .catch(function (error) {
                console.log(error);
              })
        } else {
            axios.get(`/api/post/15/likes`,
            {headers: {'Authorization':`Bearer ${localStorage.getItem("token")}`},}
            )
            .then(function (response) {
                console.log(response.data.Likers)
                // dispatch(likePost(_user,response.data.Likers))
              })
              .catch(function (error) {
                console.log(error);
              })
        }
    }
}


const setLikeFB = () => {
    return function (dispatch, getState, {history}) {
        // axios.get
        // 헤더도 있어야 할 듯
    }
}



// 리듀서
export default handleActions (
    {
        // 찜등록/해제
        [LIKE_POST] : (state, action) => produce(state, (draft)=> {
            // likers에 user_id 없으면 initialState>like>false -> useSelector빈칸(좋아요X)
            // draft.like = false
            // likers에 user_id 있으면 initialState>like>false -> useSelector색깔(좋아요O)
            // draft.like = true
            action.payload.likers.includes(action.payload.user_id)?draft.like=true:draft.like=false;
        }),

        // 내가찜한사진
        [LIKE_SET] : (state, action) => produce(state, (draft)=> {

        }),


    }, initialState
);




const actionCreators = {
    likePost,
    likePostFB,
    setLike,
    setLikeFB,
}

export {actionCreators};