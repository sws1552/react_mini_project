import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { history } from "../redux/configureStore";
import { actionCreators as postActions } from "../redux/modules/post";
import { Text, Input, Grid, Button } from "../elements";

import Post from "../components/Post";

import { FiPlus } from "react-icons/fi";

const PostList = (props) => {

  const dispatch = useDispatch();
  const post_list = useSelector((state)=> state.post.list)
  console.log(post_list)

  React.useEffect(() => {
    // post_list가 0일 때만 getPostFB 하는거!
    // 이미 리스트 있을 때는 getPostFB 따로 안하고 기존에 있던 리덕스에서 불러옴
    // if(post_list.length === 0) {
        // dispatch(postActions.getPostFB());
        dispatch(postActions.setPost());
        
    // }
// 처음 페이지 켰을 때 한번만 불러오기 때문에 빈 배열
}, []);

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
                  {...e}
                />
              )
                
            })}


          </Postcards>
          {/* </Grid> */}
        {/* })} */}
      {/* </Grid> */}
      <Button
        is_float
        _onClick={() => {
          history.push(`/write`);
        }}
      >
        <FiPlus style={{ color: "white" }} />
      </Button>
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
