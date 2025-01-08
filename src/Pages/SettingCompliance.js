import React, { useEffect, useRef, useState } from "react";
import message from "../Assets/Images/New_images/messages-3.png";
import Edit from "../Assets/Images/Edit-Linear-32px.png";
import Delete from "../Assets/Images/Trash-Linear-32px.png";
import round from "../Assets/Images/Group 14.png"
import { Button, Col, Form, FormControl } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from 'react-redux';
import EmptyState from '../Assets/Images/New_images/empty_image.png';
import close from '../Assets/Images/close.svg';

function SettingCompliance({ hostelid }) {

    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const popupRef = useRef(null);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
    const [activeRow, setActiveRow] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [complaintTypeName, setComplaintTypeName] = useState('')
    const [comlaintError, setComplaintError] = useState('')
    const [edit, setEdit] = useState(false);
    const [id, setId] = useState('');
    const [rowDetails, setRowDetails] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const handleDeleteClick = () => {
        setShowPopup(true);
    };

    const handleConfirmDelete = () => {
        setActiveRow(false)
        if (rowDetails.id) {
            dispatch({ type: 'DELETE-COMPLAINT-TYPE', payload: { id: rowDetails.id } })
        }
        setTimeout(() => {
            setShowPopup(false);
        }, 200);
    };

    const handleCancel = () => {
        setShowPopup(false);
        setActiveRow(false)
    };

    useEffect(() => {
        dispatch({ type: 'COMPLAINT-TYPE-LIST', payload: { hostel_id: hostelid } })
    }, [hostelid])

    const handleShowDots = (e, row) => {
        setRowDetails(row)
        if (activeRow === true) {
            setActiveRow(false);
        } else {
            const rect = e.currentTarget.getBoundingClientRect();
            setPopupPosition({
                top: rect.top + window.scrollY + 30,
                left: rect.left + window.scrollX - 120,
            });
            setActiveRow(true);
        }
    };

    // const handleEdit = () => {
    //     setActiveRow(null)
    //     setShowForm(true)
    //     setEdit(true)
    //     setId(rowDetails.id)
    //     setComplaintTypeName(rowDetails.complaint_name)
    // }
    const handleEdit = () => {
        setActiveRow(null)
        setShowEditForm(true)
        setEdit(true)
        setId(rowDetails.id)
        setComplaintTypeName(rowDetails.complaint_name)
    }

    const handleClose = () => {
        setShowForm(false)
        setId('')
        setComplaintTypeName('')
        setShowEditForm(false)
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
            setComplaintError('Please enter Complaint Type')
        }
        else {
            dispatch({ type: 'COMPLAINT-TYPE-ADD', payload: { complaint_name: complaintTypeName, hostel_id: hostelid } })
            setComplaintError('')
        }
    }

    //edit complaint type
    //COMPLAINT-TYPE-LIST 
            //COMPLAINT-TYPE-EDIT (complaint_name,id,hostel_id)
    const handleEditType = () => {

        if (!complaintTypeName) {
            setComplaintError('Please enter Complaint Type')
        }
        else {
            dispatch({ type: 'COMPLAINT-TYPE-EDIT', payload: { complaint_name: complaintTypeName, hostel_id: hostelid,id:id } })
            setComplaintError('')
        }
    }

    
    const handleComplaintType = (e) => {
        setComplaintTypeName(e.target.value)
        if (e.target.value) {
            setComplaintError('')
        }
    }

    useEffect(() => {
        if (state.Settings.getcomplainttypeStatuscode === 200) {
            setTimeout(() => {
                dispatch({ type: 'CLEAR_GET_COMPLAINTTYPE_STATUS_CODE' })
            }, 1000);
        }
    }, [state.Settings.getcomplainttypeStatuscode])

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



    return (
        <div className="container">
          <div style={{ position: "sticky",top: 0, zIndex: 1000,backgroundColor: "white" }}>
               <div className="d-flex row mb-4 mt-4">
                 <Col>
                   <h4 style={{ fontSize: 18, color: "#000000", fontWeight: 600, fontFamily: "Gilroy"}}>
                    Complaint Type
                     </h4>
                 </Col>
                 
                <Col>
                  <div className="d-flex justify-content-end">
                    <Button  style={{ backgroundColor: "#1E45E1", color: "#ffffff", fontFamily: "Gilroy",
                                     fontSize: 14,  fontWeight: 600,  borderRadius: 8,  padding: "12px 16px 12px 16px"}}
                               onClick={handleShowForm} disabled={showPopupvalidation}>
                           + Complaint Type
                             </Button>
                                    </div>
                </Col>
                </div>
                </div>
              
                {showPopupvalidation && (
        <div className="d-flex flex-wrap mt-3 align-items-center" 
        style={{ gap: "10px" }} >
        <p style={{color: "red"}} className="col-12 col-sm-6 col-md-6 col-lg-9">
          !Please add a hostel before adding Complaints information.
        </p>
        
        <img 
  src={close} 
  alt="close icon" 
  onClick={() => setShowPopupValidation(false)}
  className="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-end"
  style={{ width: '20px', height: 'auto' ,cursor:"pointer"}} 
/>

      </div>
      
      
      )}
    



            <div>
  {state.Settings.Complainttypelist && state.Settings.Complainttypelist.length > 0 ? (
    <div className="container">
      <div className="row">
                    {

                        state.Settings.Complainttypelist && state.Settings.Complainttypelist.map((u) => {
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
                                            <button className="btn p-2">
                                                <img src={round} width={34} height={34} alt="Menu Icon"
                                                    onClick={(e) => handleShowDots(e, u)}
                                                />
                                            </button>
                                        </div>

                                        {activeRow && (
                                            <div
                                                ref={popupRef}
                                                className="position-absolute"
                                                style={{
                                                    cursor: "pointer",
                                                    backgroundColor: "#fff",
                                                    top: popupPosition.top,
                                                    left: popupPosition.left,
                                                    width: 163,
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
                                                        <img src={Edit} style={{ height: 16, width: 16 }} />
                                                        <label className="m-0" style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy, sans-serif", color: "#222222" }}>
                                                            Edit
                                                        </label>
                                                    </div>
                                                    <div
                                                        className="mb-2 d-flex justify-content-start align-items-center gap-2"
                                                        style={{ backgroundColor: "#fff" }}
                                                        onClick={() => handleDeleteClick()}
                                                    >
                                                        <img
                                                            src={Delete}
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
  ) : (
    <div style={{marginTop:100,alignItems:"center",justifyContent:"center"}}>
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
        No Complaints available
      </div>
    </div>
  )}
</div>

<Modal className="editform"
show={showEditForm}
onHide={() => handleClose()}
backdrop="static"
centered
>
<Modal.Header style={{ marginBottom: "30px", position: "relative" }}>
    <div
        style={{
            fontSize: 20,
            fontWeight: 600,
            fontFamily: "Gilroy",
        }}
    >
        Edit Complaint Type
    </div>
    <button
        type="button"
        className="close"
        aria-label="Close"
        onClick={handleClose}
        style={{
            position: "absolute",
            right: "10px",
            top: "16px",
            border: "1px solid black",
            background: "transparent",
            cursor: "pointer",
            padding: "0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "32px",
            height: "32px",
            borderRadius: "50%",
        }}
    >
        <span
            aria-hidden="true"
            style={{
                fontSize: "30px",
                paddingBottom: "6px",
            }}
        >
            &times;
        </span>
    </button>
</Modal.Header>
<Modal.Body>
    <div className="col">
        <div className="col-lg-12 col-md-6 col-sm-12 col-xs-12">
            <Form.Group className="mb-3">
                <Form.Label
                    style={{
                        fontSize: 14,
                        color: "#222222",
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                    }}
                >
                    Complain Type{" "}
                    {/* <span style={{ color: "red", fontSize: "20px" }}> * </span> */}
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
            {comlaintError && <span style={{ color: "red", fontSize: 16 }}> * {comlaintError} </span>}
        </div>


    </div>
</Modal.Body>

<Modal.Footer className="d-flex justify-content-center">
    <Button
        className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
        style={{
            backgroundColor: "#1E45E1",
            fontWeight: 600,
            height: 50,
            borderRadius: 12,
            fontSize: 16,
            fontFamily: "Montserrat, sans-serif",
            marginTop: 20,
        }}
        onClick={handleEditType}
    >
        Edit Complaint Type
    </Button>
</Modal.Footer>
</Modal>

            <Modal
                show={showForm}
                onHide={() => handleClose()}
                backdrop="static"
                centered
            >
                <Modal.Header style={{ marginBottom: "30px", position: "relative" }}>
                    <div
                        style={{
                            fontSize: 20,
                            fontWeight: 600,
                            fontFamily: "Gilroy",
                        }}
                    >
                        Add Complaint Type
                    </div>
                    <button
                        type="button"
                        className="close"
                        aria-label="Close"
                        onClick={handleClose}
                        style={{
                            position: "absolute",
                            right: "10px",
                            top: "16px",
                            border: "1px solid black",
                            background: "transparent",
                            cursor: "pointer",
                            padding: "0",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                        }}
                    >
                        <span
                            aria-hidden="true"
                            style={{
                                fontSize: "30px",
                                paddingBottom: "6px",
                            }}
                        >
                            &times;
                        </span>
                    </button>
                </Modal.Header>
                <Modal.Body>
                    <div className="col">
                        <div className="col-lg-12 col-md-6 col-sm-12 col-xs-12">
                            <Form.Group className="mb-3">
                                <Form.Label
                                    style={{
                                        fontSize: 14,
                                        color: "#222222",
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                    }}
                                >
                                    Complain Type{" "}
                                    {/* <span style={{ color: "red", fontSize: "20px" }}> * </span> */}
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
                            {comlaintError && <span style={{ color: "red", fontSize: 16 }}> * {comlaintError} </span>}
                        </div>


                    </div>
                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-center">
                    <Button
                        className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
                        style={{
                            backgroundColor: "#1E45E1",
                            fontWeight: 600,
                            height: 50,
                            borderRadius: 12,
                            fontSize: 16,
                            fontFamily: "Montserrat, sans-serif",
                            marginTop: 20,
                        }}
                        onClick={handleAddComplaintType}
                    >
                        + Add Complaint Type
                    </Button>
                </Modal.Footer>
            </Modal>
            {showPopup && (
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
            )}

        </div>
    )
}
export default SettingCompliance;