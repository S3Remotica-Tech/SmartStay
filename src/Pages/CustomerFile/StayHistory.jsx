/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { CloseCircle } from "iconsax-react";
import PropTypes from "prop-types";
import dayjs from "dayjs";


// Table cells — same look as Reports/InvoiceRegister/ConsolidatedInvoiceTable.
const TABLE_HEADER_CELL =
  "h-[50px] px-[16px] bg-[#F8F9FF] border-b border-[#E5E7EB] font-gilroy font-semibold text-[11px] leading-[16.5px] tracking-[0.33px] uppercase text-[#6B7280] whitespace-nowrap";

const TABLE_BODY_CELL =
  "h-[58px] px-[16px] border-b border-[#E5E7EB] font-gilroy text-[14px] leading-[20px] whitespace-nowrap";

function StayHistory({ show, handleClose }) {
  const state = useSelector((state) => state);

  const dispatch = useDispatch();
  const [data, setData] = useState("")


  useEffect(() => {
    if (state.createAccount?.networkError) {
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NETWORK_ERROR' })
      }, 3000)
    }
  }, [state.createAccount?.networkError]);

  useEffect(() => {
    if (state.UsersList.customerdetails.bedHistory) {
      setData(state.UsersList.customerdetails.bedHistory)
    }

  }, [state.UsersList.customerdetails.bedHistory])




  return (

    <div className="modal show block static font-gilroy">
      <Modal data-testid="stay-history-stay-details-modal"
        show={show}
        onHide={handleClose}
        centered
        backdrop="static"
        dialogClassName="custom-modals-style-stays !flex !items-center !justify-center"
      >
        <Modal.Dialog className="m-0 p-0" >
         <Modal.Header className="border border-gray-200">
            <Modal.Title className="!text-[18px] text-gray-900 !font-semibold font-gilroy">
              Stay Details
            </Modal.Title>

            <CloseCircle data-testid="stay-history-close-icon"
              size="24"
              color="#000"
              onClick={handleClose}
              className="cursor-pointer"
            />
          </Modal.Header>

          <Modal.Body className="show-scroll pt-1 ps-3 mt-2 me-0 overflow-x-visible max-h-none">
            <div className="font-gilroy bg-white border-[1px] border-[#E2E8F0] rounded-[12px] shadow-[0px_0px_3px_0px_rgba(0,0,0,0.06)] overflow-hidden overflow-x-auto">
              <table className="w-full min-w-max border-separate border-spacing-0 font-gilroy">
                <thead>
                  <tr>
                    <th className={`${TABLE_HEADER_CELL} text-left`}>
                      Room No / Bed
                    </th>
                    <th className={`${TABLE_HEADER_CELL} text-left`}>
                      Duration
                    </th>
                    <th className={`${TABLE_HEADER_CELL} text-left`}>
                      Reason
                    </th>
                    <th className={`${TABLE_HEADER_CELL} text-left`}>
                      Segmental Rent
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {Array.isArray(data) &&
                    data.map((row, index) => (
                      <tr key={index}>
                        <td className={`${TABLE_BODY_CELL} font-medium text-[#111928] align-middle max-w-[150px] truncate`}>
                          {row.roomName}/{row.bedName}
                        </td>

                        <td className={`${TABLE_BODY_CELL} font-medium text-[#111928] align-middle`}>
                          {`${row.startDate && row.startDate !== "NA"
                            ? dayjs(row.startDate, "DD/MM/YYYY").format("DD MMM YYYY")
                            : "N/A"
                            } - ${row.endDate === "Till date"
                              ? "Till date"
                              : row.endDate && row.endDate !== "NA"
                                ? dayjs(row.endDate, "DD/MM/YYYY").format("DD MMM YYYY")
                                : "N/A"
                            }`}
                        </td>
                      
                       <td className={`${TABLE_BODY_CELL} font-medium text-[#111928] align-middle max-w-[150px] truncate`}>
                        {row.reason ? row.reason : "N/A"}
                        </td>

                        <td className={`${TABLE_BODY_CELL} font-medium text-[#111928] align-middle`}>
                          {row.rentAmount}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </Modal.Body>
        </Modal.Dialog>
      </Modal>
    </div>

  );
}
StayHistory.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,

};
export default StayHistory;
