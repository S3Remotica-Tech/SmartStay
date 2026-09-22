import React, { useState } from "react";
import {
  Add,
  AddCircle,
  ArrowSwapHorizontal,
  Building4,
  DocumentText,
  Gallery,
  Grid4,
  Location,
  More,
  Profile2User,
} from "iconsax-react";
import { useSelector } from "react-redux";
import Homestay from "../../../Assets/v2Images/Frm1.png";
import BgImage from "../../../Assets/v2Images/PgImage.jpg";

const ManagePg = () => {
  const state = useSelector((state) => state);
  const [activeTab, setActiveTab] = useState("Overview");

  const hostelDetails = state?.UsersList?.hotelDetailsinPg;

  console.log("hostelDetails", hostelDetails);

  const tabs = [
    {
      label: "Overview",
      icon: Grid4,
    },
    {
      label: "Gallery",
      icon: Gallery,
    },
    {
      label: "Staffs",
      icon: Profile2User,
    },
    {
      label: "Documents",
      icon: DocumentText,
    },
    {
      label: "Other Hostels",
      icon: Building4,
    },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleCreateMaster = () => {
    console.log("Create Master");
  };

  const handleSwitchProperty = () => {
    console.log("Switch Property");
  };

  const handleAddNewPG = () => {
    console.log("Add New PG");
  };

  const handleMore = () => {
    console.log("More");
  };

  return (
    <div className="w-full min-h-screen bg-white p-2 sm:p-3 lg:p-3 font-gilroy">
      <div className="sticky top-0 z-50 bg-white">
        <div className="my-2 flex flex-col md:flex-row justify-between items-center px-1.5 whitespace-nowrap">
          <div className="w-full flex justify-center md:justify-start">
            <label className="text-black font-semibold text-[18px] font-gilroy">
              Manage PG
            </label>
          </div>

          <button
            type="button"
            onClick={handleCreateMaster}
            className="h-10 px-4 sm:px-5 bg-[#1E45E1] hover:bg-[#1739C2] text-white rounded-lg flex items-center gap-2 text-[13px] sm:text-[14px] font-medium transition-all duration-200"
          >
            <AddCircle size="17" color="#FFFFFF" />
            <span>Create Master</span>
          </button>
        </div>
      </div>

      <div className="relative w-full h-[260px] sm:h-[290px] lg:h-[300px] rounded-xl overflow-hidden border border-[#D9E2FF]">
        <img
          src={BgImage}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-[#03219675]/95 via-[#03219675]/80 to-[#010F44]/40" />

        <button
          type="button"
          onClick={handleMore}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all"
        >
          <More size="22" color="#FFFFFF" className="rotate-90" />
        </button>

        <div className="relative z-10 h-full flex flex-col justify-between p-4 sm:p-6 lg:p-7">
          <div>
            <div className="w-[48px] h-[48px] sm:w-[54px] sm:h-[54px] rounded-lg bg-white flex items-center justify-center overflow-hidden mb-3">
              <img
                src={Homestay}
                alt="Homestay"
                className="w-full h-full object-contain p-1"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h2 className="text-[24px] sm:text-[24px] lg:text-[26px] font-semibold text-white">
                {hostelDetails?.name}
              </h2>

              <span
                className={`px-3 py-1 rounded-full text-white text-[12px] font-medium flex items-center gap-1.5 ${
                  hostelDetails?.isSubscriptionActive
                    ? "bg-[#038C46]"
                    : "bg-[#DC3545]"
                }`}
              >
                {hostelDetails?.isSubscriptionActive ? "Active" : "Inactive"}
              </span>
              <span className="px-3 py-1 rounded-full bg-[#E5EAFF] text-[#1E45E1] text-[11px] sm:text-[12px] font-medium flex items-center gap-1.5">
                PG Boys
              </span>
            </div>

            <div className="flex items-center gap-1.5 text-white mb-3">
              <Location size="17" color="#FFB800" variant="Bold" />

              <span className="text-[13px] sm:text-[14px] capitalize">
                {hostelDetails?.city}
              </span>
            </div>

            <p className="text-white/80 text-[12px] sm:text-[14px]">
              You're currently managing this property.
            </p>
          </div>

          <div className="flex flex-wrap justify-end gap-2 sm:gap-3">
            <button
              type="button"
              onClick={handleSwitchProperty}
              className="h-10 sm:h-11 px-4 sm:px-5 rounded-lg border border-white/70 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white flex items-center justify-center gap-2 text-[12px] sm:text-[13px] font-medium transition-all"
            >
              <ArrowSwapHorizontal size="17" color="#FFFFFF" />
              <span>Switch Property</span>
            </button>

            <button
              type="button"
              onClick={handleAddNewPG}
              className="h-10 sm:h-11 px-4 sm:px-5 rounded-lg bg-[#1E45E1]  text-white flex items-center justify-center gap-2 text-[12px] sm:text-[13px] font-medium transition-all"
            >
              <AddCircle size="17" color="#FFFFFF" />
              <span>Add New PG</span>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full bg-white mt-1  border-b border-[#E5E7EB]">
        <div className="w-full overflow-x-auto scrollbar-hide">
          <div className="min-w-[650px] flex items-center">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.label;

              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => handleTabClick(tab.label)}
                  className={`
                      relative flex-1 min-w-[120px]
                      h-[58px] px-3
                      flex items-center justify-center gap-2
                      text-[13px] sm:text-[14px]
                      font-medium
                      transition-all duration-200
                      ${
                        isActive
                          ? "text-[#1E45E1]"
                          : "text-[#5E6673] hover:text-[#1E45E1]"
                      }
                    `}
                >
                  <Icon
                    size="20"
                    color={isActive ? "#1E45E1" : "#5E6673"}
                    variant={isActive ? "Bold" : "Linear"}
                  />

                  <span>{tab.label}</span>

                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] max-w-[120px] h-[2px] bg-[#1E45E1] rounded-t-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4">
        {activeTab === "Overview" && (
          <div className="bg-white rounded-xl p-5 text-sm text-[#5E6673]">
            Overview content
          </div>
        )}

        {activeTab === "Gallery" && (
          <div className="bg-white rounded-xl p-5 text-sm text-[#5E6673]">
            Gallery content
          </div>
        )}

        {activeTab === "Staffs" && (
          <div className="bg-white rounded-xl p-5 text-sm text-[#5E6673]">
            Staffs content
          </div>
        )}

        {activeTab === "Documents" && (
          <div className="bg-white rounded-xl p-5 text-sm text-[#5E6673]">
            Documents content
          </div>
        )}

        {activeTab === "Other Hostels" && (
          <div className="bg-white rounded-xl p-5 text-sm text-[#5E6673]">
            Other Hostels content
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePg;
