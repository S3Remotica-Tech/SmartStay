/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Form, Button, FormControl } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { MdError } from "react-icons/md";
import EmptyState from "../Assets/Images/New_images/empty_image.png";
import Select from "react-select";
import "./SettingAll.css";
import PropTypes from "prop-types";
import { CloseCircle } from "iconsax-react";
import "./SettingElectricity.css";

const SettingElectricity = ({hostelid}) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [isRecurring, setIsRecurring] = useState(false);
  const [roomBasedCalculation, setRoomBasedCalculation] = useState(false);
  const [hostelBasedCalculation, setHostelBasedCalculation] = useState(false);
  const [showFormElectricity, setShowFormElectricity] = useState(false);
  const [amount, setAmount] = useState("");
  const [amountErr, setAmountErr] = useState("");
  const [totalErr, setTotalErr] = useState("");
  const [recurringform, setRecurringForm] = useState(false);
  const [calculatedstartdate, setCalculatedstartdate] = useState(null);
  const [calculatedenddate, setCalculatedEnddate] = useState("");
const [formLoading, setFormLoading] = useState(false)
const [formRecurringLoading, setFormRecurringLoading] = useState(false)

  const [calculatedstartdateerrmsg, setCalculatedstartdateErrmsg] =
    useState("");
  const [calculatedenddateerrmsg, setCalculatedEnddateErrMsg] = useState("");
  const [every_recurr, setEvery_Recurr] = useState("");

  const [editHostel, setEditHostel] = useState({
    id: "",
    name: "",
    editamount: "",
  });

  const [EbList, setEbList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (hostelid) {
      dispatch({
        type: "EB-BILLING-UNIT-LIST",
        payload: { hostel_id: hostelid },
      });
    }
  }, [hostelid]);

  useEffect(() => {
    if (
      state.Settings.addEbbillingUnitStatuscode === 200 ||
      state.Settings.deleteElectricityStatuscode === 200
    ) {
      dispatch({
        type: "EB-BILLING-UNIT-LIST",
        payload: { hostel_id: hostelid },
      });
      setFormLoading(false)
      handleClose();

      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_EB_BILLING_STATUS_CODE" });
      }, 500);

      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_ELECTRICITY_STATUS_CODE" });
      }, 500);
    }
  }, [
    state.Settings.addEbbillingUnitStatuscode,
    state.Settings.deleteElectricityStatuscode,
  ]);

  const handleClose = () => {
    setShowFormElectricity(false);
    setAmount("");
    setAmountErr("");
    setTotalErr("");
  };

  const [showPopup, setShowPopup] = useState(false);
  const handleShowFormElectricity = () => {
    if (!hostelid) {
      setShowPopup(true);
      return;
    }
    setEditHostel({ id: null, name: null, editamount: null });
    setShowFormElectricity(true);
    setEdit(false);
  };

  const [edit, setEdit] = useState(false);

  const handleEditElectricity = (item) => {
    if (!hostelid) {
      setShowPopup(true);
      return;
    }
    setEdit(true);
    setShowFormElectricity(true);
    setAmount(item.amount);
    setEditHostel({
      id: item.hostel_id,
      name: item.Name,
      editamount: item.amount,
    });
  };

  const handleChangeAmount = (e) => {
    const newAmount = e.target.value;
    if (!/^\d*$/.test(newAmount)) {
      return;
    }
    setAmount(newAmount);

    if (newAmount !== "") {
      setAmountErr("");
      setTotalErr("");
    }

    if (editHostel && String(editHostel.editamount) === String(newAmount)) {
      setTotalErr("No Changes Deducted");
    }
  };

  const handleAddElectricity = () => {
    if (amount === "") {
      setAmountErr("Please Enter Amount");
      return;
    }

    if (
      edit &&
      editHostel &&
      String(editHostel.editamount) === String(amount)
    ) {
      setTotalErr("No Changes Deducted");
      return;
    }

    if (edit && editHostel && amount !== "") {
      dispatch({
        type: "EB-BILLING-UNIT-ADD",

        payload: {
          hostel_id: editHostel.id,
          unit: 1,
          amount: Number(amount),
          room_based: roomBasedCalculation ? 1 : 0,
          hostel_based: hostelBasedCalculation ? 1 : 0,
        },
      });
      setFormLoading(true)
    } else if (!edit && amount !== "") {
      dispatch({
        type: "EB-BILLING-UNIT-ADD",

        payload: {
          hostel_id: hostelid,
          unit: 1,
          amount: Number(amount),
          room_based: roomBasedCalculation ? 1 : 0,
          hostel_based: hostelBasedCalculation ? 1 : 0,
        },
      });
      setFormLoading(true)
    }
  };

  const handleCloseRecurringForm = () => {
    setRecurringForm(false);
    setIsRecurring(false);
    setCalculatedstartdateErrmsg("");
    setCalculatedEnddateErrMsg("");
    setCalculatedEnddate("");
    setCalculatedstartdate("");
  };

  const handleRecurringFormShow = (item) => {
    setIsRecurring(!isRecurring);

    if (!isRecurring === false) {
      setRecurringForm(false);
      dispatch({
        type: "SETTINGSADDRECURRING",
        payload: {
          type: "electricity",
          recure: 0,
          hostel_id: Number(item.hostel_id),
          start_date: "0",
          end_date: "0",
        },
      });
    } else {
      setRecurringForm(true);
    }
  };

  const handlechangeEvery = (e) => {
    setEvery_Recurr(e.target.value);
  };

  const handleSaveRecurring = () => {
    if (!calculatedstartdate || !calculatedenddate) {
      if (!calculatedstartdate) {
        setCalculatedstartdateErrmsg("Please Select Date");
      }
      if (!calculatedenddate) {
        setCalculatedEnddateErrMsg("Please Select Date");
      }
      return;
    } else {
      dispatch({
        type: "SETTINGSADDRECURRING",
        payload: {
          hostel_id: Number(hostelid),
          type: "electricity",
          recure: 1,
          start_date: Number(calculatedstartdate),
          end_date: Number(calculatedenddate),
        },
      });
      setFormRecurringLoading(true)
      setIsRecurring(false);
    }
  };

  useEffect(() => {
    if (state.InvoiceList.settingsaddRecurringStatusCode === 200) {
      setCalculatedstartdate("");
      setCalculatedEnddate("");
 setFormRecurringLoading(false)
      dispatch({
        type: "EB-BILLING-UNIT-LIST",
        payload: { hostel_id: hostelid },
      });
      setRecurringForm(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_SETTINGS_ADD_RECURRING" });
      }, 100);
    }
  }, [state.InvoiceList.settingsaddRecurringStatusCode]);

  const handleHostelBased = (v) => {
    setHostelBasedCalculation(true);
    setRoomBasedCalculation(false);
    dispatch({
      type: "EB-BILLING-UNIT-ADD",
      payload: {
        id: v.id,
        hostel_id: hostelid,
        unit: v.unit,
        amount: v.amount,
        room_based: 0,
        hostel_based: 1,
      },
    });
  };

  const handleRoomBased = (v) => {
    setRoomBasedCalculation(true);
    setHostelBasedCalculation(false);
    dispatch({
      type: "EB-BILLING-UNIT-ADD",
      payload: {
        id: v.id,
        hostel_id: hostelid,
        unit: v.unit,
        amount: v.amount,
        room_based: 1,
        hostel_based: 0,
      },
    });
  };

  useEffect(() => {
    if (state.Settings.EBBillingUnitlist.length > 0) {
      let temp = state.Settings.EBBillingUnitlist;
      setHostelBasedCalculation(temp[0].hostel_based === 1);
      setRoomBasedCalculation(temp[0].room_based === 1);
      setIsRecurring(temp[0].recuring);
    }
  }, [state.Settings.EBBillingUnitlist]);

  useEffect(() => {
    if (state.PgList.checkEBList) {
      dispatch({
        type: "EB-BILLING-UNIT-LIST",
        payload: { hostel_id: hostelid },
      });
    }
  }, [state.PgList.checkEBList]);

  useEffect(() => {
    if (state.Settings?.getebStatuscode === 200) {
      setLoading(false);
      setEbList(state.Settings.EBBillingUnitlist);
      setTimeout(() => {
        dispatch({ type: "CLEAR_GET_EBBILLINGS_STATUS_CODE" });
      }, 500);
    }
  }, [state.Settings?.getebStatuscode]);

  useEffect(() => {
    if (state.Settings?.errorEbUnitStatusCode) {
      setFormLoading(false)
      setFormRecurringLoading(false)
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_ERROR_EB_BILLING_UNIT_LIST" });
      }, 500);
    }
  }, [state.Settings?.errorEbUnitStatusCode]);

  const options = Array.from({ length: 31 }, (_, index) => ({
    value: index + 1,
    label: index + 1,
  }));

  const handleStartDateChange = (selectedOption) => {
    setCalculatedstartdate(selectedOption?.value);
    setCalculatedstartdateErrmsg("");
  };
  const handleEndDateChange = (selectedOption) => {
    setCalculatedEnddate(selectedOption?.value);
    setCalculatedEnddateErrMsg("");
  };

  return (
    <div
      className="mt-4"
      style={{ position: "relative", paddingRight: 10, paddingLeft: 10 }}
    >
      {loading && (
        <div
          style={{
            position: "fixed",
            top: "48%",
            left: "68%",
            transform: "translate(-50%, -50%)",
            width: "100vw",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "transparent",
            zIndex: 1050,
          }}
        >
          <div
            style={{
              borderTop: "4px solid #1E45E1",
              borderRight: "4px solid transparent",
              borderRadius: "50%",
              width: "40px",
              height: "40px",
              animation: "spin 1s linear infinite",
            }}
          ></div>
        </div>
      )}

      <div
        className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-3"
        style={{
          position: "sticky",
          top: 0,
          right: 0,
          left: 0,
          zIndex: 1000,
          backgroundColor: "#FFFFFF",
        }}
      >
        <div className="w-100 d-flex justify-content-center justify-content-md-start mt-2">
          <h4
            style={{
              fontSize: 20,
              color: "#000000",
              fontWeight: 600,
              fontFamily: "Gilroy",
              marginTop: 6,
              whiteSpace: "nowrap",
            }}
          >
            Electricity
          </h4>
        </div>
        <div
          className="d-flex justify-content-center justify-content-md-end w-100  mt-md-0"
          style={{ marginTop: -10 }}
        >
         

          {EbList.length > 0 ? (
            EbList.map((v, i) => (
              <Button
                className="electricity-btn"
                key={i}
                onClick={() => handleEditElectricity(v)}
                style={{
                  fontFamily: "Gilroy",
                  fontSize: 14,
                  backgroundColor: "#1E45E1",
                  color: "white",
                  fontWeight: 600,
                  borderRadius: 8,

                  height: 45,
                  width: 146,
                }}
              >
                Edit Electricity
              </Button>
            ))
          ) : (
            <Button
              className="electricity-btn"
              onClick={handleShowFormElectricity}
              style={{
                fontFamily: "Gilroy",
                fontSize: 14,
                backgroundColor: "#1E45E1",
                color: "white",
                fontWeight: 600,
                borderRadius: 8,
                height: 45,
                width: 146,
              }}
              disabled={showPopup}
            >
              + Electricity
            </Button>
          )}
        </div>

        {showPopup && (
          <div className="d-flex flex-wrap">
            <p
              style={{ color: "red", fontFamily: "Gilroy", fontSize: 14 }}
              className="col-12 col-sm-6 col-md-6 col-lg-9"
            >
              Please add a hostel before adding Electricity information.
            </p>
          </div>
        )}
      </div>

      <>
        {EbList && EbList.length > 0
          ? EbList.map((v, index) => {
            return (
              <Row key={index} className="scroll-issue">
                <Col lg={8} md={12} sm={12}>
                  <Card
                    className="p-2 border mb-4 mb-md-0"
                    style={{ borderRadius: 16 }}
                  >
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

         
                      </div>
                      <hr />
                      <Form>
                        <Row className="mb-3">
                          <Col>
                            <Form.Label
                              style={{
                                fontSize: 12,
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                                color: "#939393",
                              }}
                            >
                              Per unit Amount
                            </Form.Label>
                            <h6
                              style={{
                                fontSize: 16,
                                fontFamily: "Gilroy",
                                fontWeight: 600,
                              }}
                            >
                              ₹ {v.amount}
                            </h6>
                 
                          </Col>

                          <Col>
                            <Form.Label
                              style={{
                                fontSize: 12,
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                                color: "#939393",
                              }}
                            >
                              Room Based Calculation
                            </Form.Label>
                            <Form.Check
                              type="switch"
                              id="roomBased"
                              label="Enabled"
                              checked={roomBasedCalculation}
                              onChange={() => {
                                handleRoomBased(v);
                              }}
                              className="custom-switch-pointer"
                            />
                          </Col>
                          <Col>
                            <Form.Label
                              style={{
                                fontSize: 12,
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                                color: "#939393",
                              }}
                            >
                              Hostel Based Calculation
                            </Form.Label>
                            <Form.Check
                              type="switch"
                              id="hostelBased"
                              label="Enabled"
                              className="custom-switch-pointer"
                              checked={hostelBasedCalculation}
                              onChange={() => {
                                handleHostelBased(v);
                              }}
                             
                            />
                          </Col>
                        </Row>

                        <Row className="mb-3">
                          <Col md={6}>
                            <Form.Label
                              style={{
                                fontSize: 12,
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                                color: "#939393",
                              }}
                            >
                              Recurring
                            </Form.Label>
                            <Form.Check
                              type="switch"
                              id={`custom-switch-${isRecurring}`}
                              label="Recurring"
                              className="custom-switch-pointer"
                              checked={isRecurring}
                              onChange={() => handleRecurringFormShow(v)}
                            />
                            <style>
                              {`
                                      .custom-switch-pointer input[type="checkbox"],
                                      .custom-switch-pointer label {
                                        cursor: pointer !important;
                                      }
                                    `}
                            </style>
                          </Col>
                        </Row>

                        <Row className="mb-3">
                          <Col>
                            <Form.Label
                              style={{
                                fontSize: 12,
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                                color: "#939393",
                              }}
                            >
                              Calculation Type
                            </Form.Label>
                            <h6
                              style={{
                                fontSize: 16,
                                fontFamily: "Gilroy",
                                fontWeight: 600,
                              }}
                            >
                              Monthly
                            </h6>
                          </Col>
                          <Col>
                            <Form.Label
                              style={{
                                fontSize: 12,
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                                color: "#939393",
                              }}
                            >
                              Calculation Start Day
                            </Form.Label>
                            <h6
                              style={{
                                fontSize: 16,
                                fontFamily: "Gilroy",
                                fontWeight: 600,
                              }}
                            >
                              {v.start_date}
                            </h6>
                          </Col>
                          <Col>
                            <Form.Label
                              style={{
                                fontSize: 12,
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                                color: "#939393",
                              }}
                            >
                              Calculation End Day
                            </Form.Label>
                            <h6
                              style={{
                                fontSize: 16,
                                fontFamily: "Gilroy",
                                fontWeight: 600,
                              }}
                            >
                              {v.end_date}
                            </h6>
                          </Col>
                        </Row>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            );
          })
          : !loading && (
            <div
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 65,
              }}
            >
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
          )}
      </>

      <Modal
        show={showFormElectricity}
        onHide={() => handleClose()}
        backdrop="static"
        centered
        dialogClassName="custom-modal"
      >
        <Modal.Header style={{ position: "relative" }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              fontFamily: "Gilroy",
            }}
          >
            {edit ? "Edit Electricity" : "Add Electricity"}
          </div>

          <CloseCircle
            size="24"
            color="#000"
            onClick={handleClose}
            style={{ cursor: "pointer" }}
          />
        </Modal.Header>
        <Modal.Body className="pt-1" style={{ marginBottom: "0px" }}>
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
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="1 kW Unit"
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
                    width: "100%",
                  }}
                />
              </Form.Group>
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
                  Amount/Unit{" "}
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

              <div className="">
                {amountErr && (
                  <p
                    style={{
                      color: "red",
                      fontSize: 12,
                      textAlign: "start",
                      margin: 0,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    <span style={{ fontSize: "20px" }}>
                      <MdError style={{ fontSize: "14px" }} />
                    </span>
                    {amountErr}
                  </p>
                )}
              </div>
              <div className="">
                {totalErr && (
                  <p
                    style={{
                      color: "red",
                      fontSize: 12,
                      textAlign: "center",
                      margin: 0,
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    <span style={{ fontSize: "20px" }}>
                      <MdError style={{ fontSize: "14px" }} />
                    </span>
                    {totalErr}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>

{formLoading && <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
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
              borderRight: '4px solid transparent',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              animation: 'spin 1s linear infinite',
            }}
          ></div>
        </div>}


        <Modal.Footer
          className="d-flex justify-content-center"
          style={{ borderTop: "none", marginBottom: "20px" }}
        >
          <Button
            className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            style={{
              backgroundColor: "#1E45E1",
              fontWeight: 600,
              height: 45,
              borderRadius: 12,
              fontSize: 16,
              fontFamily: "Montserrat, sans-serif",
              marginTop: "-10px",
              width: "100%",
            }}
            onClick={handleAddElectricity}
          >
            {edit ? "Update Electricity" : "Add Electricity"}
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
            dialogClassName="custom-modal"
          >
            <Modal.Dialog
              style={{
                maxWidth: 950,
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

                    <CloseCircle
                      size="24"
                      color="#000"
                      onClick={handleCloseRecurringForm}
                      style={{ cursor: "pointer" }}
                    />
                  </Modal.Header>
                </div>

                <div className="row mt-1">
                  <div className="mb-3 d-flex row">
                    <div className="col-lg-8">
                      <label htmlFor="startDayDropdown" className="form-label">
                        EB Calculation Start Date Will Be
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
                      </label>
                    </div>

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
                          option: (provided, state) => ({
                            ...provided,
                            padding: "6px 10px",
                            backgroundColor: state.isFocused
                              ? "lightblue"
                              : "white",
                            color: "#222",
                            cursor: "pointer",
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
                            cursor: "pointer",
                          }),
                          indicatorSeparator: () => ({
                            display: "none",
                          }),
                        }}
                      />
                    </div>

                    {calculatedstartdateerrmsg && (
                      <div className="d-flex align-items-center  mb-2">
                        <MdError
                          style={{
                            color: "red",
                            marginRight: "5px",
                            fontSize: "14px",
                          }}
                        />
                        <label
                          className="mb-0"
                          style={{
                            color: "red",
                            fontSize: "12px",
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
                      <label htmlFor="startDayDropdown" className="form-label">
                        EB Calculation End Date Will Be
                        <span style={{ color: "red", fontSize: "20px" }}>
                          {" "}
                          *{" "}
                        </span>
                      </label>
                    </div>

                    <div className="col-lg-4">
                      <Select
                        options={options}
                        onChange={handleEndDateChange}
                        value={options.find(
                          (option) => option.value === calculatedenddate
                        )}
                        placeholder="Select"
                        classNamePrefix="custom"
                        menuPlacement="auto"
                        styles={{
                          control: (base) => ({
                            ...base,
                            height: "40px",
                            border: "1px solid #ced4da",
                          }),
                          option: (provided, state) => ({
                            ...provided,
                            padding: "6px 10px",
                            backgroundColor: state.isFocused
                              ? "lightblue"
                              : "white",
                            color: "#222",
                            cursor: "pointer",
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
                            cursor: "pointer",
                          }),
                          indicatorSeparator: () => ({
                            display: "none",
                            cursor: "pointer",
                          }),
                        }}
                      />
                    </div>
                    {calculatedenddateerrmsg && (
                      <div className="d-flex align-items-center  mb-2">
                        <MdError
                          style={{
                            color: "red",
                            marginRight: "5px",
                            fontSize: "14px",
                          }}
                        />
                        <label
                          className="mb-0"
                          style={{
                            color: "red",
                            fontSize: "12px",
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
                      <label htmlFor="startDayDropdown" className="form-label">
                        On Every
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <select
                        className="form-select border"
                        id="startDayDropdown"
                        value={every_recurr}
                        onChange={handlechangeEvery}
                      >
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </div>
                </div>
              </Modal.Body>
{formRecurringLoading && <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
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
              borderRight: '4px solid transparent',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              animation: 'spin 1s linear infinite',
            }}
          ></div>
        </div>}
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
    </div>
  );
};

SettingElectricity.propTypes = {
  hostelid: PropTypes.func.isRequired,
};

export default SettingElectricity;
