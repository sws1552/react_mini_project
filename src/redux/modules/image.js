import {createAction, handleActions} from 'redux-actions';
import produce from "immer";
import axios from 'axios';


const UPLOADING = "UPLOADING";
const UPLOAD_IMAGE = "UPLOAD_IMAGE";
const SET_PREVIEW = "SET_PREVIEW";


const uploading = createAction(UPLOADING, (uploading) => ({uploading}));
const uploadImage = createAction(UPLOAD_IMAGE, (image_url) => ({image_url}));
const setpreview = createAction(SET_PREVIEW, (preview) => ({preview}));


const initialState = {
    image_url: "",
    uploading: false,
    preview: null,
}


const uploadImageFB = (image) => {
    return function (dispatch, getState, {history}) {
        
        dispatch(uploading(true));

        axios.post('/api/post/image', // 미리 약속한 주소
                {
                    name: 'perl',
                    status: 'cute'
                }, // 서버가 필요로 하는 데이터를 넘겨주고,
                {
                    headers: {
                        'Authorization': '내 토큰 보내주기'
                    },
                } // 누가 요청했는 지 알려줍니다. (config에서 해요!)
            ).then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
}


export default handleActions({

    [UPLOAD_IMAGE]: (state, action) => produce(state, (draft) => {
        
        draft.uploading = false;
    }),

    [UPLOADING]: (state, action) => produce(state, (draft) => {
        draft.uploading = action.payload.uploading;
    }),

    [SET_PREVIEW]: (state, action) => produce(state, (draft) => {
        draft.preview = action.payload.preview;
    }),

}, initialState);


const actionCreators = {
    uploadImage,
    uploadImageFB,
    setpreview,
}

export {actionCreators};
