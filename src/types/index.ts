export interface User {
  id: string;
  name: string;
  title?: string;
  avatar: string;
  online?: boolean;
  lastSeen?: string;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  likes: number;
  time: string;
}

export interface Author {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
}

export interface Post {
  id: string;
  text: string;
  imageUrl: string;
  visibility: "PUBLIC" | "PRIVATE" | "FRIENDS";
  createdAt: string;
  updatedAt: string;
  author: Author;
  likeCount: number;
  commentCount: number;
  isLikedByMe: boolean;
  isOwn: boolean;
}

export interface Story {
  id: string;
  user: User;
  cover: string;
  isOwn?: boolean;
}

export type ReactionType = "like" | "haha" | "love";



// src/types/index.ts

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  author: User;
  likeCount: number;
  replyCount: number;
  isLikedByMe: boolean;
}

export interface Reply {
  id: string;
  content: string;
  createdAt: string;
  author: User;
  likeCount: number;
  isLikedByMe: boolean;
}
