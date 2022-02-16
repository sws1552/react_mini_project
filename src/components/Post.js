import React from "react";
import { useState } from "react";
import { Grid, Text, Button, Image } from "../elements"
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux"
import { actionCreators as likeActions } from "../redux/modules/likes";
import { actionCreators as postActions } from "../redux/modules/post";
import { history } from "../redux/configureStore";
import { batch } from 'react-redux'

import Badge from 'react-bootstrap/Badge'
import { TiHeartOutline, TiHeart } from "react-icons/ti";

import '../shared/App.css';

const Post = ({post}) => {
  const dispatch = useDispatch();
  const _user = useSelector((state)=>state.user.user)
  const isLiking = post.Likers!==undefined ? post.Likers.find(liker => liker.id === _user.id) : null
  // console.log(post)

  let likeButton = () => {
      dispatch(likeActions.likePostFB(post.id))
  }

  let dislikeButton = () => {
      dispatch(likeActions.deleteLikeFB(post.id))
  }


    // localStorage에서 토큰값 여부로 헤더 판별
    // state에서 is_login도 같이 판별 필요
    return (
      <React.Fragment>
        <Postcard>

          <ImageBox>
            {/* 이미지 클릭 시 상세페이지로 이동 */}
            <PostImage
              onClick={()=> {
                history.push(`/detail/${post.id}`)
              }}
              src={post.imageUrl}
              ></PostImage>

            <Heart>
              {!isLiking?
              // 빈하트
              <TiHeartOutline
                onClick={likeButton}
                style={{ position: "absolute", fontSize:"2.5rem", top:"10px", right:"10px", zIndex: "1", color:"white"}} />
                :
                // 채워진
                <TiHeart
                onClick={dislikeButton}
                style={{ position: "absolute", fontSize:"2.5rem", top:"10px", right:"10px", zIndex: "1", color:"red",}} />
              }
            </Heart>

          </ImageBox>
          {/* 태그 map*/}


          <div style={{padding:"10px 15px 15px 15px"}}>
          <Text size="12px" margin="0px"><TiHeart />{post.Likers.length}</Text>
          <Text margin="0px" bold>
            {post.title}
          </Text>

          <Tag>
            {/* 서버 tags DB 저장형태에 따라 수정해야 할 수 있음 */}
            {post.tags.map((p, idx) => {
              return (
                <Badge
                  className="tag"
                  pill
                  onClick={() => {
                    batch(() => {
                    dispatch(postActions.tagListFB(p.name))
                    dispatch(postActions.tagClick())
                    })
                  }}
                  bg="dark"
                  key={idx}
                  style={{
                    margin: "7px 2px 2px 2px",
                    padding: "6px 10px",
                    fontSize: "0.8rem",
                    fontFamily: "Pretendard-Thin"
                  }}
                >
                  {p.name}
                </Badge>
              );
            })}
          </Tag>
          </div>
        </Postcard>
      </React.Fragment>
    );
}

Post.defaultProps = {
    title: "존예존예존예존예!",
    tags: ["태그1", "태그2"],
    imageUrl: "https://thumb.mt.co.kr/06/2021/09/2021092406423496252_1.jpg/dims/optimize/",
}

// 포스트 전체크기
const Postcard = styled.div`

border-radius: 15px;
margin-bottom:1rem;
background-color: white;
// 줄바꿈 방지
display:inline-block;

`


// 하트포함 이미지
const ImageBox = styled.div`
position: relative;
display: inline-flex;
width: 100%;
border-radius: 10px;
overflow: hidden;

    
:hover {
  cursor:pointer;
  box-shadow: rgba(0,0,0,0.2) 0 0 10px 3px;
}

`
const Heart = styled.div`


`
const Count = styled.p`
z-index:1

`

// 이미지 크기
const PostImage = styled.img`

    width: 100%;
    height: 100%;
    object-fit: cover;

`

const Tag = styled.div`
    display: flex;
    flex-wrap: wrap;
`

export default Post;