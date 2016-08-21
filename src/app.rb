require 'sinatra'
require 'sinatra/activerecord'
# require './environments'
# require './models/User'
require 'sinatra/simple-authentication'

require 'json'
require_relative './helpers/movie_helper'

require 'pry'

class FavoriteMovies < ActiveRecord::Base
end

register Sinatra::SimpleAuthentication

# Configure BetterErrors in middleware stack
configure :development do
  require 'better_errors'
  use BetterErrors::Middleware
  BetterErrors.application_root = __dir__
end

# Root application
get '/' do
  login_required
  send_file './src/views/index.html'
end

# Search for movies matching a search string or imdb id
post '/search_movies' do
  login_required
  content_type :json
  query_string = params['query_string']
  page = params['page']
  data = MovieHelper.search_movies(query_string, page)
  return data.to_json
end

# Saves a movie to favorites
post '/favorite_movie' do
  login_required
  existing_favorites = FavoriteMovies.where(user_id: current_user.id, imdb_id: params["imdb_id"])
  if existing_favorites.blank?
    FavoriteMovies.create(user_id: current_user.id, imdb_id: params["imdb_id"])
  end
  content_type :json
  return {success: true}.to_json
end

# Return details of a movie given an imdb_id
post '/get_movie_details' do
  login_required
  content_type :json
  data = MovieHelper.get_movie_information(current_user, params['imdb_id'])
  return data.to_json
end

# Return all favorites for logged in user
post '/get_favorites' do
  login_required
  content_type :json
  data = MovieHelper.get_movie_favorites(current_user, params['page'])
  return data.to_json
end