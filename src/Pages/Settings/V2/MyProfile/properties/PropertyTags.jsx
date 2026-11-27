import React from "react";
import PropTypes from "prop-types";

const TAG =
  "inline-flex h-[24px] shrink-0 items-center whitespace-nowrap rounded-[var(--ds-radius-full)] border-[1px] border-solid border-[color:var(--ds-border-strong)] bg-[var(--ds-bg-surface)] pl-[8px] pr-[6px] text-[12px] font-medium leading-[16px] text-[color:var(--ds-text-default)]";

/**
 * Property chips (Figma Tag 15:108): up to `max` names, then "+N" (or
 * "+N more" with `moreLabel`). Shows "All N properties" when the person has
 * every property in the workspace.
 */
function PropertyTags({ names, totalProperties, max = 2, moreLabel = false }) {
  if (names.length === 0) {
    return <span className="text-[13px] text-[color:var(--ds-text-placeholder)]">—</span>;
  }
  if (totalProperties > 2 && names.length === totalProperties) {
    return <span className={TAG}>All {totalProperties} properties</span>;
  }
  const shown = names.slice(0, max);
  const rest = names.length - shown.length;
  return (
    <div className="flex min-w-0 flex-wrap items-center gap-[6px]" title={names.join(", ")}>
      {shown.map((name) => (
        <span key={name} className={TAG}>
          {name}
        </span>
      ))}
      {rest > 0 && (
        <span
          className={`text-[12px] font-medium leading-[17px] ${
            moreLabel ? "text-[color:var(--ds-text-link)]" : "text-[color:var(--ds-text-default)]"
          }`}
        >
          +{rest}
          {moreLabel ? " more" : ""}
        </span>
      )}
    </div>
  );
}

PropertyTags.propTypes = {
  names: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalProperties: PropTypes.number,
  max: PropTypes.number,
  moreLabel: PropTypes.bool,
};

export default PropertyTags;
