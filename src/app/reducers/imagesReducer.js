import merge from 'merge';
import C from '../helpers/imagesHelper';
import { FULFILLED } from 'redux-promise-middleware'

let initialState = {
    images: []
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case `${C.REST_ACTIONS.FETCH_IMAGES}_${FULFILLED}`: {
            const {images, tagSuggestions, authorSuggestions} = payload;
            return merge(true, state, {images, tagSuggestions, authorSuggestions: authorSuggestions && authorSuggestions});
        }
    }
    return state;
}