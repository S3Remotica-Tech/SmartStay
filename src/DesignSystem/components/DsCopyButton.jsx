import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import DsIcon from "./DsIcon";
import { DsIcons } from "../icons";

// 14px copy-to-clipboard control (Figma "Copy", 153:2553). Shows a short
// "Copied" confirmation next to the icon.
function DsCopyButton({ value, label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(String(value));
      setCopied(true);
    } catch {
      setCopied(false);
      toast.error("Could not copy. Select the text and copy it manually.");
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : label}
      title={copied ? "Copied" : label}
      className="inline-flex items-center gap-[4px] rounded-[4px] opacity-80 hover:opacity-100"
    >
      <DsIcon src={DsIcons.copy} />
      {copied && (
        <span className="text-[11px] font-medium leading-[14px] text-[color:var(--ds-text-success)]">Copied</span>
      )}
    </button>
  );
}

DsCopyButton.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  label: PropTypes.string,
};

export default DsCopyButton;
