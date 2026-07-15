"use client";

import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2";
import { formatDistanceToNow } from "date-fns";
import {
  likeComment,
  unlikeComment,
  useGetReplies,
} from "@/api-services/postServices";
import ReplyInput from "./ReplyInput";
import ReplyItem from "./ReplyItem";

export default function CommentItem({
  comment,
  mutateComments,
}: {
  comment: any;
  mutateComments: () => void;
}) {
  const [showReplies, setShowReplies] = useState(false);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [liked, setLiked] = useState(comment.isLikedByMe);
  const [likeCount, setLikeCount] = useState(comment.likeCount);
  const [loading, setLoading] = useState(false);

  const {
    getReplies,
    isLoading: repliesLoading,
    mutate: replyMutate,
  } = useGetReplies(showReplies ? comment.id : null);

  const handleToggleLike = async () => {
    if (loading) return;

    const previousLiked = liked;
    const previousCount = likeCount;

    setLiked(!previousLiked);
    setLikeCount(previousLiked ? previousCount - 1 : previousCount + 1);
    setLoading(true);

    try {
      if (previousLiked) {
        await unlikeComment(comment.id);
      } else {
        await likeComment(comment.id);
      }
      mutateComments();
    } catch (error) {
      setLiked(previousLiked);
      setLikeCount(previousCount);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReplyCreated = () => {
    setShowReplyInput(false);
    if (showReplies) {
      replyMutate();
    }
    mutateComments();
  };

  const replies = getReplies?.data?.replies || [];

  return (
    <div className="flex items-start gap-2.5">
      <FaRegUserCircle className="h-8 w-8 mt-1" />
      <div className="flex-1">
        <div className="rounded-2xl bg-muted px-4 py-2">
          <p className="text-sm font-medium">
            {comment.author.firstName} {comment.author.lastName}
          </p>
          <p className="text-sm text-secondary">{comment.content}</p>
        </div>

        <div className="mt-1.5 flex items-center gap-4 px-4">
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

          <button
            onClick={() => {
              setShowReplyInput(!showReplyInput);
              if (!showReplyInput) setShowReplies(true);
            }}
            className="cursor-pointer flex items-center gap-1 text-xs text-secondary hover:text-primary transition-colors"
          >
            <HiOutlineChatBubbleOvalLeft className="h-3 w-3" />
            <span>Reply</span>
          </button>

          {comment.replyCount > 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="cursor-pointer text-xs text-secondary hover:text-primary transition-colors"
            >
              {showReplies ? "Hide" : "View"} {comment.replyCount} replies
            </button>
          )}

          <span className="text-xs text-secondary">
            {formatDistanceToNow(new Date(comment.createdAt), {
              addSuffix: true,
            })}
          </span>
        </div>

        {showReplyInput && (
          <div className="mt-2 px-4">
            <ReplyInput
              commentId={comment.id}
              onReplyCreated={handleReplyCreated}
              onCancel={() => setShowReplyInput(false)}
            />
          </div>
        )}

        {showReplies && (
          <div className="mt-3 space-y-3">
            {repliesLoading ? (
              <div className="flex items-start gap-2.5 px-4">
                <FaRegUserCircle className="h-6 w-6" />
                <div className="flex-1 rounded-2xl bg-muted px-4 py-2">
                  <p className="text-sm text-secondary">Loading replies...</p>
                </div>
              </div>
            ) : replies.length > 0 ? (
              replies.map((reply: any) => (
                <ReplyItem
                  key={reply.id}
                  reply={reply}
                  mutateReplies={replyMutate}
                  mutateComments={mutateComments}
                />
              ))
            ) : (
              <p className="text-sm text-secondary px-4">No replies yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
