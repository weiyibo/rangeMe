import React from "react";

const Pagination = ({ pagination: {totalPages, currentPage}, onPageClick }) => {
    const paginationIndexes = [];
    const pageClick = (e, newCurrentPage) => {
        e.preventDefault();
        e.stopPropagation();
        if(newCurrentPage != currentPage){
            onPageClick(newCurrentPage);
        }
    }
    for(let i = 1; i <= totalPages; i++){
        paginationIndexes.push(<li key={i} className={i == currentPage ? "active" : ""} onClick={(e) => pageClick(e, i)}><a href="#">{i}</a></li>);
    }

    return (
        <div className="text-center">
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li className={currentPage == 1 ? "disabled" : ""} onClick={(e) => pageClick(e, Math.max(currentPage - 1, 1))}>
                        <a href="#" aria-label="Previous">
                            <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>
                    {
                        paginationIndexes.map(paginationIndex => paginationIndex)
                    }
                    <li className={currentPage == totalPages ? "disabled": ""} onClick={(e) => pageClick(e, Math.min(totalPages,currentPage + 1))}>
                        <a href="#" aria-label="Next">
                            <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}



export default Pagination;