import axios from 'axios';
import Image from "../helpers/imagesHelper"
import {FULFILLED} from "redux-promise-middleware";
import {isBusyLoaderShow} from "./busyActions"

export const fetch = (filterObject) => dispatch => (
    new Promise((resolve, reject) => {
        let url = Image.REST_URL;
        if(filterObject) {
            if(filterObject.authorFilterValues.length > 1) {
                url += `&ids=${filterObject.authorFilterValues}`;
            }

            if(filterObject.tagFilterValues.length > 1) {
                url += `&tags=${filterObject.tagFilterValues}`;
            }

            url += `&tagmode=${filterObject.tagModeFilterValue}`;
        }
        dispatch(isBusyLoaderShow(true));
        axios.get(url).then(response => {
            dispatch({type:`${Image.REST_ACTIONS.FETCH_IMAGES}_${FULFILLED}`, payload: response.data.items});
        }).catch(err => {
            reject(err);
        })
    })
);

export const changeViewMode = (viewMode) => {
    return {type: Image.ACTIONS.CHANGE_VIEW_MODE, payload: viewMode}
}

export const changeColumnViewSize = (size) => {
    return {type: Image.ACTIONS.CHANGE_COLUMN_VIEW_SIZE, payload: size}
}

export const changeIsShowAllTags = (isShowAllTags, imageId) =>{
    return {type: Image.ACTIONS.CHANGE_IS_SHOW_ALL_TAGS, payload: {isShowAllTags, imageId}}
}
