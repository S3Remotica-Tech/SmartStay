/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Add,
  AddCircle,
  CloseCircle,
  Trash,
  Edit,
  Setting3,
  MessageQuestion,
  Edit2,
} from "iconsax-react";
import ErrorMessage from "../../Components/ErrorMessage";
import Green from "../../Assets/Images/New_images/Frame.png";
import White from "../../Assets/Images/New_images/empty_bed.png";
import recerverimg from "../../Assets/Images/New_images/recervedimg.png";
import noticeimg from "../../Assets/Images/New_images/noticeperiodimg.png";
import overDude from "../../Assets/Images/New_images/overDue.png";
import Tick from "../../Assets/v2Images/Tick.svg";
import NoDataMessage from "../../Utils/NoDataMessage";

function PgLayoutView({ show, handleClose, selectedBedDetails, isWay }) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [selectedBed, setSelectedBed] = useState("");
  const [hoveredBedId, setHoveredBedId] = useState("");

  if (!show) return null;
  console.log("selectedBed", selectedBed);
  const [floorClick, setFloorClick] = useState("");

  useEffect(() => {
    if (state?.UsersList?.floorList?.length > 0) {
      setFloorClick(state?.UsersList?.floorList[0]?.id);
    } else {
      setFloorClick(null);
    }
  }, [state?.UsersList?.floorList]);
  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({
        type: "ALLFLOORLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
    }
  }, [state.login.selectedHostel_Id]);

  console.log("state.UsersList.floorList", state?.UsersList?.floorList);
  const handleFloorClick = (floorNumber) => {
    setFloorClick(floorNumber);
    dispatch({ type: "GETALLROOMSLIST", payload: { floor_Id: floorNumber } });
  };

  const roomList = Array.isArray(state?.PgList?.roomsList)
    ? state.PgList.roomsList
    : [];

  const availableBeds = state.UsersList?.availableBedList?.listBeds || [];

  useEffect(() => {
    if (roomList.length > 0) {
      roomList.forEach((room) => {
        dispatch({
          type: "GETALLBEDSLIST",
          payload: { roomId: room.id },
        });
      });
    }
  }, [roomList]);

  useEffect(() => {
    if (floorClick) {
      dispatch({ type: "GETALLROOMSLIST", payload: { floor_Id: floorClick } });
    }
  }, [floorClick]);

  const handleSelectBed = (bed) => {
    setSelectedBed(bed);
  };

  const SharingTypeFilter = roomList?.filter((view) => {
    return view.id === selectedBed?.roomId;
  });

  const handleConfirmSelected = () => {
    selectedBedDetails(selectedBed);
    handleClose();
  };

  console.log(
    "state?.UsersList?.floorList?.length === 0",
    state?.UsersList?.floorList?.length === 0,
  );

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        show
          ? "bg-black/40 visible opacity-100"
          : "bg-black/0 invisible opacity-0"
      }`}
    >
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-[900px] bg-white shadow-xl
    transition-transform duration-300 ease-in-out
    ${show ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="w-full h-full rounded-[20px]">
          <div className="flex justify-between items-start gap-3 px-3 py-4 sticky top-0 z-10 bg-white w-full border-[#eee] rounded-[20px]">
            <div className="flex gap-3 overflow-x-auto no-scrollbar show-scrolls py-2">
              {state?.UsersList?.floorList?.map((floor) => (
                <div
                  key={floor.id}
                  onClick={() => handleFloorClick(floor.id, floor.name)}
                  className={`flex-shrink-0 flex flex-col justify-center items-center rounded-xl h-24 w-24 cursor-pointer
        ${
          Number(floorClick) === Number(floor.id)
            ? "bg-blue-50 border-2 border-[#1E45E1]"
            : "bg-white border-2 border-gray-300"
        }`}
                >
                  <div
                    className={`text-2xl font-gilroy font-semibold ${
                      Number(floorClick) === Number(floor.id)
                        ? "text-blue-700"
                        : "text-gray-700"
                    }`}
                  >
                    {floor.name
                      ? isNaN(floor.name)
                        ? floor.name.charAt(0)
                        : floor.name
                      : floor.id}
                  </div>

                  <div
                    className={`text-sm font-gilroy font-semibold text-center px-2 break-words ${
                      Number(floorClick) === Number(floor.id)
                        ? "text-blue-700"
                        : "text-gray-700"
                    }`}
                  >
                    {typeof floor.name === "string" &&
                    floor.name.trim() !== "" &&
                    floor.name !== "null"
                      ? floor.name
                      : floor.id}
                  </div>
                </div>
              ))}
            </div>
            <button
              className="px-2 py-2 bg-gray-200 rounded flex gap-1 "
              onClick={handleClose}
            >
              <Add
                size="24"
                color="#FF0000"
                className="cursor-pointer rotate-45"
              />
              Close
            </button>
          </div>
          <div className="mx-4">
            {state?.UsersList?.floorList?.length === 0 && (
              <NoDataMessage label="Floor" />
            )}
          </div>

          {roomList.length > 0 ? (
            roomList?.map((room) => {
              // const bedsForRoom = state.PgList?.bedList?.[room.id] || [];

              // const filteredBeds = !isWay
              //   ? bedsForRoom.filter((bed) => !bed.isOccupied)
              //   : bedsForRoom;

              const filteredBeds = availableBeds.filter(
                (bed) => Number(bed.roomId) === Number(room.id),
              );
              {
                console.log("filteredBeds", filteredBeds);
              }

              return (
                <div className="grid gap-3 mt-1 mb-2 grid-cols-1 md:grid-cols-2 2xl:grid-cols-4  max-h-[350px] overflow-y-auto px-3 show-scrolls">
                  <div
                    key={room.id}
                    className="border border-[#E6E6E6] rounded-xl min-h-[120px] bg-white  overflow-y-auto "
                  >
                    <div className="bg-[#E0ECFF] border-b border-[#E6E6E6] rounded-t-xl p-2">
                      <div className="text-[14px] font-semibold text-[#222222] truncate">
                        Room no. {room.name}
                      </div>
                      <div className="text-xs text-[#7C7C7C]">
                        {room?.sharingType}{" "}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-start mx-0 max-h-60 py-1.5 overflow-y-auto overflow-x-hidden gap-x-3 gap-y-4">
                      {Array.isArray(filteredBeds) &&
                      filteredBeds.length > 0 ? (
                        filteredBeds.map((bed) => (
                          <div
                            key={`${bed.roomId}-${bed.bedId}`}
                            className={`w-full flex justify-center px-1 `}
                          >
                            <div
                              className={`flex flex-col items-center justify-start w-20 `}
                            >
                              <div className="relative w-9 h-10">
                                {Number(selectedBed?.bedId) ===
                                  Number(bed.bedId) &&
                                  Number(selectedBed?.roomId) ===
                                    Number(bed.roomId) && (
                                    <div className="absolute inset-y-px -right-2.5 cursor-pointer z-40">
                                      <img
                                        src={Tick}
                                        alt="alt-image"
                                        className="h-5 w-5 cursor-pointer"
                                      />
                                    </div>
                                  )}

                                {(bed.isBooked ||
                                  bed.onNotice ||
                                  bed.overDue) &&
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
                                        onMouseEnter={() =>
                                          setHoveredBedId(bed.bedId)
                                        }
                                        onMouseLeave={() =>
                                          setHoveredBedId(null)
                                        }
                                      >
                                        {hoveredBedId !== bed.bedId && count}

                                        {hoveredBedId === bed.bedId && (
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
                                  onClick={() => handleSelectBed(bed)}
                                  className={`mt-1 h-10 w-9 cursor-pointer `}
                                  src={bed.isOccupied ? Green : White}
                                  alt="bedd"
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
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="mx-4">
              <NoDataMessage label="Room" />
            </div>
          )}

          {selectedBed?.bedId && (
            <div className=" flex flex-wrap items-center justify-center border-t bg-white p-2 rounded-b-[20px]">
              <div>
                <div>
                  <span className="text-base font-medium font-gilroy text-blue-700">
                    {` ${selectedBed?.floorName || "N/A"} | ${selectedBed?.roomName || "N/A"} | ${selectedBed.bedName || "-"}`}
                  </span>
                </div>
                <div>
                  <label className="m-0 text-sm font-semibold font-gilroy text-neutral-600">
                    {SharingTypeFilter[0]?.sharingType} |{" "}
                    {selectedBed?.rentAmount} / Monthly
                  </label>
                </div>
              </div>
              <div className="ml-[200px]">
                <button
                  onClick={handleConfirmSelected}
                  className="rounded-xl bg-blue-700 px-5 py-2.5 text-base font-semibold font-gilroy text-white"
                >
                  Select
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PgLayoutView;
