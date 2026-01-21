/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Select from "react-select";
import { Button, Form, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { components } from "react-select";
import { FaCheck } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
// import ErrorMessage from '../../Components/ErrorMessage'
import PropTypes from "prop-types";
import { Filter } from 'iconsax-react'


function ExpenseFilter({ show, handleClose }) {
    // const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [tenantStatus, setTenantStatus] = useState(null);
    const [period, setPeriod] = useState(null);
    const [sharingType, setSharingType] = useState(null);
    const [floor, setFloor] = useState(null);
    const [room, setRoom] = useState(null);
    const [tenantName, setTenantName] = useState("");
    const [formLoading, setFormLoading] = useState(false)



    const selectStyles = {
        control: (base) => ({
            ...base,
            height: "auto",
            border: "1px solid #D9D9D9",
            borderRadius: "8px",
            fontSize: "14px",
            color: "#4B4B4B",
            fontFamily: "Gilroy, sans-serif",
            fontWeight: 500,
            boxShadow: "none",
            outline: "none",
            "&:hover": {
                border: "1px solid #D9D9D9",
            },
        }),
        valueContainer: (base) => ({
            ...base,
            maxHeight: "60px",
            overflowY: "auto",
            flexWrap: "wrap",
        }), multiValue: (base) => ({
            ...base,
            backgroundColor: "#FFF",
            borderRadius: "6px",
        }),

        multiValueLabel: (base) => ({
            ...base,
            fontSize: "12px",
            fontWeight: 600,
            color: "#000000",
        }),

        multiValueRemove: (base) => ({
            ...base,
            cursor: "pointer",
            borderRadius: 10,
            color: "#FF0000",
            ":hover": {
                color: "#FF0000",
            },
        }),

        menu: (base) => ({
            ...base,
            backgroundColor: "#f8f9fa",
            border: "1px solid #ced4da",
            fontFamily: "Gilroy, sans-serif", fontSize: "14px",
        }),
        menuList: (base) => ({
            ...base,
            backgroundColor: "#f8f9fa",
            maxHeight: "120px",
            padding: 0,
            scrollbarWidth: "thin",
            overflowY: "auto",
            fontFamily: "Gilroy, sans-serif", fontSize: "14px",
        }),
        placeholder: (base) => ({
            ...base,
            color: "#555",
        }),
        option: (base, state) => ({
            ...base,
            cursor: "pointer",
            backgroundColor: state.isFocused ? "" : "white",
            color: "#000",
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: "#555",
            cursor: "pointer"
        }),
        indicatorSeparator: () => ({
            display: "none",
        }), clearIndicator: () => ({
            display: "none",
        }),
    }



    // const filterOptionsData = useSelector(
    //     (state) => state.InvoiceList?.billsList?.filterOptions
    // );


















    const handleTenantChange = (e) => {
        setTenantName(e.target.value);
    };




    const CheckboxOption = (props) => {
        const { isSelected, label } = props;


        return (
            <components.Option {...props}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>


                    <div
                        style={{
                            width: 16,
                            height: 16,
                            borderRadius: 4,
                            border: "1px solid #A1A1AA",
                            backgroundColor: isSelected ? "#16a34a" : "#fff",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {isSelected && (
                            <span
                                style={{
                                    color: "#fff",
                                    fontSize: 12,
                                    fontWeight: "bold",
                                }}
                            >
                                <FaCheck />
                            </span>
                        )}
                    </div>

                    <span style={{ fontSize: 12, color: "#222222" }}>{label}</span>
                </div>
            </components.Option>
        );
    }
    CheckboxOption.propTypes = {
        isSelected: PropTypes.bool.isRequired,
        label: PropTypes.string.isRequired,
    };








    const handleFilterBills = () => {

    }






    return (
        <div>
            <Offcanvas
                show={show}
                onHide={handleClose}
                placement="end" backdrop="static"
            >
                <Offcanvas.Header >
                    <Offcanvas.Title style={{ color: "#222222", fontSize: 20, fontFamily: "Gilroy", fontWeight: 600, display: "flex", alignItems: "center" }}> <Filter className='me-2' size="20" color="#364153" />Filter</Offcanvas.Title>


                    <IoCloseOutline onClick={handleClose} style={{ color: "#FF0000", fontSize: 20, cursor: "pointer" }} />
                </Offcanvas.Header>

                <Offcanvas.Body className='pt-0'>
                    <div className="mb-3" style={{ fontFamily: "Gilroy" }}>


                        <Form.Group className="mt-2 mb-3">
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '100%',
                                    marginBottom: 5
                                }}
                            >
                                <Form.Label
                                    style={{
                                        fontFamily: 'Gilroy',
                                        fontWeight: 500,
                                        fontStyle: 'normal',
                                        fontSize: '12px',
                                        letterSpacing: '0',
                                        marginBottom: 0,
                                        padding: 0, color: "#4B4B4B"

                                    }}
                                >
                                    Tenant
                                </Form.Label>


                            </div>

                            <Form.Control
                                style={{ marginTop: 10, fontSize: 14, fontWeight: 600, padding: "8px 14px", fontFamily: "Gilroy", boxShadow: "none", border: "1px solid #D9D9D9" }}
                                type="text"
                                placeholder="Enter Tenant Name"

                                value={tenantName}
                                onChange={handleTenantChange}
                            />






                        </Form.Group>


                        <div className='mb-3'>
                            <label style={{ color: "#222222", fontSize: 15, fontWeight: 600 }}>System Filter</label>
                        </div>
 <Form.Group className="mb-3">
          <Form.Label className="text-muted" style={{ fontSize: 12 }}>
            Category
          </Form.Label>
          <Select
            styles={selectStyles}
            value={category}
            onChange={setCategory}
            options={[{ label: "Electricity", value: "electricity" }]}
            placeholder="Select"
          />
        </Form.Group>

        {/* Period */}
        <Form.Group className="mb-3">
          <Form.Label className="text-muted" style={{ fontSize: 12 }}>
            Period
          </Form.Label>
          <Select
            styles={selectStyles}
            value={period}
            onChange={setPeriod}
            options={[{ label: "Last Month", value: "last_month" }]}
            placeholder="Select"
          />
        </Form.Group>

        {/* Payment Mode */}
        <Form.Group className="mb-3">
          <Form.Label className="text-muted" style={{ fontSize: 12 }}>
            Payment Mode
          </Form.Label>
          <Select
            styles={selectStyles}
            value={paymentMode}
            onChange={setPaymentMode}
            options={[{ label: "Cash", value: "cash" }]}
            placeholder="Select"
          />
        </Form.Group>

        {/* Paid To */}
        <Form.Group className="mb-3">
          <Form.Label className="text-muted" style={{ fontSize: 12 }}>
            Paid To
          </Form.Label>
          <Select
            styles={selectStyles}
            value={paidTo}
            onChange={setPaidTo}
            options={[{ label: "Vendor", value: "vendor" }]}
            placeholder="Select"
          />
        </Form.Group>

        {/* Created By */}
        <Form.Group className="mb-3">
          <Form.Label className="text-muted" style={{ fontSize: 12 }}>
            Created By
          </Form.Label>
          <Select
            styles={selectStyles}
            value={createdBy}
            onChange={setCreatedBy}
            options={[{ label: "Admin", value: "admin" }]}
            placeholder="Select"
          />
        </Form.Group>
                    </div>
                </Offcanvas.Body>



                {formLoading && <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'transparent',
                        opacity: 0.75,
                        zIndex: 10,
                    }}
                >
                    <div
                        style={{
                            borderTop: '4px solid #1E45E1',
                            borderRight: '4px solid transparent',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px',
                            animation: 'spin 1s linear infinite',
                        }}
                    ></div>
                </div>}



                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "15px 20px",
                    borderTop: "1px solid #e0e0e0",
                    position: "sticky",
                    bottom: 0,
                    background: "#fff",
                    zIndex: 10
                }}>
                    <Button
                        onClick={() => {
                            setBillStatus([]);
                            setInvoiceType([]);
                            setInvoiceMode([]);
                            setCreatedBy([]);
                        }}
                        style={{
                            backgroundColor: "transparent",
                            border: "1px solid #D9D9D9",
                            color: "black",
                            fontFamily: "Gilroy",
                            width: "48%"
                        }}
                    >
                        Reset
                    </Button>
                    <Button

                        onClick={handleFilterBills}
                        style={{
                            backgroundColor: "#1E45E1",
                            width: "48%",
                            fontFamily: "Gilroy"
                        }}
                    >
                        Apply
                    </Button>
                </div>


            </Offcanvas></div>
    )
}
ExpenseFilter.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default ExpenseFilter