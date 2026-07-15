import { fetcherWithToken, fetcherWithTokenPost } from "./api";

export interface ReplyResponse {
  id: string;
  content: string;
  createdAt: string;
  author: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  likeCount: number;
  isLikedByMe: boolean;
}

// Get replies for a comment
export const getReplies = async (commentId: string) => {
  const response = await fetcherWithToken(`/reply/comment/${commentId}`);
  return response.data;
};

// Create a reply
export const createReply = async (commentId: string, content: string) => {
  const response = await fetcherWithTokenPost(`/reply/${commentId}`, { content });
  return response.data;
};

// Delete a reply
export const deleteReply = async (replyId: string) => {
  const response = await fetcherWithTokenPost(`/reply/delete/${replyId}`, {});
  return response.data;
};

// Like a reply
export const likeReply = async (replyId: string) => {
  const response = await fetcherWithTokenPost(`/like/replies/${replyId}/like`, {});
  return response.data;
};

// Unlike a reply
export const unlikeReply = async (replyId: string) => {
  const response = await fetcherWithTokenPost(`/like/replies/${replyId}/unlike`, {});
  return response.data;
};