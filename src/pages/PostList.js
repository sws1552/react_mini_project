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
  
  // likeButton 눌렀는지 확인 > true면 눌린거
  console.log('useS', likeButton)
  

  React.useEffect(() => {
    // post_list가 0일 때만 getPostFB 하는거!
    // 이미 리스트 있을 때는 getPostFB 따로 안하고 기존에 있던 리덕스에서 불러옴
    // if(post_list.length === 0) {
        if(!likeButton){
          console.log('전체사진볼거야')
          dispatch(postActions.getPostFB());
        }
        else {
          console.log('내가찜한사진볼거야')
          dispatch(likeActions.setLikeFB());
        }
      // }
}, [likeButton]);

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

          <Postcards>
          {post_list.map((e, idx) => {
            return (
              // <Items key={idx}>
                // <Figure>
                  <Post
                    _onClick={() => {
                      history.push(`/detail/${e.id}`);
                    }}
                    key={e.id}
                    post={e}
                  />
              // </Figure>
              // </Items>
            );
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
  margin-top: 30px;

  column-count: 4;
  column-gap: 1em;
  
`


// const Items = styled.div`
// display: flex;
// justify-content: center;
// margin-bottom: 1em;
// cursor: pointer; `;

// const Figure = styled.div`
// display: inline-block;

// `;



export default PostList;
