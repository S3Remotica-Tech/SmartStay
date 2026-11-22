/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
    Modal,
    Form,
    Button,
    FormControl

} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { CloseCircle } from "iconsax-react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { JoininDatecustomer } from "../../Redux/Action/LoginAction";
import {
  datePickerClass,
  fieldClass,
  fieldLabelClass,
  fieldRequiredClass,
} from "../../Utils/FieldStyles";


function EditStayDetails({ show, handleClose,stayDetais }) {

    const state = useSelector((state) => state);
    const dispatch = useDispatch();


    const [Floor, setFloor] = useState(null);
    const [Rooms, setRooms] = useState(null);
    const [Bed, setBed] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [AdvanceAmount, setAdvanceAmount] = useState('');
    const [RoomRent, setRoomRent] = useState('');
   




    useEffect(()=>{
        if(stayDetais){
            setFloor(stayDetais.hostelInfo.floorName)
            setRooms(stayDetais.hostelInfo.roomName)
            setBed(stayDetais.hostelInfo.bedName)
           setSelectedDate(dayjs(stayDetais.hostelInfo.joiningDate, "DD/MM/YYYY"));
            setAdvanceAmount(stayDetais.hostelInfo.advanceAmount)
            setRoomRent(stayDetais.hostelInfo.monthlyRent)

        }

    },[stayDetais])


    

    

    const handleAdvanceAmount = (e) => {
        setAdvanceAmount(e.target.value);
    };

    const handleRoomRent = (e) => {
        setRoomRent(e.target.value);
    };

    


    useEffect(() => {
        if(state.login.selectedHostel_Id){
        dispatch({
            type: "HOSTELDETAILLIST",
            payload: { hostel_Id: state.login.selectedHostel_Id },
        });
    }
    }, [state.login.selectedHostel_Id]);

    // useEffect(() => {
    //     if (state.login.selectedHostel_Id && Floor) {
    //         dispatch({
    //             type: "ROOMDETAILS",
    //             payload: { hostel_Id: state.login.selectedHostel_Id, floor_Id: Floor },
    //         });
    //     }
    // }, [Floor]);


    useEffect(() => {
        if (state.createAccount?.networkError) {
            setTimeout(() => {
                dispatch({ type: 'CLEAR_NETWORK_ERROR' })
            }, 3000)
        }

    }, [state.createAccount?.networkError])


    return (
        <div
            className="modal show"
            style={{
                display: "block",
                position: "initial",
                
            }}
        >
            <Modal show={show}
                onHide={handleClose}
                centered backdrop="static">
                <Modal.Dialog
                    style={{
                        maxWidth: 850, width: "100%",
                        paddingTop: 5,
                        paddingBottom: 10,
                        paddingLeft: 10,
                        paddingRight: 10
                    }}
                    className="m-0 p-0"
                >
                    <Modal.Header style={{ border: "1px solid #E7E7E7" }}>
                        <Modal.Title
                            style={{
                                fontSize: 18,
                                color: "#222222",
                                fontFamily: "Gilroy",
                                fontWeight: 600,
                            }}
                        >
                            Edit Stay Details
                        </Modal.Title>

                        <CloseCircle size="24" color="#000"
                            onClick={handleClose}
                            style={{ cursor: "pointer" }} />
                    </Modal.Header>

                    <Modal.Body style={{ maxHeight: "370px", overflowY: "scroll" }} className="show-scroll pt-1 ps-3  pe-3 mt-2 me-3" >
                        <div className="row mb-0">
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
                                <Form.Label className={fieldLabelClass}
                                   
                                >
                                    Floor  {" "}
                                    <span style={{ color: "red", fontSize: "20px" }}>
                                        {" "}
                                        *{" "}
                                    </span>
                                </Form.Label>

                            

  <FormControl className={fieldClass()}
                                        type="text"
                                        placeholder="Enter Amount"
                                        value={Floor}
                                      
                                        disabled
                                       
                                    />
                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
                                <Form.Label className={fieldLabelClass}
                                   
                                >
                                    Room {" "}
                                    <span style={{ color: "red", fontSize: "20px" }}>
                                        {" "}
                                        *{" "}
                                    </span>
                                </Form.Label>

                               
                                 <FormControl className={fieldClass()}
                                        type="text"
                                        placeholder="Enter Amount"
                                        value={Rooms}
                                        disabled
                                       
                                       
                                    />


                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
                                <Form.Label className={fieldLabelClass}
                                   
                                >
                                    Bed {" "}
                                    <span style={{ color: "red", fontSize: "20px" }}>
                                        {" "}
                                        *{" "}
                                    </span>
                                </Form.Label>

                              
                                 <FormControl className={fieldClass()}
                                        type="text"
                                        placeholder="Enter Amount"
                                        value={Bed}
                                        disabled
                                       
                                       
                                    />


                            </div>


                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
                                <Form.Group controlId="purchaseDate">
                                    <Form.Label className={fieldLabelClass}
                                       
                                    >
                                        Joining Date{" "}
                                        <span className={fieldRequiredClass}>
                                            *
                                        </span>
                                    </Form.Label>

                                    <div
                                        className="datepicker-wrapper"
                                        style={{ position: "relative", width: "100%" }}
                                    >
                                        <DatePicker className={datePickerClass()}
                                           
                                            format="DD/MM/YYYY"
                                            disabled
                                            placeholder="DD/MM/YYYY"
                                            value={selectedDate ? dayjs(selectedDate) : null}
                                            onChange={(date) => {
                                                                                                setSelectedDate(date ? date.toDate() : null);
                                                                                                dispatch(JoininDatecustomer(date ? date.toDate() : null));
                                            }}
                                            getPopupContainer={(triggerNode) =>
                                                triggerNode.closest(".show-scroll") || document.body
                                            }
                                            disabledDate={(current) => current && current > dayjs().endOf("day")}
                                        />
                                    </div>
                                </Form.Group>




                            </div>


                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
                                <Form.Group>
                                    <Form.Label className={fieldLabelClass}>
                                        Advance Amount
                                        <span className={fieldRequiredClass}> *</span>
                                    </Form.Label>
                                    <FormControl className={fieldClass()}
                                        type="text"
                                        placeholder="Enter Amount"
                                        value={AdvanceAmount}
                                        onChange={handleAdvanceAmount}
                                       
                                    />
                                </Form.Group>

                            </div>


                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
                                <Form.Group>
                                    <Form.Label className={fieldLabelClass}>
                                        Rental Amount
                                        <span className={fieldRequiredClass}> *</span>
                                    </Form.Label>
                                    <FormControl className={fieldClass()}
                                        type="text"
                                        placeholder="Enter Amount"
                                        value={RoomRent}
                                        onChange={handleRoomRent}
                                       
                                    />
                                </Form.Group>

                            </div>

                            {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
                                <Form.Group>
                                    <Form.Label className={fieldLabelClass}>
                                        Maintenance Fee (Non Refundable)
                                        <span className={fieldRequiredClass}> *</span>
                                    </Form.Label>
                                    <FormControl className={fieldClass()}
                                        type="text"
                                        placeholder="Enter Amount"
                                        value={MaintenanceFee}
                                        onChange={handleMaintenanceFee}
                                       
                                    />
                                </Form.Group>

                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
                                <Form.Group>
                                    <Form.Label className={fieldLabelClass}>
                                        Document Fee (Non Refundable)
                                        <span className={fieldRequiredClass}> *</span>
                                    </Form.Label>
                                    <FormControl className={fieldClass()}
                                        type="text"
                                        placeholder="Enter Amount"
                                        value={DocumentFee}
                                        onChange={handleDocumentFee}
                                       
                                    />
                                </Form.Group>

                            </div> */}
 {/* {stayDetais[0].reasonData?.map((item, index) => (
  <div
    key={index}
    className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2"
  >
    <Form.Group>
      <Form.Label className={fieldLabelClass}
       
      >
        {`${item.reason.charAt(0).toUpperCase() + item.reason.slice(1)} Fee (Non Refundable)`}{" "}
        <span className={fieldRequiredClass}> *</span>
      </Form.Label>
      <FormControl className={fieldClass()}
        type="text"
        value={item.amount}
        readOnly
       
      />
    </Form.Group>
  </div>
))} */}


                        </div>




                    </Modal.Body>


                   
                    <Modal.Footer style={{ border: "none", paddingTop: 0 }}>
                        <div className="d-flex justify-content-end gap-3">


                            <Button
                                onClick={handleClose}
                                className="w-100 mt-1"
                                style={{
                                    backgroundColor: "#fff",
                                    border: "none",
                                    color: "#1E45E1",
                                    fontWeight: 600,
                                    borderRadius: 12,
                                    fontSize: 16,
                                    fontFamily: "Gilroy",
                                    padding: "8px 40px"
                                }}
                            >
                                Cancel
                            </Button>

                            <Button
                               
                                className="w-100 mt-1"
                                style={{
                                    backgroundColor: "#1E45E1",
                                    fontWeight: 600,
                                    borderRadius: 12,
                                    fontSize: 16,
                                    fontFamily: "Gilroy",
                                    padding: "8px 40px"
                                }}
                            >
                                Update
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </div>
    )
}
EditStayDetails.propTypes = {
  show: PropTypes.func.isRequired,
 handleClose: PropTypes.func.isRequired,
  stayDetais: PropTypes.func.isRequired,
  
};

export default EditStayDetails