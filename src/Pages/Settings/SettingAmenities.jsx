/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import EmptyState from '../../Assets/Images/New_images/empty_image.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Edit, Trash } from 'iconsax-react';
import Form from 'react-bootstrap/Form';
import AddAmenities from '../AmenitiesFile/AddAmenities';
import RecurringEnable from '../AmenitiesFile/RecurringEnable';
import AssignAmenities from '../AmenitiesFile/AssignAmenities';
// import { ArrowLeft2, ArrowRight2, } from "iconsax-react";
import PropTypes from "prop-types";
import '../../Pages/Settings/SettingsAmentities.css';
// import Select from "react-select";
import directRight from '../../Assets/Images/New_images/direct-right.svg';
import link2 from '../../Assets/Images/New_images/link-2.svg';
import { useHasPermission } from '../../Utils/Permission';
import ErrorMessage from '../../Components/ErrorMessage'
import withErrorBoundary from "../../Hoc/WithErrorBountry";
function SettingAmenities() {

    const state = useSelector(state => state)
    const dispatch = useDispatch();

    const [showDots, setShowDots] = useState(false);
    const [openAmenitiesForm, setOpenAmenitiesForm] = useState(false)
    const [IsDisplayAssignAmenities, setIsDisplayAssignAmenities] = useState(false)
    const popupRef = useRef(null);
    const [editDetails, setEditDetails] = useState('')
    // const [isChecked, setIsChecked] = useState(null);
    const [isDisplayRecurring, setIsDisplayRecurring] = useState(false)
    // const [amenityDetails, setAmenityDetails] = useState('')
    const [switchStates, setSwitchStates] = useState({});
    const [deleteAmenities, setDeleteAmenities] = useState(false)
    const [deleteID, setDeleteID] = useState('')
    const [assignAmenitiesDetails, setAssignAmenitiesDetails] = useState('')
    const [loading, setLoading] = useState(false)
    // const [amenitiesrowsPerPage, setAmenitiesrowsPerPage] = useState(50);
    const [amenitiesFilterddata, setAmenitiesFilterddata] = useState([]);
    // const [amenitiescurrentPage, setAmenitiescurrentPage] = useState(1);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const {
        canWriteModule: canWriteAmenities,
        canReadModule: canReadAmenities,
        canUpdateModule: canUpdateAmenities,
        canDeleteModule: canDeleteAmenities,
    } = useHasPermission("Amenities");


    // const canReadAmenities = useHasPermission("Amenities", "canRead")
    // const canWriteAmenities = useHasPermission("Amenities", "canWrite");
    // const canUpdateAmenities = useHasPermission("Amenities", "canUpdate");
    // const canDeleteAmenities = useHasPermission("Amenities", "canDelete");





    useEffect(() => {
        if (!canReadAmenities) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [canReadAmenities]);


    useEffect(() => {
        if (amenitiesFilterddata?.length === 0) {
            setLoading(false);
        }

    }, [amenitiesFilterddata])

    const handleEditAmenities = (amenity) => {
        setEditDetails(amenity)
        setOpenAmenitiesForm(true)
    }



    const handleToggle = (amenity) => {
        const newChecked = !switchStates[amenity.amenityId];

        setSwitchStates((prev) => ({
            ...prev,
            [amenity.amenityId]: newChecked,
        }));


        dispatch({
            type: "AMENITIESUPDATE",
            payload: {
                hostelId: state.login.selectedHostel_Id,
                amenityId: amenity.amenityId,
                data: {
                    amenityName: amenity.amenityName,
                    amount: amenity.amenityAmount,
                    proRate: newChecked,
                },
            },
        });
    };










    const handleDotsClick = (index) => {
        setShowDots((prev) => (prev === index ? null : index));
    };



    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setShowDots(false);
        }
    };


    const [showPopup, setShowPopup] = useState(false);

    const handleOpenAmenities = () => {
        if (!state.login.selectedHostel_Id) {
            setShowPopup(true);
            return;
        }
        setOpenAmenitiesForm(true);
        setEditDetails('');

    };


    const handleCloseAmenities = () => {
        setOpenAmenitiesForm(false)
    }


    const handleCloseRecurringPopUp = () => {
        setIsDisplayRecurring(false);


        // setSwitchStates((prev) => ({
        //     ...prev,
        //     [amenityDetails?.id]: false,
        // }));



    }


    const handleDisplayAssignAmenities = (amenity) => {
        setIsDisplayAssignAmenities(true)
        setAssignAmenitiesDetails(amenity)
    }

    const handleDisplayAssignAmenitiesClose = () => {
        setIsDisplayAssignAmenities(false)
    }


    const handleDeleteAmenities = (amen) => {
        setDeleteID(amen.amenityId)
        setDeleteAmenities(true)
    }

    const handleCloseDeleteFormAmenities = () => {
        setDeleteAmenities(false)
    }


    const handleDeleteAmenitiesConfirm = () => {

        if (deleteID) {
            dispatch({
                type: 'DELETEAMENITIES',
                payload: { amenityId: deleteID, hostelId: state.login.selectedHostel_Id }
            })

        }
    }

    // useEffect(() => {
    //     const initialSwitchStates = amenitiesFilterddata.reduce((acc, amenity) => {
    //         acc[amenity.id] = amenity.recuring === 1;
    //         return acc;
    //     }, {})
    //     setSwitchStates(initialSwitchStates);
    // }, [amenitiesFilterddata])

    useEffect(() => {
        if (amenitiesFilterddata?.length > 0) {
            const initialSwitchStates = amenitiesFilterddata?.reduce((acc, amenity) => {
                acc[amenity.amenityId] = !!amenity.proRate;
                return acc;
            }, {});
            setSwitchStates(initialSwitchStates);
        }
    }, [amenitiesFilterddata]);




    useEffect(() => {

        if (state.login.selectedHostel_Id) {
            dispatch({ type: 'AMENITIESLIST', payload: state.login.selectedHostel_Id })
            setLoading(true);
        }


    }, [state.login.selectedHostel_Id])



    useEffect(() => {
        if (state.InvoiceList.StatusCodeAmenitiesGet === 200) {

            setAmenitiesFilterddata(
                state.InvoiceList?.AmenitiesList?.amenities ??
                state.InvoiceList?.AmenitiesList ??
                []
            );
            // setAmenitiesFilterddata(state.InvoiceList.AmenitiesList?.amenities)

            setLoading(false)

            setTimeout(() => {
                dispatch({ type: 'CLEAR_AMENITIES_STATUS_CODE' })
            }, 2000)
        }
    }, [state.InvoiceList.StatusCodeAmenitiesGet])

    useEffect(() => {
        setLoading(false)

    }, [state.InvoiceList.AmenitiesList])


    useEffect(() => {
        if (state.InvoiceList.alreadyAssignAmenitiesStatusCode === 201) {
            setDeleteAmenities(false)
            setTimeout(() => {
                dispatch({ type: 'REMOVE_ALREADY_ASSIGN_ERROR' })
            }, 200)
        }

    }, [state.InvoiceList.alreadyAssignAmenitiesStatusCode])



    useEffect(() => {
        if (state.InvoiceList.errorAmenities) {
            setLoading(false)
            setTimeout(() => {
                dispatch({ type: 'REMOVE_ERROR_AMENITIES' })
            }, 200)

        }

    }, [state.InvoiceList.errorAmenities])



    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);





    useEffect(() => {
        if (state.InvoiceList?.statusCode === 200 || state.InvoiceList?.AmenitiesUpdateStatusCode === 200) {

            setOpenAmenitiesForm(false)
            const hostelid = state.login.selectedHostel_Id
            if (hostelid) {
                dispatch({ type: 'AMENITIESLIST', payload: hostelid })
            }
            setTimeout(() => {
                dispatch({ type: 'CLEAR_AMENITIES_SETTINS_STATUSCODE' })
            }, 1000)

            setTimeout(() => {
                dispatch({ type: 'REMOVE_STATUS_CODE_AMENITIES_UPDATE' })
            }, 1000)
        }

    }, [state.InvoiceList?.statusCode, state.InvoiceList?.AmenitiesUpdateStatusCode])


    useEffect(() => {
        if (state.createAccount?.networkError) {
            setLoading(false)
            setTimeout(() => {
                dispatch({ type: 'CLEAR_NETWORK_ERROR' })
            }, 3000)
        }

    }, [state.createAccount?.networkError])





    useEffect(() => {

        if (state.Settings?.addRecurringRole === 200) {
            setIsDisplayRecurring(false)
            const hostelid = state.login.selectedHostel_Id
            if (hostelid) {
                dispatch({ type: 'AMENITIESLIST', payload: hostelid })
            }

            setTimeout(() => {
                dispatch({ type: 'REMOVE_RECURRING_ROLE' })
            }, 1000)
        }

    }, [state.Settings?.addRecurringRole])

    useEffect(() => {
        if (state.InvoiceList?.deleteAmenitiesSuccessStatusCode === 200) {

            const hostelid = state.login.selectedHostel_Id
            if (hostelid) {
                dispatch({ type: 'AMENITIESLIST', payload: hostelid })
            }

            setDeleteAmenities(false)

            setTimeout(() => {
                dispatch({ type: 'REMOVE_DELETE_AMENITIES_STATUS_CODE' })
            }, 2000)
        }

    }, [state.InvoiceList?.deleteAmenitiesSuccessStatusCode])



    // const indexOfLastRowAmenities = amenitiescurrentPage * amenitiesrowsPerPage;
    // const indexOfFirstRowAmenities = indexOfLastRowAmenities - amenitiesrowsPerPage;
    // const currentRowAmenities = amenitiesFilterddata?.slice(indexOfFirstRowAmenities, indexOfLastRowAmenities);

    // const handlePageChange = (generalpageNumber) => {
    //     setAmenitiescurrentPage(generalpageNumber);
    // };
    // const amenitiesOptions = [
    //     { value: 2, label: "2" },
    //     { value: 5, label: "5" },
    //     { value: 10, label: "10" },
    //     { value: 50, label: "50" },
    //     { value: 100, label: "100" },
    // ];
    // const handleItemsPerPageChange = (selectedOption) => {
    //     setAmenitiesrowsPerPage(selectedOption.value);
    //     setAmenitiescurrentPage(1);
    // };

    // const totalPagesGeneral = Math.ceil(
    //     amenitiesFilterddata?.length / amenitiesrowsPerPage
    // );


    // useEffect(() => {
    //     if (
    //         amenitiesFilterddata.length > 0 &&
    //         currentRowAmenities.length === 0 &&
    //         amenitiescurrentPage > 1
    //     ) {
    //         setAmenitiescurrentPage(amenitiescurrentPage - 1);
    //     }
    // }, [amenitiesFilterddata])


    return (
        <div
            style={{
                position: "relative",
                paddingRight: 11, paddingLeft: 10,
            }}>

            <div
                className="d-flex flex-column flex-md-row justify-content-between align-items-center"
                style={{

                    position: "sticky",
                    top: 0,
                    right: 0,
                    left: 0,
                    zIndex: 1000,
                    backgroundColor: "#FFFFFF",
                    height: 83,
                }}>
                <div
                    className="w-100 d-flex justify-content-center justify-content-md-start mt-3">
                    <label style={{ fontFamily: "Gilroy", fontSize: 20, color: "#222", fontWeight: 600, }}>Amenities</label>
                </div>
                <div className="d-flex justify-content-center justify-content-md-end w-100 mt-2 mt-md-0">
                    <Button
                        onClick={handleOpenAmenities}
                        style={{
                            fontFamily: "Gilroy",
                            fontSize: "14px",
                            backgroundColor: "#1E45E1",
                            color: "white",
                            fontWeight: 600,
                            borderRadius: "8px",
                            padding: "11px 35px",

                            width: 146,
                            height: 45,
                            maxWidth: "100%",
                            maxHeight: 50,
                            marginTop: 12,
                            minWidth: "130px",
                            whiteSpace: "nowrap",
                        }}
                        disabled={showPopup || !canWriteAmenities}
                    >
                        {" "}
                        + Amenities
                    </Button>
                </div>
            </div>

            {showPopup && (
                <div className="d-flex flex-wrap">
                    <p style={{ color: "red", fontSize: 14, fontFamily: "Gilroy" }} className="col-12 col-sm-6 col-md-6 col-lg-9">
                        Please add a hostel before adding Amentities information.
                    </p>



                </div>


            )}


            {
                !canReadAmenities ? (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100vh"
                        }}
                    >


                        <ErrorMessage message={['You do not have access to view Settings Amenities']} type="warning" />

                    </div>



                )
                    : (
                        <div className='container mt-4 mb-3 show-scrolls' style={{
                            position: "relative", maxHeight: "460px",
                            overflowY: "auto", backgroundColor: ""
                        }}>


                            <div className='row row-gap-3'>



                                {amenitiesFilterddata && amenitiesFilterddata.length > 0 ? (
                                    amenitiesFilterddata.map((amenity, index) => (

                                        <div key={index} className='col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12 p-2' >
                                            <Card style={{ border: "1px solid #dcdcdc", borderRadius: 16, }}>
                                                <Card.Body>

                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <div className="d-flex align-items-center">
                                                            <img src={directRight} alt="directRight" style={{ marginRight: 6 }} />
                                                            <label
                                                                style={{
                                                                    fontFamily: "Gilroy",
                                                                    fontSize: 16,
                                                                    color: "#222",
                                                                    fontWeight: 600,
                                                                    margin: 0,
                                                                }}
                                                            >
                                                                {amenity?.amenityName}
                                                            </label>
                                                        </div>


                                                        <div className="d-flex align-items-center gap-1">
                                                            <img
                                                                src={link2}
                                                                alt="link2"
                                                                onClick={() => {
                                                                    if (canWriteAmenities) {
                                                                        handleDisplayAssignAmenities(amenity);
                                                                    }
                                                                }}
                                                                style={{
                                                                    width: 18,
                                                                    height: 18,
                                                                    cursor: (canWriteAmenities) ? "pointer" : "not-allowed",
                                                                    opacity: (canWriteAmenities) ? 1 : 0.5,
                                                                }}
                                                            />


                                                            <div
                                                                style={{
                                                                    cursor: "pointer",
                                                                    height: 40,
                                                                    width: 40,
                                                                    display: "flex",
                                                                    justifyContent: "center",
                                                                    alignItems: "center",
                                                                    position: "relative",
                                                                    zIndex: showDots ? 1000 : "auto",
                                                                    backgroundColor: showDots === index ? "#E7F1FF" : "white",
                                                                    borderRadius: "50%",
                                                                }}
                                                                onClick={() => handleDotsClick(index)}
                                                            >
                                                                <PiDotsThreeOutlineVerticalFill style={{ height: 18, width: 18 }} />

                                                                {showDots === index && <>

                                                                    <div
                                                                        ref={popupRef}
                                                                        style={{
                                                                            cursor: "pointer",
                                                                            backgroundColor: "#F9F9F9",
                                                                            position: "absolute",
                                                                            right: window.innerWidth <= 335 ? 0 : 40,
                                                                            top: 20,
                                                                            width: window.innerWidth <= 335 ? 120 : 180,
                                                                            border: "1px solid #EBEBEB",
                                                                            borderRadius: 10,
                                                                            display: "flex",
                                                                            flexDirection: "column",
                                                                            alignItems: "start",
                                                                            zIndex: 1050,
                                                                            fontSize: window.innerWidth <= 335 ? 13 : 14,
                                                                            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                                                        }}
                                                                    >
                                                                        <div style={{ width: "100%" }}>




                                                                            <div
                                                                                onClick={() => canUpdateAmenities && handleEditAmenities(amenity)}
                                                                                className="d-flex gap-2 align-items-center w-100"
                                                                                style={{
                                                                                    cursor: canUpdateAmenities ? "pointer" : "not-allowed",
                                                                                    padding: "8px 12px",
                                                                                    transition: "background 0.2s ease",
                                                                                    opacity: canUpdateAmenities ? 1 : 0.5,

                                                                                }}
                                                                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#EDF2FF")}
                                                                                onMouseLeave={(e) =>
                                                                                    (e.currentTarget.style.backgroundColor = "transparent")
                                                                                }
                                                                            >
                                                                                <Edit size="16" color={canUpdateAmenities ? "#1E45E1" : "#A0A0A0"} />
                                                                                <label
                                                                                    style={{
                                                                                        fontSize: 14,
                                                                                        fontWeight: 600,
                                                                                        fontFamily: "Gilroy",
                                                                                        cursor: canUpdateAmenities ? "pointer" : "not-allowed",
                                                                                        color: canUpdateAmenities ? "#222222" : "#A0A0A0",
                                                                                    }}
                                                                                >
                                                                                    Edit
                                                                                </label>
                                                                            </div>
                                                                            <div style={{ height: 1, backgroundColor: "#F0F0F0", margin: "0px 0" }} />


                                                                            <div
                                                                                onClick={() => canDeleteAmenities && handleDeleteAmenities(amenity)}
                                                                                className="d-flex gap-2  align-items-center w-100"
                                                                                style={{
                                                                                    cursor: canDeleteAmenities ? "pointer" : "not-allowed",
                                                                                    padding: "8px 12px",
                                                                                    opacity: canDeleteAmenities ? 1 : 0.5,
                                                                                    borderBottomLeftRadius: 10,
                                                                                    borderBottomRightRadius: 10,
                                                                                    transition: "background 0.2s ease",
                                                                                }}
                                                                                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FFF0F0")}
                                                                                onMouseLeave={(e) =>
                                                                                    (e.currentTarget.style.backgroundColor = "transparent")
                                                                                }
                                                                            >
                                                                                <Trash size="16" color={canDeleteAmenities ? "red" : "#A0A0A0"} />
                                                                                <label
                                                                                    style={{
                                                                                        fontSize: 14,
                                                                                        fontWeight: 600,
                                                                                        fontFamily: "Gilroy",
                                                                                        cursor: canDeleteAmenities ? "pointer" : "not-allowed",
                                                                                        color: canDeleteAmenities ? "#FF0000" : "#A0A0A0",
                                                                                    }}
                                                                                >
                                                                                    Delete
                                                                                </label>
                                                                            </div>
                                                                        </div>
                                                                    </div>


                                                                </>}
                                                            </div>
                                                        </div>
                                                    </div>


                                                    <hr style={{ border: "1px solid #E7E7E7", margin: "0.5rem 0" }} />
                                                    <div className="row row-gap-2">
                                                        <div className="col-lg-12 col-md-12 col-12">
                                                            <div className="d-flex justify-content-between">
                                                                <p
                                                                    className="mb-1"
                                                                    style={{
                                                                        fontSize: 13,
                                                                        fontFamily: "Gilroy",
                                                                        fontWeight: 400,
                                                                        color: "#4B4B4B",
                                                                    }}
                                                                >
                                                                    Price
                                                                </p>
                                                                <p
                                                                    style={{
                                                                        fontSize: 16,
                                                                        fontFamily: "Gilroy",
                                                                        fontWeight: 600,
                                                                        paddingRight: 10
                                                                    }}
                                                                >
                                                                    ₹{amenity?.amenityAmount}<span style={{
                                                                        fontSize: 16,
                                                                        fontFamily: "Gilroy",
                                                                        fontWeight: 400,
                                                                    }}>/Month</span>
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-12 col-md-12 col-12">
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <p
                                                                    className="mb-1"
                                                                    style={{
                                                                        fontSize: 13,
                                                                        fontFamily: "Gilroy",
                                                                        fontWeight: 400,
                                                                        color: "#4B4B4B",
                                                                    }}
                                                                >
                                                                    Pro-Rate
                                                                </p>



                                                                <Form.Check
                                                                    disabled={!canWriteAmenities}
                                                                    type="switch"
                                                                    checked={switchStates[amenity.amenityId] || false}
                                                                    id={`custom-switch-${amenity.amenityId}`}
                                                                    className={`custom-switch-pointer ${!canWriteAmenities ? "no-permission" : ""}`}
                                                                    style={{ boxShadow: "none", cursor: canWriteAmenities ? "pointer" : "not-allowed" }}
                                                                    onChange={() => canWriteAmenities && handleToggle(amenity)}
                                                                />


                                                            </div>

                                                            <style>
                                                                {`
    .custom-switch-pointer {
      cursor: pointer !important;
    }

    .custom-switch-pointer * {
      cursor: pointer !important;
    }

    /* Disable cursor fully when no permission */
    .custom-switch-pointer.no-permission,
    .custom-switch-pointer.no-permission * {
      cursor: not-allowed !important;
      opacity: 0.6;
    }
  `}
                                                            </style>

                                                        </div>







                                                    </div>

                                                </Card.Body>
                                            </Card>
                                        </div>
                                    ))

                                ) : !loading &&







                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: 90,
                                        paddingLeft: "0px",
                                    }}
                                >
                                    <div style={{ textAlign: "center" }}>
                                        <img
                                            src={EmptyState}
                                            alt="emptystate"
                                            style={{ maxWidth: "250px" }}
                                        />
                                        <div
                                            style={{
                                                fontWeight: 600,
                                                fontFamily: "Gilroy",
                                                fontSize: 18,
                                                color: "rgba(75, 75, 75, 1)",
                                            }}
                                        >
                                            No Amenities available
                                        </div>
                                    </div>
                                </div>

                                }
                            </div>




                            {loading &&
                                <div
                                    style={{
                                        position: 'fixed',
                                        right: "30%",
                                        display: 'flex',
                                        height: "50vh",
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
                                </div>
                            }






                        </div>

                    )
            }



            {/* {amenitiesFilterddata.length > 2 && (
                <nav
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "end",
                        padding: "10px",
                        position: "fixed",
                        bottom: "0px",
                        right: "0px",
                        backgroundColor: "#fff",
                        borderRadius: "5px",
                        zIndex: 1000,
                    }}

                >

                    <div>
                        <Select
                            value={amenitiesOptions.find(opt => opt.value === amenitiesrowsPerPage)}
                            onChange={handleItemsPerPageChange}
                            options={amenitiesOptions}
                            placeholder="Items per page"
                            classNamePrefix="custom"
                            menuPlacement="auto"
                            noOptionsMessage={() => "No options"}
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    height: "40px",
                                    borderRadius: "6px",
                                    fontSize: "14px",
                                    color: "#1E45E1",
                                    fontFamily: "Gilroy",
                                    fontWeight: 600,
                                    border: "1px solid #1E45E1",
                                    boxShadow: "0 0 0 1px #1E45E1",
                                    cursor: "pointer",
                                    width: 90,
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
                                    maxHeight: "200px",
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
                                    color: "#1E45E1",
                                    cursor: "pointer",
                                }),
                                indicatorSeparator: () => ({
                                    display: "none",
                                }),
                                option: (base, state) => ({
                                    ...base,
                                    cursor: "pointer",
                                    backgroundColor: state.isFocused ? "#1E45E1" : "white",
                                    color: state.isFocused ? "#fff" : "#000",
                                }),
                            }}
                        />
                    </div>

                    <ul
                        style={{
                            display: "flex",
                            alignItems: "center",
                            listStyleType: "none",
                            margin: 0,
                            padding: 0,
                        }}
                    >

                        <li style={{ margin: "0 10px" }}>
                            <button
                                style={{
                                    padding: "5px",
                                    textDecoration: "none",
                                    color: amenitiescurrentPage === 1 ? "#ccc" : "#1E45E1",
                                    cursor: amenitiescurrentPage === 1 ? "not-allowed" : "pointer",
                                    borderRadius: "50%",
                                    display: "inline-block",
                                    minWidth: "30px",
                                    textAlign: "center",
                                    backgroundColor: "transparent",
                                    border: "none",
                                }}
                                onClick={() => handlePageChange(amenitiescurrentPage - 1)}
                                disabled={amenitiescurrentPage === 1}
                            >
                                <ArrowLeft2
                                    size="16"
                                    color={amenitiescurrentPage === 1 ? "#ccc" : "#1E45E1"}
                                />
                            </button>
                        </li>


                        <li
                            style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}
                        >
                            {amenitiescurrentPage} of {totalPagesGeneral}
                        </li>


                        <li style={{ margin: "0 10px" }}>
                            <button
                                style={{
                                    padding: "5px",
                                    textDecoration: "none",
                                    color:
                                        amenitiescurrentPage === totalPagesGeneral
                                            ? "#ccc"
                                            : "#1E45E1",
                                    cursor:
                                        amenitiescurrentPage === totalPagesGeneral
                                            ? "not-allowed"
                                            : "pointer",
                                    borderRadius: "50%",
                                    display: "inline-block",
                                    minWidth: "30px",
                                    textAlign: "center",
                                    backgroundColor: "transparent",
                                    border: "none",
                                }}
                                onClick={() => handlePageChange(amenitiescurrentPage + 1)}
                                disabled={amenitiescurrentPage === totalPagesGeneral}
                            >
                                <ArrowRight2
                                    size="16"
                                    color={
                                        amenitiescurrentPage === totalPagesGeneral
                                            ? "#ccc"
                                            : "#1E45E1"
                                    }
                                />
                            </button>
                        </li>
                    </ul>
                </nav>
            )} */}





            {
                openAmenitiesForm && <AddAmenities show={handleOpenAmenities} handleClose={handleCloseAmenities} hostelid={state.login.selectedHostel_Id} editDetails={editDetails} />
            }
            {
                isDisplayRecurring && <RecurringEnable show={isDisplayRecurring} handleCloseRecurring={handleCloseRecurringPopUp} hostelid={state.login.selectedHostel_Id}
                    // amenityDetails={amenityDetails}
                    setIsFormSubmitted={setIsFormSubmitted} isFormSubmitted={isFormSubmitted} />
            }
            {
                IsDisplayAssignAmenities && <AssignAmenities show={IsDisplayAssignAmenities} handleClose={handleDisplayAssignAmenitiesClose} hostelid={state.login.selectedHostel_Id}
                    assignAmenitiesDetails={assignAmenitiesDetails}
                />
            }




            {deleteAmenities &&
                <Modal
                    show={deleteAmenities}
                    onHide={handleCloseDeleteFormAmenities}
                    centered
                    backdrop="static"
                    dialogClassName="custom-delete-modal"
                >
                    <Modal.Header style={{ borderBottom: "none" }}>
                        <Modal.Title
                            className="w-100 text-center mt-2"
                            style={{
                                fontSize: "18px",
                                fontFamily: "Gilroy",

                                fontWeight: 600,
                                color: "#222222",

                            }}
                        >
                            Delete Amenities?
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body
                        className="text-center"
                        style={{
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            color: "#646464",

                            marginTop: "-27px",
                        }}
                    >
                        Are you sure you want to delete this Amenities?
                    </Modal.Body>

                    <Modal.Footer
                        className="d-flex justify-content-center"
                        style={{

                            borderTop: "none",
                            marginTop: "-10px",
                        }}
                    >
                        <Button
                            className="me-2"
                            style={{
                                width: "100%",
                                maxWidth: 160,
                                height: 52,
                                borderRadius: 8,
                                padding: "12px 20px",
                                background: "#fff",
                                color: "#1E45E1",
                                border: "1px solid #1E45E1",
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                                fontSize: "14px",
                            }}
                            onClick={handleCloseDeleteFormAmenities}
                        >
                            Cancel
                        </Button>
                        <Button
                            style={{
                                width: "100%",
                                maxWidth: 160,
                                height: 52,
                                borderRadius: 8,
                                padding: "12px 20px",
                                background: "#1E45E1",
                                color: "#FFFFFF",
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                                fontSize: "14px",
                            }}
                            onClick={handleDeleteAmenitiesConfirm}
                        >
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            }


        </div>
    )
}
SettingAmenities.propTypes = {
    hostelid: PropTypes.func.isRequired,
};
export default withErrorBoundary(SettingAmenities);