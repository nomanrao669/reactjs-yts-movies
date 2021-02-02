import React, { Component } from 'react';
import Movie from "./Movie";
import Pagination from './Pagination';
import SearchBar from "./SearchBar";
import GetPreloaders from "./GetPreloaders";
import MovieDetails from "./MovieDetails";

export default class App extends Component {
    constructor() {
        super();

        this.api_path = 'https://yts.lt/api/v2/list_movies.json';
        this.state = {
            movies: [],
            pageNo: 1,
            pageLimit: 24,
            pageSlab: 1,
            totalPageButtons: 11,
            totalMovies: 0,
            queryTerm: '',
            colorTheme: 'red-theme',
            selectedMovie: ''
        }

        this.GetMoviesFromAPI = this.GetMoviesFromAPI.bind(this);
        this.MovieBoxClickHandler = this.MovieBoxClickHandler.bind(this);
    }

    componentDidMount() {
        if (this.state.movies.length === 0) {
            this.GetMoviesFromAPI();
        } 
        document.getElementById('MoviesCompponentDiv').classList.add('zero-opacity');

        console.log('app mounted!');
    }

    GetMoviesFromAPI(
        pageSize = this.state.pageLimit,
        currentPage = this.state.pageNo,
        queryKeyword = ''
    ) {
        
        document.getElementById('MoviesCompponentDiv').classList.add('zero-opacity');
        document.getElementById('MoviesCompponentDiv').classList.remove('one-opacity');
        setTimeout(() => {
            document.getElementById('AJAXLoader').style.display = "block";
            document.getElementById('PaginationComponentDiv').style.display = "none";
        }, 500);

        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        let api_query = `?limit=${pageSize}&page=${currentPage}&query_term=${queryKeyword}`;

        fetch(this.api_path + api_query, {
            mode: 'no-cors',
            headers: {
                'Access-Control-Allow-Origin': window.location.origin
            }
        })
            .then(res => res.json())
            .then((result) => {

                this.setState((state, props) => ({
                    pageNo: currentPage,
                    queryTerm: queryKeyword,
                    movies: result.data.movies,
                    totalMovies: result.data.movie_count
                }));

                this.LazyLoadImages();
                document.getElementById('MoviesCompponentDiv').classList.add('one-opacity');
                document.getElementById('MoviesCompponentDiv').classList.remove('zero-opacity');
                document.getElementById('AJAXLoader').style.display = "none";
                setTimeout(() => {
                    document.getElementById('PaginationComponentDiv').style.display = "block";
                }, 1000);
            });
    }

    LazyLoadImages() {
        // let allImages = document.getElementsByClassName('nLazyLoad');
        // Array.from(allImages).map((img) => {
        //     // if (img.classList.contains('nLazyLoad')) {
        //     //     img.onload = () => {
        //     //         if (img.classList.contains('img-placeholder')) return;
        //     //         img.classList.remove('nLazyLoad');
        //     //         img.src = img.dataset.src;
        //     //     }
        //     // }
        //     img.onload = () => {
        //         img.parentNode.childNodes[0].style.display = "none"
        //     }
        //     img.onerror = () => {
        //         img.classList.remove('nLazyLoad');
        //         img.src = 'https://via.placeholder.com/230x345&text=' + img.dataset.moviename;
        //         img.classList.add('img-placeholder');
        //     }
        // });

        var lazyImages = [].slice.call(document.querySelectorAll("img.nLazyLoad"));

        if ("IntersectionObserver" in window) {
          let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.srcset = lazyImage.dataset.srcset;
                    lazyImage.classList.remove("nLazyLoad");
                    lazyImageObserver.unobserve(lazyImage);

                    lazyImage.parentNode.childNodes[0].style.display = "none";
                }

                entry.target.onerror = () => {
                    entry.target.classList.remove('nLazyLoad');
                    entry.target.src = 'https://via.placeholder.com/230x345&text=' + entry.target.dataset.moviename;
                    entry.target.classList.add('img-placeholder');
                }
            });
          });
      
          lazyImages.forEach(function(lazyImage) {
            lazyImageObserver.observe(lazyImage);
          });
        } else {
          // Possibly fall back to a more compatible method here
        }

    }

    MovieBoxClickHandler(movieData) {
        this.setState((state, props) => ({
            selectedMovie: movieData
        }));

        document.getElementById("MovieDetailsComponent").classList.add('show');
    }

    render() {

        const { movies } = this.state;
        return (
            <div className={`container ${this.state.colorTheme}`}>
                <div className="row">
                    <div className="col-sm-12">
                        <SearchBar GetMoviesFromServer={this.GetMoviesFromAPI} parentState={this.state}/>
                    </div>
                </div>

                <GetPreloaders Loader="androidkitkat" />

                <div className="row" id="MoviesCompponentDiv">
                    {movies ? movies.map(movie => (
                        <div key={movie.id} className="col-md-2">
                            <Movie moviedata={movie} callMovieDetails={this.MovieBoxClickHandler}/>
                        </div>
                    )) : ''}
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <div id="PaginationComponentDiv" style={{display:'none'}}>
                            <Pagination parentState={this.state} GetMoviesFromServer={this.GetMoviesFromAPI} />
                        </div>
                    </div>
                </div>

                <MovieDetails moviedetails={this.state.selectedMovie} />
            </div>
        );
    }
}