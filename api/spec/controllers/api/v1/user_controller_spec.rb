require 'rails_helper'

RSpec.describe Api::V1::UserController, type: :controller do
  before(:each) do
    user = FactoryGirl.create(:user)
    request.headers['X-User-Email'] = user.email
    request.headers['X-User-Token'] = user.authentication_token
    sign_in user
  end

  describe "GET #show" do
    it "should display error if id is invalid" do
      get :show, id: 4
      expect(response.status).to eq(404)
    end

    it "should display an user" do
      get :show, id: 1
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST #create" do
    it "should return an error if params are not valids" do
      params = {
          email: nil,
          password: nil,
          last_name: nil,
          first_name: nil
      }

      post 'create', user: params
      expect(response.status).to eq(500)
    end

    it "should return an user if params are valids" do
      params = {
          email: 'user@guide.com',
          password: 'password',
          last_name: 'Dupont',
          first_name: 'Max'
      }

      post 'create', user: params
      expect(response.status).to eq(201)
    end
  end

  describe "GET #update" do
    it "should update an user" do
      params = {id: 1, user: {email: 'pinf@guide.com'}}
      put :update, params

      expect(User.last.email).to be == 'pinf@guide.com'
      expect(response.status).to eq(200)
    end

    it "shoud be 404 if user wasn't found" do
      params = {id: 2,user: {email: 'pinf@guide.com'}}
      put :update, params

      expect(response.status).to eq(404)
    end

    it "should return an error if params are incorrect" do
      params = {id: 1, user: {password: '123', password_confirmation: '456'}}
      put :update, params

      expect(response.status).to eq(500)
    end
  end

  describe "POST #get_token" do
    it "shoud return a token if params are valid" do
      params = {email: 'dupont@guide.com', password: 'user1234'}
      post :get_token, params

      expect_json({ token: User.last.authentication_token} )
      expect(response.status).to eq(200)
    end

    it "shoud not work if params are invalid" do
      params = {email: 'dupont@guide.com', password: 'wrongpassword'}
      post :get_token, params

      expect(response.status).to eq(500)
    end

    it "shoud be 404 if user wasn't found" do
      params = {email: 'wrongemail@guide.com', password: 'wrongpassword'}
      post :get_token, params

      expect(response.status).to eq(404)
    end
  end
end
