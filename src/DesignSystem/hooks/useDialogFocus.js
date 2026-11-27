import { useEffect, useRef } from "react";

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Dialog focus handling for DsDialog / DsDrawer: focuses the first
 * control on open, keeps Tab inside the panel, closes on Escape and gives
 * focus back to whatever opened it.
 */
export default function useDialogFocus(onClose) {
  const panelRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const opener = document.activeElement;
    const panel = panelRef.current;
    const first = panel?.querySelector("[data-autofocus]") || panel?.querySelector(FOCUSABLE);
    (first || panel)?.focus();

    const onKey = (event) => {
      if (event.key === "Escape") {
        // An open react-select menu handles Escape itself (closes the menu only).
        if (event.defaultPrevented || event.target?.getAttribute?.("aria-expanded") === "true") return;
        event.stopPropagation();
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab" || !panel) return;
      const items = [...panel.querySelectorAll(FOCUSABLE)];
      if (items.length === 0) return;
      const firstItem = items[0];
      const lastItem = items[items.length - 1];
      if (event.shiftKey && document.activeElement === firstItem) {
        event.preventDefault();
        lastItem.focus();
      } else if (!event.shiftKey && document.activeElement === lastItem) {
        event.preventDefault();
        firstItem.focus();
      }
    };
    panel?.addEventListener("keydown", onKey);
    return () => {
      panel?.removeEventListener("keydown", onKey);
      if (opener && typeof opener.focus === "function") opener.focus();
    };
  }, []);

  return panelRef;
}
