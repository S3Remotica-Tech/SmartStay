/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import Select from "react-select";
import { Button, Form, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { components } from "react-select";
import { FaCheck } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import ErrorMessage from '../../Components/ErrorMessage'
import PropTypes from "prop-types";
import { Filter } from 'iconsax-react'
import withErrorBoundary from "../../Hoc/WithErrorBountry";

function InvoiceRegisterFilter({ show, handleClose, size, page, startDate, endDate }) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [billStatus, setBillStatus] = useState([]);
    const [invoiceType, setInvoiceType] = useState([]);
    const [invoiceMode, setInvoiceMode] = useState([]);
    const [createdBy, setCreatedBy] = useState([]);
    const [period, setPeriod] = useState(null);

    const [tenantName, setTenantName] = useState("");
    const [selectedBillStatusOptions, setSelectedBillStatusOptions] = useState([]);

    const [formLoading, setFormLoading] = useState(false)
    const [paidAmountMin, setPaidAmountMin] = useState("");
    const [paidAmountMax, setPaidAmountMax] = useState("");

    const [outstandingMin, setOutstandingMin] = useState("");
    const [outstandingMax, setOutstandingMax] = useState("");





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
        (state) => state?.reports?.getInvoiceRegister?.filterOptions
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
            value: item.type
        })) || [];

    const createdByOptions =
        filterOptionsData?.createdBy?.map(item => ({
            label: item.name,
            value: item.userId
        })) || [];


    const periodOptions =
        filterOptionsData?.periods?.map(item => ({
            label: item,
            value: item

        })) || [];


    const invoiceFilters = state.reports?.invoiceRegisterFilters;

  
    useEffect(() => {
        if (show && invoiceFilters) {
            setTenantName(invoiceFilters.search)

                       setBillStatus(invoiceFilters.paymentStatus || []);
            const selectedPaymentOptions = billStatusOptions.filter(option =>
                invoiceFilters.paymentStatus?.includes(option.value)
            );
            setSelectedBillStatusOptions(selectedPaymentOptions);

            const selectedInvoiceTypeValues = invoiceFilters.invoiceTypes || [];

            setInvoiceType(selectedInvoiceTypeValues);


            const selectedInvoiceModeOptions = invoiceFilters?.invoiceModes || []
            setInvoiceMode(selectedInvoiceModeOptions);

            const selectedCreatedByOptions = createdByOptions.filter(option =>
                invoiceFilters.createdBy?.includes(option.value)
            );

            setCreatedBy(selectedCreatedByOptions);

            const selectedPeriod = periodOptions.find(option =>
                option.value === invoiceFilters.period
            );
            setPeriod(selectedPeriod || null);
            setPaidAmountMin(invoiceFilters.minPaidAmount || "");
            setPaidAmountMax(invoiceFilters.maxPaidAmount || "");

            setOutstandingMin(invoiceFilters.minOutstandingAmount || "");
            setOutstandingMax(invoiceFilters.maxOutstandingAmount || "");

        }
    }, [show]);



    const handlePaidMinChange = (e) => {
        setPaidAmountMin(e.target.value);
    };

    const handlePaidMaxChange = (e) => {
        setPaidAmountMax(e.target.value);
    };

    const handleOutstandingMinChange = (e) => {
        setOutstandingMin(e.target.value);
    };

    const handleOutstandingMaxChange = (e) => {
        setOutstandingMax(e.target.value);
    };



    const handleBillStatusChange = (selectedOptions) => {
        if (!selectedOptions) {
            setSelectedBillStatusOptions([]);
            setBillStatus([]);
            return;
        }

        const hasAll = selectedOptions.some(opt => opt.value === "ALL");

        if (hasAll) {

            const allOption = selectedOptions.find(opt => opt.value === "ALL");
            setSelectedBillStatusOptions([allOption]);
            setBillStatus(["ALL"]);
        } else {
            setSelectedBillStatusOptions(selectedOptions);
            setBillStatus(selectedOptions.map(opt => opt.value));
        }
    };

    useEffect(() => {
        if (state.InvoiceList.billsListStatusCode === 200 || state.reports.getInvoiceRegisterSuccess === 200) {
            setFormLoading(false)
        }
    }, [state.InvoiceList.billsListStatusCode, state.reports.getInvoiceRegisterSuccess]);


    useEffect(() => {
        const selectedOptions = billStatusOptions.filter(opt =>
            billStatus.includes(opt.value)
        );
        setSelectedBillStatusOptions(selectedOptions);
    }, [billStatus]);



    const handleInvoiceTypeChange = (selected) => {
        setInvoiceType(selected.map(opt => opt.value));
    };

    const selectedTypeOptions = typeOptions.filter(opt =>
        invoiceType.includes(opt.value)
    );



    const handleInvoiceModeChange = (selected) => {
        setInvoiceMode(selected.map(opt => opt.value));
    };

    const selectedModeOptions = modeOptions.filter(
        opt => invoiceMode?.includes(opt.value)
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
    }
    CheckboxOption.propTypes = {
        isSelected: PropTypes.bool.isRequired,
        label: PropTypes.string.isRequired,
    };









    const isAllSelectedDrop =
        selectedBillStatusOptions?.length === 1 &&
        selectedBillStatusOptions[0]?.value === "ALL";





    const handleFilterBills = () => {



        if (!state.login?.selectedHostel_Id) return;

        const InvoiceFilter = {
            search: tenantName?.trim() || undefined,
            paymentStatus: billStatus?.length ? billStatus : undefined,
            invoiceModes: invoiceMode?.length ? invoiceMode : undefined,
            invoiceTypes: invoiceType?.length ? invoiceType : undefined,
            createdBy: createdBy?.length ? createdBy?.map(c => c.value) : undefined,
            period: period?.value ? period?.value : "",
            minPaidAmount: paidAmountMin,
            maxPaidAmount: paidAmountMax,
            minOutstandingAmount: outstandingMin,
            maxOutstandingAmount: outstandingMax,
            page: page,
            size: size,
            startDate: period?.value ? undefined : startDate,
            endDate: period?.value ? undefined : endDate,
            createdByLabels: createdBy?.length ? createdBy?.map(c => c.label) : undefined,
        };

        dispatch({
            type: "SET_INVOICE_REGISTER_FILTERS",
            payload: InvoiceFilter
        });
        const hasFilters = Object.values(InvoiceFilter).some(
            v => v !== undefined && v !== 0
        );

        if (!hasFilters) return;

        const isOnlyAllStatus =
            Array.isArray(billStatus) &&
            billStatus.length === 1 &&
            billStatus[0] === "ALL";

        dispatch({
            type: 'GET_REPORTS_INVOICE_REGISTER_SAGA',
            payload: {
                hostelId: state.login.selectedHostel_Id,
                filters: isOnlyAllStatus
                    ? { page: page, size: size }
                    : InvoiceFilter
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

    const inputClass =
        "mt-2 w-full rounded-md border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-700 " +
        "focus:border-[#1E45E1] focus:outline-none focus:ring-1 focus:ring-[#1E45E1]";
    const paidMin = Number(paidAmountMin);
    const paidMax = Number(paidAmountMax);

    const outstandingMinVal = Number(outstandingMin);
    const outstandingMaxVal = Number(outstandingMax);



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
                                   
                                }}
                            />
                        </Form.Group>


                        <div className='mb-3'>
                            <label style={{ color: "#222222", fontSize: 15, fontWeight: 600 }}>Other Filter</label>
                        </div>

                        <div className="mt-2 mb-3">
                            <label className="text-xs font-medium text-gray-600">
                                Paid Amount Range
                            </label>

                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="₹Min"
                                    value={paidAmountMin}
                                    onChange={handlePaidMinChange}
                                    className={inputClass}
                                />
                                <input
                                    type="number"
                                    placeholder="₹Max"
                                    value={paidAmountMax}
                                    onChange={handlePaidMaxChange}
                                    className={inputClass}
                                />
                            </div>
                            {paidAmountMin &&
                                paidAmountMax &&
                                paidMin > paidMax && (
                                    <ErrorMessage
                                        message="Max amount should be greater than Min"
                                        type="error"
                                    />
                                )}


                        </div>


                        <div className="mt-2 mb-3">
                            <label className="text-xs font-medium text-gray-600">
                                Outstanding Amount Range
                            </label>

                            <div className="flex gap-2">
                                <input
                                    type="number"
                                    placeholder="₹Min"
                                    value={outstandingMin}
                                    onChange={handleOutstandingMinChange}
                                    className={inputClass}
                                />
                                <input
                                    type="number"
                                    placeholder="₹Max"
                                    value={outstandingMax}
                                    onChange={handleOutstandingMaxChange}
                                    className={inputClass}
                                />
                            </div>
                            {outstandingMin &&
                                outstandingMax &&
                                outstandingMinVal > outstandingMaxVal && (
                                    <ErrorMessage
                                        message="Max amount should be greater than Min"
                                        type="error"
                                    />
                                )}


                        </div>


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
                            setPaidAmountMin("");
                            setPaidAmountMax("");
                            setOutstandingMin("");
                            setOutstandingMax("");
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
InvoiceRegisterFilter.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    size: PropTypes.any,
    page: PropTypes.any,
     startDate: PropTypes.any,
        endDate:  PropTypes.any,
};
export default withErrorBoundary(InvoiceRegisterFilter)