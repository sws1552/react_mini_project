import {createAction, handleActions} from "redux-actions"
import {history} from "../configureStore";
import {produce} from "immer"
import axios from "axios";
import {actionCreators as imageActions} from "./image";
import { filter } from "lodash";

// 액션타입
const SET_POST = "SET_POST"
const ADD_POST = "ADD_POST"
const ONE_POST = "ONE_POST"
const LIKE_POST = "LIKE_POST"
const TAG_CLICK = "TAG_CLICK"

// 액션 생성 함수
const setPost = createAction(SET_POST, (post_list)=> ({post_list}))
const addPost = createAction(ADD_POST, (post)=> ({post}))
const onePost = createAction(ONE_POST, (one_post)=> ({one_post}));
const likePost = createAction(LIKE_POST, (post)=> ({post}));
const tagClick = createAction(TAG_CLICK, ()=>({}));

let createdAt = new Date()


const initialState = {
  list: [],
  one_post: {
    user: {
      userID: ""
    },
    imageUrl: "",
    tags: [
      {
        name: ''
      }
    ]
  },
  tagclick: false,
};



// 미들웨어
const getPostFB = () => {
    return function (dispatch, getState, {history}) {
        let post_list = []
        // let user = getState().user.user
        // console.log("getPost사용자정보",user)

        axios
          .get("/api/posts")
          .then(function (response) {
            console.log('게시물조회',response.data);
            // console.log('게시물조회',response.data);
            let postDB = response.data;
            
            post_list.push(...postDB)
            dispatch(setPost(post_list))
          })
          .catch(function (error) {
            console.log(error);
          });

    }
}



const addPostFB = (title, tagData, imageForm) => {
  return function (dispatch, getState, {history}){

    axios.post('/api/post/image',imageForm, // 미리 약속한 주소
            ).then(function (res) {
                console.log("upload response !! ", res);
                // console.log("upload response !! ", res);

                axios
                  .post("/api/post/new",
                    {
                      title: title,
                      imageUrl: res.data,
                      tags: tagData,
                    },
                    {
                      headers: {'Authorization':`Bearer ${localStorage.getItem("token")}`},
                    }
                  )
                  .then(function (res2) {
                    console.log('addPostFB res !! ', res2);
                    // console.log('addPostFB res !! ', res2);

                    const post = {
                      Likers: res2.data.Likers,
                      id: res2.data.id,
                      createdAt: createdAt,
                      title: res2.data.title,
                      imageUrl: res2.data.imageUrl,
                      tags: res2.data.tags,
                      user: res2.data.user,
                    };

                    console.log('리듀서에 보낼 post !! ', post);

                    dispatch(addPost(post));

                    history.replace("/");

                    dispatch(imageActions.setpreview(null));
                    
                  })
                  .catch(function (error) {
                    console.log(error);
                  });

            })
            .catch(function (error) {
                console.log(error);
            });
  }
}


const getOnePostFB = (postId) => {
  return function(dispatch, getState, {history}){
    console.log("postId !! ",postId);
    // console.log("postId !! ",postId);

    axios
      .get(`/api/posts/detail/${postId}`)
      .then(function (res) {

        dispatch(onePost(res.data));

      })
      .catch(function (error) {
        console.log(error);
      });

  }
}


const updateOnePostFB = (postId, title, tags) => {
  return function(dispatch, getState, {history}) {

    axios
      .patch(`/api/post/${postId}`, 
        {
          title: title,
          tags: tags,
        },
        {
          headers: {'Authorization':`Bearer ${localStorage.getItem("token")}`},
        }
      )
      .then(function (res) {

        console.log('update res !! ', res.data);

        history.replace('/');

      })
      .catch(function (error) {
        console.log(error);
      });

  }
}


const deleteOnePostFB = (postId) => {
  return function(dispatch, getState, {history}) {
    
    axios
        .delete(`/api/post/${postId}`, 
        {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then(function (response) {
          console.log('delete res !! ',response);
        
          history.replace('/');
          
        })
        .catch(function (error) {
            console.log(error);
        });

  }
}

const tagListFB = (tagName) => {
  return function(dispatch, getState, {history}) {
    axios
      .get(`/api/posts?tag=${tagName}`)
      .then(function (res) {
        // console.log('조회되나?',res.data)
        dispatch(setPost(res.data))
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}






export default handleActions (
    {
        [SET_POST]: (state, action) => produce(state, (draft)=> {
            draft.one_post = initialState.one_post;
            draft.list = action.payload.post_list;
            // console.log('draft', draft.list)
        }),

        [ADD_POST]: (state, action) => produce(state, (draft)=> {
          draft.list.unshift(action.payload.post);
        }),

        [ONE_POST] : (state, action) => produce(state, (draft)=> {
          draft.one_post = action.payload.one_post;
        }),

        [LIKE_POST] : (state, action) => produce(state, (draft)=> {
          // console.log('반영전',draft.list)
          draft.list = draft.list.map(target => {
            if(target.id === action.payload.post.id) {
              return action.payload.post;
            } else {
              return target;
            }
          })
        }),

        [TAG_CLICK] : (state, action) => produce(state, (draft)=> {
          draft.tagclick = draft.tagclick===true?false:true;
        }),


    }, initialState
);



const actionCreators = {
    setPost,
    addPost,
    getPostFB,
    addPostFB,
    getOnePostFB,
    updateOnePostFB,
    likePost,
    deleteOnePostFB,
    tagListFB,
    tagClick,
}

export {actionCreators}