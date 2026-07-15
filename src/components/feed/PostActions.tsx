"use client";

import { fetcherWithTokenPost } from "@/api-services/api";
import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiOutlineChatBubbleOvalLeft, HiOutlineShare } from "react-icons/hi2";

export default function PostActions({
  postId,
  isLikedByMe,
  mutate,
}: {
  postId: string;
  isLikedByMe: boolean;
  mutate: () => void;
}) {
  const [liked, setLiked] = useState<boolean>(isLikedByMe);
  const [loading, setLoading] = useState(false);

  const handleToggleLike = async () => {
    if (loading) return;

    const previousLiked = liked;
    setLiked(!previousLiked);
    setLoading(true);

    try {
      if (previousLiked) {
        await fetcherWithTokenPost(`/like/unlike/${postId}`, {});
        mutate?.();
      } else {
        await fetcherWithTokenPost(`/like/${postId}`, {});
        mutate?.();
      }
    } catch (error) {
      setLiked(previousLiked);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-2 border-t border-border-subtle pt-3">
      <button
        onClick={handleToggleLike}
        disabled={loading}
        className={`flex cursor-pointer items-center justify-center gap-1.5 rounded-lg py-1.5 text-sm font-medium transition-colors disabled:opacity-60 ${
          liked ? "bg-accent-soft text-accent" : "text-secondary hover:bg-muted"
        }`}
      >
        {liked ? <FaHeart className="h-5 w-5" /> : <FaRegHeart className="h-5 w-5" />}
        <span>Like</span>
      </button>

      <button className="flex cursor-pointer items-center justify-center gap-1.5 rounded-lg py-1.5 text-sm font-medium text-secondary transition-colors hover:bg-muted">
        <HiOutlineChatBubbleOvalLeft className="h-4 w-4" />
        <span>Comment</span>
      </button>

      <button className="flex cursor-pointer items-center justify-center gap-1.5 rounded-lg py-1.5 text-sm font-medium text-secondary transition-colors hover:bg-muted">
        <HiOutlineShare className="h-4 w-4" />
        <span>Share</span>
      </button>
    </div>
  );
}