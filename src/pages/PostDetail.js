import React, { useRef, useState } from "react";
import styled from "styled-components";
import {Button, Grid, Image, Input, Text} from "../elements"
import Permit from "../shared/Permit";
import {actionCreators as postActions} from "../redux/modules/post";
import { useDispatch, useSelector } from "react-redux";
import _ from 'lodash';
import PostDetailOne from "../components/PostDetailOne";


const PostDetail = (props) => {
    
    const dispatch = useDispatch();
    const postId = props.match.params.id;

    
    React.useEffect(() => {
        
        dispatch(postActions.getOnePostFB(postId));
    }, []);
    
    let one_post = useSelector((state) => state.post.one_post);
    const _userId = useSelector((state) => state.user.user.userID);

    return (
        <PostDetailOne postId={postId} one_post={one_post} _userId={_userId} />
    )
    

}



export default PostDetail;