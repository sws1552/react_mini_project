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

    const [tagData, setData] = React.useState([""]);

    const tagRef = useRef([]);
    const deleteRef = useRef([]);

    // 태그 추가 버튼
    const tagPlus = () => {
        if(tagData.length < 5){
            if(tagData.includes('')){
                window.alert('빈칸 입력후 추가 해주세요~');
                return false;
            }
            setData([...tagData, ""]);
        }
    }

    // enter 클릭시 태그 작성 완료.
    const tagAdd = (e, index) => {
        if(e.keyCode === 13 && e.target.value !== ""){
            e.target.disabled = true;
            e.target.style.backgroundColor = "black";
            e.target.style.color = "white";
            deleteRef.current[index].style.display = "inline";
            setData([...tagData.slice(0, index), e.target.value, ...tagData.slice(index + 1)]);
            
        }
    }

    // 휴지통아이콘 클릭시 삭제
    const tagDelete = (e, index) => {
        // console.log(tagRef.current[index].value);
        const delData = tagData.filter((item, i) => {
            return i !== index;
        });
        
        setData(delData);

        delData.forEach((item, i) => {
            tagRef.current[i].value = item;
        });
        
    }
    
    // 게시글 작성 완료 버튼
    const postBtn = () => {
        console.log("버튼 클릭!");

        const tagResult = tagData.filter((item, i) => item !== '');
        if(tagResult.length === 0){window.alert('한개이상의 태그 작성해주세요~'); return;}

        const imageForm = new FormData();
        let image = fileInput.current.files[0];
        imageForm.append('image', image);

        // dispatch(imageActions.uploadImageFB(imageForm));

        dispatch(postActions.addPostFB(title, tagResult, imageForm));

    }

    if(!is_login) {
        return (
          <Grid margin="100px 0px" padding="16px" center>
            <Text size="32px" bold>앗! 리액트 화난다</Text>
            <Text size="32px">로그인 후에만 쓸수 있음</Text>
            <Button _onClick={() => {history.replace("/login")}}>로그인 하러 가기</Button>
          </Grid>
        );
    }
    
    return (
        <React.Fragment>
            <Container>
            <Grid padding="16px">
                <Text margin="0px" size="36px" bold fontFamily='Malssami815'>게시글 작성</Text>
            </Grid>

            <Grid padding="16px">
                <Input _onChange={changeTitle} placeholder="사진 제목" />
            </Grid>

            <Grid padding="16px">
                <Text margin="0px 0px 10px 10px">jpg, jpeg, png, gif 업로드 가능</Text>
                <Upload preview={preview} _ref={fileInput} />
                {/* <Image shape="rectangle" src={preview ? preview : "https://wpi.digication.com/srvs/filemanager/campus/jDt5abnGTNWMW3zpvKz5/resize=fit:crop,align:center,width:1182,height:667/compress/cache?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnQiOiJjYW1wdXMiLCJrZXkiOiJqRHQ1YWJuR1ROV01XM3pwdkt6NSIsImV4cCI6OTk5OTk5OTk5OX0.UJ6s9UfmkeztKB_VajDR7LD1aOvLSrtPLz-gfi5I2_M"}></Image> */}
                
            </Grid>

            <Grid padding="16px">
                <Text bold>태그 설정</Text>
                <Text >최소 1개 이상의 태그를 작성해주세요 (최대 5개) </Text>
                <Grid>
                    <Button text="태그 추가" width="15%" _onClick={tagPlus}></Button>
                        {tagData.map((item, i) => {
                            return (
                                <TagDiv key={i}>
                                    <TagInput key={i+1} placeholder="입력후 Enter" onKeyUp={(e) => {tagAdd(e, i)}} 
                                    ref={el => (tagRef.current[i] = el)} id={i}/>
                                    <span
                                    ref={el => (deleteRef.current[i] = el)}
                                    key={i+2}
                                    onClick={(e) => {
                                        tagDelete(e, i);
                                    }}
                                    style={{
                                        display: 'none',
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
            </Container>
        </React.Fragment>
    )
}

const Container = styled.div`
    width: 50%;
    margin: 0px auto 50px auto;
    // border: 1px solid white;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 20px 0px;
    padding: 30px;
    border-radius: 20px;
`;

const TagInput = styled.input`
    padding: 10px 3px;
    box-sizing: border-box;
    border: 1px solid black;
    margin-left: 10px;
    width: 15%;
    text-align: center;
    border-radius: 20px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px 0px;
    &:focus{
        outline: none;
        box-shadow: 0 0 0 3px #9E56EB;
    }
`;

const TagDiv = styled.div`
    display: inline;
    position: relative;
`;




export default PostWrite;