"use client";
import { useGetPosts } from "@/api-services/postServices";
import CreatePost from "./CreatePost";
import PostCard from "./PostCard";
import StoriesRow from "@/components/layout/StoriesRow";
import { Post } from "@/types";

export default function Feed() {
  const { getPosts, isLoading, isError, mutate } = useGetPosts();

  if (isLoading) {
    return (
      <section className="min-w-0 flex-1">
        <StoriesRow />
        <CreatePost mutate={mutate} />
        <p className="text-center text-sm text-secondary">Loading posts...</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="min-w-0 flex-1">
        <StoriesRow />
        <CreatePost mutate={mutate} />
        <p className="text-center text-sm text-red-500">
          Failed to load posts.
        </p>
      </section>
    );
  }

  return (
    <section className="min-w-0 flex-1">
      <StoriesRow />
      <CreatePost mutate={mutate} />

      {getPosts?.data?.map((post: Post) => (
        <PostCard key={post.id} post={post} mutate={mutate} />
      ))}
    </section>
  );
}
