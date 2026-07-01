/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { CloseCircle, ArrowRight2, Add, Send2 } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { TiTick } from "react-icons/ti";

function TenantActions({ show, handleClose }) {
  if (!show) return null;

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [formLoading, setFormLoading] = useState(false);

  const CustomerOverView = state?.UsersList?.customerdetails;

  const handleSendReminder = () => {
    dispatch({ type: "REMOVE_KEY_REMAINDER_ERROR" });
    if (CustomerOverView?.customerId) {
      dispatch({
        type: "KYC_REMINDER_SAGA",
        payload: CustomerOverView?.customerId,
      });

      setFormLoading(true);
    }
  };

  useEffect(() => {
    if (state.UsersList.kycRemindeSuccess === 200) {
      setFormLoading(false);
      //   dispatch({
      //     type: "CUSTOMERDETAILS",
      //     payload: { customerId: CustomerOverView?.customerId },
      //   });
      //   //   handleClose();
      //   //   dispatch({ type: "REMOVE_KYC_REMINDER_REDUCER" });
    }
  }, [state.UsersList.kycRemindeSuccess]);

  useEffect(() => {
    if (state.UsersList.kycReminderError) {
      setFormLoading(false);
    }
  }, [state.UsersList.kycReminderError]);

  return (
    <>
      <div className="fixed inset-0  z-50 bg-black/40" onClick={handleClose} />

      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2">
        <div
          className="w-full max-w-[420px] rounded-lg border border-[#E5E7EB] bg-white p-4 shadow-xl font-gilroy"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <h2 className="text-[22px] font-semibold text-[#222222]">
              Pending Actions
            </h2>

            <button onClick={handleClose}>
              <Add size={22} color="#FF0000" className="rotate-45" />
            </button>
          </div>

          <div className="mt-3">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-[14px] text-[#555555]">Profile completed</p>

              <div className="rounded-full bg-[#FFF3DB] px-3 py-1 text-[13px] font-semibold text-[#F59E0B]">
                70%
              </div>
            </div>

            <div className="h-[5px] w-full overflow-hidden rounded-full bg-[#E5E7EB]">
              <div className="h-full w-[70%] rounded-full bg-[#FF9800]" />
            </div>
          </div>
          {CustomerOverView?.kycInfo?.keyStatus !== "VERIFIED" && (
            <div className="mt-3 rounded-xl border border-[#ECECEC] p-4">
              <div className="flex items-center gap-2">
                <h3 className="text-[16px] font-semibold text-[#222222]">
                  KYC Verification
                </h3>

                <span className="text-[12px] font-medium text-[#00A32E]">
                  Add 20%
                </span>
              </div>

              <p className="mt-1 text-[13px] leading-5 text-[#4B4B4B]">
                Verify the tenant's KYC through the Smartstay Tenant App.
              </p>

              <div className="mt-5 flex justify-end">
                {CustomerOverView?.kycInfo?.keyStatus === "PENDING" && (
                  <button
                    type="button"
                    disabled={formLoading}
                    onClick={handleSendReminder}
                    className={`bg-[#1E45E1] text-white px-6 py-2 rounded-[8px] text-sm font-medium flex items-center justify-center gap-2 ${
                      formLoading
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-[#2342C0]"
                    }`}
                  >
                    {formLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Reminder</span>
                        <Send2 size={15} color="#fff" />
                      </>
                    )}
                  </button>
                )}

                {CustomerOverView?.kycInfo?.keyStatus === "REQUESTED" && (
                  <div className="flex items-center gap-2">
                    <TiTick className="text-[#34C759] text-sm" />
                    <div className="text-[#64748B] text-sm">Reminder Sent</div>
                  </div>
                )}

                {CustomerOverView?.kycInfo?.keyStatus === "EXPIRED" && (
                  <button
                    type="button"
                    disabled={formLoading}
                    onClick={handleSendReminder}
                    className={`bg-[#0D1B8E] text-white px-6 py-2 rounded-[8px] text-sm font-medium flex items-center justify-center gap-2 ${
                      formLoading
                        ? "opacity-70 cursor-not-allowed"
                        : "hover:bg-[#2342C0]"
                    }`}
                  >
                    {formLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Reminder Again</span>
                        <Send2 size={15} color="#fff" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TenantActions;
