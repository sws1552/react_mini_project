import React from "react";
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as userActions } from "../redux/modules/user"
import { Grid, Text, Button } from "../elements"


const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const is_token = localStorage.getItem("token") ? true : false;

  if (is_login && is_token) {
    return (
      // 로그인 되어 있을 때
      <React.Fragment>
        <Grid padding="5px" is_flex bg="#FFFFFF">
          <Grid>
            <Text size="20px" bold>
              나의 최애는?
            </Text>
          </Grid>

          <Grid is_flex>
            <Button margin="3px">내가찜한사진</Button>
            <Button margin="3px" _onClick={()=>{
                dispatch(userActions.logoutFB());
            }}>로그아웃</Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Grid padding="5px" is_flex bg="#FFFFFF">
          
          <Grid>
            <Text size="20px" bold>
              나의 최애는?
            </Text>
          </Grid>

          <Grid flex_basic>
            <Button
              radius="100px"
              width="160px"
              margin="3px"
              _onClick={() => {
                history.push("/login");
              }}
            >
              로그인
            </Button>
            <Button
              radius="100px"
              width="160px"
              margin="3px"
              _onClick={() => {
                history.push("/signup");
              }}
            >
              회원가입
            </Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
};


Header.defaultProps = () => {

}


export default Header;