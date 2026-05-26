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
              {editCategory ? "Edit Category" : "Add Category"}
            </div>

            <CloseCircle
              size={24}
              color="#000"
              onClick={handleCloseForm}
              className="cursor-pointer"
            />
          </Modal.Header>

          <Modal.Body className="pt-2">
            <div>
              <div className="col-lg-12">
                <Form.Group className="mb-">
                  <Form.Label className="font-gilroy text-[14px] font-medium text-[#222] leading-normal">
                    Category <span className="text-red-500 text-[20px]">*</span>
                  </Form.Label>

                  <Form.Control
                    ref={inputRef}
                    type="text"
                    placeholder="Enter Category"
                    value={category}
                    onChange={handleCategoryAdd}
                    className="mt-1 !p-[12px] !text-base !text-[#4B4B4B] !font-gilroy !font-medium"
                  />

                  {categoryError && (
                    <div className="flex justify-start mt-2">
                      <ErrorMessage message={categoryError} type="error" />
                    </div>
                  )}
                </Form.Group>
              </div>

              {formError && (
                <div className="flex justify-center mt-2">
                  <ErrorMessage message={formError} type="error" />
                </div>
              )}
            </div>
          </Modal.Body>

          {formLoading && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-75 z-10">
              <div className="w-10 h-10 rounded-full border-t-4 border-r-4 border-t-[#1E45E1] border-r-transparent animate-spin"></div>
            </div>
          )}

          <Modal.Footer className="!border-0 mb-0.5">
            <Button
              disabled={formLoading}
              onClick={handleSubmit}
              className="!w-full !bg-[#1E45E1] !font-medium !h-[50px] !rounded-[12px] !text-[16px] !font-gilroy !mt-[-3.5]"
            >
              {editCategory ? "Save Changes" : "+ Category"}
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  );
}
AddCategory.propTypes = {
  show: PropTypes.func.isRequired,
  handleCloseForm: PropTypes.func.isRequired,
  editCategory: PropTypes.shape({
    categoryName: PropTypes.string,
  }),
};
export default AddCategory;
