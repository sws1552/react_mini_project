import React from "react";
import styled from "styled-components";
import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { actionCreators as userActions } from "../redux/modules/user";
import { actionCreators as likeActions } from "../redux/modules/likes";

import Header from "../components/Header";
import {Grid, Button} from "../elements";
import PostList from '../pages/PostList';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import PostWrite from '../pages/PostWrite';
import PostDetail from "../pages/PostDetail";
import './App.css';





function App() {

  const dispatch = useDispatch();
  const is_token = localStorage.getItem("token") ? true : false;

  React.useEffect(()=>{
   
    if (is_token){
      dispatch(userActions.loginCheckFB());
    }
  }, []);
  

  return (
    <React.Fragment>

      {/* <Grid width="60%" margin ="auto"> */}
      <Background>
        <Header></Header>
        

          <Container> 
            <ConnectedRouter history={history}>
              
              <Route path="/" exact component={PostList} />
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={Signup} />
              <Route path="/write" exact component={PostWrite} />
              <Route path="/detail/:id" exact component={PostDetail} />
              
            </ConnectedRouter>
          </Container>
        </Background>

        {/* </Grid> */}
      
    </React.Fragment>
  );
}

const Background = styled.div`
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background-color: #eee;

`

const Container = styled.div`
  width: 90vw;
  margin: auto;
  border-radius: 10px;
`


export default App;
