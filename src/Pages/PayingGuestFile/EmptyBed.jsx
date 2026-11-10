/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
// import Modal from 'react-bootstrap/Modal';
import { Activity, Add, Edit } from 'iconsax-react';
import PropTypes from "prop-types";
import AddSquare from '../../Assets/Images/add-square.png'
import AssignTenant from '../../Assets/Images/assign_tenant.png'
import DeleteImage from '../../Assets/Images/Delete_red.png'
import { useHasPermission } from '../../Utils/Permission';
import BedActivity from './BedActivity';
import { UserAdd, UserSquare, More } from "iconsax-react";



function EmptyBed({ show, handleClose, showbed, showcustomer, showtenant, showEditBed, showActivity }) {

  const [showMore, setShowMore] = useState(false);
  const state = useSelector((state) => state);
  const dispatch = useDispatch
  const [activeTab, setActiveTab] = useState("overview");

  const {
    canWriteModule: canWriteWalkin,

  } = useHasPermission("Walk in");

  const {
    canWriteModule: canWriteCustomers,

    // canUpdateModule: canUpdateCustomers,
    //   canDeleteModule: canDeleteExpense,
  } = useHasPermission("Customers");

  const {
    canUpdateModule: canUpdatePayingGuests,
    canDeleteModule: canDeletePayingGuests,
    canReadModule: canReadPayingGuests,

  } = useHasPermission("Paying Guests");

  const isDev = import.meta.env.MODE === "development";

  const handleShowAddCustomer = () => {
    showcustomer(true)
  }

  const handleShowAssignTenant = () => {

    showtenant(true)
  }

  const handleDeleteBed = () => {
    showbed(true)
  }

  const handleEditBed = () => {
    showEditBed(true)
  }

  const handleShowActivity = () => {
    showActivity(true)
  }

  useEffect(() => {
    const closeButton = document.querySelector('button[aria-label="close-button"]');
    if (closeButton) {
      closeButton.style.backgroundColor = 'white';
      closeButton.style.borderRadius = '50%';
      closeButton.style.width = '10px';
      closeButton.style.height = '10px';
      closeButton.style.border = '1.5px solid #000000';
      closeButton.style.padding = '9px';
    }
  }, []);



  useEffect(() => {
    if (state?.Booking?.statusCodeForAddBooking === 200) {

      handleClose()
      setTimeout(() => {
        dispatch({ type: "CLEAR_ADD_USER_BOOKING" });
      }, 500);
    }
  }, [state?.Booking?.statusCodeForAddBookin])





  return (

    <>
      <div className="fixed inset-0 z-[9999]">
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute font-gilroy top-2 right-2 bottom-2 w-full max-w-md bg-white rounded-xl shadow-xl flex flex-col">
          <div className=" px-4 py-3 shrink-0  flex items-center justify-between  mb-1">
            <div className=" text-center !text-[18px] !text-gray-900 !font-semibold !font-gilroy" >
              Bed Status
            </div>

            <div className=" z-10">
              <Add
                size="24"
                color="#99A1AF"
                onClick={handleClose}
                className="cursor-pointer rotate-45"
              />
            </div>

          </div>


          <div className="flex-1 overflow-y-auto px-3 show-scrolls">



            <div className="flex items-center gap-2 w-full my-2">


              <button
                onClick={handleShowAssignTenant}
                disabled={!canWriteCustomers}
                className={`flex-1 min-w-0 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-xs font-medium whitespace-nowrap
      ${canWriteCustomers
                    ? "bg-[#1E45E1] text-white hover:bg-blue-700"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
              >
                <UserAdd size="18" />
                Assign Tenant
              </button>


              <button
                onClick={handleShowAddCustomer}
                disabled={!canWriteWalkin}
                className={`flex-1 min-w-0 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border text-xs font-medium whitespace-nowrap
      ${canWriteWalkin
                    ? "bg-[#F1F6FF] text-[#1E45E1] border-[#D9E5FF]"
                    : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                  }`}
              >
                <UserSquare size="18" />
                Add Tenant
              </button>


              <div className="relative shrink-0">
                <button
                  type="button"
                  onClick={() => setShowMore((prev) => !prev)}
                  className="w-10 h-10 flex items-center justify-center  "
                >
                  <More size="20" color="#374151" variant='Outline' className='rotate-90' />
                </button>

                {showMore && (
                  <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-50 py-1">

                    {/* Edit */}
                    <button
                      type="button"
                      disabled={!canUpdatePayingGuests}
                      onClick={() => {
                        setShowMore(false);
                        handleEditBed();
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm ${canUpdatePayingGuests
                        ? "text-blue-700 hover:bg-blue-50"
                        : "text-gray-400 cursor-not-allowed"
                        }`}
                    >
                      Edit
                      <Edit size="16" color={canUpdatePayingGuests ? "#1E45E1" : "#9CA3AF"} />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      disabled={!canDeletePayingGuests}
                      onClick={() => {
                        setShowMore(false);
                        handleDeleteBed();
                      }}
                      className={`w-full flex items-center justify-between px-4 py-2.5 text-sm ${canDeletePayingGuests
                        ? "text-red-600 hover:bg-red-50"
                        : "text-gray-400 cursor-not-allowed"
                        }`}
                    >
                      Delete
                      <img
                        src={DeleteImage}
                        height={18}
                        width={18}
                        alt="delete"
                        className={!canDeletePayingGuests ? "grayscale opacity-50" : ""}
                      />
                    </button>

                  </div>
                )}
              </div>
            </div>







            {/* new ui */}
            <div className="w-full my-4 ">
              <div className="flex items-center justify-around gap-6 border-b border-gray-200">
                {["overview", "activity"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-sm font-medium capitalize transition-all ${activeTab === tab
                      ? "text-[#1E45E1] border-b-2 border-[#1E45E1]"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    {tab === "overview" ? "Overview" : "Activity"}
                  </button>
                ))}
              </div>

              <div className="mt-4">
                {/* {activeTab === "overview" && <Overview />} */}

                {activeTab === "activity" && isDev && <BedActivity />}
              </div>
            </div>




          </div>
        </div>

      </div >



    </>
  )
}
EmptyBed.propTypes = {
  show: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  currentItem: PropTypes.func.isRequired,
  showbed: PropTypes.func.isRequired,
  showtenant: PropTypes.func.isRequired,
  showcustomer: PropTypes.func.isRequired,
  showEditBed: PropTypes.func.isRequired,
}
export default EmptyBed
