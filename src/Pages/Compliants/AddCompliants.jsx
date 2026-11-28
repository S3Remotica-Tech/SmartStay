/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState, useEffect } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import "flatpickr/dist/themes/material_blue.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

import { DatePicker } from "antd";
import dayjs from "dayjs";
import { CloseCircle } from "iconsax-react";
import ErrorMessage from "../../Components/ErrorMessage";
import PropTypes from "prop-types";
import {
  datePickerClass,
  fieldClass,
  fieldLabelClass,
  fieldRequiredClass,
  fieldSelectStyles,
} from "../../Utils/FieldStyles";


function AddCompliants({ show, handleClose, edit, ComplaintData }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  // const { RangePicker } = DatePicker;
  const initialValuesRef = useRef({});
  const [formLoading, setFormLoading] = useState(false);

  const complaintList = useSelector(
    (state) => state.Settings.Complainttypelist,
  );

  const [selectedUsername, setSelectedUserName] = useState("");
  const [usererrmsg, setUserErrmsg] = useState("");
  const customerSelectRef = useRef(null);
  const [complainttypelist, setComplainttypelist] = useState([]);
  const [Complainttype, setComplainttype] = useState("");
  const [complaint_typeerrmsg, setComplaintTypeErrmsg] = useState("");
  const [complaintId, setComplaintId] = useState("");
  const [editcomplainttype, setEditcomplainttype] = useState("");
  const [floorname, setFloorname] = useState("");
  const [room_name, setRoomName] = useState("");
  // const [userid, setUser_Id] = useState("");
  const [Floor, setFloor] = useState("");
  const [Rooms, setRooms] = useState("");
  const [beds, setBeds] = useState("");
  const [bed_name, setBedName] = useState("");
  const [totalErrormsg, setTotalErrmsg] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const calendarRef = useRef(null);
  const [joiningDateErrmsg, setJoingDateErrmsg] = useState("");
  const [dateerrmsg, setDateErrmsg] = useState("");
  const [description, setDescription] = useState("");

  const CustomerOverview = state.UsersList?.customerdetails?.hostelInfo;

  const options = {
    dateFormat: "d/m/Y",
    defaultDate: null,
    maxDate: new Date(),
    minDate: null,
  };

  useEffect(() => {
    if (calendarRef.current) {
      calendarRef.current.flatpickr.set(options);
      setDateErrmsg("");
    }
  }, [selectedDate]);

  useEffect(() => {
    if (!selectedUsername) return;
    dispatch({
      type: "CUSTOMERDETAILS",
      payload: { customerId: selectedUsername },
    });
  }, [selectedUsername]);



  useEffect(() => {
    if (selectedUsername) {
      if (CustomerOverview) {
        //  setHostelName(firstFilteredDetail.HostelName || "");
        setFloor(CustomerOverview.floorId || "");
        setBeds(CustomerOverview.bedId || "");
        setBedName(CustomerOverview.bedName || "");
        setRooms(CustomerOverview.roomId || "");
        // setSelectedUserName(state.UsersList?.customerdetails?.customerId || "");
        setRoomName(CustomerOverview.roomName || "");
        setFloorname(CustomerOverview.floorName || "");
      } else {
        // setHostelName("");
        setBeds("");
        setBedName("");
        setFloor("");
        setRooms("");
        setFloorname("");
      }
    } else {
      //   setHostelName("");
      setBeds("");
      setBedName("");
      setFloor("");
      setRooms("");
      setFloorname("");
    }
  }, [selectedUsername, CustomerOverview]);

  const handleCheckoutChange = (selectedOption) => {
    setSelectedUserName(selectedOption?.value || "");
    if (!selectedOption) {
      setUserErrmsg("Please Select Name");
    } else {
      setUserErrmsg("");
    }
  };

  const handleComplaintType = (selectedOption) => {
    setComplainttype(selectedOption?.value || "");
    if (!selectedOption) {
      setComplaintTypeErrmsg("Please Select ComplaintType");
    } else {
      setComplaintTypeErrmsg("");
    }
  };

  useEffect(() => {
    if (state.createAccount?.networkError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_NETWORK_ERROR" });
      }, 3000);
    }
  }, [state.createAccount?.networkError]);

  const current = selectedDate ? dayjs(selectedDate) : null;
  const initial = initialValuesRef.current.selectedDate
    ? dayjs(initialValuesRef.current.selectedDate)
    : null;

  const hasChanges =
    description !== initialValuesRef.current.description ||
    !current?.isSame(initial, "day");

  const handleAddcomplaint = () => {
    if (edit && !hasChanges) {
      setTotalErrmsg("No changes detected");
      setTimeout(() => {
        setTotalErrmsg("");
      }, 10000);
      return;
    }
    let isValid = true;

    if (!selectedUsername) {
      setUserErrmsg("Please Select Tenant");
      isValid = false;
    }

    if (!Complainttype) {
      setComplaintTypeErrmsg("Please Select  Complaint Type");
      isValid = false;
    }

    if (!selectedDate) {
      setDateErrmsg("Please Select date");
      isValid = false;
    }

    if (!isValid) return;

    // setEdit(false)

    // const formattedDate = selectedDate ? moment(selectedDate).format('DD-MM-YYYY') : '';
    const formattedDate = selectedDate
      ? selectedDate.format("DD-MM-YYYY")
      : null;

    const payload = {
      customerId: selectedUsername,
      complaintTypeId: Complainttype,
      floorId: Floor,
      roomId: Rooms,
      bedId: beds,
      complaintDate: formattedDate,
      description: description || "",
      hostelId: state.login.selectedHostel_Id,
    };

    if (edit) {
      dispatch({
        type: "EDIT_COMPLAINT",
        payload: {
          complaintId: complaintId,
          complaintDate: formattedDate,
          description: description,
        },
      });
      setFormLoading(true);
    } else {
      dispatch({ type: "COMPLIANCE-ADD", payload });
      setFormLoading(true);
    }
  };

  useEffect(() => {
    if (customerSelectRef.current) {
      customerSelectRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setComplainttypelist(state.Settings.Complainttypelist);
  }, [state.Settings.Complainttypelist]);

  useEffect(() => {
    if (hasChanges) {
      setTotalErrmsg("");
    }
  }, [
    selectedUsername,
    Complainttype,
    description,
    selectedDate,
    beds,
    Rooms,
    Floor,
  ]);

  useEffect(() => {
    if (state.ComplianceList.statusCodeForEditCompliant === 200) {
      setFormLoading(false);
    }
  }, [state.ComplianceList.statusCodeForEditCompliant]);

  useEffect(() => {
    if (state?.ComplianceList?.errorMessageCompliants) {
      setFormLoading(false);
      dispatch({ type: 'REMOVE_EDIT_COMPLAINT_FAILURE' })
    }

  }, [state.ComplianceList?.errorMessageCompliants])

  useEffect(() => {
    if (ComplaintData) {
      setComplaintId(ComplaintData.complaintId);
      setSelectedUserName(ComplaintData?.customerId);
      setComplainttype(ComplaintData.complaintTypeId);
      setEditcomplainttype(ComplaintData.complaintTypeId);
      //   setAssign(ComplaintData.Assign);
      setDescription(ComplaintData.description);
      // setSelectedDate(Complaintdata.complaintDate);
      const complaintDate = ComplaintData.complaintDate
        ? dayjs(ComplaintData.complaintDate, "DD/MM/YYYY")
        : null;
      setSelectedDate(complaintDate);
      // Remember the loaded values so "No changes detected" can work on edit.
      initialValuesRef.current = {
        selectedDate: complaintDate,
        description: ComplaintData.description,
      };
      setBeds(ComplaintData.bedId);
      setBedName(ComplaintData.bedName);
      setFloor(ComplaintData.Floor_id);
      setRooms(ComplaintData.Room);
    }
  }, [ComplaintData]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute top-2 right-2 bottom-2 w-full max-w-2xl bg-white rounded-xl shadow-xl flex flex-col font-gilroy">
        <div className=" flex justify-between mb-2 pt-0 border-0 m-4">
          <div className="text-xl font-semibold font-gilroy">
            {edit ? "Edit Compliant" : "Add an complaint"}
          </div>

          <CloseCircle data-testid="add-compliants-close-icon"
            size="24"
            color="#000"
            onClick={handleClose}
            className="cursor-pointer"
          />
        </div>

        <div className="mx-4 flex-1 overflow-y-auto mx-2 my-2 show-scrolls max-h-[500px]">
          {Array.isArray(complaintList) && complaintList.length === 0 && (
            <ErrorMessage className="mt-[6px]"
              message={[
                " Please Create Complaint Type in Settings-Complaint  before adding an complaint",
              ]}
              type="error"
            />
          )}

          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-12">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className={fieldLabelClass}>
                  Tenant <span className={fieldRequiredClass}>*</span>
                </Form.Label>

                <div data-testid="add-compliants-tenant-select" className="contents"><Select
                  isDisabled={edit}
                  ref={customerSelectRef}
                  options={(state?.UsersList?.TenantList || []).map((u) => ({
                    value: u.customerId,
                    label: u.fullName || u.firstName || "Unnamed",
                  }))}
                  onChange={handleCheckoutChange}
                  value={
                    selectedUsername
                      ? (() => {
                        const user = (
                          state?.UsersList?.TenantList || []
                        ).find((u) => u.customerId === selectedUsername);

                        return user
                          ? {
                            value: user.customerId,
                            label: user.fullName || user.firstName,
                          }
                          : null;
                      })()
                      : null
                  }
                  styles={fieldSelectStyles(!!usererrmsg)}
                /></div>

                {usererrmsg.trim() !== "" && (
                  <ErrorMessage className="mt-[6px]" message={usererrmsg} type="error" />
                )}
              </Form.Group>
            </div>

            <div className="col-span-12 ">
              <label className={fieldLabelClass}>
                Complaint Type <span className={fieldRequiredClass}>*</span>
              </label>
              <div data-testid="add-compliants-complaint-type-select" className="contents"><Select
                options={
                  Array.isArray(complainttypelist) &&
                    complainttypelist.length > 0
                    ? complainttypelist.map((u) => ({
                      value: u.complaintTypeId,
                      label: u.complaintTypeName,
                    }))
                    : []
                }
                onChange={handleComplaintType}
                value={
                  edit && editcomplainttype
                    ? {
                      value: editcomplainttype,
                      label:
                        complainttypelist.find(
                          (c) => c.complaintTypeId === editcomplainttype,
                        )?.complaintTypeName || editcomplainttype,
                    }
                    : Complainttype
                      ? {
                        value: Complainttype,
                        label:
                          complainttypelist.find(
                            (c) => c.complaintTypeId === Complainttype,
                          )?.complaintTypeName || Complainttype,
                      }
                      : null
                }
                placeholder="Select a type"
                menuPlacement="auto"
                isDisabled={edit}
                components={
                  edit
                    ? {
                      DropdownIndicator: () => null,
                      IndicatorSeparator: () => null,
                    }
                    : undefined
                }
                noOptionsMessage={() => "No complaint types available"}
                styles={fieldSelectStyles(!!complaint_typeerrmsg)}
              /></div>

              {complaint_typeerrmsg.trim() !== "" && (
                <ErrorMessage className="mt-[6px]" message={complaint_typeerrmsg} type="error" />
              )}
            </div>

            {state?.Settings?.Complainttypelist &&
              state?.Settings?.Complainttypelist?.complaint_types?.length ===
              0 && (
                <>
                  <label className="pb-1 text-sm text-red-600 font-medium font-gilroy">
                    * Please add a &apos;ComplaintType&apos; option in Settings,
                    accessible after adding an Complaints.
                  </label>
                </>
              )}

            <div className="col-span-12 md:col-span-6 lg:col-span-6 -mt-2">
              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label className={fieldLabelClass}>
                  Floor <span className={fieldRequiredClass}>*</span>
                </Form.Label>
                <Form.Control data-testid="add-compliants-floor-input"
                  type="text"
                  placeholder="Floor"
                  value={floorname}
                  readOnly
                  className={fieldClass()}
                />
              </Form.Group>
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-6 -mt-2">
              <Form.Group controlId="exampleForm.ControlInput3">
                <Form.Label className={fieldLabelClass}>
                  Room <span className={fieldRequiredClass}>*</span>
                </Form.Label>
                <Form.Control data-testid="add-compliants-room-input"
                  type="text"
                  placeholder="Rooms"
                  value={room_name}
                  readOnly
                  className={fieldClass()}
                />
              </Form.Group>
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-6 -mt-2">
              <Form.Group className="" controlId="exampleForm.ControlInput1">
                <Form.Label className={fieldLabelClass}>
                  Bed <span className={fieldRequiredClass}>*</span>
                </Form.Label>
                <Form.Control data-testid="add-compliants-bed-input"
                  type="text"
                  placeholder="Beds"
                  value={bed_name}
                  readOnly
                  className={fieldClass()}
                />
              </Form.Group>
            </div>

            <div className="col-span-12 md:col-span-6 lg:col-span-6 -mt-2">
              <Form.Group controlId="purchaseDate">
                <Form.Label className={fieldLabelClass}>
                  Complaint Date <span className={fieldRequiredClass}>*</span>
                </Form.Label>

                <div className="datepicker-wrapper w-full relative">
                  <DatePicker data-testid="add-compliants-complaint-date"
                    wrapperClassName="w-full"
                    className={datePickerClass(!!dateerrmsg)}
                    format="DD/MM/YYYY"
                    placeholder="DD/MM/YYYY"
                    value={selectedDate ? dayjs(selectedDate) : null}
                    onChange={(date) => {
                      setDateErrmsg("");
                      setJoingDateErrmsg("");
                      setSelectedDate(date);
                    }}
                    disabledDate={(current) => {
                      if (!selectedUsername) {
                        return true;
                      }

                      if (!CustomerOverview || !CustomerOverview.joiningDate) {
                        return current && current > dayjs().endOf("day");
                      }

                      const bookedDate = dayjs(
                        CustomerOverview.joiningDate,
                        "DD/MM/YYYY",
                      );
                      return (
                        (current && current < bookedDate.startOf("day")) ||
                        (current && current > dayjs().endOf("day"))
                      );
                    }}
                    getPopupContainer={(triggerNode) =>
                      triggerNode.closest(".datepicker-wrapper")
                    }
                  />
                </div>
                {dateerrmsg.trim() !== "" && (
                  <ErrorMessage className="mt-[6px]" message={dateerrmsg} type="error" />
                )}
                {joiningDateErrmsg.trim() !== "" && (
                  <ErrorMessage className="mt-[6px]" message={joiningDateErrmsg} type="error" />
                )}
              </Form.Group>
            </div>

            <div className="col-span-12 ">
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label className={fieldLabelClass}>
                  Description
                </Form.Label>

                <Form.Control data-testid="add-compliants-description-input"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  placeholder="Enter description"
                  className={fieldClass(!!totalErrormsg)}
                />
              </Form.Group>
            </div>
          </div>
        </div>

        {formLoading && (
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                  flex items-center justify-center bg-transparent opacity-75 z-10"
          >
            <div className="w-10 h-10 border-t-4 border-r-4 border-blue-700 border-r-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {totalErrormsg.trim() !== "" && (
          <div className="d-flex justify-content-center mb-2">
            <ErrorMessage className="mt-[6px]" message={totalErrormsg} type="error" />
          </div>
        )}

        <div className="m-4 flex justify-end">
          <Button data-testid="add-compliants-addcomplaint-btn"
            disabled={formLoading}
            className="w-full !bg-blue-700 !font-gilroy text-white font-medium font-gilroy text-base h-12 rounded-xl"
            onClick={handleAddcomplaint}
          >
            {edit ? "Save complaint" : "Add complaint"}
          </Button>
        </div>
      </div>
    </div>
  );
}
AddCompliants.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  edit: PropTypes.bool.isRequired,

  ComplaintData: PropTypes.shape({
    complaintId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    customerId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    complaintTypeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    description: PropTypes.string,

    complaintDate: PropTypes.string,

    bedId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    bedName: PropTypes.string,

    Floor_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    Room: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
};
export default AddCompliants;
