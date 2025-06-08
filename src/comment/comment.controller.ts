import { Request, Response } from 'express';
import * as CommentService from './comment.services';

export const createComment = async (req: Request, res: Response) => {
  const comment = await CommentService.createComment(req.body);
  res.json(comment);
};

export const getCommentsByOrder = async (req: Request, res: Response) => {
  const comments = await CommentService.getCommentsByOrder(Number(req.params.orderId));
  res.json(comments);
};

export const updateComment = async (req: Request, res: Response) => {
  const updated = await CommentService.updateComment(Number(req.params.commentId), req.body);
  res.json(updated);
};

export const deleteComment = async (req: Request, res: Response) => {
  await CommentService.deleteComment(Number(req.params.commentId));
  res.sendStatus(204);
};

