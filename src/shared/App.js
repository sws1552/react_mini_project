import React from "react";
import styled from "styled-components";
import { ConnectedRouter } from "connected-react-router";
import {history} from "../redux/configureStore";
import { Route } from "react-router-dom";


import Login from '../pages/Login';
import Signup from '../pages/Signup';


function App() {
  return (
    <React.Fragment>
      <Background>
        <Container>
          <ConnectedRouter history={history}>
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={Signup} />
          </ConnectedRouter>
        </Container>
      </Background>
    </React.Fragment>
  );
}

const Background = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #eee;
  // display: flex;
  // justify-content: center;
  // align-items: center;

`

const Container = styled.div`
  width: 80vw;
  margin: auto;
  border: 1px solid #ddd;
  border-radius: 10px;
  // padding: 60px 20px 130px;

`


export default App;
