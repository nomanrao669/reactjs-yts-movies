import React, {Component} from 'react';

export default class Movie extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="MovieBox" onClick={() => this.props.callMovieDetails(this.props.moviedata)}>
                <div className="MovieThumbnail">
                    <i className="fa fa-spinner fa-spin"></i>
                    <img className="nLazyLoad" data-moviename={this.props.moviedata.title} src={this.props.moviedata.small_cover_image} data-src={this.props.moviedata.medium_cover_image} data-srcset={this.props.moviedata.medium_cover_image + ` 2x, ` + this.props.moviedata.medium_cover_image + ` 1x`} />
                </div>
                <div className="MovieRating">
                    <i className="fas fa-star"></i>
                    <span className="MovieRatingNumber"> {this.props.moviedata.rating == 0 ? 'N/A' : this.props.moviedata.rating}</span>
                </div>
                {/* <div className="MovieName">{this.props.moviedata.title}</div> */}
            </div>
        );
    }
}