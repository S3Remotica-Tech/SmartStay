/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { CloseCircle } from "iconsax-react";
import ErrorMessage from "../../Components/ErrorMessage";
import PropTypes from "prop-types";
// import { useHasPermission } from "../../Utils/Permission";

function AddSubCategory({
  show,
  handleCloseForm,
  AddSubCategory,
  editSubCategory,
}) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [subCategory, setSubCategory] = useState("");
  const [subCategoryError, setSubCategoryError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (editSubCategory) {
      setSubCategory(editSubCategory?.subCategoryName ?? "");
    }
  }, [editSubCategory]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleSubCategoryChange = (e) => {
    setFormError("");
    const value = e.target.value;
    setSubCategory(value);

    if (!value.trim()) {
      setSubCategoryError("Please enter sub category");
    } else {
      setSubCategoryError("");
    }
  };

  const handleSubmit = () => {
    dispatch({ type: "CLEAR_ALREADY_EXPENCE_CATEGORY_ERROR" });
    const trimmedSubCategory = subCategory.trim();
    if (!trimmedSubCategory) {
      setSubCategoryError("Please Enter Sub Category");
      focusInput();
      return;
    }
    if (
      editSubCategory &&
      trimmedSubCategory === editSubCategory.subCategoryName?.trim()
    ) {
      setFormError("No changes detected");
      focusInput();
      return;
    }

    if (editSubCategory) {
      dispatch({
        type: "EDITSUBCATEGORYSAGA",
        payload: {
          subCategoryId: editSubCategory.subCategoryId,
          hostelId: state.login.selectedHostel_Id,
          newSubCategoryName: trimmedSubCategory,
        },
      });

      setFormLoading(true);
    } else {
      dispatch({
        type: "EXPENCES-CATEGORY-ADD",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          categoryId: AddSubCategory?.categoryId,
          subCategory: trimmedSubCategory,
        },
      });

      setFormLoading(true);
    }
  };

  useEffect(() => {
    if (state.Settings?.alreadycategoryerror) {
      setFormLoading(false);
      setSubCategoryError(state.Settings?.alreadycategoryerror);
      focusInput();
    }
  }, [state.Settings?.alreadycategoryerror]);

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 100);
    }
  }, [state.UsersList?.accessRestrictionError]);

  return (
    <div className="fixed inset-0 z-[9999]">
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute font-gilroy top-2 right-2 bottom-2 w-full max-w-xl bg-white rounded-xl shadow-xl flex flex-col">
        <div className=" px-4 py-3 shrink-0 border-b flex items-center justify-between gap-2 mb-2">
          <div className="text-xl font-gilroy font-semibold">
            {editSubCategory ? "Edit Sub Category" : "Add Sub Category"}
          </div>

          <CloseCircle
            size="24"
            color="#000"
            onClick={handleCloseForm}
            className="cursor-pointer"
          />
        </div>

        <div className="flex-1 overflow-y-auto px-4 show-scrolls max-h-[500px] relative">
          <div className="w-full">
            <label className="block font-gilroy text-[14px] font-medium text-[#222] leading-normal mb-1">
              Sub Category <span className="text-red-500 text-[20px]">*</span>
            </label>

            <input
              ref={inputRef}
              type="text"
              placeholder="Enter Sub Category"
              value={subCategory}
              onChange={handleSubCategoryChange}
              className="w-full !p-[12px] text-[16px] text-[#4B4B4B] font-gilroy font-medium border border-gray-300 rounded-md focus:outline-none "
            />
            {subCategoryError && (
              <div className="flex justify-start mt-2">
                <ErrorMessage message={subCategoryError} type="error" />
              </div>
            )}
          </div>
        </div>

        {formError && (
          <div className="flex justify-center mt-2">
            <ErrorMessage message={formError} type="error" />
          </div>
        )}
        {formLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-10 opacity-75">
            <div className="w-10 h-10 border-4 border-t-blue-700 border-r-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <div className="flex justify-end gap-4 p-4">
          <button
            disabled={formLoading}
            onClick={handleSubmit}
            className="!font-gilroy text-sm !bg-[#1E45E1] !text-white !font-semibold 
  !rounded-md !py-2.5 !px-4 !mb-2 !mx-2 !h-11 !w-36 !whitespace-nowrap
  flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {formLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Saving...</span>
              </>
            ) : editSubCategory ? (
              "Save Changes"
            ) : (
              "+ Sub Category"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

AddSubCategory.propTypes = {
  show: PropTypes.func.isRequired,
  handleCloseForm: PropTypes.func.isRequired,
  AddSubCategory: PropTypes.func.isRequired,
  editSubCategory: PropTypes.shape({
    subCategoryName: PropTypes.string,
  }),
  categoryId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default AddSubCategory;
