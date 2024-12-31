import React, { useState, useEffect, useRef } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Dropdown, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MdError } from "react-icons/md";
import {
  Autobrightness,
  Call,
  Sms,
  House,
  Buildings,
  ArrowLeft2,
  ArrowRight2,
  MoreCircle,
} from "iconsax-react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { PinDropSharp } from "@material-ui/icons";
import { propsToClassKey } from "@mui/styles";
import Modal from "react-bootstrap/Modal";
import { Button, Offcanvas, Form, FormControl } from "react-bootstrap";
import cross from "../Assets/Images/cross.png";

function UserListAmenities(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.id) {
      dispatch({ type: "AMENITESHISTORY", payload: { user_id: props.id } });
    }
  }, [props.id]);
  const [selectAmneties, setselectAmneties] = useState("");

  const [selectedAmenityName, setSelectedAmenityName] = useState([]);
  const [addamenityShow, setaddamenityShow] = useState(false);
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState("");
  const [createby, setcreateby] = useState("");
  const [amnityEdit, setamnityEdit] = useState("");
  const [filtshow, setFiltshow] = useState(false);
  const [amnitytableshow, setamnitytableshow] = useState(false);
  const [amnityError, setamnityError] = useState("");

  const handleselect = (e) => {
    const value = e.target.value;
    setselectAmneties(value);
    setamnitytableshow(true);

    if (value === "" || value === "Select an Amenities") {
      setamnityError("Please select a valid amenity Id");
      setaddamenityShow(false);
      return;
    } else {
      setamnityError("");
    }
    const amenitiesHistory = state.UsersList.amnetieshistory.filter((item) => {
      return item.amenity_Id == value;
    });

    if (amenitiesHistory && amenitiesHistory.length > 0) {
      if (amenitiesHistory[0].status == 0) {
        setaddamenityShow(true);
        setstatusShow(false);
      }
    } else {
      setaddamenityShow(true);
      setstatusShow(false);
      setSelectedAmenityName([]);
    }
  };

  useEffect(() => {
    if (
      state.UsersList.customerdetails.all_amenities &&
      state.UsersList.customerdetails.all_amenities.length > 0 &&
      selectAmneties
    ) {
      const AmnitiesNamelist =
        state.UsersList.customerdetails.all_amenities.filter((item) => {
          return item.Amnities_Id == selectAmneties;
        });
      setcreateby(AmnitiesNamelist);
    }
  }, [state.UsersList?.customerdetails?.all_amenities, selectAmneties]);

  const uniqueAmenities = [];
  const seenNames = new Set();

  if (state.UsersList?.amnetieshistory) {
    state.UsersList.amnetieshistory.forEach((amenity) => {
      if (!seenNames.has(amenity.Amnities_Name)) {
        seenNames.add(amenity.Amnities_Name);
        uniqueAmenities.push(amenity);
      }
    });
  }

  const amenities = state.UsersList?.amnetieshistory;

  if (amenities) {
    amenities.forEach((amenity) => {
      if (!seenNames.has(amenity.Amnities_Name)) {
        seenNames.add(amenity.Amnities_Name);
        uniqueAmenities.push(amenity);
      }
    });
  }
  const handleCloseModal = () => {
    setaddamenityShow(false);
  };

  const [statusAmni, setStatusAmni] = useState(false);
  const [statusShow, setstatusShow] = useState(false);
  const [amnitynotshow, setamnitynotshow] = useState([]);
  const handleStatusAmnities = (e) => {
    setStatusAmni(e.target.value);
  };

  const handleAddUserAmnities = () => {
    if (statusAmni) {
      dispatch({
        type: "AddUserAmnities",
        payload: {
          userID: props.customerUser_Id,
          amenityID: selectAmneties,
          Status: props.statusAmni,
          hostelID: props.hostelIds,
        },
      });
      setStatusAmni("");
      setselectAmneties("");
    } else {
      dispatch({
        type: "AddUserAmnities",
        payload: {
          hostelID: props.hostelIds,
          userID: props.customerUser_Id,
          amenityID: selectAmneties,
        },
      });
      setStatusAmni("");
      setselectAmneties("");
    }
  };

  useEffect(() => {
    if (state.UsersList.statusCustomerAddUser === 200) {
      setaddamenityShow(false);
    }
  }, [state.UsersList.statusCustomerAddUser]);

  const handleEdit = (v) => {
    setamnityEdit(v);
    setaddamenityShow(true);
    setstatusShow(true);
    setselectAmneties(v.amenity_Id);
  };

  const [amentiesrowsPerPage, setAmentiesrowsPerPage] = useState(10);
  const [amnitiescurrentPage, setAmnitycurrentPage] = useState(1);
  const [amnitiesFilterddata, setamnitiesFilterddata] = useState([]);
  const indexOfLastRowamneties = amnitiescurrentPage * amentiesrowsPerPage;
  const indexOfFirstRowamnities = indexOfLastRowamneties - amentiesrowsPerPage;
  const currentRowAmnities = amnitiesFilterddata?.slice(
    indexOfFirstRowamnities,
    indexOfLastRowamneties
  );

  const handleAmnitiesPageChange = (amnitiespageNumber) => {
    setAmnitycurrentPage(amnitiespageNumber);
  };
  const handleItemsPerPageChange = (event) => {
    setAmentiesrowsPerPage(Number(event.target.value));
  };

  const totalPagesAmnities = Math.ceil(
    amnitiesFilterddata?.length / amentiesrowsPerPage
  );

  const renderPageNumbersAmnities = () => {
    const pageNumbersAmnities = [];
    let startPageAmnities = amnitiescurrentPage - 1;
    let endPageAmnities = amnitiescurrentPage + 1;

    if (amnitiescurrentPage === 1) {
      startPageAmnities = 1;
      endPageAmnities = 3;
    }

    if (amnitiescurrentPage === totalPagesAmnities) {
      startPageAmnities = totalPagesAmnities - 2;
      endPageAmnities = totalPagesAmnities;
    }

    if (amnitiescurrentPage === 2) {
      startPageAmnities = 1;
      endPageAmnities = 3;
    }

    if (amnitiescurrentPage === totalPagesAmnities - 1) {
      startPageAmnities = totalPagesAmnities - 2;
      endPageAmnities = totalPagesAmnities;
    }

    for (let i = startPageAmnities; i <= endPageAmnities; i++) {
      if (i > 0 && i <= totalPagesAmnities) {
        pageNumbersAmnities.push(
          <li key={i} style={{ margin: "0 5px" }}>
            <button
              style={{
                padding: "5px 10px",
                textDecoration: "none",
                color: i === amnitiescurrentPage ? "#007bff" : "#000000",
                cursor: "pointer",
                borderRadius: "5px",
                display: "inline-block",
                minWidth: "30px",
                textAlign: "center",
                backgroundColor:
                  i === amnitiescurrentPage ? "transparent" : "transparent",
                border: i === amnitiescurrentPage ? "1px solid #ddd" : "none",
              }}
              onClick={() => handleAmnitiesPageChange(i)}
            >
              {i}
            </button>
          </li>
        );
      }
    }

    return pageNumbersAmnities;
  };

  useEffect(() => {
    setamnitiesFilterddata(state.UsersList?.amnetieshistory);
  }, [state.UsersList?.amnetieshistory]);
  return (
    <div className="container mt-3">
      {state.UsersList?.customerdetails?.all_amenities &&
        state.UsersList?.customerdetails?.all_amenities.length === 0 && (
          <>
            <label
              className="pb-1"
              style={{
                fontSize: 14,
                color: "red",
                fontFamily: "Gilroy",
                fontWeight: 500,
              }}
            >
              {" "}
              Please add a 'Amenities' option in Settings, accessible after
              assign an amenities.
            </label>
          </>
        )}

      <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12" style={{marginTop:"-10px"}}>
        <Form.Label
          style={{ fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy" }}
        >
          Amenities
        </Form.Label>
        <Form.Select
          aria-label="Default select example"
          className="border"
          style={{
            fontSize: 16,
            color: "#4B4B4B",
            fontFamily: "Gilroy,sans-serif",
            fontWeight: 500,
            boxShadow: "none",
            border: "1px solid #D9D9D9",
            height: 50,
            borderRadius: 8,
          }}
          value={selectAmneties}
          onChange={(e) => handleselect(e)}
        >
          <option
            style={{ fontSize: 16, fontWeight: 500, fontFamily: "Gilroy" }}
            selected
            value=""
          >
            Select an Amenities
          </option>
          {state.UsersList?.customerdetails?.all_amenities?.map((item) => (
            <option key={item.Amnities_Id} value={item.Amnities_Id}>
              {item.Amnities_Name}
            </option>
          ))}
        </Form.Select>
        {amnityError && (
          <div style={{ color: "red" }}>
            {" "}
            <MdError style={{}} />
            <span
              style={{
                fontSize: "12px",
                color: "red",
                fontFamily: "Gilroy",
                fontWeight: 500,
              }}
            >
              {amnityError}
            </span>
          </div>
        )}
      </div>

      <Modal
        show={addamenityShow}
        onHide={() => setaddamenityShow(false)}
        backdrop="static"
        centered
      >
        <Modal.Header
          closeButton
          style={{ backgroundColor: "#F5F5FF" }}
          className="text-center"
        >
          <Modal.Title
            style={{ fontSize: 20, fontWeight: 600, fontFamily: "Gilroy" }}
            className="text-center"
          >
            Add Amenities
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3 ps-2 pe-2">
            <label
              className="mb-1"
              style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}
            >
              AmenitiesName
            </label>
            <Form.Control
              placeholder="Amnities Name"
              aria-label="Recipient's username"
              className="border custom-input"
              aria-describedby="basic-addon2"
              value={createby[0]?.Amnities_Name}
              style={{
                fontSize: 14,
                fontWeight: "530",
                opacity: 1,
                borderRadius: "8px",
                height: 45,
                color: "gray",
                "::placeholder": { color: "gray", fontSize: 12 },
              }}
            />
          </div>
          {amnityError && (
            <div style={{ color: "red" }}>
              {" "}
              <MdError />
              <span
                style={{
                  fontSize: "12px",
                  color: "red",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                {amnityError}
              </span>
            </div>
          )}
          <div className="mb-3 ps-2 pe-2">
            <label
              className="mb-1"
              style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}
            >
              HostelName
            </label>
            <Form.Control
              placeholder="HostelName"
              aria-label="Recipient's username"
              className="border custom-input"
              aria-describedby="basic-addon2"
              value={props.hostelName}
              style={{
                fontSize: 14,
                fontWeight: "530",
                height: 45,
                opacity: 1,
                borderRadius: "8px",
                color: "gray",
                "::placeholder": { color: "gray", fontSize: 12 },
              }}
            />
          </div>

          <div className="mb-3 ps-2 pe-2">
            <label
              className="mb-1"
              style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}
            >
              Amount
            </label>
            <Form.Control
              placeholder="Amount"
              aria-label="Recipient's username"
              className="border custom-input"
              aria-describedby="basic-addon2"
              value={createby[0]?.Amount}
              style={{
                fontSize: 14,
                fontWeight: "530",
                opacity: 1,
                borderRadius: "8px",
                height: 45,
                color: "gray",
                "::placeholder": { color: "gray", fontSize: 12 },
              }}
            />
          </div>
          {statusShow && (
            <div className="mb-3 ps-2  pe-2">
              <label
                className="mb-1"
                style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}
              >
                Select Status
              </label>
              <Form.Select
                aria-label="Default select example"
                value={statusAmni}
                onChange={(e) => handleStatusAmnities(e)}
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  backgroundColor: "#f8f9fa",
                  height: 45,
                  borderRadius: 8,
                }}
              >
                <option
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                  }}
                >
                  Select Status
                </option>

                <option value="1">Active</option>
                <option value="0">In Active</option>
              </Form.Select>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            style={{
              backgroundColor: "#1E45E1",
              fontWeight: 600,
              height: 50,
              borderRadius: 12,
              fontSize: 16,
              fontFamily: "Gilroy",
              marginTop: 20,
            }}
            onClick={handleAddUserAmnities}
          >
            Add Amnities
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="d-flex flex-wrap mt-2">
        {state.UsersList.amnetieshistory &&
          [
            ...new Map(
              state.UsersList.amnetieshistory.map((item) => [
                item["Amnities_Name"],
                item,
              ])
            ).values(),
          ].map((v) => {
            return (
              <div style={{ marginTop: 20 }} key={v.Amnities_Name}>
                <span
                  className="btn btn-sm rounded-pill"
                  style={{
                    backgroundColor: "#D9E9FF",
                    margin: 10,
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                    fontSize: 14,
                  }}
                >
                  {v.Amnities_Name} - ₹{v.Amount}/m
                  <img
                    src={cross}
                    width={15}
                    height={15}
                    alt="Remove"
                    style={{ marginLeft: "10px", cursor: "pointer" }}
                  />
                </span>
              </div>
            );
          })}
      </div>
      <div
        style={{
          // height: "400px",
          height: currentRowAmnities.length >= 1 ? "100px" : "auto",
          overflowY: "auto",
          borderRadius: "24px",
          border: "1px solid #DCDCDC",
          // borderBottom:"none"
        }}
      >
        <Table
          responsive="md"
          className="Table_Design"
          style={{
            border: "1px solid #DCDCDC",
            borderBottom: "1px solid transparent",
            borderEndStartRadius: 0,
            borderEndEndRadius: 0,
          }}
        >
          <thead style={{ backgroundColor: "#E7F1FF" }}>
            <tr>
              <th
                scope="col"
                style={{
                  textAlign: "center",
                  color: "#939393",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                Amenities
              </th>
              <th
                scope="col"
                style={{
                  color: "#939393",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                Date
              </th>
              <th
                scope="col"
                style={{
                  color: "#939393",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                Subscription
              </th>
              <th
                scope="col"
                style={{
                  color: "#939393",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                Amount
              </th>
              <th
                scope="col"
                style={{
                  color: "#939393",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}
              >
                Status
              </th>
              <th scope="col"></th>
            </tr>
          </thead>

          <tbody style={{ verticalAlign: "middle" }}>
            {currentRowAmnities &&
              currentRowAmnities?.map((v) => {
                let Datform = new Date(v.created_At);

                let day = Datform.getDate();
                let month = Datform.getMonth() + 1;
                let year = Datform.getFullYear();

                let formattedDate = `${day}/${month}/${year}`;

                return (
                  <tr key={v.amenity_Id} style={{ marginTop: 30 }}>
                    <td
                      style={{
                        textAlign: "center",
                        fontWeight: 500,
                        fontSize: "16px",
                        fontFamily: "Gilroy",
                      }}
                    >
                      {v.Amnities_Name}
                    </td>
                    <td>
                      <span
                        style={{
                          backgroundColor: "#EBEBEB",
                          padding: "3px 3px 3px 3px",
                          borderRadius: "10px",
                          lineHeight: "1.5em",
                          margin: "0",
                          fontSize: 14,
                          fontWeight: 500,
                          fontFamily: "Gilroy",
                        }}
                      >
                        {formattedDate}
                      </span>
                    </td>
                    <td
                      style={{
                        fontWeight: 500,
                        fontSize: "16px",
                        fontFamily: "Gilroy",
                      }}
                    >
                      {v.month_name}
                    </td>
                    <td
                      style={{
                        fontWeight: 500,
                        fontSize: "16px",
                        fontFamily: "Gilroy",
                      }}
                    >
                      {v.Amount}
                    </td>
                    <td
                      style={{
                        fontWeight: 500,
                        fontSize: "16px",
                        fontFamily: "Gilroy",
                      }}
                    >
                      <span
                        style={{
                          color: "black",
                          backgroundColor:
                            v.status === 1 ? "#D9FFD9" : "#FFD9D9", // or any colors you prefer
                          paddingTop: "2px",
                          paddingLeft: "10px",
                          paddingRight: "10px",
                          paddingBottom: "2px",
                          borderRadius: "5px",
                        }}
                      >
                        {v.status == 1 ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>
                      <div
                        onClick={() => handleEdit(v)}
                        style={{
                          cursor: "pointer",
                          height: 40,
                          width: 40,
                          borderRadius: 100,
                          border: "1px solid #EFEFEF",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          position: "relative",
                          zIndex: 1000,
                        }}
                      >
                        <PiDotsThreeOutlineVerticalFill
                          style={{ height: 20, width: 20 }}
                        />
                      </div>

                      {/* <img src={dottt} style={{ height: 40, width: 40,cursor:"pointer" }}  alt="edit" /> */}
                    </td>
                  </tr>
                );
              })}
            {currentRowAmnities.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", color: "red" }}>
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      {currentRowAmnities.length > 0 && (
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end", // Align dropdown and pagination
            padding: "10px",
            // borderTop: "1px solid #ddd",
          }}
        >
          {/* Dropdown for Items Per Page */}
          <div>
            <select
              value={amentiesrowsPerPage}
              onChange={handleItemsPerPageChange}
              style={{
                padding: "5px",
                border: "1px solid #1E45E1",
                borderRadius: "5px",
                color: "#1E45E1",
                fontWeight: "bold",
                cursor: "pointer",
                outline: "none",
                boxShadow: "none",
              }}
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          {/* Pagination Controls */}
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              listStyleType: "none",
              margin: 0,
              padding: 0,
            }}
          >
            {/* Previous Button */}
            <li style={{ margin: "0 10px" }}>
              <button
                style={{
                  padding: "5px",
                  textDecoration: "none",
                  color: amnitiescurrentPage === 1 ? "#ccc" : "#1E45E1",
                  cursor: amnitiescurrentPage === 1 ? "not-allowed" : "pointer",
                  borderRadius: "50%",
                  display: "inline-block",
                  minWidth: "30px",
                  textAlign: "center",
                  backgroundColor: "transparent",
                  border: "none",
                }}
                onClick={() =>
                  handleAmnitiesPageChange(amnitiescurrentPage - 1)
                }
                disabled={amnitiescurrentPage === 1}
              >
                <ArrowLeft2
                  size="16"
                  color={amnitiescurrentPage === 1 ? "#ccc" : "#1E45E1"}
                />
              </button>
            </li>

            {/* Current Page Indicator */}
            <li
              style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}
            >
              {amnitiescurrentPage} of {totalPagesAmnities}
            </li>

            {/* Next Button */}
            <li style={{ margin: "0 10px" }}>
              <button
                style={{
                  padding: "5px",
                  textDecoration: "none",
                  color:
                    amnitiescurrentPage === totalPagesAmnities
                      ? "#ccc"
                      : "#1E45E1",
                  cursor:
                    amnitiescurrentPage === totalPagesAmnities
                      ? "not-allowed"
                      : "pointer",
                  borderRadius: "50%",
                  display: "inline-block",
                  minWidth: "30px",
                  textAlign: "center",
                  backgroundColor: "transparent",
                  border: "none",
                }}
                onClick={() =>
                  handleAmnitiesPageChange(amnitiescurrentPage + 1)
                }
                disabled={amnitiescurrentPage === totalPagesAmnities}
              >
                <ArrowRight2
                  size="16"
                  color={
                    amnitiescurrentPage === totalPagesAmnities
                      ? "#ccc"
                      : "#1E45E1"
                  }
                />
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
export default UserListAmenities;
