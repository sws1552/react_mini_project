import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";
import { actionCreators as likeActions } from "../redux/modules/likes";
import { Text, Input, Grid, Button } from "../elements";
import Permit from "../shared/Permit";

import Post from "../components/Post";
import Search from "../components/Search";

import { FiPlus } from "react-icons/fi";

const PostList = (props) => {

  const dispatch = useDispatch();
  const post_list = useSelector((state)=> state.post.list)
  const likeButton = useSelector((state)=>state.likes.click)
  
  // likeButton 눌렀는지 확인 > true면 눌린거
  // console.log('useS', likeButton)
  

  React.useEffect(() => {
    // post_list가 0일 때만 getPostFB 하는거!
    // 이미 리스트 있을 때는 getPostFB 따로 안하고 기존에 있던 리덕스에서 불러옴
        if(!likeButton){
          dispatch(postActions.getPostFB());
        }
        else {
          dispatch(likeActions.setLikeFB());
        }
        
}, [likeButton]);

  if(post_list.length===0) {
    return (
      <React.Fragment>
          <Search></Search>
          <NoPost>
            <div style={{fontSize:"200px", fontWeight:"bold"}}>앗...🤔</div>
            <p style={{fontSize:"30px"}}>게시물이 없어요! 가장 먼저 게시물을 올려주세요!</p>
          </NoPost>
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
  } else {
    return (
      <React.Fragment>
          <Search></Search>
            <Postcards>
            {post_list.map((e, idx) => {
              return (
                    <Post
                      _onClick={() => {
                        history.push(`/detail/${e.id}`);
                      }}
                      key={e.id}
                      post={e}
                    />
              );
            })}
          </Postcards>
  
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
  }
  


};


// 카드 나타나는 전체 넓이
const Postcards = styled.div`
  column-count: 4;
  column-gap: 2em;
`

const NoPost = styled.div`
  text-align:center;
`

export default PostList;
