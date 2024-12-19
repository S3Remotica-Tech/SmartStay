import { borderRadius } from '@mui/system';
import React, { useEffect, useState } from 'react';
import round from "../Assets/Images/Group 14.png"
import { Container, Row, Col, Card, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from 'react-redux';
import SettingsElectricityTable from './SettingsElectricityTable';

const SettingElectricity = ({ hostelid }) => {

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [isRecurring, setIsRecurring] = useState(false);
  const [roomBasedCalculation, setRoomBasedCalculation] = useState(false);
  const [hostelBasedCalculation, setHostelBasedCalculation] = useState(false);
  const [showFormElectricity, setShowFormElectricity] = useState(false);
  const [unit, setUnit] = useState('');
  const [amount, setAmount] = useState('');
  const [tableShow, setTableShow] = useState(false);
  const [recurringform, setRecurringForm] = useState(false);
   const [calculatedstartdate, setCalculatedstartdate] = useState("");
    const [calculatedenddate, setCalculatedEnddate] = useState("");
    const [calculatedstartdateerrmsg, setCalculatedstartdateErrmsg] = useState("");
    const [calculatedenddateerrmsg, setCalculatedEnddateErrMsg] = useState("");
    const [every_recurr, setEvery_Recurr] = useState("");
  

  useEffect(() => {
    if (hostelid) {
      dispatch({ type: 'EB-BILLING-UNIT-LIST', payload: { hostel_id: hostelid } })
    }
  }, [hostelid])
  // EBBillingUnitlist
  useEffect(() => {
    if (state.Settings.addEbbillingUnitStatuscode === 200) {
      dispatch({ type: 'EB-BILLING-UNIT-LIST', payload: { hostel_id: hostelid } })
      handleClose()
      setTimeout(() => {
        dispatch({ type: 'CLEAR_ADD_EB_BILLING_STATUS_CODE' })
      }, 500);
    }
  }, [state.Settings.addEbbillingUnitStatuscode])

  const handleClose = () => {
    setShowFormElectricity(false)
    setUnit('')
    setAmount('')
  }
  const handleShowFormElectricity = () => {
    setShowFormElectricity(true)
  }

  const handleAddElectricity = () => {
    dispatch({ type: 'EB-BILLING-UNIT-ADD', payload: { hostel_id: hostelid, unit: unit, amount: amount } })
  }

  const handleChangeUnit = (e) => {
    setUnit(e.target.value)
  }

  const handleChangeAmount = (e) => {
    setAmount(e.target.value)
  }
  console.log("EBBillingUnitlist", state.Settings.EBBillingUnitlist);

  const handleCloseRecurringForm = () => {
    setRecurringForm(false);
    // setCalculatedstartdateErrmsg('')
    // setCalculatedEnddateErrMsg('')
    // setCalculatedstartdate('')
    // setCalculatedEnddate('')
  };
  const handleRecurringFormShow = (item) => {
    setIsRecurring(!isRecurring)
    if (!isRecurring === true) {
      setRecurringForm(true);
    } else {
      setRecurringForm(false);
    }

    // setCalculatedstartdate(item.inv_startdate || '')
    // setCalculatedEnddate(item.inv_enddate || '')

  };

  const handlestartDateChange = (e) => {
    setCalculatedstartdate(e.target.value); 
  };

  const handleEndDateChange = (e) => {
    setCalculatedEnddate(e.target.value); 
  };

  const handlechangeEvery = (e) => {
    setEvery_Recurr(e.target.value)
  }

  const handleSaveRecurring = () =>{
    if(!calculatedstartdate || !calculatedenddate){

      if(!calculatedstartdate){
          setCalculatedstartdateErrmsg('Please Select date')
      }
      if(!calculatedenddate){
          setCalculatedEnddateErrMsg('Please Select date')
      }
   return;
  }else{
    dispatch({type: "SETTINGSADDRECURRING",
      payload: { hostel_id:Number(hostelid) , type:'electricity',recure : 1, start_date: Number(calculatedstartdate), end_date: Number(calculatedenddate)} });
  }
}
  return (
    <Container className="mt-4">
      <div className='d-flex row mb-4'>
        <Col>
          <h4 style={{
            fontSize: 18,
            color: "#000000",
            fontWeight: 600,
            fontFamily: "Gilroy",
          }}>Electricity</h4>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button style={{ backgroundColor: "#1E45E1" }} onClick={handleShowFormElectricity}>
            + Add Electricity
          </Button>
        </Col>
      </div>
      {
        tableShow ?
          <SettingsElectricityTable hostelid={hostelid} />
          :
          <>
            {
              state.Settings.EBBillingUnitlist && state.Settings.EBBillingUnitlist.map((v, i) => {
                return (
                  <Row>
                    <Col lg={8} md={12} sm={12}>
                      <Card className="p-2 border" style={{ borderRadius: 16 }}>
                        <Card.Body>
                          <div className='d-flex flex-wrap justify-content-between align-items-center mb-4'>
                            <h4 style={{
                              fontSize: 18,
                              color: "#000000",
                              fontWeight: 600,
                              fontFamily: "Gilroy",
                            }}>Electricity Information</h4>
                            <img src={round} width="30" height="30" alt="icon" />
                          </div>
                          <hr />
                          <Form>
                            <Row className="mb-3">
                              <Col>
                                <Form.Label style={{ fontSize: 12, fontFamily: "Gilroy", fontWeight: 500, color: "#939393" }}>Per unit Amount</Form.Label>
                                <h6 style={{ fontSize: 16, fontFamily: "Gilroy", fontWeight: 600 }}>₹ {v.amount}</h6>
                                {/* <InputGroup>
                      <InputGroup.Text>₹</InputGroup.Text>
                      <Form.Control type="text" value="1,500" disabled />
                    </InputGroup> */}
                              </Col>

                              <Col>
                                <Form.Label style={{ fontSize: 12, fontFamily: "Gilroy", fontWeight: 500, color: "#939393" }}>Room Based Calculation</Form.Label>
                                <Form.Check
                                  type="switch"
                                  id="roomBased"
                                  label="Enabled"
                                  checked={v.room_based === 1}
                                  // checked={roomBasedCalculation}
                                  onChange={() => setRoomBasedCalculation(!roomBasedCalculation)}
                                />
                              </Col>
                              <Col>
                                <Form.Label style={{ fontSize: 12, fontFamily: "Gilroy", fontWeight: 500, color: "#939393" }}>Hostel Based Calculation</Form.Label>
                                <Form.Check
                                  type="switch"
                                  id="hostelBased"
                                  label="Enabled"
                                  checked={v.hostel_based === 1}
                                  // checked={hostelBasedCalculation}
                                  onChange={() => setHostelBasedCalculation(!hostelBasedCalculation)}
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
                                  checked={isRecurring}
                                  onChange={() => handleRecurringFormShow()}
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
            }
          </>
      }




      <Modal
        show={showFormElectricity}
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
            Add Electricity
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
                  Unit{" "}
                  {/* <span style={{ color: "red", fontSize: "20px" }}> * </span> */}
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="1 kW Unit"
                  value={unit}
                  onChange={(e) => handleChangeUnit(e)}
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
            onClick={handleAddElectricity}
          >
            + Add Electricity
          </Button>
        </Modal.Footer>
      </Modal>

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
                  <div class="mb-3 d-flex row">
                    <div className="col-lg-8">
                      <label for="startDayDropdown" class="form-label">EB calculation Start Date will be</label>
                    </div>
                    <div className="col-lg-4">
                      <select className="form-select border" id="startDayDropdown"
                      value={calculatedstartdate}
                      onChange={handlestartDateChange}
                      >
                        <option value="">Select</option>
                        {[...Array(31)].map((_, index) => (
                          <option key={index + 1} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* {calculatedstartdateerrmsg.trim() !== "" && (
                    <div>
                      <p style={{ fontSize: "15px", color: "red", marginTop: "3px"}}
                      >
                        {calculatedstartdateerrmsg !== " " && (
                          <MdError style={{ fontSize: "15px", color: "red" }} />
                        )}{" "}
                        {calculatedstartdateerrmsg}
                      </p>
                    </div>
                  )} */}
                  </div>

                  <div class="mb-3 d-flex row">
                    <div className="col-lg-8">
                      <label for="startDayDropdown" class="form-label">EB Calculation End date wil be</label>
                    </div>
                    <div className="col-lg-4">
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
                    </div>
                    {/* {calculatedenddateerrmsg.trim() !== "" && (
                    <div>
                      <p style={{ fontSize: "15px", color: "red", marginTop: "3px"}}
                      >
                        {calculatedenddateerrmsg !== " " && (
                          <MdError style={{ fontSize: "15px", color: "red" }} />
                        )}{" "}
                        {calculatedenddateerrmsg}
                      </p>
                    </div>
                  )} */}

                  </div>


                  <div class="mb-3 d-flex row">
                    <div className="col-lg-8">
                      <label for="startDayDropdown" class="form-label">On Every</label>
                    </div>
                    <div className="col-lg-4">
                      <select class="form-select border" id="startDayDropdown"
                      value={every_recurr}
                      onChange={handlechangeEvery}
                      >
                        <option value="monthly">Monthly</option>

                      </select>
                    </div>

                  </div>


                </div>
              </Modal.Body>

              <Modal.Footer style={{ border: "none" }}>
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

