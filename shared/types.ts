// Core music track interface
export interface Track {
  id: string;
  title: string;
  artist?: string;
  album?: string;
  duration?: number; // in seconds
  genre?: string;
  year?: number;
  filePath: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  createdAt: Date;
  updatedAt: Date;
}

// Playlist interface
export interface Playlist {
  id: string;
  name: string;
  description?: string;
  trackIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

// API response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    statusCode?: number;
    stack?: string;
  };
  message?: string;
}

// File upload interfaces
export interface UploadProgress {
  fileName: string;
  progress: number; // 0-100
  status: 'pending' | 'uploading' | 'processing' | 'completed' | 'error';
  error?: string;
}

export interface UploadResult {
  success: boolean;
  track?: Track;
  error?: string;
}

// Audio metadata interface
export interface AudioMetadata {
  title?: string;
  artist?: string;
  album?: string;
  year?: number;
  genre?: string;
  duration?: number;
}

// Player state interfaces
export interface PlayerState {
  currentTrack?: Track;
  isPlaying: boolean;
  isPaused: boolean;
  volume: number; // 0-1
  currentTime: number; // in seconds
  duration: number; // in seconds
  playMode: 'sequential' | 'shuffle' | 'repeat-one' | 'repeat-all';
  queue: Track[];
  currentIndex: number;
}

// Search and filter interfaces
export interface SearchParams {
  query?: string;
  artist?: string;
  album?: string;
  genre?: string;
  limit?: number;
  offset?: number;
  sortBy?: 'title' | 'artist' | 'album' | 'duration' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

// Database operation results
export interface DatabaseResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  rowsAffected?: number;
}
