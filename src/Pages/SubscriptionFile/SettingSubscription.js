/* eslint-disable react-hooks/exhaustive-deps */
import  { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import crown from "../../Assets/Images/New_images/crown.png";
import { Button, Form, FormControl } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import DeleteIcon from "../../Assets/Images/Delete_red.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { MdError } from "react-icons/md";
import { CloseCircle } from "iconsax-react";
import {  ArrowUp2, ArrowDown2 } from "iconsax-react";
import { Table } from "react-bootstrap";
import "./SettingSubscription.css";

function SettingSubscription() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [plan, setPlan] = useState(false);
  const [changePlan, setChangePlan] = useState(false);
  const [userId, setUserId] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [planCode, setPlanCode] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [hostelCount, setHostelCount] = useState(1);
  const [selectedPlanError, setSelectedPlanError] = useState("");
  const [hostelCountError, setHostelCountError] = useState("");
  const [hostelError, setHostelError] = useState("");
  const [planType, setPlanType] = useState("");
  const [getPlanActive, setGetPlanActive] = useState("");
  const [selectedHostels, setSelectedHostels] = useState([]);

  useEffect(() => {
    dispatch({ type: "ACCOUNTDETAILS" });
  }, []);

  const [customerDetails, setCustomerDetails] = useState("");
  const [Subscription_hostelIds, setSubscription_HostelIds] = useState([]);
  useEffect(() => {
    if (state?.createAccount?.accountList[0]?.user_details) {
      const customerDetailsPage =
        state?.createAccount?.accountList[0]?.user_details;
      setCustomerDetails(customerDetailsPage);
      setUserId(customerDetails.id);
      setCustomerId(customerDetails.customer_id);
      setPlanType(customerDetails.plan_code);
      setSubscription_HostelIds(customerDetails.hostel_ids);
    }
  }, [state?.createAccount?.accountList[0]?.user_details]);
  useEffect(() => {
    if (state?.createAccount?.accountList[0]?.plan_data) {
      setGetPlanActive(state?.createAccount?.accountList[0]?.plan_data);
    }
  }, [state?.createAccount?.accountList[0]?.plan_data]);

  useEffect(() => {
    if (customerId) {
      dispatch({ type: "NEWSUBSCRIPTIONDETAILS", payload: { customerId } });
    }
  }, [customerId]);

  useEffect(() => {
    if (state.Settings.statusCodeNewSubscription === 200) {
      const Redirect_Url = state.Settings.subscriptionNew.url;
      if (Redirect_Url) {
        window.open(Redirect_Url, "_blank");
      }

      setTimeout(() => {
        dispatch({ type: "CLEAR_NEW_SUBSCRIPTION" });
      }, 1000);
    }
  }, [state.Settings.statusCodeNewSubscription]);

 

  const handleDownloadPdf = (item) => {
    const id = item.invoice_id;

    if (id) {
      dispatch({ type: "SUBSCRIPTIONPDF", payload: id });
    }
  };

  const handleHostelSelect = (selectedOption) => {
    if (!selectedOption) {
      setHostelError("please select hostel");
      return;
    }

    setHostelError("");
    setSelectedHostels((prev) => [...prev, selectedOption]);
  };

  const handleRemoveHostel = (valueToRemove) => {
    const updatedList = selectedHostels.filter(
      (item) => item.value !== valueToRemove
    );
    setSelectedHostels(updatedList);
  };

  const hostelOptions = state.UsersList.hostelListNewDetails.data?.map(
    (item) => ({
      label: item.Name,
      value: item.id,
    })
  );

  

  const filteredOptions = (hostelOptions || []).filter(
    (option) =>
      !selectedHostels.some((selected) => selected.value === option.value) &&
      !(Subscription_hostelIds || []).includes(option.value)
  );

  useEffect(() => {
    if (selectedHostels) {
      setHostelCount(selectedHostels.length);
    }
  }, [selectedHostels]);

  const [hostelIds, setHostelIds] = useState([]);

  useEffect(() => {
    const ids = selectedHostels.map((item) => item.value);
    setHostelIds(ids);
  }, [selectedHostels]);

  useEffect(() => {
    setHostelCount("1");
    setAmount(Number(selectedPlan) || 0);
  }, [selectedPlan]);

  const handlePlanChange = (price) => {
    setSelectedPlan(price);
    setPlan(true);
    setAmount(hostelCount * price);
    handleCloseCurrentPlan();

    if (price === 1) {
      setPlanCode("basic_smart");
    } else if (price === 2) {
      setPlanCode("advance_prod");
    } else if (price === 999) {
      setPlanCode("smartstay_oneyear");
    }
  };

  useEffect(() => {
    setAmount(hostelCount * (Number(selectedPlan) || 0));
  }, [selectedPlan, hostelCount]);

  

  const handleClosePlanChange = () => {
    setPlan(false);
    setHostelCountError("");
    setSelectedHostels([]);
  };

  const handleCurrentPlan = () => {
    setChangePlan(true);
  };

  useEffect(() => {
    if (changePlan) {
      handleClosePlanChange();
      
    }
  }, [changePlan]);

  const handleSubmit = () => {
    let isValid = true;

    if (!selectedPlan) {
      setSelectedPlanError("Please Select a Plan");
      isValid = false;
    } else {
      setSelectedPlanError("");
    }

    if (selectedHostels.length === 0) {
      setHostelError("please select hostel");
      isValid = false;
      return;
    }

    if (isValid && selectedHostels.length > 0) {
      dispatch({
        type: "NEWSUBSCRIPTION",
        payload: {
          user_id: userId,
          customer_id: customerId,
          plan_code: planCode,
          amount: amount,
          hostel_ids: hostelIds,
          hostel_count: Number(hostelCount),
        },
      });
    }
  };

  const handleCloseCurrentPlan = () => {
    setChangePlan(false);
    setHostelCountError("");
    const modalElement = document.getElementById("changePlanModal");
    if (modalElement) {
      modalElement.classList.remove("show");
      modalElement.setAttribute("aria-hidden", "true");
      modalElement.style.display = "none";
    }

    document.querySelectorAll(".modal-backdrop").forEach((el) => el.remove());
  };

  return (
    <div className="container">
      <div style={{ marginTop: 35 }}>
        <div className="w-100 d-flex justify-content-center justify-content-md-start mt-4">
          <p
            className="cardnewsubs"
            style={{ fontSize: 20, fontFamily: "Gilroy", fontWeight: 600 }}
          >
            Subscription
          </p>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-md-6">
  
          <div className="card p-3 cardnewsubs">
            {getPlanActive?.length > 0 && getPlanActive[0]?.amount > 0 ? (
              <>
                <div
                  className="d-flex align-items-center justify-content-center rounded-circle bg-light"
                  style={{ width: 40, height: 40 }}
                >
                  <img src={crown} width={30} height={30} alt="Crown Icon" />
                </div>

                <div className="mt-2">
                  <p className="text-dark fw-semibold fs-6">
                    Your plan is active
                  </p>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <p className="text-secondary mb-0 fs-6">Amount</p>
                  <p className="fw-semibold mb-0 fs-6">
                    ₹{getPlanActive[0]?.amount}
                  </p>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-2">
                  <p className="text-secondary mb-0 fs-6">Next payment</p>
                  <p className="fw-semibold mb-0 fs-6">
                    {new Date(getPlanActive[0]?.plan_end).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      }
                    )}
                  </p>
                </div>

                <div className="d-flex justify-content-between align-items-center mt-2">
                  <p className="text-secondary mb-0 fs-6">Payment method</p>
                  <p className="fw-semibold mb-0 fs-6">
                    {getPlanActive[0]?.payment_method}
                  </p>
                </div>

                <div className="d-flex mt-3 w-100">
                  <button
                    className="btn btn-primary w-100 fw-semibold fs-6"
                    onClick={handleCurrentPlan}
                    data-bs-toggle="modal"
                    data-bs-target="#changePlanModal"
                  >
                    Manage Plan
                  </button>
                </div>
              </>
            ) : (
              <div className="mt-2 text-center">
                <p className="text-dark fw-semibold fs-6 mb-3">
                  Your plan is a trial plan
                </p>
                <button
                  className="btn btn-primary fw-semibold fs-6"
                  onClick={handleCurrentPlan}
                  data-bs-toggle="modal"
                  data-bs-target="#changePlanModal"
                >
                  Upgrade Plan
                </button>
              </div>
            )}
          </div>
        </div>

        {getPlanActive?.length > 0 && getPlanActive[0]?.amount > 0 && (
          <div className="col-lg-12 col-md-12 col-sm-10 mt-3">
            <div
              className=" booking-table-userlist  booking-table"
              style={{ paddingBottom: "20px" }}
            >
              {getPlanActive?.length > 0 && (
                <div
                  className="show-scrolls"
                  style={{
                    height: "250px",
                    overflow: "auto",
                    borderTop: "1px solid #E8E8E8",
                    marginBottom: 20,
                    marginTop: "20px",
                    paddingRight: 0,
                    paddingLeft: 0,
                  }}
                >
                  <Table
                    responsive="md"
                    style={{
                      fontFamily: "Gilroy",
                      color: "rgba(34, 34, 34, 1)",
                      fontSize: 14,
                      fontStyle: "normal",
                      fontWeight: 500,
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                      borderRadius: 0,
                    }}
                  >
                    <thead
                      style={{
                        fontFamily: "Gilroy",
                        backgroundColor: "rgba(231, 241, 255, 1)",
                        color: "rgba(34, 34, 34, 1)",
                        fontSize: 12,
                        fontStyle: "normal",
                        fontWeight: 500,
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                      }}
                    >
                      <tr className="" style={{ height: "30px" }}>
                        <th
                          style={{
                            textAlign: "start",
                            color: "#939393",
                            fontWeight: 500,
                            fontSize: "12px",
                            fontFamily: "Gilroy",
                            paddingTop: "10px",
                            paddingBottom: "10px",
                            paddingLeft: "20px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <div className="d-flex gap-1 align-items-center justify-content-start">
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "2px",
                              }}
                            >
                              <ArrowUp2
                                size="10"
                                variant="Bold"
                                color="#1E45E1"
                                style={{ cursor: "pointer" }}
                              />
                              <ArrowDown2
                                size="10"
                                variant="Bold"
                                color="#1E45E1"
                                style={{ cursor: "pointer" }}
                              />
                            </div>
                            S.No
                          </div>
                        </th>
                        <th
                          style={{
                            color: "#939393",
                            fontWeight: 500,
                            fontSize: "12px",
                            fontFamily: "Gilroy",
                            paddingTop: "10px",
                            paddingBottom: "10px",
                            textAlign: "start",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <div className="d-flex gap-1 align-items-center justify-content-start">
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "2px",
                              }}
                            >
                              <ArrowUp2
                                size="10"
                                variant="Bold"
                                color="#1E45E1"
                                style={{ cursor: "pointer" }}
                              />
                              <ArrowDown2
                                size="10"
                                variant="Bold"
                                color="#1E45E1"
                                style={{ cursor: "pointer" }}
                              />
                            </div>
                            Hostel Name
                          </div>
                        </th>
                        <th
                          style={{
                            color: "#939393",
                            fontWeight: 500,
                            fontSize: "12px",
                            fontFamily: "Gilroy",
                            paddingTop: "10px",
                            paddingBottom: "10px",
                            textAlign: "start",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <div className="d-flex gap-1 align-items-center justify-content-start">
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "2px",
                              }}
                            >
                              <ArrowUp2
                                size="10"
                                variant="Bold"
                                color="#1E45E1"
                                style={{ cursor: "pointer" }}
                              />
                              <ArrowDown2
                                size="10"
                                variant="Bold"
                                color="#1E45E1"
                                style={{ cursor: "pointer" }}
                              />
                            </div>
                            Plan startDate
                          </div>
                        </th>
                        <th
                          style={{
                            color: "#939393",
                            fontWeight: 500,
                            fontSize: "12px",
                            fontFamily: "Gilroy",
                            paddingTop: "10px",
                            paddingBottom: "10px",
                            textAlign: "start",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <div className="d-flex gap-1 align-items-center justify-content-start">
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "2px",
                              }}
                            >
                              <ArrowUp2
                                size="10"
                                variant="Bold"
                                color="#1E45E1"
                                style={{ cursor: "pointer" }}
                              />
                              <ArrowDown2
                                size="10"
                                variant="Bold"
                                color="#1E45E1"
                                style={{ cursor: "pointer" }}
                              />
                            </div>
                            Plan EndDate
                          </div>
                        </th>

                        <th
                          style={{
                            color: "#939393",
                            fontWeight: 500,
                            fontSize: "12px",
                            fontFamily: "Gilroy",
                            paddingTop: "10px",
                            paddingBottom: "10px",
                            textAlign: "start",
                          }}
                        >
                          <div className="d-flex gap-1 align-items-center justify-content-start">
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "2px",
                              }}
                            >
                              <ArrowUp2
                                size="10"
                                variant="Bold"
                                color="#1E45E1"
                                style={{ cursor: "pointer" }}
                              />
                              <ArrowDown2
                                size="10"
                                variant="Bold"
                                color="#1E45E1"
                                style={{ cursor: "pointer" }}
                              />
                            </div>
                            Status
                          </div>
                        </th>
                        <th
                          style={{
                            color: "#939393",
                            fontWeight: 500,
                            fontSize: "12px",
                            fontFamily: "Gilroy",
                            paddingTop: "10px",
                            paddingBottom: "10px",
                            textAlign: "start",
                          }}
                        >
                          {" "}
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      style={{
                        height: "50px",
                        fontSize: "11px",
                        verticalAlign: "middle",
                      }}
                    >
                      {getPlanActive.length > 0 &&
                        getPlanActive[0]?.hostel_details.length > 0 &&
                        getPlanActive[0]?.hostel_details.map((view, index) => {
                          let Dated = new Date(view.plan_start);

                          let day = Dated.getDate();
                          let month = Dated.getMonth() + 1;
                          let year = Dated.getFullYear();

                          let formattedDate = `${day}/${month}/${year}`;

                          let dueDated = new Date(view.plan_end);

                          let daydue = dueDated.getDate();
                          let monthdue = dueDated.getMonth() + 1;
                          let yeardue = dueDated.getFullYear();

                          let DueformattedDate = `${daydue}/${monthdue}/${yeardue}`;

                          return (
                            <tr key={index} style={{ marginTop: "20px" }}>
                              <td
                                style={{
                                  textAlign: "center",
                                  fontWeight: 500,
                                  fontSize: "13px",
                                  fontFamily: "Gilroy",
                                  borderBottom: "1px solid #E8E8E8",
                                }}
                              >
                                {index + 1}
                              </td>
                              <td
                                style={{
                                  textAlign: "start",
                                  fontWeight: 500,
                                  fontSize: "13px",
                                  fontFamily: "Gilroy",
                                  paddingLeft: "20px",
                                  borderBottom: "1px solid #E8E8E8",
                                }}
                              >
                                {view.name}
                              </td>
                              <td
                                style={{
                                  textAlign: "start",
                                  borderBottom: "1px solid #E8E8E8",
                                }}
                              >
                                <span
                                  style={{
                                    backgroundColor: "#EBEBEB",
                                    paddingTop: "3px",
                                    paddingLeft: "10px",
                                    paddingRight: "10px",
                                    paddingBottom: "3px",
                                    borderRadius: "10px",
                                    lineHeight: "1.5em",
                                    margin: "0",
                                    fontSize: "11px",
                                    fontWeight: 500,
                                    fontFamily: "Gilroy",
                                    textAlign: "start",
                                  }}
                                >
                                  {formattedDate}
                                </span>
                              </td>
                              <td
                                style={{
                                  textAlign: "start",
                                  borderBottom: "1px solid #E8E8E8",
                                }}
                              >
                                <span
                                  style={{
                                    backgroundColor: "#EBEBEB",
                                    paddingTop: "3px",
                                    paddingLeft: "10px",
                                    paddingRight: "10px",
                                    paddingBottom: "3px",
                                    borderRadius: "10px",
                                    lineHeight: "1.5em",
                                    margin: "0",
                                    fontSize: "11px",
                                    fontWeight: 500,
                                    fontFamily: "Gilroy",
                                    textAlign: "start",
                                  }}
                                >
                                  {DueformattedDate}
                                </span>
                              </td>

                              <td
                                style={{
                                  textAlign: "start",
                                  borderBottom: "1px solid #E8E8E8",
                                }}
                              >
                                <span
                                  style={{
                                    color: "black",
                                    backgroundColor: "#D9FFD9",
                                    paddingLeft: "10px",
                                    paddingRight: "10px",
                                    fontSize: "11px",
                                    fontWeight: 500,
                                    borderRadius: "10px",
                                  }}
                                >
                                  {view.plan_status === 1
                                    ? "Active"
                                    : "Not Active"}
                                </span>
                              </td>

                              <td
                                onClick={() => handleDownloadPdf(view)}
                                style={{
                                  fontWeight: 500,
                                  fontSize: "13px",
                                  fontFamily: "Gilroy",
                                  textAlign: "start",
                                  borderBottom: "1px solid #E8E8E8",
                                }}
                              >
                                Download
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </div>
              )}

           
            </div>
          </div>
        )}
      </div>

      <div
        className="modal fade"
        id="changePlanModal"
        data-bs-backdrop="static"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Change Plan</h5>
              <CloseCircle
                size="24"
                color="#000"
                onClick={handleCloseCurrentPlan}
                style={{ cursor: "pointer" }}
              />
            </div>
            <div className="modal-body">
              <div className="row g-3">
                <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
                  <div
                    className={`card border position-relative ${
                      planType === "basic_smart"
                        ? "border-success"
                        : "border-secondary"
                    }`}
                    style={{
                      borderRadius: "14px",
                      backgroundColor: "#F8FAFC",
                      padding: "15px",
                    }}
                  >
                    <div className="card-body text-center">
                      {planType === "basic_smart" && (
                        <div className="position-relative text-center">
                          <span
                            className="badge bg-success position-absolute start-50 translate-middle"
                            style={{
                              top: "-30px",
                              padding: "5px 10px",
                              fontSize: "12px",
                            }}
                          >
                            Current Plan
                          </span>
                        </div>
                      )}
                      <h4 className="card-title">Basic Plan</h4>
                      <p>per agent/month billed annually</p>
                      <p className="fs-4 fw-bold pb-2 border-bottom">₹1</p>
                      <p className="fw-semibold text-start mt-3">
                        Team Plan Features:
                      </p>
                      <ul className="list-unstyled text-start px-3">
                        <li className="d-flex align-items-center gap-2 mb-2">
                          <i
                            className="bi bi-info-circle"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="This is a hover text that pops up when hovered on the icon"
                          ></i>{" "}
                          Paying Guest
                        </li>
                        <li
                          className="d-flex align-items-center gap-2 mb-2"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          <i
                            className="bi bi-info-circle"
                            data-bs-toggle="tooltipmanage"
                            data-bs-placement="top"
                            title="This is a hover text that pops up when hovered Manage"
                          ></i>{" "}
                          Manage Customers
                        </li>
                        <li className="d-flex align-items-center gap-2 mb-2">
                          <i
                            className="bi bi-info-circle"
                            data-bs-toggle="tooltipvendor"
                            data-bs-placement="top"
                            title="This is a hover text that pops up when hovered Vendor"
                          ></i>{" "}
                          Manage Vendors
                        </li>
                        <li
                          className="d-flex align-items-center gap-2 mb-3"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          <i
                            className="bi bi-info-circle"
                            data-bs-toggle="tooltipassets"
                            data-bs-placement="top"
                            title="This is a hover text that pops up when hovered assets"
                          ></i>{" "}
                          Asset Management
                        </li>
                      </ul>
                      {planType === "basic_smart" ? (
                        <button
                          className="btn btn-changeplan btn-success w-100 mt-3"
                          onClick={() => handlePlanChange(1)}
                        >
                          Current Plan
                        </button>
                      ) : (
                        <button
                          className="btn btn-changeplan btn-outline-primary w-100 mt-3"
                          onClick={() => handlePlanChange(1)}
                        >
                          Change Plan
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
                  <div
                    className={`card border position-relative ${
                      planType === "advance_prod"
                        ? "border-success"
                        : "border-secondary"
                    }`}
                    style={{
                      borderRadius: "14px",
                      backgroundColor: "#F8FAFC",
                      padding: "15px",
                    }}
                  >
                    <div className="card-body text-center">
             
                      {planType === "advance_prod" && (
                        <span
                          className="badge bg-success position-absolute start-50 translate-middle"
                          style={{
                            top: "-30px",
                            padding: "5px 10px",
                            fontSize: "12px",
                          }}
                        >
                          Current Plan
                        </span>
                      )}
                      <h4 className="card-title">Advance Plan</h4>
                      {/* <p className="mb-1">1 Month</p> */}
                      <p>per agent/month billed annually</p>
                      <p className="fs-4 fw-bold pb-2 border-bottom">₹2</p>
                      <p
                        className="fw-semibold text-start mt-3"
                        style={{ whiteSpace: "nowrap" }}
                      >
                        Professional Plan Features:
                      </p>
                      <ul className="list-unstyled text-start px-3">
                        <li className="d-flex align-items-center gap-2 mb-2">
                          <i
                            className="bi bi-info-circle"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="This is a hover text that pops up when hovered on the icon"
                          ></i>{" "}
                          Paying Guest
                        </li>
                        <li
                          className="d-flex align-items-center gap-2 mb-2"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          <i
                            className="bi bi-info-circle"
                            data-bs-toggle="tooltipmanage"
                            data-bs-placement="top"
                            title="This is a hover text that pops up when hovered Manage"
                          ></i>{" "}
                          Manage Customers
                        </li>
                        <li className="d-flex align-items-center gap-2 mb-2">
                          <i
                            className="bi bi-info-circle"
                            data-bs-toggle="tooltipvendor"
                            data-bs-placement="top"
                            title="This is a hover text that pops up when hovered Vendor"
                          ></i>{" "}
                          Manage Vendors
                        </li>
                        <li
                          className="d-flex align-items-center gap-2 mb-2"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          <i
                            className="bi bi-info-circle"
                            data-bs-toggle="tooltipassets"
                            data-bs-placement="top"
                            title="This is a hover text that pops up when hovered Assets"
                          ></i>{" "}
                          Asset Management
                        </li>
                      </ul>
                      <div>
                        {planType === "advance_prod" ? (
                          <button
                            className="btn btn-changeplan btn-success w-100 mt-3"
                            onClick={() => handlePlanChange(2)}
                          >
                            Current Plan
                          </button>
                        ) : (
                          <button
                            className="btn btn-changeplan btn-outline-primary w-100 mt-3"
                            onClick={() => handlePlanChange(2)}
                          >
                            Change Plan
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-12 col-sm-6 col-md-4 d-flex justify-content-center">
                  <div
                    className={`card border position-relative ${
                      planType === "smartstay_oneyear"
                        ? "border-success"
                        : "border-secondary"
                    }`}
                    style={{
                      borderRadius: "14px",
                      backgroundColor: "#F8FAFC",
                      padding: "15px",
                    }}
                  >
                    <div className="card-body text-center">
                      {planType === "smartstay_oneyear" && (
                        <span
                          className="badge bg-success position-absolute start-50 translate-middle"
                          style={{
                            top: "-30px",
                            padding: "5px 10px",
                            fontSize: "12px",
                          }}
                        >
                          Current Plan
                        </span>
                      )}

                      <h4 className="card-title">1 Year Plan</h4>
                      <p>per agent/month billed annually</p>
                      <p className="fs-4 fw-bold pb-2 border-bottom">₹999</p>
                      <p className="fw-semibold text-start mt-3">
                        Growth Plan Features:
                      </p>
                      <ul className="list-unstyled text-start px-3">
                        <li className="d-flex align-items-center gap-2 mb-2">
                          <i
                            className="bi bi-info-circle"
                            data-bs-toggle="tooltip"
                            data-bs-placement="top"
                            title="This is a hover text that pops up when hovered on the icon"
                          ></i>{" "}
                          Paying Guest
                        </li>
                        <li
                          className="d-flex align-items-center gap-2 mb-2"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          <i
                            className="bi bi-info-circle"
                            data-bs-toggle="tooltipmanage"
                            data-bs-placement="top"
                            title="This is a hover text that pops up when hovered manage"
                          ></i>{" "}
                          Manage Customers
                        </li>
                        <li className="d-flex align-items-center gap-2 mb-2">
                          <i
                            className="bi bi-info-circle"
                            data-bs-toggle="tooltipvendor"
                            data-bs-placement="top"
                            title="This is a hover text that pops up when hovered Vendor"
                          ></i>{" "}
                          Manage Vendors
                        </li>
                        <li
                          className="d-flex align-items-center gap-2 mb-2"
                          style={{ whiteSpace: "nowrap" }}
                        >
                          <i
                            className="bi bi-info-circle"
                            data-bs-toggle="tooltipassets"
                            data-bs-placement="top"
                            title="This is a hover text that pops up when hovered assets"
                          ></i>{" "}
                          Asset Management
                        </li>
                      </ul>
                      {planType === "smartstay_oneyear" ? (
                        <button
                          className="btn btn-changeplan btn-success w-100 mt-3"
                          onClick={() => handlePlanChange(999)}
                        >
                          Current Plan
                        </button>
                      ) : (
                        <button
                          className="btn btn-changeplan btn-outline-primary w-100 mt-3"
                          onClick={() => handlePlanChange(999)}
                        >
                          Change Plan
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <h4>
                {planType === "free_plan" || planType === null
                  ? "Your plan is free trial"
                  : ""}
              </h4>
            </div>
            {planType !== "free_plan" && planType !== null && (
              <div className="p-3">
                <div className="table-responsive border rounded">
                  <table
                    className="table mb-0 "
                    style={{    
                      width: "100%",
                    }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: "#e9f2ff" }}>
                        <th style={{}}>Total Hostel</th>
                        <th style={{}}>Plan Name</th>
                        <th style={{ textAlign: "center" }}>Plan Amount</th>
                        <th style={{ textAlign: "center" }}>Total Amount</th>
                        <th
                          style={{ textAlign: "center", whiteSpace: "nowrap" }}
                        >
                          Plan Start Date
                        </th>
                        <th
                          style={{ textAlign: "center", whiteSpace: "nowrap" }}
                        >
                          Plan End Date
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td style={{ textAlign: "center" }}>
                          {" "}
                          {getPlanActive[0]?.hostel_count}
                        </td>
                        <td>
                          {getPlanActive[0]?.plan_code === "one_day" &&
                            "Free Trail"}
                          {getPlanActive[0]?.plan_code === "basic_smart" &&
                            "Basic Plan"}
                          {getPlanActive[0]?.plan_code === "advance_prod" &&
                            "Advance PLan"}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          ₹ {getPlanActive[0]?.amount}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          ₹ {getPlanActive[0]?.amount}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {" "}
                          {new Date(
                            getPlanActive[0]?.plan_start
                          ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </td>
                        <td style={{ textAlign: "center" }}>
                          {" "}
                          {new Date(
                            getPlanActive[0]?.plan_end
                          ).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        show={plan}
        onHide={handleClosePlanChange}
        backdrop="static"
        centered
      >
        <Modal.Dialog
          style={{
            maxWidth: 666,
            paddingRight: "10px",
            borderRadius: "30px",
          }}
          className="m-0 p-0"
        >
          <Modal.Body style={{ marginTop: -30 }}>
            <div className="d-flex align-items-center">
              <div className="container">
                <div className="row mb-3"></div>

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
                    Manage Plan
                  </div>
                  <div style={{ paddingRight: 40 }}>
                    (
                    {planCode?.trim() === "basic_smart"
                      ? "1 Month Plan"
                      : planCode?.trim() === "advance_prod"
                      ? "3 Month Plan"
                      : 
                        planCode}{" "}
                    - Rs.{selectedPlan})
                  </div>

               
                  <CloseCircle
                    size="24"
                    color="#000"
                    onClick={handleClosePlanChange}
                    style={{ cursor: "pointer" }}
                  />
                </Modal.Header>

                <div className="row mb-3 change-plan-form">
                  <div className="col-lg-12 col-md-12 col-sm-11 col-xs-11 mb-3">
                    <Form.Group
                      className="mb-1"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Label
                        style={{
                          fontFamily: "Gilroy",
                          fontSize: 14,
                          fontWeight: 400,
                          color: "rgba(34, 34, 34, 1)",
                          fontStyle: "normal",
                          lineHeight: "normal",
                        }}
                      >
                        Select PG{" "}
                        <span
                          style={{
                            color: "red",
                            fontSize: "20px",
                          }}
                        >
                          {" "}
                          *{" "}
                        </span>
                      </Form.Label>

                      <Select
                        options={filteredOptions}
                        placeholder="Select Hostel"
                        value={null} // Always reset to placeholder
                        onChange={handleHostelSelect}
                        classNamePrefix="custom"
                        menuPlacement="auto"
                        styles={{
                          control: (base) => ({
                            ...base,
                            padding: "2px",
                            marginTop: "5px",
                            fontSize: "16px",
                            fontFamily: "Gilroy",
                            fontWeight: 400,
                            color: "rgba(34, 34, 34, 1)",
                            borderColor: "#ced4da",
                            minHeight: "40px",
                          }),
                        }}
                      />

                      {/* Tag Chips below */}
                      {selectedHostels.length > 0 && (
                        <div className="mt-3 d-flex flex-wrap gap-2">
                          {selectedHostels.map((hostel) => (
                            <div
                              key={hostel.value}
                              className="d-flex align-items-center px-3 py-1 rounded bg-white"
                              style={{
                                fontWeight: 400,
                                borderRadius: "8px",
                                border: "1px solid rgba(30, 69, 225, 1)",
                              }}
                            >
                              {hostel.label}
                              <img
                                className="ms-2"
                                src={DeleteIcon}
                                alt="delete"
                                height={14}
                                width={14}
                                onClick={() => handleRemoveHostel(hostel.value)}
                                style={{ cursor: "pointer" }}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </Form.Group>

                    {hostelError && (
                      <div style={{ color: "red" }}>
                        {" "}
                        <MdError
                          style={{
                            fontSize: "11px",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            marginRight: "5px",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "13px",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          {hostelError}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <Form.Group>
                      <Form.Label
                        style={{
                          fontSize: 14,
                          color: "#222222",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        Hostel Count{" "}
                        <span
                          style={{
                            color: "red",
                            fontSize: "20px",
                          }}
                        >
                          {" "}
                          *{" "}
                        </span>
                      </Form.Label>
                      <FormControl
                        id="form-controls"
                        placeholder="Enter Hostel Count"
                        type="text"
                        value={hostelCount}
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
                        }}
                      />
                    </Form.Group>
                    {hostelCountError && (
                      <div style={{ color: "red" }}>
                        {" "}
                        <MdError
                          style={{
                            fontSize: "11px",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            marginRight: "5px",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "13px",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          {hostelCountError}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                    <Form.Group>
                      <Form.Label
                        style={{
                          fontSize: 14,
                          color: "#222222",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        Payment{" "}
                        <span
                          style={{
                            color: "red",
                            fontSize: "20px",
                          }}
                        >
                          {" "}
                          *{" "}
                        </span>
                      </Form.Label>
                      <FormControl
                        type="text"
                        id="form-controls"
                        placeholder="Select Payment"
                        value={amount}
                        // onChange={(e) => handleLastName(e)}
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
                    {selectedPlanError && (
                      <div style={{ color: "red" }}>
                        {" "}
                        <MdError
                          style={{
                            fontSize: "12px",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            marginRight: "5px",
                          }}
                        />
                        <span
                          style={{
                            fontSize: "13px",
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                          }}
                        >
                          {selectedPlanError}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 cmt">
                    <Form.Group>
                      <Form.Label
                        style={{
                          fontSize: 14,
                          color: "#222222",
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                        }}
                      >
                        Comments{" "}
                      </Form.Label>
                      <FormControl
                        id="form-controls"
                        placeholder="Enter Comments"
                        type="text"
                      
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

                <Button
                  className="w-100 buy-now"
                  style={{
                    backgroundColor: "#1E45E1",
                    fontWeight: 600,
                    height: 50,
                    borderRadius: 12,
                    fontSize: 16,
                    fontFamily: "Montserrat",
                  }}
                  onClick={handleSubmit}
                >
                  Buy Now
                </Button>
              </div>
              {/* )} */}
            </div>
          </Modal.Body>

          <Modal.Footer style={{ border: "none" }}></Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  );
}
export default SettingSubscription;
