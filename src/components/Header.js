import React from "react";
import { history } from "../redux/configureStore";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom"

import { actionCreators as userActions } from "../redux/modules/user"
import { actionCreators as postActions } from "../redux/modules/post"
import { actionCreators as likeActions } from "../redux/modules/likes"
import { Grid, Text, Button } from "../elements"
import { IoHome } from "react-icons/io5";
import '../shared/App.css';



const Header = (props) => {
  const dispatch = useDispatch();
  const is_login = useSelector((state) => state.user.is_login);
  const likeButton = useSelector((state)=>state.likes.click);
  const tagButton = useSelector((state)=>state.post.tagclick);
  const is_token = localStorage.getItem("token") ? true : false;
  const post_list = useSelector((state)=> state.post.list);
  // const get_url = useParams();
  // console.log('파라미터 가져오기',get_url)

  console.log('태그리스트', tagButton)


  const myLike = () => {
    dispatch(likeActions.callLike());
  }


  if (is_login && is_token) {
    return (
      // 로그인 되어 있을 때
      <React.Fragment>

        <Grid padding="5px 20px" margin="0px 0px 50px 0px" is_flex bg="#FFFFFF">
          
          <Grid>
            <Text
            margin="0px"
            size="25px"
            bold
            hover
            fontFamily='Malssami815' 
            _onClick={() => {
              history.replace("/");
              dispatch(postActions.getPostFB());
            }}>
            {/* <IoHome style={{fontSize:"2rem"}}/> */}
            나의 최애는?
            </Text>
          </Grid>


          <Grid flex_end>
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
        <Grid padding="5px 20px" margin="0px 0px 50px 0px" is_flex bg="#FFFFFF">
          
          <Grid>
            <Text fontFamily='Malssami815' margin="0px" hover size="25px" bold _onClick={()=>{history.push('/')}}>
            {/* <IoHome style={{fontSize:"2rem"}}/> */}
            나의 최애는?
            </Text>
          </Grid>

          <Grid flex_end>
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