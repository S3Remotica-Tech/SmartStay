/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MdError } from "react-icons/md";
import { ArrowLeft2, ArrowRight2, ArrowUp2, ArrowDown2 } from "iconsax-react";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import cross from "../Assets/Images/cross.png";
import PropTypes from "prop-types";
import Select from "react-select";
import "./UserList.css";
import { CloseCircle } from "iconsax-react";

function UserListAmenities(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
   const [formLoading, setFormLoading] = useState(false)

  useEffect(() => {
    if (props.id) {
      dispatch({ type: "AMENITESHISTORY", payload: { user_id: props.id } });
    }
  }, [props.id]);
  const [selectAmneties, setselectAmneties] = useState("");

  const [addamenityShow, setaddamenityShow] = useState(false);
  const [createby, setcreateby] = useState("");
  const [amnityError, setamnityError] = useState("");

  const handleselect = (selectedOption) => {
    const value = selectedOption?.value || "";

    setselectAmneties(value);

    if (value === "") {
      setamnityError("Please select a valid amenity Id");
      setaddamenityShow(false);
      return;
    } else {
      setamnityError("");
    }

    const amenitiesHistory = state.UsersList?.amnetieshistory?.filter(
      (item) => {
        return String(item.amenity_Id) === String(value);
      }
    );

    if (amenitiesHistory && amenitiesHistory.length > 0) {
      if (amenitiesHistory[0].status === 0) {
        setaddamenityShow(true);
        setstatusShow(false);
      }
    } else {
      setaddamenityShow(true);
      setstatusShow(false);
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
          return String(item.Amnities_Id) === String(selectAmneties);
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

  const [statusAmni, setStatusAmni] = useState(false);
  const [statusShow, setstatusShow] = useState(false);
  const [selectError, setSelectError] = useState("");

  const handleStatusAmnities = (e) => {
    setStatusAmni(e.target.value);
    setSelectError("");
  };
  const validateAssignField = (value, fieldName) => {
    if (!value || value === "Select Status") {
      switch (fieldName) {
        case "statusAmni":
          setSelectError("Please Select Status");
          break;

        default:
          break;
      }
      return false;
    } else {
      switch (fieldName) {
        case "statusAmni":
          setSelectError("");
          break;

        default:
          break;
      }
      return true;
    }
  };

  const handleAmnitiesSelect = () => {
  if (!validateAssignField(statusAmni, "statusAmni")) return;

  if (statusAmni && statusShow) {
    dispatch({
      type: "AddUserAmnities",
      payload: {
        userID: props.customerUser_Id,
        amenityID: selectAmneties,
        Status: statusAmni,
        hostelID: props.hostelIds,
      },
    });
    setFormLoading(true);
    setStatusAmni("");
    setselectAmneties("");
  }
};

  const handleAddUserAmnities = () => {
    if (selectAmneties) {
      dispatch({
        type: "AddUserAmnities",
        payload: {
          hostelID: props.hostelIds,
          userID: props.customerUser_Id,
          amenityID: selectAmneties,
        },
      });
       setFormLoading(true)
    }

    setStatusAmni("");
    setselectAmneties("");
  };
  const [activeDotsId, setActiveDotsId] = useState(null);
  const handleEdit = (v) => {
    setActiveDotsId((prev) => (prev === v.id ? null : v.id));
    setaddamenityShow(true);
    setstatusShow(true);
    setselectAmneties(v.amenity_Id);
  };
  const handleFormClose = () => {
     setselectAmneties("");
    setSelectError("");
    setaddamenityShow(false);
    setActiveDotsId(null)
    setStatusAmni(false)
   
    dispatch({ type: "CLEAR_ERROR_USER_AMENITIES" });
  };
  useEffect(() => {
    if (state.UsersList.statusCustomerAddUser === 200) {
       setFormLoading(false)
      handleFormClose();
    }
  }, [state.UsersList.statusCustomerAddUser]);

  const [amentiesrowsPerPage, setAmentiesrowsPerPage] = useState(2);
  const [amnitiescurrentPage, setAmnitycurrentPage] = useState(1);
  const [amnitiesFilterddata, setamnitiesFilterddata] = useState([]);
  const indexOfLastRowamneties = amnitiescurrentPage * amentiesrowsPerPage;
  const indexOfFirstRowamnities = indexOfLastRowamneties - amentiesrowsPerPage;
  const currentRowAmnities = amnitiesFilterddata?.slice(
    indexOfFirstRowamnities,
    indexOfLastRowamneties
  );

  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });

  const sortedData = React.useMemo(() => {
    if (!sortConfig.key) return currentRowAmnities;

    const sorted = [...currentRowAmnities].sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];

      if (!isNaN(valueA) && !isNaN(valueB)) {
        return sortConfig.direction === "asc"
          ? valueA - valueB
          : valueB - valueA;
      }

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortConfig.direction === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }

      return 0;
    });

    return sorted;
  }, [currentRowAmnities, sortConfig]);
  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
  };


  const handleAmnitiesPageChange = (amnitiespageNumber) => {
    setAmnitycurrentPage(amnitiespageNumber);
    
  };
  const handleItemsPerPageChange = (event) => {
    setAmentiesrowsPerPage(Number(event.target.value));
    setAmnitycurrentPage(1)
  };

  const totalPagesAmnities = Math.ceil(
    amnitiesFilterddata?.length / amentiesrowsPerPage
  );

  useEffect(() => {
    setamnitiesFilterddata(state.UsersList?.amnetieshistory);
  }, [state.UsersList?.amnetieshistory]);

useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }

  }, [state.createAccount?.networkError])

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
              Please add a &apos;Amenities&apos; option in Settings, accessible
              after assign an amenities.
            </label>
          </>
        )}

      <div
        className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
        style={{ marginTop: "-10px" }}
      >
        <Form.Label
          style={{ fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy" }}
        >
          Amenities
        </Form.Label>
        <Select
          placeholder="Select an Amenities"
          value={
            state.UsersList?.customerdetails?.all_amenities?.find(
              (item) => item.Amnities_Id === selectAmneties
            )
              ? {
                  value: selectAmneties,
                  label: state.UsersList.customerdetails.all_amenities.find(
                    (item) => item.Amnities_Id === selectAmneties
                  )?.Amnities_Name,
                }
              : null
          }
          onChange={handleselect}
          options={state.UsersList?.customerdetails?.all_amenities?.map(
            (item) => ({
              value: item.Amnities_Id,
              label: item.Amnities_Name,
            })
          )}
          classNamePrefix="custom"
          menuPlacement="auto"
          styles={{
            menu: (base) => ({
              ...base,
              maxHeight: "170px",
              overflowY: "auto",
              zIndex: 9999,
              fontFamily: "Gilroy",
            }),
            menuList: (base) => ({
              ...base,
              maxHeight: "170px",
              overflowY: "auto",
              padding: 0,
              scrollbarWidth: "thin",
              cursor: "pointer",
              fontFamily: "Gilroy",
            }),
            control: (base) => ({
              ...base,
              fontSize: 16,
              borderRadius: 8,
              border: "1px solid #D9D9D9",
              height: 50,
              fontWeight: 500,
              fontFamily: "Gilroy, sans-serif",
              boxShadow: "none",
              boxShadowColor: "none",
            }),
            dropdownIndicator: (base) => ({
              ...base,
              cursor: "pointer",
            }),
            option: (base, state) => ({
              ...base,
              cursor: "pointer",
              backgroundColor: state.isFocused ? "#f0f0f0" : "white",
              color: "#000",
              fontFamily: "Gilroy",
            }),
          }}
        />
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
        onHide={handleFormClose}
        backdrop="static"
        centered
      >
        <Modal.Header style={{ position: "relative" }}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 600,
              fontFamily: "Gilroy",
              textAlign: "start",
            }}
          >
            Add Amenities
          </div>
        
          <CloseCircle
            size="24"
            color="#000"
            onClick={handleFormClose}
            style={{ cursor: "pointer" }}
          />
        </Modal.Header>

        <Modal.Body className="pb-1">
          <div className="mb-3 ps-2 pe-2">
            <label
              className="mb-1"
              style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}
            >
              Amenities Name
            </label>
            <Form.Control
              placeholder="Amnities Name"
              aria-label="Recipient's username"
              className="border custom-input"
              aria-describedby="basic-addon2"
              value={createby[0]?.Amnities_Name}
              style={{
                fontSize: 16,
                fontWeight: "500",
                opacity: 1,
                borderRadius: "8px",
                height: 45,
                 fontFamily: "Gilroy",
                color: "gray",
                "::placeholder": { color: "gray", fontSize: 12 },
              }}
              disabled
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
              Hostel Name
            </label>
            <Form.Control
              placeholder="HostelName"
              aria-label="Recipient's username"
              className="border custom-input"
              aria-describedby="basic-addon2"
              value={props.hostelName}
              style={{
                fontSize: 16,
                fontWeight: "500",
                height: 45,
                opacity: 1,
                 fontFamily: "Gilroy",
                borderRadius: "8px",
                color: "gray",
                "::placeholder": { color: "gray", fontSize: 12 },
              }}
               disabled
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
                fontSize: 16,
                fontWeight: "500",
                 fontFamily: "Gilroy",
                opacity: 1,
                borderRadius: "8px",
                height: 45,
                color: "gray",
                "::placeholder": { color: "gray", fontSize: 12 },
              }}
               disabled
            />
          </div>
          {statusShow && (
            <div className="mb-3 ps-2  pe-2 ">
              <label
                className="mb-1"
                style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}
              >
                Select Status{" "}
                          <span style={{ color: "red", fontSize: "20px" }}>
                            {" "}
                            *{" "}
                          </span>
              </label>
              <Form.Select
                aria-label="Default select example"
                value={statusAmni}
                className="border"
                onChange={(e) => handleStatusAmnities(e)}
                style={{
                  fontSize: 16,
                  backgroundColor: "transparent",
                  height: 45,
                  borderRadius: 8,
                  opacity: 1,
                  fontWeight: 500,
                  fontFamily: "Gilroy",
                  color:"grey",
                  cursor:"pointer"
                  
                }}
              >
                <option
                  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    opacity:1
                  }}
                >
                  Select Status
                </option>

                <option value="1"   style={{
                    fontSize: 16,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    opacity:1,
                    color: "gray",
                    cursor:"pointer"
                  }}>Active</option>
                <option value="0"  style={{
                    fontSize: 16,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    opacity:1,
                    color: "gray",
                    cursor:"pointer"
                  }}>In Active</option>
              </Form.Select>
              {selectError && (
                <div style={{ color: "red" }}>
                  <MdError style={{ fontSize: "13px", marginRight: "5px" }} />
                  <label
                    className="mb-0"
                    style={{
                      color: "red",
                      fontSize: "12px",
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                    }}
                  >
                    {selectError}
                  </label>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
 {state.createAccount?.networkError ?
            <div className='d-flex  align-items-center justify-content-center  mb-4'>
              <MdError style={{ color: "red", marginRight: '5px' }} />
              <label className="mb-0" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{state.createAccount?.networkError}</label>
            </div>
            : null}

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




        <Modal.Footer className="d-flex justify-content-center pt-0" style={{borderTop:"none"}}>
          <Button
            className="col-lg-12 col-md-12 col-sm-12 col-xs-12"
            style={{
              backgroundColor: "#1E45E1",
              fontWeight: 600,
              height: 50,
              borderRadius: 12,
              fontSize: 16,
              fontFamily: "Gilroy",
              
            }}
            onClick={() => {
              if (statusShow) {
                handleAmnitiesSelect();
              } else {
                handleAddUserAmnities();
              }
            }}
          >
            Add Amenities
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
        className=" booking-table-userlist  booking-table"
      >
          {sortedData?.length > 0 && (
        <div
          className="show-scrolls"
          style={{
            height:
              sortedData?.length >= 2 || sortedData?.length >= 2
                ? "130px"
                : "auto",
            overflow: "auto",
            borderTop: "1px solid #E8E8E8",
            marginBottom: 20,
            paddingRight: 0,
            paddingLeft: 0,
          }}
        >
          <Table
            responsive="md"
            style={{
              fontFamily: "Gilroy",
              color: "rgba(34, 34, 34, 1)",
              fontSize: 14,
              fontStyle: "normal",
              fontWeight: 500,
              position: "sticky",
              top: 0,
              zIndex: 1,
              borderRadius: 0,
            }}
          >
            <thead
              style={{
                fontFamily: "Gilroy",
                backgroundColor: "rgba(231, 241, 255, 1)",
                color: "rgba(34, 34, 34, 1)",
                fontSize: 12,
                fontStyle: "normal",
                fontWeight: 500,
                position: "sticky",
                top: 0,
                zIndex: 1,
              }}
            >
              <tr>
                <th
                  scope="col"
                  style={{
                    textAlign: "center",
                    color: "#939393",
                    fontWeight: 500,
                    fontSize: "12px",
                    fontFamily: "Gilroy",
                    paddingTop: "5px",
                    paddingBottom: "10px",
                  }}
                >
                  <div className="d-flex gap-1 align-items-center justify-content-start">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <ArrowUp2
                        size="10"
                        variant="Bold"
                        color="#1E45E1"
                        onClick={() => handleSort("Amnities_Name", "asc")}
                        style={{ cursor: "pointer" }}
                      />
                      <ArrowDown2
                        size="10"
                        variant="Bold"
                        color="#1E45E1"
                        onClick={() => handleSort("Amnities_Name", "desc")}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    Amenities
                  </div>
                </th>
                <th
                  scope="col"
                  style={{
                    color: "#939393",
                    fontWeight: 500,
                    fontSize: "12px",
                    fontFamily: "Gilroy",
                   
                  }}
                >
                  <div className="d-flex gap-1 align-items-center justify-content-start">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <ArrowUp2
                        size="10"
                        variant="Bold"
                        color="#1E45E1"
                        onClick={() => handleSort("created_At", "asc")}
                        style={{ cursor: "pointer" }}
                      />
                      <ArrowDown2
                        size="10"
                        variant="Bold"
                        color="#1E45E1"
                        onClick={() => handleSort("created_At", "desc")}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    Date
                  </div>
                </th>
                <th
                  scope="col"
                  style={{
                    color: "#939393",
                    fontWeight: 500,
                    fontSize: "12px",
                    fontFamily: "Gilroy",
                  
                  }}
                >
                  <div className="d-flex gap-1 align-items-center justify-content-start">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <ArrowUp2
                        size="10"
                        variant="Bold"
                        color="#1E45E1"
                        onClick={() => handleSort("month_name", "asc")}
                        style={{ cursor: "pointer" }}
                      />
                      <ArrowDown2
                        size="10"
                        variant="Bold"
                        color="#1E45E1"
                        onClick={() => handleSort("month_name", "desc")}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    Subscription
                  </div>
                </th>
                <th
                  scope="col"
                  style={{
                    color: "#939393",
                    fontWeight: 500,
                    fontSize: "12px",
                    fontFamily: "Gilroy",
                    
                  }}
                >
                  <div className="d-flex gap-1 align-items-center justify-content-start">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <ArrowUp2
                        size="10"
                        variant="Bold"
                        color="#1E45E1"
                        onClick={() => handleSort("Amount", "asc")}
                        style={{ cursor: "pointer" }}
                      />
                      <ArrowDown2
                        size="10"
                        variant="Bold"
                        color="#1E45E1"
                        onClick={() => handleSort("Amount", "desc")}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    Amount
                  </div>
                </th>
                <th
                  scope="col"
                  style={{
                    color: "#939393",
                    fontWeight: 500,
                    fontSize: "12px",
                    fontFamily: "Gilroy",
                   
                  }}
                >
                  <div className="d-flex gap-1 align-items-center justify-content-start">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "2px",
                      }}
                    >
                      <ArrowUp2
                        size="10"
                        variant="Bold"
                        color="#1E45E1"
                        onClick={() => handleSort("status", "asc")}
                        style={{ cursor: "pointer" }}
                      />
                      <ArrowDown2
                        size="10"
                        variant="Bold"
                        color="#1E45E1"
                        onClick={() => handleSort("status", "desc")}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    Status
                  </div>
                </th>
                <th
                  scope="col"
                  style={{
                    color: "#939393",
                    fontWeight: 500,
                    fontSize: "12px",
                    fontFamily: "Gilroy",
                  
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>

            <tbody style={{ verticalAlign: "middle" }}>
              {sortedData &&
                sortedData?.map((v) => {
                  let Datform = new Date(v.created_At);

                  let day = Datform.getDate();
                  let month = Datform.getMonth() + 1;
                  let year = Datform.getFullYear();

                  let formattedDate = `${day}/${month}/${year}`;

                  return (
                    <tr key={v.amenity_Id}>
                      <td
                        style={{
                          textAlign: "start",
                          fontWeight: 500,
                          fontSize: "13px",
                          fontFamily: "Gilroy",
                          paddingLeft:20, borderBottom: "1px solid #E8E8E8"

                        }}
                        className="ps-2 ps-sm-2 ps-md-3 ps-lg-3"
                      >
                        <div className="ps-1">{v.Amnities_Name}</div>
                     
                      </td>
                      <td style={{borderBottom: "1px solid #E8E8E8"}} className="ps-2 ps-sm-2 ps-md-3 ps-lg-3">
                        <span
                          style={{
                            backgroundColor: "#EBEBEB",
                            padding: "3px 3px 3px 3px",
                            borderRadius: "10px",
                            lineHeight: "1.5em",
                            margin: "0",
                            marginLeft:4,
                            fontSize: 13,
                            fontWeight: 500,
                            fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8"
                          }}
                        >
                          {formattedDate}
                        </span>
                      </td>
                      <td
                        style={{
                          fontWeight: 500,
                          fontSize: "13px",
                          fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8"
                        }}
                        className="ps-2 ps-sm-2 ps-md-3 ps-lg-3"
                      >
                        <div className="ps-1">{v.month_name}</div>
                      </td>
                      <td
                        style={{
                          fontWeight: 500,
                          fontSize: "13px",
                          fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8"
                        }}
                        className="ps-2 ps-sm-2 ps-md-3 ps-lg-3"
                      >
                         <div style={{marginLeft:7}}>{v.Amount}</div>
                      </td>
                      <td
                        style={{
                          fontWeight: 500,
                          fontSize: "13px",
                          fontFamily: "Gilroy", borderBottom: "1px solid #E8E8E8"
                        }}
                        className="ps-2 ps-sm-2 ps-md-3 ps-lg-2" 
                      >
                        <span
                          style={{
                            color: "black",
                            backgroundColor:
                              v.status === 1 ? "#D9FFD9" : "#FFD9D9", 
                            paddingTop: "2px",
                            paddingLeft: "10px",
                            paddingRight: "10px",
                            paddingBottom: "2px",
                            borderRadius: "5px",
                            marginLeft:5
                          }}
                        >
                          {v.status === 1 ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td style={{ borderBottom: "1px solid #E8E8E8"}}>
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
                            backgroundColor: activeDotsId === v.id ? "#E7F1FF" : "white", 

                          }}
                        >
                          <PiDotsThreeOutlineVerticalFill
                            style={{ height: 20, width: 20 }}
                          />
                        </div>

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
          )}
      </div>
      {amnitiesFilterddata?.length >= 2 && (
        <>
          <nav className="position-fixed bottom-0 end-0 mb-3 me-3 d-flex justify-content-end align-items-center"
          
          >
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
                <option value={2}>2</option>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            <ul
              style={{
                display: "flex",
                alignItems: "center",
                listStyleType: "none",
                margin: 0,
                padding: 0,
              }}
            >
              <li style={{ margin: "0 10px" }}>
                <button
                  style={{
                    padding: "5px",
                    textDecoration: "none",
                    color: amnitiescurrentPage === 1 ? "#ccc" : "#1E45E1",
                    cursor:
                      amnitiescurrentPage === 1 ? "not-allowed" : "pointer",
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

              <li
                style={{
                  margin: "0 10px",
                  fontSize: "14px",
                  fontWeight: "bold",
                }}
              >
                {amnitiescurrentPage} of {totalPagesAmnities}
              </li>

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
        </>
      )}
    </div>
  );
}
UserListAmenities.propTypes = {
  hostelIds: PropTypes.func.isRequired,
  customerUser_Id: PropTypes.func.isRequired,
  hostelName: PropTypes.func.isRequired,
  id: PropTypes.func.isRequired,
};
export default UserListAmenities;
