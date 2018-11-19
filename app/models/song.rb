class Song < ApplicationRecord
  validates :name, :genre, :user_id, presence: true

  has_one_attached :photo
  has_one_attached :audio
  
  belongs_to :user,
  primary_key: :id,
  foreign_key: :user_id,
  class_name: :User

  has_many :comments,
  primary_key: :id,
  foreign_key: :song_id,
  class_name: :Comment
end
