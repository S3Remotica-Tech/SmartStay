/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { CloseCircle } from "iconsax-react";
import ErrorMessage from "../../Components/ErrorMessage";
import { useHasPermission } from "../../Utils/Permission";

function AddCategory({ show, handleCloseForm, editCategory }) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    const [category, setCategory] = useState("");
    const [categoryError, setCategoryError] = useState("");
    const [formLoading, setFormLoading] = useState(false);
    //   const [formError, setFormError] = useState("");

    const inputRef = useRef(null);

    console.log("editCategory", editCategory)

    useEffect(() => {
        if (editCategory) {
            setCategory(editCategory?.categoryName)
        }

    }, [editCategory])


    const focusInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };


    const handleCategoryAdd = (e) => {
        const value = e.target.value;

        setCategory(value);

        if (!value.trim()) {
            setCategoryError("Please enter category");
        } else {
            setCategoryError("");
        }
    };

    const handleSubmit = () => {
        dispatch({ type: "CLEAR_ALREADY_EXPENCE_CATEGORY_ERROR" });

        if (!category.trim()) {
            setCategoryError("Please enter category");
            focusInput();
            return;
        }
        if (editCategory) {


        } else {
            dispatch({
                type: "EXPENCES-CATEGORY-ADD",
                payload: {
                    hostelId: state.login.selectedHostel_Id,
                    categoryName: category.trim(),
                },
            });

            setFormLoading(true);
        }

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
                <Modal.Dialog
                    style={{ maxWidth: 950, paddingRight: "10px", borderRadius: "30px" }}
                    className="m-0 p-0"
                >
                    <Modal.Header style={{ position: "relative" }}>
                        <div style={{ fontSize: 20, fontWeight: 600, fontFamily: "Gilroy" }}>
                            {editCategory ? "Edit Category" : "Add Category"}
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
                                        Category{" "}
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
                                        placeholder="Enter Category"
                                        value={category}
                                        onChange={handleCategoryAdd}
                                    />

                                    {categoryError && (
                                        <ErrorMessage message={categoryError} type="error" />
                                    )}
                                </Form.Group>
                            </div>

                            {/* {formError && <ErrorMessage message={formError} type="error" />} */}
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
                        <Button
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
                            {editCategory ? "Save Changes" : "+ Category"}
                        </Button>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </div>
    );
}

export default AddCategory;
