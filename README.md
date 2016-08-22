## Alex Evanczuk: WDI Instructor Code Challenge
This repo contains the data for the GA WDI Instructor code challenge.  The challenge prompt is below.

The link to view this app live is here:
[Simple Movie App](http://simple-movie-app.herokuapp.com/)

I also coded this up in React.js, which can be found here:
[Simple Movie App (in React)](http://simple-movie-app.herokuapp.com/react)

This app is rather straightforward.  It is built on Sinatra using ActiveRecord to persist data and vanilla HTML/CSS/Javascript to allow the user to search and favorite movies.

The app has a basic javascript file that contains a number of core functions, including user functions (e.g. search and favorite), DOM helper functions (e.g. clear results, insert movies, and open movie details modal), and ajax helper methods (e.g. fetch movies, fetch movie details).
 
The app also has a basic controller to receive the ajax requests and serve data.
There is also a movie helper module that interacts with the IMDB api in a way that is easy for the app controller to digest.
Namely, it can search movies, get details for an individual movie, and check favorites for a user.
Authentication is gone by the sintra-simple-authentication gem.  I did not modify or override any of its behavior, such as the provided User model or the login/logout template.

Although there are a number of features that would be added to make this a useful app for personal movie management, there are a number of things that should be added to improve usability and maintainability of the current iteration:

- Loading indicators for AJAX calls
- Refactor AJAX into a separate API JS library
- Success indicator after a user has finished favoriting a movie
- Ability to remove from favorites
- Logout (right now need to navigate to /logout), improved feedback on login/logout failure, better designed login/signup pages

## Benefits and Additional Challenges of React Implementation
Benefits:
- The React.js implementation would give beginners the opportunity to understand how the MVC/object-oriented philosophy can be applied to front-end development.
- Exposes the beginner to an extremely popular and widely-used framework
- Methods related to a particular component of the front-end are necessarily linked to the component via model methods, rather than needing to add event listeners
- There is a lot more code reusability out of the box, such as with similar looking input buttons.  In theory, with Vanilla javascript, we could design functions that allow us to reuse components such as what I did with insertMovie.
- A lot less reinventing of the wheel, such as with modals and ideas around event listeners.
- Using jQuery makes code much cleaner

Additional challenges:
- A beginniner would need to understand what it means to design code with component modularity in mind
- Need to learn the differences between using state and props when creating a component, and when to use one or the other
- Need to figure out using webpack in order to use es6 and other imports, as well as bundle the various dependencies.
- Need to understand the concept of passing functions as paramters, and what it means to bind an object (this) to a function in order to make sure the correct state or attributes are modified when a function is fired.

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
