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
    columnViewModeSize: C.defaultColumnViewSize,
    pagination: C.pagination
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
                        image.isShowAllTags = false;
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
                    image.id = C.generateId();
                }
                //Set pagination
                return image;
            });

            newAuthorSuggestions = (filterObject == null || filterObject.authorFilterValues.length == 0) ? newAuthorSuggestions : authorSuggestions;

            //Set pagination
            const pagination = {
                totalPages: Math.ceil(images.length / C.pagination.numberPerPage),
                numberPerPage: C.pagination.numberPerPage,
                currentPage: 1
            }
            return merge(true, state, {images, tagSuggestions: newTagSuggestions, authorSuggestions: newAuthorSuggestions, pagination});
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
        case C.ACTIONS.CHANGE_IS_SHOW_ALL_TAGS: {
            const {images} = state;
            const {imageId, isShowAllTags} = payload;
            images.forEach(image => image.isShowAllTags = image.id == imageId ? isShowAllTags : image.isShowAllTags);
            return merge(true, state, {images});
        }
        case C.ACTIONS.CHANGE_CURRENT_PAGE: {
            const {pagination} = state;
            const newPagination = {...pagination, currentPage: payload}
            return merge(true, state, {pagination: newPagination});
        }
    }
    return state;
}