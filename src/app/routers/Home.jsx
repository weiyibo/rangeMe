import React, {Fragment} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {fetch} from "../actions/imagesActions";
import {changeFilter} from "../actions/filterActions";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import merge from 'merge'
import ImageTableView from "../components/ImageTableView.jsx";

const Home = ({ images, tagSuggestions, authorSuggestions, filterObject, onSelectorChange, onTagClick }) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-6 col-xs-12">
                    <Select placeholder="Authors" clearable={true} multi={true} value={filterObject.authorFilterValues}
                            options={authorSuggestions} onChange={(e) => onSelectorChange("author", e, filterObject)} simpleValue/>
                </div>
                <div className="col-sm-6 col-xs-12">
                    <Select placeholder="Tags" clearable={true} multi={true} value={filterObject.tagFilterValues}
                            options={tagSuggestions} onChange={(e) => onSelectorChange("tag", e, filterObject)} simpleValue/>
                </div>
            </div>
            <ImageTableView images={images} onTagClick={(e) => onTagClick(e, filterObject)}/>
        </div>
    )
}


const mapStoreToProps = (store, props) => {
    return {
        images: store.imagesReducer.images,
        tagSuggestions: store.imagesReducer.tagSuggestions,
        authorSuggestions: store.imagesReducer.authorSuggestions,
        filterObject: store.filterReducer.filterObject
    }
}

const mapDispatchToProps = dispatch => {
    setTimeout(() => {
        dispatch(fetch(null));
    }, 0);
    return {
        onSelectorChange: (type, value, filterObject) => {
            let newFilterObject;
            switch (type) {
                case "author": { newFilterObject = merge(true, filterObject, {authorFilterValues: value}); break;}
                case "tag": { newFilterObject = merge(true, filterObject, {tagFilterValues: value}); break;}
            }
            dispatch(changeFilter(newFilterObject));
            dispatch(fetch(newFilterObject));
        },
        onTagClick: (tag, filterObject) => {
            const tagArray = filterObject.tagFilterValues.split(",");
            if(tagArray.filter(_ => _ === tag).length == 0) {
                let newFilterObject = merge(true, filterObject);
                newFilterObject.tagFilterValues += `,${tag}`;
                dispatch(changeFilter(newFilterObject));
                dispatch(fetch(newFilterObject));
            }
        }
    }
}
export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(Home))
