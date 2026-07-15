import { fetcherWithToken, fetcherWithTokenPost } from "./api";

export interface CommentResponse {
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
  replyCount: number;
  isLikedByMe: boolean;
}

// Get comments for a post
export const getComments = async (postId: string) => {
  const response = await fetcherWithToken(`/comment/post/${postId}`);
  return response.data;
};

// Create a comment
export const createComment = async (postId: string, content: string) => {
  const response = await fetcherWithTokenPost(`/comment/${postId}`, { content });
  return response.data;
};

// Delete a comment
export const deleteComment = async (commentId: string) => {
  const response = await fetcherWithTokenPost(`/comment/delete/${commentId}`, {});
  return response.data;
};

// Like a comment
export const likeComment = async (commentId: string) => {
  const response = await fetcherWithTokenPost(`/like/comments/${commentId}/like`, {});
  return response.data;
};

// Unlike a comment
export const unlikeComment = async (commentId: string) => {
  const response = await fetcherWithTokenPost(`/like/comments/${commentId}/unlike`, {});
  return response.data;
};