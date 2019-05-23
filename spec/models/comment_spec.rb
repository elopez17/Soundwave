require 'rails_helper'

RSpec.describe Comment, type: :model do
  let(:user) { User.create(username: 'test user', email: 'test@test.com', password: 'starwars') }
  let(:song) { Song.create(name: 'tomorrow', genre: 'blues', user_id: user.id) }
  
  it "should be invalid without body" do
    expect(Comment.new(user_id: user.id, song_id: song.id, song_timestamp: 5)).to_not be_valid
  end

  it "should be invalid without user id" do
    expect(Comment.new(body: 'a test', song_id: song.id, song_timestamp: 5)).to_not be_valid
  end

  it "should be invalid without song id" do
    expect(Comment.new(body: 'a test', user_id: user.id, song_timestamp: 5)).to_not be_valid
  end
  
  it "should be invalid without song_timestamp" do
    expect(Comment.new(body: 'a test', user_id: user.id, song_id: song.id)).to_not be_valid
  end

  it "should be valid with all params" do
    expect(Comment.new(body: 'a test', user_id: user.id, song_id: song.id, song_timestamp: 5)).to be_valid
  end

end
