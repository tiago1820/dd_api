import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import charactersRoutes from './routes/charactersRoutes';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    console.log('Hola mundo');
    res.send('Hola mundo');
});

app.use('/characters', charactersRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    if (err instanceof Error) {
        res.status(500).json({ message: err.message, error: 'Internal server error' });
    } else {
        res.status(500).json({ message: 'Unknown error occurred', error: 'Internal server error' });
    }
});

export default app;