import React from "react";
import PropTypes from "prop-types";
import { DsButton, DsCard } from "../../../../../DesignSystem";
import Skeleton from "../../../../../Utils/Skeleton";

/**
 * Shown on the Masters / Managed staffs tabs until the property list is
 * ready: both lists are scoped by property, so without it they would show a
 * false "No staff yet". Loading skeleton, or the error with Retry.
 */
function PropertiesLoadState({ status, error, onRetry }) {
  if (status === "error") {
    return (
      <DsCard role="alert" className="flex flex-col items-center gap-[4px] px-[24px] py-[48px] text-center">
        <span className="text-[16px] font-semibold leading-[23px] text-[color:var(--ds-text-default)]">
          Couldn&apos;t load your properties
        </span>
        <span className="text-[13px] leading-[19px] text-[color:var(--ds-text-secondary)]">
          {error || "Something went wrong. Please try again."}
        </span>
        <DsButton className="mt-[8px]" onClick={onRetry}>
          Retry
        </DsButton>
      </DsCard>
    );
  }
  return (
    <DsCard className="flex flex-col gap-[12px] p-[16px]" aria-busy="true">
      <Skeleton className="h-[36px] w-[320px] max-w-full" />
      {[0, 1, 2].map((key) => (
        <Skeleton key={key} className="h-[44px] w-full" />
      ))}
    </DsCard>
  );
}

PropertiesLoadState.propTypes = {
  status: PropTypes.oneOf(["loading", "error"]).isRequired,
  error: PropTypes.string,
  onRetry: PropTypes.func.isRequired,
};

export default PropertiesLoadState;
