import React, { useState, useEffect, useRef } from "react";
import upload from "../../Assets/Images/New_images/pdf@2x.png";

import docDown from "../../Assets/Images/New_images/downdoc.png";
import viewdoc from "../../Assets/Images/New_images/viewdoc.png";




function ManualDocumentsDetails({documents}) {


  return (
    <div> 
        {
        documents.map((doc, index) => (
                                          <div className="col-md-6 mt-2" key={index}>
                                            <div className="d-flex align-items-center justify-content-between border rounded p-3 bg-light">
    
                                              <div className="d-flex align-items-center">
                                                <img
                                                  src={upload}
                                                  alt="upload"
                                                  width={20}
                                                  height={20}
                                                  style={{ marginRight: "8px", cursor: "pointer" }}
                                                  onClick={() =>
                                                    document.getElementById(`fileUpload-${index}`).click()
                                                  }
                                                />
    
                                                <div>
                                                  <p
                                                    className="mb-0 fw-semibold small text-truncate"
                                                    style={{ maxWidth: "120px", fontFamily: "Gilroy" }}
                                                    title={doc.name}
                                                  >
                                                    {doc.name}
                                                  </p>
                                                  <small className="text-muted">
                                                    {doc.size} • {doc.type}
                                                  </small>
                                                </div>
                                              </div>
    
    
                                              <div className="d-flex gap-2">
                                                <img src={viewdoc} alt="viewdoc" />
                                                <img src={docDown} alt="docDown" />
                                              </div>
                                            </div>
    
                                          </div>
                                        ))}</div>
  )
}

export default ManualDocumentsDetails