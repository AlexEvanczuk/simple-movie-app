require 'sinatra'
require 'better_errors'

# Configure BetterErrors in middleware stack
configure :development do
  use BetterErrors::Middleware
  BetterErrors.application_root = __dir__
end

# Root application
get '/' do
  File.read('./src/views/index.html')
end

post '/' do
  'message received'
end


get 'favorites' do
  response.header['Content-Type'] = 'application/json'
  File.read('data.json')
end

get '/favorites' do
  file = JSON.parse(File.read('data.json'))
  return 'Invalid Request' unless params[:name] && params[:oid]
  movie = { name: params[:name], oid: params[:oid] }
  file << movie
  File.write('data.json',JSON.pretty_generate(file))
  movie.to_json
end
