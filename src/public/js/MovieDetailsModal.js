import React from 'react';
import { Modal } from 'react-bootstrap/lib';
import $ from 'jquery';

export default class MovieDetailsModal extends React.Component {

  constructor() {
    super();
    this.state = {movieDetails: null};
  }

  render() {
    let { onCloseMovieDetails, movie } = this.props;

    return (<Modal show onHide={onCloseMovieDetails}>
      <Modal.Header closeButton>
        <Modal.Title>{movie.Title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-body">
          <div className="modal-section">
            <img className='movie-poster' src={movie.Poster} height='300' width='200' />
          </div>
          <div className='modal-section'>
            <div>Year: {movie.Year}</div>
            <div className='additional-details'>{this.renderMovieDetails(movie)}</div>
            <div><a href={this.getIMDBLink(movie)}>View on IMDB</a></div>
          </div>
        </div>
      </Modal.Body>
    </Modal>);
  }

  getIMDBLink(movie) {
    return 'http://www.imdb.com/title/' + movie.imdbID;
  }

  renderMovieDetails(movie) {
    const movieDetails = this.state.movieDetails;

    if(!movieDetails) {
      this.fetchMovieDetails(movie);
      return "Loading additional details, please be patient!"
    } else {
      const movieWebsite = movieDetails.Website == "N/A" ? null : movieDetails.Website;
      const websiteLink = movieWebsite ? (<div><a href={movieWebsite}>Company Website</a></div>) : null;
      let favoriteLink = null;
      if (movieDetails.currently_favorited) {
        favoriteLink = (<div>This movie is one of your favorites!</div>);
      } else {
        favoriteLink = (<div>
          <a onClick={this.favoriteMovie.bind(this, movie)}>
            Favorite this movie
          </a>
        </div>);
      }
      return (<span>
        <div>{movieDetails.Rated} {movieDetails.Runtime}</div>
        <div>{movieDetails.Country + ", " + movieDetails.Language + ", " + movieDetails.Production}</div>
        <div>{movieDetails.Genre}</div>
        <hr/><div>{movieDetails.Plot}</div><hr/>
        {favoriteLink}
        {websiteLink}
      </span>);
    }
  }

  fetchMovieDetails(movie) {
    $.ajax({
      url: 'get_movie_details',
      method: 'POST',
      data: { imdb_id: movie.imdbID },
      success: (response) => (this.setState({movieDetails: response}))
    })
  }

  // TODO: Add feedback when a movie has been favorited
  favoriteMovie(movie) {
    $.ajax({
      url: 'favorite_movie',
      method: 'POST',
      data: { imdb_id: movie.imdbID }
    })
  }
}