import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {actionCreators as imageActions} from "../redux/modules/image";

import {Button} from "../elements";



const Upload = (props) => {

    const fileInput = React.useRef();
    const is_uploading = useSelector((state) => state.image.uploading);
    
    const dispatch = useDispatch();

    const selectfile = (e) => {
        const reader = new FileReader();
        const file = fileInput.current.files[0];
        
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            // console.log("reader.result !! ", reader.result);
            dispatch(imageActions.setpreview(reader.result));
        }

    }

    return (
        <React.Fragment>
            <input type="file" onChange={selectfile} ref={fileInput}/>
            {/* <Button _onClick={() => {}}>업로드</Button> */}
        </React.Fragment>
    )
}



export default Upload;