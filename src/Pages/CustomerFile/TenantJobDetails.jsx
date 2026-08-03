import { Location, ArrowRight, Edit } from "iconsax-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Pngtree from "../../Assets/v2Images/pngtree.svg";
import AddAndUpdateJobDetails from "./AddAndUpdateJobDetails";
import { useHasPermission } from "../../Utils/Permission";

function TenantJobDetails() {
  const state = useSelector((state) => state);
  const CustomerOverView = state?.UsersList?.customerdetails;
  const [showJobModal, setShowJobModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const jobDetails = CustomerOverView?.jobDetails;

  const { canWriteModule: canWriteTenant, canUpdateModule: canUpdateTenant } =
    useHasPermission("Customers");

  const hasJobDetails =
    jobDetails &&
    (jobDetails.employmentStatus ||
      jobDetails.organizationName ||
      jobDetails.role ||
      jobDetails.workLocation ||
      jobDetails.shiftType ||
      jobDetails.shiftStartTime ||
      jobDetails?.shiftEndTime);

  const handleCloseShowModal = () => {
    setShowJobModal(false);
  };

  const isDisabledButton =
    !canWriteTenant ||
    !canUpdateTenant ||
    state.UsersList.customerdetails?.hostelInfo?.currentStatus === "BOOKED" ||
    state.UsersList.customerdetails?.hostelInfo?.currentStatus ===
      "CANCELLED" ||
    state.UsersList.customerdetails?.customerCurrentStatus === "INACTIVE" ||
    state.UsersList.customerdetails?.customerCurrentStatus === "VACATED" ||
    state.UsersList.customerdetails?.customerCurrentStatus ===
      "SETTLEMENT_GENERATED" ||
    state.UsersList.customerdetails?.customerCurrentStatus === "DRAFT";

  const handleEdit = () => {
    setShowJobModal(true);
    setEditMode(true);
  };

  return (
    <div className="w-full rounded-[14px] border border-gray-200 bg-white px-4 py-3 font-gilroy my-4">
      <div className="pb-2 border-b border-gray-100 flex items-center justify-between">
        <h2 className="font-gilroy font-semibold text-black text-[16px] leading-[40px]  sm:mb-0">
          Job & Shift Details
        </h2>
        {!isDisabledButton && hasJobDetails && (
          <div>
            <Edit
              size="16"
              className="cursor-pointer"
              onClick={() => handleEdit()}
            />
          </div>
        )}
      </div>

      {!hasJobDetails ? (
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center py-10">
            <img src={Pngtree} />
          </div>

          <div className="flex items-center  flex-col justify-center py-10">
            <p className="text-sm text-gray-500 font-medium">
              Job Details aren’t added yet!
            </p>

            <div>
              {" "}
              <button
                disabled={isDisabledButton}
                onClick={() => {
                  setShowJobModal(true);
                  setEditMode(false);
                }}
                type="submit"
                className="bg-[#1E45E1] disabled:bg-blue-700/60 disabled:cursor-not-allowed text-white px-6 py-2 rounded-[8px] text-sm font-medium flex items-center gap-1 "
              >
                Add Now <ArrowRight size="14" color="#FFFFFF" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-8 pt-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Employment Status</p>
            <p className="text-sm font-medium text-[#222222]">
              {jobDetails?.employmentStatus || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Company/College Name</p>
            <p className="text-sm font-medium text-[#222222]">
              {jobDetails?.organizationName || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Job Role</p>
            <p className="text-sm font-medium text-[#222222]">
              {jobDetails?.role || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Work Location</p>
            <div className="flex items-center gap-2">
              <Location size="16" color="#1E45E1" />
              <span className="text-sm font-medium text-[#222222]">
                {jobDetails?.workLocation || "N/A"}
              </span>
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Shift Type</p>
            <p className="text-sm font-medium text-[#222222]">
              {jobDetails?.shiftType || "N/A"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Shift Timing</p>
            <p className="text-sm font-medium text-[#222222]">
              {jobDetails?.shiftStartTime || "N/A"} -{" "}
              {jobDetails?.shiftEndTime || "N/A"}
            </p>
          </div>
        </div>
      )}

      {showJobModal && (
        <AddAndUpdateJobDetails
          show={showJobModal}
          handleClose={handleCloseShowModal}
          editMode={editMode}
        />
      )}
    </div>
  );
}

export default TenantJobDetails;
