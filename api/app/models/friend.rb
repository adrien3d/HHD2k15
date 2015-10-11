class Friend < ActiveRecord::Base
  belongs_to :user

  validates_presence_of :user_id, :friend_id

  def as_json(options = { })
    user = User.find(friend_id)
    user.as_json(:except => [:authentication_token]).merge({last_position: user.last_position})
  end
end

