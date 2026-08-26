/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import { useSelector } from "react-redux";
import {
  Setting2,
  Home2,
  Buildings2,
  Building,
  DocumentText,
  Profile2User,
  Send2,
  SearchNormal1,
  Add,
} from "iconsax-react";
import { useNavigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";

function SettingAllPages({ isVisibleSidebar }) {
  const navigate = useNavigate();

  const state = useSelector((state) => state);

  const [activePage, setActivePage] = useState("general");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isInvoiceAddMode, setIsInvoiceAddMode] = useState(false);

  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState("general");

  const directMenuIds = ["general", "tenant-app-controls"];

  const settingsMenu = [
    {
      id: "general",
      label: "General",
      icon: Home2,
    },
    {
      id: "organization",
      label: "Organization",
      icon: Buildings2,
    },
    {
      id: "pg-configuration",
      label: "PG Configuration",
      icon: Building,
    },
    {
      id: "lists-categories",
      label: "Lists & Categories",
      icon: DocumentText,
    },
    {
      id: "user-management",
      label: "User Management",
      icon: Profile2User,
    },
    {
      id: "tenant-app-controls",
      label: "Tenant App Controls",
      icon: Send2,
    },
  ];

  const settingsSubMenus = {
    general: [["General", "general"]],

    organization: [
      ["Manage PG", "manage-pg"],
      ["Security", "security"],
      ["Subscription", "subscription"],
      ["Integration", "integration"],
    ],

    "pg-configuration": [
      ["Electricity", "electricity"],
      ["Billing Rule", "billing-rule", "Billing_Rule"],
      ["Notifications", "notifications", "SettingsNotifications"],
      ["Bill Templates", "invoice", "Invoice"],
      ["Agreements & Policies", "agreement"],
    ],

    "lists-categories": [
      ["Expense Category", "expenses"],
      ["Vendor Categories", "vendor-category"],
      ["Complaints Category", "complaints"],
      ["Amenities", "amenities"],
    ],

    "user-management": [
      ["Staff", "user", "User"],
      ["Roles & Permissions", "role"],
    ],

    "tenant-app-controls": [["Tenant App Controls", "tenant-app-controls"]],
  };

  const filteredMenu = settingsMenu?.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase()),
  );

  useEffect(() => {
    const path = location.pathname;
    const lastSegment = path.split("/").pop();

    if (lastSegment) {
      setActivePage(lastSegment);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (state.PgList?.isManageEnable) {
      setActivePage("Manage PG");
      navigate(`/settings/${"manage-pg"}`);
    }
  }, [state.PgList?.isManageEnable]);

  const handleTabClick = (itemName) => {
    setActivePage(itemName);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

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
  }, [isVisibleSidebar]);

  const handleClose = () => {
    navigate(`/dashboard/${state.login.selectedHostel_Id}`);
  };

  return (
    <>
      <div className="font-gilroy h-screen  overflow-hidden flex flex-col">
        <div className="flex-shrink-0 w-full border-b border-[#EEEEEE] flex items-center justify-between px-4 py-2 bg-white z-50">
          <label className="font-gilroy text-lg font-semibold text-black whitespace-nowrap mb-0 flex items-center gap-2">
            <Setting2 /> Settings
          </label>
          <button
            onClick={handleClose}
            className="bg-[#F1F1F1] text-[#222222] text-sm rounded-md flex gap-1 
                      items-center px-2 py-1 font-gilroy "
          >
            <Add
              size="24"
              color="#FF0000"
              className="cursor-pointer rotate-45"
            />{" "}
            Close Settings
          </button>
        </div>

        <div className="flex flex-1 min-h-0 overflow-hidden">
          <div className="w-[200px] min-w-[200px] h-full bg-white border-r border-[#EEEEEE] flex-shrink-0">
            <div className="p-3">
              <div className="relative">
                <form autoComplete="off" role="search">
                  <input
                    type="search"
                    name="settings-filter"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
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
            </div>

            <div className="px-2 space-y-1">
              {filteredMenu.map((item) => {
                const Icon = item.icon;
                const isActive = activeMenu === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveMenu(item.id);
                      const firstMenu = settingsSubMenus[item.id]?.[0];
                      if (directMenuIds.includes(item.id)) {
                        handleSettingsNavigate(item.id, item.id);
                      } else if (firstMenu) {
                        handleSettingsNavigate(firstMenu[1], firstMenu[0]);
                      }
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-full text-left transition-all
                ${
                  isActive
                    ? "bg-[#EEF2FF] text-[#1E45E1]"
                    : "text-[#222222] hover:bg-[#EEF2F8]"
                }`}
                  >
                    <Icon
                      size="16"
                      className="flex-shrink-0"
                      color={isActive ? "#315DB5" : "#555555"}
                    />

                    <span className="text-[14px] font-medium whitespace-nowrap">
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {!isInvoiceAddMode && !directMenuIds.includes(activeMenu) && (
            <aside
              className={`
            px-3 bg-white h-full border-r border-[#EEEEEE] flex-shrink-0
            ${
              isSidebarOpen
                ? "block w-[15%] md:w-[15%]"
                : "hidden md:block md:w-[15%]"
            }
          `}
            >
              <div className="bg-white rounded-lg py-1.5 w-full">
                {!directMenuIds.includes(activeMenu) &&
                  settingsSubMenus[activeMenu]?.map(
                    ([label, route, pageKey = label]) => {
                      const isActive =
                        activePage === route ||
                        (route === "billing-rule" &&
                          ["long-stay-recurring"].includes(activePage)) ||
                        (route === "electricity" &&
                          ["electricity-rule"].includes(activePage)) ||
                        (route === "agreement" &&
                          ["add-template"].includes(activePage));

                      return (
                        <div key={route}>
                          <p
                            onClick={() =>
                              handleSettingsNavigate(route, pageKey)
                            }
                            className={`flex justify-between items-center font-gilroy
                font-medium cursor-pointer py-2.5 mb-0 px-3 rounded-xl
                text-[14px] md:text-[14px] lg:text-[14px] whitespace-nowrap
                transition-all
                ${
                  isActive
                    ? "bg-[#EEF2FF] text-[#1E45E1]"
                    : "text-black hover:bg-white/60"
                }`}
                          >
                            {label}
                          </p>
                        </div>
                      );
                    },
                  )}
              </div>
            </aside>
          )}

          <main
            className={`
          flex-1 min-w-0 min-h-0 overflow-y-auto px-2
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
  isVisibleSidebar: PropTypes.bool.isRequired,
};
export default SettingAllPages;
