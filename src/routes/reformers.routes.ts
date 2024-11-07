import express from 'express';
import reformersController from '../controllers/reformers.controller';
const router = express.Router();

router.get('/', reformersController.index);
router.post('/', reformersController.store);

router.route('/:id')
    .get(reformersController.show)
    .put(reformersController.update)
    .delete(reformersController.destroy)

export default router;