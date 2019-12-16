import React, {Fragment} from "react";
import moment from "moment";
import TagComponent from "./TagComponent.jsx";
import Pagination from './Pagination.jsx';

const ImageTableView = ({ images, pagination, onTagClick, onAuthorClick, onChangeIsShowAllTags, onPageClick }) => {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
    return (
        <Fragment>
            <div className="table-responsive">
                <table className="table table-hover table-word-break">
                    <thead>
                    <tr>
                        <th className="col-sm-1">Image</th>
                        <th className="col-sm-4">Author</th>
                        <th className="col-sm-2">Date</th>
                        <th className="col-sm-5">Tags</th>
                    </tr>
                    </thead>
                    <tbody>
                    {images.map((image, index) => (
                        <tr key={index}>
                            <td>
                                <a href={image.link} target="_blank">
                                    <img src={image.imgUrl} alt={image.imgAlt} width="50px" height="50px"/>
                                </a>
                            </td>
                            <td>
                                <a data-toggle="tooltip" data-placement="right" title="Click for searching"><span onClick={() => onAuthorClick(image.author_id)} className="pointer">
                                {image.authorName}
                            </span></a>
                            </td>
                            <td>{moment(image.date_taken).format('LL')}</td>
                            <td>
                                <TagComponent isShowAllTags={image.isShowAllTags} onTagClick={onTagClick} tagArray={image.tagArray}
                                              onChangeIsShowAllTags={(e) => onChangeIsShowAllTags(e, image.id)}/>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <Pagination pagination={pagination} onPageClick={onPageClick}/>
        </Fragment>
    )
}

export default ImageTableView;
