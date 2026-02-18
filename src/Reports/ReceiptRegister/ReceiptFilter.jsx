


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


function ReceiptFilter({ show, handleClose, size, page, startDate, endDate }) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();


    const [selectedInvoiceType, setSelectedInvoiceType] = useState([]);
    const [selectedPeriod, setSelectedPeriod] = useState(null);
    const [selectedPaymentMode, setSelectedPaymentMode] = useState([]);
    const [selectedCollectedBy, setSelectedCollectedBy] = useState([]);
    const [selectedCollectedBylabels, setSelectedCollectedBylabels] = useState([]);
    const [formLoading, setFormLoading] = useState(false)

    console.log("selectedCollectedBylabels", selectedCollectedBylabels)

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


    const filterOptionsData = useSelector(
        (state) => state?.reports?.getReceiptRegister?.filters
    );




    const typeOptions =
        filterOptionsData?.invoiceType?.map(item => ({
            label: item.label,
            value: item.id
        })) || [];



    const periodOptions =
        filterOptionsData?.period?.map(item => ({
            label: item.label,
            value: item.id
        })) || [];


    const paymentModeOptions =
        filterOptionsData?.paymentMode?.map(item => ({
            label: item.label,
            value: item.id
        })) || [];


    const collectedByOptions =
        filterOptionsData?.collectedBy?.map(item => ({
            label: item.user_name,
            value: item.user_id
        })) || [];


    const handleInvoiceTypeChange = (selected) => {
        setSelectedInvoiceType(selected.map(opt => opt.value));
    };

    const selectedTypeOptions = typeOptions.filter(opt =>
        selectedInvoiceType.includes(opt.value)
    );



    const handlePaymentModeChange = (selected) => {
        setSelectedPaymentMode(selected.map(opt => opt.value));
    };

    const selectedPaymentModeOptions = paymentModeOptions.filter(opt =>
        selectedPaymentMode.includes(opt.value)
    );

    const handleCollectedByChange = (selected) => {
        setSelectedCollectedBy(selected.map(opt => opt.value));
        setSelectedCollectedBylabels(selected.map(opt => opt.label))
    };

    const selectedCollectedByOptions = collectedByOptions.filter(opt =>
        selectedCollectedBy.includes(opt.value)
    );



    const handlePeriodChange = (selected) => {
        setSelectedPeriod(selected);
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


        if (!state.login?.selectedHostel_Id) return;

        const ReceiptFilter = {
            invoiceType: selectedInvoiceType?.length
                ? selectedInvoiceType
                : undefined,

            paymentMode: selectedPaymentMode?.length
                ? selectedPaymentMode
                : undefined,

            collectedBy: selectedCollectedBy?.length
                ? selectedCollectedBy
                : undefined,

            period: selectedPeriod?.value
                ? selectedPeriod.value
                : "",
            createdByLabels: selectedCollectedBylabels,

            page: page,
            size: size,
            startDate: selectedPeriod?.value ? undefined : startDate,
        endDate: selectedPeriod?.value ? undefined : endDate,
        };


        dispatch({
            type: "SET_RECEIPT_REGISTER_FILTERS",
            payload: ReceiptFilter
        });

        console.log("ReceiptFilter", ReceiptFilter)

        const hasFilters = Object.values(ReceiptFilter).some(
            v => v !== undefined && v !== "" && v !== 0
        );

        if (!hasFilters) return;

        dispatch({
            type: "GET_REPORTS_RECEIPT_REGISTER_SAGA",
            payload: {
                hostelId: state.login.selectedHostel_Id,
                filters: ReceiptFilter
            }
        });

        setFormLoading(true);
    };


 useEffect(() => {
        if (state.createAccount?.networkError) {
            setFormLoading(false);
            setTimeout(() => {
                dispatch({ type: 'CLEAR_NETWORK_ERROR' })
            }, 3000)
        }

    }, [state.createAccount?.networkError])



    return (
        <div>
            <Offcanvas
                show={show}
                onHide={handleClose}
                placement="end" 
            >
                <Offcanvas.Header >
                    <Offcanvas.Title style={{ color: "#222222", fontSize: 20, fontFamily: "Gilroy", fontWeight: 600, display: "flex", alignItems: "center" }}> <Filter className='me-2' size="20" color="#364153" />Filter</Offcanvas.Title>


                    <IoCloseOutline onClick={handleClose} style={{ color: "#FF0000", fontSize: 20, cursor: "pointer" }} />
                </Offcanvas.Header>

                <Offcanvas.Body className='pt-0'>
                    <div className="mb-3" style={{ fontFamily: "Gilroy" }}>





                        <div className='mb-3'>
                            <label style={{ color: "#222222", fontSize: 15, fontWeight: 600 }}>System Filter</label>
                        </div>

                        <Form.Group className="mb-3">
                            <Form.Label className="text-muted" style={{ fontSize: 12 }}>
                                Invoice Type
                            </Form.Label>
                            <Select
                                isMulti
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                options={typeOptions}
                                value={selectedTypeOptions}
                                onChange={handleInvoiceTypeChange}
                                styles={selectStyles}
                                components={{ Option: CheckboxOption }}
                                placeholder="Select Status"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="text-muted" style={{ fontSize: 12 }}>
                                Period
                            </Form.Label>
                            <Select
                                styles={selectStyles}
                                placeholder="Select Period"
                                value={selectedPeriod}
                                onChange={handlePeriodChange}
                                options={periodOptions}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="text-muted" style={{ fontSize: 12 }}>
                                Payment Mode
                            </Form.Label>
                            <Select
                                isMulti
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                options={paymentModeOptions}
                                value={selectedPaymentModeOptions}
                                onChange={handlePaymentModeChange}
                                styles={selectStyles}
                                components={{ Option: CheckboxOption }}
                                placeholder="Select Payment Mode"
                            />

                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="text-muted" style={{ fontSize: 12 }}>
                                Collected By
                            </Form.Label>
                            <Select
                                isMulti
                                hideSelectedOptions={false}
                                closeMenuOnSelect={false}
                                options={collectedByOptions}
                                value={selectedCollectedByOptions}
                                onChange={handleCollectedByChange}
                                styles={selectStyles}
                                components={{ Option: CheckboxOption }}
                                placeholder="Select Collected By"
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
                            setSelectedInvoiceType([]);
                            setSelectedPeriod(null);
                            setSelectedPaymentMode([]);
                            setSelectedCollectedBy([]);
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
ReceiptFilter.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default ReceiptFilter