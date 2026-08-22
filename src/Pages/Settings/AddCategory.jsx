/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { CloseCircle } from "iconsax-react";
import ErrorMessage from "../../Components/ErrorMessage";
import PropTypes from "prop-types";


function AddCategory({ show, handleCloseForm, editCategory }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [category, setCategory] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const inputRef = useRef(null);

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 100);
    }
  }, [state.UsersList?.accessRestrictionError]);
  useEffect(() => {
    if (editCategory) {
      setCategory(editCategory?.categoryName);
    }
  }, [editCategory]);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleCategoryAdd = (e) => {
    const value = e.target.value;
    setFormError("");
    setCategory(value);

    if (!value.trim()) {
      setCategoryError("Please enter category");
    } else {
      setCategoryError("");
    }
  };

  const handleSubmit = () => {
    dispatch({ type: "CLEAR_ALREADY_EXPENCE_CATEGORY_ERROR" });

    const trimmedCategory = category.trim();

    if (!trimmedCategory) {
      setCategoryError("Please enter category");
      focusInput();
      return;
    }

    if (editCategory && trimmedCategory === editCategory.categoryName?.trim()) {
      setFormError("No changes detected");
      focusInput();
      return;
    }

    if (editCategory) {
      dispatch({
        type: "EDIT_EXPENCES_CATEGORY",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          newCategoryName: trimmedCategory,
          categoryId: editCategory.categoryId,
        },
      });
    } else {
      dispatch({
        type: "EXPENCES-CATEGORY-ADD",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          categoryName: trimmedCategory,
        },
      });
    }

    setFormLoading(true);
  };

  useEffect(() => {
    if (state.Settings?.alreadycategoryerror) {
      setFormLoading(false);
      setCategoryError(state.Settings?.alreadycategoryerror);
      focusInput();
    }
  }, [state.Settings?.alreadycategoryerror]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute font-gilroy top-2 right-2 bottom-2 w-full max-w-xl bg-white rounded-xl shadow-xl flex flex-col">
        <div className=" px-4 py-3 shrink-0 border-b flex items-center justify-between gap-2 mb-2">
          <div className="text-xl font-gilroy font-semibold">
            {editCategory ? "Edit Category" : "Add Category"}
          </div>

          <CloseCircle
            size={24}
            color="#000"
            onClick={handleCloseForm}
            className="cursor-pointer"
          />
        </div>

        <div className="flex-1 overflow-y-auto px-4 show-scrolls max-h-[500px] relative">
          <div>
            <div className="w-full">
              <div>
                <label className="block font-gilroy text-[14px] font-medium text-[#222] leading-normal">
                  Category <span className="text-red-500 text-[20px]">*</span>
                </label>

                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Enter Category"
                  value={category}
                  onChange={handleCategoryAdd}
                  className="mt-1 w-full rounded-md border border-gray-300 p-2 text-base font-gilroy font-medium text-[#4B4B4B] outline-none focus:border-[#1E45E1] "
                />

                {categoryError && (
                  <div className="mt-2 flex justify-start">
                    <ErrorMessage message={categoryError} type="error" />
                  </div>
                )}
              </div>
            </div>
            {formError && (
              <div className="flex justify-center mt-2">
                <ErrorMessage message={formError} type="error" />
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-4 p-4">
          <button
            disabled={formLoading}
            onClick={handleSubmit}
            className="!font-gilroy text-sm !bg-[#1E45E1] !text-white !font-semibold 
  !rounded-md !py-2.5 !px-4 !mb-2 !mx-2 !h-11 !w-36 !whitespace-nowrap
  flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {formLoading && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}

            {formLoading
              ? "Saving..."
              : editCategory
                ? "Save Changes"
                : "+ Category"}
          </button>
        </div>
      </div>
    </div>
  );
}
AddCategory.propTypes = {
  show: PropTypes.func.isRequired,
  handleCloseForm: PropTypes.func.isRequired,
  editCategory: PropTypes.shape({
    categoryName: PropTypes.string,
    categoryId: PropTypes.string,
  }),
};
export default AddCategory;
