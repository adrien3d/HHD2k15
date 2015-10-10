Rails.application.routes.draw do
  devise_for :users

  namespace :api, :defaults => {format: 'json'} do
    namespace :v1 do
      post '/auth' => 'user#get_token'
      post '/user/search' => 'user#search'
      get '/profile' => 'user#profile'
      resources :user, except: [:delete, :new, :edit, :show, :index]
      resources :user_position, except: [:delete, :new, :edit, :update, :destroy]
      resources :friends
      resources :invites, except: [:delete, :new, :edit, :update] do
        get 'accept' => 'invites#accept'
        get 'deny' => 'invites#deny'
      end
      get 'requests' => 'invites#requests'
    end
  end
end
