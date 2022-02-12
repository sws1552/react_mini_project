import React, {useRef} from "react";
import styled from "styled-components";



import {Button, Grid, Image, Input, Text} from "../elements";
import Upload from "../shared/Upload";




const PostWrite = (props) => {

    const [inputType, setType] = React.useState('button');
    
    const [count, setCount] = React.useState(1);

    const [tagData, setData] = React.useState([]);

    const tag_count = Array.from({length: count}, (v, i) => i);

    const tagPlus = (e) => setType("text");
    
    const enterkey = (e) => {
        if(window.event.keyCode === 13){
            if(count < 5){ 
                setCount(count+1);
                setData([...tagData, e.target.value]);
            }
            
        }
    }

    console.log("tagData !! ", tagData);

    const tagRef = useRef();
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
                    {tag_count.map((item, i) => {

                        return ( inputType === "button" ? <TagPlusBtn key={i} type={inputType} value="태그+" onClick={tagPlus}/> 
                        :
                        <TagPlustInput key={i} type="text" onKeyUp={enterkey} placeholder="칸 추가는 Enter" ref={tagRef}/> )
                    })}
                </Grid>
            </Grid>

            <Grid padding="16px">
                <Button _onClick={postBtn} text="게시글 작성" ></Button>
            </Grid>
        </React.Fragment>
    )
}

const TagPlusBtn = styled.input`
    height:30px;
    background-color: black;
    color: white;
    border: none;
    padding: 5px;
    border-radius: 5vw; 
`;

const TagPlustInput = styled.input`
    margin-left: 5px;
    width: 12vw;
    height:30px;
    padding:5px;
    box-sizing: border-box;
    border-radius: 6vw;
    border: 1px solid black;
`;


export default PostWrite;