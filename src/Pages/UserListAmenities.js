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
      console.log("user_id", props.id);
      dispatch({ type: "AMENITESHISTORY", payload: { user_id: props.id } });
      // setAmnnityhistory(state.UsersList?.amnetieshistory)
    }
    console.log("userIduserId....?", props.id);
  }, [props.id]);
  const [selectAmneties, setselectAmneties] = useState("");
  const [selectedAmenityName, setSelectedAmenityName] = useState([]);
  console.log("selectedAmenityName", selectedAmenityName);
  const [addamenityShow, setaddamenityShow] = useState(false);
  const [active, setActive] = useState(false);
  const [status, setStatus] = useState("");
  const [createby, setcreateby] = useState("");
  const [amnityEdit, setamnityEdit] = useState("");
  const [filtshow, setFiltshow] = useState(false);
  const [amnitytableshow, setamnitytableshow] = useState(false);
  console.log("createby", createby);
  const [amnityError, setamnityError] = useState("");

  const validateAssignField = (value, fieldName) => {
    // Check if the value is empty or invalid
    if (!value || value === "Select an Amenities") {
      switch (fieldName) {
        case "selectAmneties":
          setamnityError("selected Amenity is required");
          break;
      }
      return false;
    } else {
      // Clear the error if validation passes
      switch (fieldName) {
        case "Floor":
          setamnityError("");
          break;
      }
      return true;
    }
  };

  const handleselect = (e) => {
    const value = e.target.value;
    setselectAmneties(value);
    setamnitytableshow(true);
    console.log("e.target.value", value);

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

    console.log("state.UsersList.amnetieshistory.data", amenitiesHistory);
    if (amenitiesHistory && amenitiesHistory.length > 0) {
      if (amenitiesHistory[0].status == 0) {
        console.log("Status is 0, setting add amenity show to true");
        setaddamenityShow(true);
        setstatusShow(false);
      }
    } else {
      console.log("else");
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
      console.log(
        "state.UsersList.customerdetails.all_amenities",
        state.UsersList.customerdetails.all_amenities
      );
      const AmnitiesNamelist =
        state.UsersList.customerdetails.all_amenities.filter((item) => {
          return item.Amnities_Id == selectAmneties;
        });
      console.log("AmnitiesNamelist", AmnitiesNamelist);
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

  const handleSetAsDefault = (e) => {
    setActive(e.target.checked);
  };
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  useEffect(() => {
    dispatch({ type: "AMENITESNAMES" });
  }, []);

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
    console.log("eee.ttt.v", e.target.value);
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
  console.log(
    "state.UsersList?.customerdetails?.all_amenities?",
    state.UsersList?.customerdetails?.all_amenities
  );

  console.log(
    "state.UsersList?.statusCustomerAddUser",
    state.UsersList.statusCustomerAddUser
  );
  useEffect(() => {
    if (state.UsersList.statusCustomerAddUser == 200) {
      setaddamenityShow(false);
      setTimeout(() => {
        dispatch({ type: "CUSTOMERDETAILS", payload: { user_id: props.id } });
        dispatch({ type: "AMENITESHISTORY", payload: { user_id: props.id } });
      }, 1000);

      setTimeout(() => {
        dispatch({ type: "CLEAR_ADDUSER_AMNETIES" });
      }, 1000);
    }
  }, [state.UsersList.statusCustomerAddUser]);

  console.log("state For Add userAminity", state);
  const handleEdit = (v) => {
    console.log("vvv", v);

    setamnityEdit(v);
    setaddamenityShow(true);
    setstatusShow(true);
    setselectAmneties(v.amenity_Id);
  };

  const amentiesrowsPerPage = 10;
  const [amnitiescurrentPage, setAmnitycurrentPage] = useState(1);
  const [amnitiesFilterddata, setamnitiesFilterddata] = useState([]);
  const indexOfLastRowamneties = amnitiescurrentPage * amentiesrowsPerPage;
  const indexOfFirstRowamnities = indexOfLastRowamneties - amentiesrowsPerPage;
  const currentRowAmnities = amnitiesFilterddata?.slice(
    indexOfFirstRowamnities,
    indexOfLastRowamneties
  );
  console.log("currentRowAmnities", currentRowAmnities);

  const handleAmnitiesPageChange = (amnitiespageNumber) => {
    setAmnitycurrentPage(amnitiespageNumber);
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

      <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12">
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
            <MdError style={{ width: 20, height: 20 }} />
            {amnityError}
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
          <Modal.Title style={{ fontSize: 18 }} className="text-center">
            Add Amenities 
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3 ps-2 pe-2">
            <label className="mb-1" style={{ fontSize: 14, fontWeight: 650 }}>
            Amenities_Name
            </label>
            <Form.Control
              placeholder="Amnities Name"
              aria-label="Recipient's username"
              className="border custom-input"
              aria-describedby="basic-addon2"
              value={selectAmneties}
              style={{
                fontSize: 12,
                fontWeight: "530",
                opacity: 1,
                borderRadius: "4px",
                color: "gray",
                "::placeholder": { color: "gray", fontSize: 12 },
              }}
            />
          </div>
          {amnityError && (
            <div style={{ color: "red" }}>
              {" "}
              <MdError style={{ width: 20, height: 20 }} />
              {amnityError}
            </div>
          )}
          <div className="mb-3 ps-2 pe-2">
            <label className="mb-1" style={{ fontSize: 14, fontWeight: 650 }}>
              Hostel_Name
            </label>
            <Form.Control
              placeholder="HostelName"
              aria-label="Recipient's username"
              className="border custom-input"
              aria-describedby="basic-addon2"
              value={props.hostelName}
              style={{
                fontSize: 12,
                fontWeight: "530",
                opacity: 1,
                borderRadius: "4px",
                color: "gray",
                "::placeholder": { color: "gray", fontSize: 12 },
              }}
            />
          </div>

          <div className="mb-3 ps-2 pe-2">
            <label className="mb-1" style={{ fontSize: 14, fontWeight: 650 }}>
              Amount
            </label>
            <Form.Control
              placeholder="Amount"
              aria-label="Recipient's username"
              className="border custom-input"
              aria-describedby="basic-addon2"
              value={createby[0]?.Amount}
              style={{
                fontSize: 12,
                fontWeight: "530",
                opacity: 1,
                borderRadius: "4px",
                color: "gray",
                "::placeholder": { color: "gray", fontSize: 12 },
              }}
            />
          </div>
          {statusShow && (
            <div className="mb-3 ps-2  pe-2">
              <label className="mb-1" style={{ fontSize: 14, fontWeight: 650 }}>
                Select Status
              </label>
              <Form.Select
                aria-label="Default select example"
                value={statusAmni}
                onChange={(e) => handleStatusAmnities(e)}
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  backgroundColor: "#f8f9fa",
                }}
              >
                <option style={{ fontSize: 14, fontWeight: 600 }}>
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
              fontFamily: "Montserrat, sans-serif",
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
      <Table className="ebtable" responsive style={{ marginTop: 30 }}>
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
              console.log("Datform..?", Datform);

              let day = Datform.getDate();
              let month = Datform.getMonth() + 1;
              let year = Datform.getFullYear();

              let formattedDate = `${day}/${month}/${year}`;
              console.log("Formatted Date:", formattedDate);

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
                    Monthly
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
                        backgroundColor: v.status === 1 ? "#D9FFD9" : "#FFD9D9", // or any colors you prefer
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
      {currentRowAmnities.length > 0 && (
        <nav>
          <ul
            style={{
              display: "flex",
              alignItems: "center",
              listStyleType: "none",
              padding: 0,
              justifyContent: "end",
            }}
          >
            <li style={{ margin: "0 5px" }}>
              <button
                style={{
                  padding: "5px 10px",
                  textDecoration: "none",
                  color: amnitiescurrentPage === 1 ? "#ccc" : "#007bff",
                  cursor: amnitiescurrentPage === 1 ? "not-allowed" : "pointer",
                  borderRadius: "5px",
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
                {/* <img src={leftArrow} width="10" height="10" alt="Previous" /> */}
                <ArrowLeft2 size="16" color="#1E45E1" />
              </button>
              <span
                onClick={() =>
                  handleAmnitiesPageChange(amnitiescurrentPage - 1)
                }
                style={{
                  marginTop: "20px",
                  cursor: amnitiescurrentPage === 1 ? "not-allowed" : "pointer",
                  color: amnitiescurrentPage === 1 ? "#ccc" : "#007bff",
                }}
              >
                Previous
              </span>
            </li>
            {amnitiescurrentPage > 3 && (
              <li style={{ margin: "0 5px" }}>
                <button
                  style={{
                    padding: "5px 10px",
                    textDecoration: "none",
                    color: "white",
                    cursor: "pointer",
                    borderRadius: "5px",
                    display: "inline-block",
                    minWidth: "30px",
                    textAlign: "center",
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                  onClick={() => handleAmnitiesPageChange(1)}
                >
                  1
                </button>
              </li>
            )}
            {amnitiescurrentPage > 3 && <span>...</span>}
            {renderPageNumbersAmnities()}
            {amnitiescurrentPage < totalPagesAmnities - 2 && <span>...</span>}
            {amnitiescurrentPage < totalPagesAmnities - 2 && (
              <li style={{ margin: "0 5px" }}>
                <button
                  style={{
                    padding: "5px 10px",
                    textDecoration: "none",

                    cursor: "pointer",
                    borderRadius: "5px",
                    display: "inline-block",
                    minWidth: "30px",
                    textAlign: "center",
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                  onClick={() => handleAmnitiesPageChange(totalPagesAmnities)}
                >
                  {totalPagesAmnities}
                </button>
              </li>
            )}
            <li style={{ margin: "0 5px" }}>
              <span
                onClick={() =>
                  handleAmnitiesPageChange(amnitiescurrentPage + 1)
                }
                style={{
                  marginTop: "20px",
                  cursor:
                    amnitiescurrentPage === totalPagesAmnities
                      ? "not-allowed"
                      : "pointer",
                  color:
                    amnitiescurrentPage === totalPagesAmnities
                      ? "#ccc"
                      : "#007bff",
                }}
              >
                Next
              </span>
              <button
                style={{
                  padding: "5px 10px",
                  textDecoration: "none",
                  color:
                    amnitiescurrentPage === amnitiescurrentPage
                      ? "#ccc"
                      : "#007bff",
                  cursor:
                    amnitiescurrentPage === amnitiescurrentPage
                      ? "not-allowed"
                      : "pointer",
                  borderRadius: "5px",
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
                <ArrowRight2 size="16" color="#1E45E1" />
              </button>
            </li>
          </ul>
        </nav>
      )}
    </div>
  );
}
export default UserListAmenities;
