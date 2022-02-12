import React from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import { Text, Input, Grid, Button } from "../elements";
import Post from "../components/Post";

import { FiPlus } from "react-icons/fi";

const PostList = (props) => {
  return (
    <React.Fragment>
      <Grid margin="30px 0px">
        {/* post_list에 있는 카드 수만큼 그려주기 */}
        {/* {post_list.map((p, idx) => { */}
          <Grid _wrap is_flex>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            <Post></Post>
            
          </Grid>
        {/* })} */}
      </Grid>
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

export default PostList;
