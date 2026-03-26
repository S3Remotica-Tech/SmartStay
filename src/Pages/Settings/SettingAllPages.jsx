/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import blueArrow from "../../Assets/Images/New_images/arrow-leftblue.png";
import blackArrow from "../../Assets/Images/New_images/arrow-leftblack.png";
// import "../Settings/Settings.css";
// import '../Settings/SettingAll.css';
import { useSelector } from 'react-redux';
import { ArrowRight2, ArrowLeft2 } from 'iconsax-react'
// import SettingsBills from "./SettingsBills";
import { useNavigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

function SettingAllPages({ isVisibleSidebar }) {
  const navigate = useNavigate();


  const state = useSelector(state => state);
  // const [hostel_Id, setHostel_Id] = useState('')
  const [activePage, setActivePage] = useState("general");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isInvoiceAddMode, setIsInvoiceAddMode] = useState(false);




  // useEffect(() => {
  //   const path = location.pathname;

  //   const lastSegment = path.split("/").pop(); 
  // console.log("lastSegment",lastSegment)
  //   if (lastSegment) {
  //     setActivePage(
  //       lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1)
  //     );
  //   }
  // }, [location.pathname]);



  useEffect(() => {
    const path = location.pathname;
    const lastSegment = path.split("/").pop();
    // console.log("lastSegment", lastSegment)
    if (lastSegment) {
      setActivePage(lastSegment);
    }
  }, [location.pathname]);

  // console.log("active page", activePage)

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

        <div className="relative flex gap-0 h-[calc(100vh-20px)]">
          <div className="block md:hidden p-2.5">
            <button
              onClick={handleToggleSidebar}
              className="bg-[#1E45E1] border border-[#1E45E1] rounded-full p-1 text-white"
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
              bg-white  h-full
            `}
            >

              <div className="sticky top-2">
                <label className="font-gilroy text-lg font-semibold text-black whitespace-nowrap">
                  Settings
                </label>
              </div>

              <div className="show-scrolls bg-[#E7F1FF] rounded-lg p-2.5 mt-3 mb-4 shadow-md w-[201px] h-[226px] lg:h-[226px] 2xl:h-[250px]">
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
                      className={`flex justify-between items-center font-gilroy text-[15px] font-medium cursor-pointer mb-2.5 
                      ${activePage === key ? "text-[#1E45E1]" : "text-black"}`}
                    >
                      {label}
                      <img
                        src={activePage === key ? blueArrow : blackArrow}
                        className="w-4 h-4" alt="image"
                      />
                    </p>
                    <hr className="border-white -mt-2" />
                  </div>
                ))}
              </div>


              <div className="font-gilroy text-medium font-semibold mt-3 mb-2">
                PG Based Setting
              </div>

              <div className="show-scrolls bg-[#E7F1FF] rounded-[11px] p-2.5 pt-4 shadow-md w-[201px] h-[270px] lg:h-[270px] 2xl:h-[400px]">
                {[
                  // ["Electricity Old", "electricity-old"],
                  ["Electricity", "electricity"],
                  ["Billing Rule", "billing-rule", "Billing_Rule"],
                  ["Billing Rule Old", "billing-rule-old", "Billing_Rule_Old"],
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
                      className={`flex flex-shrink-0 justify-between items-center font-gilroy text-[15px] font-medium cursor-pointer -mt-2.5
                      ${activePage === route ? "text-[#1E45E1]" : "text-black"}`}
                    >
                      {label}
                      <img alt="image"
                        src={activePage === route ? blueArrow : blackArrow}
                        className="w-4 h-4"
                      />
                    </p>
                    <hr className="border-white -mt-2" />
                  </div>
                ))}
              </div>
            </aside>
          )}

          <main
            className={`
            m-0 p-0
    overflow-y-auto
    h-full
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
