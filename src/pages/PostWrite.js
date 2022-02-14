import React, {useRef} from "react";
import styled from "styled-components";
import {MdDeleteForever} from "react-icons/md";


import {Button, Grid, Image, Input, Text} from "../elements";
import Upload from "../shared/Upload";




const PostWrite = (props) => {

    const [tagData, setData] = React.useState([]);

    const tagRef = useRef();

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

    const tagDelete = (e) => {
        console.log(tagRef.current.value);
    } 

    const postBtn = () => {
        console.log("버튼 클릭!");
        console.log("tagData !! ", tagData);
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
                        {input_count.map((item, i) => {
                            return (
                                <TagDiv key={i}>
                                    <TagInput key={i+1} placeholder="입력후 Enter" onKeyUp={tagAdd} ref={tagRef} id={i}/>
                                    <span
                                    key={i+2} 
                                    onClick={tagDelete}
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