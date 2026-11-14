/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import PropTypes from "prop-types";

import "./UserList.css";
import { Tag2 } from "iconsax-react";
import { useHasPermission } from "../../Utils/Permission";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";

function UserListAmenities() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  // const [formLoading, setFormLoading] = useState(false);

  // const [selectAmneties, setselectAmneties] = useState("");

  // const [addamenityShow, setaddamenityShow] = useState(false);
  // const [createby, setcreateby] = useState("");
  // const [amnityError, setamnityError] = useState("");

  const {
    // canWriteModule: canWriteAmenities,
    canReadModule: canReadAmenities,
    // canUpdateModule: canUpdateAmenities,
    // canDeleteModule: canDeleteAmenities,
  } = useHasPermission("Amenities");

  const [CustomerOverView, setCustomerOverView] = useState([]);

  useEffect(() => {
    if (state.UsersList?.customerdetails?.assignedAmenities) {
      setCustomerOverView(state.UsersList.customerdetails.assignedAmenities);
    } else {
      setCustomerOverView([]);
    }
  }, [state.UsersList?.customerdetails?.assignedAmenities]);

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      // setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 100);
    }
  }, [state.UsersList?.accessRestrictionError]);

  useEffect(() => {
    if (state.InvoiceList.UnAssignAmenitiesSuccessStatusCode === 200) {
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: state.UsersList?.customerdetails?.customerId },
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE_UN_ASSIGN_AMENITIES_STATUS_CODE" });
      }, 100);
    }
  }, [state.InvoiceList.UnAssignAmenitiesSuccessStatusCode]);

  const handleFormClose = () => {
    // setselectAmneties("");
    // setSelectError("");
    // setaddamenityShow(false);
    // setActiveDotsId(null)
    // setStatusAmni(false);
    // setamnityError("");

    dispatch({ type: "CLEAR_ERROR_USER_AMENITIES" });
  };
  useEffect(() => {
    if (state.UsersList.statusCustomerAddUser === 200) {
      // setFormLoading(false);
      handleFormClose();
    }
  }, [state.UsersList.statusCustomerAddUser]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      // setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  return (
    <div className="">
      {!canReadAmenities ? (
        <>
          <PermissionDeniedMessage isHeightChanged={true} />
        </>
      ) : (
        <>
          <div className="flex flex-wrap gap-3">
            {CustomerOverView?.length > 0 ? (
              CustomerOverView.map((v) => (
                <div key={v?.amenityId} className="w-full md:w-[calc(33.333%-8px)]">
                  <div className="rounded-lg border border-[#EFF2FF] bg-white p-3.5 font-gilroy text-sm font-medium text-black">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-[#EFF2FF] p-2">
                        <Tag2 size="32" color="#1E45E1" />
                      </div>

                      <div className="min-w-0">
                        <span className="mb-1 flex items-center capitalize font-semibold text-base text-[#222222]">
                          {v?.amenityName}
                        </span>

                        <span className="flex items-center text-sm font-medium text-[#4B4B4B]">
                          ₹{v?.amenityAmount}/m
                        </span>

                        <div className="mt-2 inline-flex rounded bg-pink-100 px-2 py-1.5 text-xs font-medium text-pink-700">
                          Ending on {v?.endDate}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex w-full items-center justify-center py-4">
                <label className="font-gilroy text-sm font-medium text-[#4B4B4B]">
                  No amenities assigned
                </label>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
UserListAmenities.propTypes = {
  hostelIds: PropTypes.func.isRequired,
  customerUser_Id: PropTypes.func.isRequired,
  hostelName: PropTypes.func.isRequired,
  id: PropTypes.func.isRequired,
  customerAdd: PropTypes.func.isRequired,
};
export default UserListAmenities;
