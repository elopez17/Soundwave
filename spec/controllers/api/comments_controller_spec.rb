require 'rails_helper'

RSpec.describe Api::CommentsController, type: :controller do
  describe "POST #create" do
    let(:user) { User.create(username: 'test user', email: 'test@test.com', password: 'starwars') }
    let(:song) { Song.create(name: 'tomorrow', genre: 'blues', user_id: user.id) }
    
    it "should respond correctly with 200 status" do
      post :create, format: :json, params: { comment: { body: 'a test', user_id: user.id, song_id: song.id, song_timestamp: 5 } }
      expect(response.status).to eq(200)
    end

    it "should respond in JSON format" do
      post :create, format: :json, params: { comment: { body: 'a test', user_id: user.id, song_id: song.id, song_timestamp: 5 } }
      expect(response.content_type).to eq("application/json")
    end
  end
end
