/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Delete from '../../Assets/Images/Delete_red.png';
import Modal from "react-bootstrap/Modal";
import { Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
// import { FaCheck } from "react-icons/fa";
// import { useSelector } from 'react-redux';
import { useHasPermission } from '../../Utils/Permission';



const RecurringBillList = (props) => {
  // const state = useSelector((state) => state);
  // const [recurringBillDeletePermission, setRecurringBillDeletePermission] = useState("")
  const [deleteShow, setDeleteShow] = useState(false)
  // const dispatch = useDispatch()

  const handleDeleteForm = () => {
    setDeleteShow(true)
  }

  const handleCloseDelete = () => {
    setDeleteShow(false)
  }






  // useEffect(() => {
  //   const userType = props.billrolePermission[0]?.user_details?.user_type;
  //   const isAdmin = userType === "admin" || userType === "agent";
  //   if (isAdmin) {
  //     if (state?.login?.planStatus === 0) {
  //       setRecurringBillDeletePermission("Permission Denied");
  //     } else if (state?.login?.planStatus === 1) {
  //       setRecurringBillDeletePermission("");
  //     }
  //   }

  // }, [state?.login?.planStatus, state.login?.selectedHostel_Id, props.billrolePermission])



  // useEffect(() => {
  //   const billPermission = props.billrolePermission[0]?.role_permissions?.find(
  //     (perm) => perm.permission_name === "Recuring Bills"
  //   );

  //   const isOwner = props.billrolePermission[0]?.user_details?.user_type === "staff";
  //   const planActive = state?.login?.planStatus === 1;

  //   if (!billPermission || !isOwner) return;

  //   if (billPermission.per_delete === 1 && planActive) {
  //     setRecurringBillDeletePermission("");
  //   } else {
  //     setRecurringBillDeletePermission("Permission Denied");
  //   }
  // }, [props.billrolePermission, state?.login?.planStatus, state?.login?.selectedHostel_Id]);



  const [showDots, setShowDots] = useState('')
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const handleShowDots = (event) => {
    setShowDots(!showDots)
    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + (height / 2);
    const popupLeft = left - 150;

    setPopupPosition({ top: popupTop, left: popupLeft });
  }


  const handleDelete = () => {

    props.handleDeleteRecurringbills(props.item);

  }






  const popupRef = useRef(null);
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowDots(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  const {
    canDeleteModule: canDeleteRecurring,
    canUpdateModule: canUpdateRecurring
  } = useHasPermission("Recurring bills");



  return (

    <>

     
      <tr
        key={props.item.customerId}
        className="m-2 text-black font-gilroy text-sm align-middle"
      >
        <td className="text-center whitespace-nowrap" style={{borderBottom: '1px solid #E8E8E8'}}>
          <div className="flex items-center text-[13px] font-medium cursor-pointer">
              {props.item?.fullName}
          </div>
        </td>
        <td className="text-left align-middle text-[13px] font-medium text-black" style={{borderBottom: '1px solid #E8E8E8'}}>
          {props?.item?.lastInvoiceNumber || "-"}
        </td>
        <td className="text-left align-middle text-[13px] font-medium text-black " style={{borderBottom: '1px solid #E8E8E8'}}>
          {props.item?.lastInvoiceDate || "-"}
        </td>
        <td className="text-left align-middle text-[13px] font-medium text-black " style={{borderBottom: '1px solid #E8E8E8'}}>
          {props.item?.nextInvoiceDate || "-"}
        </td>
        <td className="text-left align-middle text-[13px] font-medium text-black " style={{borderBottom: '1px solid #E8E8E8'}}>
          ₹{(props?.item?.invoiceAmount || 0).toLocaleString("en-IN")}
        </td>
        <td className="text-left align-middle text-[13px] font-medium text-black " style={{borderBottom: '1px solid #E8E8E8'}}>
          <Form.Check
            type="switch"
            id="recurring-switch"
            checked={props.checked}
            disabled={!canUpdateRecurring}
            onChange={canUpdateRecurring ? props.onToggle : undefined}
          />
        </td>
        <td className="text-left" style={{borderBottom: '1px solid #E8E8E8'}}>
          <div className="w-full flex justify-start">
            <div
              className="flex items-center relative rounded-full cursor-pointer"
              onClick={(e) => handleShowDots(e)}
            >
              <PiDotsThreeOutlineVerticalFill
                className={`h-5 w-5 rotate-90 ${showDots ? "text-blue-600" : "text-gray-500"}`}
              />
              {showDots && (
                <div
                  ref={popupRef}
                  className="fixed w-32 bg-gray-50 border border-gray-200 rounded-lg flex flex-col z-50"
                  style={{
                    top: popupPosition.top,
                    left: popupPosition.left,
                  }}
                >
                  <div className="w-full rounded-lg">
                    <div
                      className={`flex items-center gap-2 p-2 rounded-lg ${canDeleteRecurring
                          ? "cursor-pointer opacity-100"
                          : "cursor-not-allowed opacity-50"}`}
                      onClick={() => {
                        if (canDeleteRecurring) {
                          handleDeleteForm();
                        }
                      }}
                    >
                      <img src={Delete} alt="Delete" className="h-4 w-4" />
                      <label className="text-sm font-medium text-red-600">
                        Delete
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </td>
      </tr>


      <Modal
        show={deleteShow}
        onHide={handleCloseDelete}
        centered
        backdrop="static"
        dialogClassName="custom-delete-modal"
      >

        <Modal.Header className="border-0">
          <Modal.Title className="w-full text-center !text-lg !font-semibold !text-gray-800 !font-gilroy">
            Delete Recurring Bill?
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="text-center !text-sm !font-medium !text-gray-500 !font-gilroy -mt-2">
          Are you sure you want to delete this Recurring Bill?
        </Modal.Body>

        <Modal.Footer className="flex justify-center !border-0 -mt-2">
          <Button
            onClick={handleCloseDelete}
            className="w-full max-w-40 h-13 rounded-lg px-5 py-3 bg-white !text-blue-700 !border !border-blue-700 !font-semibold !text-sm !font-gilroy mr-2"
          >
            Cancel
          </Button>

          <Button
            disabled
            onClick={handleDelete}
            className="w-full max-w-40 h-13 rounded-lg px-5 py-1.5 !bg-blue-700 !text-white !font-semibold !text-sm !font-gilroy disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Coming Soon {/* Delete */}
          </Button>
        </Modal.Footer>
      </Modal>



    </>
  )
}
RecurringBillList.propTypes = {
  item: PropTypes.func.isRequired,
  billrolePermission: PropTypes.func.isRequired,
  handleDeleteRecurringbills: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  checked: PropTypes.func.isRequired
};
export default RecurringBillList;