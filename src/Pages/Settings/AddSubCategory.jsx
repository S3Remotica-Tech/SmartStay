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
    <div
      className="modal show"
      style={{
        display: "block",
        position: "initial",
        fontFamily: "Gilroy,sans-serif",
      }}
    >
      <Modal
        show={show}
        onHide={handleCloseForm}
        centered
        backdrop="static"
        dialogClassName="custom-modal"
      >
        <Modal.Dialog className="m-0 p-0 pr-2 max-w-[950px] rounded-[30px]">
          <Modal.Header className="relative flex items-center justify-between">
            <div className="text-xl font-gilroy font-semibold">
              {editSubCategory ? "Edit Sub Category" : "Add Sub Category"}
            </div>

            <CloseCircle
              size="24"
              color="#000"
              onClick={handleCloseForm}
              className="cursor-pointer"
            />
          </Modal.Header>

          <Modal.Body className="pt-2 mb-1">
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
                className="w-full !p-[12px] text-[16px] text-[#4B4B4B] font-gilroy font-medium border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E45E1]"
              />
              {subCategoryError && (
                <div className="flex justify-start mt-2">
                  <ErrorMessage message={subCategoryError} type="error" />
                </div>
              )}
            </div>
          </Modal.Body>

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

          <Modal.Footer className="!border-none mb-0.5">
            <button
              disabled={formLoading}
              onClick={handleSubmit}
              className="!w-full !bg-[#1E45E1] !font-medium !h-12 !rounded-xl !text-base !font-gilroy !mt-[-3.5] text-white"
            >
              {editSubCategory ? "Save Changes" : "+ Sub Category"}
            </button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
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
