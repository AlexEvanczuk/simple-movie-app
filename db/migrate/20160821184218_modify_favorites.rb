class ModifyFavorites < ActiveRecord::Migration
  def change
    reversible do |dir|
      change_table :favorite_movies do |t|
        dir.up   { t.change :user_id, 'integer USING CAST(user_id AS integer)' }
        dir.down { t.change :user_id, :string }
      end
    end
  end
end