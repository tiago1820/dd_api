import express from 'express';
import locationsController from '../controllers/locations.controller';
const router = express.Router();
import paginationLogMiddleware from '../middlewares/paginationLog.middleware';
import filterLogMiddleware from '../middlewares/filterLog.middleware';

router.get('/', paginationLogMiddleware, filterLogMiddleware, locationsController.index);
router.post('/', locationsController.store);

router.route('/:id')
    .get(filterLogMiddleware,locationsController.show)
    .put(locationsController.update)
    .delete(locationsController.destroy)

export default router;