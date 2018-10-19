class User < ApplicationRecord
  validates :username, :password_digest, :session_token, presence: true
  validates :password, length: { minimum: 6 }, allow_nil: true

  has_one_attached :photo

  after_initialize :ensure_session_token
  attr_reader :password

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)
    user && user.is_password?(password) ? user : nil
  end

  def ensure_session_token
    self.session_token ||= unique_session_token
  end

  def reset_session_token!
    self.session_token = unique_session_token
    self.save!
    self.session_token
  end

  def new_session_token
    SecureRandom.urlsafe_base64
  end

  def unique_session_token
    token = new_session_token
    while User.find_by(session_token: token)
      token = new_session_token
    end
    token
  end

end
