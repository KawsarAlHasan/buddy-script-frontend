"use client";

import { useState } from "react";
import { createReply } from "@/api-services/postServices";

export default function ReplyInput({
  commentId,
  onReplyCreated,
  onCancel,
}: {
  commentId: string;
  onReplyCreated: () => void;
  onCancel: () => void;
}) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setLoading(true);
    try {
      await createReply(commentId, content);
      setContent("");
      onReplyCreated();
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
        placeholder="Write a reply..."
        className="flex-1 rounded-full border border-border-subtle bg-muted px-4 py-1.5 text-sm outline-none transition-colors placeholder:text-secondary focus:border-primary"
        disabled={loading}
      />
      <button
        type="submit"
        disabled={loading || !content.trim()}
        className="rounded-full bg-accent px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:opacity-50"
      >
        {loading ? "Posting..." : "Reply"}
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="rounded-full px-3 py-1.5 text-sm text-secondary transition-colors hover:text-primary"
      >
        Cancel
      </button>
    </form>
  );
}