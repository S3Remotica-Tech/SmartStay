/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import { Add } from "iconsax-react";

import ErrorMessage from "../../../Components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";

function AddCategory({ show, onClose, updateDetails }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("updateDetails", updateDetails);

  const categoryRef = useRef(null);

  useEffect(() => {
    if (updateDetails) {
      setCategoryName(updateDetails?.categoryName);
    }
  }, [updateDetails]);

  const handleChange = (e) => {
    dispatch({
      type: "REMOVE_ALREADY_VENDOR_CATEGORY_ERROR",
    });

    let value = e.target.value;
    value = value.replace(/^\s+/, "");
    value = value.replace(/\s{2,}/g, " ");
    value = value.replace(/[^a-zA-Z0-9&()/_\-\s]/g, "");
    setCategoryName(value);
    setCategoryError("");
  };

  const validate = () => {
    let isValid = true;

    if (!categoryName?.trim()) {
      setCategoryError("Please Enter Category Name");
      categoryRef.current?.focus();
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    setCategoryError("");
    if (!validate()) return;
    dispatch({
      type: "REMOVE_ALREADY_VENDOR_CATEGORY_ERROR",
    });
    if (updateDetails) {
      if (categoryName.trim() === updateDetails?.categoryName?.trim()) {
        setCategoryError("No changes detected.");
        return;
      }

      dispatch({
        type: "UPDATE_VENDOR_CATEGORY_SAGA",
        payload: {
          categoryName: categoryName,
          categoryId: updateDetails?.id,
          hostelId: state.login.selectedHostel_Id,
        },
      });

      setLoading(true);
    } else {
      dispatch({
        type: "VENDOR_CATEGORY_SAGA",
        payload: {
          categoryName: categoryName,
          hostelId: state.login.selectedHostel_Id,
        },
      });

      setLoading(true);
    }
  };

  if (!open) return null;

  useEffect(() => {
    if (
      state.Settings?.createVendorCategorySuccessStatus === 201 ||
      state.Settings?.vendorCategoryError ||
      state.Settings?.updateVendorCategorySuccessStatus === 200
    ) {
      setLoading(false);
    }
  }, [
    state.Settings?.createVendorCategorySuccessStatus,
    state.Settings?.vendorCategoryError,
    state.Settings?.updateVendorCategorySuccessStatus,
  ]);

  useEffect(() => {
    return () => {
      dispatch({
        type: "REMOVE_ALREADY_VENDOR_CATEGORY_ERROR",
      });
      setCategoryError("");
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[9999]">
      <div className="bg-white w-[500px] rounded-lg  shadow-lg font-gilroy">
        <div className="flex justify-between items-center  px-4 py-2.5">
          <h2 className="text-xl font-gilroy font-semibold">Add Category</h2>

          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
          >
            <Add className="rotate-45" color="#FF0000" size={22} />
          </button>
        </div>

        <hr className="m-0  border-1 border-gray-400" />
        <div className="py-3 px-3">
          <label className="font-gilroy text-[14px] font-medium text-[#222] leading-normal">
            Category Name <span className="text-red-500">*</span>
          </label>

          <input
            ref={categoryRef}
            type="text"
            value={categoryName}
            onChange={handleChange}
            placeholder="Enter category name"
            className="w-full mt-1 border border-gray-300 rounded-lg h-[45px] px-3 focus:outline-none "
          />

          {categoryError && (
            <ErrorMessage message={categoryError} type="error" />
          )}
          {state.Settings?.vendorCategoryError && (
            <ErrorMessage
              message={["Category Name Already Exist"]}
              type="error"
            />
          )}
        </div>
        <div className="flex justify-center  gap-3 px-3 my-2">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#1E45E1] text-white px-4 py-2 rounded-lg w-full flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving...
                </div>
              </>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
