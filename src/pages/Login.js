import React from "react";
import { Text, Input, Grid, Button } from "../elements";

import {useDispatch} from "react-redux";
import {actionCreators as userActions} from "../redux/modules/user";
import { debounce } from "lodash";
import {idCheck, passwordCheck} from "../shared/common";
import styled from "styled-components";

const Login = (props) => {
    const dispatch = useDispatch();

    const [id, setId] = React.useState('');
    const [pwd, setPwd] = React.useState('');


    const debounceid = debounce((e) => {
        setId(e.target.value);
    }, 500);

    const idKeyPress = React.useCallback(debounceid, []);

    const changeId = ((e) => idKeyPress(e));

    const debouncePwd = debounce((e) => {
        setPwd(e.target.value);
    }, 500);

    const pwdKeyPress = React.useCallback(debouncePwd, []);

    const changePwd = ((e) => pwdKeyPress(e));
    

    const login = () => {

        if(id === "" || pwd === ""){
            window.alert("아이디 혹은 비밀번호가 공란입니다.");
            return;
        }

        if(!idCheck(id)) {
            window.alert("아이디는 숫자, 영어로만 4글자 이상 20글 이하로 !!");
            return;
        }

        if(!passwordCheck(pwd)){
            window.alert("비밀번호는 숫자, 영어, 특수문자 포함 8글자 이상 !! ");
            return;
        }

        dispatch(userActions.loginFB(id, pwd));

    }

    return (
        <React.Fragment>
            <Container>
            <Grid padding="16px">
                <Text margin="10px 0px" textAlign="center" size="32px" bold>로그인</Text>
            </Grid>

            <Grid padding="16px">
                <Input label="아이디" 
                placeholder="아이디를 입력하세요."
                _onChange={changeId} />
            </Grid>

            <Grid padding="16px">
                <Input label="비밀번호" 
                placeholder="비밀번호를 입력하세요."
                type="password"
                _onChange={changePwd} />
            </Grid>

            <Button width="96%" padding="16px" displayBlock margin="20px auto 50px auto" text="로그인하기"
            _onClick={login}></Button>
            </Container>
        </React.Fragment>
        

    )
}


const Container = styled.div`
    width: 50%;
    margin: 0px auto 50px auto;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 20px 0px;
    padding: 30px;
    border-radius: 20px;
`;


export default Login;