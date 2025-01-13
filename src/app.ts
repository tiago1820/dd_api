import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import apiRoutes from './routes/api.routes';
import reformersRoutes from './routes/reformers.routes';
import locationRoutes from './routes/locations.routes';
import logMiddleware from './middlewares/log.middleware';
import responseLogMiddleware from './middlewares/responseLog.middleware';
import errorLogMiddleware from './middlewares/errorLog.middleware';

const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

app.use(logMiddleware);
app.use(responseLogMiddleware)

app.use('/api', apiRoutes);
app.use('/api/reformer', reformersRoutes);
app.use('/api/location', locationRoutes);
app.use('/files', express.static('uploads'));

app.use(errorLogMiddleware);

export default app;