import { Post, Story, User } from "@/types";

const avatar = (seed: string) => `https://i.pravatar.cc/150?u=${seed}`;

export const currentUser: User = {
  id: "u0",
  name: "Dylan Field",
  title: "CEO of Figma",
  avatar: avatar("dylan-field"),
  online: true,
};

export const suggestedPeople: User[] = [
  {
    id: "u1",
    name: "Steve Jobs",
    title: "CEO of Apple",
    avatar: avatar("steve-jobs"),
  },
  {
    id: "u2",
    name: "Ryan Roslansky",
    title: "CEO of LinkedIn",
    avatar: avatar("ryan-roslansky"),
  },
  {
    id: "u3",
    name: "Dylan Field",
    title: "CEO of Figma",
    avatar: avatar("dylan-field-2"),
  },
];

export const friends: User[] = [
  {
    id: "u1",
    name: "Steve Jobs",
    title: "CEO of Apple",
    avatar: avatar("steve-jobs"),
    online: false,
    lastSeen: "5 minute ago",
  },
  {
    id: "u2",
    name: "Ryan Roslansky",
    title: "CEO of LinkedIn",
    avatar: avatar("ryan-roslansky"),
    online: true,
    lastSeen: "5 minute ago",
  },
  {
    id: "u3",
    name: "Dylan Field",
    title: "CEO of Figma",
    avatar: avatar("dylan-field-2"),
    online: true,
    lastSeen: "5 minute ago",
  },
  {
    id: "u4",
    name: "Steve Jobs",
    title: "CEO of Apple",
    avatar: avatar("steve-jobs-2"),
    online: false,
    lastSeen: "5 minute ago",
  },
  {
    id: "u5",
    name: "Ryan Roslansky",
    title: "CEO of LinkedIn",
    avatar: avatar("ryan-roslansky-2"),
    online: true,
    lastSeen: "5 minute ago",
  },
  {
    id: "u6",
    name: "Elon Musk",
    title: "CEO of Tesla & SpaceX",
    avatar: avatar("elon-musk"),
    online: true,
    lastSeen: "2 minute ago",
  },
  {
    id: "u7",
    name: "Satya Nadella",
    title: "CEO of Microsoft",
    avatar: avatar("satya-nadella"),
    online: false,
    lastSeen: "15 minute ago",
  },
  {
    id: "u8",
    name: "Tim Cook",
    title: "CEO of Apple",
    avatar: avatar("tim-cook"),
    online: true,
    lastSeen: "1 minute ago",
  },
  {
    id: "u9",
    name: "Sundar Pichai",
    title: "CEO of Google",
    avatar: avatar("sundar-pichai"),
    online: false,
    lastSeen: "30 minute ago",
  },
  {
    id: "u10",
    name: "Mark Zuckerberg",
    title: "CEO of Meta",
    avatar: avatar("mark-zuckerberg"),
    online: true,
    lastSeen: "Just now",
  },
];



export const stories: Story[] = [
  { id: "s0", user: currentUser, cover: "", isOwn: true },
  {
    id: "s1",
    user: { id: "u6", name: "Ryan", avatar: avatar("story-1") },
    cover: avatar("story-cover-1"),
  },
  {
    id: "s2",
    user: { id: "u7", name: "Ryan", avatar: avatar("story-2") },
    cover: avatar("story-cover-2"),
  },
  {
    id: "s3",
    user: { id: "u8", name: "Ryan", avatar: avatar("story-3") },
    cover: avatar("story-cover-3"),
  },
  {
    id: "s4",
    user: { id: "u9", name: "Ryan", avatar: avatar("story-4") },
    cover: avatar("story-cover-4"),
  },
];
