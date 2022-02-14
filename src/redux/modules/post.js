import {createAction, handleActions} from "redux-actions"
import {history} from "../configureStore";
import {produce} from "immer"
import axios from "axios";

// 액션타입
const SET_POST = "SET_POST"
// const LIKED_POST = "LIKED_POST"
const ADD_POST = "ADD_POST"


// 액션 생성 함수
const setPost = createAction(SET_POST, (post_list)=> ({post_list}))
// const likedPost = createAction(LIKED_POST, (post_list)=> ({post_list}))
const addPost = createAction(ADD_POST, (post)=> ({post}))

let createdAt = new Date()


const initialState = {
  list: [
    {
      id: 1,
      // 수정/삭제 버튼 보여주려면 둘중에 하나 있어야 할 듯
      // (서버에서 요청할 때도!) userID: "ID입니다" 이나 nickname:"닉네임입니다"
      title: "전지현 너무 예뻐",
      createdAt: createdAt,
      imageUrl:
        "https://thumb.mt.co.kr/06/2021/09/2021092406423496252_1.jpg/dims/optimize/",
      tags: [
        {
          id: 12,
          name: "전지현",
        },
        {
          id: 13,
          name: "화보",
        },
      ],
    },
  ],
};

// const initialPost = {

//     id: 1,
//     // 수정/삭제 버튼 보여주려면 둘중에 하나 있어야 할 듯(서버에서 요청할 때도!) userID: "ID입니다" 이나 nickname:"닉네임입니다"
//     title: "전지현 너무 예뻐",
//     createdAt: createdAt,
//     imageUrl:"https://thumb.mt.co.kr/06/2021/09/2021092406423496252_1.jpg/dims/optimize/",
//     tags: ["전지현", "화보"]

// }


// 미들웨어
const getPostFB = () => {
    return function (dispatch, getState, {history}) {
        // let post_list = []

        axios
          .get("/api/posts")
          .then(function (response) {
            console.log(response);
            // 서버 연결 확인 후 setPost로 dispatch할 데이터 가공해서 보내주기
            
            // post_list.push(post)
            // dispatch(setPost(post_list))
          })
          .catch(function (error) {
            console.log(error);
          });

    }
}


// 내가찜한사진만 불러오기 (getPostFB에서 조건 줘서 실행?)
// const likedPostFB = () => {


// }



export default handleActions (
    {
        [SET_POST]: (state, action) => produce(state, (draft)=> {
            // draft.list = action.payload.post_list;
        }),

        [ADD_POST]: (state, action) => produce(state, (draft)=> {

        }),

        // [LIKED_POST] : (state, action) => produce(state, (draft)=> {

        // }),


    }, initialState
);



const actionCreators = {
    setPost,
    // likedPost,
    addPost,
    getPostFB,
    // likedPostFB,
}

export {actionCreators}