class Comment < ApplicationRecord
  validates :body, :user_id, :song_id, :song_timestamp, presence: true
end
