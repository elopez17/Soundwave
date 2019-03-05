class Api::SongsController < ApplicationController
  include CloudinaryHelper

  def index
    @songs = Song.all()
    if @songs
      render "api/songs/index"
    else
      render json: ['Songs not found'], status: 404
    end
  end

  def create
    @song = Song.new(song_params)
    uploaded = Cloudinary::Uploader.upload(@song.audio.service_url, resource_type: :video)
    img = cl_image_tag(uploaded["public_id"] + ".png", {
        height: 60,
        width: 644,
        flags: "waveform",
        resource_type: "video",
        background: "#ffffff",
        color: "#f50"
      })
    waveform = img[(img.index("src=") + 5)..-1];
    waveform = waveform[0...waveform.index("\" ")]
    @song.waveform = waveform
    if @song.save
      render "api/songs/show"
    else
      render json: @song.errors.full_messages, status: 422
    end
  end
  
  def show
    @song = Song.find_by(id: params[:id])
    if @song
      render "api/songs/show"
    else
      render json: ['Song not found'], status: 404
    end
  end

  def user_index
    @songs = Song.where(user_id: params[:user_id])
    if @songs
      render "api/songs/index"
    else
      render json: ['Songs not found'], status: 404
    end
  end

  def upload_cloudinary
    result = Cloudinary::Uploader.upload(params[:song_url], resource_type: :video)
    if result
      render json: [result], status: 200
    else
      render json: ["error: not uploaded"], status: 400
    end
  end
  
  def waveform
    img = cl_image_tag(params[:song_name] + ".png", {
      height: 60,
      width: 644,
      flags: "waveform",
      resource_type: "video",
      background: "#ffffff",
      color: "#f50"
    })
    render json: [img], status: 200
  end

  private
  def song_params
    params.require(:song).permit(:name, :genre, :photo, :audio, :user_id)
  end

end
