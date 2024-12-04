import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRoutes from './routes/api.routes';
import reformersRoutes from './routes/reformers.routes';
import locationRoutes from './routes/locations.routes';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use('/api', apiRoutes);
app.use('/api/reformer', reformersRoutes);
app.use('/api/location', locationRoutes);
app.use('/files', express.static('uploads'));

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    if (err instanceof Error) {
        res.status(500).json({ message: err.message, error: 'Internal server error' });
    } else {
        res.status(500).json({ message: 'Unknown error occurred', error: 'Internal server error' });
    }
});

export default app;