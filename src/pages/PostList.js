import React from "react";
import styled from "styled-components";

import { history } from "../redux/configureStore";
import { Text, Input, Grid, Button } from "../elements";
import Post from "../components/Post";

import { FiPlus } from 'react-icons/fi';

const PostList = (props) => {
  return (
    <React.Fragment>
      
      <Grid _wrap is_flex >

          <Post></Post>
          <Post></Post>
          <Post></Post>
          <Post></Post>
          
      </Grid>
      <Button is_float _onClick={()=> {
        history.push('/write')
      }}><FiPlus style={{color:"white"}}/></Button>
    </React.Fragment>
  );
};


// Button = styled.div`

// &:hover {

// cursor: pointer;
// }


// `

export default PostList;
