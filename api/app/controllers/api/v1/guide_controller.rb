class Api::V1::GuideController < ApplicationController
  def create
    guide = Guide.new(guide_params)
    if guide.save
      render status: 201, json: guide
    else
      render status: 500, json: {errors: guide.errors}
    end
  end

  def update
    begin
      guide = Guide.find(params[:id])

      if guide.update(guide_params)
        render status: 200, json: guide
      else
        render status: 500, json: guide
      end
    rescue ActiveRecord::RecordNotFound
      render status: 404, json: {error: "Guide doesn't exist"}
    end
  end

  def show
    begin
      guide = Guide.find(params[:id])
      render status: 200, json: guide
    rescue ActiveRecord::RecordNotFound
      render status: 404, json: {error: "Guide doesn't exist"}
    end
  end

  private
  def guide_params
    params.require(:guide).permit(:user_id, :city, :latitude, :longitude)
  end
end
