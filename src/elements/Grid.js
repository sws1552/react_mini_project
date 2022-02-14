import { wrap } from "lodash";
import React from "react";
import isNull from "redux-actions/lib/utils/isNull";
import styled from "styled-components";

const Grid = (props) => {
  const { is_flex, width, margin, padding, bg, children, center, _wrap, tag_flex,flex_basic} = props;


  const styles = {
      is_flex: is_flex,
      flex_basic:flex_basic,
      width: width,
      margin: margin,
      padding: padding,
      bg: bg,
      center: center,
      _wrap: _wrap,
      tag_flex: tag_flex,
  };
  return (
    <React.Fragment>
      <GridBox {...styles}>{children}</GridBox>
    </React.Fragment>
  );
};

Grid.defaultProps = {
  chidren: null,
  is_flex: false,
  flex_basic: false,
  width: "100%",
  padding: false,
  margin: false,
  bg: false,
  center: false,
  _wrap: null,
  tag_flex: false,
};

const GridBox = styled.div`
  width: ${(props) => props.width};
  height: 100%;
  box-sizing: border-box;
  ${(props) => (props.padding ? `padding: ${props.padding};` : "")}
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
  ${(props) => (props.bg ? `background-color: ${props.bg};` : "")}
  ${(props) =>
    (props.is_flex
      ? `display: flex; align-items: center; justify-content: space-between;`: "")}
  ${(props) =>
    (props.flex_basic
      ? `display: flex; align-items: center; justify-content: end`: "")}
  ${(props) => (props.center ? `text-align: center` : '')}
  ${(props) => (props._wrap ? `flex-flow: wrap` : '')}
  ${(props) => (props.tag_flex ? `display: flex` : "" )}
  
`
  
export default Grid;
