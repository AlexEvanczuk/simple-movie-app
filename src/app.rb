require 'sinatra'
require 'sinatra/activerecord'
require './environments'
require 'json'
require_relative './helpers/movie_helper'

require 'pry'

# Configure BetterErrors in middleware stack
configure :development do
  require 'better_errors'
  use BetterErrors::Middleware
  BetterErrors.application_root = __dir__
end

# Root application
get '/' do
  send_file './src/views/index.html'
end

# Search for movies matching a search string
post '/search_movies' do
  content_type :json
  query_string = params['query_string']
  page = params['page']
  data = MovieHelper.search_movies(query_string, page)
  return data.to_json
end

# Return details of a movie given an imdb_id
post '/get_movie_details' do
  content_type :json
  data = MovieHelper.get_movie_information(params['imdb_id'])
  return data.to_json
end

get 'favorites' do
  response.header['Content-Type'] = 'application/json'
  File.read('data.json')
end

# Returns all favorites for a given user
get '/favorites' do
  file = JSON.parse(File.read('data.json'))
  return 'Invalid Request' unless params[:name] && params[:oid]
  movie = { name: params[:name], oid: params[:oid] }
  file << movie
  File.write('data.json',JSON.pretty_generate(file))
  movie.to_json
end
