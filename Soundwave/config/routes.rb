Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :comments, only: [:create, :update, :destroy]
    resources :songs, only: [:create, :index, :show, :destroy]
    resources :users, only: [:create, :index, :show, :update]
    resource :session, only: [:create, :destroy]
  end
end
