# Magic Player

A modern web-based music player with file management and playlist support.

## Features

- 🎵 Audio file upload and management
- 🎶 Music playback with progress control
- 📝 Playlist creation and management
- 🔍 Search and filter functionality
- 📱 Responsive web interface
- 🎚️ Volume and playback controls

## Tech Stack

### Frontend
- React 19 with TypeScript
- Vite for build tooling
- Modern CSS/Tailwind CSS
- React Router for navigation
- Zustand for state management
- React Query for API calls

### Backend
- Express.js with TypeScript
- SQLite database
- File upload handling
- Audio metadata extraction
- RESTful API design

### Shared
- Common TypeScript types
- Shared utilities and interfaces

## Project Structure

```
magic-player/
├── frontend/          # React frontend application
├── backend/           # Express.js API server
├── shared/            # Shared TypeScript types and utilities
└── package.json       # Root package.json with workspace scripts
```

## Development Setup

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

1. Clone the repository and install all dependencies:
```bash
npm run install:all
```

2. Set up environment variables:
```bash
cd backend
cp .env.example .env
# Edit .env file with your configuration
```

### Development

1. Start both frontend and backend in development mode:
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

2. Or start them individually:
```bash
# Frontend only
npm run dev:frontend

# Backend only
npm run dev:backend
```

### Build

Build all projects for production:
```bash
npm run build
```

### Other Commands

```bash
# Run linting
npm run lint

# Run type checking
npm run type-check

# Clean all build artifacts and node_modules
npm run clean
```

## API Endpoints

- `GET /health` - Health check
- `GET /api` - API information
- `GET /api/tracks` - Get all tracks
- `GET /api/playlists` - Get all playlists
- `POST /api/upload` - Upload audio files

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

MIT
