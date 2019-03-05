class Api::UsersController < ApplicationController
  def index
    if params[:user_ids]
      @users = User.find(params[:user_ids])
    else
      @users = User.all()
    end
    if @users
      render "api/users/index"
    else
      render json: ['users not found'], status: 404
    end
  end
  
  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render "api/users/show"
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def show
    @user = User.find_by(id: params[:id])
    if @user
      render "api/users/show"
    else
      render json: ['user not found'], status: 404
    end
  end

  def update
    @user = current_user
    if @user.update(user_params)
      render "api/users/show"
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password, :email, :photo)
  end
end
