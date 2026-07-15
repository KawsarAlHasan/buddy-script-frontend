import Sidebar from "@/components/layout/Sidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import Feed from "@/components/feed/Feed";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Home() {
  return (
    <div className="flex h-screen gap-4 py-4 overflow-hidden">
      <div className="h-full overflow-y-auto scrollbar-hide">
        <Sidebar />
      </div>
      <div className="flex-1 min-w-0 h-full overflow-y-auto scrollbar-hide">
        <Feed />
      </div>
      <div className="h-full overflow-y-auto scrollbar-hide">
        <RightSidebar />
      </div>

      <div className="hidden lg:block fixed top-1/2 right-2 z-20">
        <ThemeToggle ismobile={false} />
      </div>
    </div>
  );
}
