import React from "react";
import { Grid, Text, Button, Image } from "../elements"
import styled from "styled-components";

import Badge from 'react-bootstrap/Badge'
import { BsColumns, BsHeart, BsHeartFill } from "react-icons/bs";
import { TiHeartOutline, TiHeart } from "react-icons/ti";


const Post = (props) => {
    // localStorage에서 토큰값 여부로 헤더 판별
    // state에서 is_login도 같이 판별 필요
    return (
      <React.Fragment>
        <Postcard>
          <ImageBox>
            <PostImage src="https://thumb.mtstarnews.com/06/2021/05/2021050511312249749_1.jpg/dims/optimize"></PostImage>
            <TiHeartOutline style={{ position: "absolute", fontSize:"2rem", fontWeight:"bolder", color:"white", top:"10px", right:"10px", zIndex: "1" }} />
          </ImageBox>
          {/* 태그 map*/}

          <Text margin="0px" bold>
            {props.title}
          </Text>

          <Tag>
            {props.tags.map((p, idx) => {
              return (
                <Badge
                  pill
                  bg="dark"
                  key={idx}
                  style={{
                    margin: "7px 2px",
                  }}
                >
                  {p}
                </Badge>
              );
            })}
          </Tag>
        </Postcard>
      </React.Fragment>
    );
}

Post.defaultProps = {
    title: "존예존예존예존예!",
    tags: ["태그1", "태그2"],
    imgUrl: "https://thumb.mtstarnews.com/06/2021/05/2021050511312249749_1.jpg/dims/optimize",
}

// 포스트 전체크기
const Postcard = styled.div`
    margin:30px 8px 8px 8px;
    width: 20%;
`

const ImageBox = styled.div`
position: relative;

`

// 이미지 크기
const PostImage = styled.img`
    // position: relative;
    width: 100%;
    height: auto;
    border-radius: 15px;
`

const Tag = styled.div`
    display: flex;
`

export default Post;