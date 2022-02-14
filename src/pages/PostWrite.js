import React, {useRef} from "react";
import styled from "styled-components";
import {MdDeleteForever} from "react-icons/md";
import { history } from "../redux/configureStore";
import {actionCreators as imageActions} from "../redux/modules/image";
import {actionCreators as postActions} from "../redux/modules/post";

import {Button, Grid, Image, Input, Text} from "../elements";
import Upload from "../shared/Upload";
import { useDispatch, useSelector } from "react-redux";




const PostWrite = (props) => {

    const dispatch = useDispatch();

    const [title, setTitle] = React.useState('');

    const changeTitle = (e) => {
        setTitle(e.target.value);
    }

    const fileInput = useRef();

    const is_login = useSelector((state) => state.user.is_login);

    const preview = useSelector((state) => state.image.preview);

    const [tagData, setData] = React.useState([]);

    const tagRef = useRef([]);

    const [count, setCount] = React.useState(0);

    const input_count = Array.from({length: count}, (v, i) => i );

    const tagPlus = () => {
        if(count < 5){
            setCount(count+1);
        }
    }

    const tagAdd = (e) => {
        if(e.keyCode === 13){
            e.target.disabled = true;
            e.target.style.backgroundColor = "black";
            e.target.style.color = "white";
            setData([...tagData, e.target.value]);
        }
    }

    const tagDelete = (e, index) => {
        // console.log(tagRef.current[index].value);

        const delData = tagData.filter((item, i) => {
            return item !== tagRef.current[index].value;
        });

        setData(delData);
        
    } 

    const postBtn = () => {
        console.log("버튼 클릭!");
        console.log('tagData !! ',tagData);
        const imageForm = new FormData();
        let image = fileInput.current.files[0];
        // console.log(image);
        imageForm.append('image', image);

        // dispatch(imageActions.uploadImageFB(imageForm));

        // dispatch(postActions.addPostFB(title, tagData, imageForm));

    }

    // if(!is_login) {
    //     return (
    //       <Grid margin="100px 0px" padding="16px" center>
    //         <Text size="32px" bold>앗! 리액트 화난다</Text>
    //         <Text size="32px">로그인 후에만 쓸수 있음</Text>
    //         <Button _onClick={() => {history.replace("/login")}}>로그인 하러 가기</Button>
    //       </Grid>
    //     );
    // }
    
    return (
        <React.Fragment>
            <Grid padding="16px">
                <Text margin="0px" size="36px" bold>게시글 작성</Text>
            </Grid>

            <Grid padding="16px">
                <Input _onChange={changeTitle} placeholder="사진 제목" />
            </Grid>

            <Grid padding="16px">
                <Upload _ref={fileInput} />
                <Image shape="rectangle" src={preview ? preview : "https://thumb.mt.co.kr/06/2021/05/2021052009134127042_1.jpg/dims/optimize/"}></Image>
                
            </Grid>

            <Grid padding="16px">
                <Text bold>태그 설정</Text>
                <Text >최소 1개 이상의 태그를 작성해주세요 (최대 5개) </Text>
                <Grid>
                    <Button text="태그 추가" width="15%" _onClick={tagPlus}></Button>
                        {input_count.map((item, i) => {
                            return (
                                <TagDiv key={i}>
                                    <TagInput key={i+1} placeholder="입력후 Enter" onKeyUp={tagAdd} 
                                    ref={el => (tagRef.current[i] = el)} id={i}/>
                                    <span
                                    key={i+2}
                                    onClick={(e) => {
                                        tagDelete(e, i);
                                    }}
                                    style={{
                                        fontSize:"2rem",
                                        color:"red",
                                        position:"absolute",
                                        bottom:0,
                                        left:"5px",
                                        cursor: "pointer",
                                    }}>
                                    <MdDeleteForever                       
                                    />
                                    </span>
                                        
                                </TagDiv>
                            )
                        })}
                </Grid>
            </Grid>

            <Grid padding="16px">
                <Button _onClick={postBtn} text="게시글 작성" ></Button>
            </Grid>
        </React.Fragment>
    )
}

const TagInput = styled.input`
    padding: 10px 3px;
    box-sizing: border-box;
    border: 1px solid black;
    margin-left: 10px;
    width: 15%;
    text-align: center;
`;

const TagDiv = styled.div`
    display: inline;
    position: relative;
`;




export default PostWrite;