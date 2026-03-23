/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ArrowLeft, ArchiveBook, MinusCirlce, ArrowDown, ArrowDown2, ArrowUp2, CloseCircle } from "iconsax-react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from '../../../Components/ErrorMessage';
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { TiTickOutline } from "react-icons/ti";


function LongStayRecurringModal() {

    const navigate = useNavigate();
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const [billingDate, setBillingDate] = useState(null);
    // const [dueDate, setDueDate] = useState(null);
    // const [noticePeriod, setNoticePeriod] = useState(null);
    const [errors, setErrors] = useState({});
    const [formLoading, setFormLoading] = useState(false)
    const [gracePeriod, setGracePeriod] = useState(null);
    const [dueDays, setDueDays] = useState("");
    const [reminderDays, setReminderDays] = useState([]);
    const [lateFeeEnabled, setLateFeeEnabled] = useState(false);
    const [lateFeeType, setLateFeeType] = useState("flat");
    const [flatFeeAmount, setFlatFeeAmount] = useState(300);
    const [billingMethod, setBillingMethod] = useState("fixed");
    const [billingPeriod, setBillingPeriod] = useState("prepaid")
    const [openDayPicker, setOpenDayPicker] = useState(false);
    const pickerRef = useRef(null);
    const [openDuePicker, setOpenDuePicker] = useState(false);
    const duePickerRef = useRef(null);
    const [openNoticePicker, setOpenNoticePicker] = useState(false);
    const [noticeDays, setNoticeDays] = useState(null);
    const noticePickerRef = useRef();

    const [openGracePicker, setOpenGracePicker] = useState(false);
    const gracePickerRef = useRef(null);
    const [openReminderPicker, setOpenReminderPicker] = useState(false);
    const reminderPickerRef = useRef(null);
    const [initialValues, setInitialValues] = useState({});
    const days = Array.from({ length: 28 }, (_, i) => i + 1);
    const noChangeRef = useRef(null);

 const noticeDaysOptions = Array.from({ length: 31 }, (_, i) => i + 1);

    const dayOptions = Array.from({ length: 31 }, (_, i) => ({
        value: (i + 1).toString().padStart(2, '0'),
        label: (i + 1).toString().padStart(2, '0'),
    }));
    const [dailyFeeAmount, setDailyFeeAmount] = useState("");
    const [maxLateFeeCap, setMaxLateFeeCap] = useState("");

    const reminderRange = Array.from(
        { length: dueDays || 0 },
        (_, i) => i + 1
    );

    const handleChange = (method) => {
        setErrors({})
        dispatch({ type: 'REMOVE_BILLING_RULE_ERROR' })
        setBillingMethod(method);
    };

    const handleChangePaid = (period) => {
        setErrors({})
        dispatch({ type: 'REMOVE_BILLING_RULE_ERROR' })
        setBillingPeriod(period)
    }


    const [payments, setPayments] = useState([
        { fromDay: '', toDay: '', amountPerDay: '' },
    ]);

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedPayments = [...payments];
        updatedPayments[index][name] = value;
        setPayments(updatedPayments);
    };


    const handleAddRow = () => {
        setPayments([
            ...payments,
            { fromDay: '', toDay: '', amountPerDay: '' }
        ]);
    };

    const handleDeleteRow = (index) => {
        const updatedPayments = payments.filter((_, i) => i !== index);
        setPayments(updatedPayments);
    };






    const selectStyle = {
        control: (base) => ({
            ...base,
            height: 45,
            border: "1px solid #D9D9D9",
            borderRadius: "8px",
            fontSize: "14px",
            color: "#4B4B4B",
            fontFamily: "Gilroy",
            fontWeight: 500,
        }),
        menu: (base) => ({
            ...base,
            backgroundColor: "#f8f9fa",
            border: "1px solid #ced4da",
            fontFamily: "Gilroy",
        }),
        menuList: (base) => ({
            ...base,
            backgroundColor: "#f8f9fa",
            maxHeight: "120px",
            padding: 0,
            scrollbarWidth: "thin",
            overflowY: "auto",
            fontFamily: "Gilroy",
        }),
        placeholder: (base) => ({
            ...base,
            color: "#555",
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: "#555",
            display: "inline-block",
            fill: "currentColor",
            lineHeight: 1,
            stroke: "currentColor",
            strokeWidth: 0,
            cursor: "pointer",
        }),
        option: (base, state) => ({
            ...base,
            cursor: "pointer",
            backgroundColor: state.isFocused
                ? "#1E45E1"
                : "white",
            color: state.isFocused
                ? "white"
                : "#222",
        }),
        indicatorSeparator: () => ({
            display: "none",
        }),
    };

    const handleDailyFeeAmountChange = (e) => {
        setDailyFeeAmount(e.target.value);
    };

    const handleMaxLateFeeCapChange = (e) => {
        setMaxLateFeeCap(e.target.value);
    };
    const handleFlatFeeAmountChange = (e) => {
        setFlatFeeAmount(e.target.value);
    };



    const handleSave = () => {
        dispatch({ type: 'REMOVE_BILLING_RULE_ERROR' })
        const newErrors = {};
        if (!billingDate) {
            newErrors.billingDate = "Please select billing date of month";
        }

        // const isChanged =
        //     billingDate !== initialValues.billingDate ||
        //     billingMethod !== initialValues.billingMethod 


        // if (!isChanged) {
        //     newErrors.noChange = "No Changes Detected";
        // }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            dispatch({
                type: "SETTINGSADD_RECURRING",
                payload: {
                    hostelId: state?.login?.selectedHostel_Id || "",
                    startDate: billingDate,
                    calculationType: billingMethod,
                    billingModel: billingPeriod,
                }
            })
            setFormLoading(true)
        }
    };



    useEffect(() => {
        if (state?.Settings?.SettingsBillsGetRecurring) {
            const apiData = state?.Settings?.SettingsBillsGetRecurring;

            const billingStart = apiData?.billStartDate;
            const billingType =
                apiData?.typeOfBilling?.toLowerCase()?.trim() === "fixed"
                    ? "fixed"
                    : "joining_date_based";

            setBillingMethod(billingType);
            const dueDate = apiData?.billDueDate;
            const GracePeriods = apiData?.gracePeriod
            const NoticeDays = apiData?.noticePeriod
            const remainder = apiData?.reminderDays?.map((day) => ({
                value: day,
                label: day.toString().padStart(2, "0")
            }));
            setReminderDays(remainder);

            setBillingDate(billingStart);

            setDueDays(dueDate);
            setGracePeriod(GracePeriods)
            setNoticeDays(NoticeDays)
            setInitialValues({
                billingDate: billingStart,
                billingMethod: billingType,
                dueDays: dueDate,
                gracePeriod: GracePeriods,
                reminderDays: remainder,
                noticeDays: NoticeDays
                // billingModal: 
            });
        }
    }, [state?.Settings?.SettingsBillsGetRecurring]);


    useEffect(() => {
        return () => {
            dispatch({ type: "REMOVE_BILLING_RULE_ERROR" });
            setErrors({});
        };
    }, []);


    const handleSaveChanges = () => {
        setErrors({});
        dispatch({ type: 'REMOVE_BILLING_RULE_ERROR' })
        const newErrors = {};
        if (!dueDays) {
            newErrors.dueDate = "Please select billing due days of month";
        }


        const currentData = {
            dueDays: Number(dueDays),
            gracePeriod: Number(gracePeriod) || "",
            billingMethod: billingMethod,
            reminderDays: reminderDays?.map((item) => item.value) || [],
            noticeDays: noticeDays
        };

        const initialData = {
            dueDays: Number(initialValues?.dueDays),
            gracePeriod: Number(initialValues?.gracePeriod) || "",
            billingMethod: initialValues?.billingMethod,
            reminderDays: initialValues?.reminderDays?.map((item) => item.value) || [],
            noticeDays: initialValues?.noticeDays
        };

        const normalize = (data) => ({
            dueDays: Number(data.dueDays),
            gracePeriod: Number(data.gracePeriod),
            billingMethod: data.billingMethod,
            noticeDays: Number(data.noticeDays),
                reminderDays: [...(data.reminderDays || [])].sort()
        });
        const isChanged =
            JSON.stringify(normalize(currentData)) !==
            JSON.stringify(normalize(initialData));


        if (!isChanged) {
            newErrors.noChangeBottom = "No changes detected";
            setTimeout(() => {
                noChangeRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }, 100);
        }





        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            dispatch({
                type: "SETTINGSADD_RECURRING",
                payload: {
                    hostelId: state?.login?.selectedHostel_Id || "",
                    dueDate: Number(dueDays),
                    gracePeriodDays: Number(gracePeriod) || '',
                    reminderDays: reminderDays?.map(item => item.value),
                    noticeDays: noticeDays
                }
            })
            setFormLoading(true)
        }
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setOpenDayPicker(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (duePickerRef.current && !duePickerRef.current.contains(event.target)) {
                setOpenDuePicker(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (gracePickerRef.current && !gracePickerRef.current.contains(event.target)) {
                setOpenGracePicker(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                reminderPickerRef.current &&
                !reminderPickerRef.current.contains(event.target)
            ) {
                setOpenReminderPicker(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (noticePickerRef.current && !noticePickerRef.current.contains(event.target)) {
                setOpenNoticePicker(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);




    useEffect(() => {
        if (state.Settings.SettingsRecurringAddSuccess === 200) {
            setFormLoading(false)
            dispatch({ type: "SETTINGS_GET_RECURRING", payload: { hostelId: state.login.selectedHostel_Id } });
            setTimeout(() => {
                dispatch({ type: "CLEAR_SETTINGSADDRECURRING_STATUS_CODE" });
            }, 100);
        }
    }, [state.Settings.SettingsRecurringAddSuccess]);


    useEffect(() => {
        if (state.createAccount?.networkError || state.Settings.billingRuleError) {
            setFormLoading(false)
            setTimeout(() => {
                dispatch({ type: 'CLEAR_NETWORK_ERROR' })
            }, 3000)
        }

    }, [state.createAccount?.networkError, state.Settings.billingRuleError])


    const handleNavigateBillingRule = (tabName) => {
        setErrors({})
        dispatch({ type: 'REMOVE_BILLING_RULE_ERROR' })
        const hostelId = state.login?.selectedHostel_Id;
        if (hostelId) {
            navigate(`/settings/${hostelId}/${tabName}`);
        } else {
            navigate(`/settings/${tabName}`);
        }

    }


    const toggleReminderDay = (day) => {
        setErrors((prev) => ({ ...prev, noChangeBottom: "" }))
        setReminderDays((prev = []) => {
            const exists = prev.find((d) => d.value === day);

            if (exists) {
                return prev.filter((d) => d.value !== day);
            }

            return [
                ...prev,
                {
                    value: day,
                    label: day.toString().padStart(2, "0"),
                },
            ];
        });
    };


    // const startDay = "01";

    // const endDay = gracePeriod
    //     ? gracePeriod.toString().padStart(2, "0")
    //     : null;

    // const startFrom = gracePeriod
    //     ? (gracePeriod + 1).toString().padStart(2, "0")
    //     : null;


    const startDay = billingDate;
    const endDay = billingDate + gracePeriod;
    const startFrom = endDay + 1;

    const getEndDayDate = (billingDate) => {
        if (!billingDate) return null;

        if (billingDate === 1) {
            const now = new Date();
            return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
        }

        return billingDate - 1;
    };

    const endDayDate = getEndDayDate(billingDate);


    const isDisabled =
        !state.UsersList.hotelDetailsinPg?.canModifyBilling;







    return (
        <>
            {formLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-transparent opacity-75 z-10">
                    <div className="w-10 h-10 border-4 border-t-[#1E45E1] border-r-transparent rounded-full animate-spin"></div>
                </div>
            )}

            <div className="sticky top-0 left-0 right-0 z-50 bg-white flex flex-col md:flex-row justify-between items-center min-h-[50px] px-1.5 whitespace-nowrap font-gilroy">
                <div>
                    <label className="text-black font-semibold text-[18px] font-gilroy whitespace-nowrap flex gap-2 items-center">
                        <ArrowLeft size={24} color="#292D32" className="cursor-pointer"
                            onClick={() => handleNavigateBillingRule("billing-rule")} /> Billing Rule
                    </label>
                    <div>
                        <label className="text-[#7C7C7C] font-medium text-sm">Billing Rule / </label>
                        <span className="text-[#4A4A4A] text-sm  font-semibold"> Long Stay Recurring </span>
                    </div>
                </div>
            </div>
            <div className="bg-[#FAFAFA] h-fit p-3 font-gilroy">


                <div className="bg-white rounded-xl shadow-sm p-3 font-gilroy mb-3">


                    <h2 className="text-lg font-semibold text-gray-800 font-gilroy ">
                        Billing Method
                    </h2>

                    <label className="text-sm text-gray-500">
                        Choose how rent invoices are generated for tenants.
                    </label>


                    <div className="flex gap-4 my-2">


                        <div
                            onClick={() => handleChange("fixed")}

                            className={`flex items-center gap-3 p-2 max-h-[150px] rounded-lg border w-full transition cursor-pointer
    ${billingMethod === "fixed"
                                    ? "border border-[#4E61F6] bg-[#EEF2FF] ring-2 ring-[#4E61F6]/30"
                                    : "border-gray-200 bg-white shadow-sm"
                                }`}
                        >
                            <input
                                type="radio"
                                name="billingMethod"
                                value="fixed"
                                checked={billingMethod === "fixed"}
                                className="mt-1 accent-[#1E45E1] scale-100"
                            />

                            <div>
                                <label className="text-sm font-semibold text-[#222222]">
                                    Monthly Recurring
                                </label>
                                <p className="text-xs text-gray-500">
                                    It's automatically calculated based on bill start date
                                </p>
                            </div>
                        </div>

                        <div
                            //  onClick={() => handleChange("joining_date_based")}
                            className={`flex items-center max-h-[150px] gap-3 p-2 shadow-sm rounded-lg border w-full cursor-pointer transition
          ${billingMethod === "joining_date_based"
                                    ? "border border-[#88A0FF] bg-white shadow-[0_0_6px_#869EFF]"
                                    : "border-gray-200  shadow-sm bg-gray-200"
                                }`}
                        >
                            <input
                                type="radio"
                                name="billingMethod"
                                value="joining_date_based"
                                checked={billingMethod === "joining_date_based"}
                                disabled
                                className="mt-1 accent-[#1E45E1] disabled:accent-[#DBDBDB] disabled:cursor-not-allowed disabled:opacity-60"
                            // className="mt-1 accent-[#DBDBDB]  cursor-pointer"

                            />

                            <div>
                                <label className="text-sm font-semibold text-[#222222] cursor-pointer ">
                                    Tenant Joining Based
                                </label>
                                <label className="text-xs text-gray-500 cursor-pointer whitespace-nowrap">
                                    Invoices are generated based on each tenant's join date.
                                </label>
                            </div>
                        </div>

                    </div>
                </div>


                <div className="bg-white rounded-xl shadow-sm p-3 font-gilroy">


                    <div className="mb-2 flex justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800 font-gilroy">
                                Basic Billing Configuration
                            </h2>
                            <label className="text-sm text-gray-500">
                                Defines the monthly rent period.
                            </label>
                        </div>
                        <div className="bg-[#F0FDF4] h-fit text-[#008236] gap-1 rounded-md text-xs font-medium px-4 py-1.5 flex items-center">
                            <TiTickOutline color="#008236" /> Configured
                        </div>
                    </div>

                    <div className="border-t border-[#E5E5E5] my-3"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative" ref={pickerRef} >
                            <label className="block text-sm text-gray-700 font-gilroy font-medium mb-1">
                                Billing Start Date (Day of Month) <span className="text-red-600 text-sm">*</span>
                            </label>

                            <div
                                onClick={() => !isDisabled && setOpenDayPicker(!openDayPicker)}
                                className={`w-full border border-gray-300 min-h-[40px] rounded-md px-3 py-2.5 text-sm flex justify-between items-center
  ${isDisabled ? "bg-gray-100 cursor-not-allowed" : "bg-white cursor-pointer"}`}
                            >
                                <span className={billingDate ? "text-gray-900" : "text-gray-400"}>
                                    {billingDate ? billingDate.toString().padStart(2, "0") : "Select Date"}
                                </span>

                                <span className="text-gray-400">{openDayPicker ? <ArrowUp2 size="18" color="#1E45E1" /> : <ArrowDown2 size="18" color="#1E45E1" />}</span>
                            </div>


                            {openDayPicker && (
                                <div className="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow-md p-2">
                                    <div className="grid grid-cols-5 gap-3">
                                        {days.map((day) => (
                                            <button
                                                key={day}
                                                type="button"
                                                onClick={() => {
                                                    setBillingDate(day);
                                                    setOpenDayPicker(false);
                                                    setErrors((prev) => ({ ...prev, billingDate: "" }));
                                                    setErrors((prev) => ({ ...prev, noChange: "" }))
                                                    setErrors((prev) => ({ ...prev, noChangeBottom: "" }))
                                                    dispatch({ type: "REMOVE_BILLING_RULE_ERROR" });
                                                }}
                                                className={`w-10 h-10 rounded-full text-xs flex items-center justify-center
            ${billingDate === day
                                                        ? "bg-blue-600 text-white"
                                                        : "text-gray-700 hover:bg-gray-200"
                                                    }`}
                                            >
                                                {day.toString().padStart(2, "0")}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {billingMethod === "fixed" && (
                                <p className="text-xs text-gray-400 mt-1">
                                    Select a day between 1–28
                                </p>
                            )}

                            {errors.billingDate && (
                                <ErrorMessage message={errors.billingDate} type="error" />
                            )}
                        </div>


                        <div>
                            <label className="block text-sm text-gray-700 font-gilroy font-medium mb-1">
                                Billing End Date {
                                    billingMethod === "fixed" && <span>(Auto-calculated)</span>}
                            </label>

                            <div className="bg-gray-100 border border-gray-200 rounded-md px-3 py-2.5 min-h-[40px] text-sm text-gray-500">
                                {billingDate ? `${endDayDate.toString().padStart(2, "0")}` : "—"}
                            </div>
                            {
                                billingMethod === "fixed" &&
                                <p className="text-xs text-gray-400 mt-1">
                                    Automatically calculated based on start date
                                </p>
                            }
                        </div>

                    </div>

                    <div className="">
                        <h2 className="text-lg font-semibold text-gray-800 font-gilroy ">
                            Billing Schedule
                        </h2>

                        <div className="flex grid grid-cols-1 md:grid-cols-2  gap-4 my-2">


                            <div
                                onClick={() => !isDisabled && handleChangePaid("prepaid")}
                                className={`flex items-center max-h-[150px] gap-3 p-2 rounded-lg border w-full transition
    ${isDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
    ${billingPeriod === "prepaid"
                                        ? "border border-[#88A0FF] bg-white shadow-[0_0_6px_#869EFF]"
                                        : "border-gray-200 bg-white shadow-sm"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="billingPeriod"
                                    value="prepaid"
                                    checked={billingPeriod === "prepaid"}
                                    disabled={isDisabled}
                                    className="mt-1 accent-[#4E61F6] cursor-pointer disabled:cursor-not-allowed"
                                />

                                <div>
                                    <label className="text-sm font-semibold text-[#222222] cursor-pointer">
                                        Prepaid
                                    </label>
                                    <label className="text-xs text-gray-500">
                                        Invoices will generate at the start date of month
                                    </label>
                                </div>
                            </div>


                            <div
                                onClick={() => !isDisabled && handleChangePaid("postpaid")}
                                className={`flex items-center max-h-[150px] gap-3 p-2 rounded-lg border w-full transition
    ${isDisabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}
    ${billingPeriod === "postpaid"
                                        ? "border border-[#88A0FF] bg-white shadow-[0_0_6px_#869EFF]"
                                        : "border-gray-200 bg-white shadow-sm"
                                    }`}
                            >
                                <input
                                    type="radio"
                                    name="billingPeriod"
                                    value="postpaid"
                                    checked={billingPeriod === "postpaid"}
                                    disabled={isDisabled}
                                    className="mt-1 accent-[#1E45E1] disabled:accent-[#DBDBDB] disabled:cursor-not-allowed"
                                />

                                <div>
                                    <label className="text-sm font-semibold text-[#222222]">
                                        Postpaid
                                    </label>
                                    <label className="text-xs text-gray-500 whitespace-nowrap">
                                        Invoices will generate at the end date of month
                                    </label>
                                </div>
                            </div>

                        </div>

                    </div>
                    {state.Settings.billingRuleError && (
                        <div className="mt-4">
                            <ErrorMessage message={state.Settings.billingRuleError} type="error" />
                        </div>
                    )}

                    {errors.noChange && (
                        <div className="mt-4">
                            <ErrorMessage message={errors.noChange} type="error" />
                        </div>

                    )}


                    {
                        billingMethod === "joining_date_based" &&
                        <div className="mt-4 flex items-center gap-2 bg-[#FFF6E6] border border-[#FFF6E6] text-[#795216] text-xs px-3 py-2 rounded-md ">
                            <span ><AiOutlineExclamationCircle color="#795216" size="16" /></span>
                            This method doesn’t allow to edit, cause each tenant will have a personal billing cycle based on their joining date.
                        </div>
                    }

                    {
                        billingMethod === "fixed" &&

                        <div className="flex justify-end mt-6">
                            <button
                                disabled={!state.UsersList.hotelDetailsinPg?.canModifyBilling}
                                onClick={handleSave}
                                className={`flex items-center gap-2 text-sm font-gilroy px-5 py-2.5 rounded-lg border
  ${state.UsersList.hotelDetailsinPg?.canModifyBilling
                                        ? "bg-[#EEF1FF] hover:bg-[#EEF1FF] text-[#081E76] border-1 border-[#081E76] cursor-pointer"
                                        : "bg-gray-200 text-gray-500 border-gray-200 cursor-not-allowed"
                                    }`}
                            >
                                <ArchiveBook
                                    size="16"
                                    color={
                                        state.UsersList.hotelDetailsinPg?.canModifyBilling ? "#081E76" : "#9CA3AF"
                                    }
                                />

                                {state?.Settings?.SettingsBillsGetRecurring?.billStartDate
                                    ? "Edit Configuration"
                                    : "Save Configuration"}
                            </button>
                        </div>
                    }

                </div>



                <div className="space-y-6 mt-4">


                    {billingMethod === "fixed" && (
                        <div className="bg-white rounded-xl shadow-sm p-3 font-gilroy">

                            <h2 className="text-lg font-semibold text-[#1F1F1F]">
                                Full Rent Grace Period
                            </h2>

                            <label className="text-sm text-[#616161] mt-1 mb-3 font-medium block">
                                Tenants joining within the first few days of the billing cycle will be
                                charged the full month rent. After this period, rent will be calculated
                                based on stay duration.
                            </label>

                            <label className="block text-sm font-medium text-[#1F1F1F] mb-2">
                                Grace Period (Days)
                            </label>

                            <div className="relative max-w-xs" ref={gracePickerRef}>


                                <div
                                    onClick={() => setOpenGracePicker(!openGracePicker)}
                                    className="w-full border border-gray-300 min-h-[40px] rounded-md px-3 py-2.5 text-sm flex justify-between items-center cursor-pointer bg-white"
                                >
                                    <span className={gracePeriod ? "text-gray-900" : "text-gray-400"}>
                                        {gracePeriod ? gracePeriod.toString().padStart(2, "0") : "Select Grace Period"}
                                    </span>

                                    <div className="flex items-center gap-2">
                                        {gracePeriod > 0 && (
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setGracePeriod(null);
                                                    setErrors((prev) => ({ ...prev, noChange: "" }));
                                                    setErrors((prev) => ({ ...prev, noChangeBottom: "" }));
                                                }}
                                                className="text-red-500"
                                            >
                                                <CloseCircle size="14" />
                                            </button>



                                        )}




                                        <span>
                                            {openGracePicker
                                                ? <ArrowUp2 size="18" color="#1E45E1" />
                                                : <ArrowDown2 size="18" color="#1E45E1" />}
                                        </span>
                                    </div>
                                </div>


                                {openGracePicker && (
                                    <div className="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow-md p-2">
                                        <div className="grid grid-cols-5 gap-1">
                                            {days.map((day) => (
                                                <button
                                                    key={day}
                                                    type="button"
                                                    onClick={() => {
                                                        setErrors((prev) => ({ ...prev, noChange: "" }))
                                                        setErrors((prev) => ({ ...prev, noChangeBottom: "" }))
                                                        setGracePeriod(day);
                                                        setOpenGracePicker(false);

                                                    }}
                                                    className={`w-10 h-10 rounded-full text-xs flex items-center justify-center
                ${gracePeriod === day
                                                            ? "bg-blue-600 text-white"
                                                            : "text-gray-700 hover:bg-gray-200"
                                                        }`}
                                                >
                                                    {day.toString().padStart(2, "0")}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>


                            {gracePeriod > 0 && (
                                <div className="mt-4 flex items-center gap-2 bg-[#D0DFFF] border border-[#D0DFFF] text-[#1E45E1] text-xs px-3 py-2 rounded-md">
                                    <span>
                                        <AiOutlineExclamationCircle color="#1E45E1" size="16" />
                                    </span>

                                    Full rent will apply if tenant joins from{" "}
                                    <b>{startDay}</b> to <b>{endDay}</b> of the month.
                                    Prorated rent applies from <b>{startFrom}</b> onwards.
                                </div>
                            )}

                        </div>
                    )}


                    <div className="bg-white rounded-xl shadow-sm p-3 font-gilroy">

                        <h2 className="text-lg font-semibold text-[#1F1F1F] font-gilroy">
                            Payment Timeline (Due days)
                        </h2>

                        <label className="text-sm text-[#616161] mt-1 mb-3 font-medium">
                            Configure payment due dates and reminder settings
                        </label>

                        <div className="grid grid-cols-2 gap-6 items-start">


                            <div className="relative" ref={duePickerRef}>
                                <label className="block text-sm font-medium text-[#1F1F1F] mb-2">
                                    Due Within (Days)
                                </label>


                                <div
                                    onClick={() => setOpenDuePicker(!openDuePicker)}
                                    className="w-full border border-gray-300 rounded-md min-h-[40px] px-3 py-2.5 text-sm flex justify-between items-center cursor-pointer bg-white"
                                >
                                    <span className={dueDays ? "text-gray-900" : "text-gray-400"}>
                                        {dueDays ? dueDays : "Select Due Days"}
                                    </span>

                                    <span className="text-gray-400">{openDuePicker ? <ArrowUp2 size="18" color="#1E45E1" /> : <ArrowDown2 size="18" color="#1E45E1" />}</span>
                                </div>


                                {openDuePicker && (
                                    <div className="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow-md p-2">
                                        <div className="grid grid-cols-5 gap-3">
                                            {days?.map((day) => (
                                                <button
                                                    key={day}
                                                    type="button"
                                                    onClick={() => {
                                                        setDueDays(day);
                                                        setReminderDays([])
                                                        setErrors((prev) => ({ ...prev, dueDate: "" }));
                                                        setErrors((prev) => ({ ...prev, noChange: "" }))
                                                        setErrors((prev) => ({ ...prev, noChangeBottom: "" }))
                                                        dispatch({ type: "REMOVE_BILLING_RULE_ERROR" });
                                                        setOpenDuePicker(false);
                                                    }}
                                                    className={`w-10 h-10 rounded-full text-xs flex items-center justify-center
            ${dueDays === day
                                                            ? "bg-blue-600 text-white"
                                                            : "text-gray-700 hover:bg-gray-200"
                                                        }`}
                                                >
                                                    {day.toString().padStart(2, "0")}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {errors.dueDate && (
                                    <ErrorMessage message={errors.dueDate} type="error" />
                                )}

                                {dueDays && (
                                    <div className="mt-3 flex items-center gap-2 bg-[#FFF4ED] border border-[#FFE0CC] text-[#C2410C] text-xs px-3 py-2 rounded-md">
                                        <span>
                                            <AiOutlineExclamationCircle color="#C2410C" size="16" />
                                        </span>
                                        Overdue starts from {dueDays} of the month
                                    </div>
                                )}
                            </div>

                            <div className="relative" ref={reminderPickerRef}>

                                <label className="block text-sm font-medium text-[#1F1F1F] mb-2">
                                    Send Reminder (Days Before Due)
                                </label>

                                <div
                                    onClick={() => dueDays && setOpenReminderPicker(!openReminderPicker)}
                                    className={`w-full border border-gray-300 rounded-md min-h-[40px] px-3 py-2.5 text-sm flex justify-between items-center
${dueDays ? "cursor-pointer bg-white" : "bg-gray-100 cursor-not-allowed"}
`}
                                >

                                    <div className="flex flex-wrap gap-2">
                                        {reminderDays?.length === 0 && (
                                            <span className="text-gray-400 text-sm">Select Reminder Days</span>
                                        )}

                                        {reminderDays?.map((day) => (
                                            <div
                                                key={day.value}
                                                className="flex items-center gap-1 bg-[#EEF2FF] text-[#1E45E1] text-xs px-2 py-1 rounded-md"
                                            >
                                                {day.label}

                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setErrors((prev) => ({ ...prev, noChangeBottom: "" }));
                                                        setErrors((prev) => ({ ...prev, noChange: "" }));
                                                        setReminderDays((prev) =>
                                                            prev.filter((d) => d.value !== day.value)
                                                        );

                                                    }}
                                                    className="text-red-500"
                                                >
                                                    <CloseCircle size="14" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                    <span>
                                        {openReminderPicker
                                            ? <ArrowUp2 size="18" color="#1E45E1" />
                                            : <ArrowDown2 size="18" color="#1E45E1" />}
                                    </span>

                                </div>


                                {openReminderPicker && (

                                    <div className="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow-md p-2">

                                        <div className="grid grid-cols-5 gap-3">

                                            {reminderRange.map((day) => {

                                                const selected = reminderDays?.some((d) => d.value === day);

                                                return (

                                                    <button
                                                        key={day}
                                                        type="button"
                                                        onClick={() => toggleReminderDay(day)}
                                                        className={`w-10 h-10 rounded-full text-xs flex items-center justify-center
${selected
                                                                ? "bg-blue-600 text-white"
                                                                : "text-gray-700 hover:bg-gray-200"
                                                            }`}
                                                    >

                                                        {day.toString().padStart(2, "0")}

                                                    </button>

                                                );

                                            })}

                                        </div>

                                    </div>

                                )}

                                <label className="text-xs text-[#616161] mt-2 font-medium block">
                                    Automatic payment reminder will be sent before due date
                                </label>

                            </div>

                        </div>

                    </div>




                    <div className="bg-white rounded-xl shadow-sm p-3 font-gilroy">

                        <h2 className="text-lg font-semibold text-[#1F1F1F] font-gilroy">
                            Notice Period (Due days)
                        </h2>

                        <label className="text-sm text-[#616161] mt-1 mb-3 font-medium">
                            Set default notice period days to get serve by tenants.
                        </label>

                        <div className="grid grid-cols-2 gap-6 items-start">


                            <div className="relative" >
                                <label className="block text-sm font-medium text-[#1F1F1F] mb-2">
                                    Notice period (Days)
                                </label>

                                <div
                                    onClick={() => setOpenNoticePicker(!openNoticePicker)}
                                    className="w-full border border-gray-300 rounded-md min-h-[40px] px-3 py-2.5 text-sm flex justify-between items-center cursor-pointer bg-white"
                                >
                                    <span className={noticeDays ? "text-gray-900" : "text-gray-400"}>
                                        {noticeDays ? noticeDays : "Select Notice Days"}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        {noticeDays && (
                                            <span
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setNoticeDays(null);
                                                    setErrors((prev) => ({ ...prev, noticeDate: "" }));
                                                }}
                                                className="cursor-pointer flex items-center"
                                            >
                                                <CloseCircle size="14" color="#FF0000" />
                                            </span>
                                        )}
                                        <span className="text-gray-400">
                                            {openNoticePicker ? (
                                                <ArrowUp2 size="18" color="#1E45E1" />
                                            ) : (
                                                <ArrowDown2 size="18" color="#1E45E1" />
                                            )}
                                        </span>
                                    </div>
                                </div>

                                {openNoticePicker && (
                                    <div ref={noticePickerRef} className="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow-md p-2">
                                        <div className="grid grid-cols-5 gap-3">
                                            {noticeDaysOptions?.map((day) => (
                                                <button
                                                    key={day}
                                                    type="button"
                                                    onClick={() => {
                                                        setNoticeDays(day);
                                                        setErrors((prev) => ({ ...prev, noticeDate: "" }));
                                                        setErrors((prev) => ({ ...prev, noChange: "" }));
                                                        setErrors((prev) => ({ ...prev, noChangeBottom: "" }));
                                                        dispatch({ type: "REMOVE_BILLING_RULE_ERROR" });
                                                        setOpenNoticePicker(false);
                                                    }}
                                                    className={`w-10 h-10 rounded-full text-xs flex items-center justify-center
              ${noticeDays === day
                                                            ? "bg-blue-600 text-white"
                                                            : "text-gray-700 hover:bg-gray-200"
                                                        }`}
                                                >
                                                    {day.toString().padStart(2, "0")}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {errors.noticeDate && (
                                    <ErrorMessage message={errors.noticeDate} type="error" />
                                )}

                                {noticeDays && (
                                    <div className="mt-3 flex items-center gap-2 bg-[#D0DFFF] border border-[#D0DFFF] text-[#1E45E1] text-xs px-3 py-2 rounded-md whitespace-nowrap w-fit">
                                        <AiOutlineExclamationCircle color="#1E45E1" size="16" />
                                        Tenants must serve the notice period days before leaving the property
                                    </div>
                                )}
                            </div>


                        </div>

                    </div>












                    {

                        import.meta.env.MODE === "development" &&
                        <>

                            <div className="bg-white  rounded-xl shadow-sm p-3 font-gilroy">

                                <div className="flex justify-between items-center">

                                    <div>
                                        <h2 className="text-lg font-semibold text-[#1F1F1F] font-gilroy">
                                            Late Fee Configuration (Fine Amount)
                                        </h2>
                                        <label className="text-sm text-[#616161] mt-1 mb-3 font-medium">
                                            Set up late payment penalties and charges
                                        </label>
                                    </div>

                                </div>
                                <div className="border-t border-[#E5E5E5] my-2"></div>


                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="">
                                            <label className="text-sm text-[#1F1F1F] mt-2 font-semibold">
                                                Enable Late Fees
                                            </label>
                                        </div>
                                        <div>
                                            <label className="text-sm text-gray-500 mt-2">
                                                Automatically charge late fees on overdue payments
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">

                                        <span className="text-sm text-gray-500">
                                            {lateFeeEnabled ? "On" : "Off"}
                                        </span>

                                        <button disabled={import.meta.env.MODE === "production" || import.meta.env.MODE === "qa"}
                                            onClick={() => setLateFeeEnabled(!lateFeeEnabled)}
                                            className={`w-11 h-6 flex items-center rounded-full p-1 transition 
        ${lateFeeEnabled ? "bg-[#1E45E1]" : "bg-gray-300"}`}
                                        >
                                            <div
                                                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition
          ${lateFeeEnabled ? "translate-x-5" : "translate-x-0"}`}
                                            />
                                        </button>

                                    </div>
                                </div>





                                {lateFeeEnabled && (

                                    <div className="bg-white border-l-2 border-[#1E45E1] p-3 font-gilroy mt-2">

                                        <label className="text-sm font-medium text-[#1F1F1F] mb-3 block">
                                            Late Fee Type
                                        </label>

                                        <div className="space-y-2">

                                            <div
                                                onClick={() => setLateFeeType("flat")}
                                                className={`flex items-center gap-3 p-2 border  rounded-lg cursor-pointer
      ${lateFeeType === "flat"
                                                        ? "bg-[#D0DFFF] border-1 border-[#D0DFFF]"
                                                        : "border-gray-200"}`}
                                            >
                                                <input
                                                    type="radio"
                                                    checked={lateFeeType === "flat"}
                                                    readOnly
                                                />

                                                <div>
                                                    <div>
                                                        <label className="text-sm font-medium text-[#1F1F1F]">
                                                            Flat Fee
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <label className="text-xs text-gray-500">
                                                            One-time charge when payment becomes overdue
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>



                                            <div
                                                onClick={() => setLateFeeType("daily")}
                                                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer
      ${lateFeeType === "daily"
                                                        ? "bg-[#D0DFFF] border-1 border-[#D0DFFF]"
                                                        : "border-gray-200  border"}`}
                                            >
                                                <input
                                                    type="radio"
                                                    checked={lateFeeType === "daily"}
                                                    readOnly
                                                />

                                                <div>
                                                    <div>
                                                        <label className="text-sm font-medium text-[#1F1F1F]">
                                                            Daily Fee
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <label className="text-xs text-gray-500">
                                                            Fixed amount charged per day after due date
                                                        </label>
                                                    </div>
                                                </div>

                                            </div>



                                            <div
                                                onClick={() => setLateFeeType("tiered")}
                                                className={`flex items-center gap-3 p-2 border rounded-lg cursor-pointer
      ${lateFeeType === "tiered"
                                                        ? "bg-[#D0DFFF] border-1 border-[#D0DFFF]"
                                                        : "border-gray-200"}`}
                                            >
                                                <input
                                                    type="radio"
                                                    checked={lateFeeType === "tiered"}
                                                    readOnly
                                                />

                                                <div>
                                                    <div>
                                                        <label className="text-sm font-medium text-[#1F1F1F]">
                                                            Tiered Daily Fee
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <label className="text-xs text-gray-500">
                                                            Variable daily charges based on overdue period
                                                        </label>
                                                    </div>
                                                </div>










                                            </div>

                                        </div>



                                        {lateFeeType === "flat" && (

                                            <div className="mt-4">

                                                <label className="text-sm font-medium text-[#1F1F1F] mb-2 block">
                                                    Flat Fee Amount (₹)
                                                </label>

                                                <div className="relative w-[220px]">
                                                    <span className="absolute left-3 top-2 text-gray-500 text-sm">
                                                        ₹
                                                    </span>

                                                    <input
                                                        type="number"
                                                        value={flatFeeAmount}
                                                        onChange={handleFlatFeeAmountChange}
                                                        className="w-full border border-gray-300 rounded-lg pl-7 pr-3 py-2 text-sm focus:ring-2 focus:ring-[#1E45E1] outline-none"
                                                    />
                                                </div>

                                            </div>

                                        )}


                                        {
                                            lateFeeType === "daily" && (

                                                <div className="grid grid-cols-2 gap-6 mt-4">


                                                    <div>

                                                        <label className="block text-sm font-medium text-[#1F1F1F] mb-2">
                                                            Daily Fee Amount (₹)
                                                        </label>

                                                        <div className="relative">

                                                            <span className="absolute left-3 top-2.5 text-gray-500 text-sm">
                                                                ₹
                                                            </span>

                                                            <input
                                                                type="number"
                                                                value={dailyFeeAmount}
                                                                onChange={handleDailyFeeAmountChange}
                                                                className="w-full border border-gray-300 rounded-lg pl-7 pr-3 py-2 text-sm focus:ring-2 focus:ring-[#1E45E1] outline-none"
                                                            />

                                                        </div>

                                                    </div>



                                                    <div>

                                                        <label className="text-sm font-medium text-[#1F1F1F] mb-2 block">
                                                            Maximum Late Fee Cap (₹)
                                                        </label>

                                                        <div className="relative">

                                                            <span className="absolute left-3 top-2.5 text-gray-500 text-sm">
                                                                ₹
                                                            </span>

                                                            <input
                                                                type="number"
                                                                value={maxLateFeeCap}
                                                                onChange={handleMaxLateFeeCapChange}
                                                                className="w-full border border-gray-300 rounded-lg pl-7 pr-3 py-2 text-sm focus:ring-2 focus:ring-[#1E45E1] outline-none"
                                                            />

                                                        </div>

                                                        <p className="text-xs text-gray-400 mt-2">
                                                            Late fees will not exceed this amount regardless of delay duration
                                                        </p>

                                                    </div>

                                                </div>

                                            )
                                        }

                                        {lateFeeType === "tiered" && (
                                            <div>
                                                <div className="border rounded-lg  mt-3">

                                                    <table className="w-full">
                                                        <thead className="bg-gray-100">
                                                            <tr>
                                                                <th className="px-4 py-1.5 rounded-tl-lg text-xs text-gray-500 whitespace-nowrap">FROM DAY</th>
                                                                <th className="px-4 py-1.5  text-xs text-gray-500 whitespace-nowrap">TO DAY</th>
                                                                <th className="px-4 py-1.5  text-xs text-gray-500 whitespace-nowrap">AMOUNT PER DAY (₹)</th>
                                                                <th className="px-4 py-1.5 rounded-tr-lg text-xs text-gray-500 whitespace-nowrap">ACTION</th>
                                                            </tr>
                                                        </thead>

                                                        <tbody>
                                                            {payments.map((payment, index) => (
                                                                <tr key={index} className="">

                                                                    <td className="px-4 py-2">
                                                                        <Select
                                                                            options={dayOptions}
                                                                            value={dayOptions.find(option => option.value === payment.fromDay)}
                                                                            styles={selectStyle}
                                                                            placeholder="Select"
                                                                            menuPlacement="bottom"
                                                                            onChange={(selected) =>
                                                                                handleInputChange(index, {
                                                                                    target: { name: "fromDay", value: selected?.value }
                                                                                })
                                                                            }
                                                                        />
                                                                    </td>

                                                                    <td className="px-4 py-2">
                                                                        <Select
                                                                            options={dayOptions}
                                                                            value={dayOptions.find(option => option.value === payment.toDay)}
                                                                            styles={selectStyle}
                                                                            menuPlacement="bottom"
                                                                            placeholder="Select"
                                                                            onChange={(selected) =>
                                                                                handleInputChange(index, {
                                                                                    target: { name: "toDay", value: selected?.value }
                                                                                })
                                                                            }
                                                                        />
                                                                    </td>

                                                                    <td className="px-4 py-2">
                                                                        <input
                                                                            type="text"
                                                                            name="amountPerDay"
                                                                            value={payment.amountPerDay}
                                                                            onChange={(e) => handleInputChange(index, e)}
                                                                            className="w-full p-2 border-1 rounded border-gray-200 hover:border-gray-200"
                                                                        />
                                                                    </td>

                                                                    <td className="px-4 py-2 ">
                                                                        <button
                                                                            onClick={() => handleDeleteRow(index)}
                                                                            className="text-[#FF0000] px-3 py-1 flex gap-2 items-center rounded whitespace-nowrap"
                                                                        >
                                                                            Remove
                                                                            <MinusCirlce
                                                                                size="16"
                                                                                color="#FF0000"
                                                                            />
                                                                        </button>
                                                                    </td>

                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>



                                                </div>
                                                <div className="flex justify-between">

                                                    <div className="mt-3 flex items-center gap-2 bg-[#FFF4ED] border-1 border-[#FFE0CC] text-[#C2410C] text-sm px-3 py-1 rounded-md leading-none">
                                                        <span ><AiOutlineExclamationCircle color="#C2410C" size="16" /></span>
                                                        Payment Amount will applies from 12 of the Month
                                                    </div>

                                                    <button
                                                        onClick={handleAddRow}
                                                        className="mt-4  text-[#1E45E1] px-4 py-1 rounded border-1 border-[#1E45E1]"
                                                    >
                                                        + Add Slab
                                                    </button>
                                                </div>

                                                <div className="mt-4">

                                                    <label className="text-sm font-medium text-[#1F1F1F] mb-2 block">
                                                        Maximum Late Fee Amount (₹)
                                                    </label>

                                                    <div className="relative w-[220px]">
                                                        <span className="absolute left-3 top-2 text-gray-500 text-sm">
                                                            ₹
                                                        </span>

                                                        <input
                                                            type="number"

                                                            className="w-full border border-gray-300 rounded-lg pl-7 pr-3 py-2 text-sm focus:ring-2 focus:ring-[#1E45E1] outline-none"
                                                        />

                                                        <label className="text-xs text-gray-500 whitespace-nowrap">
                                                            Late fees will not exceed this amount regardless of delay duration
                                                        </label>
                                                    </div>

                                                </div>




                                            </div>

                                        )}



                                    </div>

                                )}












                            </div>
                        </>

                    }

                    {errors.noChangeBottom && (
                        <div ref={noChangeRef} className="mt-4">
                            <ErrorMessage message={errors.noChangeBottom} type="error" />
                        </div>

                    )}
                    <div className="flex justify-end gap-3 mt-6">

                        {/* <button

                            className="flex items-center gap-2 bg-[#FFFFFF] hover:bg-gray-300 border-gray-50 border text-black text-sm font-gilroy px-5 py-2.5 rounded-lg shadow"
                        >
                            Discard
                        </button> */}

                        <button onClick={handleSaveChanges}
                            className="flex items-center gap-2 bg-[#2F4ED8] hover:bg-[#243ec0] text-white text-sm font-gilroy px-5 py-2.5 rounded-lg"
                        >
                            <ArchiveBook
                                size="16"
                                color="#FFFFFF"
                            />  Save Changes
                        </button>
                    </div>





                </div>









            </div>
        </>
    );
}

export default LongStayRecurringModal;
