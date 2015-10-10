class Invite < ActiveRecord::Base
  belongs_to :user

  def user

  end

  def as_json(options = { })
    h = Hash.new
    h[:sender] = User.find(user_id).as_json(except: :authentication_token)
    h[:receiver] = User.find(friend_id).as_json(except: :authentication_token)
    h
  end
end
