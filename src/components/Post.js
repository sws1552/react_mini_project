import React from "react";
import { Grid, Text, Button, Image } from "../elements"
import styled from "styled-components";

const Post = (props) => {
    // localStorage에서 토큰값 여부로 헤더 판별
    // state에서 is_login도 같이 판별 필요
    return (

    <React.Fragment>
        <Grid width="30%" height="auto" margin="10px">
            <Text>{props.title}</Text>
            <Image width="100%" auto shape="rectangle" radius="10px" src={props.imgUrl}></Image>
            {/* 태그는 map 돌려야 하나? */}
            {props.tags}
        </Grid>
    </React.Fragment>
        


        )
    
}

Post.defaultProps = {
    title: "존예존예존예존예!",
    tags: ["태그1", "태그2"],
    imgUrl: "https://thumb.mtstarnews.com/06/2021/05/2021050511312249749_1.jpg/dims/optimize",
}



export default Post;