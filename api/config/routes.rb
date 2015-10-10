Rails.application.routes.draw do
  devise_for :users

  namespace :api, :defaults => {format: 'json'} do
    namespace :v1 do
      post '/auth' => 'user#get_token'
      post '/user/search' => 'user#search'
      resources :user, except: [:delete, :new, :edit]
      resources :user_position, except: [:index, :delete, :new, :edit]
      resources :invites, except: [:delete, :new, :edit, :update]
      get '/invites/requests' => 'invites#requests'
    end
  end
end
