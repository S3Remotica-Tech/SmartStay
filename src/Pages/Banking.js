import Filters from "../Assets/Images/Filters.svg";
import searchteam from "../Assets/Images/New_images/Search Team.png";
import closecircle from "../Assets/Images/New_images/close-circle.png";
import React, { useState, useEffect, useRef } from "react";
import Image from "react-bootstrap/Image";
import { Button, Offcanvas, Form, FormControl } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { borderRadius } from "@mui/system";
import more from "../Assets/Images/New_images/more (1).png";
import { Dropdown, Table } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import squre from "../Assets/Images/New_images/minus-square.png";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

function Banking() {
  const [search, setSearch] = useState(false);

  const handleSearch = () => {
    setSearch(!search);
    // setFilterStatus(false);
  };
  const handleCloseSearch = () => {
    setSearch(false);
    // setFilterInput("")
  };
  return (
    <div style={{ padding: 10, marginLeft: 10 }}>
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <div>
          <label
            style={{ fontSize: 18, fontFamily: "Gilroy", fontWeight: 600 }}
          >
            Banking
          </label>
        </div>

        <div className="d-flex  justify-content-between align-items-center flex-wrap flex-md-nowrap">
          {search ? (
            <>
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  marginRight: 20,
                }}
              >
                <div
                  style={{
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    marginTop: "10px",
                    marginBottom: "10px",
                  }}
                >
                  <Image
                    src={searchteam}
                    alt="Search"
                    style={{
                      position: "absolute",
                      left: "10px",
                      width: "24px",
                      height: "24px",
                      pointerEvents: "none",
                    }}
                  />
                  <div className="input-group" style={{ marginRight: 20 }}>
                    <span className="input-group-text bg-white border-end-0">
                      <Image
                        src={searchteam}
                        style={{ height: 20, width: 20 }}
                      />
                    </span>
                    <input
                      type="text"
                      className="form-control border-start-0"
                      placeholder="Search"
                      aria-label="Search"
                      style={{
                        boxShadow: "none",
                        outline: "none",
                        borderColor: "rgb(207,213,219)",
                        borderRight: "none",
                      }}
                      //   value={filterInput}
                      //   onChange={(e) => handlefilterInput(e)}
                    />
                    <span className="input-group-text bg-white border-start-0">
                      <img
                        src={closecircle}
                        onClick={handleCloseSearch}
                        style={{ height: 20, width: 20 }}
                      />
                    </span>
                  </div>
                </div>

                {/* {isDropdownVisible && filteredUsers?.length > 0 && (
                      <div
                        style={{
                          border: "1px solid #d9d9d9 ",
                          position: "absolute",
                          top: 60,
                          left: 0,
                          zIndex: 1000,
                          padding: 10,
                          borderRadius: 8,
                          backgroundColor: "#fff",
                          width: "94%",
                        }}
                      >
                        <ul
                          className="show-scroll p-0"
                          style={{
                            backgroundColor: "#fff",
                            borderRadius: "4px",
                            // maxHeight: 174,
                            maxHeight:
                              filteredUsers?.length > 1 ? "174px" : "auto",
                            minHeight: 100,
                            overflowY:
                              filteredUsers?.length > 1 ? "auto" : "hidden",

                            margin: "0",
                            listStyleType: "none",
                            borderRadius: 8,
                            boxSizing: "border-box",
                          }}
                        >
                          {filteredUsers?.map((user, index) => {
                            const imagedrop = user.profile || Profile;
                            return (
                              <li
                                key={index}
                                className="list-group-item d-flex align-items-center"
                                style={{
                                  cursor: "pointer",
                                  padding: "10px 5px",
                                  borderBottom:
                                    index !== filteredUsers.length - 1
                                      ? "1px solid #eee"
                                      : "none",
                                }}
                                onClick={() => handleUserSelect(user)}
                              >
                                <Image
                                  src={imagedrop}
                                  alt={user.Name || "Default Profile"}
                                  roundedCircle
                                  style={{
                                    height: "30px",
                                    width: "30px",
                                    marginRight: "10px",
                                  }}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = Profile;
                                  }}
                                />
                               
                                <span>{ user.Name }</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    )} */}
              </div>
            </>
          ) : (
            <>
              <div className="me-3">
                <Image
                  src={searchteam}
                  roundedCircle
                  style={{ height: "24px", width: "24px" }}
                  onClick={handleSearch}
                />
              </div>
            </>
          )}

          <div className="me-3">
            <Image
              src={Filters}
              roundedCircle
              style={{ height: "50px", width: "50px" }}
              onClick={handleSearch}
            />
          </div>

          {/* <BsSearch class=" me-4" onClick={handleiconshow} /> 
        
            <div className='me-3'>
              <Image src={Filter} roundedCircle style={{ height: "30px", width: "30px" }} onClick={handleFiltershow} />
            </div> */}

          <div>
            <Button
              // onClick={handleShow}
              style={{
                fontSize: 14,
                backgroundColor: "#1E45E1",
                color: "white",
                height: 52,
                fontWeight: 600,
                borderRadius: 12,
                width: 123,
                padding: "16px, 24px, 16px, 24px",
                color: "#FFF",
                fontFamily: "Gilroy",
              }}
            >
              {" "}
              + Add Bank
            </Button>
          </div>
        </div>
      </div>
      {/* {filterInput && (
        <div  className='container ms-4 mb-4'   style={{ marginTop: '20px', fontWeight: 600, fontSize: 16 }}>
          {filteredUsers.length > 0 ? (
            <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(100, 100, 100, 1)" }}>
              {filteredUsers.length} result{filteredUsers.length > 1 ? 's' : ''} found for <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(34, 34, 34, 1)" }}>"{filterInput}"</span>
            </span>
          ) : (
            <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(100, 100, 100, 1)" }}>No results found for <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(34, 34, 34, 1)" }}>"{filterInput}"</span></span>
          )}
        </div>
      )} */}

      <div className="d-flex overflow-auto ">
        <div
          className="card mx-2"
          style={{
            minWidth: "280px",
            borderRadius: "12px",
            overflow: "hidden",
            height: 187,
          }}
        >
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p
                  className="mb-0"
                  style={{
                    fontSize: 14,
                    fontFamily: "Gilroy",
                    fontWeight: 600,
                  }}
                >
                  HSBC BANK
                </p>
                <p
                  className="text-muted mb-0"
                  style={{
                    fontSize: 12,
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                    color: "#4B4B4B",
                  }}
                >
                  Savings A/C
                </p>
              </div>
              <img src={more} width={20} height={20} />
            </div>
            <p
              className="mt-3"
              style={{ fontSize: 20, fontFamily: "Gilroy", fontWeight: 500 }}
            >
              4561 2013 6210 6540
            </p>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <p
                className="text-muted mb-0"
                style={{
                  fontSize: 14,
                  fontFamily: "Gilroy",
                  fontWeight: 600,
                  color: "#4B4B4B",
                }}
              >
                Default A/C
              </p>
              <a
                href="#"
                className="text-primary"
                style={{
                  textAlign: "end",
                  fontSize: 14,
                  fontFamily: "Gilroy",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Change
              </a>
            </div>
          </div>
          <div
            className="card-footer d-flex justify-content-between align-items-center"
            style={{ backgroundColor: "#E7F1FF", marginTop: "-20px" }}
          >
            <span
              style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 600 }}
            >
              Balance
            </span>
            <a
              href="#"
              className="text-primary"
              style={{
                fontSize: 14,
                fontFamily: "Gilroy",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              + Add Balance
            </a>
          </div>
        </div>

        <div
          className="card mx-2"
          style={{
            minWidth: "280px",
            borderRadius: "12px",
            overflow: "hidden",
            height: 187,
          }}
        >
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p
                  className="mb-0"
                  style={{
                    fontSize: 14,
                    fontFamily: "Gilroy",
                    fontWeight: 600,
                  }}
                >
                  HSBC BANK
                </p>
                <p
                  className="text-muted mb-0"
                  style={{
                    fontSize: 12,
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                    color: "#4B4B4B",
                  }}
                >
                  Savings A/C
                </p>
              </div>
              <img src={more} width={20} height={20} />
            </div>
            <p
              className="mt-3"
              style={{ fontSize: 20, fontFamily: "Gilroy", fontWeight: 500 }}
            >
              4561 2013 6210 6540
            </p>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <p
                className="text-muted mb-0"
                style={{
                  fontSize: 14,
                  fontFamily: "Gilroy",
                  fontWeight: 600,
                  color: "#4B4B4B",
                }}
              >
                Default A/C
              </p>
              <a
                href="#"
                className="text-primary"
                style={{
                  textAlign: "end",
                  fontSize: 14,
                  fontFamily: "Gilroy",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Change
              </a>
            </div>
          </div>
          <div
            className="card-footer d-flex justify-content-between align-items-center"
            style={{ backgroundColor: "#E7F1FF", marginTop: "-20px" }}
          >
            <span
              style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 600 }}
            >
              Balance
            </span>
            <a
              href="#"
              className="text-primary"
              style={{
                fontSize: 14,
                fontFamily: "Gilroy",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              + Add Balance
            </a>
          </div>
        </div>
        <div
          className="card mx-2"
          style={{
            minWidth: "280px",
            borderRadius: "12px",
            overflow: "hidden",
            height: 187,
          }}
        >
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p
                  className="mb-0"
                  style={{
                    fontSize: 14,
                    fontFamily: "Gilroy",
                    fontWeight: 600,
                  }}
                >
                  HSBC BANK
                </p>
                <p
                  className="text-muted mb-0"
                  style={{
                    fontSize: 12,
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                    color: "#4B4B4B",
                  }}
                >
                  Savings A/C
                </p>
              </div>
              <img src={more} width={20} height={20} />
            </div>
            <p
              className="mt-3"
              style={{ fontSize: 20, fontFamily: "Gilroy", fontWeight: 500 }}
            >
              4561 2013 6210 6540
            </p>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <p
                className="text-muted mb-0"
                style={{
                  fontSize: 14,
                  fontFamily: "Gilroy",
                  fontWeight: 600,
                  color: "#4B4B4B",
                }}
              >
                Default A/C
              </p>
              <a
                href="#"
                className="text-primary"
                style={{
                  textAlign: "end",
                  fontSize: 14,
                  fontFamily: "Gilroy",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Change
              </a>
            </div>
          </div>
          <div
            className="card-footer d-flex justify-content-between align-items-center"
            style={{ backgroundColor: "#E7F1FF", marginTop: "-20px" }}
          >
            <span
              style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 600 }}
            >
              Balance
            </span>
            <a
              href="#"
              className="text-primary"
              style={{
                fontSize: 14,
                fontFamily: "Gilroy",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              + Add Balance
            </a>
          </div>
        </div>
        <div
          className="card mx-2"
          style={{
            minWidth: "280px",
            borderRadius: "12px",
            overflow: "hidden",
            height: 187,
          }}
        >
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <p
                  className="mb-0"
                  style={{
                    fontSize: 14,
                    fontFamily: "Gilroy",
                    fontWeight: 600,
                  }}
                >
                  HSBC BANK
                </p>
                <p
                  className="text-muted mb-0"
                  style={{
                    fontSize: 12,
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                    color: "#4B4B4B",
                  }}
                >
                  Savings A/C
                </p>
              </div>
              <img src={more} width={20} height={20} />
            </div>
            <p
              className="mt-3"
              style={{ fontSize: 20, fontFamily: "Gilroy", fontWeight: 500 }}
            >
              4561 2013 6210 6540
            </p>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <p
                className="text-muted mb-0"
                style={{
                  fontSize: 14,
                  fontFamily: "Gilroy",
                  fontWeight: 600,
                  color: "#4B4B4B",
                }}
              >
                Default A/C
              </p>
              <a
                href="#"
                className="text-primary"
                style={{
                  textAlign: "end",
                  fontSize: 14,
                  fontFamily: "Gilroy",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Change
              </a>
            </div>
          </div>
          <div
            className="card-footer d-flex justify-content-between align-items-center"
            style={{ backgroundColor: "#E7F1FF", marginTop: "-20px" }}
          >
            <span
              style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 600 }}
            >
              Balance
            </span>
            <a
              href="#"
              className="text-primary"
              style={{
                fontSize: 14,
                fontFamily: "Gilroy",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              + Add Balance
            </a>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <Table
          responsive="md"
          className="Table_Design"
          style={{
            height: "auto",
            overflow: "visible",
            tableLayout: "auto",
            borderRadius: "24px",
            border: "1px solid #DCDCDC",
          }}
        >
          <thead
            style={{
              backgroundColor: "#E7F1FF",
            }}
          >
            <tr>
              <th
                style={{
                  textAlign: "center",
                  fontFamily: "Gilroy",
                  color: "rgba(34, 34, 34, 1)",
                  fontSize: 14,
                  fontWeight: 600,
                  borderTopLeftRadius: 24,
                }}
              >
                <img src={squre} height={20} width={20} />
              </th>
              <th
                style={{
                  textAlign: "start",
                  padding: "10px",
                  color: "#939393",
                  fontSize: "14px",
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                }}
              >
                Account Name
              </th>
              <th
                style={{
                  textAlign: "start",
                  padding: "10px",
                  color: "#939393",
                  fontSize: "14px",
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                }}
              >
                Date
              </th>
              <th
                style={{
                  textAlign: "start",
                  padding: "10px",
                  color: "#939393",
                  fontSize: "14px",
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                }}
              >
                Amount
              </th>
              <th
                style={{
                  textAlign: "start",
                  padding: "10px",
                  color: "#939393",
                  fontSize: "14px",
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                }}
              >
                Description
              </th>

              <th
                style={{
                  textAlign: "start",
                  padding: "10px",
                  color: "#939393",
                  fontSize: "14px",
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                }}
              >
                Transaction
              </th>
              <th
                style={{
                  textAlign: "start",
                  padding: "10px",
                  color: "#939393",
                  fontSize: "14px",
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                }}
              ></th>
              <th
                style={{
                  textAlign: "center",
                  fontFamily: "Gilroy",
                  color: "rgba(34, 34, 34, 1)",
                  fontSize: 14,
                  fontWeight: 500,
                  borderTopRightRadius: 24,
                }}
              >
                {/* <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 1000 }} >
                          <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />
                        </div> */}
              </th>
            </tr>
          </thead>
          <tbody style={{ textAlign: "center" }}>
            {/* {loading
                    ? Array.from({ length: currentItems?.length || 5 }).map(
                        (_, index) => (
                          <tr key={index}>
                            <td style={{ padding: "10px", border: "none" }}>
                              <Skeleton circle={true} height={40} width={40} />
                            </td>
                            <td style={{ padding: "10px", border: "none" }}>
                              <Skeleton width={80} />
                            </td>
                            <td style={{ padding: "10px", border: "none" }}>
                              <Skeleton width={120} />
                            </td>
                            <td style={{ padding: "10px", border: "none" }}>
                              <Skeleton width={120} />
                            </td>
                            <td style={{ padding: "10px", border: "none" }}>
                              <Skeleton width={120} />
                            </td>
                            <td style={{ padding: "10px", border: "none" }}>
                              <Skeleton width={50} />
                            </td>
                            <td style={{ padding: "10px", border: "none" }}>
                              <Skeleton width={50} />
                            </td>
                          </tr>
                        )
                      )
                    : currentItems.map((user) => {
                        const imageUrl = user.profile || Profile;
                        return ( */}
            <tr
              // key={user.ID}
              style={{
                fontSize: "16px",
                fontWeight: 600,
                textAlign: "center",
                marginTop: 10,
              }}
            >
              <td style={{ padding: "10px", border: "none" }}>
                <img
                  src={squre}
                  height={20}
                  width={20}
                  style={{ marginTop: 10 }}
                />
              </td>

              <td
                style={{
                  border: "none",
                  textAlign: "start",
                  fontSize: "16px",
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  paddingTop: 15,
                }}
              >
                Account Name
              </td>
              <td
                style={{
                  paddingTop: 15,
                  border: "none",
                  textAlign: "start",
                  fontSize: "16px",
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  marginTop: 10,
                }}
              >
                <span
                  style={{
                    paddingTop: "3px",
                    paddingLeft: "10px",
                    paddingRight: "10px",
                    paddingBottom: "3px",
                    borderRadius: "60px",
                    backgroundColor: "#FFEFCF",
                    textAlign: "start",
                    fontSize: "14px",
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                  }}
                >
                  Date
                </span>
              </td>
              <td
                style={{
                  border: "none",
                  textAlign: "start",
                  fontSize: "16px",
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  paddingTop: 15,
                }}
              >
                Amount
              </td>
              <td
                style={{
                  border: "none",
                  textAlign: "start",
                  fontSize: "16px",
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  paddingTop: 15,
                }}
              >
                Description
              </td>
              <td
                style={{
                  border: "none",
                  textAlign: "start",
                  fontSize: "16px",
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  paddingTop: 15,
                }}
              >
                Transaction
              </td>
              <td
                style={{
                  border: "none",
                  textAlign: "start",
                  fontSize: "16px",
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  paddingTop: 15,
                }}
              >
                <PiDotsThreeOutlineVerticalFill
                  style={{ height: 20, width: 20 }}
                />
              </td>
            </tr>
            {/* );
                      })} */}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
export default Banking;
