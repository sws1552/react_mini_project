import React from "react";
import styled from "styled-components";

import { Text, Grid } from "./index";

const Input = (props) => {
  const { label, placeholder, _onChange, type, multiLine, defaultValue, disabled } = props;
  
  if(multiLine){
    return (
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <ElTextarea
          rows={10}
          placeholder={placeholder}
          onChange={_onChange}
        ></ElTextarea>
      </Grid>
    );
  }
  
  return (
    <React.Fragment>
      <Grid>
        {label && <Text margin="0px">{label}</Text>}
        <ElInput type={type} placeholder={placeholder} onChange={_onChange} defaultValue={defaultValue} disabled={disabled} />
      </Grid>
    </React.Fragment>
  );
};

Input.defaultProps = {
  multiLine: false,
  label: false,
  placeholder: "텍스트를 입력해주세요.",
  type: "text",
  _onChange: () => {},
  defaultValue: "",
  disabled: false,
};

const ElTextarea = styled.textarea`
  border: 1px solid #212121;
  width: 100%;
  padding: 12px 4px;
  box-sizing: border-box;
`;


const ElInput = styled.input`
  border: 1px solid #eee;
  width: 100%;
  padding: 12px 10px;
  box-sizing: border-box;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px 0px;

  &:focus{
    outline: none;
    box-shadow: 0 0 0 3px #9E56EB;
  }

`;

export default Input;
