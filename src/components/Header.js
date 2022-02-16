import React from "react";
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";

import { actionCreators as userActions } from "../redux/modules/user"
import { actionCreators as likeActions } from "../redux/modules/likes"
import { Grid, Text, Button } from "../elements"


const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const likeButton = useSelector((state)=>state.likes.click);
  const is_token = localStorage.getItem("token") ? true : false;

  const myLike = () => {
    dispatch(likeActions.callLike());
  }


  if (is_login && is_token) {
    return (
      // 로그인 되어 있을 때
      <React.Fragment>
        <Grid padding="5px 20px" is_flex bg="#FFFFFF">
          
          <Grid>
            <Text margin="0px" size="20px" bold>
              나의 최애는?
            </Text>
          </Grid>

          <Grid flex_basic>
            {/* toggle 사용하면 될 듯
            내가찜한사진 클릭 > likedPostFB
            한번 더 클릭 > getPostFB*/}
            <Button
              _onClick={myLike}
              radius="100px"
              width="120px"
              margin="3px">{likeButton?'전체사진':'내가찜한사진'}</Button>
            <Button
              radius="100px"
              width="120px"
              margin="3px"
              _onClick={()=>{
                dispatch(userActions.logoutFB());
            }}>로그아웃</Button>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <Grid padding="5px 20px" is_flex bg="#FFFFFF">
          
          <Grid>
            <Text margin="0px" hover size="20px" bold _onClick={()=>{history.push('/')}}>
              나의 최애는?
            </Text>
          </Grid>

          <Grid flex_basic>
            <Button
              radius="100px"
              width="130px"
              margin="3px"
              _onClick={() => {
                history.push("/login");
              }}
            >
              로그인
            </Button>
            <Button
              radius="100px"
              width="130px"
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