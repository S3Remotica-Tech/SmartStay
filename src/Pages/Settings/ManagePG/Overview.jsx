import React, { useState } from "react";
import {
  ArrowUp2,
  ArrowDown2,
  Edit2,
  Buildings,
  Building4,
  User,
  Call,
  Sms,
  Location,
  Wifi,
  ProfileAdd,
  Setting2,
  TickCircle,
  Clock,
  Global,
  People,
} from "iconsax-react";
import { MdOutlineBed } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const overviewStats = [
  {
    label: "Occupied Beds",
    value: 42,
    subLabel: "of 60 total",
    icon: MdOutlineBed,
    iconBg: "bg-[#EEF2FF]",
    iconColor: "#3157E8",
  },
  {
    label: "Active Tenants",
    value: 38,
    subLabel: "",
    icon: User,
    iconBg: "bg-[#FFF7ED]",
    iconColor: "#F97316",
  },
  {
    label: "Total Rooms",
    value: 16,
    subLabel: "",
    icon: Buildings,
    iconBg: "bg-[#F5F0FF]",
    iconColor: "#8B5CF6",
  },
  {
    label: "Available Beds",
    value: "04",
    subLabel: "",
    icon: TickCircle,
    iconBg: "bg-[#ECFDF5]",
    iconColor: "#10B981",
  },
];

function Overview() {
  const [isContactInfoOpen, setIsContactInfoOpen] = useState(true);
  const [isAddressOpen, setIsAddressOpen] = useState(true);
  const [isBusinessOpen, setIsBusinessOpen] = useState(true);
  const [isServicesOpen, setIsServicesOpen] = useState(true);
  const [isPropertyRulesOpen, setIsPropertyRulesOpen] = useState(true);

  const initialServices = [
    {
      name: "Room Cleaning",
      description: "House Keeping Services",
      icon: ProfileAdd,
      enabled: true,
      frequency: [
        { label: "Daily", selected: true },
        { label: "Weekly", selected: false },
        { label: "Weekly-twice", selected: false },
        { label: "Monthly", selected: false },
        { label: "On request", selected: false },
      ],
    },
    {
      name: "Food",
      description: "Food Services",
      icon: ProfileAdd,
      enabled: true,
      includes: [
        { label: "Breakfast", selected: true },
        { label: "Lunch", selected: false },
        { label: "Dinner", selected: false },
      ],
      additional: [
        { label: "On request / paid", selected: true },
        { label: "Lunch", selected: false },
      ],
    },
    {
      name: "Wi-Fi / Internet",
      description: "Always available",
      icon: Wifi,
      enabled: false,
    },
    {
      name: "Laundry",
      description: "Always available",
      icon: Global,
      enabled: false,
    },
    {
      name: "Lift",
      description: "Always available",
      icon: Building4,
      enabled: false,
    },
    {
      name: "Maintenance",
      description: "On request",
      icon: Setting2,
      enabled: false,
    },
  ];
  const [services, setServices] = useState(initialServices);

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-4 mb-3">
        {overviewStats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-lg border border-[#7878781F] px-3 py-3 flex items-center  gap-3"
            >
              <div
                className={`w-10 h-10 rounded-lg ${item.iconBg} flex items-center justify-center shrink-0`}
              >
                <Icon size="20" color={item.iconColor} variant="Bold" />
              </div>

              <div className="min-w-0">
                <p className="text-[22px] font-medium text-[#292D32] leading-none mb-0">
                  {item.value}
                </p>

                <p className="text-[12px] text-[#4B4B4B] mb-0 truncate ">
                  {item.label}
                </p>

                {item.subLabel && (
                  <p className="text-[10px] text-[#828282] mb-0">
                    {item.subLabel}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-lg border border-[#EEEEEE] overflow-hidden mb-3">
        <div className="flex items-center justify-between px-3 py-2.5">
          <div className="flex items-center gap-2 p-1">
            <div className="w-[5px] h-6 bg-[#1E45E1] rounded-full" />

            <h3 className="text-[18px] font-medium text-[#292D32] mb-0">
              Contact Info
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-1 text-[#1E45E1] text-[14px] font-medium"
            >
              <Edit2 size="14" color="#1E45E1" variant="Outline" />
              Edit
            </button>

            <button
              type="button"
              onClick={() => setIsContactInfoOpen((prev) => !prev)}
              className="flex items-center justify-center"
            >
              {isContactInfoOpen ? (
                <ArrowUp2 size="16" color="#FF4D4F" />
              ) : (
                <ArrowDown2 size="16" color="#FF4D4F" />
              )}
            </button>
          </div>
        </div>
        {isContactInfoOpen && (
          <div className="px-3 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <p className="text-[12px] text-[#4B4B4B] mb-1.5">Property Name</p>

              <div className="flex items-center gap-2">
                <Building4 size="15" color="#8290A3" variant="Outline" />
                <p className="text-[14px] text-[#222222] mb-0 font-semibold">
                  Royal grand Hostel
                </p>
              </div>
            </div>

            <div>
              <p className="text-[12px] text-[#4B4B4B] mb-1.5">
                Proprietor / Manager
              </p>

              <div className="flex items-center gap-2">
                <User size="15" color="#8290A3" variant="Outline" />
                <p className="text-[14px] text-[#222222] mb-0 font-semibold">
                  Charles Jebin S
                </p>
              </div>
            </div>

            <div>
              <p className="text-[12px] text-[#4B4B4B] mb-1.5">Contact No</p>

              <div className="flex items-center gap-2">
                <Call size="15" color="#8290A3" variant="Outline" />
                <p className="text-[14px] text-[#222222] mb-0 font-semibold">
                  +91 98765 43287
                </p>
              </div>
            </div>

            <div>
              <p className="text-[12px] text-[#4B4B4B] mb-1.5">Mail ID</p>

              <div className="flex items-center gap-2">
                <Sms size="15" color="#8290A3" variant="Outline" />
                <p className="text-[14px] text-[#222222] mb-0 font-semibold">
                  management@royalres.com
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg border border-[#EEEEEE] overflow-hidden mb-3">
        <div className="flex items-center justify-between px-3 py-2.5">
          <div className="flex items-center gap-2 p-1">
            <div className="w-[5px] h-6 bg-[#1E45E1] rounded-full" />

            <h3 className="text-[18px] mb-0 font-medium text-[#292D32]">
              Address Details
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-1 text-[#1E45E1] text-[14px] font-medium"
            >
              <Edit2 size="14" color="#1E45E1" variant="Outline" />
              Edit
            </button>

            <button
              type="button"
              onClick={() => setIsAddressOpen((prev) => !prev)}
            >
              {isAddressOpen ? (
                <ArrowUp2 size="16" color="#FF4D4F" />
              ) : (
                <ArrowDown2 size="16" color="#FF4D4F" />
              )}
            </button>
          </div>
        </div>
        {isAddressOpen && (
          <div className="px-3 pb-3">
            <p className="text-[12px] text-[#222222] leading-5 mb-0 font-semibold">
              No 11, South car Street, Ramakrishna Nagar,
            </p>

            <p className="text-[12px] text-[#222222] leading-5 mb-0 font-semibold">
              7th Avenue, Near SBI Bank, Anna Nagar- Chennai,
            </p>

            <p className="text-[12px] text-[#222222] leading-5 mb-0 font-semibold">
              TamilNadu, 600 119
            </p>

            <div className="relative w-full h-[175px] rounded-lg overflow-hidden mt-3">
              <iframe
                title="Property Location"
                src="https://www.google.com/maps?q=Anna+Nagar,+Chennai,+Tamil+Nadu+600119&output=embed"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg border border-[#EEEEEE] overflow-hidden mb-3">
        <div className="flex items-center justify-between px-3 py-2.5">
          <div className="flex items-center gap-2 p-1">
            <div className="w-[5px] h-6 bg-[#1E45E1] rounded-full" />

            <h3 className="text-[18px] font-medium text-[#292D32] mb-0">
              Business Details
            </h3>
          </div>

          <button
            type="button"
            onClick={() => setIsBusinessOpen((prev) => !prev)}
          >
            {isBusinessOpen ? (
              <ArrowUp2 size="16" color="#FF4D4F" />
            ) : (
              <ArrowDown2 size="16" color="#FF4D4F" />
            )}
          </button>
        </div>
        {isBusinessOpen && (
          <div className="px-3 pb-4 space-y-4">
            <div>
              <p className="text-[12px] text-[#4B4B4B] mb-1.5">GST IN</p>

              <p className="text-[14px] text-[#222222] font-semibold">
                33LDAEV3105H9Z5
              </p>
            </div>

            <div>
              <p className="text-[12px] text-[#4B4B4B] mb-1.5">PAN No</p>

              <p className="text-[14px] text-[#222222] font-semibold">
                BVBPM6512L
              </p>
            </div>

            <div>
              <p className="text-[12px] text-[#4B4B4B] mb-1.5 ">
                Principal Place of Business
              </p>

              <p className="text-[14px] text-[#222222] leading-5 font-semibold">
                No 11, South car Street, Ramakrishna Nagar, <br />
                7th Avenue, Near SBI Bank, Anna Nagar- Chennai, <br />
                TamilNadu, 600 119
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg border border-[#EEEEEE] overflow-hidden mb-3">
        <div className="flex items-center justify-between px-3 py-2.5">
          <div className="flex items-center gap-2 p-1">
            <div className="w-[5px] h-6 bg-[#1E45E1] rounded-full" />

            <h3 className="text-[18px] font-medium text-[#292D32] mb-0">
              Services
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-1 text-[#1E45E1] text-[14px] font-medium"
            >
              <Edit2 size="14" color="#1E45E1" variant="Outline" />
              Edit
            </button>

            <button
              type="button"
              onClick={() => setIsServicesOpen((prev) => !prev)}
            >
              {isServicesOpen ? (
                <ArrowUp2 size="16" color="#FF4D4F" />
              ) : (
                <ArrowDown2 size="16" color="#FF4D4F" />
              )}
            </button>
          </div>
        </div>
        {isServicesOpen && (
          <div className="px-3 pb-3 space-y-2">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <div
                  key={index}
                  className="border border-[#DCDCDC] rounded-lg p-2.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-lg bg-[#EEF2FF] flex items-center justify-center">
                        <Icon size="18" color="#3157E8" variant="Bold" />
                      </div>

                      <div className="flex flex-col">
                        <label className="text-[16px] font-semibold text-[#101828]">
                          {service.name}
                        </label>

                        <label className="text-[12px] text-[#6A7282]">
                          {service.description}
                        </label>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setServices((prev) =>
                          prev.map((item, serviceIndex) =>
                            serviceIndex === index
                              ? { ...item, enabled: !item.enabled }
                              : item,
                          ),
                        );
                      }}
                      className={`w-7 h-4 rounded-full relative ${
                        service.enabled ? "bg-[#3157E8]" : "bg-[#BDBDBD]"
                      }`}
                    >
                      <span
                        className={`absolute top-[2px] w-3 h-3 rounded-full bg-white ${
                          service.enabled ? "right-[2px]" : "left-[2px]"
                        }`}
                      />
                    </button>
                  </div>

                  {service.frequency && (
                    <div className="mt-2">
                      <span className="text-[11px] text-[#64748B] uppercase mb-1.5">
                        Frequency
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {service.frequency.map((item, itemIndex) => (
                          <button
                            key={itemIndex}
                            type="button"
                            className={`px-2.5 py-1 rounded-full border flex items-center text-[11px] ${
                              item.selected
                                ? "border-[#1E45E1] text-[#3157E8] bg-[#EEF2FF]"
                                : "border-[#E4E4E7] text-[#6F767E] bg-[#FFFFFF]"
                            }`}
                          >
                            {item.selected && (
                              <span className="mr-1">
                                <TiTick className="text-[16px]" />
                              </span>
                            )}
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {service.includes && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                      <div>
                        <label className="text-[11px] text-[#64748B] uppercase mb-1.5">
                          Includes in Rent
                        </label>

                        <div className="flex flex-wrap gap-1.5">
                          {service.includes.map((item, itemIndex) => (
                            <button
                              key={itemIndex}
                              type="button"
                              className={`px-2.5 py-1 rounded-full border flex items-center text-[11px] ${
                                item.selected
                                  ? "border-[#1E45E1] text-[#3157E8] bg-[#EEF2FF]"
                                  : "border-[#E4E4E7] text-[#6F767E] bg-[#FFFFFF]"
                              }`}
                            >
                              {item.selected && (
                                <span className="mr-1">
                                  <TiTick className="text-[16px]" />
                                </span>
                              )}
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] text-[#64748B] uppercase mb-1.5">
                          Additional
                        </label>

                        <div className="flex flex-wrap gap-1.5">
                          {service.additional?.map((item, itemIndex) => (
                            <button
                              key={itemIndex}
                              type="button"
                              className={`px-2.5 py-1 rounded-full border flex items-center text-[11px] ${
                                item.selected
                                  ? "border-[#1E45E1] text-[#3157E8] bg-[#EEF2FF]"
                                  : "border-[#E4E4E7] text-[#6F767E] bg-[#FFFFFF]"
                              }`}
                            >
                              {item.selected && (
                                <span className="mr-1">
                                  <TiTick className="text-[16px]" />
                                </span>
                              )}
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg border border-[#EEEEEE] overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2.5">
          <div className="flex items-center gap-2 p-1">
            <div className="w-[5px] h-6 bg-[#1E45E1] rounded-full" />

            <h3 className="text-[18px] font-medium text-[#292D32] mb-0">
              Property Rules
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-1 text-[#1E45E1] text-[14px] font-medium"
            >
              <Edit2 size="14" color="#1E45E1" variant="Outline" />
              Edit
            </button>

            <button
              type="button"
              onClick={() => setIsPropertyRulesOpen((prev) => !prev)}
            >
              {isPropertyRulesOpen ? (
                <ArrowUp2 size="16" color="#FF4D4F" />
              ) : (
                <ArrowDown2 size="16" color="#FF4D4F" />
              )}
            </button>
          </div>
        </div>
        {isPropertyRulesOpen && (
          <div className="px-3 pb-3 space-y-2">
            <div className="border border-[#DCDCDC] rounded-lg p-2.5">
              <div className="flex flex-col">
                <label className="text-[16px] font-semibold text-[#101828]">
                  Essential Rules
                </label>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-2">
                <button
                  type="button"
                  className="px-2.5 py-1 rounded-full border flex items-center text-[11px] border-[#1E45E1] text-[#3157E8] bg-[#EEF2FF]"
                >
                  <span className="mr-1">
                    <TiTick className="text-[16px]" />
                  </span>
                  No Smoking
                </button>

                <button
                  type="button"
                  className="px-2.5 py-1 rounded-full border flex items-center text-[11px] border-[#E4E4E7] text-[#6F767E] bg-[#FFFFFF]"
                >
                  No Drinking
                </button>

                <button
                  type="button"
                  className="px-2.5 py-1 rounded-full border flex items-center text-[11px] border-[#E4E4E7] text-[#6F767E] bg-[#FFFFFF]"
                >
                  Non-Veg Allowed
                </button>

                <button
                  type="button"
                  className="px-2.5 py-1 rounded-full border flex items-center text-[11px] border-[#E4E4E7] text-[#6F767E] bg-[#FFFFFF]"
                >
                  No Pets
                </button>
              </div>
            </div>

            <div className="border border-[#DCDCDC] rounded-lg p-2.5">
              <div className="flex flex-col">
                <label className="text-[16px] font-semibold text-[#101828]">
                  Guest Policy
                </label>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-2">
                <button
                  type="button"
                  className="px-2.5 py-1 rounded-full border flex items-center text-[11px] border-[#1E45E1] text-[#3157E8] bg-[#EEF2FF]"
                >
                  <span className="mr-1">
                    <TiTick className="text-[16px]" />
                  </span>
                  No Guests
                </button>

                <button
                  type="button"
                  className="px-2.5 py-1 rounded-full border flex items-center text-[11px] border-[#E4E4E7] text-[#6F767E] bg-[#FFFFFF]"
                >
                  No Overnight Stay
                </button>

                <button
                  type="button"
                  className="px-2.5 py-1 rounded-full border flex items-center text-[11px] border-[#E4E4E7] text-[#6F767E] bg-[#FFFFFF]"
                >
                  Same Gender Only
                </button>
              </div>

              <div className="mt-3">
                <label className="text-[11px] text-[#64748B] uppercase mb-1.5">
                  Visiting Hours Until
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1.5">
                  <div className="h-9 border border-[#E3E3E3] rounded-lg flex items-center gap-2 px-3">
                    <Clock size="15" color="#7D8795" variant="Outline" />
                    <span className="text-[10px] text-[#8993A1]">From</span>
                  </div>

                  <div className="h-9 border border-[#E3E3E3] rounded-lg flex items-center gap-2 px-3">
                    <Clock size="15" color="#7D8795" variant="Outline" />
                    <span className="text-[10px] text-[#8993A1]">To</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border border-[#DCDCDC] rounded-lg p-2.5">
              <div className="flex flex-col">
                <label className="text-[16px] font-semibold text-[#101828]">
                  Gate Opening Hours
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                <div className="h-9 border border-[#E3E3E3] rounded-lg flex items-center gap-2 px-3">
                  <Clock size="15" color="#7D8795" variant="Outline" />
                  <span className="text-[10px] text-[#8993A1]">From</span>
                </div>

                <div className="h-9 border border-[#E3E3E3] rounded-lg flex items-center gap-2 px-3">
                  <Clock size="15" color="#7D8795" variant="Outline" />
                  <span className="text-[10px] text-[#8993A1]">To</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Overview;
