/*
 * CONTAINER LOCATIONS
 */
const SEARCHED_MOVIE_CONTAINER = "searched-movie-container";
const FAVORITED_MOVIE_CONTAINER = "favorited-movie-container";

/*
 * USER ACTIONS
 */

// Show movies this user has favorited
function showFavorites() {
  clearMovies();
  showMovieContainer(FAVORITED_MOVIE_CONTAINER);
  fetchMovies(null, "favorites", 0, ((movies) => (insertMovies(movies, FAVORITED_MOVIE_CONTAINER))));
}

// Search for movies matching a search string and show results
function searchMovies(e) {
  clearMovies();
  showMovieContainer(SEARCHED_MOVIE_CONTAINER);
  var queryString = document.getElementsByName("query_string")[0].value;
  fetchMovies(queryString, "search", 0, ((movies) => (insertMovies(movies, SEARCHED_MOVIE_CONTAINER))));
}

/*
 * DOM MANIPULATION HELPER METHODS
 */

// Inserts movies objects into the DOM
function insertMovies(movies, containerName) {
  for(var i = 0; i < movies.length; i++) {
    insertMovie(movies[i], containerName);
  }
}

// Removes all movies from the list (favorited or searched)
// and hides both the saved and favorited movie containers
function clearMovies() {
  const savedContainer = document.getElementById(SEARCHED_MOVIE_CONTAINER);
  const favoritedContainer = document.getElementById(FAVORITED_MOVIE_CONTAINER);
  savedContainer.innerHTML = "";
  favoritedContainer.innerHTML = "";
  savedContainer.style.display = 'none';
  favoritedContainer.style.display = 'none';
}

// Shows the container holding searched or favorited movies
function showMovieContainer(containerName) {
  const container = document.getElementById(containerName);
  container.style.display = 'block';
}

// Inserts a movie div into the movie container
// This movie div displays the movie name when a user hovers over it,
// and also displays a star that the user can click which will save the movie
function insertMovie(movie, containerName) {
  const container = document.getElementById(containerName);
  const movieDiv = document.createElement('div');
  movieDiv.className = 'clickable-thumbnail';

  // Set the thumbnail of the movie to be the movie poster with a hoverable
  // overlay the contains the movie title and year
  movieThumbnail = getMoviePoster(movie) +
      "<div class='clickable-thumbnail-overlay'>" +
      "<span class='clickable-thumbnail-overlay-text'>" + movie.Title + ", " + movie.Year + "</span>" +
      "</div>";

  movieDiv.innerHTML = movieThumbnail;

  // Add behavior for when a user clicks on the poster
  movieDiv.addEventListener("click", (() => openModal(movie)));

  // Add the movie to the end of our movie thumbnail list
  container.appendChild(movieDiv);
}

// Opens and populates the modal corresponding to a movie
// Contains the movie image, the movie name, the IMDB link,
// and the ability to favorite/bookmark the film
function openModal(movie) {
  const modalBackdrop = document.getElementById("modal-backdrop");
  const modal = document.getElementById("modal");
  modalBackdrop.style.display = 'block';
  modal.style.display = 'block';
  modalSrc = "<div class='close-modal'>Close &times;</div>" +
      "<h2>" + movie.Title + "</h2>" +
      "<div class='modal-body'>" +
      "<div class='modal-section'>" +
      getMoviePoster(movie) +
      "</div>" +
      "<div class='modal-section'>" +
      "<div>Year: " + movie.Year + "</div>" +
      "<div class='additional-details'>Loading additional details, please be patient!</div>" +
      "<div><a href='http://www.imdb.com/title/" + movie.imdbID + "'/>View on IMDB</a></div>" +
      "</div>" +
      "</div>";

  modal.innerHTML = modalSrc;

  fetchMovieDetails(movie.imdbID, (response) => {
    const movieWebsite = response.Website == "N/A" ? null : response.Website;
    const websiteLink = movieWebsite ? "<div><a href='" + movieWebsite + "'/>Company Website</a></div>" : "";
    const additionalDetails = document.getElementsByClassName("additional-details")[0];
    let favoriteLink = null;
    if (response.currently_favorited) {
      favoriteLink = "<div>This movie is one of your favorites!</div>"
    } else {
      favoriteLink = "<div><a onclick='favoriteMovie(\"" + movie.imdbID + "\")'/>Favorite this movie</a></div>"
    }
    additionalDetails.innerHTML = "<div>" + response.Rated + ", " + response.Runtime + "</div>" +
        "<div>" + response.Country + ", " + response.Language + ", " + response.Production + "</div>" +
        "<div>" + response.Genre + "</div>" +
        "<hr><div>" + response.Plot + "</div><hr>" +
        favoriteLink +
        websiteLink;
  });

  // Make sure the close modal button works properly
  const closeButton = document.getElementsByClassName("close-modal")[0];
  closeButton.addEventListener('click', () => closeModal());
  modalBackdrop.addEventListener('click', () => closeModal());

  // Disable scrolling
  const body = document.getElementsByTagName("body")[0];
  body.style.overflow = 'hidden';

}

// Given a movie object, returns an image of a movie
function getMoviePoster(movie) {
  return "<img class='movie-poster' src=" + movie.Poster + " height='300' width='200' />"
}

// Closes the modal
function closeModal() {
  const modalBackdrop = document.getElementById("modal-backdrop");
  const modal = document.getElementById("modal");
  modalBackdrop.style.display = 'none';
  modal.style.display = 'none';
  // Allow scrolling
  const body = document.getElementsByTagName("body")[0];
  body.style.overflow = 'auto';
}

/*
 * SERVER AJAX METHODS
 */

// Fetches all movies, either by query string or favorites
// Will continue to fetch until endpoint returns no results
function fetchMovies(search_string, type, page, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      response = JSON.parse(xhttp.responseText);
      callback(response.movies);
      // In case something breaks in the API, we want to stop rendering after 100 pages
      if(response.more_results && page <= 100){
        fetchMovies(search_string, type, page + 1, callback);
      };
    }
  };

  if(type == "favorites") {
    uri =  "get_favorites?page=" + page;
  } else {
    uri =  "search_movies?query_string=" + search_string + "&page=" + page
  }
  xhttp.open("POST", uri, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
}

// Gets individual movie details given an imdbID
function fetchMovieDetails(imdbID, callback) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      response = JSON.parse(xhttp.responseText);
      callback(response);
    }
  };
  uri =  "get_movie_details?imdb_id=" + imdbID;
  xhttp.open("POST", uri, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
}

// Favorites individual movie for a user
function favoriteMovie(imdbID) {
  var xhttp = new XMLHttpRequest();
  uri =  "favorite_movie?imdb_id=" + imdbID;
  xhttp.open("POST", uri, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send();
}