class CreateUserPositions < ActiveRecord::Migration
  def change
    create_table :user_positions do |t|
      t.string :longitude
      t.string :latitude
      t.integer :user_id

      t.timestamps null: false
    end
  end
end
