/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { BsShieldCheck, BsHourglassSplit } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import LongStayRecurringModal from "./LongStay";
import ShortStayRecurringModal from "./ShortStay";
import { useDispatch, useSelector } from "react-redux";
import { ArrowSwapHorizontal } from 'iconsax-react';
import { FaCheck } from "react-icons/fa";


function BillingRule() {


  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [recurringBills, setRecuringBills] = useState("");
  const [checked, setChecked] = useState(true);

  const [formLoading, setFormLoading] = useState(true)
  const [showShortStay, setShowShortStay] = useState(false);
  const [showLongStay, setShowLongStay] = useState(false);

  const handleShowLongStay = () => setShowLongStay(true);
  const handleCloseLongStay = () => setShowLongStay(false);

  const handleShowShortStay = () => setShowShortStay(true);
  const handleCloseShortStay = () => setShowShortStay(false);



  const handleToggle = () => {
    setChecked(!checked);
    if (recurringBills) {
      dispatch({
        type: "SETTINGSADD_RECURRING",
        payload: {
          hostel_id: Number(state.login.selectedHostel_Id),
          billingDateOfMonth: recurringBills?.billingDateOfMonth,
          dueDateOfMonth: recurringBills?.dueDateOfMonth,
          isActive: 0,
          billFrequency:"Monthly"
        },
      })
    }
  };

  useEffect(() => {
    if (state.Settings.SettingsRecurringAddSuccess === 200) {
      dispatch({ type: "SETTINGS_GET_RECURRING", payload: { hostel_id: state.login.selectedHostel_Id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_SETTINGSADDRECURRING_STATUS_CODE" });
      }, 100);
    }
  }, [state.Settings.SettingsRecurringAddSuccess]);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({ type: "SETTINGS_GET_RECURRING", payload: { hostel_id: state.login.selectedHostel_Id } });
    }
  }, [state.login.selectedHostel_Id]);



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
    if (recurringBills.isActive === 1) {
      setChecked(true)
    }

  }, [recurringBills.isActive, state.login.selectedHostel_Id])





  return (
    <div style={{ position: "relative" }}>
      <div
        className="d-flex justify-content-start align-items-center"
        style={{
          position: "sticky",
          top: 0,
          right: 0,
          left: 0,
          zIndex: 1000,
          backgroundColor: "#FFFFFF",
          minHeight: 73,
          whiteSpace: "nowrap",
          paddingRight: 10,
        }}
      >
        <div style={{ position: "fixed", backgroundColor: "white" }}>
          <h3
            style={{
              fontFamily: "Gilroy",
              fontSize: 20,
              color: "#222",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            Bills
          </h3>
        </div>
      </div>

      <div >
        <Row className="g-3">
          <Col xs={12} md={6}>
            <Card
              style={{
                height: "100%",
                borderRadius: "12px",
                border: "1px solid #E6E6E6",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Card.Body>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: 8,
                      padding: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <BsShieldCheck size={24} color="#1E45E1" />
                  </div>
                  {recurringBills.isActive === 1 ? "" :
                    <div
                      style={{
                        color: "#D12929",
                        backgroundColor: "#FFEFEF",
                        borderRadius: 10,
                        padding: "5px 10px",
                        fontSize: 10,
                        fontFamily: "Gilroy"
                      }}
                    >
                      Not Configure Yet
                    </div>
                  }
                </div>
                <Card.Title style={{ marginTop: "20px", fontWeight: 600, fontFamily: "Gilroy", fontSize: 18, color: "#222222" }}>
                  Long Stay Recurring
                </Card.Title>
                <Card.Text style={{ color: "#6D6D6D", fontSize: 15, fontFamily: "Gilroy", marginBottom: 5 }}>
                  Configure recurring billing for tenants staying long-term
                </Card.Text>

                {
                  recurringBills.isActive === 1 ?

                    <div className="d-flex justify-content-between p-0 align-items-center">
                      <Button
                        disabled
                        style={{
                          marginTop: "10px",
                          fontSize: "14px",
                          padding: "6px 12px",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          backgroundColor: "#1E45E1",
                          fontFamily: "Gilroy"
                        }}
                      >
                        <ArrowSwapHorizontal size="20" color="#fff" /> Configure
                      </Button>


                      <div className="custom-toggle-wrapper"
                        // onClick={handleToggle}
                      >
                        <span className={`custom-toggle-label ${checked ? "active" : ""}`}>
                          {checked ? "On" : "Off"}
                        </span>
                        <div className={`custom-toggle-switch ${checked ? "on" : "off"}`}>
                          <div className="custom-toggle-thumb">
                            {checked && <FaCheck size={10} color="#1E1E1E" />}
                          </div>
                        </div>
                      </div>



                    </div>
                    :
                    <Button
                      onClick={handleShowLongStay}
                      style={{
                        marginTop: "10px",
                        fontSize: "14px",
                        padding: "6px 12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        backgroundColor: "#1E45E1",
                        fontFamily: "Gilroy"
                      }}
                    >
                      <FiSettings /> Setup Now
                    </Button>



                }


              </Card.Body>
            </Card>
          </Col>

          <Col xs={12} md={6}>
            <Card
              style={{
                height: "100%",
                borderRadius: "12px",
                border: "1px solid #E6E6E6",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              <Card.Body>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#fff",
                      borderRadius: 8,
                      padding: "8px",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <BsHourglassSplit size={24} color="#1E45E1" />
                  </div>
                  <div
                    style={{
                      color: "#D12929",
                      backgroundColor: "#FFEFEF",
                      borderRadius: 10,
                      padding: "5px 10px",
                      fontSize: 10,
                      fontFamily: "Gilroy"
                    }}
                  >
                    Not Configure Yet
                  </div>
                </div>
                <Card.Title style={{ marginTop: "20px", fontWeight: 600, fontFamily: "Gilroy", fontSize: 18, color: "#222222" }}>
                  Short Stay Recurring
                </Card.Title>
                <Card.Text style={{ color: "#6D6D6D", fontSize: 15, fontFamily: "Gilroy", marginBottom: 5 }}>
                  Set up one-time or daily billing for short-term tenants.
                </Card.Text>
                <Button
                  disabled
                  onClick={handleShowShortStay}
                  style={{
                    marginTop: "10px",
                    fontSize: "14px",
                    padding: "6px 12px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    backgroundColor: "#1E45E1",
                    fontFamily: "Gilroy"
                  }}
                >
                  <FiSettings /> Coming Soon
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>




      </div>



      {
        showLongStay && <LongStayRecurringModal handleClose={handleCloseLongStay} show={handleShowLongStay} />
      }
      {
        showShortStay && <ShortStayRecurringModal handleClose={handleCloseShortStay} show={handleShowShortStay} />
      }



      {formLoading &&
        <div
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
        </div>
      }


    </div>
  );
}

export default BillingRule