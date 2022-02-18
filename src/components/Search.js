import React from "react";
import styled from "styled-components";
import _ from "lodash";

import { actionCreators as postActions } from "../redux/modules/post"
import { useDispatch } from "react-redux"
import { BiSearchAlt } from "react-icons/bi";


const Search = (props) => {

    const dispatch = useDispatch();
    const [keyword, setKeyword] = React.useState("");
    const debounceKeyword = _.debounce((k)=>setKeyword(k),500);
    // useCallback - 함수를 재생산
    const keyPressKeyword = React.useCallback(debounceKeyword,[]);

    const Searching = ((e) => {
        keyPressKeyword(e.target.value);
    })

    const handlePress = ((e)=> {
        console.log(e.key);
        if(e.key==='Enter') {
            // console.log('검색어길이',e.target.value.length)
            if(e.target.value.length===0) {
                console.log('0이지롱',e.target.value)
                dispatch(postActions.getPostFB());
            } else {
                console.log('찍혔지롱',e.target.value)
                dispatch(postActions.searchFB(e.target.value))
            }
        }
    })

    return (

        <React.Fragment>
            <Input placeholder="찾고싶은 키워드를 입력 후 엔터 쳐주세요"
            onChange={Searching}
            onKeyPress={handlePress}
            />

        </React.Fragment>

    )
}


const Input = styled.input`

outline: none;
border: none;
border-radius: 20px;
padding: 10px 20px;
width: 100%;
margin: 0px auto 2em auto;

:focus {
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 5px 0px;
}


`


export default Search;