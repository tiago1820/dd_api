import express from 'express';
import reformersController from '../controllers/reformers.controller';
const router = express.Router();
import multer from 'multer';
import { storage } from '../multer-config';

const upload = multer({ storage: storage });


router.get('/', reformersController.index);
router.post('/', upload.single('file'), reformersController.store);
router.post('/dateofbirth', reformersController.setPlaceOfBirth);
router.post('/dateofdeath', reformersController.setPlaceOfDeath);

router.route('/:id')
    .get(reformersController.show)
    .put(reformersController.update)
    .delete(reformersController.destroy)

export default router;