import React from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import { Text, Input, Grid, Button } from "../elements";
import Post from "../components/Post";

import { FiPlus } from "react-icons/fi";

const PostList = (props) => {
  return (
    <React.Fragment>
      {/* <Grid is_flex margin="30px 0px"> */}
        {/* post_list에 있는 카드 수만큼 그려주기 */}
        {/* {post_list.map((p, idx) => { */}
          {/* <Grid _wrap is_flex> */}
          <Postcards>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
          </Postcards>
          {/* </Grid> */}
        {/* })} */}
      {/* </Grid> */}
      <Button
        is_float
        _onClick={() => {
          history.push("/write");
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
  // width: 100%;
  // margin: auto;

`

export default PostList;
