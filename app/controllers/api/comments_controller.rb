class Api::CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)
    if @comment.save
      render "api/comments/show"
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end
  
  def song_index
    @comments = Comment.where(song_id: params[:song_id])
    if @comments
      render "api/comments/index"
    else
      render json: ['Comments not found'], status: 404
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :user_id, :song_id, :song_timestamp)
  end
end
