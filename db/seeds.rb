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

  user_ids = []
  
  demo = User.create(username: 'demo', email: 'demo@demo.com', password: 'password123')
  user_ids.push(demo.id)
  
  file = File.open(File.join(Rails.root, "/app/assets/images/sf-skyline.jpeg"))
  demo.photo.attach(io: file, filename: 'sf-skyline.jpeg')

  # test1 = User.create(username: 'test', email: 'test@test.com', password: 'starwars')
  # file = open('https://loremflickr.com/300/300/person')
  # test1.photo.attach(io: file, filename: /[^\/]+$/.match(file.base_uri.path).to_s)
  
  11.times do
    name = Faker::Name.unique.name
    user = User.create(username: name, email: Faker::Internet.unique.free_email(name), password: 'password123')
    user_ids.push(user.id)
    file = open('https://loremflickr.com/300/300/person')
    user.photo.attach(io: file, filename: /[^\/]+$/.match(file.base_uri.path).to_s)
  end
  
  song = Song.create(user_id: user_ids[0], genre: 'jazz', name: 'tomorrow')
  file = File.open(File.join(Rails.root, "/app/assets/images/jantrax-sunset.jpg"))
  audio_file = File.open(File.join(Rails.root, "/app/assets/audio/jantrax-sunset.mp3"))
  song.photo.attach(io: file, filename: 'jantrax-sunset.jpg')
  song.audio.attach(io: audio_file, filename: 'jantrax-sunset.mp3')
  comment = Comment.create(user_id: user_ids[0], song_id: song.id, song_timestamp: 0,
    body: "Sunset by jantrax | https://soundcloud.com/jantr4x Music promoted by https://www.free-stock-music.com Creative Commons Attribution 3.0 Unported License https://creativecommons.org/licenses/by/3.0/deed.en_US");
  
  song = Song.create(user_id: user_ids[1], genre: 'hip-hop', name: "L’envol Du Papillon") 
  file = File.open(File.join(Rails.root, "/app/assets/images/friendzoned-l-envol-du-papillon.jpg"))
  audio_file = File.open(File.join(Rails.root, "/app/assets/audio/friendzoned-l-envol-du-papillon.mp3"))
  song.photo.attach(io: file, filename: 'friendzoned-l-envol-du-papillon.jpg')
  song.audio.attach(io: audio_file, filename: 'friendzoned-l-envol-du-papillon.mp3')
  comment = Comment.create(user_id: user_ids[1], song_id: song.id, song_timestamp: 0,
    body: "L’envol Du Papillon by [friendzoned] | https://soundcloud.com/friendzonedbeats Music promoted by https://www.free-stock-music.com Creative Commons Attribution-ShareAlike 3.0 Unported https://creativecommons.org/licenses/by-sa/3.0/deed.en_US");
  
  song = Song.create(user_id: user_ids[2], genre: "blues", name: "Degenerate Blues") 
  file = File.open(File.join(Rails.root, "/app/assets/images/alexander-nakarada-degenerate-blues.jpg"))
  audio_file = File.open(File.join(Rails.root, "/app/assets/audio/alexander-nakarada-degenerate-blues.mp3"))
  song.photo.attach(io: file, filename: "alexander-nakarada-degenerate-blues.jpg")
  song.audio.attach(io: audio_file, filename: "alexander-nakarada-degenerate-blues.mp3")
  comment = Comment.create(user_id: user_ids[2], song_id: song.id, song_timestamp: 0,
    body: "Degenerate Blues by Alexander Nakarada | https://www.serpentsoundstudios.com Music promoted by https://www.free-stock-music.com Attribution 4.0 International (CC BY 4.0) https://creativecommons.org/licenses/by/4.0/");
  
  song = Song.create(user_id: user_ids[3], genre: "piano", name: "Badlands") 
  file = File.open(File.join(Rails.root, "/app/assets/images/serge-narcissoff-badlands.jpg"))
  audio_file = File.open(File.join(Rails.root, "/app/assets/audio/serge-narcissoff-badlands.mp3"))
  song.photo.attach(io: file, filename: "serge-narcissoff-badlands.jpg")
  song.audio.attach(io: audio_file, filename: "serge-narcissoff-badlands.mp3")
  comment = Comment.create(user_id: user_ids[3], song_id: song.id, song_timestamp: 0,
    body: "Badlands by Serge Narcissoff | https://soundcloud.com/sergenarcissoff Music promoted by https://www.free-stock-music.com Creative Commons Attribution-ShareAlike 3.0 Unported https://creativecommons.org/licenses/by-sa/3.0/deed.en_US");
  
  song = Song.create(user_id: user_ids[4], genre: "electronic", name: "Insomnia") 
  file = File.open(File.join(Rails.root, "/app/assets/images/jantrax-insomnia.jpg"))
  audio_file = File.open(File.join(Rails.root, "/app/assets/audio/jantrax-insomnia.mp3"))
  song.photo.attach(io: file, filename: "jantrax-insomnia.jpg")
  song.audio.attach(io: audio_file, filename: "jantrax-insomnia.mp3")
  comment = Comment.create(user_id: user_ids[4], song_id: song.id, song_timestamp: 0,
    body: "Insomnia by jantrax | https://soundcloud.com/jantr4x Music promoted by https://www.free-stock-music.com Creative Commons Attribution-ShareAlike 3.0 Unported https://creativecommons.org/licenses/by-sa/3.0/deed.en_US");
  
  song = Song.create(user_id: user_ids[5], genre: "rap", name: "Beat Thee") 
  file = File.open(File.join(Rails.root, "/app/assets/images/alexander-nakarada-beat-thee.jpg"))
  audio_file = File.open(File.join(Rails.root, "/app/assets/audio/alexander-nakarada-beat-thee.mp3"))
  song.photo.attach(io: file, filename: "alexander-nakarada-beat-thee.jpg")
  song.audio.attach(io: audio_file, filename: "alexander-nakarada-beat-thee.mp3")
  comment = Comment.create(user_id: user_ids[5], song_id: song.id, song_timestamp: 0,
    body: "Beat Thee by Alexander Nakarada | https://www.serpentsoundstudios.com Music promoted by https://www.free-stock-music.com Attribution 4.0 International (CC BY 4.0) https://creativecommons.org/licenses/by/4.0/");
  
  song = Song.create(user_id: user_ids[6], genre: "rock", name: "Hardline") 
  file = File.open(File.join(Rails.root, "/app/assets/images/luke-stott-hardline.jpg"))
  audio_file = File.open(File.join(Rails.root, "/app/assets/audio/luke-stott-hardline.mp3"))
  song.photo.attach(io: file, filename: "luke-stott-hardline.jpg")
  song.audio.attach(io: audio_file, filename: "luke-stott-hardline.mp3")
  comment = Comment.create(user_id: user_ids[6], song_id: song.id, song_timestamp: 0,
    body: "Hardline by Luke Stott & Saul Munro | https://soundcloud.com/lukestott Music promoted by https://www.free-stock-music.com Attribution-NoDerivatives 4.0 International (CC BY-ND 4.0) https://creativecommons.org/licenses/by-nd/4.0/");
  
  song = Song.create(user_id: user_ids[7], genre: "pop", name: "You Know") 
  file = File.open(File.join(Rails.root, "/app/assets/images/tubebackr-you-know.jpg"))
  audio_file = File.open(File.join(Rails.root, "/app/assets/audio/tubebackr-you-know.mp3"))
  song.photo.attach(io: file, filename: "tubebackr-you-know.jpg")
  song.audio.attach(io: audio_file, filename: "tubebackr-you-know.mp3")
  comment = Comment.create(user_id: user_ids[7], song_id: song.id, song_timestamp: 0,
    body: "You Know by tubebackr | https://soundcloud.com/tubebackr Music promoted by https://www.free-stock-music.com Attribution-NoDerivs 3.0 Unported (CC BY-ND 3.0) https://creativecommons.org/licenses/by-nd/3.0/");
  
  song = Song.create(user_id: user_ids[8], genre: "r&b", name: "Miss Emeli") 
  file = File.open(File.join(Rails.root, "/app/assets/images/general-vibe-miss-emeli.jpg"))
  audio_file = File.open(File.join(Rails.root, "/app/assets/audio/general-vibe-miss-emeli.mp3"))
  song.photo.attach(io: file, filename: "general-vibe-miss-emeli.jpg")
  song.audio.attach(io: audio_file, filename: "general-vibe-miss-emeli.mp3")
  comment = Comment.create(user_id: user_ids[8], song_id: song.id, song_timestamp: 0,
    body: "Miss Emeli by General Vibe | https://soundcloud.com/generalvibe Music promoted by https://www.free-stock-music.com Creative Commons Attribution 3.0 Unported License https://creativecommons.org/licenses/by/3.0/deed.en_US");
  
  song = Song.create(user_id: user_ids[9], genre: "lo-fi", name: "not for me") 
  file = File.open(File.join(Rails.root, "/app/assets/images/barradeen-not-for-me.jpg"))
  audio_file = File.open(File.join(Rails.root, "/app/assets/audio/barradeen-not-for-me.mp3"))
  song.photo.attach(io: file, filename: "barradeen-not-for-me.jpg")
  song.audio.attach(io: audio_file, filename: "barradeen-not-for-me.mp3")
  comment = Comment.create(user_id: user_ids[9], song_id: song.id, song_timestamp: 0,
    body: "not for me by Barradeen | https://soundcloud.com/barradeen Music promoted by https://www.free-stock-music.com Creative Commons Attribution-ShareAlike 3.0 Unported https://creativecommons.org/licenses/by-sa/3.0/deed.en_US");
  
  song = Song.create(user_id: user_ids[10], genre: "pop", name: "Lie 2 You") 
  file = File.open(File.join(Rails.root, "/app/assets/images/leonell-cassio-ft-dylan-emmetlie-lie-2-you.jpg"))
  audio_file = File.open(File.join(Rails.root, "/app/assets/audio/leonell-cassio-ft-dylan-emmetlie-lie-2-you.mp3"))
  song.photo.attach(io: file, filename: "leonell-cassio-ft-dylan-emmetlie-lie-2-you.jpg")
  song.audio.attach(io: audio_file, filename: "leonell-cassio-ft-dylan-emmetlie-lie-2-you.mp3")
  comment = Comment.create(user_id: user_ids[10], song_id: song.id, song_timestamp: 0,
    body: "Lie 2 You by Leonell Cassio ft. Dylan Emmet | https://soundcloud.com/leonellcassio Music promoted by https://www.free-stock-music.com Creative Commons Attribution-ShareAlike 3.0 Unported https://creativecommons.org/licenses/by-sa/3.0/deed.en_US");
  
  song = Song.create(user_id: user_ids[11], genre: "electronic", name: "Take It Easy") 
  file = File.open(File.join(Rails.root, "/app/assets/images/jantrax-take-it-easy.jpg"))
  audio_file = File.open(File.join(Rails.root, "/app/assets/audio/jantrax-take-it-easy.mp3"))
  song.photo.attach(io: file, filename: "jantrax-take-it-easy.jpg")
  song.audio.attach(io: audio_file, filename: "jantrax-take-it-easy.mp3")
  comment = Comment.create(user_id: user_ids[11], song_id: song.id, song_timestamp: 0,
    body: "Take It Easy by jantrax | https://soundcloud.com/jantr4x Music promoted by https://www.free-stock-music.com Creative Commons Attribution 3.0 Unported License https://creativecommons.org/licenses/by/3.0/deed.en_US");

end

