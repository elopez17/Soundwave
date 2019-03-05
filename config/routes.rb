Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :comments, only: [:create, :update, :destroy]
    get 'comments/song/:song_id', to: 'comments#song_index', as: :song_comments
    resources :songs, only: [:create, :index, :show, :destroy]
    get 'songs/user/:user_id', to: 'songs#user_index', as: :user_songs
    post 'songs/cloudinary', to: 'songs#upload_cloudinary', as: :upload_cloudinary
    get 'songs/waveform/:song_name', to: 'songs#waveform', as: :song_waveform
    resources :users, only: [:create, :index, :show, :update]
    resource :session, only: [:create, :destroy]
  end
end
