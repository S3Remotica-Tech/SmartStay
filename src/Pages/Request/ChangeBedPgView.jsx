/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useHasPermission } from "../../Utils/Permission";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";
import NoDataMessage from "../../Utils/NoDataMessage";
import { ArrowUp2, ArrowDown2, Edit, Trash } from "iconsax-react";
import Floorimage from "../../Assets/Images/floor_icon.png";
import RoomImage from "../../Assets/Images/room_icon.png";
import Group from "../../Assets/Images/Group.png";
import availabeimg from "../../Assets/Images/New_images/available-circle.png";
import { useNavigate } from "react-router-dom";
import NoData from "../../Assets/v2Images/NoData.svg";
import BedDetailsMap from "../PayingGuestFile/BedDetailsMap";
import ParticularHostelDetails from "../../Pages/PayingGuestFile/ParticularHostelDetails";
import RoomView from "./RoomView";

function ChangeBedPgView() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const CustomerOverView = state.UsersList?.customerdetails;
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState("1");
  const [floorList, setFloorList] = useState([]);
  const [floorClick, setFloorClick] = useState("");
  const [floorName, setFloorName] = useState("");
  const [visibleRange, setVisibleRange] = useState([0, 2]);
  const [roomList, setRoomList] = useState([]);
  const [filteredBeds, setFilteredBeds] = useState([]);
  const [selectedBed, setSelectedBed] = useState(null);

  const {
    canWriteModule: canWritePayingGuests,
    canReadModule: canReadPayingGuests,
    canUpdateModule: canUpdatePayingGuests,
    canDeleteModule: canDeletePayingGuests,
  } = useHasPermission("Paying Guests");

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      // dispatch({
      //   type: "PARTICULAR_HOSTEL_DETAILS",
      //   payload: { hostel_id: state.login.selectedHostel_Id },
      // });
      dispatch({
        type: "ALLFLOORLIST",
        payload: { hostel_id: state.login.selectedHostel_Id },
      });
      setLoading(true);
    }
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (state?.PgList?.getAllRoomSuccessStatus === 200) {
      setRoomList(state.PgList?.roomsList);
      setLoading(false);
      dispatch({ type: "REMOVE_GET_ALL_ROOMS_STATUS_CODE" });
    }
  }, [state?.PgList?.getAllRoomSuccessStatus]);

  useEffect(() => {
    if (floorList?.length > 0) {
      setFloorClick(floorList[0]?.id);
    } else {
      setFloorClick(null);
    }
  }, [floorList]);

  useEffect(() => {
    if (state.UsersList.floorListStatusCode === 200) {
      setLoading(false);
      setFloorList(state.UsersList.floorList);
      setTimeout(() => {
        dispatch({ type: "REMOVE_ALL_FLOOR_LIST" });
      }, 500);
    }
  }, [state.UsersList.floorListStatusCode]);

  useEffect(() => {
    setLoading(false);
  }, [state.UsersList.floorList]);

  const handleFloorClick = (floorNumber, floorName) => {
    setFloorClick(floorNumber);
    setKey(floorNumber.toString());
    setFloorName(floorName);
  };

  const numberOfFloors = floorList && floorList?.length;

  const handlePrev = () => {
    if (floorClick > 0) {
      const prevFloorIndex =
        floorList?.findIndex((floor) => floor.id === floorClick) - 1;

      if (prevFloorIndex >= 0) {
        const prevFloor = floorList[prevFloorIndex];

        setKey(prevFloor.id.toString());
        setFloorClick(prevFloor.id);
        setFloorName(prevFloor.name);

        if (prevFloorIndex < visibleRange[0]) {
          setVisibleRange([visibleRange[0] - 1, visibleRange[1] - 1]);
        }
      }
    }
  };

  const handleNext = () => {
    const floorIndex = floorList?.findIndex((floor) => floor.id === floorClick);

    if (floorIndex !== -1 && floorIndex < floorList?.length - 1) {
      const nextFloor = floorList[floorIndex + 1];

      setKey(nextFloor.id.toString());
      setFloorClick(nextFloor.id);
      setFloorName(nextFloor.name);

      if (floorIndex + 1 > visibleRange[1]) {
        setVisibleRange([visibleRange[0] + 1, visibleRange[1] + 1]);
      }
    }
  };

  const handleCloseChangeBed = () => {
    navigate(-1);
  };

  return (
    <div className="">
      <div className="sticky top-0 z-50 bg-white flex items-center px-5 h-12 -ml-6">
        <FaArrowLeftLong
          onClick={handleCloseChangeBed}
          className="cursor-pointer"
        />
        <span className="font-semibold text-lg font-gilroy pl-2.5">
          Change Bed
        </span>
      </div>
      <div className="mt-1 ml-5 rounded-[14px] border border-gray-200 bg-white mb-2">
        <div className="p-3 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-2 md:mb-0">
            {CustomerOverView?.profilePic ? (
              <img
                src={CustomerOverView?.profilePic}
                alt="Tenant Profile"
                className="h-16 w-16 rounded-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = Profiles;
                }}
              />
            ) : (
              <div className="h-16 w-16 rounded-full bg-blue-700 text-white flex items-center justify-center font-bold text-lg uppercase font-gilroy">
                {CustomerOverView?.initials || "-"}
              </div>
            )}

            <div className="ml-2.5">
              <span className="block font-semibold text-lg font-gilroy">
                {CustomerOverView?.fullName}
              </span>

              <div className="flex gap-6 mt-1 text-xs font-gilroy">
                <div className="flex items-center gap-1">
                  <img src={Floorimage} alt="Floor" className="w-4 h-4" />
                  {CustomerOverView?.hostelInfo?.floorName}
                </div>
                <div className="flex items-center gap-1">
                  <img src={RoomImage} alt="Room" className="w-4 h-4" />
                  {CustomerOverView?.hostelInfo?.roomName}
                </div>
                <div className="flex items-center gap-1">
                  <img src={Group} alt="Group" className="w-4 h-4" />
                  {CustomerOverView?.hostelInfo?.bedName}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* h-[calc(100vh-90px)] */}
      {!canReadPayingGuests ? (
        <PermissionDeniedMessage />
      ) : floorList?.length > 0 ? (
        <div className="flex flex-col md:flex-row gap-0 h-[550px] overflow-y-auto ml-2 md:ml-0 relative">
          <div className="sticky top-24 z-10">
            <div className="flex justify-center mb-2">
              <div
                onClick={handlePrev}
                className="border border-gray-200 rounded-full  cursor-pointer"
              >
                <ArrowUp2
                  size={32}
                  variant="Bold"
                  color={visibleRange[0] === 0 ? "gray" : "#000"}
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              {floorList?.map((floor, index) =>
                index >= visibleRange[0] && index <= visibleRange[1] ? (
                  <div
                    key={floor.id}
                    onClick={() => handleFloorClick(floor.id, floor.name)}
                    className={`mb-3 flex flex-col justify-center items-center rounded-xl h-24 w-24 cursor-pointer
                          ${Number(floorClick) === Number(floor.id) ? "bg-blue-50 border-2 border-[#1E45E1]" : "bg-white border-1 border-gray-300"}`}
                  >
                    <div
                      className={`text-2xl font-gilroy font-semibold ${Number(floorClick) === Number(floor.id) ? "text-blue-700" : "text-gray-700"}`}
                    >
                      {floor.name
                        ? isNaN(floor.name)
                          ? floor.name.charAt(0)
                          : floor.name
                        : floor.id}
                    </div>

                    <div
                      className={`text-sm font-gilroy font-semibold text-center px-2 break-words ${Number(floorClick) === Number(floor.id) ? "text-blue-700" : "text-gray-700"}`}
                    >
                      {typeof floor.name === "string" &&
                      floor.name.trim() !== "" &&
                      floor.name !== "null"
                        ? floor.name
                        : floor.id}
                    </div>
                  </div>
                ) : null,
              )}
            </div>

            <div className="flex justify-center mt-2">
              <div
                onClick={handleNext}
                className="border border-gray-200 rounded-full cursor-pointer"
              >
                <ArrowDown2
                  size={32}
                  variant="Bold"
                  color={
                    visibleRange[1] === numberOfFloors - 1 ? "gray" : "#000"
                  }
                />
              </div>
            </div>
          </div>

          <div className="md:w-11/12 lg:w-full md:pl-4 flex flex-col h-full ">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-3">
              <div className="flex justify-between items-center lg:block md:px-3 2xl:px-4">
                <div className="text-xl font-gilroy font-semibold capitalize whitespace-nowrap">
                  {floorName && floorName.trim() !== "" ? floorName : ""}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-y-2 gap-x-6 mt-2 md:grid-cols-3 lg:flex lg:flex-nowrap lg:items-center lg:gap-6 lg:mt-0 md:px-4">
                <span className="flex items-center gap-1 text-sm font-medium font-gilroy">
                  <img className="w-4 h-4" alt="Available" src={availabeimg} />
                  Available
                </span>
              </div>
            </div>

            <div className="  pr-2">
              <RoomView
                floorID={floorClick}
                hostel_Id={state.login?.selectedHostel_Id}
              />
            </div>
          </div>
        </div>
      ) : (
        !loading && <NoDataMessage label="Floor" />
      )}
    </div>
  );
}

export default ChangeBedPgView;
