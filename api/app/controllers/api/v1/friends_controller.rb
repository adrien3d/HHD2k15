class Api::V1::FriendsController < Api::V1::ApiController
  def index
    render status: 200, json: current_user.friends, except: [:authenticate_token]
  end
  
end
