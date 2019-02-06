json.extract! song, :genre, :name, :id, :user_id
if song.photo.attached?
  json.photoURL url_for(song.photo)
end
if song.audio.attached?
  json.audio url_for(song.audio)
end