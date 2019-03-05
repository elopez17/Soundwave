class AddWaveformToSongs < ActiveRecord::Migration[5.2]
  def change
    add_column :songs, :waveform, :string, default: nil
  end
end
