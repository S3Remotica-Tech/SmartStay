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
import Emptystate from "../../Assets/Images/Empty-State-svg.svg";

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
        }
    }, [canReadAmenities]);

    useEffect(() => {
        if (state.UsersList?.accessRestrictionError) {
            setLoading(false)
            setTimeout(() => {
                dispatch({ type: 'ACCESS_RESTRICTION_ERROR_REMOVE' })
            }, 1000)
        }

    }, [state.UsersList?.accessRestrictionError])
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
        <>

            <div className="sticky top-0 left-0 right-0 z-50 bg-white flex flex-col md:flex-row justify-between items-center min-h-[50px] px-1.5 whitespace-nowrap">


                <div className="w-full flex justify-center items-center md:justify-start mb-2 md:mb-0">
                    <label className="font-gilroy text-[18px] font-semibold text-[#222] whitespace-nowrap">
                        Amenities
                    </label>
                </div>


                <div className="w-full flex justify-center md:justify-end  md:mt-0">
                    <button
                        onClick={handleOpenAmenities}
                        disabled={showPopup || !canWriteAmenities}
                        className={`h-[45px] w-[146px] rounded-lg text-sm font-semibold font-gilroy transition
        ${canWriteAmenities
                                ? "bg-[#1E45E1] text-white hover:bg-[#1638c9]"
                                : "bg-gray-300 text-gray-500 cursor-not-allowed"
                            }`}
                    >
                        + Amenities
                    </button>
                </div>

            </div>

            {showPopup && (
                <div className="flex flex-wrap">
                    <p className="text-red-500 text-sm font-gilroy w-full sm:w-1/2 md:w-1/2 lg:w-3/4">
                        Please add a hostel before adding Amenities information.
                    </p>
                </div>
            )}

            {
                !canReadAmenities ? (
                    <div className="flex flex-col items-center justify-center h-screen">
                        <img src={Emptystate} alt="Empty State" />
                        <ErrorMessage
                            message={['You do not have access to view Settings Amenities']}
                            type="warning"
                        />
                    </div>
                ) : (

                    <div className="relative mt-2 mb-3 max-h-[460px] overflow-y-auto">
                        <div className="flex flex-wrap  gap-y-3">
                            {amenitiesFilterddata && amenitiesFilterddata.length > 0 ? (
                                amenitiesFilterddata.map((amenity, index) => (
                                    <div key={index} className="w-full sm:w-1/2 p-2.5">
                                        <div className="border border-gray-300 rounded-2xl">
                                            <div className="p-3">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center">
                                                        <img src={directRight} alt="directRight" className="mr-1.5" />
                                                        <span className="font-gilroy font-semibold text-gray-900 text-base">
                                                            {amenity?.amenityName}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-1">
                                                        <img
                                                            src={link2}
                                                            alt="link2"
                                                            onClick={() => canWriteAmenities && handleDisplayAssignAmenities(amenity)}
                                                            className={`w-4.5 h-4.5 ${canWriteAmenities ? "cursor-pointer opacity-100" : "cursor-not-allowed opacity-50"
                                                                }`}
                                                        />

                                                        <div
                                                            onClick={() => handleDotsClick(index)}
                                                            className={`relative flex items-center justify-center w-10 h-10 rounded-full ${showDots === index ? "bg-blue-100" : "bg-white"
                                                                } cursor-pointer`}
                                                        >
                                                            <PiDotsThreeOutlineVerticalFill className="w-4.5 h-4.5" />

                                                            {showDots === index && (
                                                                <div
                                                                    ref={popupRef}
                                                                    className="absolute top-5 right-10 w-44 sm:w-40 bg-gray-50 border border-gray-200 rounded-lg shadow-sm flex flex-col z-50 text-sm"
                                                                >
                                                                    <div
                                                                        onClick={() => canUpdateAmenities && handleEditAmenities(amenity)}
                                                                        className={`flex items-center gap-2 px-3 py-2 transition-colors ${canUpdateAmenities
                                                                            ? "cursor-pointer hover:bg-blue-50 opacity-100"
                                                                            : "cursor-not-allowed opacity-50"
                                                                            }`}
                                                                    >
                                                                        <Edit size={16} color={canUpdateAmenities ? "#1E45E1" : "#A0A0A0"} />
                                                                        <span
                                                                            className={`font-gilroy font-semibold ${canUpdateAmenities ? "text-gray-900" : "text-gray-400"
                                                                                }`}
                                                                        >
                                                                            Edit
                                                                        </span>
                                                                    </div>

                                                                    <div className="h-px bg-gray-200" />

                                                                    <div
                                                                        onClick={() => canDeleteAmenities && handleDeleteAmenities(amenity)}
                                                                        className={`flex items-center gap-2 px-3 py-2 transition-colors ${canDeleteAmenities
                                                                            ? "cursor-pointer hover:bg-red-50 opacity-100"
                                                                            : "cursor-not-allowed opacity-50"
                                                                            }`}
                                                                    >
                                                                        <Trash size={16} color={canDeleteAmenities ? "red" : "#A0A0A0"} />
                                                                        <span
                                                                            className={`font-gilroy font-semibold ${canDeleteAmenities ? "text-red-600" : "text-gray-400"
                                                                                }`}
                                                                        >
                                                                            Delete
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>

                                                <hr className="my-2 border-gray-200" />

                                                <div className="flex flex-col gap-2">
                                                    <div className="flex justify-between items-center">
                                                        <p className="font-gilroy text-gray-700 text-xs font-normal">Price</p>
                                                        <p className="font-gilroy text-gray-900 font-semibold text-base pr-2">
                                                            ₹{amenity?.amenityAmount}
                                                            <span className="font-normal text-base">/Month</span>
                                                        </p>
                                                    </div>

                                                    <div className="flex justify-between items-center">
                                                        <p className="font-gilroy text-gray-700 text-xs font-normal">Pro-Rate</p>
                                                        <Form.Check
                                                            disabled={!canWriteAmenities}
                                                            type="switch"
                                                            checked={switchStates[amenity.amenityId] || false}
                                                            id={`custom-switch-${amenity.amenityId}`}
                                                            className={`custom-switch-pointer ${!canWriteAmenities ? "no-permission" : ""}`}
                                                            style={{ boxShadow: "none" }}
                                                            onChange={() => canWriteAmenities && handleToggle(amenity)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : !loading && (

                                <div className="flex justify-center items-center min-h-screen w-full">
                                    <div className="flex flex-col items-center">
                                        <img src={EmptyState} alt="Empty State" className="max-w-xs -mt-24" />
                                        <div className="mt-2 font-gilroy font-semibold text-lg text-gray-700 text-center">
                                            No Amenities available
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>


                        {loading && (
                            <div className="fixed right-1/3 flex items-center justify-center h-[50vh] bg-transparent opacity-75 z-10">
                                <div className="w-10 h-10 rounded-full border-t-4 border-r-4 border-t-blue-700 border-r-transparent animate-spin"></div>
                            </div>
                        )}
                    </div>

                )
            }

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
                    <Modal.Header className='!border-0'>

                        <Modal.Title className="!w-full !text-center mt-2 !font-gilroy !font-semibold !text-gray-800 !text-lg">
                            Delete Amenities?
                        </Modal.Title>
                    </Modal.Header>


                    <Modal.Body className="text-center -mt-5 font-gilroy font-medium text-gray-500 text-sm">
                        Are you sure you want to delete this Amenities?
                    </Modal.Body>



                    <Modal.Footer className="!flex !justify-center !gap-4 !border-t-0 !mt-2">
                        <div className="!flex !gap-4 w-full max-w-md">
                            <button
                                onClick={handleCloseDeleteFormAmenities}
                                className="!flex-1 !h-14 !rounded-lg !bg-white !text-blue-700 !border !border-blue-700 !font-gilroy !font-semibold !text-sm"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteAmenitiesConfirm}
                                className="!flex-1 !h-14 !rounded-lg !bg-blue-700 !text-white !font-gilroy !font-semibold !text-sm"
                            >
                                Delete
                            </button>
                        </div>
                    </Modal.Footer>
                </Modal>
            }


        </>
    )
}
SettingAmenities.propTypes = {
    hostelid: PropTypes.func.isRequired,
};
export default withErrorBoundary(SettingAmenities);