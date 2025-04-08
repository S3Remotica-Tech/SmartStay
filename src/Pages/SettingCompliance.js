/* eslint-disable react-hooks/exhaustive-deps */ 
import React, { useEffect, useRef, useState } from "react";
import message from "../Assets/Images/New_images/messages_gray.png";
import Edit from "../Assets/Images/Edit-blue.png";
import Delete from "../Assets/Images/Delete_red.png";
import { Row, Button, Col, Form, FormControl } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from 'react-redux';
import EmptyState from '../Assets/Images/New_images/empty_image.png';
import { MdError } from "react-icons/md";
import { ArrowLeft2, ArrowRight2, } from "iconsax-react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import PropTypes from "prop-types";
import {CloseCircle} from "iconsax-react";

function SettingCompliance({ hostelid }) {

    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const popupRef = useRef(null);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const [showForm, setShowForm] = useState(false);
    const [complaintTypeName, setComplaintTypeName] = useState('')
    const [originalComplaintTypeName, setOriginalComplaintTypeName] = useState('');
    const [complaintError, setComplaintError] = useState('')
    const [isChangedError, setIsChangedError] = useState("");
    const [id, setId] = useState('');
    const [rowDetails, setRowDetails] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [loading, setLoading] = useState(false)
    const [showDots, setShowDots] = useState(null);
    const [menuLoaded, setMenuLoaded] = useState(false);
    const [compliancerowsPerPage, setCompliancerowsPerPage] = useState(10);
    const [complianceFilterddata, setComplianceFilterddata] = useState([]);
    const [compliancecurrentPage, setCompliancecurrentPage] = useState(1);


    const handleDeleteClick = () => {
        setShowPopup(true);
    };

    const handleConfirmDelete = () => {
        if (rowDetails.id) {
            dispatch({ type: 'DELETE-COMPLAINT-TYPE', payload: { id: rowDetails.id } })
        }
        setTimeout(() => {
            setShowPopup(false);
        }, 200);
    };

    const handleCancel = () => {
        setShowPopup(false);
    };

    useEffect(() => {
        if(hostelid){
            setLoading(true)
            dispatch({ type: 'COMPLAINT-TYPE-LIST', payload: { hostel_id: hostelid } })
        }   
    }, [hostelid])

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleShowDots = (e, row, index) => {
        e.stopPropagation();
        setShowDots((prev) => (prev === index ? null : index));
        setRowDetails(row)
        const { top, left, height } = e.target.getBoundingClientRect();
        const popupTop = top + (height / 2);
        const popupLeft = left - 130;
    
        setPopupPosition({ top: popupTop, left: popupLeft });
        // const rect = e.currentTarget.getBoundingClientRect();
        // // rect.top
        // setPopupPosition({
        //     // top: rect.top + window.scrollY + 30,
        //     // left: rect.left + window.scrollX - 120,
        //     top: rect.top + window.scrollY + 30,
        //     left: rect.left + window.scrollX - 675,
        // });



        setMenuLoaded(true);
    };

    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setShowDots(false);
        }
    };
    const handleEdit = () => {
        setShowEditForm(true)
        // setEdit(true)
        setId(rowDetails.id)
        setComplaintTypeName(rowDetails.complaint_name)
        setOriginalComplaintTypeName(rowDetails.complaint_name);
    }

    const handleClose = () => {
        setShowForm(false)
        setId('')
        setComplaintTypeName('')
        setOriginalComplaintTypeName('');
        setIsChangedError('');
        setShowEditForm(false);
        setComplaintError('');
    }

    //add compliance 
    // const handleShowForm = () => {
    //     setShowForm(true)
    // }
    const [showPopupvalidation, setShowPopupValidation] = useState(false);
    const handleShowForm = () => {
        if (!hostelid) {
            setShowPopupValidation(true);
            return;
        }
        setShowForm(true);
        console.log("Opening Form...");
    };

    //add complaint
    const handleAddComplaintType = () => {
        if (!complaintTypeName) {
            setComplaintError('Please Enter Complaint Type')
        }
        else {
            dispatch({ type: 'COMPLAINT-TYPE-ADD', payload: { complaint_name: complaintTypeName, hostel_id: hostelid } })
            setComplaintError('')
        }
    }

    //edit complaint type
    //COMPLAINT-TYPE-LIST 
    //COMPLAINT-TYPE-EDIT (complaint_name,id,hostel_id)
    // const handleEditType = () => {

    //     if (!complaintTypeName) {
    //         setIsChangedError('No changes Detected')
    //     }
    //     else {
    //         dispatch({ type: 'COMPLAINT-TYPE-EDIT', payload: { complaint_name: complaintTypeName, hostel_id: hostelid, id: id } })
    //         setIsChangedError('')
    //     }
    // }

    const handleEditType = () => {
        if (complaintTypeName === originalComplaintTypeName) {
            setIsChangedError('No Changes Detected');
        } else {
            dispatch({
                type: 'COMPLAINT-TYPE-EDIT',
                payload: { complaint_name: complaintTypeName, hostel_id: hostelid, id: id }
            });
            setIsChangedError('');
        }
    };



    const handleComplaintType = (e) => {
        const value = e.target.value
        const pattern = /^[a-zA-Z\s]*$/;
    if (!pattern.test(value)) {
      return;
    }
        setComplaintTypeName(value)
        if (e.target.value) {
            setComplaintError('')
        }
    }

    useEffect(() => {
        if (state.Settings.getcomplainttypeStatuscode === 200) {
            setComplianceFilterddata(state.Settings.Complainttypelist);
            
            setTimeout(() => {
                setLoading(false)
                dispatch({ type: 'CLEAR_GET_COMPLAINTTYPE_STATUS_CODE' })
            }, 300);
        }
    }, [state.Settings.getcomplainttypeStatuscode])


    useEffect(() => {
        if (state.Settings.errorCompliants) {
            setLoading(false)
            setTimeout(() => {
                dispatch({ type: 'REMOVE_ERROR_COMPLIANTS' })
            }, 1000);
        }
    }, [state.Settings.errorCompliants])









    useEffect(() => {
        if (state.Settings.addComplaintSuccessStatusCode === 200) {
            dispatch({ type: 'COMPLAINT-TYPE-LIST', payload: { hostel_id: hostelid } })
            handleClose()
            setTimeout(() => {
                dispatch({ type: 'CLEAR_ADD_COMPLAINT_STATUS_CODE' })
            }, 500);
        }
    }, [state.Settings.addComplaintSuccessStatusCode])

    useEffect(() => {
        if (state.Settings.deletecomplaintStatuscode === 200) {
            dispatch({ type: 'COMPLAINT-TYPE-LIST', payload: { hostel_id: hostelid } })
            handleClose()
            setTimeout(() => {
                dispatch({ type: 'CLEAR_DELETE_COMPLAINTTYPE_STATUS_CODE' })
            }, 500);
        }
    }, [state.Settings.deletecomplaintStatuscode])


    useEffect(() => {
        if (state.Settings.editComplaintSuccessStatusCode === 200) {
            dispatch({ type: 'COMPLAINT-TYPE-LIST', payload: { hostel_id: hostelid } })
            handleClose()
            setTimeout(() => {
                dispatch({ type: 'CLEAR_EDIT_COMPLAINT_STATUS_CODE' })
            }, 500);
        }
    }, [state.Settings.editComplaintSuccessStatusCode])


    // pagination
    const indexOfLastRowCompliance = compliancecurrentPage * compliancerowsPerPage;
    const indexOfFirstRowCompliance = indexOfLastRowCompliance - compliancerowsPerPage;
    const currentRowCompliance = complianceFilterddata?.slice(
        indexOfFirstRowCompliance,
        indexOfLastRowCompliance

    );

    const handlePageChange = (generalpageNumber) => {
        setCompliancecurrentPage(generalpageNumber);
    };

    const handleItemsPerPageChange = (event) => {
        setCompliancerowsPerPage(Number(event.target.value));
    };

    const totalPagesGeneral = Math.ceil(
        complianceFilterddata?.length / compliancerowsPerPage
    );

 console.log("typeloader", loading);
 

    return (
        <div className="container" style={{ position: "relative", maxHeight: "570px",
            overflowY: "auto", }}>


            {loading   &&
                <div
                                       style={{
                                         position: 'absolute',
                                           top: 130,
                                           right: 0,
                                           bottom: 0,
                                           left: 40,
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

            <div 
             className="d-flex flex-column flex-md-row justify-content-between align-items-center"
             
            style={{ position: "sticky", top: 0, 
                right: 0,
                left: 0,
                // padding: "10px",
            zIndex: 1000, 
            backgroundColor: "white",
            // whiteSpace: "nowrap",
             }}>
                <div 
                // className="d-flex row mb-4 " 
                 className="w-100 "
                >
                    <Row 
                        className="d-flex flex-column flex-md-row align-items-center ">
                     
                    <div
                    style={{ marginTop: 30,
                        // marginBottom: 20
                     }} >
                  
                        <Col xs={12} md="auto" className="text-center text-md-start mb-5 mb-md-0">
                            <h4 style={{ fontSize: 20, color: "#000000", fontWeight: 600, 
                               
                                fontFamily: "Gilroy",
                                // marginBottom: "30px", 
                                // marginTop: 28
                                // whiteSpace: "nowrap",
                                }}>
                                Complaint Type </h4>
                        </Col>
                        </div>
                    <div 
                    style={{ marginTop: -40,
                        marginBottom: "20px",
                            
                    }}
                    >
                        <Col xs={12} md="auto"
                        className=
                                   "d-flex justify-content-center justify-content-md-end w-100 mt-2 mt-md-0"
                                //    style={{ marginTop: -27 }}
                                   >  
                                <Button
                                    style={{
                                        fontFamily: "Gilroy",
                                        fontSize: "14px",
                                        backgroundColor: "#1E45E1",
                                        color: "white",
                                        fontWeight: 600,
                                        borderRadius: "8px",
                                        padding: "11px 15px",
                                        paddingLeft: 7,
                                        // marginBottom: "10px", 
                                        // width: "auto",
                                        // maxWidth: "100%",
                                        // maxHeight: 50,
                                        // marginTop: "15px",
                                        whiteSpace: "nowrap",
                                        minWidth: "130px",

                                    }}
                                    onClick={handleShowForm} disabled={showPopupvalidation}>
                                    + Complaint Type
                                </Button>
                            
                        </Col>
                       
                        </div>
                        </Row>
                </div>
            </div>

            {showPopupvalidation && (
                <div className="d-flex flex-wrap mt-3 align-items-center"
                    style={{ gap: "10px" }} >
                    <p style={{ color: "red", fontFamily: "Gilroy", fontSize: 14 }} className="col-12 col-sm-6 col-md-6 col-lg-9">
                        Please add a hostel before adding Complaints information.
                    </p>

                    {/* <img
                        src={close}
                        alt="close icon"
                        onClick={() => setShowPopupValidation(false)}
                        className="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-end"
                        style={{ width: '20px', height: 'auto', cursor: "pointer" }}
                    /> */}

                </div>


            )}




            <div>
                {/* {state.Settings.Complainttypelist && state.Settings.Complainttypelist.length > 0 ? ( */}
                {currentRowCompliance && currentRowCompliance.length > 0 && 
                    //     {/* {state.Settings.currentRowCompliance && state.Settings.currentRowCompliance.length > 0 ? ( */}

                    <div className="container">
                        <div className="row">
                            {
                                currentRowCompliance.map((u, i) => {
                                    // state.Settings.Complainttypelist && state.Settings.Complainttypelist.map((u, i) => {
                                    return (
                                        <>
                                            <div className="col-12 col-sm-6 col-md-12 col-lg-4 mb-3">
                                                <div
                                                    className="d-flex align-items-center justify-content-between p-3 border rounded w-auto"
                                                    style={{ height: 64, width: "100%" }}
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <img src={message} width={24} height={24} alt="Role Icon" />
                                                        <span
                                                            style={{
                                                                marginLeft: 20,
                                                                fontSize: 16,
                                                                fontWeight: 600,
                                                                fontFamily: "Gilroy",
                                                                color: "#222222",
                                                                // whiteSpace:"nowrap"
                                                            }}
                                                        >
                                                            {u.complaint_name}
                                                        </span>
                                                    </div>
                                                    {/* <button className="btn p-2 border-0 bg-transparent">
                                                        <img src={round} width={34} height={34} alt="Menu Icon"
                                                            onClick={(e) => handleShowDots(e, u, i)}
                                                        />
                                                    </button> */}
                                                    <button
                                                     onClick={(e) => handleShowDots(e, u, i)}
                                                     style={{
                                                        height: "35px",
                                                        width: "35px",
                                                        borderRadius: "50%",
                                                        border: "1px solid #EFEFEF",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        // zIndex: showDots ? 1000 : "auto",
                                                        position: "relative",
                                                        cursor: "pointer",
                                                        backgroundColor: showDots === i ?"#E7F1FF" : "white",

                                                     }}
                                                     >
                                                        <PiDotsThreeOutlineVerticalFill
                                                        style={{ height: "18px", width: "18px",
                                                            cursor: "pointer",
                                                         }}
                                                    />

                                                     </button>

                                                </div>

                                                {/* {activeRow && showDots === i && ( */}
                                                {showDots === i && menuLoaded && (
                                                    <div
                                                        ref={popupRef}
                                                        className=""
                                                        style={{
                                                            cursor: "pointer",
                                                            backgroundColor: "#F9F9F9",
                                                            position:"fixed",
                                                            top: popupPosition.top,
                                                            left: popupPosition.left,
                                                            // width: 163,
                                                            width: 120,
                                                            border: "1px solid #EBEBEB",
                                                            borderRadius: 10,
                                                            display: "flex",
                                                            justifyContent: "start",
                                                            padding: 10,
                                                            alignItems: "center",
                                                            zIndex: 1000,
                                                        }}
                                                    >
                                                        <div>
                                                            <div
                                                                className="mb-3 d-flex justify-content-start align-items-center gap-2"
                                                                onClick={() => handleEdit(u)}
                                                            >
                                                                <img src={Edit} alt="edit" style={{ height: 16, width: 16 }} />
                                                                <label className="m-0" style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy, sans-serif", color: "#222222", cursor: "pointer" }}>
                                                                    Edit
                                                                </label>
                                                            </div>
                                                            <div
                                                                className="mb-2 d-flex justify-content-start align-items-center gap-2"
                                                                // style={{ backgroundColor: "#fff" }}
                                                                onClick={() => handleDeleteClick()}
                                                            >
                                                                <img
                                                                    src={Delete}
                                                                    alt="delete"
                                                                    style={{ height: 16, width: 16 }}
                                                                />{" "}
                                                                <label
                                                                    style={{
                                                                        fontSize: 14,
                                                                        fontWeight: 500,
                                                                        fontFamily: "Gilroy,sans-serif",
                                                                        color: "#FF0000",
                                                                        cursor: "pointer",
                                                                    }}
                                                                >
                                                                    Delete
                                                                </label>
                                                            </div>

                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </>

                                    )
                                })
                            }
                        </div>
                    </div>
}
               
            </div>

             { !loading && complianceFilterddata.length === 0 && 
                    <div style={{ marginTop: 100 }}>
                        <div className="d-flex justify-content-center">
                            <img
                                src={EmptyState}
                                style={{ height: 240, width: 240 }}
                                alt="Empty state"
                            />
                        </div>
                        <div
                            className="pb-1 mt-3"
                            style={{
                                textAlign: "center",
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                                fontSize: 20,
                                color: "rgba(75, 75, 75, 1)",
                            }}
                        >
                            No Complaint Types available
                        </div>
                    </div>
                }

            {complianceFilterddata.length >=2  && (
                <nav className="position-fixed bottom-0 end-0 mb-4 me-3 d-flex justify-content-end align-items-center">
                    {/* Dropdown for Items Per Page */}
                    <div>
                        <select
                            value={compliancerowsPerPage}
                            onChange={handleItemsPerPageChange}
                            style={{
                                padding: "5px",
                                border: "1px solid #1E45E1",
                                borderRadius: "5px",
                                color: "#1E45E1",
                                fontWeight: "bold",
                                cursor: "pointer",
                                outline: "none",
                                boxShadow: "none",
                            }}
                        >
                            <option value={2}>2</option>
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>

                    {/* Pagination Controls */}
                    <ul
                        style={{
                            display: "flex",
                            alignItems: "center",
                            listStyleType: "none",
                            margin: 0,
                            padding: 0,
                        }}
                    >
                        {/* Previous Button */}
                        <li style={{ margin: "0 10px" }}>
                            <button
                                style={{
                                    padding: "5px",
                                    textDecoration: "none",
                                    color: compliancecurrentPage === 1 ? "#ccc" : "#1E45E1",
                                    cursor: compliancecurrentPage === 1 ? "not-allowed" : "pointer",
                                    borderRadius: "50%",
                                    display: "inline-block",
                                    minWidth: "30px",
                                    textAlign: "center",
                                    backgroundColor: "transparent",
                                    border: "none",
                                }}
                                onClick={() => handlePageChange(compliancecurrentPage - 1)}
                                disabled={compliancecurrentPage === 1}
                            >
                                <ArrowLeft2
                                    size="16"
                                    color={compliancecurrentPage === 1 ? "#ccc" : "#1E45E1"}
                                />
                            </button>
                        </li>

                        {/* Current Page Indicator */}
                        <li
                            style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}
                        >
                            {compliancecurrentPage} of {totalPagesGeneral}
                        </li>

                        {/* Next Button */}
                        <li style={{ margin: "0 10px" }}>
                            <button
                                style={{
                                    padding: "5px",
                                    textDecoration: "none",
                                    color:
                                        compliancecurrentPage === totalPagesGeneral
                                            ? "#ccc"
                                            : "#1E45E1",
                                    cursor:
                                        compliancecurrentPage === totalPagesGeneral
                                            ? "not-allowed"
                                            : "pointer",
                                    borderRadius: "50%",
                                    display: "inline-block",
                                    minWidth: "30px",
                                    textAlign: "center",
                                    backgroundColor: "transparent",
                                    border: "none",
                                }}
                                onClick={() => handlePageChange(compliancecurrentPage + 1)}
                                disabled={compliancecurrentPage === totalPagesGeneral}
                            >
                                <ArrowRight2
                                    size="16"
                                    color={
                                        compliancecurrentPage === totalPagesGeneral
                                            ? "#ccc"
                                            : "#1E45E1"
                                    }
                                />
                            </button>
                        </li>
                    </ul>
                </nav>
            )}

            <Modal className="editform custom-modal"
                show={showEditForm}
                onHide={() => handleClose()}
                backdrop="static"
                centered
            >
                <Modal.Header style={{ position: "relative" }}>
                    <div
                        style={{
                            fontSize: 18,
                            fontWeight: 600,
                            fontFamily: "Gilroy",
                        }}
                    >
                        Edit Complaint Type
                    </div>
                    <CloseCircle size="24" color="#000" onClick={handleClose} 
            style={{ cursor: 'pointer' }}/>
                </Modal.Header>
                <Modal.Body>
                    <div className="col">
                        <div className="col-lg-12 col-md-6 col-sm-12 col-xs-12 ">
                            <Form.Group>
                                <Form.Label
                                    style={{
                                        fontSize: 14,
                                        color: "#222222",
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                    }}
                                >
                                    Complaint Type{" "}
                                    <span style={{ color: "red", fontSize: "20px" }}> * </span>
                                </Form.Label>
                                <FormControl
                                    type="text"
                                    id="form-controls"
                                    placeholder="Enter Complaint Type"
                                    value={complaintTypeName}
                                    onChange={(e) => handleComplaintType(e)}
                                    style={{
                                        fontSize: 16,
                                        color: "#4B4B4B",
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                        boxShadow: "none",
                                        border: "1px solid #D9D9D9",
                                        height: 50,
                                        borderRadius: 8,
                                    }}
                                />

                            </Form.Group>
                           
                            <div className="d-flex align-items-center justify-content-center"style={{marginTop:"10px"}}>
                                {isChangedError && (
                                    <>
                                        <MdError style={{marginRight:"7px",color:"red"}}/>
                                        <span style={{ color: "red", fontSize: 13, fontFamily:"Gilroy"}}> {isChangedError} </span>
                                    </>
                                )}
                            </div>
                        </div>


                    </div>
                    <Button
                        className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                        style={{
                            backgroundColor: "#1E45E1",
                            fontWeight: 600,
                            height: 50,
                            borderRadius: 12,
                            fontSize: 16,
                            fontFamily: "Montserrat, sans-serif",
                            marginTop: 8,
                        }}
                        onClick={handleEditType}
                    >
                        Edit Complaint Type
                    </Button>
                </Modal.Body>
            </Modal>

            <Modal
                show={showForm}
                onHide={() => handleClose()}
                backdrop="static"
                centered
            >
                <Modal.Header style={{ position: "relative" }}>
                    <div
                        style={{
                            fontSize: 20,
                            fontWeight: 600,
                            fontFamily: "Gilroy",
                        }}
                    >
                        Add Complaint Type
                    </div>
                    <CloseCircle size="24" color="#000" onClick={handleClose} 
            style={{ cursor: 'pointer' }}/>
                </Modal.Header>
                <Modal.Body>
                    <div className="col">
                        <div className="col-lg-12 col-md-6 col-sm-12 col-xs-12">
                            <Form.Group className="mb-3">
                                <Form.Label
                                    style={{
                                        fontSize: 16,
                                        color: "#222222",
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                    }}
                                >
                                    Complaint Type{" "}
                                    <span style={{ color: "red", fontSize: "20px" }}> * </span>
                                </Form.Label>
                                <FormControl
                                    type="text"
                                    id="form-controls"
                                    placeholder="Enter Complaint Type"
                                    value={complaintTypeName}
                                    onChange={(e) => handleComplaintType(e)}
                                    style={{
                                        fontSize: 16,
                                        color: "#4B4B4B",
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                        boxShadow: "none",
                                        border: "1px solid #D9D9D9",
                                        height: 50,
                                        borderRadius: 8,
                                    }}
                                />
                            </Form.Group>
                            <div style={{ marginTop: "-10px" }}>
                                {complaintError && (
                                    <p style={{ display: "flex", fontSize: "13px", alignItems: "center", color: "red", fontFamily: "Gilroy", marginBottom: "-15px" }}>
                                        <span style={{ fontSize: "13px", color: "red", marginRight: "5px", marginBottom: "5px" }}>
                                            <MdError />
                                        </span>
                                        {complaintError}
                                    </p>
                                )}
                            </div>
                        </div>


                    </div>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center" style={{ borderTop: "none" }}>
                    <Button
                        className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                        style={{
                            backgroundColor: "#1E45E1",
                            fontWeight: 600,
                            height: 50,
                            borderRadius: 12,
                            fontSize: 14,
                            padding: "12px 16px 12px 16px",
                            fontFamily: "Montserrat, sans-serif",
                            marginBottom: 15,

                        }}
                        onClick={handleAddComplaintType}
                    >
                        + Complaint Type
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* {showPopup && (
                <div
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                    }}
                >
                    <div
                        style={{
                            backgroundColor: "#fff",
                            padding: 20,
                            borderRadius: 10,
                            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                            textAlign: "center",
                        }}
                    >
                        <h4>Are you sure you want to delete?</h4>
                        <div style={{ marginTop: 20, display: "flex", gap: 10, justifyContent: "center" }}>
                            <button
                                onClick={() => { handleConfirmDelete() }}
                                className="btn btn-primary"
                                style={{ padding: "8px 16px" }}
                            >
                                Yes
                            </button>
                            <button
                                onClick={() => { handleCancel() }}
                                className="btn btn-secondary"
                                style={{ padding: "8px 16px" }}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )} */}
            <Modal
                show={showPopup}
                // onHide={handleCloseDelete}
                centered
                backdrop="static"
               dialogClassName="custom-delete-modal"
            >
                <Modal.Header style={{ borderBottom: 'none' }}>
                    <Modal.Title
                    className="w-100 text-center"
                        style={{
                            fontSize: '18px',
                            fontFamily: 'Gilroy',
                           
                            fontWeight: 600,
                            color: '#222222',
                            
                        }}
                    >
                        Delete ComplaintType?
                    </Modal.Title>
                </Modal.Header>

                <Modal.Body
                className="text-center"
                    style={{
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: 'Gilroy',
                        color: '#646464',
                        
                        marginTop: '-10px'
                    }}
                >
                    Are you sure you want to delete this Complaint-type?
                </Modal.Body>

                <Modal.Footer 
                className="d-flex justify-content-center"
                style={{  borderTop: 'none', marginTop: '-10px' }}>
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
                        // onClick={handleCloseDelete}  
                        onClick={() => { handleCancel() }}

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
                        // onClick={confirmDelete}  
                        onClick={() => { handleConfirmDelete() }}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    )
}

SettingCompliance.propTypes = {
    hostelid: PropTypes.func.isRequired
  };
  
export default SettingCompliance;