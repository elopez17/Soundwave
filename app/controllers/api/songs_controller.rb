class Api::SongsController < ApplicationController
  def index
    @songs = Song.all()
    if @songs
      render "api/songs/index"
    else
      render json: ['Songs not found'], status: 404
    end
  end
  
  def show
    # @song = Song.find_by(id: params[:id])
    @song = Song.all.first
    if @song
      render "api/songs/show"
    else
      render json: ['Song not found'], status: 404
    end
  end
end
