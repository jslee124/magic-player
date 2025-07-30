import { Track, Playlist, PlaylistTrack } from 'shared';

// Database row interfaces (what comes from SQLite)
export interface TrackRow {
  id: string;
  filename: string;
  original_name: string;
  title: string | null;
  artist: string | null;
  album: string | null;
  duration: number | null;
  file_size: number;
  mime_type: string;
  created_at: string;
  updated_at: string;
}

export interface PlaylistRow {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface PlaylistTrackRow {
  id: number;
  playlist_id: string;
  track_id: string;
  position: number;
  added_at: string;
}

// Conversion functions from database rows to shared types
export const trackRowToTrack = (row: TrackRow): Track => {
  const track: Track = {
    id: row.id,
    filename: row.filename,
    originalName: row.original_name,
    fileSize: row.file_size,
    mimeType: row.mime_type,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
  
  if (row.title) track.title = row.title;
  if (row.artist) track.artist = row.artist;
  if (row.album) track.album = row.album;
  if (row.duration) track.duration = row.duration;
  
  return track;
};

export const playlistRowToPlaylist = (row: PlaylistRow): Playlist => ({
  id: row.id,
  name: row.name,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

export const playlistTrackRowToPlaylistTrack = (row: PlaylistTrackRow): PlaylistTrack => ({
  id: row.id,
  playlistId: row.playlist_id,
  trackId: row.track_id,
  position: row.position,
  addedAt: row.added_at,
});

// Conversion functions from shared types to database inserts
export const trackToInsertData = (track: Omit<Track, 'createdAt' | 'updatedAt'>) => ({
  id: track.id,
  filename: track.filename,
  original_name: track.originalName,
  title: track.title || null,
  artist: track.artist || null,
  album: track.album || null,
  duration: track.duration || null,
  file_size: track.fileSize,
  mime_type: track.mimeType,
});

export const playlistToInsertData = (playlist: Omit<Playlist, 'createdAt' | 'updatedAt' | 'tracks'>) => ({
  id: playlist.id,
  name: playlist.name,
});