import React from "react";
import moment from "moment";
import TagComponent from "./TagComponent.jsx";
import Pagination from './Pagination.jsx';

const ImageColumnView = ({ images, size, pagination, onTagClick, onAuthorClick, onChangeIsShowAllTags, onPageClick }) => {
    const imageRows = [];
    let imageRow = [];
    images.map(image => {
        if(imageRow.length == size) {
            imageRows.push(imageRow);
            imageRow = [image];
        }else {
            imageRow.push(image);
        }
    });
    if(imageRow.length > 0) {
        imageRows.push(imageRow);
    }
    const colSize = 12 / size;
    return (
        <div className="margin-top-10">
            {imageRows.map((imageRow, rowIndex) => (
                <div className="row" key={`row-${rowIndex}`}>
                    {
                        imageRow.map( (image, index) => (
                            <div className={`col-sm-${colSize}`} key={index}>
                                <div className="thumbnail table-word-break">
                                    <a href={image.link} target="_blank">
                                        <img src={image.imgUrl} alt={image.imgAlt} className="img-thumbnail"/>
                                    </a>
                                    <div className="caption">
                                        <h4><b>Author</b>: &nbsp;
                                            <a data-toggle="tooltip" data-placement="right" title="Click for searching">
                                                <span onClick={() => onAuthorClick(image.author_id)} className="pointer">
                                                    {image.authorName}
                                                </span>
                                            </a>
                                        </h4>
                                        <h4><b>Date</b>: &nbsp; {moment(image.date_taken).format('LL')}</h4>
                                        <h4><b>Tags</b>: &nbsp;
                                            <TagComponent isShowAllTags={image.isShowAllTags} onTagClick={onTagClick} tagArray={image.tagArray}
                                                          onChangeIsShowAllTags={(e) => onChangeIsShowAllTags(e, image.id)}/>
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            ))}
            <Pagination pagination={pagination} onPageClick={onPageClick}/>
        </div>
    )
}

export default ImageColumnView;
