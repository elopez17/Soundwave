class CreateSongs < ActiveRecord::Migration[5.2]
  def change
    create_table :songs do |t|
      t.integer :user_id, null: false
      t.string :genre, null: false
      t.string :name, null: false
      t.timestamps
    end
    add_index :songs, :user_id
  end
end
