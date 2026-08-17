/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Green from "../../Assets/Images/New_images/Frame.png";
import White from "../../Assets/Images/New_images/empty_bed.png";
import { FaSquarePlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Tick from "../../Assets/v2Images/Tick.svg";
import recerverimg from "../../Assets/Images/New_images/recervedimg.png";
import noticeimg from "../../Assets/Images/New_images/noticeperiodimg.png";
import overDude from "../../Assets/Images/New_images/overDue.png";

function BedView({ room, selectedBed, setSelectedBed }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const [hoveredBedId, setHoveredBedId] = useState(null);
  const [changeBedClicked, setChangedBedClicked] = useState("");
  const [customer, setCustomer] = useState([]);
  useEffect(() => {
    if (room.id) {
      dispatch({
        type: "GETALLBEDSLIST",
        payload: { roomId: room.id },
      });
    }
  }, [room]);

  const bedsForRoom = state.PgList?.bedList?.[room.id] || [];

  const [filteredBeds, setFilteredBeds] = useState([]);

  useEffect(() => {
    setFilteredBeds(bedsForRoom.filter((bed) => !bed.isOccupied));
  }, [bedsForRoom, state.login.isTrigger]);

  const handleclickBedForChangeBed = (bed) => {
    if (selectedBed?.bedId === bed.id) {
      setSelectedBed(null);
      setChangedBedClicked(null);
      return;
    }

    setSelectedBed({
      bedId: bed.id,
      roomId: bed.roomId,
    });
    dispatch({ type: "OCCUPIEDCUSTOMER", payload: { bedId: bed.id } });
    setChangedBedClicked(bed);
  };

  useEffect(() => {
    if (state.PgList.OccupiedCustomerGetStatusCode === 200) {
      setCustomer(state.PgList?.OccupiedCustomer);

      setTimeout(() => {
        dispatch({ type: "CLEAR_OCCUPED_CUSTOMER_STATUSCODE" });
      }, 100);
    }
  }, [state.PgList.OccupiedCustomerGetStatusCode]);

  const handleShowConfirmChangeBed = () => {};

  return (
    <div>
      {" "}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-start mx-0 max-h-60 py-1.5 overflow-y-auto overflow-x-hidden gap-x-3 gap-y-4">
        {Array.isArray(filteredBeds) && filteredBeds.length > 0 ? (
          filteredBeds.map((bed) => (
            <div
              key={`${bed.roomId}-${bed.id}`}
              className={`w-full flex justify-center px-1 `}
            >
              <div
                className={`flex flex-col items-center justify-start w-20 cursor-pointer `}
              >
                <div className="relative w-9 h-10">
                  {state.login.isTrigger &&
                    Number(selectedBed?.bedId) === Number(bed.id) &&
                    Number(selectedBed?.roomId) === Number(bed.roomId) && (
                      <div className="absolute inset-y-px -right-2.5 cursor-pointer z-40">
                        <img
                          src={Tick}
                          alt="alt-image"
                          className="h-5 w-5 cursor-pointer"
                        />
                      </div>
                    )}

                  {(bed.isBooked || bed.onNotice || bed.overDue) &&
                    (() => {
                      const activeStatuses = [
                        bed.isBooked,
                        bed.onNotice,
                        bed.overDue,
                      ].filter(Boolean);

                      const count = activeStatuses.length;

                      if (count === 1) {
                        return (
                          <div className="absolute -top-[2px] -right-[10px]">
                            {bed.isBooked && (
                              <img
                                src={recerverimg}
                                className="w-[20px] h-[20px] flex-shrink-0"
                              />
                            )}
                            {bed.onNotice && (
                              <img
                                src={noticeimg}
                                className="w-[20px] h-[20px] flex-shrink-0"
                              />
                            )}
                            {bed.overDue && (
                              <img
                                src={overDude}
                                className="w-[20px] h-[20px] flex-shrink-0"
                              />
                            )}
                          </div>
                        );
                      }

                      return (
                        <div
                          className={`absolute -top-[2px] -right-[10px] w-[22px] h-[22px]  ${hoveredBedId !== bed.id && count ? "border-2  bg-white border-green-600 rounded-full " : " bg-transparent"} text-[12px] font-bold text-green-600 flex items-center justify-center cursor-pointer`}
                          onMouseEnter={() => setHoveredBedId(bed.id)}
                          onMouseLeave={() => setHoveredBedId(null)}
                        >
                          {hoveredBedId !== bed.id && count}

                          {hoveredBedId === bed.id && (
                            <div
                              className="absolute top-0 left-0 -translate-x-1/2 bg-white rounded-full px-[6px] py-[3px]
                             flex items-center gap-[4px] shadow-md w-fit"
                            >
                              {bed.isBooked && (
                                <img
                                  src={recerverimg}
                                  className="w-[18px] h-[18px] flex-shrink-0"
                                />
                              )}
                              {bed.onNotice && (
                                <img
                                  src={noticeimg}
                                  className="w-[18px] h-[18px] flex-shrink-0"
                                />
                              )}
                              {bed.overDue && (
                                <img
                                  src={overDude}
                                  className="w-[18px] h-[18px] flex-shrink-0"
                                />
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })()}

                  <img
                    className={`mt-1 h-10 w-9  cursor-pointer`}
                    src={bed.isOccupied ? Green : White}
                    alt="bedd"
                    onClick={() => {
                      if (!state.login.isTrigger) {
                        handleclickBed(bed, bed.roomId);
                      } else {
                        handleclickBedForChangeBed(bed, bed.roomId);
                      }
                    }}
                  />
                </div>

                <div className="pt-2 text-xs font-semibold font-montserrat">
                  {bed.bedName}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-2">
            <label className="text-xs font-gilroy text-neutral-600 whitespace-nowrap">
              No beds available
            </label>
          </div>
        )}

        {!state.login.isTrigger && (
          <div
            className={`w-full flex px-1 cursor-pointer ${filteredBeds.length === 0 ? "col-span-full justify-center" : "justify-center"}
             `}
            onClick={() => {
              if (canWritePayingGuests) {
                handleAddBed(propsValue, room.id);
              }
            }}
          >
            <div className="flex flex-col items-center justify-center w-20">
              <FaSquarePlus className={`text-blue-600 h-11 w-9`} />

              <div
                className={`pt-2 text-[10px] font-semibold font-montserrat ${!canWritePayingGuests ? "text-gray-400" : "text-blue-600"}`}
              >
                Add bed
              </div>
            </div>
          </div>
        )}

        {state.login.isTrigger &&
          changeBedClicked?.roomId &&
          selectedBed?.bedId && (
            <div className="fixed bottom-0 left-[19%] right-0 z-40 flex flex-wrap items-center justify-center border-t bg-white p-2">
              <div>
                <p className="m-0 text-sm font-semibold font-gilroy text-neutral-600">
                  Bed |{" "}
                  {Array.isArray(state.PgList?.bedList?.[room.id])
                    ? `${state.PgList.bedList[room.id].length} sharing`
                    : "0 sharing"}
                </p>

                <p>
                  <span className="text-base font-medium font-gilroy text-blue-700">
                    {` ${customer?.floorName || "N/A"} | ${customer?.roomName || "N/A"} | ${customer.bedName || "-"}`}
                  </span>
                </p>
              </div>

              <div className="ml-[200px]">
                <button
                  className="rounded-xl bg-blue-700 px-5 py-2.5 text-base font-semibold font-gilroy text-white"
                  onClick={handleShowConfirmChangeBed}
                >
                  Continue →
                </button>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default BedView;
