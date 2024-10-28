import express from 'express';
import episodesController from '../controllers/episodes.controller';
const router = express.Router();

router.get('/', episodesController.index);
router.post('/', episodesController.store);

router.route('/:id')
    .get(episodesController.show)
    .put(episodesController.update)
    .delete(episodesController.destroy)

export default router;