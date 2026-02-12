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


function TenantsFilter({ show, handleClose, startDate, endDate, size, page }) {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [selectedTenantStatusOptions, setSelectedTenantStatusOptions] = useState([]);
    const [tenantStatus, setTenantStatus] = useState([]);

    const [period, setPeriod] = useState(null);
    const [sharingType, setSharingType] = useState(null);
    const [floor, setFloor] = useState([]);
    const [room, setRoom] = useState([]);

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



    const filterOptionsData = useSelector(
        (state) => state.reports?.getTenantRegister?.filters
    );


    const tenantStatusOptions =
        filterOptionsData?.tenantStatus?.map(item => ({
            label: item.label,
            value: item.id
        })) || [];



    const periodOptions =
        filterOptionsData?.period?.map(item => ({
            label: item.label,
            value: item.id
        })) || [];


    const floorOptions =
        filterOptionsData?.floor?.map(item => ({
            label: item.label,
            value: item.id
        })) || [];


    const roomOptions =
        filterOptionsData?.room?.map(item => ({
            label: item.label,
            value: item.id
        })) || [];





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




    const handleTenantStatusChange = (selectedOptions) => {
        if (!selectedOptions || selectedOptions.length === 0) {
            setSelectedTenantStatusOptions([]);
            setTenantStatus([]);
            return;
        }

        const isAllSelected = selectedOptions.some(opt => opt.value === "ALL");

        if (isAllSelected) {
            const allOption = selectedOptions.find(opt => opt.value === "ALL");
            setSelectedTenantStatusOptions([allOption]);
            setTenantStatus(["ALL"]);
        } else {
            setSelectedTenantStatusOptions(selectedOptions);
            setTenantStatus(selectedOptions.map(opt => opt.value));
        }
    };




    const handleFilterBills = () => {

        if (!state.login?.selectedHostel_Id) return;
        const tenantPayload = {
            status: tenantStatus,
            period: period?.value || null,
            floor: floor.map(f => f.value),
            room: room.map(r => r.value),
            search: tenantName,
            size: size,
            page: page,
            startDate: startDate,
            endDate: endDate
        };

        dispatch({
            type: "SET_TENANT_REGISTER_FILTERS",
            payload: {
                startDate: startDate,
                endDate: endDate,
                period: period?.value || null,
                floor: floor.map(f => f.value),
                room: room.map(r => r.value),
                search: tenantName,
                tenantStatus: tenantStatus,


            },
        })

        dispatch({
            type: 'GET_REPORTS_TENANT_REGISTER_SAGA',
            payload: {
                hostelId: state.login.selectedHostel_Id,
                filters: tenantPayload
            }
        });
        setFormLoading(true);
    };

    useEffect(() => {
        if (state.reports.getTenantRegisterSuccess === 200) {
            setFormLoading(false);
                       setTimeout(() => {
                dispatch({ type: 'REMOVE_GET_REPORTS_TENANT_REGISTER_REDUCER' })
            }, 100)
        }

    }, [state.reports.getTenantRegisterSuccess])




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
                                Tenant Status
                            </Form.Label>
                            <Select
                                isMulti
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                options={tenantStatusOptions}
                                value={selectedTenantStatusOptions}
                                onChange={handleTenantStatusChange}
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
                                placeholder="Last Month"
                                value={period}
                                onChange={setPeriod}
                                options={periodOptions}
                            />

                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label className="text-muted" style={{ fontSize: 12 }}>
                                Sharing Type
                            </Form.Label>
                            <Select isDisabled
                                styles={selectStyles}
                                placeholder="Select type..."
                                value={sharingType}
                                onChange={setSharingType}
                                options={[
                                    { label: "Single", value: "SINGLE" },
                                    { label: "Double", value: "DOUBLE" },
                                    { label: "Triple", value: "TRIPLE" },
                                ]}
                            />
                        </Form.Group>


                        <Form.Group className="mb-3">
                            <Form.Label className="text-muted text-[12px]">
                                Floor
                            </Form.Label>

                            <Select
                                isMulti
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                styles={selectStyles}
                                placeholder="Select floor(s)"
                                value={floor}
                                onChange={setFloor}
                                options={floorOptions}
                            />
                        </Form.Group>


                        <Form.Group>
                            <Form.Label className="text-muted text-[12px]">
                                Room
                            </Form.Label>

                            <Select
                                isMulti
                                closeMenuOnSelect={false}
                                hideSelectedOptions={false}
                                styles={selectStyles}
                                placeholder="Select room(s)"
                                value={room}
                                onChange={setRoom}
                                options={roomOptions}
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
                            // setBillStatus([]);
                            // setInvoiceType([]);
                            // setInvoiceMode([]);
                            // setCreatedBy([]);
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
TenantsFilter.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
};

export default TenantsFilter