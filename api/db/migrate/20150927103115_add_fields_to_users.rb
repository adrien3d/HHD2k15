class AddFieldsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :telephone_number, :string
    add_column :users, :address, :string
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :sex, :string
    add_column :users, :birthdate, :date
    add_column :users, :description, :date
  end
end
