/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { BsShieldCheck, BsHourglassSplit } from "react-icons/bs";
import ShortStayRecurringModal from "./ShortStay";
import { useDispatch, useSelector } from "react-redux";
import { ArrowRight2,  } from 'iconsax-react';
import { useHasPermission } from '../../../Utils/Permission';
import Emptystate from "../../../Assets/Images/Empty-State.jpg";
import ErrorMessage from '../../../Components/ErrorMessage';
import withErrorBoundary from "../../../Hoc/WithErrorBountry";
import { useNavigate } from "react-router-dom";

function BillingRule() {


  const state = useSelector((state) => state);
  const dispatch = useDispatch();
   const navigate = useNavigate();
  
  const [recurringBills, setRecuringBills] = useState("");
  const [checked, setChecked] = useState(true);
  const [shortStayChecked, setShortStayChecked] = useState(false);
  const [formLoading, setFormLoading] = useState(false)
  const [showShortStay, setShowShortStay] = useState(false);
  // const [showLongStay, setShowLongStay] = useState(false);

  const handleShowLongStay = (tabName) => {
    // setShowLongStay(true)
const hostelId = state.login?.selectedHostel_Id;
    if (hostelId) {
      navigate(`/settings/${hostelId}/${tabName}`);
    } else {
      navigate(`/settings/${tabName}`);
    }


  };
  // const handleCloseLongStay = () => {
  //   dispatch({ type: 'REMOVE_BILLING_RULE_ERROR' })
  //   setShowLongStay(false)
  // }


  const handleShowShortStay = () => setShowShortStay(true);
  const handleCloseShortStay = () => setShowShortStay(false);

  // const canReadRecurring = useHasPermission("Recurring bills", "canRead")
  // const canWriteBills = useHasPermission("Recurring bills", "canWrite")


  const {
    canWriteModule: canWriteBills,
    canReadModule: canReadRecurring,
  } = useHasPermission("Bills");







  //  Future needed this function so don't delete this command line.............

  // const handleToggle = () => {
  //   setChecked(!checked);
  //   if (recurringBills) {
  //     dispatch({
  //       type: "SETTINGSADD_RECURRING",
  //       payload: {
  //         hostel_id: Number(state.login.selectedHostel_Id),
  //         billingDateOfMonth: recurringBills?.billingDateOfMonth,
  //         dueDateOfMonth: recurringBills?.dueDateOfMonth,
  //         isActive: 0,
  //         billFrequency:"Monthly"
  //       },
  //     })
  //   }
  // };

  useEffect(() => {
    if (state.Settings.SettingsRecurringAddSuccess === 200) {
      dispatch({ type: "SETTINGS_GET_RECURRING", payload: { hostelId: state.login.selectedHostel_Id } });
      setTimeout(() => {
        dispatch({ type: "CLEAR_SETTINGSADDRECURRING_STATUS_CODE" });
      }, 100);
    }
  }, [state.Settings.SettingsRecurringAddSuccess]);

  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      dispatch({ type: "SETTINGS_GET_RECURRING", payload: { hostelId: state.login.selectedHostel_Id } });
      setFormLoading(false)
    }
  }, [state.login.selectedHostel_Id]);


  useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: 'ACCESS_RESTRICTION_ERROR_REMOVE' })
      }, 1000)
    }

  }, [state.UsersList?.accessRestrictionError])
  useEffect(() => {
    if (state?.Settings?.settingsBillsggetRecurrSucesscode === 200) {
      setFormLoading(false)
      setRecuringBills(state?.Settings?.SettingsBillsGetRecurring)
      setTimeout(() => {
        dispatch({ type: "CLEAR_SETTINGSGETRECURRING_STATUS_CODE" });
      }, 1000);
    }
  }, [state?.Settings?.settingsBillsggetRecurrSucesscode])

  useEffect(() => {
    if (state.Settings?.RecurringOffStatusCode === 201) {
      setRecuringBills("")
      setFormLoading(false)
      setTimeout(() => {
        dispatch({ type: "REMOVE_RECURRINGOFF" });
      }, 100);


    }

  }, [state.Settings?.RecurringOffStatusCode])




  useEffect(() => {
    if (recurringBills?.billStartDate) {
      setChecked(true)
    }

  }, [recurringBills?.billStartDate, state.login.selectedHostel_Id])




  return (
    <>
      <div className="sticky top-0 left-0 right-0 z-50 bg-white flex flex-col md:flex-row justify-between items-center min-h-[50px] px-1.5 whitespace-nowrap font-gilroy">
        <label className="text-black font-semibold text-[18px] font-gilroy whitespace-nowrap">
          Billing Rule
        </label>

      </div>

      <div>
        {!canReadRecurring ? (
          <>
            <div className="flex flex-col items-center justify-center mt-24">
              <img src={Emptystate} alt="Empty State" />

              <ErrorMessage
                message={['You do not have access to view Billing Rule']}
                type="warning"
              />
            </div>
          </>
        ) : (
          <div className="bg-[#FAFAFA] h-fit p-3">

            <div className="grid grid-cols-12 gap-3  ">

              <div className="col-span-12 md:col-span-12">
                <div className="h-full rounded-lg  shadow-md bg-white">
                  <div className="px-[10px] py-[10px] flex  items-center justify-between">

                    <div className="flex gap-2 items-center">
                      <div className="bg-white rounded-lg p-2 ">
                        <BsShieldCheck size={24} color="#1E45E1" />
                      </div>

                      <div>
                        <div className="mb-1 font-gilroy font-semibold text-base text-gray-900">
                          Long Stay Recurring
                        </div>

                        <div className="text-gray-600 text-[13px] font-gilroy mb-1">
                          Set your Monthly Recurring Bill Period
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 items-center">
                      <div className="flex items-center">

                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                            // disabled
                            className="sr-only peer"
                          />

                          <div className="w-8 h-4 bg-gray-300 rounded-full peer-checked:bg-blue-700 after:content-[''] after:absolute after:top-[2px] after:left-[1px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4 peer-disabled:opacity-50"></div>
                        </label>

                        <span className="text-sm font-gilroy leading-none ml-2">
                          {checked ? "On" : "Off"}
                        </span>
                      </div>

                      <div>
                        <ArrowRight2
                          color="#28303F"
                          size="14"
                          // variant="Bold"
                          className={`${!canWriteBills ? "opacity-40 cursor-not-allowed pointer-events-none" : "cursor-pointer"
                            }`}
                         onClick={canWriteBills ? () => handleShowLongStay("long-stay-recurring") : undefined}
                        />
                      </div>
                    </div>
                   
                  </div>
                </div>
              </div>


              <div className="col-span-12 md:col-span-12">
                <div className="h-full rounded-lg  shadow-md bg-white">
                  <div className="px-[10px] py-[10px] flex  items-center justify-between">

                    <div className="flex gap-2 items-center">
                      <div className="bg-white rounded-lg p-2 ">
                        <BsHourglassSplit size={24} color="#1E45E1" />
                      </div>

                      <div>
                        <div className="mb-1 font-gilroy font-semibold text-base text-gray-900">
                          Short Stay Recurring
                        </div>

                        <div className="text-gray-600 text-[13px] font-gilroy mb-1">
                          Fill the template form with details you'd like to customize.
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4 items-center">
                      <div className="flex items-center">

                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={shortStayChecked}
                            onChange={(e) => setShortStayChecked(e.target.checked)}
                            disabled
                            className="sr-only peer"
                          />

                          <div className="w-8 h-4 bg-gray-300 rounded-full peer-checked:bg-blue-700 after:content-[''] after:absolute after:top-[2px] after:left-[1px] after:bg-white after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4 peer-disabled:opacity-50"></div>
                        </label>

                        <span className="text-sm font-gilroy leading-none ml-2">
                          {shortStayChecked ? "On" : "Off"}
                        </span>
                      </div>

                      {/* <div>
                        <ArrowRight2 color="#28303F" size="14" varient="bold"
                          disabled={!canWriteBills}
                          onClick={handleShowLongStay} />
                      </div> */}

                    </div>


                  </div>
                </div>
              </div>

            </div>
          </div>
        )
        }

      </div>



      {/* {
        showLongStay && <LongStayRecurringModal handleClose={handleCloseLongStay} show={handleShowLongStay} />
      } */}
      {
        showShortStay && <ShortStayRecurringModal handleClose={handleCloseShortStay} show={handleShowShortStay} />
      }

      {formLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-transparent opacity-75">
          <div className="w-10 h-10 rounded-full border-4 border-transparent border-t-blue-700 animate-spin"></div>
        </div>
      )}


    </>
  );
}

export default withErrorBoundary(BillingRule);