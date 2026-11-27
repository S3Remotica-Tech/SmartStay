import React from "react";
import PropTypes from "prop-types";

/**
 * Renders a Design System icon. Decorative: the icon is aria-hidden, so give
 * the parent control an accessible label.
 * - `src` from `DsIcons` (no size): a wrapper that carries its own size,
 *   colour and stroke.
 * - `src` = any @heroicons/react/24/outline icon + `size` (16 / 20 / 24…):
 *   drawn at that Figma slot size with the kit's 1.1px stroke (Heroicons are
 *   a 24px grid, so the stroke is scaled). Colour follows the text colour.
 */
function DsIcon({ src: Icon, size, className = "" }) {
  if (!size) return <Icon className={className} />;
  return (
    <Icon
      aria-hidden="true"
      width={size}
      height={size}
      strokeWidth={+((1.1 * 24) / size).toFixed(3)}
      className={`block shrink-0 ${className}`}
    />
  );
}

DsIcon.propTypes = {
  src: PropTypes.elementType.isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
};

export default DsIcon;
