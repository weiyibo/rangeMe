import axios from 'axios';
import Image from "../helpers/imagesHelper"
import Tag from "../helpers/tagsHelper"
import Author from "../helpers/authorsHelper"
import {FULFILLED} from "redux-promise-middleware";

export const fetch = (filterObject) => dispatch => (
    new Promise((resolve, reject) => {
        let url = Image.REST_URL;

        if(filterObject) {
            if(filterObject.authorFilterValues.includes(",")) {
                url += `&ids=${filterObject.authorFilterValues}`;
            }else if(filterObject.authorFilterValues.length > 1) {
                url += `&id=${filterObject.authorFilterValues}`;
            }

            if(filterObject.tagFilterValues.length > 1) {
                url += `&tags=${filterObject.tagFilterValues}`;
            }
        }

        axios.get(url).then(response => {
            const tagSuggestions = [];
            let authorSuggestions = [];
            const images = response.data.items.map(image => {
                //Get Tags
                {
                    const tagString = image.tags.trim();
                    if(tagString.length > 0 ){
                        const tagArray = tagString.split(" ");
                        tagArray.forEach(tag => !Tag.isTagExisting(tag, tagSuggestions) && tagSuggestions.push(Tag.generateTagOption(tag)));
                        image.tagArray = tagArray;
                    }
                }
                //Get Authors
                {
                    const authorString = image.author.trim();
                    if(authorString.length > 0){
                        const authorArray = authorString.split('"');
                        const authorName = authorArray[authorArray.length - 2];
                        image.authorName = authorName;
                        const authorId = image.author_id;
                        !Author.isAuthorExisting(authorId, authorSuggestions) && authorSuggestions.push(Author.generateAuthorOption(authorName, authorId));
                    }
                }
                return image;
            });

            authorSuggestions = (filterObject == null || filterObject.authorFilterValues.length == 0) ? authorSuggestions : null;

            dispatch({type:`${Image.REST_ACTIONS.FETCH_IMAGES}_${FULFILLED}`, payload: {images, tagSuggestions, authorSuggestions}});

        }).catch(err => {
            reject(err);
        })
    })
);



