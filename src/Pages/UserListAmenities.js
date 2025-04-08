/* eslint-disable react-hooks/exhaustive-deps */ 
import React, { useState, useEffect } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import {  Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MdError } from "react-icons/md";
import {ArrowLeft2, ArrowRight2,} from "iconsax-react";
import Modal from "react-bootstrap/Modal";
import { Button, Form, } from "react-bootstrap";
import cross from "../Assets/Images/cross.png";
import PropTypes from "prop-types";
import Select from "react-select";
import "./UserList.css";
import {CloseCircle} from "iconsax-react";

function UserListAmenities(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

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
  
    const amenitiesHistory = state.UsersList?.amnetieshistory?.filter((item) => {
      return String(item.amenity_Id) === String(value);
    });
  
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
  const[selectError,setSelectError] = useState("")

  const handleStatusAmnities = (e) => {
    setStatusAmni(e.target.value);
    setSelectError("")
  };
  const validateAssignField = (value, fieldName) => {
    if (
      !value ||
      value === "Select Status" 
      
    ) {
      switch (fieldName) {
        case "statusAmni":
          setSelectError("Status is Required");
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
const handleAmnitiesSelect = ()=>{
  if (!validateAssignField(statusAmni, "statusAmni"));
  if (statusAmni === "Select Status" || selectError) {
    setSelectError("Please Select a Valid Status");
    return;
  }
  if (statusAmni && statusShow) {
    dispatch({
      type: "AddUserAmnities",
      payload: {
        userID: props.customerUser_Id,
        amenityID: selectAmneties,
        Status:statusAmni,
        hostelID: props.hostelIds,
      },
    });
    setStatusAmni("");
    setselectAmneties("");
  }
}
  const handleAddUserAmnities = () => {
    if(selectAmneties){
      dispatch({
        type: "AddUserAmnities",
        payload: {
          hostelID: props.hostelIds,
          userID: props.customerUser_Id,
          amenityID: selectAmneties,
        },
      });
    }
      
      setStatusAmni("");
      setselectAmneties("");
    
  };

  

  const handleEdit = (v) => {
    setaddamenityShow(true);
    setstatusShow(true);
    setselectAmneties(v.amenity_Id);
  };
  const handleFormClose = ()=>{
    setSelectError("")
    setaddamenityShow(false);
    dispatch({type:'CLEAR_ERROR_USER_AMENITIES'})
  }
  useEffect(() => {
    if (state.UsersList.statusCustomerAddUser === 200) {
      handleFormClose()
    }
  }, [state.UsersList.statusCustomerAddUser]);

  const [amentiesrowsPerPage, setAmentiesrowsPerPage] = useState(10);
  const [amnitiescurrentPage, setAmnitycurrentPage] = useState(1);
  const [amnitiesFilterddata, setamnitiesFilterddata] = useState([]);
  const indexOfLastRowamneties = amnitiescurrentPage * amentiesrowsPerPage;
  const indexOfFirstRowamnities = indexOfLastRowamneties - amentiesrowsPerPage;
  const currentRowAmnities = amnitiesFilterddata?.slice(indexOfFirstRowamnities,indexOfLastRowamneties);

  console.log(" amnitiesFilterddata", amnitiesFilterddata)


  const handleAmnitiesPageChange = (amnitiespageNumber) => {
    setAmnitycurrentPage(amnitiespageNumber);
  };
  const handleItemsPerPageChange = (event) => {
    setAmentiesrowsPerPage(Number(event.target.value));
  };

  const totalPagesAmnities = Math.ceil(
    amnitiesFilterddata?.length / amentiesrowsPerPage
  );

 

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
              Please add a &apos;Amenities&apos; option in Settings, accessible after
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
        <Select 
 
  // isDisabled={edit} // if you want to disable based on a flag
  placeholder="Select an Amenities"
  value={
    state.UsersList?.customerdetails?.all_amenities
      ?.find((item) => item.Amnities_Id === selectAmneties)
      ? {
          value: selectAmneties,
          label: state.UsersList.customerdetails.all_amenities.find(
            (item) => item.Amnities_Id === selectAmneties
          )?.Amnities_Name,
        }
      : null
  }
  onChange={handleselect}
  options={state.UsersList?.customerdetails?.all_amenities?.map((item) => ({
    value: item.Amnities_Id,
    label: item.Amnities_Name,
  }))}
   classNamePrefix="custom"
  menuPlacement="auto"
  styles={{
    menu: (base) => ({
      ...base,
      maxHeight: "170px",
      overflowY: "auto",
      zIndex: 9999,
    }),
    menuList: (base) => ({
      ...base,
      maxHeight: "170px",
      overflowY: "auto",
      padding: 0,
      scrollbarWidth: "thin",
      cursor:"pointer"
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
       <Modal.Header
                          style={{ position: "relative" }}
                        >
                          <div
                            style={{
                              // marginTop: -20,
                              fontSize: 18,
                              fontWeight: 600,
                              fontFamily: "Gilroy", textAlign: "start",
      
                            }}
                          >
                           Add Amenities
                          </div>
                          {/* <button
                            type="button"
                            className="close"
                            aria-label="Close"
                            onClick={handleFormClose}
                            style={{
                              position: "absolute",
                              right: "15px",
                              marginTop: -10,
                              border: "1px solid black",
                              background: "transparent",
                              cursor: "pointer",
                              padding: "0",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              width: "24px",
                              height: "24px",
                              borderRadius: "50%",
                            }}
                          >
                            <span
                              aria-hidden="true"
                              style={{
                                fontSize: "30px",
                                paddingBottom: "6px",
                              }}
                            >
                              &times;
                            </span>
                          </button> */}
                          <CloseCircle size="24" color="#000" onClick={handleFormClose} 
            style={{ cursor: 'pointer' }}/>
                        </Modal.Header>

        <Modal.Body>
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
              Hostel Name
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
            <div className="mb-3 ps-2  pe-2 ">
              <label
                className="mb-1"
                style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy" }}
              >
                Select Status
              </label>
              <Form.Select
                aria-label="Default select example"
                value={statusAmni}
                className="border"
                onChange={(e) => handleStatusAmnities(e)}
                style={{
                  fontSize: 14,
                  backgroundColor: "#f8f9fa",
                  height: 45,
                  borderRadius: 8,
                  opacity:1,
                }}
              >
                <option
                  style={{
                    fontSize: 14,
                    fontWeight: 530,
                    fontFamily: "Gilroy",
                  }}
                >
                  Select Status
                </option>

                <option value="1">Active</option>
                <option value="0">In Active</option>
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
            // onClick={handleAddUserAmnities}
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
      <div className="show-scroll-amnities"
        style={{
          // height: "400px",
          height: currentRowAmnities.length >= 1 ? "110px" : "auto",
          overflowY: "auto",
          borderRadius: "24px",
          border: "1px solid #DCDCDC",
          // borderBottom:"none"
        }}
      >
        <Table
          responsive="md"
          className="Table_Design "
          style={{
            border: "1px solid #DCDCDC",
            borderBottom: "1px solid transparent",
            borderEndStartRadius: 0,
            borderEndEndRadius: 0,
          }}
        >
          <thead style={{ backgroundColor: "#E7F1FF",
             position:"sticky",
             top:0,
             zIndex:1,
           }}>
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
              <th scope="col"   style={{
                  color: "#939393",
                  fontWeight: 500,
                  fontSize: "14px",
                  fontFamily: "Gilroy",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                }}></th>
            </tr>
          </thead>

         
          <tbody  style={{ verticalAlign: "middle" }}>
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
                        {v.status === 1 ? "Active" : "Inactive"}
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
                          // zIndex: 1000,
                          
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
       {amnitiesFilterddata?.length >= 1 && (
<> 

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end", 
            padding: "10px",
         
          }}
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
