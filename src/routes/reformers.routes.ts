import express from 'express';
import reformersController from '../controllers/reformers.controller';
const router = express.Router();
import multer from 'multer';
import { storage } from '../multer-config';
import paginationLogMiddleware from '../middlewares/paginationLog.middleware';
import filterLogMiddleware from '../middlewares/filterLog.middleware';

const upload = multer({ storage: storage });

router.get('/', paginationLogMiddleware, filterLogMiddleware, reformersController.index);
router.post('/', upload.single('file'), reformersController.store);
router.post('/dateofbirth', reformersController.setPlaceOfBirth);
router.post('/dateofdeath', reformersController.setPlaceOfDeath);

router.route('/:id')
    .get(filterLogMiddleware, reformersController.show)
    .put(upload.single('file'), reformersController.update)
    .delete(reformersController.destroy)

export default router;