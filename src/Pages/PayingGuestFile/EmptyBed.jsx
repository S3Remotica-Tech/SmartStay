/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Add, Edit, Trash } from 'iconsax-react';
import PropTypes from "prop-types";
import { useHasPermission } from '../../Utils/Permission';
import BedActivity from './BedActivity';
import { UserAdd, UserSquare, More } from "iconsax-react";
import Green from "../../Assets/Images/New_images/GreenBed.png";
import FormComingSoon from '../../Utils/FormComingSoon';
import BedOverview from './BedOverview';



function EmptyBed({ handleClose, showbed, showcustomer, showtenant, showEditBed, }) {

  const [showMore, setShowMore] = useState(false);
  const state = useSelector((state) => state);
  const dispatch = useDispatch
  const [activeTab, setActiveTab] = useState("overview");

  const bedDetails = state?.PgList?.OccupiedCustomer

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
  const moreRef = useRef(null);





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
    const handleOutsideClick = (event) => {
      if (moreRef.current && !moreRef.current.contains(event.target)) {
        setShowMore(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
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
            <div>
              <div className=" text-center !text-[20px] !text-gray-900 !font-semibold !font-gilroy" >
                Bed Status
              </div>
              <div className="text-sm text-[#1E45E1] flex items-center gap-2">
                {bedDetails?.floorName}
                <span className="h-4 w-px bg-gray-300" />
                {bedDetails?.roomName}
                <span className="h-4 w-px bg-gray-300" />
                {bedDetails?.bedName}
              </div>
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


          {/* <div className="px-3"> */}


          <div className="shrink-0 px-3">
            <div className=" w-full my-2 bg-[#F9FAFB] p-2  rounded">

              <div className='flex items-center justify-between gap-4 my-2'>
                <div className='flex  items-center  gap-4'>
                  <div><img src={Green} alt="image" className='h-8 w-8' /></div>
                  <div>
                    <div className='text-[#222222] text-sm  font-semibold'>Monthly Rent : ₹ {bedDetails?.rentAmount}</div>
                    <div className='text-[#009966] text-xs  font-semibold'>Ready to book</div>

                  </div>
                </div>
                <button className='px-2 py-1 bg-[#038C3D] text-white font-gilroy rounded text-xs '>Available </button>
              </div>
              <div className='flex items-center gap-2 my-2'>

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
                  className={`flex-1 min-w-0 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border-1 text-xs font-medium whitespace-nowrap
      ${canWriteWalkin
                      ? "bg-[#F1F6FF] text-[#1E45E1]  border-1 border-[#1E45E1]"
                      : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    }`}
                >
                  <UserSquare size="18" />
                  Add Tenant
                </button>


                <div className="relative shrink-0" >
                  <button
                    type="button"
                    onClick={() => setShowMore((prev) => !prev)}
                    className="w-10 h-10 flex items-center justify-center border-1 border-[#EFEFEF] rounded "
                  >
                    <More size="20" color="#374151" variant='Outline' className='rotate-90' />
                  </button>

                  {showMore && (
                    <div ref={moreRef} className="absolute right-0 top-full mt-2 w-40 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-50 py-1">


                      <button
                        type="button"
                        disabled={!canUpdatePayingGuests}
                        onClick={() => {
                          setShowMore(false);
                          handleEditBed();
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2 text-xs ${canUpdatePayingGuests
                          ? "text-blue-700 hover:bg-blue-50"
                          : "text-gray-400 cursor-not-allowed"
                          }`}
                      >
                        Edit
                        <Edit size="12" color={canUpdatePayingGuests ? "#1E45E1" : "#9CA3AF"} />
                      </button>


                      <button
                        type="button"
                        disabled={!canDeletePayingGuests}
                        onClick={() => {
                          setShowMore(false);
                          handleDeleteBed();
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2 text-xs ${canDeletePayingGuests
                          ? "text-red-600 hover:bg-red-50"
                          : "text-gray-400 cursor-not-allowed"
                          }`}
                      >
                        Delete

                        <Trash size="12" color={canDeletePayingGuests ? "red" : "#9CA3AF"} />
                      </button>

                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>







          <div className="w-full my-4 shrink-0 px-3 mt-4">
            <div className="flex items-center justify-around gap-6 border-b border-[#E5E7EB] w-full">
              {["overview", "activity"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 pb-3 text-sm font-medium capitalize transition-all duration-200 border-b-2
                    ${activeTab === tab
                      ? "text-[#1E45E1] border-[#1E45E1] drop-shadow-[0_2px_4px_rgba(30,69,225,0.25)]"
                      : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
                    }`}
                >
                  {tab === "overview" ? "Overview" : "Activity"}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 min-h-0 overflow-y-auto mx-2 show-scrolls ">
            {activeTab === "overview" &&
              <BedOverview isBed="EMPTY" />
            }

            {(activeTab === "activity" && isDev) ? (
              <BedActivity />
            ) : activeTab === "activity" && (

              <FormComingSoon />
            )}
          </div>





        </div>
      </div>

      {/* </div > */}



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
