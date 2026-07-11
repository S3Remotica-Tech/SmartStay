/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import Select from "react-select";
import "./UserList.css";
import { toast } from "react-toastify";
import { CloseCircle } from "iconsax-react";
import { useHasPermission } from "../../Utils/Permission";
import ErrorMessage from "../../Components/ErrorMessage";
import Image from "react-bootstrap/Image";

const CustomStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "50px",
    height: "45px",
    border: "1px solid #D9D9D9",
    borderRadius: "8px",
    fontSize: "15px",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: 500,
    boxShadow: "none",
    alignItems: "center",

    cursor: state.isDisabled ? "not-allowed" : "pointer",
    backgroundColor: state.isDisabled
      ? "#F3F4F6"
      : state.hasValue
        ? "#FFF"
        : "#fff",
    opacity: state.isDisabled ? 0.7 : 1,
  }),

  singleValue: (base, state) => ({
    ...base,
    color: state.isDisabled ? "#9CA3AF" : "#333",
    fontWeight: 600,
  }),

  placeholder: (base, state) => ({
    ...base,
    color: state.isDisabled ? "#9CA3AF" : "#6B7280",
  }),

  option: (base, state) => {
    const isSelected = state.isSelected;

    return {
      ...base,
      position: "relative",
      fontSize: 14,
      padding: "6px 12px",
      backgroundColor: isSelected
        ? "#EEF2FF"
        : state.isFocused
          ? "#F3F4F6"
          : "#fff",
      color: "#111827",
      cursor: "pointer",

      whiteSpace: "nowrap",
      overflow: "visible",

      paddingLeft: isSelected ? "9px" : "12px",

      ...(isSelected && {
        borderLeft: "3px solid #1E45E1",
        fontWeight: 500,
      }),
    };
  },

  menu: (base) => ({
    ...base,
    backgroundColor: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    padding: "6px 0",
    zIndex: 9999,
    width: "max-content",
    minWidth: "100%",
  }),

  menuList: (base) => ({
    ...base,
    maxHeight: "100px",
    padding: 0,
    overflowY: "auto",
  }),

  valueContainer: (base) => ({
    ...base,
    padding: "0 8px",
  }),

  indicatorsContainer: (base) => ({
    ...base,
    height: "45px",
  }),

  dropdownIndicator: (base, state) => ({
    ...base,
    padding: "4px",
    color: state.isDisabled ? "#D1D5DB" : "#6B7280",
    cursor: state.isDisabled ? "not-allowed" : "pointer",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),
};

function TenantAmenities({ show, handleClose }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [formLoading, setFormLoading] = useState(false);

  const [selectAmneties, setselectAmneties] = useState("");

  const [createby, setcreateby] = useState("");
  const [amnityError, setamnityError] = useState("");
  const CustomerOverView = state?.UsersList?.customerdetails;
  const { canWriteModule: canWriteAmenities } = useHasPermission("Amenities");

  console.log("CustomerOverView", CustomerOverView);

  const [isTrigger, setIsTrigger] = useState(false);

  const handleselect = (selectedOption) => {
    const value = selectedOption?.value || "";

    setselectAmneties(value);

    if (value === "") {
      setamnityError("Please select a valid amenity");

      return;
    } else {
      setamnityError("");
    }

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
  };

  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
      }, 100);
    }
  }, [state.UsersList?.accessRestrictionError]);

  useEffect(() => {
    if (CustomerOverView?.availableAmenitiesList) {
      if (CustomerOverView?.availableAmenitiesList?.length === 0 && isTrigger) {
        toast.error("Please Create Amenities before assign amenities", {
          hideProgressBar: true,
          closeButton: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: toastStyle,
        });
        setIsTrigger(false);
      }
    }
  }, [CustomerOverView?.availableAmenitiesList]);

  useEffect(() => {
    if (
      CustomerOverView?.availableAmenitiesList &&
      CustomerOverView?.availableAmenitiesList?.length > 0 &&
      selectAmneties
    ) {
      const AmnitiesNamelist = CustomerOverView?.availableAmenitiesList?.filter(
        (item) => {
          return String(item.amenityId) === String(selectAmneties);
        },
      );
      setcreateby(AmnitiesNamelist);
    } else {
      setcreateby("");
    }
  }, [
    CustomerOverView?.availableAmenitiesList,
    selectAmneties,
    state.InvoiceList.tenantAssignStatus,
  ]);

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
  // const validateAssignField = (value, fieldName) => {
  //   if (!value || value === "Select Status") {
  //     switch (fieldName) {
  //       case "statusAmni":
  //         setSelectError("Please Select Status");
  //         break;

  //       default:
  //         break;
  //     }
  //     return false;
  //   } else {
  //     switch (fieldName) {
  //       case "statusAmni":
  //         setSelectError("");
  //         break;

  //       default:
  //         break;
  //     }
  //     return true;
  //   }
  // };

  const handleAddUserAmnities = () => {
    if (!selectAmneties) {
      setamnityError("Please Select a Valid Amenity");
      return;
    }

    setamnityError("");

    if (selectAmneties) {
      dispatch({
        type: "TENANTASSIGNAMENITIES",
        payload: {
          hostelId: state.login.selectedHostel_Id,
          newAmenities: [createby[0]?.amenityId],
          customerId: state.UsersList?.customerdetails?.customerId,
        },
      });
      setFormLoading(true);
    }

    setStatusAmni("");
    setselectAmneties("");
  };

  useEffect(() => {
    if (
      state.InvoiceList.tenantAssignStatus === 201 ||
      state.InvoiceList?.tenantUnAssignStatus === 201
    ) {
      setFormLoading(false);

      // setaddamenityShow(false);
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: state.UsersList?.customerdetails?.customerId },
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE_TENANT_ASSIGN_AMENITIES" });
        dispatch({ type: "REMOVE_TENANT_UNASSIGN_AMENITIES" });
      }, 100);
    }
  }, [
    state.InvoiceList?.tenantAssignStatus,
    state.InvoiceList?.tenantUnAssignStatus,
  ]);

  useEffect(() => {
    if (state.InvoiceList.UnAssignAmenitiesSuccessStatusCode === 200) {
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: state.UsersList?.customerdetails?.customerId },
      });
      setTimeout(() => {
        dispatch({ type: "REMOVE_UN_ASSIGN_AMENITIES_STATUS_CODE" });
      }, 100);
    }
  }, [state.InvoiceList.UnAssignAmenitiesSuccessStatusCode]);

  // const [activeDotsId, setActiveDotsId] = useState(null);

  // const handleEdit = (v) => {
  //   setActiveDotsId((prev) => (prev === v.id ? null : v.id));
  //   setaddamenityShow(true);
  //   setstatusShow(true);
  //   setselectAmneties(v.amenity_Id);
  // };
  const handleFormClose = () => {
    setselectAmneties("");
    setSelectError("");
    // setaddamenityShow(false);
    // setActiveDotsId(null)
    setStatusAmni(false);
    setamnityError("");
    handleClose();
    dispatch({ type: "CLEAR_ERROR_USER_AMENITIES" });
  };
  useEffect(() => {
    if (state.UsersList.statusCustomerAddUser === 200) {
      setFormLoading(false);
      handleFormClose();
    }
  }, [state.UsersList.statusCustomerAddUser]);

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      // dispatch({
      //   type: "AMENITIESLIST",
      //   payload: state.login.selectedHostel_Id,
      // });
      setIsTrigger(true);
    }
  }, [state.login.selectedHostel_Id]);

  const amenityOptions =
    CustomerOverView?.availableAmenitiesList
      ?.filter((item) => !item.isRequested)
      ?.map((item) => ({
        value: item.amenityId,
        label: item.amenityName,
      })) || [];

  return (
    <>
      <Modal show={show} onHide={handleFormClose} backdrop="static" centered>
        <Modal.Header className="relative flex items-center justify-between">
          <div className="text-[18px] font-semibold font-gilroy text-start">
            Assign Amenities
          </div>

          <CloseCircle
            size="24"
            color="#000"
            onClick={handleFormClose}
            className="cursor-pointer"
          />
        </Modal.Header>

        <Modal.Body className="pt-2 pb-1 font-gilroy">
          <div className="flex flex-wrap -mx-0">
            <div className="flex items-center mb-3 -ml-2">
              <div>
                {state.UsersList.customerdetails?.profilePic ? (
                  <Image
                    src={state.UsersList.customerdetails.profilePic}
                    alt="Profile"
                    roundedCircle
                    className="h-16 w-18"
                    onError={(e) => {
                      e.target.onerror = null;
                    }}
                  />
                ) : (
                  <div className="p-2 h-14 w-14 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-[24px] font-semibold uppercase">
                    {state.UsersList.customerdetails?.initials || "-"}
                  </div>
                )}
              </div>

              <div className="flex flex-col">
                <div className="ps-3">
                  <div>
                    <label className="text-[16px] font-semibold text-[#222222] font-gilroy mb-2">
                      {state.UsersList.customerdetails.fullName}
                    </label>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 ms-2">
                  <div className="flex items-center bg-[#FFEFCF] px-3 py-[6px] rounded-[60px] text-[12px] font-medium text-[#222] font-gilroy whitespace-nowrap">
                    {state.UsersList.customerdetails?.hostelInfo?.floorName}
                  </div>

                  <div className="flex items-center bg-[#FFE0D9] px-3 py-[6px] rounded-[60px] text-[12px] font-medium text-[#222] font-gilroy whitespace-nowrap">
                    {state.UsersList.customerdetails?.hostelInfo?.roomName} -{" "}
                    {state.UsersList.customerdetails?.hostelInfo?.bedName}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full mb-3 -mt-2.5">
              <Form.Label className="text-[14px] font-medium font-gilroy ml-1">
                Amenities <span className="text-red-500 text-[20px]">*</span>
              </Form.Label>

              <Select
                isDisabled={
                  !canWriteAmenities ||
                  state.UsersList.customerdetails?.hostelInfo?.currentStatus ===
                    "BOOKED" ||
                  state.UsersList.customerdetails?.customerCurrentStatus ===
                    "INACTIVE" ||
                  state.UsersList.customerdetails?.customerCurrentStatus ===
                    "VACATED"
                }
                placeholder="Select an Amenities"
                value={
                  amenityOptions.find(
                    (option) => option.value === selectAmneties,
                  ) || null
                }
                onChange={(e) => {
                  handleselect(e);
                }}
                options={amenityOptions}
                classNamePrefix="custom"
                menuPlacement="auto"
                styles={CustomStyles}
              />
              {amnityError && (
                <ErrorMessage message={amnityError} type="error" />
              )}
            </div>

            <div className="w-full mb-3 px-2">
              <label className="mb-1 text-[14px] font-medium font-gilroy">
                Amount
              </label>
              <Form.Control
                placeholder="Amount"
                aria-label="Recipient's username"
                className="border rounded-[8px] h-[45px] text-gray-500 text-[16px] font-medium font-gilroy placeholder:text-gray-400 placeholder:text-[12px] opacity-100"
                aria-describedby="basic-addon2"
                value={createby[0]?.price}
                disabled
              />
            </div>

            {statusShow && (
              <div className="mb-3 px-2">
                <label className="mb-1 text-[14px] font-medium font-gilroy">
                  Select Status{" "}
                  <span className="text-red-500 text-[20px]">*</span>
                </label>

                <Form.Select
                  aria-label="Default select example"
                  value={statusAmni}
                  onChange={(e) => handleStatusAmnities(e)}
                  className="border text-[16px] bg-transparent h-[45px] rounded-[8px] opacity-100 font-medium font-gilroy text-gray-500 cursor-pointer"
                >
                  <option className="text-[16px] font-medium font-gilroy opacity-100">
                    Select Status
                  </option>

                  <option
                    value="1"
                    className="text-[16px] font-medium font-gilroy opacity-100 text-gray-500 cursor-pointer"
                  >
                    Active
                  </option>
                  <option
                    value="0"
                    className="text-[16px] font-medium font-gilroy opacity-100 text-gray-500 cursor-pointer"
                  >
                    In Active
                  </option>
                </Form.Select>
                {selectError && (
                  <ErrorMessage message={selectError} type="error" />
                )}
              </div>
            )}
          </div>
        </Modal.Body>

        {formLoading && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center bg-transparent opacity-75 z-10">
            <div className="w-10 h-10 rounded-full border-t-[4px] border-t-[#1E45E1] border-r-[4px] border-r-transparent animate-spin"></div>
          </div>
        )}

        <Modal.Footer
          className="d-flex justify-content-end pt-0"
          style={{ borderTop: "none" }}
        >
          <Button
            className="bg-white border border-white rounded-[10px] h-[40px] text-[16px] !font-semibold !font-gilroy !text-[#1E45E1]"
            onClick={handleFormClose}
          >
            Cancel
          </Button>
          <Button
            disabled={
              formLoading ||
              !canWriteAmenities ||
              state.UsersList.customerdetails?.hostelInfo?.currentStatus ===
                "BOOKED" ||
              state.UsersList.customerdetails?.customerCurrentStatus ===
                "INACTIVE" ||
              state.UsersList.customerdetails?.customerCurrentStatus ===
                "VACATED"
            }
            className="bg-[#1E45E1] !font-semibold h-[40px] rounded-[12px] text-[16px] !font-gilroy"
            onClick={() => {
              handleAddUserAmnities();
            }}
          >
            Assign
          </Button>
        </Modal.Footer>
      </Modal>
    </>
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
