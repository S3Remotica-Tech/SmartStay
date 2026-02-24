/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import blueArrow from "../../Assets/Images/New_images/arrow-leftblue.png";
import blackArrow from "../../Assets/Images/New_images/arrow-leftblack.png";
import "../Settings/Settings.css";
import '../Settings/SettingAll.css';
import { useSelector } from 'react-redux';
import { ArrowRight2, ArrowLeft2 } from 'iconsax-react'
// import SettingsBills from "./SettingsBills";
import { useNavigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

function SettingAllPages({ isVisibleSidebar }) {
  const navigate = useNavigate();


  const state = useSelector(state => state);
  // const [hostel_Id, setHostel_Id] = useState('')
  const [activePage, setActivePage] = useState("General");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isInvoiceAddMode, setIsInvoiceAddMode] = useState(false);



  // useEffect(() => {
  //   if (state.login.selectedHostel_Id) {
  //     setHostel_Id(state.login.selectedHostel_Id)
  //   }

  // }, [state?.login?.selectedHostel_Id]);

  useEffect(() => {
    if (state.PgList?.isManageEnable) {
      setActivePage('Manage PG');
      navigate(`/settings/${'manage-pg'}`);

    }

  }, [state.PgList?.isManageEnable]);


  const handleTabClick = (itemName) => {

    setActivePage(itemName);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // const handleAddInvoiceClick = () => {
  //   setIsInvoiceAddMode(true);

  // };

  const handleSettingsNavigate = (tabName, pageKey) => {
    handleTabClick(pageKey);
    const hostelId = state.login?.selectedHostel_Id;
    if (hostelId) {
      navigate(`/settings/${hostelId}/${tabName}`);
    } else {
      navigate(`/settings/${tabName}`);
    }
  };


  useEffect(() => {
    if (isVisibleSidebar) {
      setIsSidebarOpen(false);
      setIsInvoiceAddMode(true);
    } else {
      setIsSidebarOpen(true);
      setIsInvoiceAddMode(false);
    }

  }, [isVisibleSidebar])



  return (
    <>

     
           <div className="px-1 py-1">

      <div className="relative flex gap-0">

       
        <div className="block md:hidden p-[10px]">
          <button
            onClick={handleToggleSidebar}
            className="bg-[#1E45E1] border border-[#1E45E1] rounded-full p-[5px] text-white"
          >
            {isSidebarOpen ? (
              <ArrowRight2 size="22" color="#FFF" />
            ) : (
              <ArrowLeft2 size="22" color="#FFF" />
            )}
          </button>
        </div>

   
        {!isInvoiceAddMode && (
          <aside
            className={`
              px-3
              transition-all duration-300
              sticky top-0 z-10
              ${isSidebarOpen ? "block w-[25%]" : "hidden md:block md:w-[25%]"}
              bg-white
            `}
          >
           
            <div className="sticky top-[10px] bg-white">
              <label className="font-[Gilroy] text-[20px] font-semibold text-black whitespace-nowrap">
                Settings
              </label>
            </div>

            <div className="show-scrolls bg-[#E7F1FF] rounded-[11px] p-[10px] mt-3 mb-2 shadow-md w-[201px] h-[246px]">
              {[
                ["General", "general"],
                ["Manage PG", "manage-pg"],
                ["Security", "security"],
                ["Subscription", "subscription"],
                ["Integration", "integration"],
              ].map(([label, key]) => (
                <div key={key}>
                  <p
                    onClick={() => handleSettingsNavigate(key, label)}
                    className={`flex justify-between items-center font-[Gilroy] text-[15px] font-medium cursor-pointer mb-[15px]
                      ${activePage === label ? "text-[#1E45E1]" : "text-black"}`}
                  >
                    {label}
                    <img
                      src={activePage === label ? blueArrow : blackArrow}
                      className="w-4 h-4" alt="image"
                    />
                  </p>
                  <hr className="border-white -mt-2" />
                </div>
              ))}
            </div>

           
            <div className="font-[Gilroy] text-[16px] font-semibold">
              PG Based Setting
            </div>

            <div className="show-scrolls bg-[#E7F1FF] rounded-[11px] p-[10px] mt-2 shadow-md w-[201px] max-h-[290px]">
              {[
                ["Electricity", "electricity"],
                ["Billing Rule", "billing-rule", "Billing_Rule"],
                ["Notifications", "notifications", "SettingsNotifications"],
                ["Bill Templates", "invoice", "Invoice"],
                ["Expenses", "expenses"],
                ["Complaints", "complaints"],
                ["Amenities", "amenities"],
                ["Staff", "user", "User"],
                ["Role", "role"],
                ["Agreement & Policy", "agreement"],
              ].map(([label, route, pageKey = label]) => (
                <div key={route}>
                  <p
                    onClick={() => handleSettingsNavigate(route, pageKey)}
                    className={`flex justify-between items-center font-[Gilroy] text-[15px] font-medium cursor-pointer mt-[-6px]
                      ${activePage === pageKey ? "text-[#1E45E1]" : "text-black"}`}
                  >
                    {label}
                    <img alt="image"
                      src={activePage === pageKey ? blueArrow : blackArrow}
                      className="w-4 h-4"
                    />
                  </p>
                  <hr className="border-white -mt-2" />
                </div>
              ))}
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main
          className={`
            m-0 p-0 overflow-y-auto h-screen
            ${isInvoiceAddMode ? "w-full" : "md:w-[75%]"}
            ${isSidebarOpen ? "hidden md:block" : ""}
          `}
        >
          <Outlet />
        </main>

      </div>
    </div>
 

     
    </>
  );
}
SettingAllPages.propTypes = {
  isVisibleSidebar: PropTypes.func.isRequired,
};
export default SettingAllPages;
