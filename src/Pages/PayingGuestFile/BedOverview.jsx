/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useSelector } from "react-redux";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import PropTypes from "prop-types";

function BedOverview({ isBed, tenant, complaintImages = [], outstandingAmount = "12,457.16", }) {
    const state = useSelector((state) => state);
    // console.log("isBed", isBed)
    const isDev = import.meta.env.MODE === "development";
    const bedDetails = state?.PgList?.OccupiedCustomer

    const isOccupied = isBed === "OCCUPIED" || isBed === "NOTICE"


    return (
        <div>
            {isBed !== "EMPTY" &&
                <label className=" text-xs text-[#6A7282] uppercase mb-2">{isOccupied ? "CURRENT STAY" : "BOOKING DETAILS"}</label>
            }


            <div className='bg-[#F9FAFB] rounded px-3 py-2'>
                {
                    isBed === "RESERVED" &&

                    <div className='flex justify-between my-2 '>
                        <div className='text-[#6A7282] text-sm font-medium'>Booked on</div>
                        <div className='text-[#101828] text-sm font-medium'>{tenant?.bookingDate}</div>
                    </div>
                }
                {
                    isBed === "OCCUPIED" &&

                    <div className='flex justify-between my-2 '>
                        <div className='text-[#6A7282] text-sm font-medium'>Check-in on</div>
                        <div className='text-[#101828] text-sm font-medium'>{tenant?.joiningDate}</div>
                    </div>
                }
                <div className='flex justify-between my-2 '>
                    <div className='text-[#6A7282] text-sm font-medium'>Floor</div>
                    <div className='text-[#101828] text-sm font-medium'>{bedDetails?.floorName}</div>
                </div>
                <div className='flex justify-between my-2'>
                    <div className='text-[#6A7282] text-sm font-medium'>Room</div>
                    <div className='text-[#101828] text-sm font-medium'>{bedDetails?.roomName}</div>
                </div>
                <div className='flex justify-between my-2 '>
                    <div className='text-[#6A7282] text-sm font-medium'>Bed Number</div>
                    <div className='text-[#101828] text-sm font-medium'>{bedDetails?.bedName}</div>
                </div>
                <div className='flex justify-between my-2 '>
                    <div className='text-[#6A7282] text-sm font-medium'>Bed Rent</div>
                    <div className='text-[#101828] text-sm font-medium'>₹{bedDetails?.rentAmount} / month</div>
                </div>
                {
                    isBed === "EMPTY" &&
                    <div className='flex justify-between my-2 '>
                        <div className='text-[#6A7282] text-sm font-medium'>Last check-out on</div>
                        <div className='text-[#101828] text-sm font-medium'>-</div>
                    </div>
                }
                {
                    isBed === "RESERVED" &&
                    <div className='flex justify-between my-2 '>
                        <div className='text-[#6A7282] text-sm font-medium'>Expected Check-in date</div>
                        <div className='text-[#101828] text-sm font-medium'>{tenant?.joiningDate}</div>
                    </div>
                }



            </div>


            {
                isDev && isOccupied &&

                <div className="w-full space-y-3 my-4 font-gilroy">


                    <div className="w-full rounded-xl border border-[#E5E7EB] bg-white px-3 py-2">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] text-[#6A7282]">
                                Outstanding Payable
                            </span>

                            <button

                                className="flex items-center gap-1 text-[11px] font-medium text-[#1E45E1] hover:text-blue-700"
                            >
                                View invoices
                                <span className="text-base"><MdKeyboardDoubleArrowRight /></span>
                            </button>
                        </div>

                        <p className="my-0.5 text-[18px] font-medium text-[#222222]">
                            ₹ {outstandingAmount}
                        </p>
                    </div>

                    <div className="w-full rounded-lg bg-[#EDF3FF] px-3 py-3">
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex min-w-0 items-center gap-2">
                                <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-[#3977F6]" />

                                <p className="truncate text-[14px] font-medium text-[#222222] mb-0">
                                    Bed Change Request · REQ-1024
                                </p>
                            </div>

                            <span className="shrink-0 text-[10px] text-[#475569]">
                                Today
                            </span>
                        </div>

                        <div className="mt-2 space-y-2.5 pl-4">
                            <div className="flex items-center justify-between gap-2">
                                <span className="text-[10px] text-[#8992A3]">
                                    Bed Type
                                </span>
                                <span className="text-[11px] font-medium text-[#292929]">
                                    2 Sharing
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-2">
                                <span className="text-[10px] text-[#8992A3]">
                                    Bed Change Urgency
                                </span>
                                <span className="text-[11px] font-medium text-[#292929]">
                                    2 week
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-2">
                                <span className="text-[10px] text-[#8992A3]">
                                    Requested Date
                                </span>
                                <span className="text-[11px] font-medium text-[#292929]">
                                    10 Dec 2025
                                </span>
                            </div>
                        </div>

                        <div className="mt-3 flex justify-end">
                            <button
                                // onClick={onReviewRequest}
                                className="flex items-center gap-2 rounded-full bg-[#2447E8] px-3 py-1.5 text-[11px] font-medium text-white transition hover:bg-blue-700"
                            >
                                Review
                                <span className="text-sm"><MdKeyboardDoubleArrowRight /></span>
                            </button>
                        </div>
                    </div>

                    <div className="w-full rounded-lg bg-[#EDF3FF] px-3 py-3">
                        <div className="flex items-center justify-between gap-2">
                            <div className="flex min-w-0 items-center gap-2">
                                <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-[#3977F6]" />

                                <p className="truncate text-[14px] font-medium text-[#222222] mb-0">
                                    Rajesh R raised a New Complaint
                                </p>
                            </div>

                            <span className="shrink-0 text-[10px] text-[#788398]">
                                2 Days ago
                            </span>
                        </div>

                        <div className="ml-[16px] mt-2 border-l-2 border-[#3977F6] py-0.5 pl-2">
                            <p className="text-[10px] leading-4 text-[#68768C] mb-0">
                                Water leakage in Room 102 Ground Floor- Plumbing.
                            </p>
                        </div>

                        <div className="ml-[16px] mt-2 flex flex-wrap gap-2">
                            {complaintImages.length > 0 ? (
                                complaintImages.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Complaint ${index + 1}`}
                                        className="h-[70px] w-[83px] rounded-md border border-[#DCE3EF] object-cover"
                                    />
                                ))
                            ) : (
                                <div className="flex h-[70px] w-[83px] items-center justify-center rounded-md bg-[#DCE5F5] text-[10px] text-[#7B8495]">
                                    No images
                                </div>
                            )}
                        </div>
                    </div>

                </div>

            }






        </div>
    )
}
BedOverview.propTypes = {
    isBed: PropTypes.string.isRequired,
    tenant: PropTypes.shape({
        bookingDate: PropTypes.string,
        joiningDate: PropTypes.string,
    }),
    complaintImages: PropTypes.arrayOf(PropTypes.string),
    outstandingAmount: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]),
};

BedOverview.defaultProps = {
    tenant: null,
    complaintImages: [],
    outstandingAmount: "0",
};
export default BedOverview