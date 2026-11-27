import React from "react";
import PropTypes from "prop-types";

// Figma Avatar (17:62): circle, fallback order Image → Initials.
// Initials scale with the size (88px → 27.5px text, as in the design).
// `action` is an optional overlay control pinned to the bottom-right
// (e.g. the Change photo icon button).
function DsAvatar({ size = 40, src, initials = "", alt = "", action, className = "" }) {
  const dimension = { width: size, height: size };
  return (
    <div className={`relative shrink-0 ${className}`} style={dimension}>
      {src ? (
        <img
          src={src}
          alt={alt}
          className="size-full rounded-full object-cover border-[1px] border-solid border-[color:var(--ds-border-avatar)]"
        />
      ) : (
        <div
          className="flex size-full items-center justify-center overflow-hidden rounded-full border-[1.375px] border-solid border-[color:var(--ds-border-avatar)] bg-[var(--ds-bg-primary-subtle)] font-semibold uppercase text-[color:var(--ds-text-info)]"
          style={{ fontSize: size * 0.3125, lineHeight: `${size * 0.4375}px` }}
          aria-label={alt || undefined}
        >
          {initials}
        </div>
      )}
      {action && <div className="absolute bottom-[-4px] right-[-4px]">{action}</div>}
    </div>
  );
}

DsAvatar.propTypes = {
  size: PropTypes.number,
  src: PropTypes.string,
  initials: PropTypes.string,
  alt: PropTypes.string,
  action: PropTypes.node,
  className: PropTypes.string,
};

export default DsAvatar;
