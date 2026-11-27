import { useEffect, useState } from "react";
import { listMasters, listStaff } from "../lib/myProfileService";
import { isVisibleToViewer } from "../lib/myProfilePermissions";

/**
 * Tab badge counts (Masters / Managed users / Properties) for the viewer's
 * scope. Shares the service's cached list requests with the tabs; bump
 * `version` after a change to recount. A failed list shows no count.
 */
export default function useTeamCounts(viewer, properties, version) {
  const [counts, setCounts] = useState({ masters: undefined, users: undefined });

  useEffect(() => {
    if (!viewer) return undefined;
    let cancelled = false;
    const visible = (person) => isVisibleToViewer(viewer, person);
    Promise.allSettled([
      listMasters({ selfId: viewer.id, properties }),
      listStaff(properties),
    ]).then(([masters, staff]) => {
      if (cancelled) return;
      setCounts({
        masters:
          masters.status === "fulfilled"
            ? masters.value.filter((person) => person.isSelf || visible(person)).length
            : undefined,
        users: staff.status === "fulfilled" ? staff.value.filter(visible).length : undefined,
      });
    });
    return () => {
      cancelled = true;
    };
  }, [viewer, properties, version]);

  return { ...counts, properties: properties.length };
}
