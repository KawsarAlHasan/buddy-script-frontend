import { exploreLinks } from "@/lib/constants";

export default function ExploreMenu() {
  return (
    <div className="rounded-2xl border border-border-subtle bg-surface p-5">
      <h3 className="mb-3 text-base font-semibold">Explore</h3>
      <ul className="space-y-1">
        {exploreLinks.map(({ label, icon: Icon, tag }) => (
          <li key={label}>
            <button className="flex w-full items-center justify-between rounded-lg px-2 py-2 text-sm text-secondary transition-colors hover:bg-muted hover:text-primary">
              <span className="flex items-center gap-3">
                <Icon className="h-5 w-5" />
                {label}
              </span>
              {tag && (
                <span className="rounded-md bg-emerald-100 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                  {tag}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
