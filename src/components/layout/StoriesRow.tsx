import { HiPlus, HiArrowRight } from "react-icons/hi2";
import Image from "next/image";
import { stories } from "@/lib/data";

export default function StoriesRow() {
  return (
    <>
      {/* mobile */}
      <div className="scrollbar-none -mx-4 flex gap-3 overflow-x-auto px-4 pb-1 pt-3 lg:hidden">
        {stories.map((story) =>
          story.isOwn ? (
            <div
              key={story.id}
              className="flex w-16 shrink-0 flex-col items-center gap-1.5"
            >
              <div className="grid h-14 w-14 place-items-center rounded-full bg-muted ring-2 ring-accent">
                <span className="grid h-6 w-6 place-items-center rounded-full bg-accent text-white">
                  <HiPlus className="h-4 w-4" />
                </span>
              </div>
              <span className="text-[11px] font-medium text-accent">
                Your Story
              </span>
            </div>
          ) : (
            <div
              key={story.id}
              className="flex w-16 shrink-0 flex-col items-center gap-1.5"
            >
              <div className="h-14 w-14 rounded-full p-[2px] ring-2 ring-accent">
                <Image
                  src={story.cover}
                  alt={story.user.name}
                  width={56}
                  height={56}
                  className="h-full w-full rounded-full object-cover"
                  unoptimized
                />
              </div>
              <span className="truncate text-[11px] text-secondary">
                {story.user.name}
              </span>
            </div>
          ),
        )}
      </div>

      {/* dextop */}
      <div className="hidden lg:flex scrollbar-none -mx-4 gap-3 overflow-x-auto px-4 pb-1 pt-1 sm:gap-4">
        {/* Your Story card */}
        <div className="relative h-[180px] w-[130px] shrink-0 overflow-hidden rounded-2xl sm:h-[200px] sm:w-[150px]">
          <Image
            src={stories[0]?.cover || "/images/card_ppl1.png"}
            alt="Your Story"
            fill
            unoptimized
            className="object-cover"
          />
          {/* dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

          {/* plus button */}
          <button className="absolute left-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-blue-600 text-white shadow-md">
            <HiPlus className="h-4 w-4" />
          </button>

          {/* label */}
          <span className="absolute bottom-3 left-3 text-sm font-semibold text-white">
            Your Story
          </span>
        </div>

        {/* Other stories */}
        {stories.slice(1).map((story, i) => {
          const isLast = i === stories.slice(1).length - 1;
          return (
            <div
              key={story.id}
              className="relative h-[180px] w-[130px] shrink-0 overflow-hidden rounded-2xl sm:h-[200px] sm:w-[150px]"
            >
              <Image
                src={story.cover}
                alt={story.user.name}
                fill
                unoptimized
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

              {/* user avatar badge */}
              <div className="absolute right-2 top-2 h-8 w-8 overflow-hidden rounded-full ring-2 ring-white">
                <Image
                  src={story.user.avatar}
                  alt={story.user.name}
                  width={32}
                  height={32}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              </div>

              {/* name */}
              <span className="absolute bottom-3 left-3 right-3 truncate text-sm font-semibold text-white">
                {story.user.name}
              </span>

              {/* arrow on last card */}
              {isLast && (
                <button className="absolute bottom-3 right-3 grid h-7 w-7 place-items-center rounded-full bg-blue-600 text-white shadow-md">
                  <HiArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
