class FavoriteMovies < ActiveRecord::Migration
  def self.up
    create_table :favorite_movies do |t|
      t.string :imdb_id
      t.string :user_id
      t.timestamps
    end
  end

  def self.down
    drop_table :favorite_movies
  end
end