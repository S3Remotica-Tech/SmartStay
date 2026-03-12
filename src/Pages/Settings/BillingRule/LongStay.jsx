/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { ArrowLeft, ArchiveBook, MinusCirlce, ArrowDown, ArrowDown2, ArrowUp2, CloseCircle } from "iconsax-react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from '../../../Components/ErrorMessage';
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";



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
    const [billingMethod, setBillingMethod] = useState("MONTHLY");
    const [openDayPicker, setOpenDayPicker] = useState(false);
    const pickerRef = useRef(null);
    const [openDuePicker, setOpenDuePicker] = useState(false);
    const duePickerRef = useRef(null);
    const daysDue = Array.from({ length: 30 }, (_, i) => i + 1);
    const [openGracePicker, setOpenGracePicker] = useState(false);
    const gracePickerRef = useRef(null);
    const [openReminderPicker, setOpenReminderPicker] = useState(false);
    const reminderPickerRef = useRef(null);


    const reminderRange = Array.from(
        { length: dueDays?.value || 0 },
        (_, i) => i + 1
    );

    const handleChange = (method) => {
         dispatch({ type: 'REMOVE_BILLING_RULE_ERROR' })
        setBillingMethod(method);
    };
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

    const days = Array.from({ length: 28 }, (_, i) => i + 1);



    const dayOptions = Array.from({ length: 31 }, (_, i) => ({
        value: (i + 1).toString().padStart(2, '0'),
        label: (i + 1).toString().padStart(2, '0'),
    }));
    const [dailyFeeAmount, setDailyFeeAmount] = useState("");
    const [maxLateFeeCap, setMaxLateFeeCap] = useState("");





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

    const handleGracePeriodChange = (selected) => {
        setErrors({});
        setGracePeriod(selected);
    };

    // const handleDueDaysChange = (e) => {
    //     setDueDays(e.target.value);
    // };

    // const handleReminderDaysChange = (selected) => {
    //     setErrors({});
    //     setReminderDays(selected);
    // };

    const handleSave = () => {
        dispatch({ type: 'REMOVE_BILLING_RULE_ERROR' })
        const newErrors = {};
        if (!billingDate) {
            newErrors.billingDate = "Please select billing date of month";
        }
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            dispatch({
                type: "SETTINGSADD_RECURRING",
                payload: {
                    hostelId: state?.login?.selectedHostel_Id || "",
                    startDate: billingDate,
                    calculationType: "fixed"
                }
            })
            setFormLoading(true)
        }
    };



    useEffect(() => {
        if (state?.Settings?.SettingsBillsGetRecurring) {
            setBillingDate(state?.Settings?.SettingsBillsGetRecurring?.billStartDate)
        }

    }, [state?.Settings?.SettingsBillsGetRecurring])



    const handleSaveChanges = () => {
        setErrors({});
        dispatch({ type: 'REMOVE_BILLING_RULE_ERROR' })
        const newErrors = {};

        if (billingDate && dueDays && Number(dueDays?.value) < Number(billingDate)) {
            newErrors.dueDate = "Due date cannot be before billing date";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            dispatch({
                type: "SETTINGSADD_RECURRING",
                payload: {
                    hostelId: state?.login?.selectedHostel_Id || "",
                    dueDate: Number(dueDays?.value),
                    gracePeriodDays: Number(gracePeriod?.value),
                    calculationType: "fixed"
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

        dispatch({ type: 'REMOVE_BILLING_RULE_ERROR' })
        const hostelId = state.login?.selectedHostel_Id;
        if (hostelId) {
            navigate(`/settings/${hostelId}/${tabName}`);
        } else {
            navigate(`/settings/${tabName}`);
        }

    }


    const toggleReminderDay = (day) => {
        setReminderDays((prev) => {
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


    const startDay = "01";

    const endDay = gracePeriod
        ? gracePeriod.toString().padStart(2, "0")
        : null;

    const startFrom = gracePeriod
        ? (gracePeriod + 1).toString().padStart(2, "0")
        : null;

const endDayDate = billingDate
  ? billingDate === 1
    ? 30
    : billingDate - 1
  : null;
    return (
        <>

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


                        <div onClick={() => handleChange("MONTHLY")}
                            className={`flex items-center max-h-[150px] gap-3 p-2 rounded-lg border w-full cursor-pointer transition
          ${billingMethod === "MONTHLY"
                                    ? "border-1 border-[#88A0FF] bg-[#AEBEFF4D]"
                                    : "border-gray-200 bg-white"
                                }`}
                        >
                            <input
                                type="radio"
                                name="billingMethod"
                                value="MONTHLY"
                                checked={billingMethod === "MONTHLY"}

                                className="mt-1 accent-[#4E61F6]  cursor-pointer"
                            />

                            <div>
                                <label className="text-sm font-medium text-gray-800 cursor-pointer ">
                                    Monthly Recurring
                                </label>
                                <label className="text-xs text-gray-500 cursor-pointer ">
                                    It's automatically calculated based on bill start date
                                </label>
                            </div>
                        </div>


                        <div onClick={() => handleChange("JOINING")}
                            className={`flex items-center max-h-[150px] gap-3 p-2 rounded-lg border w-full cursor-pointer transition
          ${billingMethod === "JOINING"
                                    ? "border-1 border-[#88A0FF] bg-[#AEBEFF4D]"
                                    : "border-gray-200 bg-white"
                                }`}
                        >
                            <input
                                type="radio"
                                name="billingMethod"
                                value="JOINING"
                                checked={billingMethod === "JOINING"}

                                className="mt-1 accent-[#4E61F6]  cursor-pointer"
                            />

                            <div>
                                <label className="text-sm font-medium text-gray-800 cursor-pointer ">
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


                    <div className="mb-2">
                        <h2 className="text-lg font-semibold text-gray-800 font-gilroy ">
                            Basic Billing Configuration
                        </h2>
                        <label className="text-sm text-gray-500">
                            Defines the monthly rent period.
                        </label>
                    </div>

                    <div className="border-t border-[#E5E5E5] my-3"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="relative" ref={pickerRef} >
                            <label className="block text-sm text-gray-700 font-gilroy font-medium mb-1">
                                Billing Start Date (Day of Month)
                            </label>

                            <div
                                onClick={() => billingMethod !== "JOINING" && setOpenDayPicker(!openDayPicker)}
                                className={`w-full border border-gray-300 min-h-[40px] rounded-md px-3 py-2.5 text-sm flex justify-between items-center cursor-pointer 
    ${billingMethod === "JOINING" ? "bg-gray-100 cursor-not-allowed" : "bg-white"}`}
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

                            {billingMethod === "MONTHLY" && (
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
                                    billingMethod === "MONTHLY" && <span>(Auto-calculated)</span>}
                            </label>

                            <div className="bg-gray-100 border border-gray-200 rounded-md px-3 py-2.5 min-h-[40px] text-sm text-gray-500">
                                {billingDate ? `${endDayDate.toString().padStart(2, "0")} of next month` : "—"}
                            </div>
                            {
                                billingMethod === "MONTHLY" &&
                                <p className="text-xs text-gray-400 mt-1">
                                    Automatically calculated based on start date
                                </p>
                            }
                        </div>

                    </div>


                    {state.Settings.billingRuleError && (
                        <div className="mt-4">
                            <ErrorMessage message={state.Settings.billingRuleError} type="error" />
                        </div>
                    )}
                    {
                        billingMethod === "JOINING" &&
                        <div className="mt-4 flex items-center gap-2 bg-[#FFF6E6] border border-[#FFF6E6] text-[#795216] text-xs px-3 py-2 rounded-md ">
                            <span ><AiOutlineExclamationCircle color="#795216" size="16" /></span>
                            This method doesn’t allow to edit, cause each tenant will have a personal billing cycle based on their joining date.
                        </div>
                    }

                    {
                        billingMethod === "MONTHLY" &&

                        <div className="flex justify-end mt-6">
                            <button
                                onClick={handleSave}
                                className="flex items-center gap-2 bg-[#2F4ED8] hover:bg-[#243ec0] text-white text-sm font-gilroy px-5 py-2.5 rounded-lg"
                            >
                                <ArchiveBook
                                    size="16"
                                    color="#FFFFFF"
                                />  Save Configuration
                            </button>
                        </div>
                    }

                </div>
                {formLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-transparent opacity-75 z-10">
                        <div className="w-10 h-10 border-4 border-t-[#1E45E1] border-r-transparent rounded-full animate-spin"></div>
                    </div>
                )}



                <div className="space-y-6 mt-4">


                    {billingMethod === "MONTHLY" && (
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

                            <div className="relative max-w-lg" ref={gracePickerRef}>


                                <div
                                    onClick={() => setOpenGracePicker(!openGracePicker)}
                                    className="w-full border border-gray-300 min-h-[40px] rounded-md px-3 py-2.5 text-sm flex justify-between items-center cursor-pointer bg-white"
                                >
                                    <span className={gracePeriod ? "text-gray-900" : "text-gray-400"}>
                                        {gracePeriod ? gracePeriod.toString().padStart(2, "0") : "Select Grace Period"}
                                    </span>

                                    <span>
                                        {openGracePicker
                                            ? <ArrowUp2 size="18" color="#1E45E1" />
                                            : <ArrowDown2 size="18" color="#1E45E1" />}
                                    </span>
                                </div>


                                {openGracePicker && (
                                    <div className="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow-md p-2">
                                        <div className="grid grid-cols-5 gap-1">
                                            {days.map((day) => (
                                                <button
                                                    key={day}
                                                    type="button"
                                                    onClick={() => {
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


                            {gracePeriod && (
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
                                        {dueDays ? dueDays.label : "Select Due Days"}
                                    </span>

                                    <span className="text-gray-400">{openDuePicker ? <ArrowUp2 size="18" color="#1E45E1" /> : <ArrowDown2 size="18" color="#1E45E1" />}</span>
                                </div>


                                {openDuePicker && (
                                    <div className="absolute z-50 mt-2 w-full bg-white border rounded-lg shadow-md p-2">
                                        <div className="grid grid-cols-5 gap-3">
                                            {daysDue?.map((day) => (
                                                <button
                                                    key={day}
                                                    type="button"
                                                    onClick={() => {
                                                        setDueDays({
                                                            value: day,
                                                            label: day.toString().padStart(2, "0"),
                                                        });
                                                        setReminderDays([])
                                                        setErrors((prev) => ({ ...prev, dueDate: "" }));
                                                        dispatch({ type: "REMOVE_BILLING_RULE_ERROR" });
                                                        setOpenDuePicker(false);
                                                    }}
                                                    className={`w-10 h-10 rounded-full text-xs flex items-center justify-center
            ${dueDays?.value === day
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

                                {dueDays?.value && (
                                    <div className="mt-3 flex items-center gap-2 bg-[#FFF4ED] border border-[#FFE0CC] text-[#C2410C] text-xs px-3 py-2 rounded-md">
                                        <span>
                                            <AiOutlineExclamationCircle color="#C2410C" size="16" />
                                        </span>
                                        Overdue starts from {dueDays.value} of the month
                                    </div>
                                )}
                            </div>

                            <div className="relative" ref={reminderPickerRef}>

                                <label className="block text-sm font-medium text-[#1F1F1F] mb-2">
                                    Send Reminder (Days Before Due)
                                </label>

                                <div
                                    onClick={() => dueDays?.value && setOpenReminderPicker(!openReminderPicker)}
                                    className={`w-full border border-gray-300 rounded-md min-h-[40px] px-3 py-2.5 text-sm flex justify-between items-center
${dueDays?.value ? "cursor-pointer bg-white" : "bg-gray-100 cursor-not-allowed"}
`}
                                >

                                    <div className="flex flex-wrap gap-2">
                                        {reminderDays.length === 0 && (
                                            <span className="text-gray-400 text-sm">Select Reminder Days</span>
                                        )}

                                        {reminderDays.map((day) => (
                                            <div
                                                key={day.value}
                                                className="flex items-center gap-1 bg-[#EEF2FF] text-[#1E45E1] text-xs px-2 py-1 rounded-md"
                                            >
                                                {day.label}

                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();

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

                                                const selected = reminderDays.some((d) => d.value === day);

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

                                <button
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

                    <div className="flex justify-end gap-3 mt-6">

                        <button

                            className="flex items-center gap-2 bg-[#FFFFFF] hover:bg-gray-300 border-gray-50 border text-black text-sm font-gilroy px-5 py-2.5 rounded-lg shadow"
                        >
                            Discard
                        </button>

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
