/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import Select from "react-select";
import "./UserList.css";
import { toast } from 'react-toastify';
import { CloseCircle, AddSquare } from "iconsax-react";
import { useHasPermission } from '../../Utils/Permission';
import ErrorMessage from '../../Components/ErrorMessage'
import Image from "react-bootstrap/Image";

function TenantAmenities({show, handleClose}) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [formLoading, setFormLoading] = useState(false)


  const [selectAmneties, setselectAmneties] = useState("");

  const [addamenityShow, setaddamenityShow] = useState(false);
  const [createby, setcreateby] = useState("");
  const [amnityError, setamnityError] = useState("");





  // const canReadAmenities = useHasPermission("Amenities", "canRead")
  //     const canWriteAmenities = useHasPermission("Amenities", "canWrite");
  //     const canUpdateAmenities = useHasPermission("Amenities", "canUpdate");
  //     const canDeleteAmenities = useHasPermission("Amenities", "canDelete");


  const {
    canWriteModule: canWriteAmenities,
    canReadModule: canReadAmenities,
    // canUpdateModule: canUpdateAmenities,
    canDeleteModule: canDeleteAmenities,
  } = useHasPermission("Amenities");


  const [CustomerOverView, setCustomerOverView] = useState([]);
  const [isTrigger, setIsTrigger] = useState(false)


  useEffect(() => {
    if (state.UsersList?.customerdetails?.amenities) {
      setCustomerOverView(state.UsersList.customerdetails.amenities);
    } else {
      setCustomerOverView([]);
    }
  }, [state.UsersList?.customerdetails?.amenities]);



  const handleselect = (selectedOption) => {
    const value = selectedOption?.value || "";

    setselectAmneties(value);

    if (value === "") {
      setamnityError("Please select a valid amenity");
      setaddamenityShow(false);
      return;
    } else {
      setamnityError("");
    }
    setaddamenityShow(true);
    setstatusShow(false);

  };


  const handleShowAssignAmenities = () => {

    setaddamenityShow(true);
    setstatusShow(false);

  };


    var toastStyle = {

    fontFamily: "Gilroy",
    fontWeight: 600,
    fontSize: 14,
    textAlign: "start",
    display: "flex",
    alignItems: "center",
    padding: "10px",

  }




useEffect(() => {
    if (state.InvoiceList.AmenitiesList) {
      if (state.InvoiceList.AmenitiesList.length === 0 && isTrigger) {
                 toast.error(
                "Please Create Amenities before assign amenities",
                {
                  hideProgressBar: true,
                  closeButton: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  style: toastStyle
                });
        setIsTrigger(false)
      }
     
    }
  }, [state.InvoiceList.AmenitiesList])







  useEffect(() => {
    if (
      state.InvoiceList.AmenitiesList &&
      state.InvoiceList.AmenitiesList.length > 0 &&
      selectAmneties
    ) {
      const AmnitiesNamelist =
        state.InvoiceList.AmenitiesList.filter((item) => {
          return String(item.amenityId) === String(selectAmneties);
        });
      setcreateby(AmnitiesNamelist);
    } else {
      setcreateby('');
    }
  }, [state.InvoiceList.AmenitiesList, selectAmneties, state.InvoiceList.tenantAssignStatus]);


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


  

  const handleAddUserAmnities = () => {
    if (!selectAmneties) {
      setamnityError("Please Select a Valid Amenity");
      return;
    }


    setamnityError("");

    if (selectAmneties) {
      dispatch({
        type: 'TENANTASSIGNAMENITIES',
        payload: {
          hostelId: state.login.selectedHostel_Id,
          newAmenities: [createby[0]?.amenityId],
          customerId: state.UsersList?.customerdetails?.customerId
        },
      })
      setFormLoading(true)
    }

    setStatusAmni("");
    setselectAmneties("");
  };

 



  useEffect(() => {

    if (state.InvoiceList.tenantAssignStatus === 201 || state.InvoiceList?.tenantUnAssignStatus === 201) {
      setFormLoading(false)

      setaddamenityShow(false);
      dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: state.UsersList?.customerdetails?.customerId } });
      setTimeout(() => {
        dispatch({ type: 'REMOVE_TENANT_ASSIGN_AMENITIES' })
        dispatch({ type: 'REMOVE_TENANT_UNASSIGN_AMENITIES' })

      }, 100)


    }

  }, [state.InvoiceList?.tenantAssignStatus, state.InvoiceList?.tenantUnAssignStatus])





  useEffect(() => {

    if (state.InvoiceList.UnAssignAmenitiesSuccessStatusCode === 200) {

      dispatch({ type: "CUSTOMERDETAILS", payload: { customerId: state.UsersList?.customerdetails?.customerId } });
      setTimeout(() => {
        dispatch({ type: 'REMOVE_UN_ASSIGN_AMENITIES_STATUS_CODE' })
      }, 100)


    }

  }, [state.InvoiceList.UnAssignAmenitiesSuccessStatusCode])


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
    setamnityError("");
handleClose()
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

  const amenitiesOptions = [
    { value: 2, label: "2" },
    { value: 5, label: "5" },
    { value: 10, label: "10" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ]

  const handleItemsPerPageChange = (selectedOption) => {
    setAmentiesrowsPerPage(selectedOption.value);
    setAmnitycurrentPage(1);
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


  useEffect(() => {

    if (state.login.selectedHostel_Id) {
      dispatch({ type: 'AMENITIESLIST', payload: state.login.selectedHostel_Id })
      setIsTrigger(true)
    }


  }, [state.login.selectedHostel_Id])



  










  return (
    <div className="container mt-3">



      <Modal
        show={show}
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
            Assign Amenities
          </div>

          <CloseCircle
            size="24"
            color="#000"
            onClick={handleFormClose}
            style={{ cursor: "pointer" }}
          />
        </Modal.Header>

        <Modal.Body className="pb-1 pt-2">
          <div className="row">

            <div className="d-flex align-items-center mb-3 ">
              <div

              >

                {state.UsersList.customerdetails?.profilePic ? (
                  <Image
                    src={state.UsersList.customerdetails.profilePic}
                    alt="Profile"
                    roundedCircle
                    style={{ height: 60, width: 60 }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = Profiles;
                    }}
                  />
                ) : (
                  <div
                    style={{
                      height: 60,
                      width: 60,
                      borderRadius: "50%",
                      backgroundColor: "#1E45E1",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: 24,
                      fontWeight: "600",
                      color: "#FFFFFF",
                      textTransform: "uppercase",
                    }}
                  >
                    {state.UsersList.customerdetails?.initials || "-"}
                  </div>
                )}



              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="ps-3">
                  <div>
                    <label
                      style={{
                        fontSize: 16,
                        fontWeight: 500,
                        color: "#222222",
                        fontFamily: "Gilroy",
                      }}
                    >
                      {state.UsersList.customerdetails.fullName}
                    </label>
                  </div>

                </div>

                <div className="d-flex flex-wrap gap-2 ms-2">

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      background: "#FFEFCF",
                      padding: "6px 12px",
                      borderRadius: "60px",
                      fontFamily: "Gilroy",
                      fontSize: 12,
                      color: "#222",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {state.UsersList.customerdetails?.hostelInfo?.floorName}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      background: "#FFE0D9",
                      padding: "6px 12px",
                      borderRadius: "60px",
                      fontFamily: "Gilroy",
                      fontSize: 12,
                      color: "#222",
                      fontWeight: 500,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {state.UsersList.customerdetails?.hostelInfo?.roomName}  -  {state.UsersList.customerdetails?.hostelInfo?.bedName}
                  </div>


                </div>
              </div>
            </div>
            <div
              className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3"
              style={{ marginTop: "-10px" }}
            >
              <Form.Label
                style={{ fontSize: "14px", fontWeight: 500, fontFamily: "Gilroy" }}
              > 
                Amenities {" "} <span
                                            style={{
                                                color: "red",
                                                fontSize: "20px",
                                            }}
                                        >
                                            *
                                        </span>
              </Form.Label>
              <Select
                isDisabled={!canWriteAmenities || state.UsersList.customerdetails?.hostelInfo?.currentStatus === "BOOKED" || state.UsersList.customerdetails?.customerCurrentStatus === "INACTIVE" || state.UsersList.customerdetails?.customerCurrentStatus === "VACATED"}
                placeholder="Select an Amenities"
                value={
                  state.InvoiceList.AmenitiesList?.find(
                    (item) => item.amenityId === selectAmneties
                  )
                    ? {
                      value: selectAmneties,
                      label: state.InvoiceList.AmenitiesList.find(
                        (item) => item.amenityId === selectAmneties
                      )?.amenityName,
                    }
                    : null
                }
                onChange={(e) => {
                  
                    handleselect(e);
                  
                }}
                options={state.InvoiceList.AmenitiesList
                  ?.filter(
                    (item) =>
                      !CustomerOverView?.some(
                        (c) => c.amenityId === item.amenityId
                      )
                  )
                  ?.map((item) => ({
                    value: item.amenityId,
                    label: item.amenityName,
                  }))}
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
                    opacity:  1,
                    color: "#000",
                    fontFamily: "Gilroy",
                  }),
                }}
              />
              {amnityError && (
                <ErrorMessage message={amnityError} type="error" />
              )}
            </div>
            {/* <div className="mb-3 ps-2 pe-2">
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
              value={createby[0]?.amenityName}
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
          </div> */}

            {/* <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3 ps-2 pe-2">
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
              value={state.UsersList.hotelDetailsinPg?.name}
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
          </div> */}

            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3 ps-2 pe-2">
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
                value={createby[0]?.amenityAmount}
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
                    color: "grey",
                    cursor: "pointer"

                  }}
                >
                  <option
                    style={{
                      fontSize: 16,
                      fontWeight: 500,
                      fontFamily: "Gilroy",
                      opacity: 1
                    }}
                  >
                    Select Status
                  </option>

                  <option value="1" style={{
                    fontSize: 16,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    opacity: 1,
                    color: "gray",
                    cursor: "pointer"
                  }}>Active</option>
                  <option value="0" style={{
                    fontSize: 16,
                    fontWeight: 500,
                    fontFamily: "Gilroy",
                    opacity: 1,
                    color: "gray",
                    cursor: "pointer"
                  }}>In Active</option>
                </Form.Select>
                {selectError && (
                  <ErrorMessage message={selectError} type="error" />
                )}
              </div>
            )}
          </div>
        </Modal.Body>


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




        <Modal.Footer className="d-flex justify-content-end pt-0" style={{ borderTop: "none" }}>
          <Button
            style={{
              backgroundColor: "white",
              fontWeight: 400,
              height: 40,
              borderRadius: 10,
              fontSize: 16,
              fontFamily: "Gilroy",
              color: 'rgba(75, 75, 75, 1)',
              border: '1px solid white'
            }}
            onClick={handleFormClose}
          >
            Cancel
          </Button>
          <Button
            disabled={!canWriteAmenities || state.UsersList.customerdetails?.hostelInfo?.currentStatus === "BOOKED" || state.UsersList.customerdetails?.customerCurrentStatus === "INACTIVE" || state.UsersList.customerdetails?.customerCurrentStatus === "VACATED"}
            className=""
            style={{
              backgroundColor: "#1E45E1",
              fontWeight: 600,
              height: 40,
              borderRadius: 12,
              fontSize: 16,
              fontFamily: "Gilroy",

            }}
            onClick={() => {
              
                handleAddUserAmnities();
              
            }}
          >
            Assign
          </Button>
        </Modal.Footer>
      </Modal>
      
    </div>

  );
}
TenantAmenities.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  // hostelName: PropTypes.func.isRequired,
  // id: PropTypes.func.isRequired,
  // customerAdd: PropTypes.func.isRequired,
};
export default TenantAmenities;
