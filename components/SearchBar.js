import React, { Component } from "react";

export default class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = this.props.parentState;

        this.handleSearchBtnClick = this.handleSearchBtnClick.bind(this);
        this.handleCancelSearchBtnClick = this.handleCancelSearchBtnClick.bind(this);
    }

    componentDidMount() { }

    handleSearchBtnClick() {
        let queryKeyword = document.getElementById('SearchKeyword').value;
        if (queryKeyword !== '') {
            this.props.GetMoviesFromServer(this.state.pageLimit, this.state.pageNo, queryKeyword);
            document.getElementsByClassName('SearchBar_Fields')[0].classList.add('searched');
        }
    }

    handleCancelSearchBtnClick() {
        document.getElementById('SearchKeyword').value = '';
        this.props.GetMoviesFromServer(this.state.pageLimit, this.state.pageNo, '');
        document.getElementsByClassName('SearchBar_Fields')[0].classList.remove('searched');
    }

    render() {
        return (
            <div id="Comp-SearchBar">
                <div className="SearchBar_Fields">
                    <input type="text" id="SearchKeyword" className="SearchBar_Input" placeholder="SEARCH" autoComplete="off" />
                    <button className="SearchBar_Button GetSearch" onClick={this.handleSearchBtnClick}>
                        <i className="fas fa-search"></i>
                    </button>
                    <button className="SearchBar_Button CancelSearch" onClick={this.handleCancelSearchBtnClick}>
                        <i className="fas fa-undo"></i>
                    </button>
                </div>
            </div>
        );
    }
}