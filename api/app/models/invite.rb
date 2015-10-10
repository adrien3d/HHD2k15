class Invite < ActiveRecord::Base
  belongs_to :user

  validates_uniqueness_of :user_id, scope: :friend_id

  def as_json(options = { })
    h = super(:only => [:id])
    h[:sender] = User.find(user_id).as_json(except: :authentication_token)
    h[:receiver] = User.find(friend_id).as_json(except: :authentication_token)
    h
  end
end
