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
    ret = get('/',{ query: {s: query_string, page: page} })

    if ret["Error"] && ret["Error"] == "Movie not found!"
      return {:movies => [], :more_results => false}
    else
      more_results = ret['totalResults'].to_i >= page.to_i * 10
      return {:movies => ret['Search'], :more_results => more_results}
    end
  end

  # Pulls information for a single movie
  def self.get_movie_information(imdb_id)
    # Set the base_uri used in requests for HTTPParty
    base_uri 'http://www.omdbapi.com/'

    # Use OMDb API to search movies based on query string
    ret = get('/',{ query: {i: imdb_id, plot: 'short', r: 'json', tomatoes: true} })
    return ret
  end
end