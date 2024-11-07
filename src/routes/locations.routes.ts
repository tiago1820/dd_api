import express from 'express';
import locationsController from '../controllers/locations.controller';
const router = express.Router();

router.get('/', locationsController.index);
router.post('/', locationsController.store);

router.route('/:id')
    .get(locationsController.show)
    .put(locationsController.update)
    .delete(locationsController.destroy)

export default router;