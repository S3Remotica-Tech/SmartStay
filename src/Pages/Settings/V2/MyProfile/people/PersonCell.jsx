import React from "react";
import PropTypes from "prop-types";
import { DsAvatar, DsBadge } from "../../../../../DesignSystem";
import { personSubtitle } from "../lib/myProfileUtils";

/** Avatar + name (+ "You") + "ID · phone" line, as in the Figma table rows. */
function PersonCell({ person }) {
  return (
    <div className="flex min-w-0 items-center gap-[10px]">
      <DsAvatar size={40} src={person.avatar || undefined} initials={person.initials} alt={person.name} />
      <div className="flex min-w-0 flex-col gap-[2px]">
        <div className="flex min-w-0 items-center gap-[6px]">
          <span className="truncate text-[14px] font-medium capitalize leading-[20px] text-[color:var(--ds-text-default)]">
            {person.name}
          </span>
          {person.isSelf && (
            <DsBadge tone="primary" size="xs">
              You
            </DsBadge>
          )}
        </div>
        <span className="truncate text-[12px] leading-[17px] text-[color:var(--ds-text-secondary)]">
          {personSubtitle(person) || "—"}
        </span>
      </div>
    </div>
  );
}

PersonCell.propTypes = {
  person: PropTypes.shape({
    name: PropTypes.string.isRequired,
    initials: PropTypes.string,
    avatar: PropTypes.string,
    isSelf: PropTypes.bool,
  }).isRequired,
};

export default PersonCell;
