import {createAction, handleActions} from "redux-actions"
import {history} from "../configureStore";
import {produce} from "immer"
import axios from "axios";

// 액션타입 만들어줌
const LIKE_POST = "LIKE_POST";
const LIKE_SET = "LIKE_SET";

// 액션 만들어줌
// likePost는 리덕스 없어도 되나?
const likePost = createAction(LIKE_POST,(post_id, user_id,likers) => ({post_id, user_id,likers}))
const setLike = createAction(LIKE_SET,(post_list) => ({post_list}))


const initialState = {
    list:[{postId:"postid", id:"user_id", like:false}],
};


// 미들웨어
const likePostFB = (postId, islike) => {
    return function (dispatch, getState, {history}) {
        const _user = getState().user.user;
        // 로그인 한 _user.id는 숫자로 나옴 > 1,2,3,4, 등
        // console.log('유저정보확인', _user.id)
        const user_id = { id : _user.id }
        const post_id = { postId: postId }
        // console.log('겟!', getState().likes.like)
        
        // true(데이터 추가해야 될 때)
          axios
            .get(`/api/post/${postId}/likes`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            })
            .then(function (response) {
            //   console.log('추가된데이터', response);
            })
            .catch(function (error) {
              console.log(error);
            });

            // 전체리스트 조회
            axios
              .get("/api/posts/likes", {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
              .then(function (response) {
                console.log("좋아요리스트", response.data);
                // dispatch(likePost())
              })
              .catch(function (error) {
                console.log(error);
              });
          
        }
    
            
    }

const deleteLikeFB = (postId, islike) => {
    return function (dispatch, getState, {history}) {

    const _user = getState().user.user;
    // 로그인 한 _user.id는 숫자로 나옴 > 1,2,3,4, 등
    // console.log('유저정보확인', _user.id)
    const user_id = { id : _user.id }
    const post_id = { postId: postId }

    axios
        .delete(`/api/post/${postId}/likes`, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then(function (response) {
        //   console.log('삭제된데이터',response);
        })
        .catch(function (error) {
            console.log(error);
        });


        axios.get('/api/posts/likes',
        {headers: {'Authorization':`Bearer ${localStorage.getItem("token")}`},}
        )
        .then(function (response) {
            console.log('좋아요리스트', response.data)
            // dispatch(likePost())
            })
            .catch(function (error) {
            console.log(error);
            })

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
            // console.log('데이터 확인', {...action.payload.user_id, like:false})
            // console.log('전체리스트', action.payload.likers)
            // console.log('현재유저', action.payload.user_id.id)

            let target_list = action.payload.likers.filter( e => {
                return parseInt(e.id) === action.payload.user_id.id
            }
            
            )
            console.log('일치여부', target_list.length)

            if(target_list.length > 0) {
                draft.list.push({...action.payload.post_id, ...action.payload.user_id, like:true})
                console.log("true테스트")
            } else {
                draft.list.push({...action.payload.post_id, ...action.payload.user_id, like:false})
                console.log("false테스트")
            }

            // if(action.payload.likers.includes(action.payload.user_id)===true) {
            //     draft.list = [{...action.payload.post_id, ...action.payload.user_id, like:true}]
            //     console.log("true테스트")
            // } else {
            //     draft.list = [{...action.payload.post_id, ...action.payload.user_id, like:false}]
            //     console.log("false테스트")
            // }
            // likers에 user_id 없으면 initialState>like>false -> useSelector빈칸(좋아요X)
            // draft.like = false
            // likers에 user_id 있으면 initialState>like>false -> useSelector색깔(좋아요O)
            // draft.like = true
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
    deleteLikeFB,
}

export {actionCreators};