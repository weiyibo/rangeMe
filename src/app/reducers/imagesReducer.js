import merge from 'merge';
import C from '../helpers/imagesHelper';
import { FULFILLED } from 'redux-promise-middleware'
import Tag from "../helpers/tagsHelper"
import Author from "../helpers/authorsHelper"
import Filter from "../helpers/filterHelper"

let initialState = {
    images: [],
    tagSuggestions: [],
    authorSuggestions: [],
    filterObject: Filter.defaultValue,
    viewMode: C.viewMode.Column,
    columnViewModeSize: 4
}

export default function (state = initialState, action) {
    const {type, payload} = action;
    switch (type) {
        case `${C.REST_ACTIONS.FETCH_IMAGES}_${FULFILLED}`: {
            const {filterObject, authorSuggestions} = state;
            const newTagSuggestions = [];
            let newAuthorSuggestions = [];
            const images = payload.map(image => {
                //Get & Set Tags
                {
                    const tagString = image.tags.trim();
                    if(tagString.length > 0 ){
                        const tagArray = tagString.split(" ");
                        tagArray.forEach(tag => !Tag.isTagExisting(tag, newTagSuggestions) && newTagSuggestions.push(Tag.generateTagOption(tag)));
                        image.tagArray = tagArray;
                    }
                }
                //Get & Set Authors
                {
                    const authorString = image.author.trim();
                    if(authorString.length > 0){
                        const authorArray = authorString.split('"');
                        const authorName = authorArray[authorArray.length - 2];
                        image.authorName = authorName;
                        const authorId = image.author_id;
                        !Author.isAuthorExisting(authorId, newAuthorSuggestions) && newAuthorSuggestions.push(Author.generateAuthorOption(authorName, authorId));
                    }
                }
                //Set Image
                {
                    const imgJquery = $( $("<div>" + image.description + "</div>").html()).find("img");
                    image.imgUrl = imgJquery.attr('src');
                    image.imgAlt = imgJquery.attr('alt');
                }
                return image;
            });

            newAuthorSuggestions = (filterObject == null || filterObject.authorFilterValues.length == 0) ? newAuthorSuggestions : authorSuggestions;
            return merge(true, state, {images, tagSuggestions: newTagSuggestions, authorSuggestions: newAuthorSuggestions});
        }
        case Filter.ACTIONS.CHANGE_FILTER_VALUE: {
            return merge(true, state, {filterObject: payload});
        }
        case C.ACTIONS.CHANGE_VIEW_MODE: {
            return merge(true, state, {viewMode: payload});
        }
        case C.ACTIONS.CHANGE_COLUMN_VIEW_SIZE: {
            return merge(true, state, {columnViewModeSize: payload});
        }

    }
    return state;
}