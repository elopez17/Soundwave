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

demo = User.create(username: 'demo', email: 'demo@demo.com', password: 'password123');

song1 = Song.create(user_id: demo.id, genre: 'jazz', name: 'tomorrow')
