import React from "react";
// import {useRef, useState} from "react"
import _ from "lodash"; // lodash 부르기
import styled from "styled-components";

import { Text, Input, Grid, Button } from "../elements";

import { useDispatch } from "react-redux"
import { actionCreators as userActions } from "../redux/modules/user"
import { idCheck, passwordCheck, nicknameCheck } from "../shared/common";
import axios from "axios";


const Signup = (props) => {
    const dispatch = useDispatch();

    const [id, setId] = React.useState("");
    const [nickname, setNickname] = React.useState("");
    const [pwd, setPwd] = React.useState("");
    const [pwdCheck, setPwdCheck] = React.useState("");

    // debounce로 onChange 횟수 감소
    // 입력 속도 고려하여 0.5초로 반영
    const debounceId = _.debounce((k) => setId(k), 300);
    const keyPressId = React.useCallback(debounceId, []);

    const IdValue = (e) => {
      keyPressId(e.target.value);
    };

    const debounceName = _.debounce((k) => setNickname(k), 500);
    const keyPressName = React.useCallback(debounceName, []);

    const NicknameValue = (e) => {
        keyPressName(e.target.value);
    };

    const debouncePwd = _.debounce((k) => setPwd(k), 500);
    const keyPressPwd = React.useCallback(debouncePwd, []);

    const PwdValue = (e) => {
      keyPressPwd(e.target.value);
    };

    const debounceCheck = _.debounce((k) => setPwdCheck(k), 300);
    const keyPressCheck = React.useCallback(debounceCheck, []);

    const PwdCheckValue = (e) => {
      keyPressCheck(e.target.value);
    };

    const signup = () => {
        if(id ==="" || nickname === "" || pwd ==="" || pwdCheck ==="") {
            window.alert('모든 입력칸을 빠짐없이 채워주세요')
            return
        }

        if(!idCheck(id)) {
            window.alert('아이디 형식에 맞게 입력해주세요\n(숫자 혹은 영어로만 4글자 이상)')
            return
        }

        if(!nicknameCheck(nickname)) {
            window.alert('닉네임 형식에 맞게 입력해주세요\n(한글, 숫자, 영어 중 10글자 이하)')
            return;
        }

        if(!passwordCheck(pwd)) {
          window.alert('비밀번호 형식에 맞게 입력해주세요\n(숫자, 영어, 특수문자 중 8글자 이상)')
          return;
      }

        if(pwd !== pwdCheck) {
            window.alert('비밀번호와 비밀번호 확인 값이 일치하지 않습니다')
            return;
        }

        dispatch(userActions.signupFB(id, pwd, nickname));

    }

    
      const idChecking = () => {
        // console.log(id)

        if (id === '') {
          window.alert('아이디를 입력 후 중복확인을 진행해주세요')
          return
        } else if(!idCheck(id)) {
          window.alert('아이디 형식에 맞게 입력 후 중복확인 해주세요\n(숫자 혹은 영어로만 4글자 이상)')
          return
        }
          // dispatch(userActions.idCheckingFB(id));
          // console.log(id)
          axios.post('/api/user/check',
            {userID:id},
            )
          .then(function(response) {
            // console.log(response);
            if (response.data.msg === '가입가능') {
              window.alert('사용 가능한 ID입니다')
            } else if (response.data.errorMessage==="이미 있는 아이디입니다."){
              window.alert('사용불가! 이미 사용 중인 아이디입니다.')
            };
          })
          .catch(function (error) {
            console.log(error);
          });

    }
    
    

    return (
      <React.Fragment>
        <Container>
        <Grid>
            <Text fontFamily='Malssami815' margin="10px 0px" textAlign="center" size="32px" bold>
                회원가입 정보 작성
            </Text>

          <Grid padding="16px" flex_end>
            <Input
            label="아이디"
            placeholder="숫자 혹은 영어로만 4글자 이상 20글자 이하로 입력해주세요"
            _onChange = {IdValue}
            >
            </Input>
            <Button
            _onClick={idChecking}
            text="중복확인" width="150px" margin="0px 10px"></Button>
          </Grid>

          <Grid padding="16px">
            <Input
            label="닉네임"
            placeholder="한글, 숫자, 영어로만 10글자 이하"
            _onChange = {NicknameValue}
            >
            </Input>
          </Grid>

          <Grid padding="16px">
            <Input
            label="비밀번호"
            type="password"
            placeholder="숫자, 영어, 특수문자 포함 8글자 이상 입력해주세요"
            _onChange = {PwdValue}
            >
            </Input>
          </Grid>

          <Grid padding="16px">
            <Input
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요"
            _onChange = {PwdCheckValue}
            >
            </Input>
          </Grid>

        <Button width="96%" padding="16px" displayBlock _onClick={signup} margin="20px auto" text="회원가입"></Button>

        </Grid>
        </Container>
      </React.Fragment>
    );


}


Signup.defaultProps = {};

const Container = styled.div`
    width: 50%;
    margin: 0px auto 50px auto;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 20px 0px;
    padding: 30px;
    border-radius: 20px;
`;

export default Signup;