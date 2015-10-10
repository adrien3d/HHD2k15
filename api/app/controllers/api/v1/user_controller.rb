class Api::V1::UserController < Api::V1::ApiController
  skip_before_action :authenticate_user_from_token!, only: [:get_token, :create]

  def get_token
    user = User.find_by_email(params[:email])
    if user
      if user.valid_password?(params[:password])
        render status: 200, json: {token: user.authentication_token}
      else
        render status: 500, json: {error: "Incorrect password"}
      end
    else
      render status: 404, json: {error: "User doesn't exist"}
    end
  end

  def create
    user = User.new(user_params)
    if user.save
      render status: 201, json: user
    else
      render status: 500, json: {errors: user.errors}
    end
  end

  def update
    begin
      user = User.find(params[:id])

      if user.update(user_params)
        render status: 200, json: user
      else
        render status: 500, json: user
      end
    rescue ActiveRecord::RecordNotFound
      render status: 404, json: {error: "User doesn't exist"}
    end
  end

  def search
    begin
      user = User.find_by_email(params[:email])

      if user
        render status: 200, json: {user: user}, except: [:authentication_token]
      else
        render status: 500, json: {error: "User wasn't found"}
      end
    end
  end

  def show
    begin
      user = User.find(params[:id])
      render status: 200, json: user
    rescue ActiveRecord::RecordNotFound
      render status: 404, json: {error: "User doesn't exist"}
    end
  end

  def index
    begin
      user = User.all
      render status: 200, json: user, except: [:authentication_token]
    end
  end

  private
  def user_params
    params.require(:user).permit(:first_name, :description, :last_name, :email, :address, :birthdate, :sex, :telephone_number, :password)
  end
end
