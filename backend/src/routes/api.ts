import { Router } from 'express';
import { ApiResponse } from 'shared';

const router = Router();

// API info endpoint
router.get('/', (_req, res) => {
  const response: ApiResponse<{
    name: string;
    version: string;
    endpoints: Record<string, string>;
  }> = {
    success: true,
    data: {
      name: 'Music Player API',
      version: '1.0.0',
      endpoints: {
        tracks: '/api/tracks',
        playlists: '/api/playlists',
        upload: '/api/tracks/upload',
      },
    },
  };
  res.json(response);
});

// Tracks routes (placeholder - will be implemented in later tasks)
router.get('/tracks', (_req, res) => {
  const response: ApiResponse<[]> = {
    success: true,
    data: [],
  };
  res.json(response);
});

// Playlists routes (placeholder - will be implemented in later tasks)
router.get('/playlists', (_req, res) => {
  const response: ApiResponse<[]> = {
    success: true,
    data: [],
  };
  res.json(response);
});

// Upload routes (placeholder - will be implemented in later tasks)
router.post('/tracks/upload', (_req, res) => {
  const response: ApiResponse<never> = {
    success: false,
    error: {
      code: 'NOT_IMPLEMENTED',
      message: 'Upload endpoint will be implemented in later tasks',
    },
  };
  res.status(501).json(response);
});

export const apiRoutes = router;
