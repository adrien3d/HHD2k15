class UserPosition < ActiveRecord::Base
  belongs_to :user

  validates_presence_of :longitude, :latitude
end
