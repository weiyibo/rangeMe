import React, {Fragment} from "react";

const TagComponent = ({ tagArray, isShowAllTags, onTagClick }) => {
    return (
        <Fragment>
            {
                tagArray &&
                tagArray.map(tag =>
                    <span className="label label-info custom-tag" key={tag} onClick={() => onTagClick(tag)}
                          data-toggle="tooltip" data-placement="right" title={tag}>{tag.length > 15 ? `${tag.substring(0, 15)}...` : tag }</span>)
            }
        </Fragment>
    )
}

export default TagComponent;
