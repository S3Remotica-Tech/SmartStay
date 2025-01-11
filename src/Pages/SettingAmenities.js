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
import close from '../Assets/Images/close.svg';
import { FaBullseye } from 'react-icons/fa';


function SettingAmenities({ hostelid }) {


    const state = useSelector(state => state)
    const dispatch = useDispatch();

    const [showDots, setShowDots] = useState(false);
    const [openAmenitiesForm, setOpenAmenitiesForm] = useState(false)
    const [IsDisplayAssignAmenities, setIsDisplayAssignAmenities] = useState(false)
    const [amenitiesList, setAmenitiesList] = useState([])
    const popupRef = useRef(null);
    const [editDetails, setEditDetails] = useState('')
    const [active, setActive] = useState(false)
    const [isChecked, setIsChecked] = useState(null);
    const [isDisplayRecurring, setIsDisplayRecurring] = useState(false)
    const [amenityDetails, setAmenityDetails] = useState('')
    const [switchStates, setSwitchStates] = useState({});
    const [deleteAmenities, setDeleteAmenities] = useState(false)
    const [deleteID, setDeleteID] = useState('')
    const [assignAmenitiesDetails, setAssignAmenitiesDetails] = useState('')
    const [loading, setLoading] = useState(true)










    const handleEditAmenities = (amenity) => {
        setEditDetails(amenity)
        setOpenAmenitiesForm(true)
    }


    // const handleToggle = (amenity) => {
    //     setIsChecked(!isChecked);
    //     setSwitchStates((prev) => ({
    //         ...prev,
    //         [amenity.id]: !prev[amenity.id],
    //     }));
    //     setAmenityDetails(amenity)
    // };


    const handleToggle = (amenity) => {
        setSwitchStates((prevSwitchStates) => {
            const newChecked = !prevSwitchStates[amenity.id];

            setIsChecked(newChecked);
            return {
                ...prevSwitchStates,
                [amenity.id]: newChecked,
            };
        });

        setAmenityDetails(amenity);
    };




    useEffect(() => {
        if (isChecked === null) {
            return;
        }
        if (!isChecked) {
            dispatch({
                type: 'RECURRINGROLE',
                payload: {
                    type: "amenities",
                    recure: 0,
                    hostel_id: state.login.selectedHostel_Id,
                    start_date: '0',
                    end_date: '0',
                    am_id: amenityDetails.id,
                },
            });
        } else {
            setIsDisplayRecurring(true)
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


    //add amentities

    // const handleOpenAmenities = () => {
    //     setOpenAmenitiesForm(true)
    //     setEditDetails('')
    // }
    //add amentities
    const [showPopup, setShowPopup] = useState(false);

    const handleOpenAmenities = () => {
        if (!hostelid) {
            setShowPopup(true);
            return;
        }
        setOpenAmenitiesForm(true);
        setEditDetails('');
        console.log("Opening Amenities Form...");
    };


    const handleCloseAmenities = () => {
        setOpenAmenitiesForm(false)
    }

    const handleCloseRecurringPopUp = () => {
        setIsDisplayRecurring(false)
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
        const initialSwitchStates = amenitiesList.reduce((acc, amenity) => {
            acc[amenity.id] = amenity.recuring === 1;
            return acc;
        }, {})
        setSwitchStates(initialSwitchStates);
    }, [amenitiesList])




    useEffect(() => {
        if (state.login.selectedHostel_Id) {

            dispatch({ type: 'AMENITIESLIST', payload: { hostel_id: state.login.selectedHostel_Id } })
        }
    }, [state.login.selectedHostel_Id])



    useEffect(() => {
        if (state.InvoiceList.StatusCodeAmenitiesGet === 200) {
            setLoading(false)
            setAmenitiesList(state.InvoiceList.AmenitiesList)
            setTimeout(() => {
                dispatch({ type: 'CLEAR_AMENITIES_STATUS_CODE' })
            }, 2000)
        }
    }, [state.InvoiceList.StatusCodeAmenitiesGet])


  


    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);





    useEffect(() => {
        if (state.InvoiceList?.statusCode === 200 || state.InvoiceList?.AmenitiesUpdateStatusCode == 200) {

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

        if (state.Settings?.addRecurringRole == 200) {
            setIsDisplayRecurring(false)
            dispatch({ type: 'AMENITIESLIST', payload: { hostel_id: state.login.selectedHostel_Id } })

            setTimeout(() => {
                dispatch({ type: 'REMOVE_RECURRING_ROLE' })
            }, 1000)
        }

    }, [state.Settings?.addRecurringRole])

    useEffect(() => {
        if (state.InvoiceList?.deleteAmenitiesSuccessStatusCode == 200) {

            dispatch({ type: 'AMENITIESLIST', payload: { hostel_id: state.login.selectedHostel_Id } })

            setDeleteAmenities(false)

            setTimeout(() => {
                dispatch({ type: 'REMOVE_DELETE_AMENITIES_STATUS_CODE' })
            }, 2000)
        }

    }, [state.InvoiceList?.deleteAmenitiesSuccessStatusCode])





    return (
        <div className="container">
            <div className='d-flex justify-content-between align-items-center'
                style={{
                    display: "flex", flexDirection: "row", justifyContent: "space-between", position: "sticky",
                    top: 0,
                    right: 0,
                    left: 0,
                    zIndex: 1000,
                    backgroundColor: "#FFFFFF",
                    height: 83,
                }}>
                <div>
                    <label style={{ fontFamily: "Gilroy", fontSize: 20, color: "#222", fontWeight: 600, }}>Amenities</label>
                </div>
                <div>
                    <Button
                        onClick={handleOpenAmenities}
                        style={{
                            fontFamily: "Gilroy", fontSize: 14, backgroundColor: "#1E45E1", color: "white",
                            fontWeight: 600, borderRadius: 8, padding: "12px 16px 12px 16px",
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
                    <p style={{ color: "red" }} className="col-12 col-sm-6 col-md-6 col-lg-9">
                        Please add a hostel before adding Amentities information.
                    </p>

                   

                </div>


            )}

            <div className='container mt-4 mb-3' style={{position:"relative"}}>


                <div className='row row-gap-3'>
                    {
                        amenitiesList.length > 0 ? amenitiesList.map((amenity, index) => (


                            <div className='col-lg-8 col-md-8 col-xs-12 col-sm-12 col-12 p-0' >
                                <Card style={{ border: "1px solid #dcdcdc", borderRadius: 16, }}>
                                    <Card.Body>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div>
                                                <label style={{ fontFamily: "Gilroy", fontSize: 16, color: "#222", fontWeight: 600, }}>Amenities Information</label>
                                            </div>
                                            <div>

                                                <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: showDots ? 1000 : 'auto' }}
                                                    onClick={() => handleDotsClick(index)}
                                                >
                                                    <PiDotsThreeOutlineVerticalFill style={{ height: 18, width: 18 }} />

                                                    {showDots === index && <>

                                                        <div ref={popupRef} style={{ cursor: "pointer", backgroundColor: "#F9F9F9", position: "absolute", right: 0, top: 50, width: 170, height: "auto", border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", padding: 15, alignItems: "center" }}>
                                                            <div >
                                                                <div
                                                                    // onClick={()=>handleDisplayAssignAmenities(amenity)}
                                                                    onClick={() => {
                                                                        if (amenity.setAsDefault !== 1) {
                                                                            handleDisplayAssignAmenities(amenity);
                                                                        }
                                                                    }}
                                                                    className="d-flex gap-2 mb-2 align-items-center"

                                                                    style={{
                                                                        cursor: amenity.setAsDefault === 1 ? "not-allowed" : "pointer",
                                                                        opacity: amenity.setAsDefault === 1 ? 0.5 : 1,
                                                                    }}


                                                                >
                                                                    <div>
                                                                        <ProfileAdd size="16" color="#1E45E1" />
                                                                    </div>
                                                                    <div>
                                                                        <label
                                                                            style={{
                                                                                fontSize: 14,
                                                                                fontWeight: 600,
                                                                                fontFamily: "Gilroy",
                                                                                color: "#222222",
                                                                                cursor: amenity.setAsDefault === 1 ? "not-allowed" : "pointer",
                                                                            }}
                                                                        >
                                                                            Assign Amenities
                                                                        </label>
                                                                    </div>
                                                                </div>



                                                                <div
                                                                    className="d-flex gap-2 mb-2 align-items-center"

                                                                    onClick={() => handleEditAmenities(amenity)}
                                                                >
                                                                    <div>
                                                                        <Edit size="16" color="#1E45E1" />
                                                                    </div>
                                                                    <div>
                                                                        <label
                                                                            style={{
                                                                                fontSize: 14,
                                                                                fontWeight: 600,
                                                                                fontFamily: "Gilroy",
                                                                                color: "#222222",
                                                                                cursor: "pointer"
                                                                            }}
                                                                        >
                                                                            Edit
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                                <div
                                                                    className="d-flex gap-2 mb-2 align-items-center"
                                                                    onClick={() => handleDeleteAmenities(amenity)}
                                                                >

                                                                    <div>
                                                                        <Trash
                                                                            size="16"
                                                                            color="red"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <label
                                                                            style={{
                                                                                fontSize: 14,
                                                                                fontWeight: 600,
                                                                                fontFamily: "Gilroy",
                                                                                color: "#FF0000",
                                                                                cursor: "pointer"
                                                                            }}
                                                                        >
                                                                            Delete
                                                                        </label>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>


                                                    </>}

                                                </div>


                                            </div>
                                        </div>

                                        <hr style={{ border: "1px solid #E7E7E7", margin: "0.5rem 0" }} />
                                        <div class="row row-gap-3">
                                            <div class="col-lg-4 col-md-4 col-12">
                                                <p class="mb-1" style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Name</p>
                                                <p style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600 }}>{amenity.Amnities_Name}</p>
                                            </div>
                                            <div class="col-lg-4 col-md-4 col-12">
                                                <p class="mb-1" style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Amount</p>
                                                <p style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600 }}>₹{amenity.Amount}</p>
                                            </div>
                                            <div class="col-lg-4 col-md-4 col-12">
                                                <p class="mb-1" style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Assigned</p>
                                                <p style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600 }}>{'-'}</p>
                                            </div>
                                            <div class="col-lg-12 col-md-12 col-12">
                                                <p class="mb-1" style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Recuring</p>

                                                <div>
                                                    <Form.Check
                                                        type="switch"
                                                        label="Recurring"
                                                        checked={switchStates[amenity.id] || false}

                                                        onChange={() => handleToggle(amenity)}
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-lg-4 col-md-4 col-12">
                                                <p class="mb-1" style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Calculation type</p>
                                                <p style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600 }}>Monthly</p>
                                            </div>
                                            <div class="col-lg-4 col-md-4 col-12">
                                                <p class="mb-1" style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Calculation start date</p>
                                                <p style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600 }}>{amenity.startdate}</p>
                                            </div>
                                            <div class="col-lg-4 col-md-4 col-12">
                                                <p class="mb-1" style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 500, color: "#4B4B4B" }}>Calculation End date</p>
                                                <p style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600 }}>{amenity.enddate}</p>
                                            </div>





                                        </div>

                                    </Card.Body>
                                </Card>
                            </div>
                        ))

                            : !loading &&

                            <div style={{ marginTop: 65, alignItems: "center", justifyContent: "center" }}>
                                <div className='d-flex  justify-content-center'><img src={EmptyState} style={{ height: 240, width: 240 }} alt="Empty state" /></div>
                                <div className="pb-1 mt-3" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 20, color: "rgba(75, 75, 75, 1)" }}>No Amenities available</div>

                            </div>









                    }
                </div>




                {loading &&
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        height:"50vh",
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


           





            {
                openAmenitiesForm && <AddAmenities show={handleOpenAmenities} handleClose={handleCloseAmenities} hostelid={hostelid} editDetails={editDetails} />
            }
            {
                isDisplayRecurring && <RecurringEnable show={isDisplayRecurring} handleCloseRecurring={handleCloseRecurringPopUp} hostelid={hostelid} amenityDetails={amenityDetails} />
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
                    style={{
                        width: 388,
                        height: 250,
                        marginLeft: "500px",
                        marginTop: "200px",
                    }}
                >
                    <Modal.Header style={{ borderBottom: "none" }}>
                        <Modal.Title
                            style={{
                                fontSize: "18px",
                                fontFamily: "Gilroy",
                                textAlign: "center",
                                fontWeight: 600,
                                color: "#222222",
                                flex: 1,
                            }}
                        >
                            Delete Amenities?
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body
                        style={{
                            fontSize: 14,
                            fontWeight: 500,
                            fontFamily: "Gilroy",
                            color: "#646464",
                            textAlign: "center",
                            marginTop: "-20px",
                        }}
                    >
                        Are you sure you want to delete this Amenities?
                    </Modal.Body>

                    <Modal.Footer
                        style={{
                            justifyContent: "center",
                            borderTop: "none",
                            marginTop: "-10px",
                        }}
                    >
                        <Button
                            style={{
                                width: 160,
                                height: 52,
                                borderRadius: 8,
                                padding: "12px 20px",
                                background: "#fff",
                                color: "#1E45E1",
                                border: "1px solid #1E45E1",
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                                fontSize: "14px",
                                marginRight: 10,
                            }}
                            onClick={handleCloseDeleteFormAmenities}
                        >
                            Cancel
                        </Button>
                        <Button
                            style={{
                                width: 160,
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
export default SettingAmenities;