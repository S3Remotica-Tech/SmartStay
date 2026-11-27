import React from "react";
import PropTypes from "prop-types";
import { TickCircle } from "iconsax-react";

// Shown only after the backend confirmed the booking / check-in.
function TenantAddedSuccess({ name, flow, onClose }) {
  const isBooking = flow === "booking";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 font-gilroy">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="tenant-added-title"
        className="w-full max-w-[420px] rounded-[20px] bg-white p-8 text-center shadow-lg"
      >
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#E7F6EC]">
          <TickCircle size="40" variant="Bold" color="#16A34A" />
        </div>
        <h4
          id="tenant-added-title"
          className="mb-2 font-gilroy text-[20px] font-semibold text-[#222222]"
        >
          {isBooking ? "Booking created successfully" : "Tenant added successfully"}
        </h4>
        <p className="mb-5 font-gilroy text-[15px] text-[#505F76]">
          <span className="font-semibold text-[#222222]">{name || "The tenant"}</span>{" "}
          {isBooking
            ? "has been booked and now appears in the bookings list."
            : "has been checked in and now appears in the tenants list."}
        </p>
        <button data-testid="tenant-added-success-done-btn"
          type="button"
          autoFocus
          onClick={onClose}
          className="h-[40px] w-full rounded-[8px] bg-[#1E45E1] font-gilroy text-[16px] font-semibold text-white outline-none hover:bg-[#1638B5] focus-visible:shadow-[0_0_0_2px_#FFFFFF,0_0_0_4px_#0485F7]"
        >
          Done
        </button>
      </div>
    </div>
  );
}

TenantAddedSuccess.propTypes = {
  name: PropTypes.string,
  flow: PropTypes.oneOf(["checkin", "booking"]).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default TenantAddedSuccess;
