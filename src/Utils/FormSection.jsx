import React from "react";
import PropTypes from "prop-types";

// Form section card: white, radius-medium (12px), ink-200 border, S1 title,
// faint border, title with the #0038AC bar. Use one per logical field group.
function FormSection({ title, description, children, className = "" }) {
  return (
    <section
      className={`flex flex-col gap-[16px] rounded-medium border-[1px] border-solid border-ink-200 bg-white p-[20px] font-gilroy ${className}`}
    >
      <div className="flex flex-col gap-[4px]">
        <div className="flex items-center gap-[10px]">
          <span className="h-[24px] w-[3px] rounded-[12px] bg-[#0038AC]" />
          <h3 className="m-0 font-gilroy text-s1 font-semibold text-ink">
            {title}
          </h3>
        </div>
        {description && (
          <p className="m-0 pl-[13px] font-gilroy text-c1 text-ink-muted">
            {description}
          </p>
        )}
      </div>
      {children}
    </section>
  );
}

FormSection.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default FormSection;
