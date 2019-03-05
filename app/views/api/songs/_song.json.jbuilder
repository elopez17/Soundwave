json.extract! song, :genre, :name, :id, :user_id
if song.photo.attached?
  json.photoURL url_for(song.photo)
end
if song.audio.attached?
  json.audio url_for(song.audio)
  json.serviceURL song.audio.service_url
  json.waveform song.waveform
end
comment_ids = []
comments = song.comments.sort_by { |comment| comment[:song_timestamp] }
comments.each do |comment|
  comment_ids.push(comment.id)
end
json.comments comment_ids