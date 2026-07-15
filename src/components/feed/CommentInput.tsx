"use client";

import { useState } from "react";
import { createComment } from "@/api-services/postServices";

export default function CommentInput({
  postId,
  mutate,
  commentMutate,
}: {
  postId: string;
  mutate: () => void;
  commentMutate: () => void;
}) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      await createComment(postId, content);
      setContent("");
      mutate();
      commentMutate();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write a comment..."
        className="flex-1 rounded-full border border-border-subtle bg-muted px-4 py-2 text-sm outline-none transition-colors placeholder:text-secondary focus:border-primary"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading || !content.trim()}
        className="rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
      >
        {loading ? "Posting..." : "Post"}
      </button>
    </form>
  );
}