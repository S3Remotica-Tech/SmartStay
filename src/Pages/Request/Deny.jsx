/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Add } from "iconsax-react";
import PropTypes from "prop-types";
import Select from "react-select";
import {
  fieldLabelClass,
  fieldRequiredClass,
  fieldSelectStyles,
  fieldTextareaClass,
} from "../../Utils/FieldStyles";


function Deny({ show, handleClose, heading }) {
  if (!show) return null;

  const statusOptions = [
    {
      label: "On Hold",
      value: "onHold",
    },
    {
      label: "Rejected",
      value: "rejected",
    },
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[9999]" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed inset-y-2 right-2 w-[600px] bg-white rounded-lg shadow-xl z-[9999] flex flex-col font-gilroy border border-gray-50"
      >
        <div
          className="sticky top-0 z-50 flex items-center  justify-between gap-4   
                  rounded-xl  bg-white px-4 py-3"
        >
          <h1 className="text-[18px] font-semibold text-[#222222] mb-0">
            {heading}
          </h1>
          <Add
            size={24}
            color="#FF0000"
            onClick={handleClose}
            className="cursor-pointer rotate-45"
          />
        </div>

        <div className="px-4 flex-1 show-scrolls overflow-y-auto">
          <div className="mb-2">
            <label className={fieldLabelClass}>
              Status <span className={fieldRequiredClass}>*</span>
            </label>

            <Select
              placeholder="Select Status"
              styles={fieldSelectStyles()}
              options={statusOptions}
            />
          </div>

          <div>
            <label className={fieldLabelClass}>
              Commands
            </label>
            <textarea
              placeholder="Enter Commands"
              rows={4}
              className={fieldTextareaClass()}
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 m-4">
          <button
            onClick={handleClose}
            className="flex-1 border rounded-lg py-2"
          >
            Cancel
          </button>

          <button className="flex-1 bg-[#1E45E1] text-white rounded-lg py-2">
            Notify{" "}
          </button>
        </div>
      </div>
    </>
  );
}
Deny.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  heading: PropTypes.string.isRequired,
};
export default Deny;
