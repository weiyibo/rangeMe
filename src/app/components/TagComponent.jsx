import React, {Fragment} from "react";
import imagesHelper from "../helpers/imagesHelper";

const TagComponent = ({ tagArray, isShowAllTags, onTagClick, onChangeIsShowAllTags }) => {
    let tagArrayNeedToShow = [];
    if(tagArray) {
        if(!isShowAllTags && tagArray.length > imagesHelper.defaultAmountOfTagToShow) {
            tagArrayNeedToShow = tagArray.slice(0, imagesHelper.defaultAmountOfTagToShow);
        }else {
            tagArrayNeedToShow = tagArray;
        }
    }
    return (
        <Fragment>
            {
                tagArrayNeedToShow &&
                tagArrayNeedToShow.map(tag =>
                    <span className="label label-info custom-tag" key={tag} onClick={() => onTagClick(tag)}
                          data-toggle="tooltip" data-placement="right" title={tag}>{tag.length > 15 ? `${tag.substring(0, 15)}...` : tag }</span>)
            }
            {
                tagArray && tagArray.length > imagesHelper.defaultAmountOfTagToShow && <div className="text-right">
                    {
                        isShowAllTags ?
                            <a className="pointer small-font-size" onClick={() => onChangeIsShowAllTags(false)}>Show Less Tags</a> :
                            <a className="pointer small-font-size" onClick={() => onChangeIsShowAllTags(true)}>Show More Tags</a>
                    }
                </div>
            }
        </Fragment>
    )
}

export default TagComponent;
