/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { CloseCircle } from "iconsax-react";
import Select from "react-select";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from '../../../Components/ErrorMessage';

function LongStayRecurringModal({ handleClose, show }) {


    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [billingDate, setBillingDate] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [noticePeriod, setNoticePeriod] = useState(null);
    const [errors, setErrors] = useState({});
    const [formLoading, setFormLoading] = useState(false)


    const dayOptions = Array.from({ length: 31 }, (_, i) => ({
        value: (i + 1).toString().padStart(2, '0'),
        label: (i + 1).toString().padStart(2, '0'),
    }));

    const selectStyle = {
        control: (base) => ({
            ...base,
            height: 45,
            border: "1px solid #D9D9D9",
            borderRadius: "8px",
            fontSize: "16px",
            color: "#4B4B4B",
            fontFamily: "Gilroy",
            fontWeight: 500,
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
        option: (base, state) => ({
            ...base,
            cursor: "pointer",
            backgroundColor: state.isFocused
                ? "#1E45E1"
                : "white",
            color: state.isFocused
                ? "white"
                : "#222",
        }),
        indicatorSeparator: () => ({
            display: "none",
        }),
    };




    const handleSave = () => {
        dispatch({ type: 'REMOVE_BILLING_RULE_ERROR' })
        const newErrors = {};
        if (!billingDate) {
            newErrors.billingDate = "Please select billing date of month";
        }
        if (!dueDate) {
            newErrors.dueDate = "Please select due days";
        }
        if (!noticePeriod) {
            newErrors.notice = "Please select notice period";
        }


        //     if (billingDate && dueDate && Number(dueDate.value) < Number(billingDate.value)) {
        //     newErrors.dueDate = "Due date cannot be before billing date";
        // }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            dispatch({
                type: "SETTINGSADD_RECURRING",
                payload: {
                    hostelId: state?.login?.selectedHostel_Id || "",
                    startDate: Number(billingDate?.value) || 0,
                    dueDate: Number(dueDate?.value) || 0,
                    noticeDays: Number(noticePeriod?.value) || 0,
                }
            })
            setFormLoading(true)
        }
    };





    useEffect(() => {
        if (state.Settings.SettingsRecurringAddSuccess === 200) {
            setFormLoading(false)
            handleClose()
            dispatch({ type: "SETTINGS_GET_RECURRING", payload: { hostelId: state.login.selectedHostel_Id } });
            setTimeout(() => {
                dispatch({ type: "CLEAR_SETTINGSADDRECURRING_STATUS_CODE" });
            }, 100);
        }
    }, [state.Settings.SettingsRecurringAddSuccess]);


    useEffect(() => {
        if (state.createAccount?.networkError || state.Settings.billingRuleError) {
            setFormLoading(false)
            setTimeout(() => {
                dispatch({ type: 'CLEAR_NETWORK_ERROR' })

            }, 3000)
        }

    }, [state.createAccount?.networkError, state.Settings.billingRuleError])





    return (
        <>

            <Modal
                show={show}
                onHide={handleClose}
                centered
                backdrop="static"

            >


                <Modal.Header className="border-0 flex justify-between items-center">
                    <Modal.Title className="!text-lg !text-gray-900 !font-gilroy !font-semibold">
                        Long Stay Recurring
                    </Modal.Title>

                    <CloseCircle
                        size={24}
                        color="#000"
                        onClick={handleClose}
                        className="cursor-pointer"
                    />
                </Modal.Header>

                <Modal.Body className="pt-0 relative">

                    <div className="mb-3">
                        <label
                            htmlFor="billingDate"
                            className="block text-sm text-gray-800 font-gilroy font-medium mb-1"
                        >
                            Billing Date of Month{" "}
                            <span className="text-[#FF0000] text-xl">*</span>
                        </label>

                        <Select
                            id="billingDate"
                            options={dayOptions}
                            styles={selectStyle}
                            placeholder="Select Billing Date"
                            value={billingDate}
                            onChange={(selected) => {
                                setBillingDate(selected);
                                setErrors((prev) => ({ ...prev, billingDate: "" }));
                                dispatch({ type: "REMOVE_BILLING_RULE_ERROR" });
                            }}
                        />

                        {errors.billingDate && (
                            <ErrorMessage message={errors.billingDate} type="error" />
                        )}
                    </div>

                    <div className="mb-3">
                        <label
                            htmlFor="dueDate"
                            className="block text-sm text-gray-800 font-gilroy font-medium mb-1"
                        >
                            Due Days{" "}
                            <span className="text-[#FF0000] text-xl">*</span>
                        </label>

                        <Select
                            id="dueDate"
                            options={dayOptions}
                            styles={selectStyle}
                            placeholder="Select Due Days"
                            value={dueDate}
                            onChange={(selected) => {
                                setDueDate(selected);
                                setErrors((prev) => ({ ...prev, dueDate: "" }));
                                dispatch({ type: "REMOVE_BILLING_RULE_ERROR" });
                            }}
                        />

                        {errors.dueDate && (
                            <ErrorMessage message={errors.dueDate} type="error" />
                        )}
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="noticePeriod"
                            className="block text-sm text-gray-800 font-gilroy font-medium mb-1"
                        >
                            Notice Period{" "}
                            <span className="text-[#FF0000] text-xl">*</span>
                        </label>

                        <Select
                            id="noticePeriod"
                            options={dayOptions}
                            styles={selectStyle}
                            placeholder="Select Notice Period"
                            value={noticePeriod}
                            onChange={(selected) => {
                                setNoticePeriod(selected);
                                setErrors((prev) => ({ ...prev, notice: "" }));
                                dispatch({ type: "REMOVE_BILLING_RULE_ERROR" });
                            }}
                        />

                        {errors.notice && (
                            <ErrorMessage message={errors.notice} type="error" />
                        )}
                    </div>

                    {state.Settings.billingRuleError && (
                        <ErrorMessage
                            message={state.Settings.billingRuleError}
                            type="error"
                        />
                    )}

                    <div className="flex justify-end gap-2 mt-6">
                        <button
                            onClick={handleClose}
                            className="!border !border-[#4B4B4B] !rounded-xl px-9 py-2 !text-sm !font-gilroy 
                            !text-[#4B4B4B] bg-white"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSave}
                            className="!bg-[#1E45E1] !rounded-xl px-11 py-2 !text-sm !font-gilroy !text-white"
                        >
                            Save
                        </button>
                    </div>

                    {formLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-transparent opacity-75 z-10">
                            <div className="w-10 h-10 border-4 border-t-[#1E45E1] border-r-transparent rounded-full animate-spin"></div>
                        </div>
                    )}

                </Modal.Body>
            </Modal>
        </>
    );
}

LongStayRecurringModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.func.isRequired,


};
export default LongStayRecurringModal;
