import React from "react";
import styled from "styled-components";
import {Button, Grid, Image, Input, Text} from "../elements"



const PostDetail = (props) => {

    return (
        <React.Fragment>
            <Grid padding="16px">
                <Text margin="0px" size="36px" bold>상세페이지</Text>
            </Grid>

            <Grid padding="16px">
                <Input _onChange={() => {}} placeholder="사진 제목" />
            </Grid>

            <Grid padding="16px">
                
                <Image shape="rectangle"></Image>
                
            </Grid>

            <Grid padding="16px">
                <Text bold margin="0">tag</Text>
                <Grid tag_flex>
                    <Taginput defaultValue="#강아지"/>
                </Grid>
            </Grid>

            <Grid padding="16px" is_flex>
                <Button width="20%" _onClick={() => {}} text="수정하기" ></Button>
                <Button width="20%" _onClick={() => {}} text="삭제하기" ></Button>
                <Button width="20%" _onClick={() => {}} text="돌아가기" ></Button>
            </Grid>
        </React.Fragment>
    )

}

const Taginput = styled.input`
    width:20%;
`;

export default PostDetail;