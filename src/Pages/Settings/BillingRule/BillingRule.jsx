/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { BsShieldCheck, BsHourglassSplit } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import LongStayRecurringModal from "./LongStay";
import ShortStayRecurringModal from "./ShortStay";
import { useDispatch, useSelector } from "react-redux";
import { ArrowSwapHorizontal } from 'iconsax-react';
// import { FaCheck } from "react-icons/fa";
import { useHasPermission } from '../../../Utils/Permission';
import Emptystate from "../../../Assets/Images/Empty-State.jpg";
import ErrorMessage from '../../../Components/ErrorMessage';
// import "../../Pages/Settings/SettingsBills.css";
import withErrorBoundary from "../../../Hoc/WithErrorBountry";
import Form from 'react-bootstrap/Form';


function BillingRule() {


  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [recurringBills, setRecuringBills] = useState("");
  const [checked, setChecked] = useState(true);

  const [formLoading, setFormLoading] = useState(false)
  const [showShortStay, setShowShortStay] = useState(false);
  const [showLongStay, setShowLongStay] = useState(false);

  const handleShowLongStay = () => setShowLongStay(true);
  const handleCloseLongStay = () => {
    dispatch({ type: 'REMOVE_BILLING_RULE_ERROR' })
    setShowLongStay(false)
  }


  const handleShowShortStay = () => setShowShortStay(true);
  const handleCloseShortStay = () => setShowShortStay(false);

  // const canReadRecurring = useHasPermission("Recurring bills", "canRead")
  // const canWriteBills = useHasPermission("Recurring bills", "canWrite")


  const {
    canWriteModule: canWriteBills,
    canReadModule: canReadRecurring,
  } = useHasPermission("Bills");







  //  Future needed this function so don't delete this command line.............

  // const handleToggle = () => {
  //   setChecked(!checked);
  //   if (recurringBills) {
  //     dispatch({
  //       type: "SETTINGSADD_RECURRING",
  //       payload: {
  //         hostel_id: Number(state.login.selectedHostel_Id),
  //         billingDateOfMonth: recurringBills?.billingDateOfMonth,
  //         dueDateOfMonth: recurringBills?.dueDateOfMonth,
  //         isActive: 0,
  //         billFrequency:"Monthly"
  //       },
  //     })
  //   }
  // };

  useEffect(() => {
    if (state.Settings.SettingsRecurringAddSuccess === 200) {
      dispatch({ type: "SETTINGS_GET_RECURRING", payload: { hostelId: state.login.selectedHostel_Id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_SETTINGSADDRECURRING_STATUS_CODE" });
      }, 100);
    }
  }, [state.Settings.SettingsRecurringAddSuccess]);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({ type: "SETTINGS_GET_RECURRING", payload: { hostelId: state.login.selectedHostel_Id } });
      setFormLoading(false)
    }
  }, [state.login.selectedHostel_Id]);


  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'ACCESS_RESTRICTION_ERROR_REMOVE' })
      }, 1000)
    }

  }, [state.UsersList?.accessRestrictionError])
  useEffect(() => {
    if (state?.Settings?.settingsBillsggetRecurrSucesscode === 200) {
      setFormLoading(false)
      setRecuringBills(state?.Settings?.SettingsBillsGetRecurring)
      setTimeout(() => {
        dispatch({ type: "CLEAR_SETTINGSGETRECURRING_STATUS_CODE" });
      }, 1000);
    }
  }, [state?.Settings?.settingsBillsggetRecurrSucesscode])

  useEffect(() => {
    if (state.Settings?.RecurringOffStatusCode === 201) {
      setRecuringBills("")
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: "REMOVE_RECURRINGOFF" });
      }, 100);


    }

  }, [state.Settings?.RecurringOffStatusCode])




  useEffect(() => {
    if (recurringBills?.billStartDate) {
      setChecked(true)
    }

  }, [recurringBills?.billStartDate, state.login.selectedHostel_Id])




  return (
    <>
      <div className="sticky top-0 left-0 right-0 z-50 bg-white flex flex-col md:flex-row justify-between items-center min-h-[50px] px-1.5 whitespace-nowrap font-gilroy">
        <label className="text-black font-semibold text-[18px] font-gilroy whitespace-nowrap">
          Bills
        </label>

      </div>

      <div>
        {!canReadRecurring ? (
          <>
            <div className="flex flex-col items-center justify-center mt-24">
              <img src={Emptystate} alt="Empty State" />

              <ErrorMessage
                message={['You do not have access to view Billing Rule']}
                type="warning"
              />
            </div>
          </>
        ) : (
          // <Row className="g-3 overflow-hidden">
          //   <Col xs={12} md={6}>
          //     <Card
          //       style={{
          //         height: "100%",
          //         borderRadius: "12px",
          //         border: "1px solid #E6E6E6",
          //         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          //       }}
          //     >
          //       <Card.Body>
          //         <div
          //           style={{
          //             display: "flex",
          //             justifyContent: "space-between",
          //             alignItems: "start",
          //           }}
          //         >
          //           <div
          //             style={{
          //               backgroundColor: "#fff",
          //               borderRadius: 8,
          //               padding: "8px",
          //               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          //             }}
          //           >
          //             <BsShieldCheck size={24} color="#1E45E1" />
          //           </div>
          //           {recurringBills.billStartDate ? "" :
          //             <div
          //               style={{
          //                 color: "#D12929",
          //                 backgroundColor: "#FFEFEF",
          //                 borderRadius: 10,
          //                 padding: "5px 10px",
          //                 fontSize: 10,
          //                 fontFamily: "Gilroy"
          //               }}
          //             >
          //               Not Configure Yet
          //             </div>
          //           }
          //         </div>
          //         <Card.Title style={{ marginTop: "20px", fontWeight: 600, fontFamily: "Gilroy", fontSize: 18, color: "#222222" }}>
          //           Long Stay Recurring
          //         </Card.Title>
          //         <Card.Text style={{ color: "#6D6D6D", fontSize: 15, fontFamily: "Gilroy", marginBottom: 5 }}>
          //           Configure recurring billing for tenants staying long-term
          //         </Card.Text>
          //         {recurringBills.billStartDate && (
          //           <div
          //             className="recurring-details"
          //             style={{
          //               backgroundColor: "#F8F9FF",
          //               borderRadius: 10,
          //               padding: "10px 15px",
          //               marginTop: 10,
          //               fontFamily: "Gilroy",
          //             }}
          //           >
          //             <div
          //               className="d-flex justify-content-between mb-2"
          //               style={{ fontSize: 14, color: "#4B4B4B" }}
          //             >
          //               <span>Bill Start Date:</span>
          //               <span style={{ fontWeight: 600, color: "#1E45E1" }}>
          //                 {recurringBills.billStartDate}
          //               </span>
          //             </div>

          //             <div
          //               className="d-flex justify-content-between mb-2"
          //               style={{ fontSize: 14, color: "#4B4B4B" }}
          //             >
          //               <span>Bill Due Days:</span>
          //               <span style={{ fontWeight: 600, color: "#1E45E1" }}>
          //                 {recurringBills.billDueDate}
          //               </span>
          //             </div>

          //             <div
          //               className="d-flex justify-content-between mb-2"
          //               style={{ fontSize: 14, color: "#4B4B4B" }}
          //             >
          //               <span>Notice Period:</span>
          //               <span style={{ fontWeight: 600, color: "#1E45E1" }}>
          //                 {recurringBills.noticePeriod} days
          //               </span>
          //             </div>

          //             <div
          //               className="d-flex justify-content-between"
          //               style={{ fontSize: 14, color: "#4B4B4B" }}
          //             >
          //               <span>Starts From:</span>
          //               <span style={{ fontWeight: 600, color: "#1E45E1" }}>
          //                 {recurringBills.startsFrom || "—"}
          //               </span>
          //             </div>
          //           </div>
          //         )}

          //         {
          //           recurringBills.billStartDate ?

          //             <div className="d-flex justify-content-between p-0 align-items-center">
          //               <Button disabled={!canWriteBills}
          //                 onClick={handleShowLongStay}
          //                 style={{
          //                   marginTop: "10px",
          //                   fontSize: "14px",
          //                   padding: "6px 12px",
          //                   display: "flex",
          //                   alignItems: "center",
          //                   gap: "6px",
          //                   backgroundColor: "#1E45E1",
          //                   fontFamily: "Gilroy"
          //                 }}
          //               >
          //                 <ArrowSwapHorizontal size="20" color="#fff" /> Configure
          //               </Button>


          //               <Form.Check disabled
          //                 type="switch"
          //                 id="custom-switch"
          //                 label={checked ? "On" : "Off"}
          //                 checked={checked}
          //                 onChange={(e) => setChecked(e.target.checked)}
          //               />




          //             </div>
          //             :
          //             <Button
          //               disabled={!canWriteBills}
          //               onClick={handleShowLongStay}
          //               style={{
          //                 marginTop: "10px",
          //                 fontSize: "14px",
          //                 padding: "6px 12px",
          //                 display: "flex",
          //                 alignItems: "center",
          //                 gap: "6px",
          //                 backgroundColor: "#1E45E1",
          //                 fontFamily: "Gilroy"
          //               }}
          //             >
          //               <FiSettings /> Setup Now
          //             </Button>



          //         }


          //       </Card.Body>
          //     </Card>
          //   </Col>

          //   <Col xs={12} md={6}>
          //     <Card
          //       style={{
          //         height: "100%",
          //         borderRadius: "12px",
          //         border: "1px solid #E6E6E6",
          //         boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          //       }}
          //     >
          //       <Card.Body>
          //         <div
          //           style={{
          //             display: "flex",
          //             justifyContent: "space-between",
          //             alignItems: "start",
          //           }}
          //         >
          //           <div
          //             style={{
          //               backgroundColor: "#fff",
          //               borderRadius: 8,
          //               padding: "8px",
          //               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          //             }}
          //           >
          //             <BsHourglassSplit size={24} color="#1E45E1" />
          //           </div>
          //           <div
          //             style={{
          //               color: "#D12929",
          //               backgroundColor: "#FFEFEF",
          //               borderRadius: 10,
          //               padding: "5px 10px",
          //               fontSize: 10,
          //               fontFamily: "Gilroy"
          //             }}
          //           >
          //             Not Configure Yet
          //           </div>
          //         </div>
          //         <Card.Title style={{ marginTop: "20px", fontWeight: 600, fontFamily: "Gilroy", fontSize: 18, color: "#222222" }}>
          //           Short Stay Recurring
          //         </Card.Title>
          //         <Card.Text style={{ color: "#6D6D6D", fontSize: 15, fontFamily: "Gilroy", marginBottom: 5 }}>
          //           Set up one-time or daily billing for short-term tenants.
          //         </Card.Text>
          //         <Button
          //           disabled
          //           onClick={handleShowShortStay}
          //           style={{
          //             marginTop: "10px",
          //             fontSize: "14px",
          //             padding: "6px 12px",
          //             display: "flex",
          //             alignItems: "center",
          //             gap: "6px",
          //             backgroundColor: "#1E45E1",
          //             fontFamily: "Gilroy"
          //           }}
          //         >
          //           <FiSettings /> Coming Soon
          //         </Button>
          //       </Card.Body>
          //     </Card>
          //   </Col>
          // </Row>
          <div className="grid grid-cols-12 gap-3 overflow-hidden">

            <div className="col-span-12 md:col-span-6">
              <div className="h-full rounded-xl border border-gray-200 shadow-md bg-white">
                <div className="p-4">

                  <div className="flex justify-between items-start">
                    <div className="bg-white rounded-lg p-2 shadow-md">
                      <BsShieldCheck size={24} color="#1E45E1" />
                    </div>

                    {!recurringBills.billStartDate && (
                      <div className="text-red-600 bg-red-50 rounded-lg px-3 py-1 text-xs font-gilroy">
                        Not Configure Yet
                      </div>
                    )}
                  </div>

                  <div className="mt-3 mb-1 font-gilroy font-semibold text-lg text-gray-900">
                    Long Stay Recurring
                  </div>

                  <div className="text-gray-600 text-[15px] font-gilroy mb-1">
                    Configure recurring billing for tenants staying long-term
                  </div>

                  {recurringBills.billStartDate && (
                    <div className="mt-3 bg-indigo-50 rounded-lg p-3 font-gilroy text-sm text-gray-600">

                      <div className="flex justify-between mb-2">
                        <span>Bill Start Date:</span>
                        <span className="font-semibold text-blue-700">
                          {recurringBills.billStartDate}
                        </span>
                      </div>

                      <div className="flex justify-between mb-2">
                        <span>Bill Due Days:</span>
                        <span className="font-semibold text-blue-700">
                          {recurringBills.billDueDate}
                        </span>
                      </div>

                      <div className="flex justify-between mb-2">
                        <span>Notice Period:</span>
                        <span className="font-semibold text-blue-700">
                          {recurringBills.noticePeriod} days
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span>Starts From:</span>
                        <span className="font-semibold text-blue-700">
                          {recurringBills.startsFrom || "—"}
                        </span>
                      </div>
                    </div>
                  )}

                  {recurringBills.billStartDate ? (

                    <div className="flex justify-between items-center mt-3">
                      <button
                        disabled={!canWriteBills}
                        onClick={handleShowLongStay}
                        className="flex items-center gap-2 bg-blue-700 text-white text-sm px-3 py-1.5 rounded-lg font-gilroy"
                      >
                        <ArrowSwapHorizontal size={20} /> Configure
                      </button>

                      <div className="flex items-center">

                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                            disabled
                            className="sr-only peer"
                          />

                          <div className="w-8 h-4 bg-gray-300 rounded-full peer-checked:bg-blue-700 after:content-[''] after:absolute after:top-[2px] after:left-[1px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4 peer-disabled:opacity-50"></div>
                        </label>

                        <span className="text-sm font-gilroy leading-none ml-2">
                          {checked ? "On" : "Off"}
                        </span>
                      </div>
                    </div>

                  ) : (
                    <button
                      disabled={!canWriteBills}
                      onClick={handleShowLongStay}
                      className="mt-3 flex items-center gap-2 bg-blue-700 text-white text-sm px-3 py-1.5 rounded-lg font-gilroy"
                    >
                      <FiSettings /> Setup Now
                    </button>
                  )}

                </div>
              </div>
            </div>


            <div className="col-span-12 md:col-span-6">
              <div className="h-full rounded-xl border border-gray-200 shadow-md bg-white">
                <div className="p-4">

                  <div className="flex justify-between items-start">
                    <div className="bg-white rounded-lg p-2 shadow-md">
                      <BsHourglassSplit size={24} color="#1E45E1" />
                    </div>

                    <div className="text-red-600 bg-red-50 rounded-lg px-3 py-1 text-xs font-gilroy">
                      Not Configure Yet
                    </div>
                  </div>

                  <div className="mt-3 font-gilroy font-semibold text-lg text-gray-900">
                    Short Stay Recurring
                  </div>

                  <div className="text-gray-600 text-[15px] font-gilroy mb-1">
                    Set up one-time or daily billing for short-term tenants.
                  </div>

                  <button
                    disabled
                    className="mt-3 flex items-center gap-2 bg-blue-700 text-white text-sm px-3 py-1.5 rounded-lg font-gilroy opacity-60 cursor-not-allowed"
                  >
                    <FiSettings /> Coming Soon
                  </button>

                </div>
              </div>
            </div>

          </div>
        )
        }

      </div>



      {
        showLongStay && <LongStayRecurringModal handleClose={handleCloseLongStay} show={handleShowLongStay} />
      }
      {
        showShortStay && <ShortStayRecurringModal handleClose={handleCloseShortStay} show={handleShowShortStay} />
      }

      {formLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-transparent opacity-75">
          <div className="w-10 h-10 rounded-full border-4 border-transparent border-t-blue-700 animate-spin"></div>
        </div>
      )}


    </>
  );
}

export default withErrorBoundary(BillingRule);