import React from "react";
import styled from "styled-components";

import './App.css';


function App() {
  return (
    <React.Fragment>
      <Container>
          메인페이지
      </Container>
    </React.Fragment>
  );
}

const Container = styled.div`
  width: 80vw;
  height: 80vh;
  margin: auto;
  background-color: orange;
  border 1px solid #ddd;
  border-radius: 10px;
  // padding: 60px 20px 130px;

`


export default App;
