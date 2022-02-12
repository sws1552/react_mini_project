import React, {useRef} from "react";
import styled from "styled-components";



import {Button, Grid, Image, Input, Text} from "../elements";
import Upload from "../shared/Upload";




const PostWrite = (props) => {

    const [tagData, setData] = React.useState([]);

    const tagPlus = () => {
        
    }


    const postBtn = () => {
        console.log("버튼 클릭!");
    }
    
    return (
        <React.Fragment>
            <Grid padding="16px">
                <Text margin="0px" size="36px" bold>게시글 작성</Text>
            </Grid>

            <Grid padding="16px">
                <Input _onChange={() => {}} placeholder="사진 제목" />
            </Grid>

            <Grid padding="16px">
                <Upload />
                <Image shape="rectangle"></Image>
                
            </Grid>

            <Grid padding="16px">
                <Text bold>태그 설정</Text>
                <Text >최소 1개 이상의 태그를 작성해주세요 (최대 5개) </Text>
                <Grid>
                    <Button text="태그 추가" width="15%" _onClick={tagPlus}></Button>
                    <TagInput />
                </Grid>
            </Grid>

            <Grid padding="16px">
                <Button _onClick={postBtn} text="게시글 작성" ></Button>
            </Grid>
        </React.Fragment>
    )
}

const TagInput = styled.input`
    padding: 10px 0;
    box-sizing: border-box;
    border: 1px solid black;
    margin-left: 10px;
    width: 15%;
`;

export default PostWrite;