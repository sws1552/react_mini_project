import React from "react";
import _ from "lodash"; // lodash 부르기

import { Text, Input, Grid, Button } from "../elements";

import {useDispatch} from "react-redux"
import {actionCreators as userActions} from "../redux/modules/user"
import { idCheck, passwordCheck } from "../shared/common";


const Signup = (props) => {
    const dispatch = useDispatch();
    const [userID, setId] = React.useState("");
    const [nickname, setNickname] = React.useState("");
    const [password, setPwd] = React.useState("");
    const [pwdCheck, setPwdCheck] = React.useState("");

    // debounce로 onChange 횟수 감소
    // 입력 속도 고려하여 0.5초로 반영
    const debounceId = _.debounce((k) => setId(k), 500);
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

    const debounceCheck = _.debounce((k) => setPwdCheck(k), 500);
    const keyPressCheck = React.useCallback(debounceCheck, []);

    const PwdCheckValue = (e) => {
      keyPressCheck(e.target.value);
    };

    const signup = () => {
        if(!passwordCheck(password)) {
            window.alert('비밀번호 형식에 맞게 입력해주세요')
            return;
        }

        if(password !== pwdCheck) {
            window.alert('비밀번호와 ')
            return;
        }
    }
    

    return (
      <React.Fragment>
        <Grid>
            <Text size="32px" bold>
                회원가입 정보 작성
            </Text>

          <Grid padding="16px">
            <Input
            label="아이디"
            placeholder="숫자 혹은 영어로만 4글자 이상 20글자 이하로 입력해주세요"
            _onChange = {IdValue}
            >
            
            </Input>
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
            placeholder="숫자, 영어, 특수문자 포함 8글자 이상 입력해주세요"
            _onChange = {PwdValue}
            >
            </Input>
          </Grid>

          <Grid padding="16px">
            <Input
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요"
            _onChange = {PwdCheckValue}
            >
            </Input>
          </Grid>

        <Button _onClick={signup} text="회원가입"></Button>

        </Grid>
      </React.Fragment>
    );


}


Signup.defaultProps = {};

export default Signup;