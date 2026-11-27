import React from "react";
import PropTypes from "prop-types";
import { DsBadge, DsDot } from "../../../../../DesignSystem";
import { STATUS_META } from "../lib/myProfileUtils";

/** Person status pill: Active · Invite pending · Invite expired · Invite revoked · Deactivated. */
function StatusBadge({ status }) {
  const meta = STATUS_META[status] || STATUS_META.active;
  return (
    <DsBadge tone={meta.tone} dot={DsDot}>
      {meta.label}
    </DsBadge>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusBadge;
