import { createConnection } from 'typeorm';
import { User } from '../models/user.entity';
import { Route } from '../models/route.entity';
import { POI } from '../models/poi.entity';

const connectDatabase = async () => {
    try {
        const connection = await createConnection({
            type: 'mysql',
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT || '3306'),
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            entities: [User, Route, POI],
            synchronize: true,
            logging: false,
        });

        console.log('Database connection established successfully');
        return connection;
    } catch (error) {
        console.error('Database connection failed:', error);
        throw error;
    }
};

export default connectDatabase;