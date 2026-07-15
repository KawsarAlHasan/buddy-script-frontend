import { HiMagnifyingGlass } from "react-icons/hi2";
import Avatar from "@/components/ui/Avatar";
import { friends, suggestedPeople } from "@/lib/data";

export default function RightSidebar() {
  const spotlight = suggestedPeople[1];

  return (
    <aside className="hidden w-[300px] shrink-0 space-y-5 xl:block">
      {/* You Might Like */}
      <div className="rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[17px] font-bold text-gray-900">You Might Like</h3>
          <button className="text-sm font-medium text-blue-600 hover:underline">
            See All
          </button>
        </div>

        <hr className="mb-4 border-gray-100" />

        <div className="flex items-center gap-3">
          <Avatar src={spotlight.avatar} alt={spotlight.name} size={48} />
          <div>
            <p className="text-[15px] font-bold leading-tight text-gray-900">
              {spotlight.name}
            </p>
            <p className="mt-0.5 text-[13px] text-gray-400">
              Founder &amp; CEO at Trophy
            </p>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button className="flex-1 rounded-xl border border-gray-200 py-2.5 text-sm font-semibold text-gray-500 transition hover:bg-gray-50">
            Ignore
          </button>
          <button className="flex-1 rounded-xl bg-blue-600 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700">
            Follow
          </button>
        </div>
      </div>

      {/* Your Friends */}
      <div className="rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-[17px] font-bold text-gray-900">Your Friends</h3>
          <button className="text-sm font-medium text-blue-600 hover:underline">
            See All
          </button>
        </div>

        <div className="relative mb-4">
          <HiMagnifyingGlass className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="input search text"
            className="w-full rounded-full bg-gray-100 py-2.5 pl-10 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
          />
        </div>

        <ul className="space-y-4">
          {friends.map((friend, i) => (
            <li key={`${friend.id}-${i}`} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar
                  src={friend.avatar}
                  alt={friend.name}
                  size={40}
                  online={friend.online}
                />
                <div>
                  <p className="text-[14px] font-bold leading-tight text-gray-900">
                    {friend.name}
                  </p>
                  <p className="mt-0.5 text-[13px] text-gray-400">
                    {friend.title}
                  </p>
                </div>
              </div>

              <div className="shrink-0">
                {friend?.online ? (
                  <span className="block h-2.5 w-2.5 rounded-full bg-emerald-500" />
                ) : friend.lastSeen ? (
                  <span className="text-[12px] text-gray-400">
                    {friend.lastSeen}
                  </span>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}