class Api::V1::UserPositionController < Api::V1::ApiController
  def show
    begin
      user = UserPosition.find(params[:id])
      render status: 200, json: user
    rescue ActiveRecord::RecordNotFound
      render status: 404, json: {error: "User doesn't exist"}
    end
  end

  def update

  end

  def create

  end

  def destroy

  end
end
