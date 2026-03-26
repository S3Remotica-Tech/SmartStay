
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Edit } from "iconsax-react";
import { useDispatch, useSelector } from "react-redux";
import EmptyState from "../../../Assets/Images/New_images/empty_image.png";
import electricity from "../../../Assets/Images/New_images/electricity.svg";
import Select from "react-select";
import PropTypes from "prop-types";
import "../../../Pages/Settings/SettingElectricity.css";
import ErrorMessage from '../../../Components/ErrorMessage'
import { useHasPermission } from '../../../Utils/Permission';
import Emptystate from "../../../Assets/Images/Empty-State.jpg";
import withErrorBoundary from "../../../Hoc/WithErrorBountry";
import { useNavigate } from "react-router-dom";


function SettingsElectricityNew() {

    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const navigate = useNavigate();
    const [EbList, setEbList] = useState([]);
    const [loading, setLoading] = useState(false);

    const {
        //     canWriteModule: canWriteComplaints,
        canReadModule: canReadElectricity,
        canUpdateModule: canUpdateElectricity,
        // canDeleteModule: canDeleteComplaints,
    } = useHasPermission("Electricity");




    useEffect(() => {
        if (!canReadElectricity) {
            setLoading(false);
        }
    }, [canReadElectricity]);

    useEffect(() => {
        if (EbList.length === 0) {
            setLoading(false);
        }

    }, [EbList])

    useEffect(() => {
        if (state.UsersList?.accessRestrictionError) {
            setLoading(false)
            setTimeout(() => {
                dispatch({ type: 'ACCESS_RESTRICTION_ERROR_REMOVE' })
            }, 1000)
        }

    }, [state.UsersList?.accessRestrictionError])
    useEffect(() => {
        if (state.login.selectedHostel_Id) {
            setLoading(true)
            dispatch({
                type: "EB-BILLING-UNIT-LIST",
                payload: state.login.selectedHostel_Id
            });

        }
    }, [state.login.selectedHostel_Id]);

    useEffect(() => {
        if (state.Settings?.getebStatuscode === 200) {
            setLoading(false);
            setEbList(state.Settings.EBBillingUnitlist);
            // setTimeout(() => {
            //     dispatch({ type: "CLEAR_GET_EBBILLINGS_STATUS_CODE" });
            // }, 500);
        }
    }, [state.Settings?.getebStatuscode]);



    const handleNavigateEbRule = (tabName) => {
        const hostelId = state.login?.selectedHostel_Id;
        if (hostelId) {
            navigate(`/settings/${hostelId}/${tabName}`);
        } else {
            navigate(`/settings/${tabName}`);
        }
    }



    return (

        <div className="min-h-full flex flex-col bg-[#F9FAFF] font-gilroy relative ">
            {loading && (
                <div className="absolute inset-0 z-[1050] flex items-center justify-center bg-transparent">
                    <div className="w-10 h-10 rounded-full border-t-4 border-[#1E45E1] border-r-4 border-r-transparent animate-spin"></div>
                </div>
            )}
            <div className="sticky top-0 left-0 right-0 bg-white flex flex-col md:flex-row justify-between items-center min-h-[50px] px-1.5 font-gilroy shadow-[0_2px_6px_rgba(0,0,0,0.06)]">
                <label className="text-black font-semibold text-[18px] whitespace-nowrap">
                    Electricity Rule
                </label>
            </div>
            <div className="flex-1 overflow-hidden px-4 py-3">
                {

                    !canReadElectricity ?

                        <div className="flex flex-col items-center justify-center h-full text-center mt-24">
                            <img
                                src={Emptystate}
                                alt="Empty State"
                            />

                            <ErrorMessage
                                message={['You do not have access to view Electricity']}
                                type="warning"
                            />
                        </div>
                        :

                        <div className="space-y-6">


                            <div className="flex items-start md:items-center justify-between gap-2 flex-col md:flex-row bg-white rounded-md  p-4 md:p-3 shadow-sm">


                                <div>
                                    <h3 className="text-[18px] md:text-[18px] font-semibold text-[#222222] mb-1">
                                        Electricity Calculation Type
                                    </h3>
                                    <label className="text-[13px] md:text-[13px] text-[#4B4B4B] font-medium">
                                        Defines how electricity charges should be calculated for tenants
                                    </label>
                                </div>


                                <div onClick={() => handleNavigateEbRule("electricity-rule")} className="flex items-center gap-2 border border-[#D1D1D1] rounded-lg px-3 py-1.5 bg-white shadow-xs cursor-pointer hover:bg-gray-50 transition">
                                    <span className="text-xs md:text-sm font-medium text-gray-700">
                                        {
                                            EbList?.typeOfReading === "ROOM_READING"
                                                ? "Room"
                                                : EbList?.typeOfReading === "HOSTEL_READING"
                                                    ? "Hostel"
                                                    : EbList?.typeOfReading === "FLAT_RATE"
                                                        ? "Flat"
                                                        : ""
                                        }
                                    </span>
                                    <Edit size="14" color="#6B7280" />
                                </div>

                            </div>

                        </div>
                }
            </div>
        </div>

    );
}

export default SettingsElectricityNew;