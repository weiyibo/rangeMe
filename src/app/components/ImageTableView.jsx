import React, {Fragment} from "react";
import moment from "moment";

const ImageTableView = ({ images, onTagClick }) => {
    return (
        <div className="">
            <table className="table table-hover">
                <thead>
                <tr>
                    <th className="col-sm-3 col-md-3">Image</th>
                    <th className="col-sm-3 col-md-3">Author</th>
                    <th className="col-sm-3 col-md-3">Date</th>
                    <th className="col-sm-3 col-md-3">Tags</th>
                </tr>
                </thead>
                <tbody>
                {images.map((image, index) => (
                    <tr key={index}>
                        <td></td>
                        <td>{image.authorName}</td>
                        <td>{moment(image.date_taken).format('LL')}</td>
                        <td>
                            {
                                image.tagArray &&
                                image.tagArray.map(tag => <span className="label label-primary custom-tag" key={tag} onClick={() => onTagClick(tag)}>{tag}</span>)
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
