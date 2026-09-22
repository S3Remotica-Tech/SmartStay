/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHasPermission } from "../../../Utils/Permission";
import { Location, Refresh2 } from "iconsax-react";
import NoDataMessage from "../../../Utils/NoDataMessage";

function OtherHostel() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [loading, setLoading] = useState(true);
  const {
    // canWriteModule: canWritePayingGuests,
    canReadModule: canReadPayingGuests,
    // canUpdateModule: canUpdatePayingGuests,
    // canDeleteModule: canDeletePayingGuests,
  } = useHasPermission("Paying Guests");

  useEffect(() => {
    dispatch({ type: "HOSTELLIST" });
    setLoading(true);
  }, []);

  useEffect(() => {
    if (state.UsersList?.hosteListStatusCode === 200) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_HOSTELLIST_STATUS_CODE" });
      }, 100);
    }
  }, [state.UsersList?.hosteListStatusCode]);

  return (
    <div>
      {!canReadPayingGuests ? (
        <PermissionDeniedMessage />
      ) : (
        <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <div className="w-6 h-6 border-2 border-[#E5E7EB] border-t-[#1E45E1] rounded-full animate-spin" />
            </div>
          ) : state.UsersList.hostelList?.length > 0 ? (
            state.UsersList.hostelList.map((hostel) => (
              <div
                key={hostel.hostelId}
                className="w-full border border-[#E5E7EB] rounded-lg bg-white px-2.5 py-2.5 flex font-gilroy items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden bg-[#F2F4F7] flex-shrink-0 flex items-center justify-center">
                    {hostel.mainImage ? (
                      <img
                        src={hostel.mainImage}
                        alt={hostel.name}
                        className="w-full h-full object-cover"
                      />
                    ) : hostel.images?.[0]?.image ? (
                      <img
                        src={hostel.images[0].image}
                        alt={hostel.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[14px] font-semibold text-[#1E45E1] font-gilroy">
                        {hostel.initials}
                      </span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-[16px] font-semibold text-[#222222] mb-1 truncate">
                      {hostel.name}
                    </p>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Location size="13" color="#FF9900" variant="Bold" />

                        <span className="text-[13px] text-[#555555]">
                          {hostel.city}
                        </span>
                      </div>

                      <span className="px-2 py-0.5 rounded-full bg-[#FFF0D2] text-[#6F5A32] text-[9px] font-medium">
                        PG
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSwitchHostel(hostel)}
                  className="flex-shrink-0 h-7 px-3 rounded-md bg-[#1E45E1] text-white text-[12px] font-medium flex items-center gap-1.5"
                >
                  <Refresh2 size="14" color="#FFFFFF" variant="Bold" />
                  Switch
                </button>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center py-10">
              <NoDataMessage />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default OtherHostel;
