import { useState, useEffect } from "react";
import { getReplies, ReplyResponse } from "@/api-services/replyServices";
import { message } from "antd";

export const useReplies = (commentId: string) => {
  const [replies, setReplies] = useState<ReplyResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReplies = async () => {
    try {
      setLoading(true);
      const data = await getReplies(commentId);
      setReplies(data || []);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch replies");
      message.error(err.message || "Failed to fetch replies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (commentId) {
      fetchReplies();
    }
  }, [commentId]);

  const mutate = () => {
    fetchReplies();
  };

  return { replies, loading, error, mutate };
};