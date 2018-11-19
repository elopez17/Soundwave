class Comment < ApplicationRecord
  validates :body, :user_id, :song_id, :song_timestamp, presence: true

  belongs_to :user,
  primary_key: :id,
  foreign_key: :user_id,
  class_name: :User

  belongs_to :song,
  primary_key: :id,
  foreign_key: :song_id,
  class_name: :Song
end
