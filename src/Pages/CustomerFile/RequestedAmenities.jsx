/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect,  } from "react";
import {ArchiveAdd, TickCircle, MinusCirlce } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import { Button,} from "react-bootstrap";


function RequestedAmenities() {

  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [CustomerOverView, setCustomerOverView] = useState([]);
  const [addamenityShow, setaddamenityShow] = useState(false);

  useEffect(() => {
    if (state.UsersList?.customerdetails?.requestedAmenities) {
      setCustomerOverView(state.UsersList.customerdetails.requestedAmenities);
    } else {
      setCustomerOverView([]);
    }
  }, [state.UsersList?.customerdetails?.requestedAmenities]);


  const assignedAmenities = state.UsersList?.customerdetails?.assignedAmenities || [];


 const handleShowAssignAmenities = (item) =>{
  console.log("itemmmm",item)
  
 }


  return (
    <div>
    
      <label
        className="fw-semibold"
        style={{
          fontSize: 16,
          lineHeight: "40px",
          fontFamily: "Gilroy"
        }}
      >
        Requested Amenities
      </label>


      {CustomerOverView?.length > 0 ? (
        CustomerOverView.map((item, index) => {
          const isAssigned = assignedAmenities?.some(
            (a) => a.amenityId === item.amenityId
          );
          return (
            <div className="row mb-3" key={item.amenityId || index}>
              <div className="col-lg-12">
                <div
                  className="card"
                  style={{
                    borderRadius: "14px",
                    border: "1px solid #EFF2FF",
                    padding: 8,
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        style={{
                          backgroundColor: "#FF99000D",
                          padding: 8,
                          borderRadius: 8,
                        }}
                      >
                        <ArchiveAdd size="32" variant="Bold" color="#FF9900" />
                      </div>

                      <div>
                        <div>
                          <span
                            className="d-flex align-items-center"
                            style={{
                              fontFamily: "Gilroy",
                              fontWeight: 600,
                              fontSize: 16,
                              color: "#222",
                            }}
                          >
                            {item.amenityName}
                          </span>
                        </div>

                        <div>
                          <span
                            className="d-flex align-items-center"
                            style={{
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                              fontSize: 14,
                              color: "#4B4B4B",
                            }}
                          >
                            ₹{item.price}/{item.type === "Monthly" ? "m" : item.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="d-flex gap-2">
                      <Button disabled={isAssigned}  onClick={()=>handleShowAssignAmenities(item)}
                        style={{
                          backgroundColor: "#0BA82F",
                          borderColor: "#0BA82F",
                          borderRadius: "10px",
                          padding: "6px 20px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "15px",
                        }}
                      >
                        <TickCircle size="20" color="#fff" variant="Bold" />
                        Approve
                      </Button>

                      <Button
                        style={{
                          backgroundColor: "#D93025",
                          borderColor: "#D93025",
                          borderRadius: "10px",
                          padding: "6px 20px",
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "15px",
                        }}
                      >
                        <MinusCirlce size="20" color="#fff" variant="Bold" />
                        Deny
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      ) : (
        <div className="d-flex align-items-center justify-content-center">
          <label style={{
            fontFamily: "Gilroy",
            fontWeight: 500,
            fontSize: 14,
            color: "#4B4B4B"
          }}> No Requested Amenities</label>

        </div>
      )}



    </div>
  )
}

export default RequestedAmenities