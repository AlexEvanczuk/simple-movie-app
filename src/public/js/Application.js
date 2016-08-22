import React from 'react';
import ReactDOM from 'react-dom';
import StandardButton from './StandardButton';
import MovieView from './MovieView';
import MovieDetailsModal from './MovieDetailsModal'
import $ from 'jquery';

class Application extends React.Component {
  constructor() {
    super();
    this.state = { searchInput: null,
      searchResults: [],
      showFavorites: false,
      movieDetailsTarget: null};

    this.onOpenMovieDetails = this.onOpenMovieDetails.bind(this);
    this.onCloseMovieDetails = this.onCloseMovieDetails.bind(this);
  }

  // Open the about modal
  onOpenMovieDetails(movie) {
    this.setState({ movieDetailsTarget: movie });
  }

  // Close the about modal
  onCloseMovieDetails() {
    this.setState({ movieDetailsTarget: null });
  }

  render() {

    let movieDetailsModal = null;

    if (this.state.movieDetailsTarget) {
      movieDetailsModal = (<MovieDetailsModal
          onCloseMovieDetails={this.onCloseMovieDetails}
          movie={this.state.movieDetailsTarget}
      />);
    }

    // Main application top level view
    return (<div id="application-container">
      {movieDetailsModal}
      <h4>Search matching movies or review all favorited movies</h4>
      <div id="search-container">
        <input onChange={this.saveSearchString.bind(this)} className="search-input-react" placeholder="Search Movie" type="text" name="query_string"/>
        <StandardButton onClick={this.onClickSearch.bind(this)} buttonString="Search"/>
        <StandardButton onClick={this.onClickShowFavorites.bind(this)} buttonString="Show Favorites" />
      </div>
      <div className="application-body">
        <MovieView onOpenMovieDetails={this.onOpenMovieDetails} searchResults={this.state.searchResults}/>
      </div>
    </div>);
  }

  saveSearchString(e) {
    this.setState({searchInput: e.target.value})
  }

  onClickSearch() {
    this.setState({searchResults: [], showFavorites: false});
    this.searchMovies(this.state.searchInput, false, 0);
  }

  onClickShowFavorites() {
    this.setState({searchResults: [], showFavorites: true});
    this.searchMovies("", true, 0);
  }

  // Search for all movies that match a query string
  // TODO: Add loading indicators to show that a search is happening
  searchMovies(searchString, favorites, page) {
    $.ajax({
      url: (favorites == true ? "get_favorites" : "search_movies"),
      method: 'POST',
      data: { page: page, query_string: searchString },
      success: (response) => {
        // In case something breaks in the API, we want to stop rendering after 100 pages
        if(response.more_results && page <= 100) {
          const oldResults = this.state.searchResults;
          this.setState({searchResults: oldResults.concat(response.movies)});
          // If a new search has started, or modes have switched
          // since this one began returning paginated results,
          // stop searching
          if((!favorites && searchString !== this.state.searchInput) || favorites !== this.state.showFavorites) {
          } else {
            this.searchMovies(searchString, favorites, page + 1);
          }
        }
      }
    });
  }

}

// Our main instructions to render the application
ReactDOM.render(<Application />, document.getElementById('container'));