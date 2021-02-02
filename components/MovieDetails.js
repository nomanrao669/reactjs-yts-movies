import React, { Component } from "react";

export default class MovieDetails extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() { }

    CalculateMovieRuntime(minutes) {
        var rtime = minutes;
        rtime = rtime / 60;
        rtime = rtime.toFixed(2).split('.');
        return rtime[0] + ' HRS ' + rtime[1] + ' MINS';
    }

    LazyLoadMovieCover(e) {
        e.target.src = e.target.dataset.src;
    }

    CloseMovieDetail() {
        document.getElementById("MovieDetailsComponent").classList.remove('show');
    }

    render() {
        const { moviedetails } = this.props;
        return (
            <div id="MovieDetailsComponent" className={moviedetails == ''  ? '' : 'show'}>
                <div className="movie-cover" style={{backgroundImage:moviedetails.co}}>
                    <div className="row">
                        <div className="col-sm-9 col-sm-offset-3">
                            <div className="movie-info-wrapper">
                                
                            </div>
                        </div>
                    </div>
                </div>
    
                <div className="row" style={{display:'none'}}>
                    <div className="col-sm-12">
                        <div className="BtnGotoDashboard">
                            <i className="fas fa-arrow-left"></i>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-5">
                        <div className="AreaLeftSide">
                            <div className="MovieCoverImg">
                                <img data-src={moviedetails.large_cover_image} src={moviedetails.small_cover_image} onLoad={() => this.LazyLoadMovieCover(event)} />
                            </div>
                            <div className="WatchTrailer">
                                <div className="RoundBtn">
                                    <span className="BtnIcon">
                                        <i className="fas fa-play"></i>
                                    </span>
                                    <span className="BtnLabel">Trailer</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-7">
                        <div className="AreaRightSide">
                            <div id="closeMovieDetail" onClick={() => this.CloseMovieDetail()}>
                                <i className="fa fa-times"></i>
                            </div>
                            <div className="MovieTitle">
                                <h1>{moviedetails.title_english}</h1>
                            </div>
                            <div className="MovieYear">{moviedetails.year}</div>
                            <div className="MovieRuntime">{this.CalculateMovieRuntime(moviedetails.runtime)}</div>
                            <div className="MovieStarRatings">
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                                <i className="fas fa-star"></i>
                            </div>
                            <div className="MovieDescription_Outer">
                                <div className="Description">
                                    {moviedetails.description_full}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}