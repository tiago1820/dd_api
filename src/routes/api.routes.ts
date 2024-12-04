import express from 'express';
import apiController from '../controllers/api.controller';
const router = express.Router();

router.get('/', apiController.index);


export default router;