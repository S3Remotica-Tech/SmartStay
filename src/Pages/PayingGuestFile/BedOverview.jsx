/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { useSelector } from "react-redux";

function BedOverview() {
    const state = useSelector((state) => state);
    const bedDetails = state?.PgList?.OccupiedCustomer
    return (
        <div >
            <div className='bg-[#F9FAFB] rounded px-3 py-2'>

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
                <div className='flex justify-between my-2 '>
                    <div className='text-[#6A7282] text-sm font-medium'>Last check-out on</div>
                    <div className='text-[#101828] text-sm font-medium'>-</div>
                </div>


            </div>


        </div>
    )
}

export default BedOverview