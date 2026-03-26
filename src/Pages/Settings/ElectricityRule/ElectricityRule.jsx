/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../../Pages/Settings/SettingElectricity.css";
import ErrorMessage from '../../../Components/ErrorMessage'
// import { useHasPermission } from '../../../Utils/Permission';
import { useNavigate } from "react-router-dom";
import { CloseCircle, MessageText } from "iconsax-react";
import { AiOutlineExclamationCircle } from "react-icons/ai";


function ElectricityRule({ onClose }) {
    const [selected, setSelected] = useState("room");
    const [formLoading, setFormLoading] = useState(false)
    const dispatch = useDispatch();
    const state = useSelector((state) => state);
    const navigate = useNavigate();
    const [selectedType, setSelectedType] = useState("included");
    const [amount, setAmount] = useState("");

    const [costPerUnit, setCostPerUnit] = useState("");
    const [errors, setErrors] = useState({});

    const rent = 5000;
    const ebCharge =
        selectedType === "fixed" ? Number(amount || 0) : 0;

    const total = rent + ebCharge;










    const handleChange = (e) => {
        let value = e.target.value.replace(/[^0-9.]/g, "");

        const parts = value.split(".");
        if (parts.length > 2) {
            value = parts[0] + "." + parts.slice(1).join("");
        }

        setCostPerUnit(value);

        setErrors((prev) => ({
            ...prev,
            costPerUnit: "",
        }));
    };


    const handleTypeChange = (type) => {
        setSelectedType(type);
        setErrors("");
    };







    const handleAmountChange = (e) => {
        let value = e.target.value.replace(/[^0-9.]/g, "");

        const parts = value.split(".");
        if (parts.length > 2) {
            value = parts[0] + "." + parts.slice(1).join("");
        }

        setAmount(value);

        setErrors((prev) => ({
            ...prev,
            amount: "",
        }));
    };


    const options = [
        {
            id: "hostel",
            title: "Hostel Based",
            desc: "Electricity cost is shared across all tenants based on total usage",
        },
        {
            id: "room",
            title: "Room Based",
            desc: "Electricity is calculated based on individual room usage",
        },
        {
            id: "flat",
            title: "Flat Rate (Included in Rent)",
            desc: "Fixed electricity pricing not based on actual usage",
        },
    ];


    useEffect(() => {
        if (state.Settings?.getebStatuscode === 200) {

            const data = state?.Settings?.EBBillingUnitlist;

            if (data) {
                if (data.typeOfReading === "ROOM_READING") {
                    setSelected("room");
                } else if (data.typeOfReading === "HOSTEL_READING") {
                    setSelected("hostel");
                } else if (data?.typeOfReading === "FLAT_RATE") {
                    setSelected("flat");
                }

                setCostPerUnit(data?.chargerPerUnit)
                setAmount(data?.flatCharge)
                setSelectedType(data?.shouldIncludeInRent ? "included" : "fixed")
                dispatch({ type: "CLEAR_GET_EBBILLINGS_STATUS_CODE" });
            }


        }
    }, [state.Settings?.getebStatuscode]);


    const handleClose = (tabName) => {
        const hostelId = state.login?.selectedHostel_Id;
        if (hostelId) {
            navigate(`/settings/${hostelId}/${tabName}`);
        } else {
            navigate(`/settings/${tabName}`);
        }
    }





    const handleSubmit = () => {
        let newErrors = {};

        if (selected === "room" || selected === "hostel") {
            if (!costPerUnit) {
                newErrors.costPerUnit = "Please Enter Cost per unit";
            } else if (Number(costPerUnit) <= 0) {
                newErrors.costPerUnit = "Must be greater than 0";
            }
        }

        if (selected === "flat" && selectedType === "fixed") {
            if (!amount) {
                newErrors.amount = "Please Enter Monthly charge";
            } else if (Number(amount) <= 0) {
                newErrors.amount = "Must be greater than 0";
            }
        }

        let chargeValue =
            selected === "room" || selected === "hostel"
                ? Number(costPerUnit)
                : selectedType === "fixed"
                    ? Number(amount)
                    : null;




        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setErrors({});

        dispatch({
            type: "EB-BILLING-UNIT-ADD",
            payload: {
                hostelId: state.login?.selectedHostel_Id,
                ebConfigs: {
                    typeofReading: selected,
                    charge: chargeValue,
                    shouldIncludeInRent: selectedType === "included",
                },
            },
        });
        setFormLoading(true)

    };



    useEffect(() => {
        if (state.Settings.addEbbillingUnitStatuscode === 200) {
            dispatch({
                type: "EB-BILLING-UNIT-LIST",
                payload: state.login.selectedHostel_Id,
            });
            setFormLoading(false)
            setTimeout(() => {
                dispatch({ type: "CLEAR_ADD_EB_BILLING_STATUS_CODE" });
            }, 100);


        }
    }, [state.Settings.addEbbillingUnitStatuscode]);




    return (
        <div className="min-h-full flex flex-col bg-[#F9FAFF] font-gilroy relative ">


            {formLoading && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-transparent opacity-75">
                    <div className="h-10 w-10 rounded-full border-4 border-transparent border-t-blue-700 animate-spin"></div>
                </div>
            )}

            <div className="sticky top-0 left-0 right-0 bg-white flex flex-col md:flex-row justify-between items-center min-h-[50px] px-1.5 font-gilroy shadow-[0_2px_6px_rgba(0,0,0,0.06)]">
                <label className="text-black font-semibold text-[18px] whitespace-nowrap">
                    Electricity Rule
                </label>

                <CloseCircle onClick={() => handleClose("electricity")}
                    size="18"
                    color="#EF4444"
                    className="cursor-pointer"

                />
            </div>


            <div className="bg-[#F9FAFF] p-3 md:p-3   overflow-y-auto show-scrolls">

                <div className="grid grid-cols-12 md:grid-cols-12 gap-3 mb-4">
                    <div className="md:col-span-8 bg-white rounded-xl p-3 shadow-sm">

                        <h3 className="text-[18px] font-semibold text-[#222] mb-1">
                            Electricity Calculation Type
                        </h3>
                        <label className="text-[14px] text-[#4B4B4B]  font-medium">
                            Choose how electricity charges should be calculated for tenants
                        </label>

                        <div className="mt-4 space-y-3">

                            {options.map((item) => {
                                const isActive = selected === item.id;

                                return (
                                    <div
                                        key={item.id}
                                        onClick={() => setSelected(item.id)}
                                        className={`border-1 shadow-sm rounded-lg p-3 flex gap-3 cursor-pointer transition
                      ${isActive
                                                ? "border-[#88A0FF] bg-[#F8F9FF] ring-2 ring-[#4E61F6]/30 "
                                                : "border-gray-200 bg-white hover:bg-gray-50"
                                            }`}
                                    >

                                        <input
                                            type="radio"
                                            name="electricityType"
                                            checked={selected === item.id}
                                            onChange={() => setSelected(item.id)}
                                            className="accent-[#1E45E1] cursor-pointer"
                                        />


                                        <div>
                                            <p className="text-[14px] font-semibold text-[#222] mb-1">
                                                {item.title}
                                            </p>
                                            <p className="text-[12px] text-[#6B7280] mt-0.5 mb-1">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>


                    <div className="bg-white rounded-xl p-3 shadow-sm h-fit md:col-span-4">

                        <h3 className="text-[18px] font-semibold text-[#1F1F1F]">
                            Billing Preview
                        </h3>
                        <p className="text-[12px] text-[#616161] mt-1">
                            This is a sample invoice preview
                        </p>

                        <div className="mt-4 space-y-2 text-[13px]">

                            <div className="flex justify-between">
                                <span className="text-gray-600 text-xs">Room Rent</span>
                                <span className="font-semibold text-[#222222] text-sm">
                                    ₹{rent.toFixed(2)}
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-600 text-xs">
                                    Electricity{" "}
                                    {selectedType === "fixed" ? (
                                        <span className="bg-[#F0F0F0] px-2 py-1 rounded text-[9px] whitespace-nowrap">
                                            Fixed Charge
                                        </span>
                                    ) : (
                                        <span className="bg-[#F0F0F0] px-2 py-1 rounded text-[9px] whitespace-nowrap">
                                            No Charge
                                        </span>
                                    )}
                                </span>

                                <span className="font-semibold text-[#222222] text-sm">
                                    ₹{ebCharge.toFixed(2)}
                                </span>
                            </div>

                            <div className="border-t pt-2 flex justify-between font-semibold text-[#1E45E1]">
                                <span>Total</span>
                                <span className="font-semibold text-[#1E45E1] text-[18px]">
                                    ₹{total.toFixed(2)}
                                </span>
                            </div>

                        </div>

                        <label className="text-[11px] text-gray-400 mt-3 bg-[#F9F9F9] px-3 py-3 rounded">
                            Preview calculation based on current settings
                        </label>
                    </div>
                </div>
                {
                    (selected === "room" || selected === "hostel") &&

                    <div className="grid grid-cols-12 md:grid-cols-12 gap-4 mb-2">
                        <div className="bg-white rounded-xl p-3 shadow-sm w-full  md:col-span-8">


                            <h3 className="text-[18px] font-semibold text-[#222]">
                                Configuration
                            </h3>
                            <p className="text-[14px] text-[#4B4B4B] mt-1 font-medium">
                                {selected === "room" ? "Set up room-based electricity billing parameters" : "Defines the monthly rent period."}
                            </p>




                            <div className="mt-2 border-t pt-2">


                                <label className="text-[14px] font-medium text-[#1F1F1F]">
                                    Cost per Unit (₹)
                                </label>

                                <input
                                    type="text"
                                    value={costPerUnit}
                                    onChange={handleChange}
                                    className={`w-full h-[40px] px-3 rounded-md outline-none border ${errors.costPerUnit ? "border-red-500" : "border-gray-300"
                                        }`}
                                />

                                {errors.costPerUnit &&
                                    <ErrorMessage message={errors.costPerUnit} type="error" />
                                }

                                <p className="text-[11px] text-[#616161] mt-1 italic">
                                    Rate charged per electricity unit
                                </p>
                            </div>



                        </div>
                    </div>
                }

                {
                    selected === "flat" &&

                    <div className="grid grid-cols-12 md:grid-cols-12 gap-4 mb-2">
                        <div className="bg-white rounded-xl p-3 shadow-sm w-full  md:col-span-8">


                            <h3 className="text-[18px] font-semibold text-[#222]">
                                Configuration
                            </h3>
                            <p className="text-[14px] text-[#4B4B4B] mt-1 font-medium">
                                Set up flat rate electricity charges
                            </p>

                            <div className="bg-gray-200 w-full h-[1px] my-2 "></div>

                            <div className="mt-2  space-y-2 px-3 pt-2 rounded  relative">

                                <div className="absolute left-0 top-0 bottom-0 w-[4px] bg-[#1E45E1] rounded-r-md "></div>
                                <div
                                    onClick={() => handleTypeChange("included")}
                                    className={`border-1 shadow-sm rounded-lg p-3 flex gap-3 cursor-pointer transition 
            ${selectedType === "included"
                                            ? "border-[#88A0FF] bg-[#F8F9FF] ring-2 ring-[#4E61F6]/30"
                                            : "border-gray-200 bg-white hover:bg-gray-50"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        checked={selectedType === "included"}
                                        onChange={() => handleTypeChange("included")}
                                        className="mt-1 accent-[#1E45E1]"
                                    />

                                    <div>
                                        <p className="text-[14px] font-semibold text-[#222] mb-1">
                                            Included in Rent
                                        </p>
                                        <p className="text-[12px] text-[#6B7280] mt-0.5 mb-1">
                                            No separate electricity charge applied
                                        </p>
                                    </div>
                                </div>


                                <div
                                    onClick={() => handleTypeChange("fixed")}
                                    className={`border-1 shadow-sm rounded-lg p-3 flex gap-3 cursor-pointer transition 
            ${selectedType === "fixed"
                                            ? "border-[#88A0FF] bg-[#F8F9FF] ring-2 ring-[#4E61F6]/30"
                                            : "border-gray-200 bg-white hover:bg-gray-50"
                                        }`}
                                >
                                    <input
                                        type="radio"
                                        checked={selectedType === "fixed"}
                                        onChange={() => handleTypeChange("fixed")}
                                        className="mt-1 accent-[#1E45E1]"
                                    />

                                    <div>
                                        <p className="text-[14px] font-semibold text-[#222] mb-1">
                                            Fixed Monthly Charge
                                        </p>
                                        <p className="text-[12px] text-[#6B7280] mt-0.5 mb-1">
                                            Apply a fixed electricity charge every month
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {
                                selectedType === "fixed" &&

                                <div className="mt-4">
                                    <label className="text-[13px] font-medium text-[#222]">
                                        Monthly Electricity Charge (₹)
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="Eg : 500"
                                        value={amount}
                                        onChange={handleAmountChange}
                                        disabled={selectedType !== "fixed"}
                                        className={`mt-1 w-full h-[40px] px-3 rounded-md outline-none border border text-[14px]
            ${errors.amount ? "border-red-500" : "border-gray-300"
                                            }
            ${selectedType !== "fixed"
                                                ? "bg-gray-100 cursor-not-allowed"
                                                : ""
                                            }
          `}
                                    />


                                    {errors.amount && (
                                        <ErrorMessage message={errors.amount} type="error" />
                                    )}


                                    {
                                        selectedType === "fixed" &&

                                        <label className="text-[11px] text-[#1E45E1] mt-2 flex gap-1">
                                            <AiOutlineExclamationCircle color="#1E45E1" size="14" />  Fixed amount charged monthly regardless of usage
                                        </label>
                                    }

                                </div>

                            }

                            {selectedType === "included" &&
                                <label className="text-[11px] text-[#1E45E1] mt-2 flex gap-1  ">
                                    <AiOutlineExclamationCircle color="#1E45E1" size="14" />  Electricity charges will not depend on usage. No separate charge will be applied
                                </label>
                            }
                        </div>
                    </div>
                }










                <div className="flex justify-end gap-3 mt-6">

                    <button
                        onClick={() => handleClose("electricity")}
                        className="px-4 py-2 text-sm border rounded-lg bg-white hover:bg-gray-50"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-[#1E45E1] rounded-lg hover:bg-[#1639c9]"
                    >
                        <MessageText size="16" />
                        Save Changes
                    </button>
                </div>











            </div>




        </div>
    );
}

export default ElectricityRule;