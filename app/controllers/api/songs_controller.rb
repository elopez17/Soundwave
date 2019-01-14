class Api::SongsController < ApplicationController
  def show
    @song = Song.find_by(id: params[:id])
    if @song
      render "api/songs/show"
    else
      render json: ['Song not found'], status: 404
    end
  end
end
