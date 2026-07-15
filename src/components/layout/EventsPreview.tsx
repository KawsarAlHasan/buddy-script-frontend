import Image from "next/image";

interface EventItem {
  id: string;
  image: string;
  day: string;
  month: string;
  title: string;
  goingCount: number;
}

const events: EventItem[] = [
  {
    id: "1",
    image: "/images/feed_event1.png",
    day: "10",
    month: "Jul",
    title: "No more terrorism no more cry",
    goingCount: 17,
  },
  {
    id: "2",
    image: "/images/feed_event1.png",
    day: "10",
    month: "Jul",
    title: "No more terrorism no more cry",
    goingCount: 17,
  },
];

export default function EventsPreview() {
  return (
    <div className="w-full max-w-[300px] rounded-2xl bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-[17px] font-bold text-gray-900">Events</h3>
        <button className="text-sm font-medium text-blue-600 hover:underline">
          See all
        </button>
      </div>

      <div className="space-y-5">
        {events.map((event) => (
          <div
            key={event.id}
            className="overflow-hidden rounded-xl border border-gray-100"
          >
            {/* Image */}
            <div className="relative h-[130px] w-full">
              <Image
                src={event.image}
                alt={event.title}
                fill
                unoptimized
                className="object-cover"
              />
            </div>

            {/* Date + Title */}
            <div className="flex items-start gap-3 p-3">
              <div className="flex w-11 shrink-0 flex-col items-center rounded-md bg-emerald-500 py-1 text-white">
                <span className="text-[15px] font-bold leading-none">
                  {event.day}
                </span>
                <span className="mt-1 text-[11px] font-medium leading-none">
                  {event.month}
                </span>
              </div>
              <p className="text-[14px] font-bold leading-snug text-gray-900">
                {event.title}
              </p>
            </div>

            <hr className="border-gray-100" />

            {/* Footer */}
            <div className="flex items-center justify-between px-3 py-3">
              <span className="text-[13px] text-gray-400">
                {event.goingCount} People Going
              </span>
              <button className="rounded-lg border border-blue-500 px-4 py-1.5 text-[13px] font-semibold text-blue-600 transition hover:bg-blue-50">
                Going
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
