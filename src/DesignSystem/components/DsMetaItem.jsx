import React from "react";
import PropTypes from "prop-types";
import DsIcon from "./DsIcon";

// Icon + 13px text pair used in profile/contact rows. `children` renders
// after the text (e.g. a Verified tag).
function DsMetaItem({ icon, text, children }) {
  return (
    <div className="flex min-w-0 items-center gap-[6px]">
      <DsIcon src={icon} />
      <span className="min-w-0 truncate text-[13px] leading-[19px] text-[color:var(--ds-text-default)]">{text}</span>
      {children}
    </div>
  );
}

DsMetaItem.propTypes = {
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.node.isRequired,
  children: PropTypes.node,
};

export default DsMetaItem;
