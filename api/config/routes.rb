Rails.application.routes.draw do
  devise_for :users

  namespace :api, :defaults => {format: 'json'} do
    namespace :v1 do
      post '/auth' => 'user#get_token'
      resources :user, except: [:index, :delete, :new, :edit]
    end
  end
end
