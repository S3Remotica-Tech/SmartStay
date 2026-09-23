/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CloseCircle, Refresh2, Location } from "iconsax-react";
import NoDataMessage from "../../../Utils/NoDataMessage";
import Cookies from "universal-cookie";
import { StoreSelectedHostelAction } from "../../../Redux/Action/LoginAction";

const SwichProperty = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const cookies = new Cookies();
  const [switchingHostelId, setSwitchingHostelId] = useState(null);

  useEffect(() => {
    dispatch({ type: "HOSTELLIST" });
  }, []);

  useEffect(() => {
    if (state.UsersList?.hosteListStatusCode === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_HOSTELLIST_STATUS_CODE" });
      }, 100);
    }
  }, [state.UsersList?.hosteListStatusCode]);

  const handleSwitchHostel = (hostelId) => {
    setSwitchingHostelId(hostelId);
    dispatch(StoreSelectedHostelAction(hostelId));
    cookies.set("selected_hostelId", hostelId, { path: "/" });

    dispatch({
      type: "PARTICULAR_HOSTEL_DETAILS",
      payload: { hostel_id: hostelId },
    });
  };

  useEffect(() => {
    if (state.UsersList?.statuscodeForhotelDetailsinPg === 200) {
      onClose();
      setSwitchingHostelId(null);

      setTimeout(() => {
        dispatch({ type: "CLEAR_HOSTEL_LIST_All_CODE" });
      }, 100);
    }
  }, [state.UsersList?.statuscodeForhotelDetailsinPg]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute font-gilroy top-2 right-2 bottom-2 w-full max-w-xl bg-white rounded-xl shadow-xl flex flex-col">
        <div className="flex items-start justify-between px-3.5 pt-2.5">
          <div>
            <h2 className="text-[20px] font-semibold leading-[18px] text-[#292D32]">
              Switch Property
            </h2>

            <p className="mt-0.5 text-[14px] font-medium text-[#A0A0A0]">
              Switch property as per your need
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center text-[#FF3838] transition hover:opacity-70"
          >
            <CloseCircle size="17" variant="Linear" color="#FF3838" />
          </button>
        </div>

        <div className="my-3 px-2 flex-1 overflow-y-auto show-scrolls">
          <div className="space-y-2 pr-1">
            {state?.UsersList?.hostelList?.length > 0 ? (
              state?.UsersList?.hostelList?.map((hostel) => (
                <div
                  key={hostel.hostelId}
                  className="w-full border border-[#E5E7EB] rounded-lg bg-white px-2.5 py-3 flex font-gilroy items-center justify-between gap-3"
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
                    onClick={() => handleSwitchHostel(hostel?.hostelId)}
                    disabled={switchingHostelId === hostel?.hostelId}
                    className="flex-shrink-0 h-7 px-3 rounded-md bg-[#1E45E1] text-white text-[12px] font-medium flex items-center justify-center gap-1.5 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <Refresh2
                      size="14"
                      color="#FFFFFF"
                      variant="Bold"
                      className={
                        switchingHostelId === hostel?.hostelId
                          ? "animate-spin"
                          : ""
                      }
                    />

                    {switchingHostelId === hostel?.hostelId
                      ? "Switching..."
                      : "Switch"}
                  </button>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center py-10">
                <NoDataMessage label="Paying guest" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwichProperty;
