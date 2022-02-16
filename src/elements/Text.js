import React from "react";
import styled from "styled-components";

const Text = (props) => {
  const { bold, _onClick, color, size, children, margin, hover, textAlign, fontFamily} = props;

  const styles = {bold: bold, color: color, size: size, margin, hover, textAlign:textAlign, fontFamily:fontFamily};
  return (
      <P {...styles} onClick={_onClick}>
          {children}
      </P>
  )
};

Text.defaultProps = {
  children: null,
  bold: false,
  color: "#222831",
  size: "14px",
  margin: false,
  _onClick: () => {},
  hover: false,
  textAlign:'',
  fontFamily:'',
};

const P = styled.p`
  color: ${(props) => props.color};
  font-size: ${(props) => props.size};
  font-weight: ${(props) => (props.bold? "600" : "400")};
  ${(props) => (props.textAlign? `text-align:${props.textAlign}`:'')};
  ${(props) => (props.margin? `margin: ${props.margin};` : '')}
  ${(props) => (props.hover? `&:hover{cursor:pointer};` : '')}
  text-shadow: 1px 0 1px gray;
  ${(props) => (props.fontFamily? `font-family:${props.fontFamily}`:'')};

`;

export default Text;
