import React from 'react';
import ClickableThumbnail from './ClickableThumbnail';

export default class MovieView extends React.Component {

  render() {
    let { searchResults, onOpenMovieDetails } = this.props;
    const movieThumbnails = searchResults.map((movie, i) =>
      <MovieThumbnail key={i} onOpenMovieDetails={onOpenMovieDetails} movie={movie}/>
    );
    return (<span>{movieThumbnails}</span>);
  }

}

class MovieThumbnail extends React.Component {
 render() {
   let { movie, onOpenMovieDetails } = this.props;
    return (<ClickableThumbnail
      overlayText={this.getMovieTextOverlay(movie)}
      onClick={this.handleClickThumbnail.bind(this, onOpenMovieDetails, movie)}
      imageSrc={movie.Poster}/>);
 }

 handleClickThumbnail(onOpenMovieDetails, movie) {
   onOpenMovieDetails(movie);
 }

 getMovieTextOverlay(movie) {
   return movie.Title + ", " + movie.Year;
 }
}