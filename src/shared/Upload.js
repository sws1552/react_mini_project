import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {actionCreators as imageActions} from "../redux/modules/image";

import {Button, Image} from "../elements";
import styled from "styled-components";



const Upload = (props) => {

    const dispatch = useDispatch();

    const selectfile = (e) => {

        let file_kind = e.target.value.lastIndexOf('.');
        let file_name = e.target.value.substring(file_kind+1, e.target.value.length);
        let file_type = file_name.toLowerCase();

        let check_file_type = ['jpg','gif','png','jpeg'];
        
        if(check_file_type.indexOf(file_type) === -1){
            window.alert('사진만 업로드 가능합니다!');
            e.target.value = '';
            return false;
        }

        const reader = new FileReader();
        const file = props._ref.current.files[0];
        
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            // console.log("reader.result !! ", reader.result);
            dispatch(imageActions.setpreview(reader.result));
        }

    }

    return (
        <React.Fragment>
            <Label htmlFor="ex_file">
                <Image shape="rectangle" src={props.preview ? props.preview : "https://wpi.digication.com/srvs/filemanager/campus/jDt5abnGTNWMW3zpvKz5/resize=fit:crop,align:center,width:1182,height:667/compress/cache?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnQiOiJjYW1wdXMiLCJrZXkiOiJqRHQ1YWJuR1ROV01XM3pwdkt6NSIsImV4cCI6OTk5OTk5OTk5OX0.UJ6s9UfmkeztKB_VajDR7LD1aOvLSrtPLz-gfi5I2_M"}></Image>
            </Label>

            <FileInput id="ex_file" accept="image/jpg, image/png, image/jpeg, image/gif" type="file" onChange={selectfile} ref={props._ref}/>

            {/* <Button _onClick={() => {}}>업로드</Button> */}
        </React.Fragment>
    )
}

const Label = styled.label`
    cursor: pointer;
    width: 100%;
`;

const FileInput = styled.input`
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
`;


export default Upload;