"use client";

import { useState } from "react";
import Image from "next/image";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import PostActions from "./PostActions";
import CommentInput from "./CommentInput";
import { Post } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { FaRegUserCircle } from "react-icons/fa";
import CommentSection from "./CommentSection";

export default function PostCard({
  post,
  mutate,
}: {
  post: Post;
  mutate: () => void;
}) {
  const [showComments, setShowComments] = useState(false);
  const fullName = `${post.author.firstName} ${post.author.lastName}`;

  return (
    <article className="mb-4 rounded-2xl border border-border-subtle bg-surface p-4">
      <header className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <FaRegUserCircle className="h-10 w-10" />
          <div>
            <p className="text-sm font-semibold">{fullName}</p>
            <p className="flex items-center gap-1 text-xs text-secondary">
              {formatDistanceToNow(new Date(post.createdAt), {
                addSuffix: true,
              })}
              &middot; {post.visibility}
            </p>
          </div>
        </div>
        <button
          aria-label="Post options"
          className="text-secondary hover:text-primary"
        >
          <HiEllipsisHorizontal className="h-5 w-5" />
        </button>
      </header>

      {post.text && <p className="mt-3 text-sm">{post.text}</p>}

      {post.imageUrl && (
        <div className="mt-3 overflow-hidden rounded-xl">
          <Image
            src={post.imageUrl}
            alt={post.text || "Post image"}
            width={1000}
            height={560}
            className="h-auto w-full object-cover"
            unoptimized
          />
        </div>
      )}

      <div className="mt-3 flex items-center justify-between text-xs text-secondary">
        <span>{post.likeCount} Likes</span>
        <button
          onClick={() => setShowComments((prev) => !prev)}
          className="flex cursor-pointer items-center gap-3 hover:text-primary"
        >
          <span>{post.commentCount} Comments</span>
        </button>
      </div>

      <div className="mt-3">
        <PostActions
          postId={post.id}
          isLikedByMe={post.isLikedByMe}
          mutate={mutate}
        />
      </div>

      {showComments ? (
        <div className="mt-3">
          <CommentSection postId={post.id} mutate={mutate} />
        </div>
      ) : (
        <div className="mt-3">
          <CommentInput
            postId={post.id}
            mutate={mutate}
            commentMutate={() => {}}
          />
        </div>
      )}
    </article>
  );
}