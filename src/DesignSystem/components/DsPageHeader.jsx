import React from "react";
import PropTypes from "prop-types";

// Figma Page header (51:695): Title (H2) + description → actions
// (max 1 Primary, 1–2 Secondary), optional tabs underneath.
// stickyTabs: the tabs row sticks to the top of the scrolling page while the
// title scrolls away (render the header as a direct child of the scroller's
// content so `sticky` has room to work).
function DsPageHeader({ title, description, actions, tabs, stickyTabs = false }) {
  const heading = (
    <div className="flex min-h-[56px] w-full flex-wrap items-center gap-[16px]">
      <div className="flex min-w-0 flex-1 flex-col gap-[4px]">
        <h1 className="text-[24px] font-semibold leading-[32px] tracking-[-0.24px] text-[color:var(--ds-text-default)]">
          {title}
        </h1>
        {description && (
          <p className="text-[14px] leading-[20px] text-[color:var(--ds-text-secondary)]">{description}</p>
        )}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-[8px]">{actions}</div>}
    </div>
  );

  if (stickyTabs && tabs) {
    return (
      <>
        <div className="flex w-full shrink-0 flex-col bg-[var(--ds-bg-surface)] px-[16px] pb-[12px] pt-[12px] lg:px-[24px]">
          {heading}
        </div>
        <div className="sticky top-0 z-[20] w-full shrink-0 border-b-[1px] border-solid border-[color:var(--ds-border-default)] bg-[var(--ds-bg-surface)] px-[16px] lg:px-[24px]">
          {tabs}
        </div>
      </>
    );
  }

  return (
    <div className="flex w-full shrink-0 flex-col gap-[12px] border-b-[1px] border-solid border-[color:var(--ds-border-default)] bg-[var(--ds-bg-surface)] px-[16px] pt-[12px] lg:px-[24px]">
      {heading}
      {tabs}
    </div>
  );
}

DsPageHeader.propTypes = {
  title: PropTypes.node.isRequired,
  description: PropTypes.node,
  actions: PropTypes.node,
  tabs: PropTypes.node,
  stickyTabs: PropTypes.bool,
};

export default DsPageHeader;
