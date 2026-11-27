import React from "react";
import PropTypes from "prop-types";

// Surface card: white, 1px default border, radius 12, Shadow/XS.
// Padding and layout come from `className` (use arbitrary values: Bootstrap's
// !important p-3/4/5 and gap-3/4/5 utilities override Tailwind's).
function DsCard({ as: Tag = "section", className = "", children, ...rest }) {
  return (
    <Tag
      className={`rounded-[var(--ds-radius-md)] border-[1px] border-solid border-[color:var(--ds-border-default)] bg-[var(--ds-bg-surface)] shadow-[var(--ds-shadow-xs)] ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}

DsCard.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default DsCard;
