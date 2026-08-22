/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Form, Button, FormControl } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import EmptyState from "../../Assets/Images/New_images/empty_image.png";
import electricity from "../../Assets/Images/New_images/electricity.svg";
import editpic from "../../Assets/Images/New_images/edit.svg";
import Select from "react-select";
import "../../Pages/Settings/SettingAll.css";
import PropTypes from "prop-types";
import { CloseCircle } from "iconsax-react";
import "../../Pages/Settings/SettingElectricity.css";
import ErrorMessage from "../../Components/ErrorMessage";
import { useHasPermission } from "../../Utils/Permission";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";

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
  const [formLoading, setFormLoading] = useState(false);
  const [formRecurringLoading, setFormRecurringLoading] = useState(false);

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
  }, [EbList]);
  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 100);
    }
  }, [state.UsersList?.accessRestrictionError]);
  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setLoading(true);
      dispatch({
        type: "EB-BILLING-UNIT-LIST",
        payload: state.login.selectedHostel_Id,
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
      setFormLoading(false);
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
      setFormLoading(true);
    } else if (!edit && amount !== "") {
      dispatch({
        type: "EB-BILLING-UNIT-ADD",

        payload: {
          hostelId: state.login.selectedHostel_Id,
          unitPrice: Number(amount),
        },
      });
      setFormLoading(true);
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
          frequent: every_recurr,
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
      setFormRecurringLoading(true);
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
      setHostelBasedCalculation(
        state.Settings?.EBBillingUnitlist?.isHostelBased,
      );
      setRoomBasedCalculation(state.Settings?.EBBillingUnitlist?.isRoomBased);
      // setProWrate(state.Settings?.EBBillingUnitlist?.isProRate);
    }
  }, [state.Settings?.getebStatuscode]);

  useEffect(() => {
    if (state.Settings?.ebSettingsChangesStatusCode === 200) {
      setFormRecurringLoading(false);
      setRecurringForm(false);
      dispatch({
        type: "EB-BILLING-UNIT-LIST",
        payload: state.login.selectedHostel_Id,
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE_ROOM_HOSTEL_EB_CHANGE" });
      }, 100);
    }
  }, [state.Settings?.ebSettingsChangesStatusCode]);

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
      setFormLoading(false);
      setFormRecurringLoading(false);
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
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  return (
    <div>
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
              className={`flex items-center justify-center gap-2 h-[45px] w-[146px] rounded-lg text-sm font-semibold font-gilroy transition ${
                canUpdateElectricity
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
              className={`h-[45px] w-[146px] rounded-lg text-sm font-semibold font-gilroy transition flex items-center justify-center ${
                !showPopup
                  ? "bg-blue-700 text-white hover:bg-blue-800 cursor-pointer"
                  : "bg-gray-300 text-white cursor-not-allowed"
              }`}
            >
              + Electricity
            </button>
          )}
        </div>

        {showPopup && (
          <div className="flex flex-wrap mt-2 w-full">
            <p className="text-red-500 font-gilroy text-sm w-full md:w-auto">
              Please add a hostel before adding Electricity information.
            </p>
          </div>
        )}
      </div>

      {loading && (
        <div className="fixed inset-0 z-[1050] flex items-center justify-center bg-transparent">
          <div className="w-10 h-10 rounded-full border-t-4 border-[#1E45E1] border-r-4 border-r-transparent animate-spin"></div>
        </div>
      )}

      <div>
        {!canReadElectricity ? (
          <>
            <PermissionDeniedMessage />
          </>
        ) : EbList ? (
          <div>
            <div className="scroll-issue mt-2">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-8 lg:col-span-10">
                  <div className="border rounded-[16px] p-2 mb-4 md:mb-0 bg-white">
                    <div className="p-3">
                      <div className="flex justify-between items-center flex-wrap w-full">
                        <div className="flex items-center">
                          <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#E7F1FF] mr-2.5">
                            <img
                              src={electricity}
                              alt="electricity"
                              className="w-[18px] h-[18px]"
                            />
                          </span>

                          <span className="font-gilroy text-[16px] font-semibold text-[#222]">
                            Electricity Information
                          </span>
                        </div>

                        <div className="flex items-center">
                          <span className="font-gilroy font-semibold text-[16px] text-[#222] leading-none">
                            ₹ {EbList?.chargerPerUnit}rs
                          </span>
                          <span className="font-gilroy font-normal text-[13px] text-[#939393] ml-1 leading-none">
                            /Unit
                          </span>
                        </div>
                      </div>

                      <hr className="my-4" />

                      <form>
                        <div className="grid grid-cols-12 gap-4 text-center">
                          <div className="col-span-12 sm:col-span-6">
                            <label className="block text-[12px] font-gilroy font-semibold text-black mb-3">
                              Room Based Calculation
                            </label>

                            <div className="flex justify-center">
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  disabled={!canUpdateElectricity}
                                  checked={roomBasedCalculation}
                                  onChange={() => handleRoomBased(EbList)}
                                  className="sr-only peer"
                                />

                                <div className="w-8 h-4 bg-gray-300 rounded-full peer-checked:bg-blue-700 peer-disabled:opacity-40 after:content-[''] after:absolute after:top-[1.5px] after:left-[1px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4" />
                              </label>
                            </div>
                          </div>

                          <div className="col-span-12 sm:col-span-6">
                            <label className="block text-[12px] font-gilroy font-semibold text-black mb-3">
                              Hostel Based Calculation
                            </label>

                            <div className="flex justify-center">
                              <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                  type="checkbox"
                                  disabled={!canUpdateElectricity}
                                  checked={hostelBasedCalculation}
                                  onChange={() => handleHostelBased(EbList)}
                                  className="sr-only peer"
                                />

                                <div className="w-8 h-4 bg-gray-300 rounded-full peer-checked:bg-blue-800 peer-disabled:opacity-40 after:content-[''] after:absolute after:top-[1.5px] after:left-[1px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4" />
                              </label>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          !loading && (
            <div className="d-flex justify-content-center align-items-center w-100 mt-5 font-gilroy">
              <div className="text-center">
                <div className="d-flex justify-content-center">
                  <img src={EmptyState} alt="Empty state" />
                </div>

                <div className="pb-1 mt-3 fw-semibold text-secondary text-lg font-gilroy">
                  No Electricity available
                </div>
              </div>
            </div>
          )
        )}
      </div>

      <Modal
        show={showFormElectricity}
        onHide={() => handleClose()}
        backdrop="static"
        centered
        dialogClassName="custom-modal"
      >
        <Modal.Header className="d-flex justify-content-between align-items-center position-relative">
          <div
            className="fw-semibold"
            style={{ fontSize: 20, fontFamily: "Gilroy" }}
          >
            {edit ? "Edit Electricity" : "Add Electricity"}
          </div>

          <CloseCircle
            size={24}
            color="#000"
            onClick={handleClose}
            className="cursor-pointer"
          />
        </Modal.Header>
        <Modal.Body className="pt-1 mb-0">
          <div>
            <div className="w-full">
              <Form.Group className="mb-3">
                <Form.Label className="text-sm text-gray-900 font-gilroy font-medium">
                  Unit{" "}
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="1 kW Unit"
                  readOnly
                  className="w-full h-12 text-base text-gray-600 font-gilroy font-medium border border-gray-300 rounded-lg !bg-blue-50 shadow-none"
                />
              </Form.Group>
            </div>

            <div className="w-full">
              <Form.Group className="mb-1">
                <Form.Label className="text-sm text-gray-900 font-gilroy font-medium">
                  Amount/Unit <span className="text-red-500 text-xl">*</span>
                </Form.Label>
                <FormControl
                  type="text"
                  id="form-controls"
                  placeholder="₹ 4,000"
                  value={amount}
                  onChange={(e) => handleChangeAmount(e)}
                  className="h-12 text-base text-gray-600 font-gilroy font-medium border border-gray-300 rounded-lg shadow-none"
                />
              </Form.Group>

              <div className="flex items-center">
                {amountErr && <ErrorMessage message={amountErr} type="error" />}
              </div>
              <div className="w-full">
                {totalErr && (
                  <div className="flex items-center justify-center">
                    <ErrorMessage message={totalErr} type="error" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>

        {formLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-transparent opacity-75">
            <div className="h-10 w-10 rounded-full border-4 border-transparent border-t-blue-700 animate-spin"></div>
          </div>
        )}

        <Modal.Footer className="flex justify-center border-0">
          <Button
            onClick={handleAddElectricity}
            className="w-full h-11 -mt-2 !bg-blue-700 !font-semibold !text-base font-gilroy !rounded-xl"
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
            <Modal.Header style={{ position: "relative" }}>
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
                      <label
                        htmlFor="startDayDropdown"
                        className="form-label"
                        style={{ fontFamily: "Gilroy" }}
                      >
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
                            fontFamily: "Gilroy",
                          }),
                          menu: (base) => ({
                            ...base,
                            maxHeight: "120px",
                            overflowY: "auto",
                            scrollbarWidth: "thin",
                            fontFamily: "Gilroy",
                          }),
                          menuList: (base) => ({
                            ...base,
                            maxHeight: "120px",
                            padding: 0,
                            scrollbarWidth: "thin",
                            fontFamily: "Gilroy",
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
                      <ErrorMessage
                        message={calculatedstartdateerrmsg}
                        type="error"
                      />
                    )}
                  </div>

                  <div className="mb-3 d-flex row">
                    <div className="col-lg-8">
                      <label
                        htmlFor="startDayDropdown"
                        className="form-label"
                        style={{ fontFamily: "Gilroy" }}
                      >
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
                        value={options.find((option) => option.value === 28)}
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
                            fontFamily: "Gilroy",
                          }),
                          menu: (base) => ({
                            ...base,
                            maxHeight: "120px",
                            overflowY: "auto",
                            scrollbarWidth: "thin",
                            fontFamily: "Gilroy",
                          }),
                          menuList: (base) => ({
                            ...base,
                            maxHeight: "120px",
                            padding: 0,
                            scrollbarWidth: "thin",
                            fontFamily: "Gilroy",
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
                      <ErrorMessage
                        message={calculatedenddateerrmsg}
                        type="error"
                      />
                    )}
                  </div>

                  <div className="mb-3 d-flex row">
                    <div className="col-lg-8">
                      <label
                        htmlFor="startDayDropdown"
                        className="form-label"
                        style={{ fontFamily: "Gilroy" }}
                      >
                        On Every
                      </label>
                    </div>
                    <div className="col-lg-4">
                      <select
                        className="form-select border"
                        id="startDayDropdown"
                        value={every_recurr}
                        onChange={handlechangeEvery}
                        style={{
                          fontFamily: "Gilroy",
                          color: "#4B4B4B",
                          fontWeight: 500,
                        }}
                      >
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              {formRecurringLoading && (
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "transparent",
                    opacity: 0.75,
                    zIndex: 10,
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
