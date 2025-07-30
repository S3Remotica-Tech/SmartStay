import React,{useState} from "react";
import { Card, Button, Row, Col, Badge } from "react-bootstrap";
import { BsShieldCheck, BsHourglassSplit } from "react-icons/bs"; 
import { FiSettings } from "react-icons/fi";
import LongStayRecurringModal from "./LongStay";
import ShortStayRecurringModal from "./ShortStay";

function BillingRule() {






 const [showLongStay, setShowLongStay] = useState(false);

  const handleShowLongStay = () => setShowLongStay(true);
  const handleCloseLongStay = () => setShowLongStay(false);


const [showShortStay, setShowShortStay] = useState(false);

  const handleShowShortStay = () => setShowShortStay(true);
  const handleCloseShortStay = () => setShowShortStay(false);





  return (
    <>
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
      <Row className="g-4">
               <Col xs={12} md={6}>
          <Card
            style={{
              height: "100%",
              borderRadius: "12px",
             border:"1px solid #E6E6E6",
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
                <div
                                  style={{
                    color: "#D12929",
                    backgroundColor: "#FFEFEF",
                    borderRadius: 10,
                    padding: "5px 10px",
                    fontSize: 10,
                    fontFamily:"Gilroy"
                  }}
                >
                  Not Configure Yet
                </div>
              </div>
              <Card.Title style={{ marginTop: "20px", fontWeight: 600, fontFamily:"Gilroy", fontSize:18, color:"#222222" }}>
                Long Stay Recurring
              </Card.Title>
              <Card.Text style={{ color: "#6D6D6D", fontSize: 15, fontFamily:"Gilroy", }}>
                Configure recurring billing for tenants staying long-term
              </Card.Text>
              <Button
                onClick={handleShowLongStay}
                style={{
                  marginTop: "10px",
                  fontSize: "14px",
                  padding: "6px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor:"#1E45E1",
                   fontFamily:"Gilroy"
                }}
              >
                <FiSettings /> Setup Now
              </Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6}>
          <Card
            style={{
              height: "100%",
              borderRadius: "12px",
              border:"1px solid #E6E6E6",
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
                    fontFamily:"Gilroy"
                  }}
                >
                  Not Configure Yet
                </div>
              </div>
              <Card.Title style={{ marginTop: "20px", fontWeight: 600, fontFamily:"Gilroy", fontSize:18, color:"#222222" }}>
                Short Stay Recurring
              </Card.Title>
              <Card.Text style={{ color: "#6D6D6D", fontSize: 15, fontFamily:"Gilroy", }}>
                Set up one-time or daily billing for short-term tenants.
              </Card.Text>
               <Button
                onClick={handleShowShortStay}
                style={{
                  marginTop: "10px",
                  fontSize: "14px",
                  padding: "6px 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  backgroundColor:"#1E45E1",
                   fontFamily:"Gilroy"
                }}
              >
                <FiSettings /> Setup Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>



{
  showLongStay  && <LongStayRecurringModal  handleClose={handleCloseLongStay} show={handleShowLongStay}/>
}
{
  showShortStay  && <ShortStayRecurringModal handleClose={handleCloseShortStay} show={handleShowShortStay}/>
}




    </>
  );
}

export default BillingRule