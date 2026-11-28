/* eslint-disable react-hooks/exhaustive-deps */
import { createPortal } from "react-dom";
import React, { useState, useRef, useEffect } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Delete from "../../Assets/Images/Delete_red.png";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

import { useHasPermission } from "../../Utils/Permission";

// Table cells — same look as Reports/InvoiceRegister/ConsolidatedInvoiceTable.
const TABLE_BODY_CELL =
  "h-[58px] px-[16px] border-b border-[#E5E7EB] font-gilroy text-[14px] leading-[20px] whitespace-nowrap";

const RecurringBillList = (props) => {
 
  const [deleteShow, setDeleteShow] = useState(false);
  
  const handleDeleteForm = () => {
    setDeleteShow(true);
  };

  const handleCloseDelete = () => {
    setDeleteShow(false);
  };

 
  

  const [showDots, setShowDots] = useState("");
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const handleShowDots = (event) => {
    setShowDots(!showDots);
    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + height / 2;
    const popupLeft = left - 150;

    setPopupPosition({ top: popupTop, left: popupLeft });
  };

  const handleDelete = () => {
    props.handleDeleteRecurringbills(props.item);
  };

  const popupRef = useRef(null);
  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowDots(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const {
    canDeleteModule: canDeleteRecurring,
    // canUpdateModule: canUpdateRecurring,
  } = useHasPermission("Recurring bills");

  return (
    <>
      <tr
        key={props.item.customerId}
      >
        <td className={`${TABLE_BODY_CELL} w-[230px] text-[#111928]`}>
          <div className="flex items-center">{props.item?.fullName}</div>
        </td>
        <td className={`${TABLE_BODY_CELL} w-[230px] text-[#111928]`}>
          {props?.item?.lastInvoiceNumber || "-"}
        </td>
        <td className={`${TABLE_BODY_CELL} w-[230px] text-[#111928]`}>
          {props.item?.lastInvoiceDate || "-"}
        </td>
        <td className={`${TABLE_BODY_CELL} w-[230px] text-[#111928]`}>
          {props.item?.nextInvoiceDate || "-"}
        </td>
        <td className={`${TABLE_BODY_CELL} w-[230px] text-[#111928]`}>
          ₹{(props?.item?.invoiceAmount || 0).toLocaleString("en-IN")}
        </td>
        {/* <td className={`${TABLE_BODY_CELL} w-[230px]`}>
          <Form.Check
            type="switch"
            id="recurring-switch"
            checked={props.checked}
            disabled={!canUpdateRecurring}
            onChange={canUpdateRecurring ? props.onToggle : undefined}
          />
        </td> */}
        <td className={`${TABLE_BODY_CELL} w-[230px] sticky right-0 z-[1] border-l border-l-[#E2E8F0] shadow-[-4px_0px_6px_-4px_rgba(0,0,0,0.08)] bg-white text-[#111928]`}>
          <div className="w-full flex justify-start">
            <div data-testid={`recurring-bill-list-show-dots-action-${props.item.customerId}`}
              className="flex items-center relative rounded-full cursor-pointer"
              onClick={(e) => handleShowDots(e)}
            >
              <PiDotsThreeOutlineVerticalFill
                className={`h-5 w-5 rotate-90 ${showDots ? "text-[#1E45E1]" : "text-[#314158]"}`}
              />
              {showDots && (
                createPortal(
                <div
                  ref={popupRef}
                  className="font-gilroy fixed w-32 bg-gray-50 border border-gray-200 rounded-lg flex flex-col z-[1000]"
                  style={{
                    top: popupPosition.top,
                    left: popupPosition.left,
                  }}
                >
                  <div className="w-full rounded-lg">
                    <div data-testid={`recurring-bill-list-delete-action-${props.item.customerId}`}
                      className={`flex items-center gap-2 p-2 rounded-lg ${
                        canDeleteRecurring
                          ? "cursor-pointer opacity-100"
                          : "cursor-not-allowed opacity-50"
                      }`}
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
                </div>,
                document.body,
              )
              )}
            </div>
          </div>
        </td>
      </tr>

      <Modal data-testid="recurring-bill-list-delete-recurring-bill-are-modal"
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
          <Button data-testid="recurring-bill-list-cancel-btn"
            onClick={handleCloseDelete}
            className="w-full max-w-40 h-13 rounded-lg px-5 py-3 bg-white !text-blue-700 !border !border-blue-700 !font-semibold !text-sm !font-gilroy mr-2"
          >
            Cancel
          </Button>

          <Button data-testid="recurring-bill-list-coming-soon-btn"
            disabled
            onClick={handleDelete}
            className="w-full max-w-40 h-13 rounded-lg px-5 py-1.5 !bg-blue-700 !text-white !font-semibold !text-sm !font-gilroy disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Coming Soon {/* Delete */}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
RecurringBillList.propTypes = {
  item: PropTypes.func.isRequired,
  billrolePermission: PropTypes.func.isRequired,
  handleDeleteRecurringbills: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  checked: PropTypes.func.isRequired,
};
export default RecurringBillList;
