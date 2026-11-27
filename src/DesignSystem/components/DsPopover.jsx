import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

// Floating panel anchored under its trigger (e.g. the "Manage account"
// dropdown). Closes on outside click and Escape. `trigger` is a render
// function: ({ open, toggle }) => node. `children` may be a function of
// ({ close }) so panel rows can close it after acting.
function DsPopover({ trigger, children, align = "right", width = 360, label }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div ref={rootRef} className="relative">
      {trigger({ open, toggle: () => setOpen((v) => !v) })}
      {open && (
        <div
          role="dialog"
          aria-label={label}
          className={`absolute top-[calc(100%+8px)] z-50 flex max-w-[calc(100vw-32px)] flex-col gap-[4px] rounded-[var(--ds-radius-sm)] border-[1px] border-solid border-[color:var(--ds-border-default)] bg-[var(--ds-bg-surface)] p-[20px] shadow-[var(--ds-shadow-overlay)] ${
            align === "right" ? "right-0" : "left-0"
          }`}
          style={{ width }}
        >
          {typeof children === "function" ? children({ close }) : children}
        </div>
      )}
    </div>
  );
}

DsPopover.propTypes = {
  trigger: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  align: PropTypes.oneOf(["left", "right"]),
  width: PropTypes.number,
  label: PropTypes.string,
};

export default DsPopover;
