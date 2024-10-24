import express, { Request, Response } from 'express';
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

export default app;