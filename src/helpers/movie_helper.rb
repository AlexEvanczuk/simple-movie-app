require 'httparty'
require 'pry'

module MovieHelper
  include HTTParty

  # Search for movies that match a query string
  def self.search_movies(query_string, page)
    return {:movies => [], :more_results => false} if query_string.strip.blank?

    # Set the base_uri used in requests for HTTPParty
    base_uri 'http://www.omdbapi.com/'

    # Use OMDb API to search movies based on query string
    # Note they use 1-based indexing instead of 0-based for pages, so change page accordingly
    ret = get('/',{ query: {s: query_string, page: page.to_i+1} })

    if ret["Error"] && ret["Error"] == "Movie not found!"
      return {:movies => [], :more_results => false}
    else
      more_results = ret['totalResults'].to_i >= page.to_i * 10
      return {:movies => ret['Search'], :more_results => more_results}
    end
  end

  # Pulls information for a single movie
  def self.get_movie_information(user, imdb_id)
    # Set the base_uri used in requests for HTTPParty
    base_uri 'http://www.omdbapi.com/'

    # Use OMDb API to search movies based on query string
    ret = get('/',{ query: {i: imdb_id, plot: 'short', r: 'json', tomatoes: true} })

    # Also include whether or not the current user has this movie favorited
    currently_favorited = !FavoriteMovies.where(user_id: user.id, imdb_id: imdb_id).empty?
    return ret.merge({currently_favorited: currently_favorited})
  end

  # Returns movie favorite information for a user
  def self.get_movie_favorites(user, page)
    favorites = FavoriteMovies.where(user_id: user.id).map(&:imdb_id)
    paginated_results = favorites.each_slice(10).to_a[page.to_i]
    next_page_exists = !favorites.each_slice(10).to_a[page.to_i+1].nil?
    if(paginated_results)
      movies = paginated_results.map{|imdb_id| self.get_movie_information(user, imdb_id)}
      return {:movies => movies, :more_results => next_page_exists}
    else
      return {:movies => [], :more_results => false}
    end
  end
end