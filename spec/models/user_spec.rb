require 'rails_helper'

RSpec.describe User, type: :model do

  it "should be invalid without username" do
    expect(User.new(email: 'test@test.com', password: 'starwars')).to_not be_valid
  end
  
  it "should be invalid without email" do
    expect(User.new(username: 'test user', password: 'starwars')).to_not be_valid
  end

  it "should be invalid without password" do
    expect(User.new(username: 'test user', email: 'test@test.com')).to_not be_valid
  end
  
  it "should be valid with all needed parameters" do
    expect(User.new(username: 'test user', email: 'test@test.com', password: 'starwars')).to be_valid
  end

end
