import React, { Component } from "react";

export default class Pagination extends Component {
    constructor(props) {
        super(props);

        this.state = this.props.parentState;
    }

    componentDidMount() { }

    Paginate(
        totalItems,
        currentPage = 1,
        pageSize = 10,
        maxPages = 10
    ) {
        // calculate total pages
        let totalPages = Math.ceil(totalItems / pageSize);

        // ensure current page isn't out of range
        if (currentPage < 1) {
            currentPage = 1;
        } else if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        let startPage, endPage;
        if (totalPages <= maxPages) {
            // total pages less than max so show all pages
            startPage = 1;
            endPage = totalPages;
        } else {
            // total pages more than max so calculate start and end pages
            let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
            let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
            if (currentPage <= maxPagesBeforeCurrentPage) {
                // current page near the start
                startPage = 1;
                endPage = maxPages;
            } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
                // current page near the end
                startPage = totalPages - maxPages + 1;
                endPage = totalPages;
            } else {
                // current page somewhere in the middle
                startPage = currentPage - maxPagesBeforeCurrentPage;
                endPage = currentPage + maxPagesAfterCurrentPage;
            }
        }

        // calculate start and end item indexes
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

        // create an array of pages to ng-repeat in the pager control
        let pages = Array.from(Array((endPage + 1) - startPage).keys()).map(i => startPage + i);

        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
    
    render() {

        const pagesArray = this.Paginate(
            this.props.parentState.totalMovies,
            this.props.parentState.pageNo,
            this.props.parentState.pageLimit,
            10);

        let PaginationListItems = () => {
            return Array.from(pagesArray.pages, (e, i) => {
                return <li className={`page-item ${ this.props.parentState.pageNo == e ? 'active' : ''}`} key={i+1}>
                            <a data-activepage={e} className="page-link" href="javascript:void(0);" onClick={ () => this.props.GetMoviesFromServer(24, e, this.props.parentState.queryTerm)}>{e}</a>
                        </li>
            });
        }

        return (
            <div id="Comp-Pagination">
                <ul className="pagination">
                    {this.props.parentState.pageNo != 1 &&
                        <li className={`page-item ${ this.props.parentState.pageNo == 1 ? 'active' : ''}`}>
                            <a data-activepage='1' className="page-link" href="javascript:void(0);" onClick={ () => this.props.GetMoviesFromServer(24, 1)}>
                                <i className="fas fa-angle-double-left" aria-hidden="true"></i>
                            </a>
                        </li>
                    }

                    <PaginationListItems />

                    {this.props.parentState.pageNo != pagesArray.totalPages &&
                        <li className={`page-item ${ this.props.parentState.pageNo == pagesArray.totalPages ? 'active' : ''}`}>
                            <a data-activepage='1' className="page-link" href="javascript:void(0);" onClick={ () => this.props.GetMoviesFromServer(24, pagesArray.totalPages)}>
                                <i className="fas fa-angle-double-right" aria-hidden="true"></i>
                            </a>
                        </li>
                    }
                </ul>
            </div>
        )
    }
}