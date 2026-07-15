import { useState, useEffect } from "react";
import { getComments, CommentResponse } from "@/api-services/commentServices";
import { message } from "antd";

export const useComments = (postId: string) => {
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const data = await getComments(postId);
      setComments(data || []);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch comments");
      message.error(err.message || "Failed to fetch comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const mutate = () => {
    fetchComments();
  };

  return { comments, loading, error, mutate };
};
