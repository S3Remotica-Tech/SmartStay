/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import "react-toastify/dist/ReactToastify.css";
import EmptyState from "../../Assets/Images/New_images/empty_image.png";
import { Edit, Trash } from "iconsax-react";
import PropTypes from "prop-types";
import { useHasPermission } from "../../Utils/Permission";
import NoData from "../../Assets/v2Images/NoData.svg";
import BedView from "./BedView";
import NoDataMessage from "../../Utils/NoDataMessage";

function RoomView(props) {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [roomList, setRoomList] = useState([]);
  const [selectedBed, setSelectedBed] = useState(null);

  useEffect(() => {
    if (props.floorID && props.hostel_Id) {
      dispatch({ type: "REMOVE_GET_ALL_ROOMS_STATUS_CODE" });
      dispatch({
        type: "GETALLROOMSLIST",
        payload: { floor_Id: props.floorID },
      });
    }
  }, [props.hostel_Id, props.floorID, state?.login?.selectedHostel_Id]);

  useEffect(() => {
    if (state?.PgList?.getAllRoomSuccessStatus === 200) {
      setRoomList(state.PgList?.roomsList || []);
      dispatch({ type: "REMOVE_GET_ALL_ROOMS_STATUS_CODE" });
    }
  }, [state?.PgList?.getAllRoomSuccessStatus, state?.PgList?.roomsList]);

  // console.log("length", roomList.length);

  return (
    <div className="lg:px-4  ">
      {roomList?.length > 0 ? (
        <div className="grid gap-3 mt-4 mb-2 font-gilroy grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 overflow-y-auto max-h-[400px] show-scrolls">
          {roomList?.map((room, index) => {
            // console.log("room:", room);

            return (
              <div key={room.id} className="flex justify-center">
                <div className="w-full h-full  border border-[#E6E6E6] rounded-xl min-h-[120px]">
                  <div className="flex justify-between items-start bg-[#E0ECFF] border border-[#E6E6E6] rounded-t-xl p-2.5">
                    <div className="w-[110px]">
                      <div
                        title={`Room No ${room.name}`}
                        className="text-[14px] font-semibold text-[#222222] truncate"
                      >
                        {room.name}
                      </div>
                      <div className="text-[12px] font-normal text-[#7C7C7C] -mt-0.5">
                        {/* {Array.isArray(state.PgList?.bedList?.[room.id])
                            ? `${state.PgList.bedList[room.id].length} sharing`
                            : "0 sharing"} */}
                      </div>
                    </div>
                  </div>

                  <div className="p-2.5">
                    <BedView
                      room={room}
                      selectedBed={selectedBed}
                      setSelectedBed={setSelectedBed}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <NoDataMessage label="Room" isHeightChanged={true} />
      )}
    </div>
  );
}

export default RoomView;
