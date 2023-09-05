const mongoose = require('mongoose');

const spotifyPlaylistSchema = new mongoose.Schema({
    id: String,
    added_by: String,
    external_urls: String,
    spotify: String,
    href: String,
    type: String,
    uri: String,
    is_local: Boolean,
    primary_color: String,
    track: {
      // define fields for the track subdocument here
    },
    video_thumbnail: {
      url: String,
    },
    url: String,
    playlist: String,
    owner: {
      // define fields for the owner subdocument here
    },
    collaborative: Boolean,
    description: String,
    images: [{
      height: Number,
      url: String,
      width: Number,
    }],
    vote: Boolean,
    display_name: String,
    total: Number,
    name: String,
    public: Boolean,
    snapshot_id: String,
    tracks: {
      href: String,
      total: Number,
    },
    added_at: String,
    popularity: Number,
    release_date: String,
    track_number: Number,
    preview_url: String,
    explicit: Boolean,
    is_playable: Boolean,
    duration_ms: Number,
    disc_number: Number,
  });
  
  module.exports = mongoose.model('SpotifyPlaylist', spotifyPlaylistSchema);
