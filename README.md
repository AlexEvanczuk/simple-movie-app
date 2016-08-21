## Alex Evanczuk: WDI Instructor Code Challenge
This repo contains the data for the GA WDI Instructor code challenge.  The challenge prompt is below.

The link to view this app live is here:
[Simply Movie App](http://http://simple-movie-app.herokuapp.com/)

This app is rather simple.  It is built on Sinatra using ActiveRecord to persist data and vanilla HTML/CSS/Javascript to allow the user to search and favorite movies.

The app has a basic javascript file that contains a number of core functions, including user functions (e.g. search and favorite), DOM helper functions (e.g. clear results, insert movies, and open movie details modal), and ajax helper methods (e.g. fetch movies, fetch movie details).
 
The app also has a basic controller to receive the ajax requests and serve data.
There is also a movie helper module that interacts with the IMDB api in a way that is easy for the app controller to digest.
Namely, it can search movies, get details for an individual movie, and check favorites for a user.
Authentication is gone by the sintra-simple-authentication gem.  I did not modify or override any of its behavior, such as the provided User model or the login/logout template.

![GA Logo](https://raw.github.com/generalassembly/ga-ruby-on-rails-for-devs/master/images/ga.png)

## WDI Instructor Code Challenge

### GOAL 

> Create a single page application that will utilize an external API to request movie data. The client side application will be served by a back-end which will have the ability to persist data.

#### Back-end Instructions

- Within this repo you will have noticed two folders entitled `node-backend-starter-code` and `ruby-backend-starter-code`. Each of these contains similar back-ends written in frameworks respective to their languages - Sinatra for Ruby and Express for Node.

- Please **choose one** of the back-ends before you proceed. Feel free to pick whichever language you feel more comfortable in.

- Both back-ends contain several errors that commonly made by students, so you will need to do some debugging to ensure they are working correctly.

#### Front-end Instructions

- Use Vanilla Javascript to complete.

- The page should have a form that uses the [OMDBapi](http://www.omdbapi.com/) to search for matching movies and then display the results.
 - *Example*: If a user searches for `Star Wars`, a list of every Star Wars movie will be displayed.

- When the user clicks on a search result display detailed information about that movie.
  - *Example*: If a user is viewing a list of every Star Wars movie and clicks on `Star Wars: A New Hope`, detailed information about that specific movie will be displayed.

- Users should be able to "favorite" a movie and have it persisted via the provided back-end.

- Provide a link to display favorited movies.

#### Things we are looking for

- Clear, simple code
- Explanatory comments for beginners
- Consistent Naming Conventions
- Valid HTML, CSS, and JavaScript

#### Deliverables

- Please send us back a link to a git repo with the completed code challenge. 

- Include a README.md file in your repo with a link to your application deployed on Heroku or Digital Ocean.

#### Bonus

- Rewrite the application using a JavaScript MVC library. Include a readme that explains the benefits and any additional challenges students would face learning the library
