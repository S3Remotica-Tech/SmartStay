/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { ArchiveAdd, TickCircle, MinusCirlce } from "iconsax-react";
import { useSelector } from "react-redux";

function RequestedAmenities() {
  const state = useSelector((state) => state);

  const [CustomerOverView, setCustomerOverView] = useState([]);

  useEffect(() => {
    if (state.UsersList?.customerdetails?.requestedAmenities) {
      setCustomerOverView(state.UsersList.customerdetails.requestedAmenities);
    } else {
      setCustomerOverView([]);
    }
  }, [state.UsersList?.customerdetails?.requestedAmenities]);

  const assignedAmenities =
    state.UsersList?.customerdetails?.assignedAmenities || [];

  const handleShowAssignAmenities = () => {};

  return (
    <div>
      <label className="font-semibold text-[16px] leading-[40px] font-[Gilroy]">
        Requested Amenities
      </label>

      {CustomerOverView?.length > 0 ? (
        CustomerOverView.map((item, index) => {
          const isAssigned = assignedAmenities?.some(
            (a) => a.amenityId === item.amenityId,
          );

          return (
            <div className="mb-3" key={item.amenityId || index}>
              <div className="w-full">
                <div className="rounded-[14px] border border-[#EFF2FF] p-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#FF99000D] p-2 rounded-[8px]">
                        <ArchiveAdd size="32" variant="Bold" color="#FF9900" />
                      </div>

                      <div>
                        <div>
                          <span className="flex items-center font-[Gilroy] font-semibold text-[16px] text-[#222]">
                            {item.amenityName}
                          </span>
                        </div>

                        <div>
                          <span className="flex items-center font-[Gilroy] font-medium text-[14px] text-[#4B4B4B]">
                            ₹{item.price}/
                            {item.type === "Monthly" ? "m" : item.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        disabled
                        // disabled={isAssigned}
                        onClick={() => handleShowAssignAmenities(item)}
                        className={`flex items-center gap-2 px-5 py-[6px]  disabled:bg-gray-400  text-[15px] rounded-[10px]  cursor-not-allowed
                        ${
                          isAssigned
                            ? "bg-gray-300 border-gray-300 cursor-not-allowed"
                            : "bg-[#0BA82F] border-[#0BA82F] text-white"
                        }`}
                      >
                        <TickCircle size="20" color="#fff" variant="Bold" />
                        Approve
                      </button>

                      <button
                        disabled
                        className="flex items-center disabled:bg-gray-400 gap-2 px-5 py-[6px] text-[15px] rounded-[10px] bg-[#D93025] border-[#D93025] text-white cursor-not-allowed"
                      >
                        <MinusCirlce size="20" color="#fff" variant="Bold" />
                        Deny
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex items-center justify-center">
          <label className="font-[Gilroy] font-medium text-[14px] text-[#4B4B4B]">
            No Requested Amenities
          </label>
        </div>
      )}
    </div>
  );
}

export default RequestedAmenities;
