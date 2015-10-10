class AddFacebookIdToUsers < ActiveRecord::Migration
  def change
    add_column :users, :facebook_id, :integer
    add_column :users, :access_token, :string
  end
end
