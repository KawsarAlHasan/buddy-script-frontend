"use client";

import { useGetComments } from "@/api-services/postServices";
import CommentInput from "./CommentInput";
import CommentItem from "./CommentItem";
import { FaRegUserCircle } from "react-icons/fa";

export default function CommentSection({
  postId,
  mutate,
}: {
  postId: string;
  mutate: () => void;
}) {
  const { getComments, isLoading, isError, mutate: commentMutate } =
    useGetComments(postId);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <CommentInput postId={postId} mutate={mutate} commentMutate={commentMutate} />
        <div className="flex flex-col gap-3">
          <div className="flex items-start gap-2.5">
            <FaRegUserCircle className="h-8 w-8" />
            <div className="flex-1 rounded-2xl bg-muted px-4 py-2">
              <p className="text-sm text-secondary">Loading comments...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const comments = getComments?.data || [];

  return (
    <div className="flex flex-col gap-4">
      <CommentInput postId={postId} mutate={mutate} commentMutate={commentMutate} />

      <div className="flex flex-col gap-3">
        {comments.length > 0 ? (
          comments.map((comment: any) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              mutateComments={commentMutate}
            />
          ))
        ) : (
          <p className="text-sm text-secondary">No comments yet</p>
        )}
      </div>
    </div>
  );
}