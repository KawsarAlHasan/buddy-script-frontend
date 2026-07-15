import useSWR from "swr";
import { fetcherWithToken, fetcherWithTokenPost } from "./api";

// ============ POSTS ============
export const useGetPosts = () => {
  const { data, error, mutate } = useSWR("/post", fetcherWithToken);
  return {
    getPosts: data,
    isLoading: !data && !error,
    isError: error,
    mutate,
  };
};

// ============ COMMENTS ============
export const useGetComments = (postId: string) => {
  const { data, error, mutate } = useSWR(
    postId ? `/comment/posts/${postId}` : null,
    fetcherWithToken
  );
  return {
    getComments: data,
    isLoading: !data && !error,
    isError: error,
    mutate,
  };
};

export const createComment = async (postId: string, content: string) => {
  const response = await fetcherWithTokenPost(`/comment/posts/${postId}`, { content });
  return response;
};

export const likeComment = async (commentId: string) => {
  const response = await fetcherWithTokenPost(`/like/comments/${commentId}/like`, {});
  return response;
};

export const unlikeComment = async (commentId: string) => {
  const response = await fetcherWithTokenPost(`/like/comments/${commentId}/unlike`, {});
  return response;
};

// ============ REPLIES ============
export const useGetReplies = (commentId: string) => {
  const { data, error, mutate } = useSWR(
    commentId ? `/reply/comment/${commentId}` : null,
    fetcherWithToken
  );
  return {
    getReplies: data,
    isLoading: !data && !error,
    isError: error,
    mutate,
  };
};

export const createReply = async (commentId: string, content: string) => {
  const response = await fetcherWithTokenPost(`/reply/comments/${commentId}/replies`, { content });
  return response;
};

export const likeReply = async (replyId: string) => {
  const response = await fetcherWithTokenPost(`/like/replies/${replyId}/like`, {});
  return response;
};

export const unlikeReply = async (replyId: string) => {
  const response = await fetcherWithTokenPost(`/like/replies/${replyId}/unlike`, {});
  return response;
};