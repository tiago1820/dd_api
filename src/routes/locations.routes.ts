import express from 'express';
import locationsController from '../controllers/locations.controller';
const router = express.Router();
import paginationLogMiddleware from '../middlewares/paginationLog.middleware';

router.get('/', paginationLogMiddleware, locationsController.index);
router.post('/', locationsController.store);

router.route('/:id')
    .get(locationsController.show)
    .put(locationsController.update)
    .delete(locationsController.destroy)

export default router;