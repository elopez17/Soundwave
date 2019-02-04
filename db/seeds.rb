# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
require 'faker'
require 'open-uri'

User.destroy_all
Song.destroy_all
Comment.destroy_all

ActiveRecord::Base.transaction do

  demo = User.create(username: 'demo', email: 'demo@demo.com', password: 'password123')

  file = File.open(File.join(Rails.root, "/app/assets/images/sf-skyline.jpeg"))
  demo.photo.attach(io: file, filename: 'sf-skyline.jpeg')

  # test1 = User.create(username: 'test', email: 'test@test.com', password: 'starwars')
  # file = open('https://loremflickr.com/300/300/person')
  # test1.photo.attach(io: file, filename: /[^\/]+$/.match(file.base_uri.path).to_s)

  # 100.times do
  #   name = Faker::Name.unique.name
  #   User.create(username: name, email: Faker::Internet.unique.free_email(name), password: 'password123')
  # end
  
  song1 = Song.create(user_id: demo.id, genre: 'jazz', name: 'tomorrow is')
  
  file1 = File.open(File.join(Rails.root, "/app/assets/images/jantrax-sunset.jpg"))
  audio_file = File.open(File.join(Rails.root, "/app/assets/audio/jantrax-sunset.mp3"))
  song1.photo.attach(io: file1, filename: 'jantrax-sunset.jpg')
  song1.audio.attach(io: audio_file, filename: 'jantrax-sunset.mp3')

  # comment1 = Comment.create(user_id: demo.id, song_id: song1.id, song_timestamp: 0,
  #   body: "Sunset by jantrax | https://soundcloud.com/jantr4x Music promoted by https://www.free-stock-music.com Creative Commons Attribution 3.0 Unported License https://creativecommons.org/licenses/by/3.0/deed.en_US");

end

