import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";

import ComingSoon from "../../../Utils/ComingSoon";
import { useHasPermission } from "../../../Utils/Permission";
import withErrorBoundary from "../../../Hoc/WithErrorBountry";
import PermissionDeniedMessage from "../../../Utils/PermissionDeniedMessage";
import {
  AddCircle,
  SearchNormal1,
  DocumentText,
  Edit2,
  Trash,
  Copy,
} from "iconsax-react";
import { useNavigate } from "react-router-dom";

function SettingAgreement() {
  const state = useSelector((state) => state);

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const {
    // canWriteModule: canWriteAgreement,
    canReadModule: canReadAgreement,
    // canUpdateModule: canUpdateAgreement,
  } = useHasPermission("Agreement");

  const policies = [
    {
      id: 1,
      title: "Standard Long Stay Agreement",
      desc: "Lorem ipsum dolor",
      date: "25 Sep 2024",
      status: null,
    },
    {
      id: 2,
      title: "College Student Lease",
      desc: "Lorem ipsum dolor",
      date: "29 Sep 2024",
      status: null,
    },
    {
      id: 3,
      title: "Guest House Policy",
      desc: "Lorem ipsum dolor",
      date: "22 Feb 2024",
      status: null,
    },
    {
      id: 4,
      title: "Short-Term Rental Policy",
      desc: "Lorem ipsum dolor",
      date: "26 Nov 2024",
      status: null,
    },
    {
      id: 5,
      title: "Short-Term Rental Policy",
      desc: "Lorem ipsum dolor",
      date: "15 Jan 2025",
      status: "Draft",
    },
  ];

  const handleAddTemplate = () => {
    navigate("/settings/add-template");
  };
  return (
    <div className="font-gilroy">
      <div className="sticky top-0 bg-white z-50">
        <div className="flex flex-wrap justify-between items-center py-3 px-4">
          <div className="mb-2 md:mb-0">
            <h5 className="mb-1 text-[16px] font-semibold">
              Agreements & Policies
            </h5>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <form autoComplete="off" role="search">
                <input
                  type="search"
                  name="settings-filter"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search templates…"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  className="w-full h-[40px] rounded-full border border-[#E5E7EB] bg-white
                px-3 pr-8 text-[14px] outline-none focus:border-[#1E45E1]"
                />
              </form>
              <SearchNormal1
                size="13"
                color="#4B5563"
                className="absolute right-2.5 top-1/2 -translate-y-1/2"
              />
            </div>
            <button
              disabled={!canReadAgreement}
              onClick={handleAddTemplate}
              className={`flex items-center gap-2 whitespace-nowrap rounded-md border px-3 py-2 text-sm font-medium transition ${
                canReadAgreement
                  ? "border-[#1E45E1] text-white bg-[#1E45E1]"
                  : "cursor-not-allowed border-gray-300 text-gray-400"
              }`}
            >
              <AddCircle />
              New Template
            </button>
          </div>
        </div>
      </div>

      {!canReadAgreement ? (
        <>
          <PermissionDeniedMessage />
        </>
      ) : import.meta.env.MODE === "development" ? (
        <div className="w-full  px-4 bg-white ">
          {policies.map((item) => (
            <div
              key={item.id}
              className="flex items-start justify-between gap-4 p-4 mb-4 hover:bg-gray-50 transition-colors
               cursor-pointer rounded-xl shadow-sm"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded bg-[#EEF2FF] flex items-center justify-center flex-shrink-0 mt-0.5">
                  <DocumentText size={18} variant="Bold" color="#1E45E1" />
                </div>
                <div className="flex flex-col">
                  <label className="text-[14px] font-semibold text-[#111928] leading-tight cursor-pointer">
                    {item.title}
                  </label>
                  <label className="text-[12px] text-[#525252] mt-0.5 cursor-pointer">
                    {item.desc}
                  </label>
                  <div className="flex items-center gap-2 mt-1.5">
                    {item.status && (
                      <label
                        className="px-2 py-0.5 rounded bg-[#FFFBEB] text-[#BB4D00] text-[10px] font-medium
                       border-1 border-[#FFF1E8] cursor-pointer"
                      >
                        {item.status}
                      </label>
                    )}
                    <label className="text-[10px] text-[#A1A1A1] cursor-pointer">
                      {item.date}
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-400">
                <button className="hover:text-gray-700 transition-colors">
                  <Edit2 size={16} variant="Linear" color="#64748B" />
                </button>
                <button className="hover:text-gray-700 transition-colors">
                  <Copy size={16} variant="Linear" color="#64748B" />
                </button>
                <button className="hover:text-red-500 transition-colors">
                  <Trash size={16} variant="Linear" color="#64748B" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <ComingSoon />
      )}
    </div>
  );
}

export default withErrorBoundary(SettingAgreement);
