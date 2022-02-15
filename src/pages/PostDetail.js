import React, { useState } from "react";
import styled from "styled-components";
import {Button, Grid, Image, Input, Text} from "../elements"
import Permit from "../shared/Permit";
import {actionCreators as postActions} from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";


const PostDetail = (props) => {
    
    const dispatch = useDispatch();
    const postId = props.match.params.id;

    React.useEffect(() => {
        dispatch(postActions.getOnePostFB(postId));
    }, []);
    
    const _userId = useSelector((state) => state.user.user.userID);

    console.log('_userId !! ',_userId);

    var one_post = useSelector((state) => state.post.one_post);
    console.log("one_post !! ", one_post);

    let _disabled = false;
    if(_userId !== one_post.user.userID) {
        _disabled = true;
    }

    // console.log(_disabled);

    
    return (
        <React.Fragment>
            <Grid padding="16px">
                <Text margin="0px" size="36px" bold>상세페이지</Text>
            </Grid>

            <Grid padding="16px">
                <Input _onChange={() => {}} placeholder="사진 제목" disabled={_disabled} defaultValue={one_post.title} />
            </Grid>

            <Grid padding="16px">
                
                <Image shape="rectangle" src={`http://14.45.204.153:8023/${one_post.imageUrl}`}></Image>
                
            </Grid>

            <Grid padding="16px">
                <Text bold margin="0">tag</Text>
                <Grid>
                {one_post.tags.map((item, i) => {
                    return <Taginput key={i} defaultValue={item.name} disabled={_disabled}/>
                })}
                </Grid>
            </Grid>

            <Grid padding="16px" is_flex>
                <Permit>
                    <Button width="20%" disabled={_disabled} _onClick={() => {}} text="수정하기" ></Button>
                    <Button width="20%" _onClick={() => {}} text="삭제하기" ></Button>
                </Permit>
                <Button width="20%" _onClick={() => {
                    props.history.replace('/');
                }} text="돌아가기" ></Button>
            </Grid>
        </React.Fragment>
    )
    

}


const Taginput = styled.input`
    margin-left: 10px;
    width:20%;
`;


export default PostDetail;