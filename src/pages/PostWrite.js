import React, {useRef} from "react";
import styled from "styled-components";



import {Button, Grid, Image, Input, Text} from "../elements";
import Upload from "../shared/Upload";




const PostWrite = (props) => {

    const tagRef = useRef();

    const tagPlus = (e) => {

        // e.target.type = "text";
        // e.target.value = "";

        tagRef.current.type = "text";
        tagRef.current.value = "";

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
                <Grid padding="5px">
                    <TagPlusBtn type="button" value="태그+" onClick={tagPlus} ref={tagRef}/>
                </Grid>
            </Grid>

            <Grid padding="16px">
                <Button _onClick={() => {}} text="게시글 작성" ></Button>
            </Grid>
        </React.Fragment>
    )
}


const TagPlusBtn = styled.input`
    ${(props) => (console.log(props))}
`;



export default PostWrite;