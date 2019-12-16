import React, {Fragment} from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {fetch, changeViewMode, changeColumnViewSize, changeIsShowAllTags, changeImageCurrentPage} from "../actions/imagesActions";
import {changeFilter} from "../actions/filterActions";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import merge from 'merge'
import ImageTableView from "../components/ImageTableView.jsx";
import ImageHelper from "../helpers/imagesHelper"
import ImageColumnView from "../components/ImageColumnView.jsx";
import ImageColumnModeSize from "../components/ImageColumnModeSize.jsx";

const Home = ({ images, tagSuggestions, authorSuggestions, filterObject, viewMode, columnViewModeSize, pagination, onSelectorChange,
                  onTagClick, onAuthorClick, onChangeViewMode, onChangeColumnViewSize, onChangeIsShowAllTags, onPageClick }) => {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });
    const {numberPerPage, currentPage} = pagination;
    const paginatedImages = images.slice( (currentPage - 1) * numberPerPage, Math.min(images.length, currentPage * numberPerPage));
    return (
        <Fragment>
            <div className="row">
                <div className="col-sm-12" >
                    <h1>Images</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-5 col-xs-12 margin-bottom-10" >
                    <label>Authors</label>
                    <Select placeholder="Authors" clearable={true} multi={true} value={filterObject.authorFilterValues}
                            options={authorSuggestions} onChange={(e) => onSelectorChange("author", e, filterObject)} simpleValue/>
                </div>
                <div className="col-sm-5 col-xs-12 margin-bottom-10">
                    <label>Tags</label>
                    <Select placeholder="Tags" clearable={true} multi={true} value={filterObject.tagFilterValues}
                            options={tagSuggestions} onChange={(e) => onSelectorChange("tag", e, filterObject)} simpleValue/>
                </div>
                <div className="col-sm-2 col-xs-12 margin-bottom-10">
                    <label>Tag Mode</label>
                    <Select placeholder="Tag Mode" clearable={false} multi={false} value={filterObject.tagModeFilterValue}
                            options={ [{label: "All", value: 'all'}, {label: "Any", value: 'any'}]}
                            onChange={(e) => onSelectorChange("tagMode", e, filterObject)} simpleValue/>
                </div>
            </div>
            <div className="row margin-top-10">
                <div className="col-sm-12 text-right">
                    {
                        viewMode == ImageHelper.viewMode.Table ?
                            <span className="glyphicon glyphicon-th x-large-font-size pointer" aria-hidden="true"
                                  data-toggle="tooltip" data-placement="bottom" title="Change view to column"
                                  onClick={() => onChangeViewMode(ImageHelper.viewMode.Column)}></span>
                             :
                            <Fragment>
                                <ImageColumnModeSize size={columnViewModeSize} onChangeColumnViewSize={onChangeColumnViewSize} size={columnViewModeSize}/>
                                <span className="glyphicon glyphicon-align-justify x-large-font-size pointer" aria-hidden="true"
                                      data-toggle="tooltip" data-placement="bottom" title="Change view to table"
                                      onClick={() => onChangeViewMode(ImageHelper.viewMode.Table)}></span>
                            </Fragment>
                    }
                </div>
            </div>
            {
                viewMode == ImageHelper.viewMode.Table ?
                    <ImageTableView images={paginatedImages} onTagClick={(e) => onTagClick(e, filterObject)}
                                    onAuthorClick={(e) => onAuthorClick(e, filterObject)}
                                    onChangeIsShowAllTags={onChangeIsShowAllTags}
                                    pagination={pagination} onPageClick={onPageClick}/> :
                    <ImageColumnView images={paginatedImages} onTagClick={(e) => onTagClick(e, filterObject)}
                                     onAuthorClick={(e) => onAuthorClick(e, filterObject)}
                                     size={columnViewModeSize} onChangeIsShowAllTags={onChangeIsShowAllTags}
                                     pagination={pagination} onPageClick={onPageClick}/>
            }
        </Fragment>
    )
}


const mapStoreToProps = (store, props) => {
    return {
        images: store.imagesReducer.images,
        tagSuggestions: store.imagesReducer.tagSuggestions,
        authorSuggestions: store.imagesReducer.authorSuggestions,
        filterObject: store.imagesReducer.filterObject,
        viewMode: store.imagesReducer.viewMode,
        columnViewModeSize: store.imagesReducer.columnViewModeSize,
        pagination: store.imagesReducer.pagination
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
                case "tagMode": { newFilterObject = merge(true, filterObject, {tagModeFilterValue: value}); break;}
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
        },
        onAuthorClick: (authorId, filterObject) => {
            const authorNameArray = filterObject.authorFilterValues.split(",");
            if(authorNameArray.filter(_ => _ === authorId).length == 0) {
                let newFilterObject = merge(true, filterObject);
                newFilterObject.authorFilterValues += `,${authorId}`;
                dispatch(changeFilter(newFilterObject));
                dispatch(fetch(newFilterObject));
            }
        },
        onChangeViewMode: (viewMode) => {
            dispatch(changeViewMode(viewMode));
            $(".tooltip").remove();
        },
        onChangeColumnViewSize: (size) => {
            dispatch(changeColumnViewSize(size));
        },
        onChangeIsShowAllTags: (isShowAllTags, imageId) => {
            dispatch(changeIsShowAllTags(isShowAllTags, imageId));
        },
        onPageClick: (currentPage)=> {
            dispatch(changeImageCurrentPage(currentPage));
        }
    }
}
export default withRouter(connect(mapStoreToProps, mapDispatchToProps)(Home))
