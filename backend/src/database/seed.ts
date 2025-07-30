import { db } from './connection';
import { generateId, getCurrentTimestamp } from './utils';

// Sample seed data for development
const SAMPLE_TRACKS = [
  {
    id: generateId(),
    filename: 'sample-track-1.mp3',
    original_name: 'Sample Track 1.mp3',
    title: 'Sample Track 1',
    artist: 'Sample Artist',
    album: 'Sample Album',
    duration: 180000, // 3 minutes in milliseconds
    file_size: 5242880, // 5MB
    mime_type: 'audio/mpeg',
  },
  {
    id: generateId(),
    filename: 'sample-track-2.mp3',
    original_name: 'Sample Track 2.mp3',
    title: 'Sample Track 2',
    artist: 'Another Artist',
    album: 'Another Album',
    duration: 240000, // 4 minutes in milliseconds
    file_size: 6291456, // 6MB
    mime_type: 'audio/mpeg',
  },
];

const SAMPLE_PLAYLISTS = [
  {
    id: generateId(),
    name: 'My Favorites',
  },
  {
    id: generateId(),
    name: 'Chill Mix',
  },
];

/**
 * Seed the database with sample data for development
 */
export const seedDatabase = (): void => {
  try {
    console.log('Seeding database with sample data...');
    
    const timestamp = getCurrentTimestamp();
    
    // Insert sample tracks
    const insertTrack = db.prepare(`
      INSERT OR IGNORE INTO tracks (
        id, filename, original_name, title, artist, album, 
        duration, file_size, mime_type, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    
    for (const track of SAMPLE_TRACKS) {
      insertTrack.run(
        track.id,
        track.filename,
        track.original_name,
        track.title,
        track.artist,
        track.album,
        track.duration,
        track.file_size,
        track.mime_type,
        timestamp,
        timestamp
      );
    }
    
    // Insert sample playlists
    const insertPlaylist = db.prepare(`
      INSERT OR IGNORE INTO playlists (id, name, created_at, updated_at)
      VALUES (?, ?, ?, ?)
    `);
    
    for (const playlist of SAMPLE_PLAYLISTS) {
      insertPlaylist.run(playlist.id, playlist.name, timestamp, timestamp);
    }
    
    // Add first track to first playlist
    const insertPlaylistTrack = db.prepare(`
      INSERT OR IGNORE INTO playlist_tracks (playlist_id, track_id, position, added_at)
      VALUES (?, ?, ?, ?)
    `);
    
    if (SAMPLE_PLAYLISTS[0] && SAMPLE_TRACKS[0]) {
      insertPlaylistTrack.run(
        SAMPLE_PLAYLISTS[0].id,
        SAMPLE_TRACKS[0].id,
        1,
        timestamp
      );
    }
    
    console.log('✅ Database seeded successfully');
  } catch (error) {
    console.error('❌ Failed to seed database:', error);
    throw error;
  }
};

/**
 * Clear all data from the database (for testing)
 */
export const clearDatabase = (): void => {
  try {
    console.log('Clearing database...');
    
    db.exec(`
      DELETE FROM playlist_tracks;
      DELETE FROM playlists;
      DELETE FROM tracks;
    `);
    
    console.log('✅ Database cleared successfully');
  } catch (error) {
    console.error('❌ Failed to clear database:', error);
    throw error;
  }
};