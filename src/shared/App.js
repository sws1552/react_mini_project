import React from "react";
import styled from "styled-components";

import './App.css';


function App() {
  return (
    <React.Fragment>
      <Back>
        <Container>메인페이지</Container>
      </Back>
    </React.Fragment>
  );
}

const Back = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #eee;
  // display: flex;
  // justify-content: center;
  // align-items: center;

`

const Container = styled.div`
  width: 80vw;
  height: 80vh;
  margin: auto;
  // background-color: orange;
  // border 1px solid #ddd;
  // border-radius: 10px;
  // padding: 60px 20px 130px;

`


export default App;
