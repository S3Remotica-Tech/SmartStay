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
import { MdError } from "react-icons/md";
import { CloseCircle } from "iconsax-react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { JoininDatecustomer } from "../../Redux/Action/smartStayAction";

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
            setFloor(stayDetais[0].Floor)
            setRooms(stayDetais[0].Rooms)
            setBed(stayDetais[0].Bed)
            setSelectedDate(stayDetais[0].user_join_date)
            setAdvanceAmount(stayDetais[0].AdvanceAmount)
            setRoomRent(stayDetais[0].RoomRent)

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

    useEffect(() => {
        if (state.login.selectedHostel_Id && Floor) {
            dispatch({
                type: "ROOMDETAILS",
                payload: { hostel_Id: state.login.selectedHostel_Id, floor_Id: Floor },
            });
        }
    }, [Floor]);


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
                                <Form.Label
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                        paddingTop: "6px",
                                    }}
                                >
                                    Floor  {" "}
                                    <span style={{ color: "red", fontSize: "20px" }}>
                                        {" "}
                                        *{" "}
                                    </span>
                                </Form.Label>

                            

  <FormControl
                                        type="text"
                                        placeholder="Enter Amount"
                                        value={Floor}
                                      
                                        disabled
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
                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
                                <Form.Label
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                    }}
                                >
                                    Room {" "}
                                    <span style={{ color: "red", fontSize: "20px" }}>
                                        {" "}
                                        *{" "}
                                    </span>
                                </Form.Label>

                               
                                 <FormControl
                                        type="text"
                                        placeholder="Enter Amount"
                                        value={Rooms}
                                        disabled
                                       
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


                            </div>

                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
                                <Form.Label
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 500,
                                        fontFamily: "Gilroy",
                                    }}
                                >
                                    Bed {" "}
                                    <span style={{ color: "red", fontSize: "20px" }}>
                                        {" "}
                                        *{" "}
                                    </span>
                                </Form.Label>

                              
                                 <FormControl
                                        type="text"
                                        placeholder="Enter Amount"
                                        value={Bed}
                                        disabled
                                       
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


                            </div>


                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
                                <Form.Group controlId="purchaseDate">
                                    <Form.Label
                                        style={{
                                            fontSize: 14,
                                            color: "#222222",
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                        }}
                                    >
                                        Joining Date{" "}
                                        <span style={{ color: "red", fontSize: "20px" }}>
                                            *
                                        </span>
                                    </Form.Label>

                                    <div
                                        className="datepicker-wrapper"
                                        style={{ position: "relative", width: "100%" }}
                                    >
                                        <DatePicker
                                            style={{
                                                width: "100%",
                                                height: 48,
                                                cursor: "pointer",
                                                fontFamily: "Gilroy"
                                            }}
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
                                    <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>
                                        Advance Amount
                                        <span style={{ color: "red", fontSize: "20px" }}> *</span>
                                    </Form.Label>
                                    <FormControl
                                        type="text"
                                        placeholder="Enter Amount"
                                        value={AdvanceAmount}
                                        onChange={handleAdvanceAmount}
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

                            </div>


                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
                                <Form.Group>
                                    <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>
                                        Rental Amount
                                        <span style={{ color: "red", fontSize: "20px" }}> *</span>
                                    </Form.Label>
                                    <FormControl
                                        type="text"
                                        placeholder="Enter Amount"
                                        value={RoomRent}
                                        onChange={handleRoomRent}
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

                            </div>

                            {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
                                <Form.Group>
                                    <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>
                                        Maintenance Fee (Non Refundable)
                                        <span style={{ color: "red", fontSize: "20px" }}> *</span>
                                    </Form.Label>
                                    <FormControl
                                        type="text"
                                        placeholder="Enter Amount"
                                        value={MaintenanceFee}
                                        onChange={handleMaintenanceFee}
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

                            </div>
                            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2">
                                <Form.Group>
                                    <Form.Label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}>
                                        Document Fee (Non Refundable)
                                        <span style={{ color: "red", fontSize: "20px" }}> *</span>
                                    </Form.Label>
                                    <FormControl
                                        type="text"
                                        placeholder="Enter Amount"
                                        value={DocumentFee}
                                        onChange={handleDocumentFee}
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

                            </div> */}
 {stayDetais[0].reasonData?.map((item, index) => (
  <div
    key={index}
    className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-2"
  >
    <Form.Group>
      <Form.Label
        style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}
      >
        {`${item.reason.charAt(0).toUpperCase() + item.reason.slice(1)} Fee (Non Refundable)`}{" "}
        <span style={{ color: "red", fontSize: "20px" }}> *</span>
      </Form.Label>
      <FormControl
        type="text"
        value={item.amount}
        readOnly
        style={{
          fontSize: 16,
          color: "#4B4B4B",
          fontFamily: "Gilroy",
          fontWeight: 500,
          boxShadow: "none",
          border: "1px solid #D9D9D9",
          height: 50,
          borderRadius: 8,
          backgroundColor: "#F5F5F5", 
        }}
      />
    </Form.Group>
  </div>
))}


                        </div>




                    </Modal.Body>


                    {state.createAccount?.networkError ?
                        <div className='d-flex  align-items-center justify-content-center mt-2 mb-2'>
                            <MdError style={{ color: "red", marginLeft: "15px", marginRight: 5, fontSize: "14px" }} />
                            <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
                        </div>
                        : null}
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