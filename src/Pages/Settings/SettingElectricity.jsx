/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Form, Button, FormControl } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
// import { MdError } from "react-icons/md";
import EmptyState from "../../Assets/Images/New_images/empty_image.png";
import electricity from "../../Assets/Images/New_images/electricity.svg";
import editpic from "../../Assets/Images/New_images/edit.svg";
import Select from "react-select";
import "../../Pages/Settings/SettingAll.css";
import PropTypes from "prop-types";
import { CloseCircle } from "iconsax-react";
import "../../Pages/Settings/SettingElectricity.css";
import ErrorMessage from '../../Components/ErrorMessage'
import { useHasPermission } from '../../Utils/Permission';
import Emptystate from "../../Assets/Images/Empty-State.jpg";
import withErrorBoundary from "../../Hoc/WithErrorBountry";

const SettingElectricity = () => {

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  // const [isProWrate, setProWrate] = useState(false);
  const [roomBasedCalculation, setRoomBasedCalculation] = useState(false);
  const [hostelBasedCalculation, setHostelBasedCalculation] = useState(false);
  const [showFormElectricity, setShowFormElectricity] = useState(false);
  const [amount, setAmount] = useState("");
  const [amountErr, setAmountErr] = useState("");
  const [totalErr, setTotalErr] = useState("");
  const [recurringform, setRecurringForm] = useState(false);
  const [calculatedstartdate, setCalculatedstartdate] = useState(null);
  const [calculatedenddate, setCalculatedEnddate] = useState("28");
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
  const [loading, setLoading] = useState(false);




  // const canReadElectricity = useHasPermission("Electricity", "canRead")
  // const canUpdateElectricity = useHasPermission("Electricity", "canUpdate");

  const {
    //     canWriteModule: canWriteComplaints,
    canReadModule: canReadElectricity,
    canUpdateModule: canUpdateElectricity,
    // canDeleteModule: canDeleteComplaints,
  } = useHasPermission("Electricity");




  useEffect(() => {
    if (!canReadElectricity) {
      setLoading(false);
    }
  }, [canReadElectricity]);

  useEffect(() => {
    if (EbList.length === 0) {
      setLoading(false);
    }

  }, [EbList])
  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'ACCESS_RESTRICTION_ERROR_REMOVE' })
      }, 1000)
    }

  }, [state.UsersList?.accessRestrictionError])
  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setLoading(true)
      dispatch({
        type: "EB-BILLING-UNIT-LIST",
        payload: state.login.selectedHostel_Id
      });
     
    }
  }, [state.login.selectedHostel_Id]);

  useEffect(() => {
    if (
      state.Settings.addEbbillingUnitStatuscode === 200 ||
      state.Settings.deleteElectricityStatuscode === 200
    ) {
      dispatch({
        type: "EB-BILLING-UNIT-LIST",
        payload: state.login.selectedHostel_Id,
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
    if (!state.login.selectedHostel_Id) {
      setShowPopup(true);
      return;
    }
    setEditHostel({ id: null, name: null, editamount: null });
    setShowFormElectricity(true);
    setEdit(false);
  };

  const [edit, setEdit] = useState(false);

  const handleEditElectricity = (item) => {
    if (!state.login.selectedHostel_Id) {
      setShowPopup(true);
      return;
    }
    setEdit(true);
    setShowFormElectricity(true);
    setAmount(item.chargerPerUnit);
    setEditHostel({
      id: item.hostelId,
      editamount: item.chargerPerUnit,
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

    // if (editHostel && String(editHostel.editamount) === String(newAmount)) {
    //   setTotalErr("No Changes Deducted");
    // }
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
          hostelId: state.login.selectedHostel_Id,
          unitPrice: Number(amount),
        },
      });
      setFormLoading(true)
    } else if (!edit && amount !== "") {
      dispatch({
        type: "EB-BILLING-UNIT-ADD",

        payload: {
          hostelId: state.login.selectedHostel_Id,
          unitPrice: Number(amount),
        },
      });
      setFormLoading(true)
    }
  };

  const handleCloseRecurringForm = () => {
    setRecurringForm(false);
    dispatch({
      type: "EB-BILLING-UNIT-LIST",
      payload: state.login.selectedHostel_Id,
    });
    setCalculatedstartdateErrmsg("");
    setCalculatedEnddateErrMsg("");
    setCalculatedEnddate("");
    setCalculatedstartdate("");
  };

  // const handleProRate = () => {
  //   // dispatch({
  //   //   type: "ROOMHOSTELEBCHANGE",
  //   //   payload: {
  //   //     hostelId: state.login.selectedHostel_Id,
  //   //     isHostelBased: hostelBasedCalculation,
  //   //     isRoomBased: roomBasedCalculation,
  //   //     isProRate: isProWrate
  //   //   },
  //   // });
  // };




  // const handleProRate = () => {
  //   const newValue = !isProWrate;
  //   setProWrate(newValue);


  //   if (newValue) {
  //     setRecurringForm(true);
  //   } else {
  //     dispatch({
  //       type: "ROOMHOSTELEBCHANGE",
  //       payload: {
  //         hostelId: state.login.selectedHostel_Id,
  //         isProRate: false,
  //       },
  //     });
  //   }
  // };


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
        type: "ROOMHOSTELEBCHANGE",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          // isHostelBased: true,
          //  isRoomBased: false,
          isProRate: true,
          calculationStartingDate: calculatedstartdate,
          frequent: every_recurr
        },
      });
      // dispatch({
      //   type: "SETTINGSADDRECURRING",
      //   payload: {
      //     hostel_id: Number(state.login.selectedHostel_Id),
      //     type: "electricity",
      //     recure: 1,
      //     start_date: Number(calculatedstartdate),
      //     end_date: Number(calculatedenddate),
      //   },
      // });
      setFormRecurringLoading(true)
      // setProWrate(false);
    }
  };

  useEffect(() => {
    if (state.InvoiceList.settingsaddRecurringStatusCode === 200) {
      setCalculatedstartdate("");
      setCalculatedEnddate("");

      dispatch({
        type: "EB-BILLING-UNIT-LIST",
        payload: state.login.selectedHostel_Id,
      });
      setRecurringForm(false);
      setTimeout(() => {
        dispatch({ type: "REMOVE_STATUS_CODE_SETTINGS_ADD_RECURRING" });
      }, 100);
    }
  }, [state.InvoiceList.settingsaddRecurringStatusCode]);




  const handleHostelBased = () => {
    setHostelBasedCalculation(true);
    setRoomBasedCalculation(false);
    dispatch({
      type: "ROOMHOSTELEBCHANGE",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        isHostelBased: true,
        isRoomBased: false,
      },
    });
  };

  const handleRoomBased = () => {
    setHostelBasedCalculation(false);
    setRoomBasedCalculation(true);
    dispatch({
      type: "ROOMHOSTELEBCHANGE",
      payload: {
        hostelId: state.login.selectedHostel_Id,
        isHostelBased: false,
        isRoomBased: true,

      },
    });
  };

  useEffect(() => {
    if (state.Settings?.getebStatuscode === 200) {
      setHostelBasedCalculation(state.Settings?.EBBillingUnitlist?.isHostelBased);
      setRoomBasedCalculation(state.Settings?.EBBillingUnitlist?.isRoomBased);
      // setProWrate(state.Settings?.EBBillingUnitlist?.isProRate);
    }
  }, [state.Settings?.getebStatuscode]);

  useEffect(() => {
    if (state.Settings?.ebSettingsChangesStatusCode === 200) {
      setFormRecurringLoading(false)
      setRecurringForm(false)
      dispatch({
        type: "EB-BILLING-UNIT-LIST",
        payload: state.login.selectedHostel_Id,
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE_ROOM_HOSTEL_EB_CHANGE" });
      }, 100);

    }

  }, [state.Settings?.ebSettingsChangesStatusCode])

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

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])


  return (
    <div
    >
     

      <div className="sticky top-0 left-0 right-0 z-50 bg-white flex flex-col md:flex-row justify-between items-center min-h-[50px] px-1.5 whitespace-nowrap">

        <div className="w-full flex justify-center md:justify-start md:mt-0">
          <label className="text-black font-semibold text-[18px] font-gilroy whitespace-nowrap">
            Electricity
          </label>
        </div>


        <div className="w-full flex justify-center md:justify-end  md:mt-0">
          {EbList ? (
            <button
              disabled={!canUpdateElectricity}
              onClick={() => handleEditElectricity(EbList)}
              className={`flex items-center justify-center gap-2 h-[45px] w-[146px] rounded-lg text-sm font-semibold font-gilroy transition ${canUpdateElectricity
                  ? "bg-blue-700 text-white hover:bg-blue-800 cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              <img src={editpic} alt="Edit" className="w-4 h-4" />
              Edit
            </button>
          ) : (
            <button
              onClick={handleShowFormElectricity}
              disabled={showPopup}
              className={`h-[45px] w-[146px] rounded-lg text-sm font-semibold font-gilroy transition flex items-center justify-center ${!showPopup
                  ? "bg-blue-700 text-white hover:bg-blue-800 cursor-pointer"
                  : "bg-gray-300 text-white cursor-not-allowed"
                }`}
            >
              + Electricity
            </button>
          )}
        </div>

        {/* Popup message */}
        {showPopup && (
          <div className="flex flex-wrap mt-2 w-full">
            <p className="text-red-500 font-gilroy text-sm w-full md:w-auto">
              Please add a hostel before adding Electricity information.
            </p>
          </div>
        )}
      </div>







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









      <div>


        {

          !canReadElectricity ?

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 100
              }}
            >

              <img
                src={Emptystate}
                alt="Empty State"

              />



              <ErrorMessage message={['You do not have access to view Electricity']} type="warning" />

            </div>
            :
            EbList ?

              <Row className="scroll-issue mt-2">
                <Col lg={10} md={8} sm={12} >
                  <Card
                    className="p-2 border mb-4 mb-md-0"
                    style={{ borderRadius: 16 }}
                  >
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center flex-wrap">


                        <div className="d-flex justify-content-between align-items-center" style={{ width: "100%" }}>
                          <div className="d-flex align-items-center">
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                background: "#E7F1FF",
                                borderRadius: "50%",
                                width: 32,
                                height: 32,
                                justifyContent: "center",
                                marginRight: 10,
                              }}
                            >
                              <img
                                src={electricity}
                                alt="electricity"
                                style={{ width: 18, height: 18 }}
                              />
                            </span>
                            <span
                              style={{
                                fontFamily: "Gilroy",
                                fontSize: 16,
                                color: "#222",
                                fontWeight: 600,
                              }}
                            >
                              Electricity Information
                            </span>
                          </div>

                          {/* RIGHT SIDE */}
                          <div>
                            <span
                              style={{
                                fontFamily: "Gilroy",
                                fontWeight: 600,
                                fontSize: 16,
                                color: "#222",
                              }}
                            >
                              ₹ {EbList?.chargerPerUnit}rs
                            </span>
                            <span
                              style={{
                                fontFamily: "Gilroy",
                                fontWeight: 400,
                                fontSize: 13,
                                color: "#939393",
                                marginLeft: 4,
                              }}
                            >
                              /Unit
                            </span>
                          </div>
                        </div>



                      </div>
                      <hr />



                      <Form>

                        <Row className="mb-3 text-center">
                          <Col >
                            <Form.Label
                              style={{
                                fontSize: 12,
                                fontFamily: "Gilroy",
                                fontWeight: 600,
                                color: "#4B4B4B",
                                display: "block",
                              }}
                            >
                              Room Based Calculation
                            </Form.Label>
                            <Form.Check
                              disabled={!canUpdateElectricity}
                              type="switch"
                              id="roomBased"
                              checked={roomBasedCalculation}
                              onChange={() => handleRoomBased(EbList)}
                              className="custom-switch-pointer"
                            />
                          </Col>

                          <Col >
                            <Form.Label
                              style={{
                                fontSize: 12,
                                fontFamily: "Gilroy",
                                fontWeight: 600,
                                color: "#4B4B4B",
                                display: "block",
                              }}
                            >
                              Hostel Based Calculation
                            </Form.Label>
                            <Form.Check
                              disabled={!canUpdateElectricity}
                              type="switch"
                              id="hostelBased"
                              checked={hostelBasedCalculation}
                              onChange={() => handleHostelBased(EbList)}
                              className="custom-switch-pointer"
                            />
                          </Col>

                          {/* <Col>
                        <Form.Label
                          style={{
                            fontSize: 12,
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                            color: "#4B4B4B",
                            display: "block",
                          }}
                        >
                          Pro-Wrate
                        </Form.Label>
                        <Form.Check
                          style={{ marginLeft: "-17px" }}
                          type="switch"
                          id="proRate"
                          checked={isProWrate}
                          onChange={() => handleProRate()}
                          className="custom-switch-pointer"
                        />
                      </Col> */}
                        </Row>

                        <style>
                          {`
      .custom-switch-pointer input[type="checkbox"],
      .custom-switch-pointer label {
        cursor: pointer !important;
      }
      .form-check {
        display: flex;
        justify-content: center;
      }
    `}
                        </style>
                      </Form>


                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              : !loading && (


                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{
                    width: "100%",
                    margin: "0px auto",
                    backgroundColor: "",
                    marginTop: 120,
                    justifyContent: "center", alignItems: "center"
                  }}
                >
                  <div>
                    <div className="d-flex  justify-content-center">
                      <img
                        src={EmptyState}

                        alt="Empty state"
                      />
                    </div>
                    <div
                      className="pb-1 mt-3"
                      style={{
                        textAlign: "center",
                        fontWeight: 600,
                        fontFamily: "Gilroy",
                        fontSize: 18,
                        color: "rgba(75, 75, 75, 1)",
                      }}
                    >
                      No Electricity available
                    </div>


                  </div>
                  <div></div>
                </div>

              )}
      </div>

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
                  Amount/Unit {" "} <span style={{ color: "red", fontSize: "20px" }}> * </span>
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

              <div className=" d-flex align-items-center">
                {amountErr && (
                  <ErrorMessage message={amountErr} type="error" />
                )}
              </div>
              <div className="">
                {totalErr && (
                  <div className=" d-flex align-items-center justify-content-center">

                    <ErrorMessage message={totalErr} type="error" />
                  </div>
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
          style={{ borderTop: "none", marginBottom: "" }}
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
            <Modal.Header
              style={{ position: "relative" }}
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
            <Modal.Dialog
              style={{
                maxWidth: 950,
                paddingRight: "10px",

              }}
              className="m-0 p-0"
            >
              <Modal.Body style={{ border: "none" }}>


                <div className="row mt-1">
                  <div className="mb-3 d-flex row">
                    <div className="col-lg-8">
                      <label htmlFor="startDayDropdown" className="form-label" style={{ fontFamily: "Gilroy" }}>
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
                            border: "1px solid #D9D9D9",
                            borderRadius: "8px",
                            fontSize: "16px",
                            color: "#4B4B4B",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            boxShadow: "none",
                          }),
                          option: (provided, state) => ({
                            ...provided,
                            padding: "6px 10px",
                            backgroundColor: state.isFocused
                              ? "lightblue"
                              : "white",
                            color: "#222",
                            cursor: "pointer",
                            fontFamily: "Gilroy"
                          }),
                          menu: (base) => ({
                            ...base,
                            maxHeight: "120px",
                            overflowY: "auto",
                            scrollbarWidth: "thin",
                            fontFamily: "Gilroy"
                          }),
                          menuList: (base) => ({
                            ...base,
                            maxHeight: "120px",
                            padding: 0,
                            scrollbarWidth: "thin",
                            fontFamily: "Gilroy"
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
                      <ErrorMessage message={calculatedstartdateerrmsg} type="error" />
                    )}
                  </div>

                  <div className="mb-3 d-flex row">
                    <div className="col-lg-8">
                      <label htmlFor="startDayDropdown" className="form-label" style={{ fontFamily: "Gilroy" }}>
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
                        isDisabled
                        onChange={handleEndDateChange}
                        value={options.find(option => option.value === 28)}
                        placeholder="Select"
                        classNamePrefix="custom"
                        menuPlacement="auto"
                        styles={{
                          control: (base) => ({
                            ...base,
                            height: "40px",
                            border: "1px solid #D9D9D9",
                            borderRadius: "8px",
                            fontSize: "16px",
                            color: "#4B4B4B",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            boxShadow: "none",
                          }),
                          option: (provided, state) => ({
                            ...provided,
                            padding: "6px 10px",
                            backgroundColor: state.isFocused
                              ? "lightblue"
                              : "white",
                            color: "#222",
                            cursor: "pointer",
                            fontFamily: "Gilroy"
                          }),
                          menu: (base) => ({
                            ...base,
                            maxHeight: "120px",
                            overflowY: "auto",
                            scrollbarWidth: "thin",
                            fontFamily: "Gilroy"
                          }),
                          menuList: (base) => ({
                            ...base,
                            maxHeight: "120px",
                            padding: 0,
                            scrollbarWidth: "thin",
                            fontFamily: "Gilroy"
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
                      <ErrorMessage message={calculatedenddateerrmsg} type="error" />
                    )}
                  </div>

                  <div className="mb-3 d-flex row">
                    <div className="col-lg-8">
                      <label htmlFor="startDayDropdown" className="form-label" style={{ fontFamily: "Gilroy" }}>
                        On Every
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <select
                        className="form-select border"
                        id="startDayDropdown"
                        value={every_recurr}
                        onChange={handlechangeEvery}
                        style={{ fontFamily: "Gilroy", color: "#4B4B4B", fontWeight: 500 }}
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

export default withErrorBoundary(SettingElectricity);

