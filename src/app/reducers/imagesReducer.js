import merge from 'merge';
import C from '../helpers/imagesHelper';
import { FULFILLED } from 'redux-promise-middleware'

let initialState = {
    images: [],
    tagSuggestions: [],
    authorSuggestions: []
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case `${C.REST_ACTIONS.FETCH_IMAGES}_${FULFILLED}`: {
            let {images, tagSuggestions, authorSuggestions} = payload;
            if(!authorSuggestions){
                authorSuggestions = state.authorSuggestions
            }
            return merge(true, state, {images, tagSuggestions, authorSuggestions: authorSuggestions});
        }
    }
    return state;
}