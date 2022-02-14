import {createAction, handleActions} from 'redux-actions';
import produce from "immer";



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
        


    }
}


export default handleActions({

    [UPLOAD_IMAGE]: (state, action) => produce(state, (draft) => {

    }),

    [UPLOADING]: (state, action) => produce(state, (draft) => {

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
