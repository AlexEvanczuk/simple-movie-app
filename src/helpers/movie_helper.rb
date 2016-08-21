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

      # IMDB does not allow remote linking to their images, so we need to download
      # each image and host it
      ret['Search'].each do |movie|
        if movie['Poster'] == "N/A"
          movie_poster_src = 'http://www.digitaltyrants.com/wp-content/uploads/question_movie_cover.jpg';
          filename = "/tmp/default_poster.jpg"
        else
          movie_poster_src = movie['Poster'];
          filename = "/tmp/#{movie['imdbID']}_poster.jpg"
        end

        if !File.exist? filename
          File.open(filename, "wb") do |f|
            f.binmode
            f.write HTTParty.get(movie_poster_src).parsed_response
            f.close
          end
        end

        movie['Poster'] = filename;

      end


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