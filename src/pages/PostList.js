import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as likeActions } from "../redux/modules/likes";
import { Text, Input, Grid, Button } from "../elements";
import Permit from "../shared/Permit";

import Post from "../components/Post";

import { FiPlus } from "react-icons/fi";

const PostList = (props) => {

  const dispatch = useDispatch();
  const post_list = useSelector((state)=> state.post.list)
  const like_list = useSelector((state)=> state.likes.list)
  const likeButton = useSelector((state)=>state.likes.click)
  const _user = useSelector((state)=>state.user.user)
  // const _like = useSelector((state)=> state.likes)
  console.log('useS', likeButton)
  

  React.useEffect(() => {
    // post_list가 0일 때만 getPostFB 하는거!
    // 이미 리스트 있을 때는 getPostFB 따로 안하고 기존에 있던 리덕스에서 불러옴
    // if(post_list.length === 0) {
        // if(!likeButton){
          dispatch(postActions.getPostFB());
        // }
        // else {
        //   dispatch(likeActions.setLike());
        // }
}, []);

  // React.useEffect(() => {
  //   // post_list가 0일 때만 getPostFB 하는거!
  //   // 이미 리스트 있을 때는 getPostFB 따로 안하고 기존에 있던 리덕스에서 불러옴
  //   // if(post_list.length === 0) {
  //       // if(!likeButton){
  //         // dispatch(postActions.getPostFB());
  //       // }
  //       // else {
  //         dispatch(likeActions.setLikeFB());
  //       // }
  // }, []);


  return (
    <React.Fragment>
      {/* <Grid is_flex margin="30px 0px"> */}
        {/* post_list에 있는 카드 수만큼 그려주기 */}
        {/* {post_list.map((p, idx) => { */}
          {/* <Grid _wrap is_flex> */}
          <Postcards>
            {post_list.map((e,idx) => {
              return (
                <Post
                _onClick={() => {
                  history.push(`/detail/${e.id}`)
                }}
                  key={e.id}
                  post={e}
                />
              )
                
            })}


          </Postcards>
          {/* </Grid> */}
        {/* })} */}
      {/* </Grid> */}
      <Permit>
        <Button
          is_float
          _onClick={() => {
            history.push(`/write`);
          }}
        >
          <FiPlus style={{ color: "white" }} />
        </Button>
      </Permit>
    </React.Fragment>
  );
};


// 카드 나타나는 전체 넓이
const Postcards = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  margin: auto;

  // display: grid;
  // grid-template-columns: 1fr 1fr 1fr;


`

export default PostList;
