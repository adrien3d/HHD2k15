class Invite < ActiveRecord::Base
  belongs_to :user

  validates_uniqueness_of :user_id, :scope => [:friend_id]


  def user

  end

  def as_json(options = { })
    h = Hash.new
    h[:sender] = User.find(user_id).as_json(except: :authentication_token)
    h[:receiver] = User.find(friend_id).as_json(except: :authentication_token)
    h
  end
end
