import React, { useState } from "react";
import { InfoCircle } from "iconsax-react";
import Select from "react-select";
import FormComingSoon from "../../Utils/FormComingSoon";

const CustomStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "50px",
    height: "45px",
    border: "1px solid #D9D9D9",
    borderRadius: "8px",
    fontSize: "15px",
    fontFamily: "Gilroy, sans-serif",
    fontWeight: 500,
    boxShadow: "none",
    alignItems: "center",

    cursor: state.isDisabled ? "not-allowed" : "pointer",
    backgroundColor: state.isDisabled
      ? "#F3F4F6"
      : state.hasValue
        ? "#FFF"
        : "#fff",
    opacity: state.isDisabled ? 0.7 : 1,
  }),

  singleValue: (base, state) => ({
    ...base,
    color: state.isDisabled ? "#9CA3AF" : "#333",
    fontWeight: 600,
  }),

  placeholder: (base, state) => ({
    ...base,
    color: state.isDisabled ? "#9CA3AF" : "#6B7280",
  }),

  option: (base, state) => {
    const isSelected = state.isSelected;

    return {
      ...base,
      position: "relative",
      fontSize: 14,
      padding: "6px 12px",
      backgroundColor: isSelected
        ? "#EEF2FF"
        : state.isFocused
          ? "#F3F4F6"
          : "#fff",
      color: "#111827",
      cursor: "pointer",

      whiteSpace: "nowrap",
      overflow: "visible",

      paddingLeft: isSelected ? "9px" : "12px",

      ...(isSelected && {
        borderLeft: "3px solid #1E45E1",
        fontWeight: 500,
      }),
    };
  },

  menu: (base) => ({
    ...base,
    backgroundColor: "#fff",
    border: "1px solid #E5E7EB",
    borderRadius: "8px",
    padding: "6px 0",
    zIndex: 9999,
    width: "max-content",
    minWidth: "100%",
  }),

  menuList: (base) => ({
    ...base,
    maxHeight: "100px",
    padding: 0,
    overflowY: "auto",
  }),

  valueContainer: (base) => ({
    ...base,
    padding: "0 8px",
  }),

  indicatorsContainer: (base) => ({
    ...base,
    height: "45px",
  }),

  dropdownIndicator: (base, state) => ({
    ...base,
    padding: "4px",
    color: state.isDisabled ? "#D1D5DB" : "#6B7280",
    cursor: state.isDisabled ? "not-allowed" : "pointer",
  }),

  indicatorSeparator: () => ({
    display: "none",
  }),
};

function TenantAppControls() {
  const [isEnabled, setIsEnabled] = useState(false);
  const [noticeEnabled, setNoticeEnabled] = useState(true);
  const [noticeDays, setNoticeDays] = useState("");

  const noticeDaysOptions = Array.from({ length: 31 }, (_, index) => ({
    value: String(index + 1),
    label: `${index + 1}`,
  }));

  const isDev = import.meta.env.MODE === "development";

  return (
    <div className="font-gilroy mx-4 my-2">
      <div className="sticky top-0 bg-white z-50">
        <div>
          <label className="text-[18px] font-semibold text-[#222222]">
            Tenant App Controls
          </label>
        </div>

        <div>
          <label className="text-[13px] font-semibold text-[#7C7C7C]">
            Manage what requests tenants can make from the tenant app and
            configure notice periods.
          </label>
        </div>
      </div>
      {isDev ? (
        <div className="bg-gray-100 min-h-screen px-4 py-2 rounded my-2">
          <div className="bg-white px-4 py-4 rounded shadow my-2">
            <div className="flex items-center justify-between">
              <div>
                <div>
                  <label className="text-[16px] font-semibold text-[#222222]">
                    Allow Bed Change Requests
                  </label>
                </div>

                <div>
                  <label className="text-[13px] text-[#7C7C7C]">
                    By enabling this option to get allow bed change request in
                    tenant app.
                  </label>
                </div>
              </div>

              <div className="flex items-center">
                <span className="mr-2 text-sm">{isEnabled ? "On" : "Off"}</span>

                <button
                  type="button"
                  onClick={() => setIsEnabled((prev) => !prev)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    isEnabled ? "bg-[#1E45E1]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                      isEnabled ? "translate-x-4" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {isEnabled && (
              <div className="w-[60%] my-3">
                <label className="mb-2 block text-[13px] text-[#222222]">
                  Helper text <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  defaultValue="Tenants must request bed change at least 3 days in advance"
                  className="w-full rounded border border-[#D9D9D9] px-3 py-2 text-[13px] outline-none focus:border-[#1E45E1]"
                />

                <div className="mt-2 flex items-center gap-1 text-[11px] text-[#795216] bg-[#FFF6E6] w-fit px-2 py-1 rounded">
                  <InfoCircle size={13} color="#9A7200" />
                  <span>
                    This reading was calculated using the room&apos;s last
                    entry. Edit if the Reading is Wrong.
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white px-4 py-4 rounded shadow my-2">
            <div className="flex items-center justify-between mb-4">
              <label className="text-[16px] font-semibold text-[#222222]">
                Notice Period Request (Move-out)
              </label>

              <div className="flex items-center">
                <span className="mr-2 text-sm">
                  {noticeEnabled ? "On" : "Off"}
                </span>

                <button
                  type="button"
                  onClick={() => setNoticeEnabled((prev) => !prev)}
                  className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                    noticeEnabled ? "bg-[#1E45E1]" : "bg-gray-300"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 rounded-full bg-white transition-transform ${
                      noticeEnabled ? "translate-x-4" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>

            {noticeEnabled && (
              <div className="w-[60%]">
                <label className="mb-2 block text-[13px] text-[#222222]">
                  Notice period Days <span className="text-red-500">*</span>
                </label>

                <Select
                  options={noticeDaysOptions}
                  value={noticeDaysOptions.find(
                    (option) => option.value === noticeDays,
                  )}
                  onChange={(selectedOption) =>
                    setNoticeDays(selectedOption?.value || "")
                  }
                  placeholder="Select Days"
                  className="w-full"
                  styles={CustomStyles}
                />

                <label className="mb-2 mt-4 block text-[13px] text-[#222222]">
                  Description <span className="text-red-500">*</span>
                </label>

                <textarea
                  rows={3}
                  defaultValue="Tenants must submit a move-out request as per the mentioned days before leaving."
                  className="w-full resize-none rounded border border-[#D9D9D9] px-3 py-2 text-[13px] outline-none focus:border-[#1E45E1]"
                />
              </div>
            )}
          </div>
        </div>
      ) : (
        <FormComingSoon />
      )}
    </div>
  );
}

export default TenantAppControls;
