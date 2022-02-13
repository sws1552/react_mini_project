import React from "react";
import styled from "styled-components";


const Button = (props) => {
  const { text, _onClick, is_float, children, margin, padding, width, disabled, radius } = props;

  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{text? text : children}</FloatButton>
      </React.Fragment>
    );
  }

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
    radius: radius,
  };

  return (
    <React.Fragment>
      <ElButton {...styles} disabled={disabled} onClick={_onClick}>{text? text: children}</ElButton>
    </React.Fragment>
  );
};

Button.defaultProps = {
  text: false,
  children: null,
  _onClick: () => {},
  is_float: false,
  margin: false,
  width: '100%',
  padding: "12px 0px",
  disabled: false,
  radius: null,
};

const ElButton = styled.button`
  width: ${(props) => props.width};
  background-color: #212121;
  color: #ffffff;
  // padding: 12px 0px;
  padding: ${(props) => props.padding};
  box-sizing: border-box;
  border: none;
  ${(props) => (props.radius? `border-radius: ${props.radius};` : '')}
  ${(props) => (props.margin? `margin: ${props.margin};` : '')}

  :hover {
    cursor: pointer;
  }
`;

const FloatButton = styled.button`
  width: 60px;
  height: 60px;
  background-color: #212121;
  color: #ffffff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  bottom: 30px;
  right: 30px;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    cursor: pointer;
    transition: all ease 1.2s;
    transform: rotate(90deg);
  }

  :not(:hover) {
    transition: all ease 1.5s;
    transform: rotate(-90deg);
  }

`;

export default Button;
