/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { CloseCircle } from "iconsax-react";
import ErrorMessage from "../../Components/ErrorMessage";

const CustomStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "45px",
    height: "45px",
    border: "1px solid #D9D9D9",
    borderRadius: "8px",
    fontSize: "15px",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: 500,
    boxShadow: "none",
    alignItems: "center",

    cursor: state.isDisabled ? "not-allowed" : "pointer",
    backgroundColor: state.isDisabled
      ? "#F3F4F6"
      : state.hasValue
        ? "#FFF"
        : "#fff",
    opacity: state.isDisabled ? 0.7 : 1,
  }),

  singleValue: (base, state) => ({
    ...base,
    color: state.isDisabled ? "#9CA3AF" : "#333",
    fontWeight: 500,
  }),

  placeholder: (base, state) => ({
    ...base,
    color: state.isDisabled ? "#9CA3AF" : "#6B7280",
  }),

  option: (base, state) => {
    const isSelected = state.isSelected;

    return {
      ...base,
      position: "relative",
      fontSize: 14,
      padding: "6px 12px",
      backgroundColor: isSelected
        ? "#EEF2FF"
        : state.isFocused
          ? "#F3F4F6"
          : "#fff",
      color: "#111827",
      cursor: "pointer",

      whiteSpace: "nowrap",
      overflow: "visible",

      paddingLeft: isSelected ? "9px" : "12px",

      ...(isSelected && {
        borderLeft: "3px solid #1E45E1",
        fontWeight: 500,
      }),
    };
  },

  menu: (base) => ({
    ...base,
    backgroundColor: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    padding: "6px 0",
    zIndex: 9999,
    width: "max-content",
    minWidth: "100%",
  }),

  menuList: (base) => ({
    ...base,
    maxHeight: "100px",
    padding: 0,
    overflowY: "auto",
  }),

  valueContainer: (base) => ({
    ...base,
    padding: "0 8px",
  }),

  indicatorsContainer: (base) => ({
    ...base,
    height: "45px",
  }),

  dropdownIndicator: (base, state) => ({
    ...base,
    padding: "4px",
    color: state.isDisabled ? "#D1D5DB" : "#6B7280",
    cursor: state.isDisabled ? "not-allowed" : "pointer",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),
};
function AddAndUpdateJobDetails({ show, handleClose, editMode }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const CustomerOverView = state?.UsersList?.customerdetails;
  const [employmentStatus, setEmploymentStatus] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [shiftType, setShiftType] = useState("");
  const [fromTime, setFromTime] = useState("");
  const [toTime, setToTime] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [noChanges, setNoChanges] = useState("");

  const shiftTypeOptions = [
    { value: "Day Shift", label: "Day Shift" },
    { value: "Night Shift", label: "Night Shift" },
    { value: "Rotational Shift", label: "Rotational Shift" },
    { value: "Flexible Shift", label: "Flexible Shift" },
    { value: "General Shift", label: "General Shift" },
  ];

  const jobRoleOptions = [
    { value: "Software Engineer", label: "Software Engineer" },
    { value: "Developer", label: "Developer" },
    { value: "Tester", label: "Tester" },
    { value: "Designer", label: "Designer" },
    { value: "Manager", label: "Manager" },
    { value: "Accountant", label: "Accountant" },
    { value: "Teacher", label: "Teacher" },
    { value: "Doctor", label: "Doctor" },
    { value: "Nurse", label: "Nurse" },
    { value: "Lawyer", label: "Lawyer" },
    { value: "Sales Executive", label: "Sales Executive" },
    { value: "Marketing Executive", label: "Marketing Executive" },
    { value: "Student", label: "Student" },
    { value: "Other", label: "Other" },
  ];

  const jobOptions = [
    { value: "Employed", label: "Employed" },
    { value: "Self Employed", label: "Self Employed" },
    { value: "Student", label: "Student" },
    { value: "Business Owner", label: "Business Owner" },
    { value: "Freelancer", label: "Freelancer" },
    { value: "Government Employee", label: "Government Employee" },
    { value: "Private Employee", label: "Private Employee" },
    { value: "Intern", label: "Intern" },
    { value: "Retired", label: "Retired" },
    { value: "Unemployed", label: "Unemployed" },
    { value: "Other", label: "Other" },
  ];

  const handleEmploymentStatusChange = (selected) => {
    setEmploymentStatus(selected);
    setNoChanges("");
  };

  const handleOrganizationNameChange = (e) => {
    setOrganizationName(e.target.value);
    setNoChanges("");
  };

  const handleJobRoleChange = (selected) => {
    setJobRole(selected);
    setNoChanges("");
  };

  const handleWorkLocationChange = (e) => {
    setWorkLocation(e.target.value);
    setNoChanges("");
  };

  const handleShiftTypeChange = (selected) => {
    setShiftType(selected);
    setNoChanges("");
  };

  const handleFromTimeChange = (e) => {
    setFromTime(e.target.value);
    setNoChanges("");
  };

  const handleToTimeChange = (e) => {
    setToTime(e.target.value);
    setNoChanges("");
  };

  useEffect(() => {
    const jobDetails = CustomerOverView?.jobDetails;

    if (jobDetails && editMode) {
      setEmploymentStatus(
        jobDetails.employmentStatus
          ? {
              value: jobDetails.employmentStatus,
              label: jobDetails.employmentStatus,
            }
          : null,
      );

      setOrganizationName(jobDetails.organizationName?.trim() || "");

      setJobRole(
        jobDetails.role
          ? {
              value: jobDetails.role,
              label: jobDetails.role,
            }
          : null,
      );

      setWorkLocation(jobDetails.workLocation || "");

      setShiftType(
        jobDetails.shiftType
          ? {
              value: jobDetails.shiftType,
              label: jobDetails.shiftType,
            }
          : null,
      );

      // const [from = "", to = ""] = (jobDetails.shiftTiming || "").split(":");

      setFromTime(jobDetails?.shiftStartTime);
      setToTime(jobDetails?.shiftEndTime);
    }
  }, [CustomerOverView, editMode]);

  const handleSave = () => {
    setNoChanges("");
    const existing = CustomerOverView?.jobDetails || {};

    const currentShiftTiming = `${fromTime || ""}:${toTime || ""}`;

    const existingData = {
      employmentStatus: existing.employmentStatus || "",
      organizationName: (existing.organizationName || "").trim(),
      role: existing.role || "",
      workLocation: existing.workLocation || "",
      shiftType: existing.shiftType || "",
      shiftTiming: existing.shiftTiming || "",
    };

    const currentData = {
      employmentStatus: employmentStatus?.value || "",
      organizationName: organizationName.trim(),
      role: jobRole?.value || "",
      workLocation,
      shiftType: shiftType?.value || "",
      shiftTiming: `${fromTime}:${toTime}`,
    };

    const isJobDetailsChanged =
      JSON.stringify(existingData) !== JSON.stringify(currentData);

    if (!isJobDetailsChanged) {
      setNoChanges("No changes detected");
      return;
    }

    dispatch({
      type: "JOB_UPDATE_SAGA",
      payload: {
        hostelId: state?.login?.selectedHostel_Id,
        customerId: CustomerOverView?.customerId,
        employmentStatus: employmentStatus?.value || "",
        organizationName: organizationName || "",
        role: jobRole?.value || "",
        workLocation: workLocation || "",
        shiftType: shiftType?.value || "",
        shiftStartsFrom: fromTime || "",
        shiftEndsAt: toTime || "",
      },
    });
    setSaveLoading(true);
  };

  useEffect(() => {
    if (state.UsersList?.updateJobDetailsSuccessCode === 200) {
      setSaveLoading(false);

      handleClose();
    }
  }, [state.UsersList?.updateJobDetailsSuccessCode]);

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute top-2 right-2 bottom-2 w-full max-w-2xl bg-white rounded-xl shadow-xl flex flex-col">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h3 className="text-lg font-semibold">
            {editMode ? "Edit Job Details" : "Add Job Details"}
          </h3>

          <CloseCircle
            size="24"
            color="#000"
            onClick={handleClose}
            className="cursor-pointer"
          />
        </div>
        <div className="flex-1 overflow-y-auto px-3 py-3 show-scrolls max-h-[500px]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy">
                Employment Status
              </label>
              <Select
                options={jobOptions}
                value={employmentStatus}
                onChange={handleEmploymentStatusChange}
                placeholder="Employment Status"
                styles={CustomStyles}
              />
            </div>

            <div>
              <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy ">
                Company / College
              </label>
              <input
                value={organizationName}
                onChange={handleOrganizationNameChange}
                className="w-full mt-1 border rounded-lg px-3 py-2 outline-none focus:border-[#1E45E1]"
                placeholder="Company / College"
              />
            </div>

            <div>
              <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy">
                Job Role
              </label>
              <Select
                options={jobRoleOptions}
                value={jobRole}
                onChange={handleJobRoleChange}
                placeholder="Job Role"
                styles={CustomStyles}
              />
            </div>

            <div>
              <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy ">
                Work Location
              </label>
              <input
                value={workLocation}
                onChange={handleWorkLocationChange}
                className="w-full mt-1 border rounded-lg px-3 py-2 outline-none focus:border-[#1E45E1]"
                placeholder="Work Location"
              />
            </div>

            <div>
              <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy ">
                Shift Type
              </label>
              <Select
                options={shiftTypeOptions}
                value={shiftType}
                onChange={handleShiftTypeChange}
                placeholder="Shift Type"
                styles={CustomStyles}
              />
            </div>

            <div>
              <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy ">
                From Time
              </label>
              <input
                type="time"
                value={fromTime}
                onChange={handleFromTimeChange}
                className="w-full mt-1 border rounded-lg px-3 py-2 outline-none focus:border-[#1E45E1]"
              />
            </div>

            <div>
              <label className="mt-2 text-sm font-medium text-[#222222] font-gilroy ">
                To Time
              </label>
              <input
                type="time"
                value={toTime}
                onChange={handleToTimeChange}
                className="w-full mt-1 border rounded-lg px-3 py-2 outline-none focus:border-[#1E45E1]"
              />
            </div>
          </div>
        </div>
        {noChanges && <ErrorMessage message={noChanges} type="error" />}
        <div className="flex justify-end gap-3 border-t px-6 py-4">
          <button onClick={handleClose} className="px-5 py-2 border rounded-lg">
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saveLoading}
            className={`px-5 py-2 rounded-lg text-white flex items-center justify-center gap-2 min-w-[100px]
    ${
      saveLoading
        ? "bg-[#1E45E1]/70 cursor-not-allowed"
        : "bg-[#1E45E1] hover:bg-[#1739b8]"
    }`}
          >
            {saveLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddAndUpdateJobDetails;
