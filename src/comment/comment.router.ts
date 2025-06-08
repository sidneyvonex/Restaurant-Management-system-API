import { Router } from 'express';
import * as CommentController from './comment.controller';

const router = Router();

router.post('/', CommentController.createComment);
router.get('/order/:orderId', CommentController.getCommentsByOrder);
router.put('/:commentId', CommentController.updateComment);
router.delete('/:commentId', CommentController.deleteComment);

export default router;