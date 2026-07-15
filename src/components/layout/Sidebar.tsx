import ExploreMenu from "./ExploreMenu";
import SuggestedPeople from "./SuggestedPeople";
import EventsPreview from "./EventsPreview";

export default function Sidebar() {
  return (
    <aside className="hidden w-[280px] shrink-0 space-y-4 lg:block">
      <ExploreMenu />
      <SuggestedPeople />
      <EventsPreview />
    </aside>
  );
}
