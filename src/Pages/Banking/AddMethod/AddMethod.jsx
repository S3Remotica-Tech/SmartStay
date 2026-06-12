/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { CloseCircle, Add } from "iconsax-react";
import ErrorMessage from "../../../Components/ErrorMessage";
import UPI from "./UPI";
import Credit from "./Credit";
import Debit from "./Debit";
import QRCode from "./QRCode";

function AddPaymentMethod({ show, handleClose }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const [paymentType, setPaymentType] = useState("UPI");
  const [paymentTypeError, setPaymentTypeError] = useState("");

  const handlePaymentTypeChange = (value) => {
    setPaymentType(value);
    setPaymentTypeError("");
  };
  return (
    <div className="font-gilroy">
      <div className="fixed inset-0 bg-black/40 z-40" />

      <div className="fixed top-2 right-2 bottom-2 w-[500px] bg-white rounded-lg shadow-xl z-50 flex flex-col ">
        <div className="flex items-center justify-between px-6 py-3 ">
          <h2 className="text-[18px] font-semibold text-[#1A1C21]">
            Add Payment Method
          </h2>

          <button
            onClick={handleClose}
            className=" text-sm rounded-md flex gap-1 items-center px-2 py-1 font-gilroy "
          >
            <Add
              size="24"
              color="#FF0000"
              className="cursor-pointer rotate-45"
            />{" "}
          </button>
        </div>

        <div className="px-6 py-2">
          <div>
            <label className="text-[13px] text-[#222222] font-gilroy font-medium">
              Select Type <span className="text-red-500">*</span>
            </label>

            <div className="flex gap-6 mt-2 cursor-pointer">
              {["UPI", "Credit Card", "Debit Card", "QR Code"].map(
                (item, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-2 text-[14px] text-[#111928] cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="paymentType"
                      value={item}
                      checked={paymentType === item}
                      onChange={(e) => handlePaymentTypeChange(e.target.value)}
                      className="accent-blue-600 cursor-pointer"
                    />
                    {item}
                  </label>
                ),
              )}
            </div>
            {paymentTypeError && (
              <ErrorMessage message={paymentTypeError} type="error" />
            )}
          </div>

          {paymentType === "UPI" && <UPI />}

          {paymentType === "Credit Card" && <Credit />}

          {paymentType === "Debit Card" && <Debit />}

          {paymentType === "QR Code" && <QRCode />}
        </div>
      </div>
    </div>
  );
}

export default AddPaymentMethod;
