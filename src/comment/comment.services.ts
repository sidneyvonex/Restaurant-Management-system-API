import db from '../drizzle/db';
import { commentTable } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

export const createComment = async (data: typeof commentTable.$inferInsert) => {
  return db.insert(commentTable).values(data).returning();
};

export const getCommentsByOrder = async (orderId: number) => {
  return db.select().from(commentTable).where(eq(commentTable.orderId, orderId));
};

export const updateComment = async (commentId: number, data: Partial<typeof commentTable.$inferInsert>) => {
  return db.update(commentTable).set(data).where(eq(commentTable.commentId, commentId)).returning();
};

export const deleteComment = async (commentId: number) => {
  return db.delete(commentTable).where(eq(commentTable.commentId, commentId));
};