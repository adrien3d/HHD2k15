class AddLieuToUsers < ActiveRecord::Migration
  def change
    add_column :users, :lieu, :string
  end
end
