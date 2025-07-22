# Magic Player Backend

Express.js API server for the Magic Player application.

## Features

- RESTful API for music management
- File upload handling with validation
- Audio metadata extraction
- SQLite database integration
- CORS and security middleware
- TypeScript support

## Development

```bash
# Install dependencies
npm install

# Start development server with auto-reload
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Type checking only
npm run type-check
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 3001)
- `FRONTEND_URL` - Frontend URL for CORS
- `DB_PATH` - SQLite database path
- `UPLOAD_DIR` - Directory for uploaded files
- `MAX_FILE_SIZE` - Maximum file size for uploads
- `AUDIO_FORMATS` - Allowed audio file formats

## API Documentation

### Health Check
- `GET /health` - Returns server status

### API Base
- `GET /api` - Returns API information and available endpoints

### Tracks (To be implemented)
- `GET /api/tracks` - Get all tracks
- `POST /api/tracks` - Create new track
- `GET /api/tracks/:id` - Get track by ID
- `PUT /api/tracks/:id` - Update track
- `DELETE /api/tracks/:id` - Delete track

### Playlists (To be implemented)
- `GET /api/playlists` - Get all playlists
- `POST /api/playlists` - Create new playlist
- `GET /api/playlists/:id` - Get playlist by ID
- `PUT /api/playlists/:id` - Update playlist
- `DELETE /api/playlists/:id` - Delete playlist

### File Upload (To be implemented)
- `POST /api/upload` - Upload audio files
