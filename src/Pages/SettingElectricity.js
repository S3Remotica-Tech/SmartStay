import { borderRadius } from '@mui/system';
import React, { useEffect, useState } from 'react';
import round from "../Assets/Images/dot_round.png"
import { Container, Row, Col, Card, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from 'react-redux';
import SettingsElectricityTable from './SettingsElectricityTable';
import { MdError } from "react-icons/md";
import EmptyState from '../Assets/Images/New_images/empty_image.png';
import close from '../Assets/Images/close.svg';
import Delete from "../Assets/Images/New_images/trash.png";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Edit from "../Assets/Images/New_images/edit.png";
import Select from "react-select";
import './SettingAll.css'


const SettingElectricity = ({ hostelid }) => {

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [isRecurring, setIsRecurring] = useState(false);
  const [roomBasedCalculation, setRoomBasedCalculation] = useState(false);
  const [hostelBasedCalculation, setHostelBasedCalculation] = useState(false);
  const [showFormElectricity, setShowFormElectricity] = useState(false);
  const [unit, setUnit] = useState('1');
  const [amount, setAmount] = useState('');
  const [unitErr, setUnitErr] = useState('');
  const [amountErr, setAmountErr] = useState('');
  const [totalErr, setTotalErr] = useState('');
  const [tableShow, setTableShow] = useState(false);
  const [recurringform, setRecurringForm] = useState(false);
  const [calculatedstartdate, setCalculatedstartdate] = useState(null);
  const [calculatedenddate, setCalculatedEnddate] = useState("");
  const [calculatedstartdateerrmsg, setCalculatedstartdateErrmsg] = useState("");
  const [calculatedenddateerrmsg, setCalculatedEnddateErrMsg] = useState("");
  const [every_recurr, setEvery_Recurr] = useState("");

  const [editHostel, setEditHostel] = useState({ id: '', name: '', editamount: '' })
  const [showdeleteform, setShowDeleteform] = useState(false)


  const [EbList, setEbList] = useState([])
  const [loading, setLoading] = useState(true)


  // useEffect(() => {
  //   if (hostelid) {
  //     dispatch({ type: 'EB-BILLING-UNIT-LIST', payload: { hostel_id: hostelid } })
  //   }
  // }, [hostelid])


  console.log("state.Settings.addEbbillingUnitStatuscode", state.Settings.addEbbillingUnitStatuscode)
  useEffect(() => {
    if (state.Settings.addEbbillingUnitStatuscode === 200 || state.Settings.deleteElectricityStatuscode === 200) {

      dispatch({ type: 'EB-BILLING-UNIT-LIST', payload: { hostel_id: hostelid } })
      handleClose()

      setTimeout(() => {
        dispatch({ type: 'CLEAR_ADD_EB_BILLING_STATUS_CODE' })
      }, 500);

      setTimeout(() => {
        dispatch({ type: 'CLEAR_DELETE_ELECTRICITY_STATUS_CODE' })
      }, 500);
    }
  }, [state.Settings.addEbbillingUnitStatuscode, state.Settings.deleteElectricityStatuscode])

  const handleClose = () => {
    setShowFormElectricity(false)
    setUnit('')
    setAmount('')
    setAmountErr('');
    setTotalErr('');
  }

  //add electricity button
  // const handleShowFormElectricity = () => {
  //   setShowFormElectricity(true)
  //   if (!hostelid) {
  //     alert("Please add a hostel before adding electricity information.");
  //     return;
  //   }
  //   console.log("Opening Electricity Form...");
  // }
  const [showPopup, setShowPopup] = useState(false);
  const handleShowFormElectricity = () => {
    if (!hostelid) {
      setShowPopup(true);
      return;
    }
    setEditHostel({ id: null, name: null, editamount: null })
    setShowFormElectricity(true);
    setEdit(false)
  };





  const [showDots, setShowDots] = useState(false);
  const [edit, setEdit] = useState(false)
  const handleShowDots = () => {
    setShowDots(!showDots);
  };

  const handleEditElectricity = (item, v) => {

    if (!hostelid) {
      setShowPopup(true);
      return;
    }
    setEdit(true)
    setShowFormElectricity(true);
    // setUnit(item.unit)
    setAmount(item.amount)
    setEditHostel({ id: item.hostel_id, name: item.Name, editamount: item.amount })

  }


  const handleChangeUnit = (e) => {
    setUnit(e.target.value)
    if (e.target.value !== '') {
      setUnitErr('')
    }
  }

  const handleChangeAmount = (e) => {
    const newAmount = e.target.value;
    setAmount(newAmount);

    if (newAmount !== '') {
      setAmountErr('');
      setTotalErr('')
    }

    if (editHostel && editHostel.editamount == newAmount) {
      setTotalErr('No changes Deducted');
    }
  };

  const handleAddElectricity = () => {
        if (amount === '') {
      setAmountErr('Please Enter Amount');
      return;
    }

    if (edit && editHostel && editHostel.editamount == amount) {
      setTotalErr('No changes Deducted');
      return;
    }




    if (edit && editHostel && amount !== '') {
    
      dispatch({
        type: 'EB-BILLING-UNIT-ADD',
        // payload: { hostel_id: editHostel.id, unit: 1, amount: Number(amount) },
        payload: { hostel_id: editHostel.id, unit:1, amount: Number(amount), room_based: roomBasedCalculation ? 1 :0, hostel_based: hostelBasedCalculation ? 1 :0 }
      });
    } else if (!edit &&  amount !== '') {

console.log("called")

      dispatch({
        type: 'EB-BILLING-UNIT-ADD',
        // payload: { hostel_id: hostelid, unit: 1, amount: Number(amount) },
        payload: {  hostel_id: hostelid, unit: 1, amount: Number(amount), room_based: roomBasedCalculation ? 1 :0, hostel_based: hostelBasedCalculation ? 1 :0 }
      });
    }
  };

  const [deleteItems, setDeleteItems] = useState('')

  //  const handleDeleteElectricity = (item) => {
  //   setDeleteItems(item)
  //   setShowDeleteform (true)

  //  }

  const handleConfirmDelete = () => {
    if (deleteItems) {
      dispatch({ type: 'DELETE-ELECTRICITY', payload: { hostel_id: deleteItems.hostel_id, settings_id: deleteItems.id } });
      setShowDeleteform(false)
    }
  }

  const handleCloseDeleteform = () => {
    setShowDeleteform(false)
  }



  const handleCloseRecurringForm = () => {
    setRecurringForm(false);
    setIsRecurring(false)
    setCalculatedstartdateErrmsg("")
    setCalculatedEnddateErrMsg("")
    setCalculatedEnddate("")
    setCalculatedstartdate("")
  };

  const handleRecurringFormShow = (item) => {
    setIsRecurring(!isRecurring)

    if (!isRecurring === false) {
      setRecurringForm(false);
      dispatch({
        type: 'SETTINGSADDRECURRING',
        payload: {
          type: "electricity",
          recure: 0,
          hostel_id: Number(item.hostel_id),
          start_date: '0',
          end_date: '0',
          // am_id: amenityDetails.id,
        },
      });

    } else {
      setRecurringForm(true);
    }

  };

  const handlestartDateChange = (e) => {
    setCalculatedstartdate(e.target.value);
  };

  // const handleEndDateChange = (e) => {
  //   setCalculatedEnddate(e.target.value);
  // };

  const handlechangeEvery = (e) => {
    setEvery_Recurr(e.target.value)
  }


  const handleSaveRecurring = () => {
    if (!calculatedstartdate || !calculatedenddate) {

      if (!calculatedstartdate) {
        setCalculatedstartdateErrmsg('Please Select date')
      }
      if (!calculatedenddate) {
        setCalculatedEnddateErrMsg('Please Select date')
      }
      return;
    }
    else {
      dispatch({
        type: "SETTINGSADDRECURRING",
        payload: { hostel_id: Number(hostelid), type: 'electricity', recure: 1, start_date: Number(calculatedstartdate), end_date: Number(calculatedenddate) }
      });
      setIsRecurring(false)
    }
    
  }

  useEffect(() => {
    if (state.InvoiceList.settingsaddRecurringStatusCode === 200) {
      setCalculatedstartdate("")
      setCalculatedEnddate("")

      dispatch({ type: 'EB-BILLING-UNIT-LIST', payload: { hostel_id: hostelid } })
      setRecurringForm(false);
      setTimeout(() => {
        dispatch({ type: 'REMOVE_STATUS_CODE_SETTINGS_ADD_RECURRING' })
      }, 100)
    }
  }, [state.InvoiceList.settingsaddRecurringStatusCode])

  const handleHostelBased = (v) => {
    setHostelBasedCalculation(true)
    setRoomBasedCalculation(false)
    dispatch({ type: 'EB-BILLING-UNIT-ADD', payload: { id: v.id, hostel_id: hostelid, unit: v.unit, amount: v.amount, room_based: 0, hostel_based: 1 } })
  }

  const handleRoomBased = (v) => {
    setRoomBasedCalculation(true)
    setHostelBasedCalculation(false)
    dispatch({ type: 'EB-BILLING-UNIT-ADD', payload: { id: v.id, hostel_id: hostelid, unit: v.unit, amount: v.amount, room_based: 1, hostel_based: 0 } })
  }

  useEffect(() => {

    if (state.Settings.EBBillingUnitlist.length > 0) {
      let temp = state.Settings.EBBillingUnitlist
      setHostelBasedCalculation(temp[0].hostel_based === 1)
      setRoomBasedCalculation(temp[0].room_based === 1)
      setIsRecurring(temp[0].recuring)
    }
  }, [state.Settings.EBBillingUnitlist])

  useEffect(() => {

    if (state.PgList.checkEBList) {
      dispatch({ type: 'EB-BILLING-UNIT-LIST', payload: { hostel_id: hostelid } })
    }
  }, [state.PgList.checkEBList])


  useEffect(() => {
    if (state.Settings?.getebStatuscode == 200) {
      setLoading(false)
      setEbList(state.Settings.EBBillingUnitlist)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_GET_EBBILLINGS_STATUS_CODE' })
      }, 500)
    }

  }, [state.Settings?.getebStatuscode])


  useEffect(()=>{
    if(state.Settings?.errorEbUnitStatusCode){
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'REMOVE_ERROR_EB_BILLING_UNIT_LIST' })
      }, 500)
    }

  },[state.Settings?.errorEbUnitStatusCode])


  const options = Array.from({ length: 31 }, (_, index) => ({
    value: index + 1,
    label: index + 1,
  }));

  const handleStartDateChange = (selectedOption) => {
    console.log("Selected Start Date:", selectedOption?.value);
    setCalculatedstartdate(selectedOption?.value);
    setCalculatedstartdateErrmsg("")
      
  };
  const handleEndDateChange = (selectedOption) => {
    setCalculatedEnddate(selectedOption?.value); 
   setCalculatedEnddateErrMsg("")
  };


// useEffect(()=>{
//   if(EbList.length == 0){
//     setLoading(false)
//   }

// },[EbList])

  return (

    <Container className="mt-4" style={{ position: "relative" }}>


      {loading &&
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: '200px',
            height: "60vh",
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
              bordsetCalculatedstartdateerRight: '4px solid transparent',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              animation: 'spin 1s linear infinite',
            }}
          ></div>
        </div>
      }



      <div className='d-flex row mb-4' style={{
        position: 'sticky', top: 0, right: 0,
        left: 0,
        zIndex: 1000,
        backgroundColor: "#FFFFFF",
      }} >
        <Col>
          <h4 style={{
            fontSize: 20,
            color: "#000000",
            fontWeight: 600,
            fontFamily: "Gilroy", marginTop: 5
          }}>Electricity</h4>
        </Col>
        <Col className="d-flex justify-content-end">
          {/* <Button style={{ backgroundColor: "#1E45E1", fontFamily: "Gilroy", fontSize: 14, fontWeight: 600, color: '#ffffff',
          padding:"12px 16px 12px 16px"
           }} 
          onClick={handleShowFormElectricity}  disabled={showPopup}>
            + Electricity
          </Button> */}


          {EbList.length > 0 ? (
            EbList.map((v, i) => (
              <Button
                key={i}
                onClick={() => handleEditElectricity(v)}
                style={{
                  fontFamily: "Gilroy",
                  fontSize: 14,
                  backgroundColor: "#1E45E1",
                  color: "white",
                  fontWeight: 600,
                  borderRadius: 8,
                  padding: "11px 27px",
                  paddingLeft:26,
                  marginTop:-2
                }}
              >
                Edit Electricity
              </Button>
            ))
          ) : (
            <Button
              onClick={handleShowFormElectricity}
              style={{
                fontFamily: "Gilroy",
                fontSize: 14,
                backgroundColor: "#1E45E1",
                color: "white",
                fontWeight: 600,
                borderRadius: 8,
                padding: "11px 35px",
                marginTop:-2
              }}
              disabled={showPopup}
            >
              + Electricity
            </Button>
          )}


        </Col>

        {showPopup && (
          <div className="d-flex flex-wrap">
            <p style={{ color: "red", fontFamily:"Gilroy",fontSize:14 }} className="col-12 col-sm-6 col-md-6 col-lg-9">
              Please add a hostel before adding Electricity information.
            </p>

            {/* <img 
  src={close} 
  alt="close icon" 
  onClick={() => setShowPopup(false)}
  className="col-12 col-sm-6 col-md-6 col-lg-3 d-flex justify-content-end"
  style={{ width: '20px', height: 'auto' ,cursor:"pointer"}} 
/> */}

          </div>


        )}
      </div>
      {
        tableShow ?
          <SettingsElectricityTable hostelid={hostelid} />
          :
          <>
            {EbList && EbList.length > 0 ? (
              EbList.map((v, i) => {
                return (

                  <Row>
                    <Col lg={8} md={12} sm={12}>
                      <Card className="p-2 border" style={{ borderRadius: 16 }}>
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-center flex-wrap">
                            <div className="d-flex gap-2">
                              <label
                                style={{
                                  fontFamily: "Gilroy",
                                  fontSize: 18,
                                  color: "#222",
                                  fontWeight: 600,
                                  marginLeft: "10px",
                                }}
                              >
                                Electricity Information
                              </label>
                            </div>

                            {/* <div>
              <div
                style={{
                  height: 40,
                  width: 40,
                  borderRadius: 100,
                  border: "1px solid #EFEFEF",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "relative",
                }}
                onClick={handleShowDots}
              >
                <PiDotsThreeOutlineVerticalFill
                  style={{ height: 20, width: 20, cursor: "pointer" }}
                />

                {showDots && (
                  <>
                    <div
                      style={{
                        backgroundColor: "#FFFFFF",
                        position: "absolute",
                        right: 0,
                        top: 50,
                        width: 163,
                        height: 92,
                        border: "1px solid #EBEBEB",
                        borderRadius: 10,
                        display: "flex",
                        justifyContent: "start",
                        padding: 15,
                        alignItems: "center",
                      }}
                    >
                      <div>
                        <div
                         onClick={()=>handleEditElectricity(v)}
                          className={"mb-2"}
                         
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <img
                            src={Edit}
                            style={{
                              height: 16,
                              width: 16,
                            }}
                            alt="Edit"
                           

                          />
                          <label
                            style={{
                              fontSize: 14,
                              fontWeight: 500,
                              fontFamily: "Gilroy, sans-serif",
                              color: "#222222",
                              cursor: "pointer",
                              marginLeft: "10px",
                            }}
                          >
                            Edit
                          </label>
                        </div>

                        <div
                         onClick={()=> handleDeleteElectricity(v)}
                          className={"mb-2"}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          <img
                            src={Delete}
                            style={{
                              height: 16,
                              width: 16,
                            }}
                            alt="Delete"
                          />
                          <label
                            style={{
                              fontSize: 14,
                              fontWeight: 500,
                              fontFamily: "Gilroy, sans-serif",
                              color: "#FF0000",
                              cursor: "pointer",
                              marginLeft: "10px",
                            }}
                          >
                            Delete
                          </label>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div> */}
                          </div>
                          <hr />
                          <Form>
                            <Row className="mb-3">
                              <Col>
                                <Form.Label style={{ fontSize: 12, fontFamily: "Gilroy", fontWeight: 500, color: "#939393" }}>Per unit Amount</Form.Label>
                                <h6 style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600 }}>₹ {v.amount}</h6>
                                {unitErr && (
                <p 
                  style={{
                    color: "red",
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    margin: 0,
                  }}
                >
                  <span style={{ fontSize: "20px", marginRight: "5px" }}>
                    <MdError style={{ fontSize: "15px", marginBottom: "5px" }} />
                  </span>
                  {unitErr}
                </p>
              )}
                              </Col>

                              <Col>
                                <Form.Label style={{ fontSize: 12, fontFamily: "Gilroy", fontWeight: 500, color: "#939393" }}>Room Based Calculation</Form.Label>
                                <Form.Check
                                  type="switch"
                                  id="roomBased"
                                  label="Enabled"
                                  // checked={v.room_based === 1}
                                  checked={roomBasedCalculation}
                                  onChange={() => { handleRoomBased(v) }}
                                // onChange={() => setRoomBasedCalculation(!roomBasedCalculation)}
                                />
                              </Col>
                              <Col>
                                <Form.Label style={{ fontSize: 12, fontFamily: "Gilroy", fontWeight: 500, color: "#939393" }}>Hostel Based Calculation</Form.Label>
                                <Form.Check
                                  type="switch"
                                  id="hostelBased"
                                  label="Enabled"
                                  // checked={v.hostel_based === 1}
                                  checked={hostelBasedCalculation}
                                  onChange={() => { handleHostelBased(v) }}
                                // onChange={() => setHostelBasedCalculation(!hostelBasedCalculation)}
                                />
                              </Col>
                            </Row>

                            <Row className="mb-3">
                              <Col md={6}>
                                <Form.Label style={{ fontSize: 12, fontFamily: "Gilroy", fontWeight: 500, color: "#939393" }}>Recurring</Form.Label>
                                <Form.Check
                                  type="switch"
                                  id="recurring"
                                  label="Recurring"
                                  // checked = {v.recuring === 1}
                                  checked={isRecurring}
                                  onChange={() => handleRecurringFormShow(v)}
                                />
                              </Col>
                            </Row>

                            <Row className="mb-3">
                              <Col>
                                <Form.Label style={{ fontSize: 12, fontFamily: "Gilroy", fontWeight: 500, color: "#939393" }}>Calculation Type</Form.Label>
                                <h6 style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600 }}>Monthly</h6>
                              </Col>
                              <Col>
                                <Form.Label style={{ fontSize: 12, fontFamily: "Gilroy", fontWeight: 500, color: "#939393" }}>Calculation Start Day</Form.Label>
                                <h6 style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600 }}>{v.start_date}</h6>
                              </Col>
                              <Col>
                                <Form.Label style={{ fontSize: 12, fontFamily: "Gilroy", fontWeight: 500, color: "#939393" }}>Calculation End Day</Form.Label>
                                <h6 style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600 }}>{v.end_date}</h6>
                              </Col>
                            </Row>
                          </Form>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                )
              })
            ) : !loading && (
              <div style={{ alignItems: "center", justifyContent: "center", marginTop: 100 }}>
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
                  No Electricity available
                </div>
              </div>
            )
            }
          </>
      }




      <Modal
        show={showFormElectricity}
        onHide={() => handleClose()}
        backdrop="static"
        centered
         dialogClassName="custom-modal"
      >
        <Modal.Header style={{  position: "relative" }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              fontFamily: "Gilroy",
            }}
          >
            {edit ? "Edit Electricity" : "Add Electricity"}
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
        <Modal.Body style={{ marginBottom: "0px" }}>
          <div className="col">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <Form.Group className="mb-3">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Unit{" "}
                  {/* <span style={{ color: "red", fontSize: "20px" }}> * </span> */}
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="1 kW Unit"
                  // value={unit}
                  // onChange={(e) => handleChangeUnit(e)}
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
                    backgroundColor: "#E7F1FF",
                    width: "100%" ,
                  }}
                />
              </Form.Group>
              {unitErr && <span style={{ color: "red", fontSize: 16 }}> {unitErr} </span>}
            </div>

            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <Form.Group className="mb-1">
                <Form.Label
                  style={{
                    fontSize: 14,
                    color: "#222222",
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  Amount/Unit.{" "}
                  {/* <span style={{ color: "red", fontSize: "20px" }}> * </span> */}
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="₹ 4,000"
                  value={amount}
                  onChange={(e) => handleChangeAmount(e)}
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
              {/* {amountErr && <span style={{ color: "red", fontSize: 16 }}> {amountErr} </span>} */}
              <div className=''>
              {amountErr && (
                <p 
                  style={{
                    color: "red",
                    fontSize: 14,
                  textAlign:"start",
                    margin: 0,
                  }}
                >
                  <span style={{ fontSize: "20px" }}>
                    <MdError style={{ fontSize: "15px" }} />
                  </span>
                  {amountErr}
                </p>
              )}
              </div>
              <div className=''>
              {totalErr && (
                <p 
                  style={{
                    color: "red",
                    fontSize: 14,
                  textAlign:"center",
                    margin: 0,
                  }}
                >
                  <span style={{ fontSize: "20px" }}>
                    <MdError style={{ fontSize: "15px" }} />
                  </span>
                  {totalErr}
                </p>
              )}
              </div>
            </div>

          </div>
        </Modal.Body>

        <Modal.Footer className="d-flex justify-content-center" style={{ borderTop: "none", marginBottom: "20px" }}>
          <Button
            className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            style={{
              backgroundColor: "#1E45E1",
              fontWeight: 600,
              height: 50,
              borderRadius: 12,
              fontSize: 16,
              fontFamily: "Montserrat, sans-serif",
              marginTop:'-10px',
            }}
            onClick={handleAddElectricity}
          >
            {edit ? "Update Electricity" : "Add Electricity"}
          </Button>
        </Modal.Footer>
      </Modal>


      {showdeleteform &&
        <div>
          <Modal
            show={showdeleteform}
            onHide={handleCloseDeleteform}
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
                Delete Electricity?
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
              Are you sure you want to delete this Eb ?
            </Modal.Body>

            <Modal.Footer
              style={{
                justifyContent: "center",
                borderTop: "none",
                marginTop: "-10px",
                borderTopColor: "red"
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
                onClick={handleCloseDeleteform}

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
                onClick={handleConfirmDelete}

              >
                Delete
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      }

      {recurringform && (
        <div
          className="modal show"
          style={{
            display: "block",
            position: "initial",
            fontFamily: "Gilroy,sans-serif",
          }}
        >
          <Modal
            show={recurringform}
            onHide={handleCloseRecurringForm}
            centered
            backdrop="static"
            dialogClassName="custom-modal"
          >
            <Modal.Dialog
              style={{
                maxWidth: 950,
                paddingRight: "10px",
                paddingRight: "10px",
                borderRadius: "30px",
              }}
              className="m-0 p-0"
            >
              <Modal.Body>
                <div>
                  <Modal.Header
                    style={{ marginBottom: "30px", position: "relative" }}
                  >
                    <div
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                      }}
                    >
                      Recurring Enable
                    </div>
                    <button
                      type="button"
                      className="close"
                      aria-label="Close"
                      onClick={handleCloseRecurringForm}
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

                    {/* <Modal.Title style={{ fontSize: 20, color: "#222", fontFamily: "Gilroy", fontWeight: 600, fontStyle: 'normal', lineHeight: 'normal' }}>{edit ? "Edit Compliant" : "Add an complaint"}</Modal.Title> */}
                  </Modal.Header>
                </div>

                <div className="row mt-1">
                  <div className="mb-3 d-flex row">
                    <div className="col-lg-8">
                      <label htmlFor="startDayDropdown" className="form-label">EB calculation Start Date will be
                      <span style={{ color: "red", fontSize: "20px" }}>
                    {" "}
                    *{" "}
                  </span>
                      </label>
                    </div>
                    {/* <div className="hi col-lg-4">
                      <select className="form-select border" id="startDayDropdown"
                        value={calculatedstartdate}
                        onChange={handlestartDateChange}
                        size={5} 
                      >
                        <option value="">Select</option>
                        {[...Array(31)].map((_, index) => (
                          <option key={index + 1} value={index + 1} className='ReSELECT'>
                            {index + 1}
                          </option>
                        ))}
                      </select>
                       </div> */}


                    <div className="col-lg-4">
                      <Select
                        options={options}
                        onChange={handleStartDateChange}
                        placeholder="Select"
                        classNamePrefix="custom-select"
                        menuPlacement="auto"
                        styles={{
                          control: (base) => ({
                            ...base,
                            height: "40px",
                            border: "1px solid #ced4da",
                          }),
                          menu: (base) => ({
                            ...base,
                            maxHeight: "120px",
                            overflowY: "auto",
                            scrollbarWidth: "thin",
                          }),
                          menuList: (base) => ({
                            ...base,
                            maxHeight: "120px",
                            padding: 0,
                            scrollbarWidth: "thin",
                          }),
                          valueContainer: (base) => ({
                            ...base,
                            maxHeight: "40px",
                            overflow: "hidden",
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: "#555",
                          }),
                          dropdownIndicator: (base) => ({
                            ...base,
                            color: "#555",
                            display: "inline-block",
                            fill: "currentColor",
                            lineHeight: 1,
                            stroke: "currentColor",
                            strokeWidth: 0,
                          }),
                          indicatorSeparator: () => ({
                            display: "none",
                          }),
                        }}
                      />
                    </div>




                   {calculatedstartdateerrmsg && (
                                     <div className="d-flex align-items-center  mb-2">
                                       <MdError style={{ color: "red", marginRight: "5px",fontSize:"14px" }} />
                                       <label
                                         className="mb-0"
                                         style={{
                                           color: "red",
                                           fontSize: "14px",
                                           fontFamily: "Gilroy",
                                           fontWeight: 500,
                                         }}
                                       >
                                         {calculatedstartdateerrmsg}
                                       </label>
                                     </div>
                                   )}
                  </div>

                  <div className="mb-3 d-flex row">
                    <div className="col-lg-8">
                      <label htmlFor="startDayDropdown" className="form-label">EB Calculation End date wil be
                      <span style={{ color: "red", fontSize: "20px" }}>
                    {" "}
                    *{" "}
                  </span>
                      </label>
                    </div>
                    {/* <div className="col-lg-4">
                      <select className="form-select border" id="startDayDropdown"
                        value={calculatedenddate}
                        onChange={handleEndDateChange}
                      >
                        {[...Array(31)].map((_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </select>
                    </div> */}
                    <div className="col-lg-4">
                      <Select
                        options={options}
                        onChange={handleEndDateChange}
                        value={options.find((option) => option.value === calculatedenddate)}
                        placeholder="Select"
                        classNamePrefix="custom"
                        menuPlacement="auto"
                        styles={{
                          control: (base) => ({
                            ...base,
                            height: "40px",
                            border: "1px solid #ced4da",
                          }),
                          menu: (base) => ({
                            ...base,
                            maxHeight: "120px",
                            overflowY: "auto",
                            scrollbarWidth: "thin",
                           
                          }),
                          menuList: (base) => ({
                            ...base,
                            maxHeight: "120px",
                            padding: 0,
                            scrollbarWidth: "thin",
                          }),
                          valueContainer: (base) => ({
                            ...base,
                            maxHeight: "40px",
                            overflow: "hidden",
                          }),
                          placeholder: (base) => ({
                            ...base,
                            color: "#555",
                          }),
                          dropdownIndicator: (base) => ({
                            ...base,
                            color: "#555",
                            display: "inline-block",
                            fill: "currentColor",
                            lineHeight: 1,
                            stroke: "currentColor",
                            strokeWidth: 0,
                          }),
                          indicatorSeparator: () => ({
                            display: "none",
                          }),
                        }}
                      />
                    </div>
                    {calculatedenddateerrmsg && (
                                     <div className="d-flex align-items-center  mb-2">
                                       <MdError style={{ color: "red", marginRight: "5px",fontSize:"14px" }} />
                                       <label
                                         className="mb-0"
                                         style={{
                                           color: "red",
                                           fontSize: "14px",
                                           fontFamily: "Gilroy",
                                           fontWeight: 500,
                                         }}
                                       >
                                         {calculatedenddateerrmsg}
                                       </label>
                                     </div>
                                   )}

                  </div>


                  <div className="mb-3 d-flex row">
                    <div className="col-lg-8">
                      <label htmlFor="startDayDropdown" className="form-label">On Every</label>
                    </div>
                    <div className="col-lg-4">
                      <select className="form-select border" id="startDayDropdown"
                        value={every_recurr}
                        onChange={handlechangeEvery}
                      >
                        <option value="monthly">Monthly</option>

                      </select>
                    </div>

                  </div>


                </div>
              </Modal.Body>

              <Modal.Footer style={{ borderTop: "none" }}>
                <Button
                  className="w-100"
                  style={{
                    backgroundColor: "#1E45E1",
                    fontWeight: 500,
                    height: 50,
                    borderRadius: 12,
                    fontSize: 16,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                  onClick={handleSaveRecurring}
                >
                  + Add Electricity
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal>
        </div>
      )}

    </Container>
  );
};

export default SettingElectricity;