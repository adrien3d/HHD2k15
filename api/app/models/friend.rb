class Friend < ActiveRecord::Base
  belongs_to :user

  validates_presence_of :user_id, :friend_id

  def as_json(options = { })
    h = super(options)
    h[:user] = User.find(friend_id).as_json(:except => [:authentication_token])
    h
  end
end

