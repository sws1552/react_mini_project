import React from "react";

import { Text, Input, Grid, Button } from "../elements";
import Post from "../components/Post";

const PostList = (props) => {
  return (
    <React.Fragment>
      <Grid is_flex wrap>

          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          
        

      </Grid>

      
    </React.Fragment>
  );
};

export default PostList;
