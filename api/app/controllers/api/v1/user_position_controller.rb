class Api::V1::UserPositionController < Api::V1::ApiController
  def show
    begin
      user = UserPosition.find(params[:id])
      render status: 200, json: user
    rescue ActiveRecord::RecordNotFound
      render status: 404, json: {error: "User doesn't exist"}
    end
  end

  def index
    render status: 200, json: current_user.user_positions
  end

  def create
    position = UserPosition.new(position_params)
    position.user = current_user
    if position.save
      render status: 201, json: position
    else
      render status: 500, json: {errors: position.errors}
    end
  end

  private
  def position_params
    params.require(:position).permit(:longitude, :latitude, :user_id)
  end
end
