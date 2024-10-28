import express from 'express';
import charactersController from '../controllers/characters.controller';
const router = express.Router();

router.get('/', charactersController.index);
router.post('/', charactersController.store);

router.route('/:id')
    .get(charactersController.show)
    .put(charactersController.update)
    .delete(charactersController.destroy)

export default router;