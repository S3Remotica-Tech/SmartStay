/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsWhatsapp } from "react-icons/bs";
import { Message } from "iconsax-react";
import { ArrowLeft } from "iconsax-react";
import "../../Pages/Settings/SettingsNotifications.css";
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import ComingSoon from "../../Utils/ComingSoon";

const SettingsNotifications = () => {
  const dispatch = useDispatch();
  const toggleStatus = useSelector(
    (state) => state.InvoiceList.whatsappSettings || [],
  );
  const [showWhatsAppSettings, setShowWhatsAppSettings] = useState(false);

  const notifications = [
    {
      id: 0,
      title: "Advance Generation Message",
      description:
        "Send WhatsApp message automatically when Advance is generated.",
    },
    {
      id: 1,
      title: "Bill Generation",
      description: "Notify tenant via WhatsApp when monthly bill is generated.",
    },
    {
      id: 2,
      title: "Payment Receipt",
      description: "Auto-send payment confirmation receipt to tenant.",
    },
    {
      id: 3,
      title: "User Onboarding",
      description:
        "Send welcome/onboarding WhatsApp message when new tenant is added.",
    },
  ];

  const handleToggle = (id) => {
    const currentValue = toggleStatus[id];
    dispatch({
      type: "TOGGLE_WHATSAPP_SETTING",
      payload: { id, value: !currentValue },
    });
  };

  return (
    <>
      <div className="w-full mx-aut0 p-2">
        <div className="sticky top-0 z-50 flex h-12 items-center bg-white px-2">
          <span className="font-gilroy text-lg font-semibold text-black whitespace-nowrap">
            Notifications
          </span>
        </div>
        {import.meta.env.MODE === "development" ? (
          !showWhatsAppSettings ? (
            <>
              <div
                onClick={() => setShowWhatsAppSettings(true)}
                className="mt-3 cursor-pointer rounded-md border border-gray-300 bg-white mr-2"
              >
                <div className="flex items-center gap-2 px-3 py-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100">
                    <BsWhatsapp className="text-lg text-green-500" />
                  </div>

                  <div className="flex flex-col">
                    <span className="font-gilroy text-base font-semibold">
                      Whatsapp
                    </span>
                    <span className="font-gilroy text-sm text-gray-500">
                      Manage and automate Whatsapp message alerts for key tenant
                      activities.
                    </span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mt-3 mb-4 flex items-center gap-2">
                <ArrowLeft
                  size={18}
                  className="cursor-pointer text-blue-700"
                  onClick={() => setShowWhatsAppSettings(false)}
                />
                <span className="font-gilroy font-semibold">Whatsapp</span>
              </div>

              {notifications.map((item) => (
                <div
                  key={item.id}
                  className="mb-2 rounded-lg border border-gray-300/30 bg-white mr-2"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 px-3 py-1.5">
                    <div className="flex-shrink-0 flex items-center justify-center">
                      <Message size={18} color="#1E45E1" />
                    </div>

                    <div className="flex-1 flex flex-col justify-center">
                      <h5 className="font-gilroy text-sm font-medium text-gray-900 leading-tight mb-1 pt-2 break-words">
                        {item.title}
                      </h5>
                      <p className="font-gilroy text-xs text-gray-500 leading-tight mb-0.5 break-words">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-center gap-2 md:justify-end">
                      <span className="text-xs text-gray-500">
                        Automation Status
                      </span>
                      <span
                        className={`font-gilroy text-xs ${toggleStatus[item.id] ? "text-blue-600" : "text-gray-400"}`}
                      >
                        {toggleStatus[item.id] ? "On" : "Off"}
                      </span>

                      <label className="relative inline-flex cursor-pointer items-center">
                        <input
                          type="checkbox"
                          checked={toggleStatus[item.id]}
                          onChange={() => handleToggle(item.id)}
                          className="peer sr-only"
                        />
                        <div className="h-4 w-8 rounded-full bg-gray-300 peer-checked:bg-blue-700"></div>
                        <div className="absolute left-0.5 top-0.5 h-3 w-3 rounded-full bg-white transition-transform peer-checked:translate-x-4"></div>
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )
        ) : (
          <ComingSoon />
        )}
      </div>
    </>
  );
};

export default withErrorBoundary(SettingsNotifications);
