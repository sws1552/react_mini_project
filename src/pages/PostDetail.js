import React, { useRef, useState } from "react";
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

    // console.log('_userId !! ',_userId);

    var one_post = useSelector((state) => state.post.one_post);
    // console.log("one_post !! ", one_post);

    let _disabled = false;
    if(_userId !== one_post.user.userID) {
        _disabled = true;
    }

    const titleRef = useRef();
    const tagRef = useRef([]);

    const updatePostBtn = () => {

        const tags = one_post.tags.reduce((acc, cur, i) => {
            if(tagRef.current[i].value !== ''){
                acc.push(tagRef.current[i].value);
            }
            return acc;
        }, []);

        const upTitle = titleRef.current.value;
        
        dispatch(postActions.updateOnePostFB(postId, upTitle, tags))

    }

    
    return (
        <React.Fragment>
            <Grid padding="16px">
                <Text margin="0px" size="36px" bold>상세페이지</Text>
            </Grid>

            <Grid padding="16px">
                <TitleInput placeholder="사진 제목" disabled={_disabled} defaultValue={one_post.title} ref={titleRef} />
            </Grid>

            <Grid padding="16px">
                
                <Image shape="rectangle" src={`http://14.45.204.153:8023/${one_post.imageUrl}`}></Image>
                
            </Grid>

            <Grid padding="16px">
                <Text bold margin="0">tag</Text>
                <Grid>
                {one_post.tags.map((item, i) => {
                    return <Taginput key={i} 
                    ref={el => (tagRef.current[i] = el)}
                    defaultValue={item.name} disabled={_disabled}/>
                })}
                </Grid>
            </Grid>

            <Grid padding="16px" is_flex>
                <Permit>
                    <Button width="20%" displayNone={_disabled} _onClick={updatePostBtn} text="수정하기" ></Button>
                    <Button width="20%" displayNone={_disabled} _onClick={() => {}} text="삭제하기" ></Button>
                </Permit>
                <Button width="20%" _onClick={() => {
                    props.history.replace('/');
                }} text="돌아가기" ></Button>
            </Grid>
        </React.Fragment>
    )
    

}

const TitleInput = styled.input`
    border: 1px solid #212121;
    width: 100%;
    padding: 12px 4px;
    box-sizing: border-box;
`;

const Taginput = styled.input`
    margin-left: 10px;
    width:20%;
`;


export default PostDetail;