/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import {
  Modal,
  Table
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { CloseCircle } from "iconsax-react";
import PropTypes from "prop-types";
import dayjs from "dayjs";


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
      <Modal
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

            <CloseCircle
              size="24"
              color="#000"
              onClick={handleClose}
              className="cursor-pointer"
            />
          </Modal.Header>

          <Modal.Body className="show-scroll pt-1 ps-3 mt-2 me-0 overflow-x-visible max-h-none">
            <div className="border border-blue-100 rounded-lg">
              <Table responsive bordered={false} className="m-0">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="text-sm font-semibold font-gilroy text-gray-900 py-3 px-4 whitespace-nowrap">
                      Room No / Bed
                    </th>
                    <th className="text-sm font-semibold font-gilroy text-gray-900 py-3 px-4 whitespace-nowrap">
                      Duration
                    </th>
                    <th className="text-sm font-semibold font-gilroy text-gray-900 py-3 px-4 whitespace-nowrap">
                      Reason
                    </th>
                    <th className="text-sm font-semibold font-gilroy text-gray-900 py-3 px-4 whitespace-nowrap">
                      Segmental Rent
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {Array.isArray(data) &&
                    data.map((row, index) => (
                      <tr key={index} className="border-b border-gray-300">
                        <td className="text-sm font-medium font-gilroy text-gray-900 py-3 px-4 align-middle whitespace-nowrap max-w-[150px] truncate">
                          {row.roomName}/{row.bedName}
                        </td>

                        <td className="text-sm font-medium font-gilroy text-gray-900 py-3 px-4 align-middle whitespace-nowrap">
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
                      
                       <td className="text-sm font-medium font-gilroy text-gray-900 py-3 px-4 align-middle max-w-[150px] truncate">
                        {row.reason ? row.reason : "N/A"}
                        </td>

                        <td className="text-sm font-medium font-gilroy text-gray-900 py-3 px-4 align-middle whitespace-nowrap">
                          {row.rentAmount}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
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
