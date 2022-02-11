import React from "react";
import { Text, Input, Grid, Button } from "../elements";

import {useDispatch} from "react-redux";
import {actionCreators as userActions} from "../redux/modules/user";
import { debounce } from "lodash";
import {idCheck} from "../shared/common";

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


    }

    return (
        <React.Fragment>
            <Grid padding="16px">
                <Text size="32px" bold>로그인</Text>
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

            <Button text="로그인하기"
            _onClick={login}></Button>
        </React.Fragment>

    )


}


export default Login;