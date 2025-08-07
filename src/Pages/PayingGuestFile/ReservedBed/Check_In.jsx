
import React, { useState, useEffect } from "react";

import {
    Modal,
    Form,
    Button,
   } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "../../../Pages/AssetFile/addAsset.css";
import { CloseCircle ,Trash } from "iconsax-react";
import PropTypes from "prop-types";
import Select from "react-select";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import addcircle from "../../../Assets/Images/New_images/add-circle.png";

function CheckIn({
    show,
    handleClose,
}) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [checkOutDate, setCheckOutDate] = useState("");
    const [joiningDate, setJoiningDate] = useState(null);
    const [fields, setFields] = useState([]);
    const [errors, setErrors] = useState([]);

    console.log("state", state)

    const customStyles = {
        control: (base) => ({
            ...base,
            height: "48px",
            border: "1px solid #D9D9D9",
            borderRadius: "8px",
            fontSize: "16px",
            color: "#4B4B4B",
            fontFamily: "Gilroy",
            fontWeight: 500,
            boxShadow: "none",
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: "#f8f9fa",
            border: "1px solid #ced4da",
            fontFamily: "Gilroy",
        }),
        menuList: (base) => ({
            ...base,
            backgroundColor: "#f8f9fa",
            maxHeight: "120px",
            padding: 0,
            scrollbarWidth: "thin",
            overflowY: "auto",
            fontFamily: "Gilroy",
        }),
        placeholder: (base) => ({
            ...base,
            color: "#555",
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: "#555",
            display: "inline-block",
            fill: "currentColor",
            lineHeight: 1,
            stroke: "currentColor",
            strokeWidth: 0,
            cursor: "pointer"
        }),
        indicatorSeparator: () => ({
            display: "none",
        }),
        option: (base, state) => ({
            ...base,
            cursor: "pointer",
            backgroundColor: state.isFocused ? "#f0f0f0" : "white",
            color: "#000",
        }),
    };


    useEffect(() => {
        if (state.login.selectedHostel_Id) {
            dispatch({
                type: "USERLIST",
                payload: { hostel_id: state.login.selectedHostel_Id },
            });
        }
    }, [state.login.selectedHostel_Id]);


    const formatOptions = () => {
        return state.UsersList?.Users?.map((user) => ({
            value: user.ID,
            label: (
                <div className="d-flex align-items-center">
                    <span>{user.Name}</span>
                </div>
            ),
        }));
    };



    const reasonOptions = [
        { value: "maintenance", label: "Maintenance" },
        { value: "others", label: "Others" },
    ];


    const handleAddField = () => {
        setFields([...fields, { reason_name: "", amount: "", showInput: false }]);

        dispatch({ type: "CLEAR_EDIT_CONFIRM_CHECKOUT_CUSTOMER_ERROR" });
    };





    const handleInputChange = (index, field, value) => {

        const updatedFields = [...fields];
        const updatedErrors = [...errors];

        if (field === "reason") {
            if (value === "others") {
                updatedFields[index].showInput = true;
                updatedFields[index].reason_name = "others";
                updatedFields[index].customReason = "";
            } else {
                updatedFields[index].showInput = false;
                updatedFields[index].reason = value;
                updatedFields[index].reason_name = value;
                updatedFields[index].customReason = "";
            }


            if (updatedErrors[index]) updatedErrors[index].reason = "";
        } else if (field === "customReason") {
            updatedFields[index].customReason = value;
            if (updatedErrors[index]) updatedErrors[index].reason = "";
        } else if (field === "amount") {
            updatedFields[index].amount = value;


            if (updatedErrors[index]) updatedErrors[index].amount = "";
        }

        setFields(updatedFields);
        setErrors(updatedErrors);
    };



    const handleRemoveField = (index) => {
        const updatedFields = [...fields];
        updatedFields.splice(index, 1);
        setFields(updatedFields);

        dispatch({ type: "CLEAR_EDIT_CONFIRM_CHECKOUT_CUSTOMER_ERROR" });
    };



    return (
        <>



            <div
                className="modal show"
                style={{
                    display: "block",
                    position: "initial",
                    fontFamily: "Gilroy,sans-serif",
                }}
            >
                <Modal show={show} onHide={handleClose} centered
                    backdrop="static"
                >
                    <Modal.Dialog
                        style={{ maxWidth: "100%", width: "100%", borderRadius: 16 }}
                        className="m-0 p-0"
                    >
                        <Modal.Header className="pb-0"
                            style={{ border: "none" }}
                        >

                            <div className="d-flex justify-content-between w-100" style={{ padding: "5px  10px 5px 5px" }}>
                                <div>
                                    <div>
                                        <Modal.Title
                                            style={{
                                                fontSize: 18,
                                                color: "#222222",
                                                fontFamily: "Gilroy",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Check-In Tenant
                                        </Modal.Title>
                                    </div>
                                    <div>
                                        <label style={{
                                            fontSize: 14,
                                            color: "#1E45E1",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}>Room No G3 </label> <vr /> <span style={{
                                            fontSize: 14,
                                            color: "#1E45E1",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}> Bed 9</span>
                                    </div>
                                </div>


                            </div>




                            <CloseCircle size="24" color="#000" onClick={handleClose} style={{ cursor: "pointer" }} />
                        </Modal.Header>
                        <Modal.Body style={{ maxHeight: "370px", overflowY: "scroll" }} className="show-scrolls pt-0 mt-1 me-3">
                            <div className="row mt-1">


                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <Form.Group
                                        className="mb-2"
                                        controlId="exampleForm.ControlInput1"
                                    >
                                        <Form.Label
                                            style={{
                                                fontSize: 14,
                                                color: "#222222",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                            }}
                                        >
                                            Select Tenant {" "}

                                        </Form.Label>
                                        <Select
                                            styles={customStyles}
                                            //   value={formatOptions().find(
                                            //     (opt) => opt.value === selectedCustomer
                                            //   )}
                                            //   onChange={handleCustomerChange}
                                            options={formatOptions()}
                                            placeholder="Select a Tenant"
                                            classNamePrefix="custom"
                                            menuPlacement="auto"


                                        />
                                    </Form.Group>


                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <Form.Group className="mb-2" controlId="purchaseDate">
                                        <Form.Label
                                            style={{
                                                fontSize: 14,
                                                color: "#222222",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                            }}
                                        >
                                            Booking Date {" "}

                                        </Form.Label>



                                        <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>

                                            <DatePicker
                                                style={{
                                                    width: "100%",
                                                    height: 48,
                                                    cursor: "pointer",
                                                    fontFamily: "Gilroy",
                                                }}
                                                format="DD/MM/YYYY"
                                                placeholder="DD/MM/YYYY"
                                                value={checkOutDate ? dayjs(checkOutDate) : null}
                                                onChange={(date) => {
                                                    setCheckOutDate(date ? date.toDate() : null);
                                                }}

                                                getPopupContainer={() => document.body}
                                            />

                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <Form.Group
                                        className="mb-2"
                                        controlId="exampleForm.ControlInput1"
                                    >
                                        <Form.Label
                                            style={{
                                                fontSize: 14,
                                                color: "#222222",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                            }}
                                        >
                                            Booking Amount

                                        </Form.Label>
                                        <Form.Control

                                            type="text"
                                            placeholder="Enter Booking Amount"
                                            style={{
                                                fontSize: 16,
                                                color: "#4B4B4B",
                                                fontFamily: "Gilroy",
                                                fontWeight: 600,
                                                boxShadow: "none",
                                                border: "1px solid #D9D9D9",
                                                height: 50,
                                                borderRadius: 8,
                                            }}
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <Form.Group
                                        className="mb-2"
                                        controlId="exampleForm.ControlInput1"
                                    >
                                        <Form.Label
                                            style={{
                                                fontSize: 14,
                                                color: "#222222",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                            }}
                                        >
                                            Stay Type {" "}

                                        </Form.Label>
                                        <Select
                                            styles={customStyles}
                                            options={[
                                                { value: 'long_stay', label: 'Long Stay' },
                                                { value: 'short_stay', label: 'Short Stay' }
                                            ]}
                                            placeholder="Select a Type"
                                            classNamePrefix="custom"
                                            menuPlacement="auto"
                                        />

                                    </Form.Group>


                                </div>

                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <Form.Group
                                        className="mb-2"
                                        controlId="exampleForm.ControlInput1"
                                    >
                                        <Form.Label
                                            style={{
                                                fontSize: 14,
                                                color: "#222222",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                            }}
                                        >
                                            Rental Amount

                                        </Form.Label>
                                        <Form.Control

                                            type="text"
                                            placeholder="Enter Rental Amount"
                                            style={{
                                                fontSize: 16,
                                                color: "#4B4B4B",
                                                fontFamily: "Gilroy",
                                                fontWeight: 600,
                                                boxShadow: "none",
                                                border: "1px solid #D9D9D9",
                                                height: 50,
                                                borderRadius: 8,
                                            }}
                                        />
                                    </Form.Group>
                                </div>



                                <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                                    <Form.Group
                                        className="mb-2"
                                        controlId="exampleForm.ControlInput1"
                                    >
                                        <Form.Label
                                            style={{
                                                fontSize: 14,
                                                color: "#222222",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                            }}
                                        >
                                            Advance Amount

                                        </Form.Label>
                                        <Form.Control

                                            type="text"
                                            placeholder="Enter   Advance Amount"
                                            style={{
                                                fontSize: 16,
                                                color: "#4B4B4B",
                                                fontFamily: "Gilroy",
                                                fontWeight: 600,
                                                boxShadow: "none",
                                                border: "1px solid #D9D9D9",
                                                height: 50,
                                                borderRadius: 8,
                                            }}
                                        />
                                    </Form.Group>
                                </div>

                                <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                    <Form.Group className="mb-2" controlId="joiningDate">
                                        <Form.Label
                                            style={{
                                                fontSize: 14,
                                                color: "#222222",
                                                fontFamily: "Gilroy",
                                                fontWeight: 500,
                                            }}
                                        >
                                            Joining Date
                                        </Form.Label>

                                        <div className="datepicker-wrapper" style={{ position: 'relative', width: "100%" }}>
                                            <DatePicker
                                                style={{
                                                    width: "100%",
                                                    height: 48,
                                                    cursor: "pointer",
                                                    fontFamily: "Gilroy",
                                                }}
                                                format="DD/MM/YYYY"
                                                placeholder="DD/MM/YYYY"
                                                value={joiningDate ? dayjs(joiningDate) : null}
                                                onChange={(date) => {
                                                    setJoiningDate(date ? date.toDate() : null);
                                                }}
                                                getPopupContainer={() => document.body}
                                            />
                                        </div>
                                    </Form.Group>
                                </div>

                                <div className="col-lg-12 col-md-12 col-sm-12">

                                    <div style={{ backgroundColor: "#F7F9FF", borderRadius: 10, paddingBottom: 5 }} className="mt-1 mb-2">

                                        <div className="d-flex justify-content-between align-items-center p-2">
                                            <div>
                                                <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>Non Refundable Amount</label>
                                            </div>
                                            <div>
                                                <Button
                                                    onClick={handleAddField}
                                                    style={{
                                                        fontFamily: "Gilroy",
                                                        fontSize: "14px",
                                                        backgroundColor: "#1E45E1",
                                                        color: "white",
                                                        fontWeight: 600,
                                                        borderRadius: "10px",
                                                        padding: "6px 15px",
                                                        marginBottom: "10px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: "6px",
                                                    }}
                                                >
                                                    <img
                                                        src={addcircle}
                                                        alt="Assign Bed"
                                                        style={{
                                                            height: 16,
                                                            width: 16,
                                                            filter: "brightness(0) invert(1)",
                                                        }}
                                                    />
                                                    Add
                                                </Button>

                                            </div>
                                        </div>


                                        {fields.map((item, index) => {
                                            const isMaintenanceSelected = fields.some((field) => field.reason === "maintenance");

                                            const filteredOptions = reasonOptions.map((opt) => {
                                                if (opt.value === "maintenance") {
                                                    return {
                                                        ...opt,
                                                        isDisabled: isMaintenanceSelected && item.reason !== "maintenance",
                                                    };
                                                }
                                                return opt;
                                            });

                                            return (
                                                <div className="row px-4 mb-3" key={index}>
                                                    <div className="col-md-6">


                                                        {!item.showInput ? (
                                                            <Select
                                                                options={filteredOptions}
                                                                value={filteredOptions.find((opt) => opt.value === item.reason_name) || null}
                                                                onChange={(selectedOption) => {
                                                                    const selectedValue = selectedOption.value;

                                                                    if (selectedValue === "others") {
                                                                        handleInputChange(index, "reason", "others");
                                                                    } else {
                                                                        handleInputChange(index, "reason", selectedValue);
                                                                    }
                                                                }}
                                                                isDisabled={item.reason === "maintenance"}
                                                                menuPlacement="auto"
                                                                styles={{
                                                                    control: (base) => ({
                                                                        ...base,
                                                                        height: "50px",
                                                                        border: "1px solid #D9D9D9",
                                                                        borderRadius: "8px",
                                                                        fontSize: "16px",
                                                                        color: "#4B4B4B",
                                                                        fontFamily: "Gilroy",
                                                                        fontWeight: 500,
                                                                        boxShadow: "none",
                                                                    }),
                                                                    menu: (base) => ({
                                                                        ...base,
                                                                        backgroundColor: "#f8f9fa",
                                                                        border: "1px solid #ced4da",
                                                                        fontFamily: "Gilroy",
                                                                    }),
                                                                    menuList: (base) => ({
                                                                        ...base,
                                                                        backgroundColor: "#f8f9fa",
                                                                        maxHeight: "120px",
                                                                        padding: 0,
                                                                        scrollbarWidth: "thin",
                                                                        overflowY: "auto",
                                                                        fontFamily: "Gilroy",
                                                                    }),
                                                                    placeholder: (base) => ({
                                                                        ...base,
                                                                        color: "#555",
                                                                    }),
                                                                    dropdownIndicator: (base) => ({
                                                                        ...base,
                                                                        color: "#555",
                                                                        display: "inline-block",
                                                                        fill: "currentColor",
                                                                        lineHeight: 1,
                                                                        stroke: "currentColor",
                                                                        strokeWidth: 0,
                                                                        cursor: "pointer",
                                                                    }),
                                                                    indicatorSeparator: () => ({
                                                                        display: "none",
                                                                    }),
                                                                    option: (base, state) => ({
                                                                        ...base,
                                                                        cursor: state.isDisabled ? "not-allowed" : "pointer",
                                                                        backgroundColor: state.isDisabled ? "#f0f0f0" : "white",
                                                                        color: state.isDisabled ? "#aaa" : "#000",
                                                                    }),
                                                                }}
                                                            />
                                                        ) : (
                                                            <>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    placeholder="Enter custom reason"
                                                                    value={item.customReason}
                                                                    onChange={(e) => handleInputChange(index, "customReason", e.target.value)}
                                                                    style={{
                                                                        fontSize: 16,
                                                                        color: "#4B4B4B",
                                                                        fontFamily: "Gilroy",
                                                                        fontWeight: 500,
                                                                        boxShadow: "none",
                                                                        border: "1px solid #D9D9D9",
                                                                        height: 50,
                                                                        borderRadius: 8,
                                                                    }}
                                                                />
                                                            </>
                                                        )}
                                                        {errors[index]?.reason && (
                                                            <div className="d-flex align-items-center mt-1">
                                                                <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px" }} />
                                                                <label
                                                                    className="mb-0"
                                                                    style={{
                                                                        color: "red",
                                                                        fontSize: "12px",
                                                                        fontFamily: "Gilroy",
                                                                        fontWeight: 500,
                                                                    }}
                                                                >
                                                                    {errors[index]?.reason}
                                                                </label>
                                                            </div>
                                                        )}
                                                    </div>


                                                    <div className="col-md-5">

                                                        <input
                                                            type="text"
                                                            placeholder="Enter amount"
                                                            value={item.amount}
                                                            onChange={(e) => handleInputChange(index, "amount", e.target.value)}
                                                            className="form-control"
                                                            style={{
                                                                fontSize: 16,
                                                                color: "#4B4B4B",
                                                                fontFamily: "Gilroy",
                                                                fontWeight: 500,
                                                                boxShadow: "none",
                                                                border: "1px solid #D9D9D9",
                                                                height: 50,
                                                                borderRadius: 8,
                                                            }}

                                                        />
                                                        {errors[index]?.amount && (
                                                            <div className="d-flex align-items-center mt-1">
                                                                <MdError style={{ color: "red", marginRight: "5px", fontSize: "14px" }} />
                                                                <label
                                                                    className="mb-0"
                                                                    style={{
                                                                        color: "red",
                                                                        fontSize: "12px",
                                                                        fontFamily: "Gilroy",
                                                                        fontWeight: 500,
                                                                    }}
                                                                >
                                                                    {errors[index]?.amount}
                                                                </label>
                                                            </div>
                                                        )}
                                                    </div>


                                                    <div className="col-md-1 d-flex justify-content-center align-items-center p-0">

                                                        {index !== 0 && (
                                                            <Trash
                                                                size="20"
                                                                color="red"
                                                                variant="Bold"
                                                                style={{ cursor: "pointer" }}
                                                                onClick={() => handleRemoveField(index)}
                                                            />
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}




                                    </div>
                                </div>

                            </div>
                        </Modal.Body>







                        <Modal.Footer style={{ border: "none", paddingTop: 0 }}>
                            <div className="d-flex justify-content-end gap-3">


                                <Button
                                    onClick={handleClose}
                                    className="w-100 mt-1"
                                    style={{
                                        backgroundColor: "#fff",
                                        border: "none",
                                        color: "#1E45E1",
                                        fontWeight: 600,
                                        borderRadius: 12,
                                        fontSize: 16,
                                        fontFamily: "Gilroy",
                                        padding: "8px 40px"
                                    }}
                                >
                                    Cancel
                                </Button>

                                <Button

                                    className="w-100 mt-1"
                                    style={{
                                        backgroundColor: "#1E45E1",
                                        fontWeight: 600,
                                        borderRadius: 12,
                                        fontSize: 16,
                                        fontFamily: "Gilroy",
                                        padding: "8px 40px"
                                    }}
                                >
                                    Update
                                </Button>
                            </div>
                        </Modal.Footer>
                    </Modal.Dialog>
                </Modal>
            </div>

        </>
    )
}
CheckIn.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.func.isRequired,

}
export default CheckIn;
