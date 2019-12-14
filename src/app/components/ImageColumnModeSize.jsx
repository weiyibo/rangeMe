import React from "react";

const ImageColumnModeSize = ({ size, onChangeColumnViewSize }) => {
    return (
        <div className=" dropdown pointer text-left" aria-hidden="true"
              data-toggle="tooltip" data-placement="top" title="Images per row">

            <button className="btn btn-secondary dropdown-toggle image-mode-button"
                type="button" id="dropdownMenuButton" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <div className="view-option"/>
            </button>

            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <div className="image-mode-dropdown">
                    <div className={ `image-mode-view-option ${size >= 1 && "graph-option-active"}`} onMouseOver={() => onChangeColumnViewSize(1)}/>
                    <div className={ `image-mode-view-option ${size >= 2 && "graph-option-active"}`} onMouseOver={() => onChangeColumnViewSize(2)}/>
                    <div className={ `image-mode-view-option ${size >= 3 && "graph-option-active"}`} onMouseOver={() => onChangeColumnViewSize(3)}/>
                </div>
            </div>
        </div>
    )
}

export default ImageColumnModeSize;