import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 select-none ${className}`}>
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent text-white">
        <HiOutlineChatBubbleLeftRight className="h-5 w-5" />
      </span>
      <span className="text-xl font-bold tracking-tight">
        Buddy<span className="text-accent">Script</span>
      </span>
    </div>
  );
}
