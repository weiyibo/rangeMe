import React from "react";
import moment from "moment";

const ImageTableView = ({ images, onTagClick, onAuthorClick }) => {
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    });
    return (
        <div className="table-responsive margin-top-10">
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
                            {
                                image.tagArray &&
                                image.tagArray.map(tag => <span className="label label-info custom-tag" key={tag} onClick={() => onTagClick(tag)}>{tag}</span>)
                            }
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default ImageTableView;
