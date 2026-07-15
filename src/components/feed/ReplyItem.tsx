"use client";

import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";
import { likeReply, unlikeReply } from "@/api-services/postServices";

export default function ReplyItem({
  reply,
  mutateReplies,
  mutateComments,
}: {
  reply: any;
  mutateReplies: () => void;
  mutateComments: () => void;
}) {
  const [liked, setLiked] = useState(reply.isLikedByMe);
  const [likeCount, setLikeCount] = useState(reply.likeCount);
  const [loading, setLoading] = useState(false);

  console.log("reply", reply)

  const handleToggleLike = async () => {
    if (loading) return;

    const previousLiked = liked;
    const previousCount = likeCount;

    setLiked(!previousLiked);
    setLikeCount(previousLiked ? previousCount - 1 : previousCount + 1);
    setLoading(true);

    try {
      if (previousLiked) {
        await unlikeReply(reply.id);
      } else {
        await likeReply(reply.id);
      }
      mutateReplies();
      mutateComments();
    } catch (error) {
      setLiked(previousLiked);
      setLikeCount(previousCount);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-start gap-2.5">
      <FaRegUserCircle className="h-7 w-7 mt-1" />
      <div className="flex-1">
        <div className="rounded-2xl bg-muted/70 px-4 py-2">
          <p className="text-sm font-medium">
            {reply.author.firstName} {reply.author.lastName}
          </p>
          <p className="text-sm text-secondary">{reply.content}</p>
        </div>

        <div className="mt-1 flex items-center gap-4 px-4">
          <button
            onClick={handleToggleLike}
            disabled={loading}
            className="flex items-center gap-1 text-xs text-secondary hover:text-primary transition-colors disabled:opacity-60"
          >
            {liked ? (
              <FaHeart className="h-3 w-3 text-accent" />
            ) : (
              <FaRegHeart className="h-3 w-3" />
            )}
            <span>{likeCount > 0 && likeCount}</span>
          </button>

          <span className="text-xs text-secondary">
            {formatDistanceToNow(new Date(reply.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>
      </div>
    </div>
  );
}