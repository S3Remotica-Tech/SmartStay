/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Nav from "react-bootstrap/Nav";
import AddCustomer from "./AddCustomerPG";
// import { MdError } from "react-icons/md";
import PropTypes from "prop-types";
import { CloseCircle } from "iconsax-react";
import { DatePicker } from "antd";
import { Form } from "react-bootstrap";
import dayjs from "dayjs";
import moment from "moment";
import ErrorMessage from "../../Components/ErrorMessage";

function DeleteBed({ show, handleClose, deleteBedDetails }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [actionType, setActionType] = useState("addCustomer");
  const [showAddCustomer, setShowAddCustomer] = useState(false);
  const [advanceForm, setAdvanceForm] = useState(false);
  const [user_details, setUserDetails] = useState("");
  const { bed } = deleteBedDetails;
  const [formLoading, setFormLoading] = useState(false);
  const [advanceDate, setAdvanceDate] = useState(null);
  const [advanceDueDate, setAdvanceDueDate] = useState(null);
  const [advanceDateError, setAdvanceDateError] = useState("");
  const [advanceDueDateError, setAdvanceDueDateError] = useState("");

  const handleDeleteBed = () => {
    dispatch({ type: "CLEAR_DELETE_BED_ERROR" });
    if (deleteBedDetails?.bed.id) {
      dispatch({
        type: "DELETEBED",
        payload: {
          // hostelId: room.Hostel_Id,
          // floorId: room.Floor_Id,
          // roomNo: room.Room_Id,
          bedId: bed.id,
        },
      });
      setFormLoading(true);
    }
  };

  const handleshowAdvanceForm = (data) => {
    setUserDetails(data);
  };

  const handleCloseAdvanceForm = () => {
    setAdvanceForm(false);
  };

  useEffect(() => {
    if (user_details) {
      setAdvanceForm(true);
      setFormLoading(false);
    }
  }, [user_details]);

  const handleShow = (type) => {
    setActionType(type);
  };

  useEffect(() => {
    if (state.PgList?.deleteBedError) {
      setFormLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_BED_ERROR" });
      }, 3000);
    }
  }, [state.PgList?.deleteBedError]);

  useEffect(() => {
    if (
      state.PgList.statusCodeDeleteBed === 200 ||
      state.PgList.statusCodeDeleteBed === 204
    ) {
      handleClose();
      setFormLoading(false);
    }
  }, [state.PgList.statusCodeDeleteBed]);

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        dialogClassName="!max-w-md !w-full"
      >
        <Modal.Header className="!flex !justify-center !border-0 !pb-0">
          <Modal.Title className="!text-lg !font-semibold !font-gilroy">
            Delete Bed ?
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="!relative !text-gray-600 !text-center !pt-3 !pb-2 !text-base !font-medium !font-gilroy">
          Are you sure you want to delete the bed?
          {/* {`Are you sure you want to delete the bed ${deleteBedDetails.bed.bed_no}?`} */}
        </Modal.Body>

        {/* {state.PgList?.deleteBedError && (
    <ErrorMessage message={state.PgList?.deleteBedError} type="error"/>
  )} */}

        {/* {formLoading && (
          <div className="!absolute !inset-0 !flex !items-center !justify-center !bg-transparent !opacity-75 !z-10">
            <div className="!w-10 !h-10 !rounded-full !border-4 !border-t-[#1E45E1] !border-r-transparent !animate-spin" />
          </div>
        )} */}

        <Modal.Footer className="!flex !justify-center !gap-4 !mb-2 !border-0">
          <Button
            onClick={handleClose}
            className="!w-[130px] !h-[52px] !rounded-lg !border !border-[#1E45E1] !bg-white !text-[#1E45E1] !text-sm !font-semibold !font-gilroy"
          >
            Cancel
          </Button>

          <Button
            disabled={formLoading}
            onClick={handleDeleteBed}
            className={`
    !w-[130px]
    !h-[52px]
    !rounded-lg
    !border
    !border-[#1E45E1]
    !bg-[#1E45E1]
    !text-white
    !text-sm
    !font-semibold
    !font-gilroy
    ${formLoading ? "!opacity-70 !cursor-not-allowed" : ""}
  `}
          >
            {formLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Deleting...
              </div>
            ) : (
              "Delete"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {showAddCustomer && (
        <AddCustomer
          show={showAddCustomer}
          setShowAddCustomer={setShowAddCustomer}
          currentItem={deleteBedDetails}
          advanceForm={advanceForm}
          setAdvanceForm={setAdvanceForm}
          onclickdata={handleshowAdvanceForm}
        />
      )}
    </div>
  );
}
DeleteBed.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  deleteBedDetails: PropTypes.func.isRequired,
};
export default DeleteBed;
