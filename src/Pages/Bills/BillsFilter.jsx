/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Select from "react-select";
import { Button, Form, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { components } from "react-select";
import { FaCheck } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import ErrorMessage from '../../Components/ErrorMessage'

import { DatePicker } from "antd";
import dayjs from "dayjs";

function BillsFilter({ show, handleClose }) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [billStatus, setBillStatus] = useState([]);
    const [invoiceType, setInvoiceType] = useState([]);
    const [invoiceMode, setInvoiceMode] = useState([]);
    const [createdBy, setCreatedBy] = useState([]);
    const [period, setPeriod] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [tenantName, setTenantName] = useState("");
    const [selectedBillStatusOptions, setSelectedBillStatusOptions] = useState([]);
    const [dateError, setDateError] = useState("");
const [formLoading, setFormLoading] = useState(false)

    console.log("billStatus", billStatus)

    const CustomStyles = {
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



    const filterOptionsData = useSelector(
        (state) => state.InvoiceList?.billsList?.filterOptions
    );

    const billStatusOptions = [
        {
            label: "All",
            value: "ALL"
        },
        ...filterOptionsData?.paymentStatus?.map(item => ({
            label: item.name,
            value: item.type
        })) || []
    ]
        ;

    const typeOptions =
        filterOptionsData?.invoiceTypes?.map(item => ({
            label: item.name,
            value: item.type
        })) || [];

    const modeOptions =
        filterOptionsData?.invoiceModes?.map(item => ({
            label: item.name,
            value: item.mode
        })) || [];

    const createdByOptions =
        filterOptionsData?.createdBy?.map(item => ({
            label: item.name,
            value: item.userId
        })) || [];


    // const handleBillStatusChange = (selected) => {
    //     setBillStatus(selected.map(opt => opt.value))
    // };




    const handleBillStatusChange = (selectedOptions) => {
        if (!selectedOptions) {
            setSelectedBillStatusOptions([]);
            setBillStatus([]);
            return;
        }

        const hasAll = selectedOptions.some(opt => opt.value === "ALL");

        if (hasAll) {
            // If ALL is selected → keep ONLY ALL
            const allOption = selectedOptions.find(opt => opt.value === "ALL");
            setSelectedBillStatusOptions([allOption]);
            setBillStatus(["ALL"]);
        } else {
            // Normal multi-select (without ALL)
            setSelectedBillStatusOptions(selectedOptions);
            setBillStatus(selectedOptions.map(opt => opt.value));
        }
    };

useEffect(() => {
    if (state.InvoiceList.billsListStatusCode === 200) {
    setFormLoading(false)
    }
  }, [state.InvoiceList.billsListStatusCode]);


    useEffect(() => {
        const selectedOptions = billStatusOptions.filter(opt =>
            billStatus.includes(opt.value)
        );
        setSelectedBillStatusOptions(selectedOptions);
    }, [billStatus]);

    // const selectedBillStatusOptions =
    //     billStatusOptions.filter(opt =>
    //         billStatus.includes(opt.value)
    //     );

    const handleInvoiceTypeChange = (selected) => {
        setInvoiceType(selected.map(opt => opt.value));
    };

    const selectedTypeOptions = typeOptions.filter(opt =>
        invoiceType.includes(opt.value)
    );


    const handleInvoiceModeChange = (selected) => {
        setInvoiceMode(selected.map(opt => opt.value));
    };

    const selectedModeOptions = modeOptions.filter(opt =>
        invoiceMode.includes(opt.value)
    );


    const handleCreatedByChange = (selected) => {

        setCreatedBy(selected || []);
    };

    const selectedCreatedByOptions = createdBy;



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
    };

    const periodOptions = [
        { label: "This Month", value: "THIS_MONTH" },
        { label: "Last Month", value: "LAST_MONTH" },
        { label: "Last 3 Months", value: "LAST_3_MONTHS" },
        { label: "Custom", value: "CUSTOM" },
    ];



    // const filterOptions = [
    //     { type: "Cash", name: "Cash" },
    //     { type: "Bank", name: "Bank" },

    // ];

    // const selectOptions = filterOptions?.map(item => ({
    //     label: item.type,
    //     value: item.name,
    // }));

    console.log("state", state)

    const isAllSelectedDrop =
        selectedBillStatusOptions?.length === 1 &&
        selectedBillStatusOptions[0]?.value === "ALL";


    const handleFilterBills = () => {

        if ((!startDate && endDate)) {
            setDateError("Please Select Start Date");
            return;
        }
        setDateError("");


        const filters = {
            startDate: startDate ? startDate.format("DD/MM/YYYY") : undefined,
            endDate: endDate ? endDate.format("DD/MM/YYYY") : undefined,
            type: invoiceType,
            createdBy: createdBy.map(c => c.value),
            createdByLabels: createdBy.map(c => c.label),
            modes: invoiceMode,
            paymentStatus: billStatus,
            search: tenantName,
        };

        dispatch({
            type: "SET_INVOICE_FILTERS",
            payload: filters
        });


        if (state.login?.selectedHostel_Id) {
            const isAllSelected =
                Array.isArray(billStatus) &&
                billStatus.length === 1 &&
                billStatus[0] === "ALL";

            if (isAllSelected) {
                dispatch({
                    type: 'INVOICESLISTFILTER',
                    payload: {
                        hostelId: state.login?.selectedHostel_Id,
                    }
                })
                setFormLoading(true)
            } 
            else {
                dispatch({
                    type: 'INVOICESLISTFILTER',
                    payload: {
                        hostelId: state.login?.selectedHostel_Id,
                        filters: filters
                    }
                })
                setFormLoading(true)
            }



        }

    }

    return (
        <div>
            <Offcanvas
                show={show}
                onHide={handleClose}
                placement="end" backdrop="static"
            >
                <Offcanvas.Header >
                    <Offcanvas.Title style={{ color: "#222222", fontSize: 20, fontFamily: "Gilroy", fontWeight: 600 }}>Filter</Offcanvas.Title>


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
                                    Bill Status
                                </Form.Label>


                            </div>

                            <Select
                                isMulti
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                options={billStatusOptions}
                                value={selectedBillStatusOptions}
                                onChange={handleBillStatusChange}
                                styles={CustomStyles}
                                components={{ Option: CheckboxOption }}
                                placeholder="Select Status"
                                isOptionDisabled={(option) => isAllSelectedDrop && option.value !== "ALL"}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
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
                                    Type
                                </Form.Label>


                            </div>

                            <Select
                                styles={CustomStyles}
                                options={typeOptions}
                                value={selectedTypeOptions}
                                onChange={handleInvoiceTypeChange}
                                placeholder="Select Type"
                                components={{ Option: CheckboxOption }}
                                isMulti
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                            />





                        </Form.Group>

                        <Form.Group className="mb-3">
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
                                    Mode
                                </Form.Label>


                            </div>

                            <Select
                                styles={CustomStyles}
                                options={modeOptions}
                                value={selectedModeOptions}
                                onChange={handleInvoiceModeChange}
                                placeholder="Select Mode"
                                components={{ Option: CheckboxOption }}
                                isMulti
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                            />



                        </Form.Group>

                        <Form.Group className="mb-3">
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
                                    Created By
                                </Form.Label>


                            </div>

                            <Select
                                styles={CustomStyles}
                                options={createdByOptions}
                                value={selectedCreatedByOptions}
                                onChange={handleCreatedByChange}
                                placeholder="Select User"
                                components={{ Option: CheckboxOption }}
                                isMulti
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                            />







                        </Form.Group>

                        <Form.Group className="mb-3">
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
                                    Period
                                </Form.Label>


                            </div>

                            <Select
                                isSearchable={false}
                                options={periodOptions}
                                styles={CustomStyles}
                                placeholder="Select"
                                value={period}
                                onChange={(selected) => {
                                    setPeriod(selected);
                                    if (selected.value !== "CUSTOM") {
                                        setStartDate("");
                                        setEndDate("");
                                    }
                                }}
                            />
                        </Form.Group>

                        {period?.value === "CUSTOM" && (
                            <div style={{ display: "flex", gap: 12 }}>


                                <Form.Group style={{ flex: 1 }} className="mb-3">
                                    <Form.Label
                                        style={{
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                            fontSize: "12px",
                                            color: "#4B4B4B",
                                        }}
                                    >
                                        Start Date
                                    </Form.Label>

                                    <div className="datepicker-wrapper" style={{ position: "relative", width: "100%", fontSize: 12 }}>
                                        <DatePicker
                                            style={{ width: "100%", height: 39, cursor: "pointer", fontFamily: "Gilroy", fontSize: 12 }}
                                            format="DD/MM/YYYY"
                                            placeholder="Start Date"
                                            value={startDate ? dayjs(startDate) : null}
                                            onChange={(date) => {
                                                setStartDate(date);
                                                setEndDate(null);
                                                setDateError('')
                                            }}
                                            disabledDate={(current) =>
                                                current && current > dayjs().endOf("day")
                                            }
                                            getPopupContainer={(triggerNode) =>
                                                triggerNode.closest(".datepicker-wrapper")
                                            }
                                        />
                                    </div>

                                    {dateError && <ErrorMessage message={dateError} type="error" />}

                                </Form.Group>


                                <Form.Group style={{ flex: 1 }}>
                                    <Form.Label
                                        style={{
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                            fontSize: "12px",
                                            color: "#4B4B4B",
                                        }}
                                    >
                                        End Date
                                    </Form.Label>

                                    <div className="datepicker-wrapper" style={{ position: "relative", width: "100%" }}>
                                        <DatePicker
                                            style={{ width: "100%", height: 39, cursor: "pointer", fontFamily: "Gilroy", fontSize: 12 }}
                                            format="DD/MM/YYYY"
                                            placeholder="End Date"
                                            value={endDate ? dayjs(endDate) : null}
                                            onChange={(date) => setEndDate(date)}
                                            disabledDate={(current) =>
                                                current &&
                                                (
                                                    current > dayjs().endOf("day") ||
                                                    (startDate && current < dayjs(startDate).startOf("day"))
                                                )
                                            }
                                            getPopupContainer={(triggerNode) =>
                                                triggerNode.closest(".datepicker-wrapper")
                                            }
                                        />
                                    </div>

                                </Form.Group>

                            </div>
                        )}

                        {/* <div className='mb-3'>
                            <label style={{ color: "#222222", fontSize: 15, fontWeight: 600 }}>Other Filter</label>
                        </div>

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
                                    Amount Range
                                </Form.Label>


                            </div>
                            <div className='d-flex gap-2'>
                                <Form.Control
                                    style={{ marginTop: 10, fontSize: 14, fontWeight: 600, padding: "8px 14px", fontFamily: "Gilroy", boxShadow: "none", border: "1px solid #D9D9D9" }}
                                    type="number"
                                    placeholder="₹Min"


                                />
                                <Form.Control
                                    style={{ marginTop: 10, fontSize: 14, fontWeight: 600, padding: "8px 14px", fontFamily: "Gilroy", boxShadow: "none", border: "1px solid #D9D9D9" }}
                                    type="number"
                                    placeholder="₹Max"


                                />


                            </div>


                        </Form.Group>

                        <Form.Group className="mb-3">
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
                                    Payment mode
                                </Form.Label>


                            </div>

                            <Select
                                options={selectOptions}
                                styles={CustomStyles}
                                placeholder="Select Payment Mode"
                            />
                        </Form.Group> */}
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

export default BillsFilter