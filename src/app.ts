import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import charactersRoutes from './routes/characters.routes';
import episodesRoutes from './routes/episodes.routes';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/api', (req: Request, res: Response) => {
    const data = {
        "characters": "http://localhost:3000/api/characters",
    }
    res.send(data);
});

app.use('/characters', charactersRoutes);
app.use('/episodes', episodesRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    if (err instanceof Error) {
        res.status(500).json({ message: err.message, error: 'Internal server error' });
    } else {
        res.status(500).json({ message: 'Unknown error occurred', error: 'Internal server error' });
    }
});

export default app;