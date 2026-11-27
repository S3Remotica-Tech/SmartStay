import React from "react";
import PropTypes from "prop-types";
import "../tokens.css";

/**
 * Scope wrapper for Design System v2. Everything inside gets the `--ds-*`
 * tokens and the v2 base resets; screens outside it are untouched.
 */
function DsRoot({ as: Tag = "div", className = "", children, ...rest }) {
  return (
    <Tag className={`ds ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

DsRoot.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node,
};

export default DsRoot;
