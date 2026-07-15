import Avatar from "@/components/ui/Avatar";
import { suggestedPeople } from "@/lib/data";

export default function SuggestedPeople() {
  return (
    <div className="rounded-2xl border border-border-subtle bg-surface p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-base font-semibold">Suggested People</h3>
        <button className="text-xs font-medium text-accent">See All</button>
      </div>
      <ul className="space-y-3">
        {suggestedPeople.map((person) => (
          <li key={person.id} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Avatar src={person.avatar} alt={person.name} size={38} />
              <div>
                <p className="text-sm font-semibold leading-tight">{person.name}</p>
                <p className="text-xs text-secondary">{person.title}</p>
              </div>
            </div>
            <button className="rounded-lg border border-border-subtle px-3 py-1.5 text-xs font-medium text-primary hover:bg-muted">
              Connect
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
