class AddFaceAndTypeToUsers < ActiveRecord::Migration
  def change
    add_column :users, :type, :integer, default: 0
    add_column :users, :face, :string, default: 'http://www.clker.com/cliparts/5/7/4/8/13099629981030824019profile.svg.med.png'
  end
end
