/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Call, House, } from "iconsax-react";
import Areaimage from "../../Assets/Images/area_icon.png";
import Landamrkimage from "../../Assets/Images/landmark.png";

function ParentsGuardian() {
  return (
    <div><div className="row p-0">
    
                                    <div className="col-sm-6 col-lg-6 d-flex flex-column align-items-start">
                                      <p style={{ fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>
                                        Guardian Full Name
                                      </p>
                                      <div className="d-flex align-items-center gap-2">
                                        <House size="18" color="#1E45E1" />
                                        <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>
    
                                        </span>
                                      </div>
                                    </div>
    
                                    <div className="col-sm-6 col-lg-6 d-flex flex-column align-items-start">
                                      <p style={{ fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>
                                        Relationship to Tenant
                                      </p>
                                      <div className="d-flex align-items-center gap-2">
                                        <img src={Areaimage} alt="area" style={{ width: 16, height: 16 }} />
                                        <span
                                          // title={CustomerOverView.address?.streetName}
                                          style={{
                                            fontSize: 14,
                                            fontWeight: 600,
                                            fontFamily: "Gilroy",
                                            whiteSpace: "nowrap",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            maxWidth: "200px",
                                          }}
                                        >
    
                                        </span>
                                      </div>
                                    </div>
                                  </div>
    
    
                                  <div className="row mt-3">
    
                                    <div className="col-sm-4 col-lg-6 d-flex flex-column align-items-start">
                                      <p style={{ fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>
                                        Guardian Occupation
                                      </p>
                                      <div className="d-flex align-items-center gap-2">
                                        <img src={Landamrkimage} alt="landmark" style={{ width: 16, height: 16 }} />
                                        <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>
    
                                        </span>
                                      </div>
                                    </div>
    
    
                                    <div className="col-sm-4 col-lg-6 d-flex flex-column align-items-start">
                                      <p style={{ fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>
                                        Mobile no.
                                      </p>
                                      <div className="d-flex align-items-center gap-2">
                                        <Call size="16" color="#1E45E1" />
                                        <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>
                                          {/* {CustomerOverView.address?.pincode} */}
                                        </span>
                                      </div>
                                    </div>
                                  </div></div>
  )
}

export default ParentsGuardian