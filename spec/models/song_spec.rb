require 'rails_helper'

RSpec.describe Song, type: :model do
  
  it "should be invalid without name" do
    expect(Song.new(genre: 'blues', user_id: 5)).to_not be_valid
  end

  it "should be invalid without genre" do
    expect(Song.new(name: 'tomorrow', user_id: 5)).to_not be_valid
  end

  it "should be invalid without user_id" do
    expect(Song.new(name: 'tomorrow', genre: 'blues')).to_not be_valid
  end

  let(:user) { User.create(username: 'test user', email: 'test@test.com', password: 'starwars') }
  it "should be valid with all needed params" do
    expect(Song.new(name: 'tomorrow', genre: 'blues', user_id: user.id)).to be_valid
  end

end
