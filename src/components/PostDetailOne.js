import React, { useRef, useState } from "react";
import styled from "styled-components";
import {Button, Grid, Image, Input, Text} from "../elements"
import Permit from "../shared/Permit";
import {actionCreators as postActions} from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash';
import { history } from "../redux/configureStore";


const PostDetailOne = (props) => {
    
    const dispatch = useDispatch();
    const {postId, one_post, _userId} = props;
    
    let _disabled = false;
    if(_userId !== one_post.user.userID) {
        _disabled = true;
    }

    const [tagData, setTags] = useState(one_post.tags);
    
    
    React.useEffect(() => {
        setTags(one_post.tags);
    }, [one_post.tags]);
    
    const tagPlus = () => {
        if(tagData.length < 5){
            setTags([...tagData, {name: ''}])
        }else {
            window.alert('태그는 5개까지만 가능합니다');
        }
    }

    console.log("tagData !! ",tagData);

    const titleRef = useRef();
    const tagRef = useRef([]);

    const updatePostBtn = () => {

        const tags = tagData.reduce((acc, cur, i) => {
            if(tagRef.current[i].value !== ''){
                acc.push(tagRef.current[i].value);
            }
            return acc;
        }, []);

        const upTitle = titleRef.current.value;
        
        dispatch(postActions.updateOnePostFB(postId, upTitle, tags))

    }

    const deletePostBtn = () => {
        dispatch(postActions.deleteOnePostFB(postId));
    }

    return (
        <React.Fragment>
            <Container>
            <Grid padding="16px">
                <Text margin="0px" size="36px" bold fontFamily='Malssami815'>상세페이지</Text>
            </Grid>

            <Grid padding="16px">
                <TitleInput placeholder="사진 제목" disabled={_disabled} defaultValue={one_post.title} ref={titleRef} />
            </Grid>

            <Grid padding="16px">
                <Image shape="rectangle" src={one_post.imageUrl}></Image>
            </Grid>

            <Grid padding="16px">
                <Text bold margin="0">tag</Text>
                <Text margin="0px" size="16px" bold fontFamily='Malssami815'>*빈칸으로 남기시면 삭제됩니다.</Text>
                <Grid>
                    <Permit>
                        <Button displayNone={_disabled} text="태그 추가" width="15%" _onClick={tagPlus}></Button>
                    </Permit>
                    {tagData.map((item, i) => {
                        return <Taginput key={i} 
                        ref={el => (tagRef.current[i] = el)}
                        defaultValue={item.name} disabled={_disabled}/>
                    })}
                </Grid>
            </Grid>

            <Grid padding="16px" flex_basic>
                <Permit>
                    <Button width="20%" margin="5px" displayNone={_disabled} _onClick={updatePostBtn} text="수정하기" ></Button>
                    <Button width="20%" margin="5px" displayNone={_disabled} _onClick={deletePostBtn} text="삭제하기" ></Button>
                </Permit>
                <Button width="20%" margin="5px" _onClick={() => {
                    history.replace('/');
                }} text="돌아가기" ></Button>
            </Grid>
            </Container>
        </React.Fragment>
    )
    

}

const Container = styled.div`
    width: 50%;
    margin: 0px auto 50px auto;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 20px 0px;
    padding: 10px;
    border-radius: 20px;
`;


const TitleInput = styled.input`
border: 1px solid #eee;
width: 100%;
padding: 12px 10px;
box-sizing: border-box;
border-radius: 20px;
box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px 0px;
background-color: white;

&:focus{
  outline: none;
  box-shadow: 0 0 0 3px #9E56EB;
}
`;

const Taginput = styled.input`
    padding: 10px 3px;
    box-sizing: border-box;
    border: 1px solid #eee;
    margin: 10px 0px 0px 5px;
    width: 15%;
    text-align: center;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px 0px;
    &:focus{
        outline: none;
        box-shadow: 0 0 0 3px #9E56EB;
    }
`;


export default PostDetailOne;