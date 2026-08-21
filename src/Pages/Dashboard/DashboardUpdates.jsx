import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ComingSoon from "../../Utils/ComingSoon";

function DashboardUpdates() {
  return (
    <div>
      {/* <div className="col-lg-7 mb-4">
          <div className="card-body">




            {updates.map((update, index) => (
              <div key={index} className="position-relative mb-4">
                <div className="d-flex">
                  
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        width: "8px",
                        height: "8px",
                        backgroundColor: "#1E45E1",
                        borderRadius: "50%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                      }}
                    ></div>
                    {index < updates.length - 1 && (
                      <div
                        style={{
                          position: "absolute",
                          top: "8px",
                          left: "3.5px",
                          width: "1px",
                          height: "100%",
                          backgroundColor: "#DCDCDC",
                        }}
                      ></div>
                    )}
                  </div>


                  <div style={{ marginLeft: "20px" }}>
                    <p
                      style={{
                        fontSize: 12,
                        fontWeight: 500,
                        fontFamily: "Gilroy, sans-serif",
                        marginBottom: "5px",
                      }}
                    >
                      {update.date}
                    </p>
                    <p
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        fontFamily: "Gilroy, sans-serif",
                        marginBottom: "5px",
                      }}
                    >
                      {update.title}
                    </p>
                    <p
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        fontFamily: "Gilroy, sans-serif",
                        marginBottom: "5px",
                      }}
                    >
                      {update.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

      <ComingSoon />
    </div>
  );
}

export default DashboardUpdates;
