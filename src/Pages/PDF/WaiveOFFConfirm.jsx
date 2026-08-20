/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
// import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

function WaiveOFFConfirm({ show, handleClose }) {
  //   const state = useSelector((state) => state);
  //   const dispatch = useDispatch();
  //   const [formLoading, setFormLoading] = useState(false);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      centered
      backdrop="static"
      dialogClassName="!max-w-md !w-full"
    >
      <Modal.Header className="!flex !justify-center !border-0 !pb-0">
        <Modal.Title className="!text-lg !font-semibold !font-gilroy">
          Confirm Waive Off
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className="!relative !text-gray-600 !text-center !pt-3 !pb-2 !text-base !font-medium !font-gilroy">
        Are you sure you want to waive off this amount?
      </Modal.Body>

      <Modal.Footer className="!flex !justify-center !gap-4 !mb-2 !border-0">
        <Button
          onClick={handleClose}
          className="!w-[130px] !h-[52px] !rounded-lg !border !border-[#1E45E1] !bg-white !text-[#1E45E1] !text-sm !font-semibold !font-gilroy"
        >
          Cancel
        </Button>

        <Button
          className="!w-[130px] !h-[52px] !rounded-lg !border !border-[#1E45E1] !bg-[#1E45E1] !text-white !text-sm !font-semibold !font-gilroy"
          // onClick={confirmUnpaid}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
WaiveOFFConfirm.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};
export default WaiveOFFConfirm;
