import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { createConnection } from 'typeorm';
import routes from './routes';
import { logger } from './utils/logger';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
createConnection()
    .then(() => {
        logger.info('Database connected successfully');
    })
    .catch((error) => {
        logger.error('Database connection failed:', error);
        process.exit(1);
    });

// Routes
app.use('/api', routes);

// Start server
app.listen(PORT, () => {
    logger.info(`Server is running on http://localhost:${PORT}`);
});