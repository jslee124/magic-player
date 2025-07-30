import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/logger';
import { apiRoutes } from './routes/api';
import { initializeDatabase, checkDatabaseHealth } from './database/schema';
import { seedDatabase } from './database/seed';

const app = express();
const PORT = process.env.PORT || 3001;

// Request logging middleware
app.use(requestLogger);

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (_req, res) => {
  const dbHealth = checkDatabaseHealth();
  res.json({ 
    status: dbHealth ? 'OK' : 'ERROR',
    timestamp: new Date().toISOString(),
    database: dbHealth ? 'Connected' : 'Disconnected'
  });
});

// API routes
app.use('/api', apiRoutes);

// Error handling middleware (should be last)
app.use(errorHandler);

// Initialize database
try {
  initializeDatabase();
  
  // Seed database in development mode
  if (process.env.NODE_ENV === 'development') {
    seedDatabase();
  }
} catch (error) {
  console.error('Failed to initialize database:', error);
  process.exit(1);
}

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`🗄️  Database: ${checkDatabaseHealth() ? 'Connected' : 'Error'}`);
});
