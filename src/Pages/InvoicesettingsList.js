/* eslint-disable react-hooks/exhaustive-deps */ 
import React, {  useEffect } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";


const InvoiceSettingsList = (props) => {

  const dispatch = useDispatch();

  
  const handleToggle = () => {
    const newChecked = !props.isChecked;
    props.setIsChecked(newChecked);

    if (newChecked) {
        props.handleRecurringFormShow();
    } else {
        // Directly update state to reset API call
        dispatch({
            type: 'SETTINGSADDRECURRING',
            payload: {
                type: "invoice",
                recure: 0,
                hostel_id: Number(props.item.id),
                start_date: '0',
                end_date: '0',
            },
        });
    }
};

useEffect(() => {
    if (!props.recurringform && !props.formFilled) {
        props.setIsChecked(false); // Reset toggle only if no data was entered
    }
}, [props.recurringform]);
    


  useEffect(() => {
    const appearOptions = {
      threshold: 0.5,
    };
    const faders = document.querySelectorAll(".fade-in");
    const appearOnScro1l = new IntersectionObserver(function (
      entries
    ) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        } else {
          entry.target.classList.add("appear");
          appearOnScro1l.unobserve(entry.target);
        }
      });
    },
    appearOptions);
    faders.forEach((fader) => {
      appearOnScro1l.observe(fader);
    });
  });

  

  

  return (
    <>
  {/* <div className="w-100" style={{ display: "flex", justifyContent: "flex-start" }}>
  <div className="w-100" style={{ maxWidth: "600px" }}> */}
      <Card
        className="h-100  fade-in mb-4"
        style={{
          borderRadius: 16,
          border: "1px solid #E6E6E6",
          width: "600px",
          // maxWidth: "600px", 
          // Width: "100%",
        }}
      >
        <Card.Body style={{ padding: 20 }}>
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
                Invoice Information
              </label>
            </div>

           
          </div>
          <hr style={{ border: "1px solid #E7E7E7" }} />

          <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
            <div className="mb-2">
              <div className="mb-1">
                <label
                  style={{
                    color: "#939393",
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  Invoice Number
                </label>
              </div>
              <div>
                <label
                  style={{
                    color: "#222222",
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  {props.item.prefix}{props.item.suffix}
                </label>
              </div>
            </div>

            <div className="mb-2 me-5" style={{paddingRight:25}}>
              <div className="mb-1">
                <label
                  style={{color: "#939393",fontSize: 14,fontWeight: 500,fontFamily: "Gilroy",fontStyle: "normal",lineHeight: "normal"}}>
                  Invoice Date      
                </label>
              </div>
              <div>
                <label
                  style={{ color: "#222222", fontSize: 16, fontWeight: 600, fontFamily: "Gilroy", fontStyle: "normal", lineHeight: "normal"}}>
                  {props.item.inv_date}
                </label>
              </div>
            </div>

            <div className="mb-2 me-5" style={{paddingRight:25}}>
              <div className="mb-1">
                <label style={{ color: "#939393", fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", fontStyle: "normal", lineHeight: "normal"}}>
                  Due Date
                </label>
              </div>
              <div>
                <label
                  style={{ color: "#222222", fontSize: 16, fontWeight: 600, fontFamily: "Gilroy", fontStyle: "normal", lineHeight: "normal"}}>
                     {props.item.due_date}
                </label>
              </div>
            </div>
          </div>

          <div>
        <label style={{ color: "#939393", fontSize: 14, fontWeight: 500 }}>
            Recurring
        </label>
        <Form.Check
            type="switch"
            id={`custom-switch-${props.isChecked}`}
            label="Recurring"
            className="custom-switch-pointer"
            checked={props.isChecked}
            onChange={handleToggle}
        />
          <style>
                                    {`
                                      .custom-switch-pointer input[type="checkbox"],
                                      .custom-switch-pointer label {
                                        cursor: pointer !important;
                                      }
                                    `}
                                  </style>
    </div>
          <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap mt-3">
            <div className="mb-2">
              <div className="mb-1">
                <label
                  style={{
                    color: "#939393",
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  Calculation Type
                </label>
              </div>
              <div>
                <label
                  style={{
                    color: "#222222",
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  Monthly
                </label>
              </div>
            </div>

            <div className="mb-2">
              <div className="mb-1 me-1">
                <label
                  style={{
                    color: "#939393",
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  {" "}
                  Calculation Start Date
                </label>
              </div>
              <div>
                <label
                  style={{
                    color: "#222222",
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >

                  {props.item.inv_startdate}
                </label>
              </div>
            </div>

            <div className="mb-2">
              <div className="mb-1">
                <label
                  style={{
                    color: "#939393",
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                  Calculation End Date
                </label>
              </div>
              <div>
                <label
                  style={{
                    color: "#222222",
                    fontSize: 16,
                    fontWeight: 600,
                    fontFamily: "Gilroy",
                    fontStyle: "normal",
                    lineHeight: "normal",
                  }}
                >
                     {props.item.inv_enddate}
                </label>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>
     {/* </div>
     </div> */}
    </>
  );
};

InvoiceSettingsList.propTypes = {
  item: PropTypes.func.isRequired,
  isChecked: PropTypes.func.isRequired,
  OnEditInvoice: PropTypes.func.isRequired,
  recurringform: PropTypes.func.isRequired,
  setIsChecked: PropTypes.func.isRequired,
  formFilled: PropTypes.func.isRequired,
  handleRecurringFormShow: PropTypes.func.isRequired,
};

export default InvoiceSettingsList;
