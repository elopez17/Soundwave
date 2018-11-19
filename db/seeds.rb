# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Song.destroy_all
Comment.destroy_all

ActiveRecord::Base.transaction do

  demo = User.create(username: 'demo', email: 'demo@demo.com', password: 'password123');
  
  file = File.open('../../sf-skyline.jpeg');
  demo.photo.attach(io: file, filename: 'sf-skyline.jpeg');
  
  song1 = Song.create(user_id: demo.id, genre: 'jazz', name: 'tomorrow');
  
  file = File.open('../../sf-skyline.jpeg');
  audio_file = File.open('../../jantrax-sunset.mp3');
  song1.photo.attach(io: file, filename: 'sf-skyline.jpeg');
  song1.audio.attach(io: audio_file, filename: 'jantrax-sunset.mp3');

  comment1 = Comment.create(user_id: demo.id, song_id: song1.id, song_timestamp: 0,
    body: "Sunset by jantrax | https://soundcloud.com/jantr4x Music promoted by https://www.free-stock-music.com Creative Commons Attribution 3.0 Unported License https://creativecommons.org/licenses/by/3.0/deed.en_US");

end

