// Core music track interface
export interface Track {
  id: string;
  filename: string;
  originalName: string;
  title?: string;
  artist?: string;
  album?: string;
  duration?: number; // in milliseconds
  fileSize: number;
  mimeType: string;
  createdAt: string;
  updatedAt: string;
}

// Playlist interface
export interface Playlist {
  id: string;
  name: string;
  tracks?: Track[];
  createdAt: string;
  updatedAt: string;
}

// Playlist track junction interface
export interface PlaylistTrack {
  id: number;
  playlistId: string;
  trackId: string;
  position: number;
  addedAt: string;
}

// API response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

// Paginated API response
export interface PaginatedApiResponse<T = any> extends ApiResponse<T[]> {
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
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

// Audio metadata interface (extracted from files)
export interface AudioMetadata {
  title?: string;
  artist?: string;
  album?: string;
  year?: number;
  genre?: string;
  duration?: number; // in milliseconds
  bitrate?: number;
  sampleRate?: number;
}

// Player state interfaces
export interface PlayerState {
  currentTrack?: Track;
  isPlaying: boolean;
  isPaused: boolean;
  volume: number; // 0-1
  currentTime: number; // in milliseconds
  duration: number; // in milliseconds
  playMode: 'sequential' | 'shuffle' | 'repeat-one' | 'repeat-all';
  queue: Track[];
  currentIndex: number;
}

// Search and filter interfaces
export interface SearchParams {
  query?: string;
  artist?: string;
  album?: string;
  page?: number;
  limit?: number;
  sortBy?: 'title' | 'artist' | 'album' | 'duration' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

// API request interfaces
export interface CreatePlaylistRequest {
  name: string;
}

export interface UpdatePlaylistRequest {
  name?: string;
}

export interface AddTrackToPlaylistRequest {
  trackId: string;
  position?: number;
}

export interface ReorderPlaylistRequest {
  trackId: string;
  newPosition: number;
}

// Error types
export interface ApiError {
  code: string;
  message: string;
  details?: any;
  statusCode?: number;
}

// File validation
export interface FileValidationResult {
  isValid: boolean;
  error?: string;
  metadata?: AudioMetadata;
}

// Type validation utilities
export const isValidTrack = (obj: any): obj is Track => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.filename === 'string' &&
    typeof obj.originalName === 'string' &&
    typeof obj.fileSize === 'number' &&
    typeof obj.mimeType === 'string' &&
    typeof obj.createdAt === 'string' &&
    typeof obj.updatedAt === 'string'
  );
};

export const isValidPlaylist = (obj: any): obj is Playlist => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.createdAt === 'string' &&
    typeof obj.updatedAt === 'string'
  );
};

export const isValidApiResponse = <T>(obj: any): obj is ApiResponse<T> => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.success === 'boolean'
  );
};

// Supported audio formats
export const SUPPORTED_AUDIO_FORMATS = [
  'audio/mpeg',      // MP3
  'audio/wav',       // WAV
  'audio/flac',      // FLAC
  'audio/ogg',       // OGG
  'audio/mp4',       // M4A
  'audio/x-m4a',     // M4A (alternative)
] as const;

export type SupportedAudioFormat = typeof SUPPORTED_AUDIO_FORMATS[number];

export const isSupportedAudioFormat = (mimeType: string): mimeType is SupportedAudioFormat => {
  return SUPPORTED_AUDIO_FORMATS.includes(mimeType as SupportedAudioFormat);
};

// File size limits
export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB in bytes

// Default pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;