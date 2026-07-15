import {
  HiOutlinePlayCircle,
  HiOutlineChartBar,
  HiOutlineUserPlus,
  HiOutlineBookmark,
  HiOutlineUserGroup,
  HiOutlinePuzzlePiece,
  HiOutlineCog6Tooth,
  HiOutlineBookmarkSquare,
  HiOutlineHome,
  HiOutlineChatBubbleOvalLeft,
  HiOutlineBell,
} from "react-icons/hi2";

export const exploreLinks = [
  { label: "Learning", icon: HiOutlinePlayCircle, tag: "New" },
  { label: "Insights", icon: HiOutlineChartBar },
  { label: "Find friends", icon: HiOutlineUserPlus },
  { label: "Bookmarks", icon: HiOutlineBookmark },
  { label: "Group", icon: HiOutlineUserGroup },
  { label: "Gaming", icon: HiOutlinePuzzlePiece, tag: "New" },
  { label: "Settings", icon: HiOutlineCog6Tooth },
  { label: "Save post", icon: HiOutlineBookmarkSquare },
];

export const mobileNavLinks = [
  { label: "Home", icon: HiOutlineHome },
  { label: "Friends", icon: HiOutlineUserGroup },
  { label: "Notifications", icon: HiOutlineBell, badge: 6 },
  { label: "Messages", icon: HiOutlineChatBubbleOvalLeft, badge: 2 },
];
