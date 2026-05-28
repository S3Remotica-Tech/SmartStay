/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Edit from "../../Assets/Images/Edit-blue.png";
import Delete from "../../Assets/Images/Delete_red.png";
import Modal from "react-bootstrap/Modal";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Download from "../../Assets/Images/New_images/download.png";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useHasPermission } from "../../Utils/Permission";

const Receipt = (props) => {
  const state = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const [receiptdeletePermission, setReceiptDeletePermission] = useState("");
  // const [receiptEditPermission, setReceiptEditPermission] = useState("")
  const [deleteShow, setDeleteShow] = useState(false);
  const [deleteitem, setDeleteItem] = useState("");
  const [showDots, setShowDots] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });

  const {
    // canWriteModule: canWriteReceipt,s
    canReadModule: canReadReceipt,
    canDeleteModule: canDeleteReceipt,
    canUpdateModule: canUpdateReceipt,
  } = useHasPermission("Receipt");

  const isValidSubscription =
    state.UsersList?.hotelDetailsinPg?.isSubscriptionActive;

  const isExportAllow = isValidSubscription && canReadReceipt;

  const handleDeleteForm = (item) => {
    setDeleteShow(true);
    setDeleteItem(item);
  };

  const handleCloseDelete = () => {
    setDeleteShow(false);
  };

  // useEffect(() => {
  //   const userType = props.billrolePermission[0]?.user_details?.user_type;
  //   const isAdmin = userType === "admin" || userType === "agent";
  //   if (isAdmin) {
  //     if (state?.login?.planStatus === 0) {
  //       setReceiptDeletePermission("Permission Denied");
  //       setReceiptEditPermission("Permission Denied");
  //     } else if (state?.login?.planStatus === 1) {
  //       setReceiptDeletePermission("");
  //       setReceiptEditPermission("");
  //     }
  //   }

  // }, [state?.login?.planStatus, state.login?.selectedHostel_Id, props.billrolePermission])

  const handleShowDots = (event) => {
    setShowDots(!showDots);
    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + height / 2;
    const popupLeft = left - 150;

    setPopupPosition({ top: popupTop, left: popupLeft });
  };

  const handleDelete = () => {
    if (deleteitem) {
      dispatch({
        type: "DELETE_RECEIPT",
        payload: {
          hostelId: state.login?.selectedHostel_Id,
          receiptId: deleteitem.transactionId,
        },
      });
      setDeleteLoading(true);
    }
  };

  useEffect(() => {
    if (state.InvoiceList?.receiptDeleteError) {
      setDeleteLoading(false);
      setDeleteShow(false);
      dispatch({ type: "REMOVE_DELETE_RECEIPT_ERROR" });
    }
  }, [state.InvoiceList?.receiptDeleteError]);

  const handleEdit = (item) => {
    props.onhandleEdit(item);
  };

  const handleInvoicepdf = (item) => {
    props.OnHandleshowInvoicePdf(item);
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

  const handleDownload = (item) => {
    if (item) {
      // props.DisplayInvoice(true, item)
      if (item?.transactionId && state.login.selectedHostel_Id) {
        dispatch({
          type: "RECEIPTPDF_NEWCHANGES",
          payload: {
            hostelId: state.login.selectedHostel_Id,
            transactionId: item.transactionId,
          },
        });
        navigate(`/receipts/details/${item.transactionId}`, {
          state: {
            rowData: item,
          },
        });
      }
    }
  };

  useEffect(() => {
    if (state.InvoiceList.statusCodeNewReceiptStatusCode === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_NEE_RECEIPT_PDF_STATUS_CODE" });
      }, 500);
    }
  }, [state.InvoiceList.statusCodeNewReceiptStatusCode]);

  useEffect(() => {
    if (state.InvoiceList.ReceiptDeletesuccessStatuscode === 204) {
      setDeleteLoading(false);

      setDeleteShow(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_DELETE_RECEIPT_STATUS_CODE" });
      }, 1000);
    }
  }, [state.InvoiceList.ReceiptDeletesuccessStatuscode]);

  const handleNavigateTenantProfile = (view) => {
    if (view) {
      dispatch({
        type: "CUSTOMERDETAILS",
        payload: { customerId: view.customerId },
      });
      navigate(`/tenant/details/${view.customerId}`, {
        state: {
          customerId: view.customerId,
          IsOverView: true,
          totriggerBillTap: false,
          isReceiptWay: true,
        },
      });
    }
  };

  return (
    <>
      <tr className="text-sm font-gilroy border-b border-[#E8E8E8] h-10">
        <td className="w-[250px] py-1 px-2 whitespace-nowrap text-[#1E45E1] font-semibold cursor-pointer hover:underline">
          <div onClick={() => handleDownload(props.item)}>
            {props.item.transactionNumber ? props.item?.transactionNumber : "-"}
          </div>
        </td>

        <td className="w-[250px] py-1 px-2 whitespace-nowrap text-[#1E45E1] font-semibold">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavigateTenantProfile(props.item)}
            title={props.item?.fullName}
          >
            {props.item?.profilePic ? (
              <img
                src={props.item.profilePic}
                alt="profile"
                className="w-9 h-9 rounded-full"
              />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-[#44536A]">
                {props.item?.initials || "-"}
              </div>
            )}
            <div className="overflow-hidden text-ellipsis truncate w-[120px]">
              {props.item?.fullName}
            </div>
          </div>
        </td>

        <td className="w-[250px] py-1 px-2 whitespace-nowrap">
          <div>
            {props.item?.referenceNumber ? props.item?.referenceNumber : "-"}
          </div>
        </td>

        <td className="w-[250px] py-1 px-2 whitespace-nowrap border-b border-[#E8E8E8] text-start align-middle text-[13px] font-medium text-black font-gilroy">
          <div className="ml-[6px]">
            {!props.item?.invoiceNumber || props.item?.invoiceNumber === "0"
              ? "-"
              : props.item.invoiceNumber}
          </div>
        </td>

        <td className="w-[250px] py-1 px-2 whitespace-nowrap border-b border-[#E8E8E8] text-start align-middle text-[13px] font-medium text-black font-gilroy">
          <div className="ml-[6px]">{props.item.invoiceType}</div>
        </td>

        <td className="w-[250px] py-1 px-2 whitespace-nowrap border-b border-[#E8E8E8] text-start align-middle text-[13px] font-medium text-black font-gilroy">
          {props.item?.paidAt}
        </td>

        <td className="w-[250px] py-1 px-2 whitespace-nowrap border-b border-[#E8E8E8] text-start align-middle text-[13px] font-medium text-black font-gilroy">
          ₹
          {props.item?.paidAmount !== null
            ? props.item.paidAmount.toLocaleString("en-IN")
            : "0"}
        </td>

        <td className="w-[250px] py-1 px-2 whitespace-nowrap border-b border-[#E8E8E8] text-start align-middle text-[13px] font-medium text-black font-gilroy">
          {props.item?.bankName ? props.item?.bankName : "-"}
        </td>

        <td className="px-2">
          <div className="w-full flex justify-start">
            <div
              className="cursor-pointer flex justify-center items-center relative"
              onClick={(e) => handleShowDots(e)}
            >
              <PiDotsThreeOutlineVerticalFill
                className={`h-[20px] w-[20px] rotate-90 ${
                  showDots ? "text-[#1E45E1]" : "text-[#6B7280]"
                }`}
              />

              {showDots && (
                <>
                  <div
                    ref={popupRef}
                    className={`cursor-pointer bg-[#F9F9F9] fixed w-[130px] border border-[#EBEBEB] rounded-[10px] flex flex-col items-start ${
                      showDots ? "z-[1000]" : ""
                    }`}
                    style={{
                      top: popupPosition.top,
                      left: popupPosition.left,
                    }}
                  >
                    <div>
                      <button
                        type="button"
                        disabled
                        className="flex justify-start items-center gap-2 w-full px-3 py-2 
             rounded-t-[10px] bg-[#F9F9F9] border-0
             opacity-50 cursor-not-allowed
             disabled:bg-gray-50"
                      >
                        <img src={Edit} alt="Edit" className="h-4 w-4" />
                        <span className="text-[14px] font-medium text-[#222222] font-gilroy">
                          Edit
                        </span>
                      </button>
                    </div>

                    {/* {props.item.invoiceType !== "Settlement" &&
 props.item.invoiceType !== "Refund" && ( */}

                    <div
                      className={`flex justify-start items-center gap-2 w-full px-3 py-2 bg-transparent ${
                        canDeleteReceipt
                          ? "cursor-pointer opacity-100"
                          : "cursor-not-allowed opacity-50"
                      }`}
                      onClick={() => {
                        if (canDeleteReceipt) {
                          handleDeleteForm(props.item);
                        }
                      }}
                      onMouseEnter={(e) => {
                        if (!canDeleteReceipt) {
                          e.currentTarget.style.backgroundColor = "#FFF0F0";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <img src={Delete} alt="Delete" className="h-4 w-4" />

                      <span
                        className={`text-[14px] font-medium font-gilroy text-[#FF0000] ${
                          canDeleteReceipt
                            ? "cursor-pointer"
                            : "cursor-not-allowed"
                        }`}
                      >
                        Delete
                      </span>
                    </div>

                    <div
                      className={`flex justify-start items-center gap-2 w-full px-3 py-2 ${
                        !isExportAllow
                          ? "opacity-50 cursor-not-allowed"
                          : "opacity-100 cursor-pointer"
                      }`}
                      onClick={() => {
                        if (isExportAllow) {
                          handleInvoicepdf(props.item);
                        }
                      }}
                      onMouseEnter={(e) => {
                        if (isExportAllow)
                          e.currentTarget.style.backgroundColor = "#EDF2FF";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <img src={Download} alt="Download" className="h-4 w-4" />
                      <label
                        className={`text-[14px] font-medium font-gilroy text-[#222222] ${
                          !isExportAllow
                            ? "cursor-not-allowed"
                            : "cursor-pointer"
                        }`}
                      >
                        Download
                      </label>
                    </div>
                  </div>
                </>
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
        <Modal.Header style={{ borderBottom: "none" }}>
          <Modal.Title
            className="w-100 text-center"
            style={{
              fontSize: "18px",
              fontFamily: "Gilroy",

              fontWeight: 600,
              color: "#222222",
            }}
          >
            Delete Receipt?
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          className="text-center"
          style={{
            fontSize: 14,
            fontWeight: 500,
            fontFamily: "Gilroy",
            color: "#646464",

            marginTop: "-10px",
          }}
        >
          Are you sure you want to delete this Receipt?
        </Modal.Body>

        <Modal.Footer
          className="d-flex justify-content-center"
          style={{
            borderTop: "none",
            marginTop: "-10px",
          }}
        >
          <Button
            className="me-2"
            style={{
              width: "100%",
              maxWidth: 160,
              height: 52,
              borderRadius: 8,
              padding: "12px 20px",
              background: "#fff",
              color: "#1E45E1",
              border: "1px solid #1E45E1",
              fontWeight: 600,
              fontFamily: "Gilroy",
              fontSize: "14px",
            }}
            onClick={handleCloseDelete}
          >
            Cancel
          </Button>
          <Button
            className={`
    !w-full 
    !max-w-[160px] 
    !h-[52px] 
    !rounded-[8px] 
    !px-[20px] 
    !py-[12px]  
    !bg-[#1E45E1] 
    !text-white 
    !font-semibold 
    !font-gilroy 
    !text-[14px]
    ${deleteLoading ? "!opacity-70 !cursor-not-allowed" : "!opacity-100 !cursor-pointer"}
  `}
            onClick={handleDelete}
            disabled={deleteLoading}
          >
            {deleteLoading ? (
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
    </>
  );
};
Receipt.propTypes = {
  billrolePermission: PropTypes.func.isRequired,
  receiptaddPermission: PropTypes.func.isRequired,
  onhandleEdit: PropTypes.func.isRequired,
  DisplayInvoice: PropTypes.func.isRequired,
  item: PropTypes.func.isRequired,
  OnHandleshowInvoicePdf: PropTypes.func.isRequired,
};
export default Receipt;
