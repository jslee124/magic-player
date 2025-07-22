import { Router } from 'express';

const router = Router();

// Placeholder routes - will be implemented in later tasks
router.get('/', (_req, res) => {
  res.json({
    success: true,
    message: 'Magic Player API v1.0.0',
    endpoints: {
      tracks: '/api/tracks',
      playlists: '/api/playlists',
      upload: '/api/upload',
    },
  });
});

// Tracks routes (placeholder)
router.get('/tracks', (_req, res) => {
  res.json({
    success: true,
    data: [],
    message: 'Tracks endpoint - to be implemented',
  });
});

// Playlists routes (placeholder)
router.get('/playlists', (_req, res) => {
  res.json({
    success: true,
    data: [],
    message: 'Playlists endpoint - to be implemented',
  });
});

// Upload routes (placeholder)
router.post('/upload', (_req, res) => {
  res.json({
    success: false,
    message: 'Upload endpoint - to be implemented',
  });
});

export const apiRoutes = router;
