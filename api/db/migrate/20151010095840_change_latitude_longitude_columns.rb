class ChangeLatitudeLongitudeColumns < ActiveRecord::Migration
  def change
    change_column :user_positions, :latitude, :decimal, :precision => 15, :scale => 13
    change_column :user_positions, :longitude, :decimal, :precision => 15, :scale => 13
  end
end
