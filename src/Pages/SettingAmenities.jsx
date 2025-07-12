/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'react-bootstrap/Card';
import EmptyState from '../Assets/Images/New_images/empty_image.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Edit, Trash, ProfileAdd } from 'iconsax-react';
import Form from 'react-bootstrap/Form';
import AddAmenities from './AmenitiesFile/AddAmenities';
import RecurringEnable from './AmenitiesFile/RecurringEnable';
import AssignAmenities from './AmenitiesFile/AssignAmenities';
import { ArrowLeft2, ArrowRight2, } from "iconsax-react";
import PropTypes from "prop-types";
import './SettingsAmentities.css';
import Select from "react-select";

function SettingAmenities({ hostelid }) {


    const state = useSelector(state => state)
    const dispatch = useDispatch();

    const [showDots, setShowDots] = useState(false);
    const [openAmenitiesForm, setOpenAmenitiesForm] = useState(false)
    const [IsDisplayAssignAmenities, setIsDisplayAssignAmenities] = useState(false)
    const popupRef = useRef(null);
    const [editDetails, setEditDetails] = useState('')
    const [isChecked, setIsChecked] = useState(null);
    const [isDisplayRecurring, setIsDisplayRecurring] = useState(false)
    const [amenityDetails, setAmenityDetails] = useState('')
    const [switchStates, setSwitchStates] = useState({});
    const [deleteAmenities, setDeleteAmenities] = useState(false)
    const [deleteID, setDeleteID] = useState('')
    const [assignAmenitiesDetails, setAssignAmenitiesDetails] = useState('')
    const [loading, setLoading] = useState(true)
    const [amenitiesrowsPerPage, setAmenitiesrowsPerPage] = useState(2);
    const [amenitiesFilterddata, setAmenitiesFilterddata] = useState([]);
    const [amenitiescurrentPage, setAmenitiescurrentPage] = useState(1);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);









    const handleEditAmenities = (amenity) => {
        setEditDetails(amenity)
        setOpenAmenitiesForm(true)
    }



    const handleToggle = (amenity) => {
        setSwitchStates((prevSwitchStates) => {
            const newChecked = !prevSwitchStates[amenity.id];

            setIsChecked(newChecked);
            setAmenityDetails(amenity);

            return {
                ...prevSwitchStates,
                [amenity.id]: newChecked,
            };
        });


        if (!switchStates[amenity.id]) {
            setIsDisplayRecurring(true);
        }
    };



    useEffect(() => {
        if (isChecked === null) return;

        if (isChecked) {
            setIsDisplayRecurring(true);
            setIsFormSubmitted(false);
        } else {

            dispatch({
                type: 'RECURRINGROLE',
                payload: {
                    type: "amenities",
                    recure: 0,
                    hostel_id: state.login.selectedHostel_Id,
                    start_date: '0',
                    end_date: '0',
                    am_id: amenityDetails?.id,
                },
            });
        }
    }, [isChecked]);






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
        if (!hostelid) {
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


        setSwitchStates((prev) => ({
            ...prev,
            [amenityDetails?.id]: false,
        }));



    }


    const handleDisplayAssignAmenities = (amenity) => {
        setIsDisplayAssignAmenities(true)
        setAssignAmenitiesDetails(amenity)
    }
    const handleDisplayAssignAmenitiesClose = () => {
        setIsDisplayAssignAmenities(false)
    }


    const handleDeleteAmenities = (amen) => {
        setDeleteID(amen.id)
        setDeleteAmenities(true)
    }

    const handleCloseDeleteFormAmenities = () => {
        setDeleteAmenities(false)
    }


    const handleDeleteAmenitiesConfirm = () => {
        if (deleteID) {
            dispatch({ type: 'DELETEAMENITIES', payload: { am_id: deleteID, hostel_id: state.login.selectedHostel_Id } })

        }
    }

    useEffect(() => {
        const initialSwitchStates = amenitiesFilterddata.reduce((acc, amenity) => {
            acc[amenity.id] = amenity.recuring === 1;
            return acc;
        }, {})
        setSwitchStates(initialSwitchStates);
    }, [amenitiesFilterddata])




    useEffect(() => {
        dispatch({ type: 'AMENITIESLIST', payload: { hostel_id: state.login.selectedHostel_Id } })

    }, [state.login.selectedHostel_Id])



    useEffect(() => {
        if (state.InvoiceList.StatusCodeAmenitiesGet === 200) {

            setAmenitiesFilterddata(state.InvoiceList.AmenitiesList)
            setLoading(false)

            setTimeout(() => {
                dispatch({ type: 'CLEAR_AMENITIES_STATUS_CODE' })
            }, 2000)
        }
    }, [state.InvoiceList.StatusCodeAmenitiesGet])



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
            dispatch({ type: 'AMENITIESLIST', payload: { hostel_id: state.login.selectedHostel_Id } })
            setTimeout(() => {
                dispatch({ type: 'CLEAR_AMENITIES_SETTINS_STATUSCODE' })
            }, 1000)

            setTimeout(() => {
                dispatch({ type: 'REMOVE_STATUS_CODE_AMENITIES_UPDATE' })
            }, 1000)
        }

    }, [state.InvoiceList?.statusCode, state.InvoiceList?.AmenitiesUpdateStatusCode])








    useEffect(() => {

        if (state.Settings?.addRecurringRole === 200) {
            setIsDisplayRecurring(false)
            dispatch({ type: 'AMENITIESLIST', payload: { hostel_id: state.login.selectedHostel_Id } })

            setTimeout(() => {
                dispatch({ type: 'REMOVE_RECURRING_ROLE' })
            }, 1000)
        }

    }, [state.Settings?.addRecurringRole])

    useEffect(() => {
        if (state.InvoiceList?.deleteAmenitiesSuccessStatusCode === 200) {

            dispatch({ type: 'AMENITIESLIST', payload: { hostel_id: state.login.selectedHostel_Id } })

            setDeleteAmenities(false)

            setTimeout(() => {
                dispatch({ type: 'REMOVE_DELETE_AMENITIES_STATUS_CODE' })
            }, 2000)
        }

    }, [state.InvoiceList?.deleteAmenitiesSuccessStatusCode])



    const indexOfLastRowAmenities = amenitiescurrentPage * amenitiesrowsPerPage;
    const indexOfFirstRowAmenities = indexOfLastRowAmenities - amenitiesrowsPerPage;
    const currentRowAmenities = amenitiesFilterddata?.slice(indexOfFirstRowAmenities, indexOfLastRowAmenities);

    const handlePageChange = (generalpageNumber) => {
        setAmenitiescurrentPage(generalpageNumber);
    };
    const amenitiesOptions = [
        { value: 2, label: "2" },
        { value: 5, label: "5" },
        { value: 10, label: "10" },
        { value: 50, label: "50" },
        { value: 100, label: "100" },
    ];
    const handleItemsPerPageChange = (selectedOption) => {
        setAmenitiesrowsPerPage(selectedOption.value);
        setAmenitiescurrentPage(1);
    };

    const totalPagesGeneral = Math.ceil(
        amenitiesFilterddata?.length / amenitiesrowsPerPage
    );


    useEffect(() => {
        if (
            amenitiesFilterddata.length > 0 &&
            currentRowAmenities.length === 0 &&
            amenitiescurrentPage > 1
        ) {
            setAmenitiescurrentPage(amenitiescurrentPage - 1);
        }
    }, [amenitiesFilterddata])


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
                        disabled={showPopup}
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

            <div className='container mt-4 mb-3 show-scrolls' style={{ position: "relative" , maxHeight: "460px",
                overflowY: "auto",backgroundColor:""}}>


                <div className='row row-gap-3'>



                    {currentRowAmenities && currentRowAmenities.length > 0 ? (
                        currentRowAmenities.map((amenity, index) => (

                            <div key={index} className='col-lg-10 col-md-12 col-xs-12 col-sm-12 col-12 p-0' >
                                <Card style={{ border: "1px solid #dcdcdc", borderRadius: 16, }}>
                                    <Card.Body>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div>
                                                <label style={{ fontFamily: "Gilroy", fontSize: 16, color: "#222", fontWeight: 600, }}>Amenities Information</label>
                                            </div>
                                            <div>

                                                <div style={{
                                                    cursor: "pointer", height: 40,
                                                    width: 40, borderRadius: 100,
                                                    border: "1px solid #EFEFEF", display: "flex",
                                                    justifyContent: "center", alignItems: "center",
                                                    position: "relative",
                                                    zIndex: showDots ? 1000 : 'auto',
                                                    backgroundColor: showDots === index ? "#E7F1FF" : "white",
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
                                                                    onClick={() => {
                                                                        if (amenity.setAsDefault !== 1) {
                                                                            handleDisplayAssignAmenities(amenity);
                                                                        }
                                                                    }}
                                                                    className="d-flex gap-2 align-items-center w-100"
                                                                    style={{
                                                                        cursor: amenity.setAsDefault === 1 ? "not-allowed" : "pointer",
                                                                        opacity: amenity.setAsDefault === 1 ? 0.5 : 1,
                                                                        padding: "8px 12px",
                                                                        borderTopLeftRadius: 10,
                                                                        borderTopRightRadius: 10,
                                                                        transition: "background 0.2s ease",
                                                                    }}
                                                                    onMouseEnter={(e) =>
                                                                        amenity.setAsDefault !== 1 &&
                                                                        (e.currentTarget.style.backgroundColor = "#EDF2FF")
                                                                    }
                                                                    onMouseLeave={(e) =>
                                                                        (e.currentTarget.style.backgroundColor = "transparent")
                                                                    }
                                                                >
                                                                    <ProfileAdd size="16" color="#1E45E1" />
                                                                    <label
                                                                        style={{
                                                                            fontSize: 14,
                                                                            fontWeight: 600,
                                                                            fontFamily: "Gilroy",
                                                                            color: "#222222",
                                                                        }}
                                                                    >
                                                                        Assign Amenities
                                                                    </label>
                                                                </div>
                                                                <div style={{ height: 1, backgroundColor: "#F0F0F0", margin: "0px 0" }} />


                                                                <div
                                                                    onClick={() => handleEditAmenities(amenity)}
                                                                    className="d-flex gap-2 align-items-center w-100"
                                                                    style={{
                                                                        cursor: "pointer",
                                                                        padding: "8px 12px",

                                                                        transition: "background 0.2s ease",
                                                                    }}
                                                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#EDF2FF")}
                                                                    onMouseLeave={(e) =>
                                                                        (e.currentTarget.style.backgroundColor = "transparent")
                                                                    }
                                                                >
                                                                    <Edit size="16" color="#1E45E1" />
                                                                    <label
                                                                        style={{
                                                                            fontSize: 14,
                                                                            fontWeight: 600,
                                                                            fontFamily: "Gilroy",
                                                                            color: "#222222",
                                                                        }}
                                                                    >
                                                                        Edit
                                                                    </label>
                                                                </div>
                                                                <div style={{ height: 1, backgroundColor: "#F0F0F0", margin: "0px 0" }} />


                                                                <div
                                                                    onClick={() => handleDeleteAmenities(amenity)}
                                                                    className="d-flex gap-2  align-items-center w-100"
                                                                    style={{
                                                                        cursor: "pointer",
                                                                        padding: "8px 12px",
                                                                        borderBottomLeftRadius: 10,
                                                                        borderBottomRightRadius: 10,
                                                                        transition: "background 0.2s ease",
                                                                    }}
                                                                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FFF0F0")}
                                                                    onMouseLeave={(e) =>
                                                                        (e.currentTarget.style.backgroundColor = "transparent")
                                                                    }
                                                                >
                                                                    <Trash size="16" color="red" />
                                                                    <label
                                                                        style={{
                                                                            fontSize: 14,
                                                                            fontWeight: 600,
                                                                            fontFamily: "Gilroy",
                                                                            color: "#FF0000",
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
                                        <div className="row row-gap-3">
                                            <div className="col-lg-4 col-md-4 col-12">
                                                <p className="mb-1" style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Name</p>
                                                <p style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600 }}>{amenity.Amnities_Name}</p>
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-12">
                                                <p className="mb-1" style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Amount</p>
                                                <p style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600 }}>₹{amenity.Amount}</p>
                                            </div>

                                            <div className="col-lg-4 col-md-4 col-12">
                                                <p className="mb-1" style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Recuring</p>

                                                <div>
                                                    <Form.Check
                                                        type="switch"
                                                        checked={switchStates[amenity.id]}
                                                        id={`custom-switch-${amenity.id}`}
                                                        className="custom-switch-pointer"
                                                        style={{ boxShadow: "none" }}
                                                        label="Recurring"
                                                        onChange={() => handleToggle(amenity)}
                                                    />

                                                    <style>
                                                        {`
      .custom-switch-pointer input[type="checkbox"],
      .custom-switch-pointer label {
        cursor: pointer !important;
      }
    `}
                                                    </style>
                                                </div>

                                            </div>
                                            <div className="col-lg-4 col-md-4 col-12">
                                                <p className="mb-1" style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Calculation Type</p>
                                                <p style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600 }}>Monthly</p>
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-12">
                                                <p className="mb-1" style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Calculation Start Date</p>
                                                <p style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600 }}>{amenity.startdate}</p>
                                            </div>
                                            <div className="col-lg-4 col-md-4 col-12">
                                                <p className="mb-1" style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Calculation End Date</p>
                                                <p style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600 }}>{amenity.enddate}</p>
                                            </div>





                                        </div>

                                    </Card.Body>
                                </Card>
                            </div>
                        ))

                    ) : !loading &&




                    // <div
                    //     style={{
                    //         textAlign: "center",
                    //         marginTop: 90,
                    //         height: '30vh',
                    //         display: "flex",
                    //         flexDirection: "column",
                    //         alignItems: "center",

                    //     }}
                    // >
                    //     <img src={EmptyState} alt="emptystate" />
                    //     <div
                    //         className="pb-1"
                    //         style={{
                    //             fontWeight: 600,
                    //             fontFamily: "Gilroy",
                    //             fontSize: 18,
                    //             color: "rgba(75, 75, 75, 1)",
                    //         }}
                    //     >
                    //         No Amenities available
                    //     </div>

                    // </div>



  <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            marginTop:90,
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


            {amenitiesFilterddata.length > 2 && (
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
            )}





            {
                openAmenitiesForm && <AddAmenities show={handleOpenAmenities} handleClose={handleCloseAmenities} hostelid={hostelid} editDetails={editDetails} />
            }
            {
                isDisplayRecurring && <RecurringEnable show={isDisplayRecurring} handleCloseRecurring={handleCloseRecurringPopUp} hostelid={hostelid} amenityDetails={amenityDetails} setIsFormSubmitted={setIsFormSubmitted} isFormSubmitted={isFormSubmitted} />
            }
            {
                IsDisplayAssignAmenities && <AssignAmenities show={IsDisplayAssignAmenities} handleClose={handleDisplayAssignAmenitiesClose} hostelid={hostelid} assignAmenitiesDetails={assignAmenitiesDetails} />
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
export default SettingAmenities;