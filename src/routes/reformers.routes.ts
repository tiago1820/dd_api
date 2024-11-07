import express from 'express';
import reformersController from '../controllers/reformers.controller';
const router = express.Router();

router.get('/', reformersController.index);
router.post('/', reformersController.store);
router.post('/dateofbirth', reformersController.setPlaceOfBirth);
router.post('/dateofdeath', reformersController.setPlaceOfDeath);

router.route('/:id')
    .get(reformersController.show)
    .put(reformersController.update)
    .delete(reformersController.destroy)

export default router;