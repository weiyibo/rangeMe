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
                    <div className={ `image-mode-view-option ${size >= 4 && "graph-option-active"}`} onMouseOver={() => onChangeColumnViewSize(4)}/>
                </div>
            </div>
        </div>
    )
}

export default ImageColumnModeSize;


{/*<div className="dropdown" style={{display: 'inline-block', float: "left"}}
             data-toggle="tooltip" data-placement="right" title="Graphs per row">
            <button className="btn btn-secondary dropdown-toggle"
                    style={{backgroundColor: 'transparent', padding: '0px 0px 0px 0px'}}
                    type="button" id="dropdownMenuButton" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                <div className="view-option"></div>
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <div style={{marginLeft: '6px', marginTop: '4px'}}>
                    <div style={{
                        display: 'inline-block',
                        width: '20px',
                        height: '20px',
                        borderStyle: 'solid',
                        marginRight: '2px'
                    }}></div>
                    <div style={{
                        display: 'inline-block',
                        width: '20px',
                        height: '20px',
                        borderStyle: 'solid',
                        marginRight: '2px'
                    }}></div>
                    <div style={{
                        display: 'inline-block',
                        width: '20px',
                        height: '20px',
                        borderStyle: 'solid',
                        marginRight: '2px'
                    }}></div>
                    <div style={{
                        display: 'inline-block',
                        width: '20px',
                        height: '20px',
                        borderStyle: 'solid'
                    }}></div>
                </div>
            </div>
        </div>*/}