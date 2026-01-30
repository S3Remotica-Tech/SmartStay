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

function AddSubCategory({ show, handleCloseForm, AddSubCategory, editSubCategory }) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();


    const [subCategory, setSubCategory] = useState("");
    const [subCategoryError, setSubCategoryError] = useState("");
    const [formLoading, setFormLoading] = useState(false);

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
            setSubCategoryError("No changes detected");
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
                <Modal.Dialog
                    style={{ maxWidth: 950, paddingRight: "10px", borderRadius: "30px" }}
                    className="m-0 p-0"
                >
                    <Modal.Header style={{ position: "relative" }}>
                        <div style={{ fontSize: 20, fontWeight: 600, fontFamily: "Gilroy" }}>
                            {editSubCategory ? "Edit Sub Category" : "Add Sub Category"}
                        </div>

                        <CloseCircle
                            size="24"
                            color="#000"
                            onClick={handleCloseForm}
                            style={{ cursor: "pointer" }}
                        />
                    </Modal.Header>

                    <Modal.Body className="pt-2">
                        <div className="row">
                            <div className="col-lg-12">
                                <Form.Group className="mb-3">
                                    <Form.Label
                                        style={{
                                            fontFamily: "Gilroy",
                                            fontSize: 14,
                                            fontWeight: 500,
                                            color: "#222",
                                            lineHeight: "normal",
                                        }}
                                    >
                                        Sub Category{" "}
                                        <span style={{ color: "red", fontSize: 20 }}> *</span>
                                    </Form.Label>

                                    <Form.Control
                                        ref={inputRef}
                                        style={{
                                            padding: "10px",
                                            marginTop: "3px",
                                            fontSize: 16,
                                            color: "#4B4B4B",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}
                                        type="text"
                                        placeholder="Enter Sub Category"
                                        value={subCategory}
                                        onChange={handleSubCategoryChange}
                                    />

                                    {subCategoryError && (
                                        <ErrorMessage message={subCategoryError} type="error" />
                                    )}
                                </Form.Group>
                            </div>
                        </div>
                    </Modal.Body>

                    {formLoading && (
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                opacity: 0.75,
                                zIndex: 10,
                            }}
                        >
                            <div
                                style={{
                                    borderTop: "4px solid #1E45E1",
                                    borderRight: "4px solid transparent",
                                    borderRadius: "50%",
                                    width: "40px",
                                    height: "40px",
                                    animation: "spin 1s linear infinite",
                                }}
                            ></div>
                        </div>
                    )}

                    <Modal.Footer style={{ border: "none" }}>
                        <Button disabled={formLoading}
                            className="w-100"
                            style={{
                                backgroundColor: "#1E45E1",
                                fontWeight: 500,
                                height: 50,
                                borderRadius: 12,
                                fontSize: 16,
                                fontFamily: "Gilroy",
                                marginTop: "-15px",
                            }}
                            onClick={handleSubmit}
                        >
                            {editSubCategory ? "Save Changes" : "+ Sub Category"}
                        </Button>
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
