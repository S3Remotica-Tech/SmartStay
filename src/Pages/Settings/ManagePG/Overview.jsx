import React from "react";
import {
  ArrowUp2,
  Edit2,
  Buildings,
  Building4,
  User,
  Call,
  Sms,
  Location,
  Wifi,
  Profile2User,
  Setting2,
  TickCircle,
  Clock,
  Global,
  People,
} from "iconsax-react";
import { MdOutlineBed } from "react-icons/md";

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

const services = [
  {
    name: "Room Cleaning",
    description: "House Keeping Services",
    icon: Profile2User,
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
    icon: People,
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

function Overview() {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-4 mb-3">
        {overviewStats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className="bg-white rounded-lg border border-[#7878781F] px-3 py-3 flex items-center gap-3"
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

                <p className="text-[12px] text-[#292D32] mt-1 truncate mb-0">
                  {item.label}
                </p>

                {item.subLabel && (
                  <p className="text-[10px] text-[#999999] mt-0.5">
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
          <div className="flex items-center gap-2">
            <div className="w-[3px] h-5 bg-[#1E45E1] rounded-full" />

            <h3 className="text-[14px] font-medium text-[#292D32]">
              Contact Info
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-1 text-[#1E45E1] text-[12px] font-medium"
            >
              <Edit2 size="14" color="#1E45E1" variant="Outline" />
              Edit
            </button>

            <button type="button">
              <ArrowUp2 size="14" color="#FF4D4F" variant="Bold" />
            </button>
          </div>
        </div>

        <div className="px-3 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <div>
            <p className="text-[10px] text-[#777777] mb-1.5">Property Name</p>

            <div className="flex items-center gap-2">
              <Building4 size="15" color="#8290A3" variant="Outline" />
              <p className="text-[12px] text-[#3D4248]">Royal grand Hostel</p>
            </div>
          </div>

          <div>
            <p className="text-[10px] text-[#777777] mb-1.5">
              Proprietor / Manager
            </p>

            <div className="flex items-center gap-2">
              <User size="15" color="#8290A3" variant="Outline" />
              <p className="text-[12px] text-[#3D4248]">Charles Jebin S</p>
            </div>
          </div>

          <div>
            <p className="text-[10px] text-[#777777] mb-1.5">Contact No</p>

            <div className="flex items-center gap-2">
              <Call size="15" color="#8290A3" variant="Outline" />
              <p className="text-[12px] text-[#3D4248]">+91 98765 43287</p>
            </div>
          </div>

          <div>
            <p className="text-[10px] text-[#777777] mb-1.5">Mail ID</p>

            <div className="flex items-center gap-2">
              <Sms size="15" color="#8290A3" variant="Outline" />
              <p className="text-[12px] text-[#3D4248]">
                management@royalres.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#EEEEEE] overflow-hidden mb-3">
        <div className="flex items-center justify-between px-3 py-2.5">
          <div className="flex items-center gap-2">
            <div className="w-[3px] h-5 bg-[#1E45E1] rounded-full" />

            <h3 className="text-[14px] font-medium text-[#292D32]">
              Address Details
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-1 text-[#1E45E1] text-[12px] font-medium"
            >
              <Edit2 size="14" color="#1E45E1" variant="Outline" />
              Edit
            </button>

            <button type="button">
              <ArrowUp2 size="14" color="#FF4D4F" variant="Bold" />
            </button>
          </div>
        </div>

        <div className="px-3 pb-3">
          <p className="text-[11px] text-[#3D4248] leading-5">
            No 11, South car Street, Ramakrishna Nagar,
          </p>

          <p className="text-[11px] text-[#3D4248] leading-5">
            7th Avenue, Near SBI Bank, Anna Nagar- Chennai,
          </p>

          <p className="text-[11px] text-[#3D4248] leading-5">
            TamilNadu, 600 119
          </p>

          <div className="relative w-full h-[175px] rounded-lg overflow-hidden mt-3 bg-[#F2F4F7]">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-[#1E45E1] flex items-center justify-center shadow-lg">
                <Location size="22" color="#FFFFFF" variant="Bold" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#EEEEEE] overflow-hidden mb-3">
        <div className="flex items-center justify-between px-3 py-2.5">
          <div className="flex items-center gap-2">
            <div className="w-[3px] h-5 bg-[#1E45E1] rounded-full" />

            <h3 className="text-[14px] font-medium text-[#292D32]">
              Business Details
            </h3>
          </div>

          <button type="button">
            <ArrowUp2 size="14" color="#FF4D4F" variant="Bold" />
          </button>
        </div>

        <div className="px-3 pb-4 space-y-4">
          <div>
            <p className="text-[10px] text-[#777777] mb-1.5">GST IN</p>

            <p className="text-[12px] text-[#3D4248]">33LDAEV3105H9Z5</p>
          </div>

          <div>
            <p className="text-[10px] text-[#777777] mb-1.5">PAN No</p>

            <p className="text-[12px] text-[#3D4248]">BVBPM6512L</p>
          </div>

          <div>
            <p className="text-[10px] text-[#777777] mb-1.5">
              Principal Place of Business
            </p>

            <p className="text-[11px] text-[#3D4248] leading-5">
              No 11, South car Street, Ramakrishna Nagar,
            </p>

            <p className="text-[11px] text-[#3D4248] leading-5">
              7th Avenue, Near SBI Bank, Anna Nagar- Chennai,
            </p>

            <p className="text-[11px] text-[#3D4248] leading-5">
              TamilNadu, 600 119
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-[#EEEEEE] overflow-hidden mb-3">
        <div className="flex items-center justify-between px-3 py-2.5">
          <div className="flex items-center gap-2">
            <div className="w-[3px] h-5 bg-[#1E45E1] rounded-full" />

            <h3 className="text-[14px] font-medium text-[#292D32]">Services</h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-1 text-[#1E45E1] text-[12px] font-medium"
            >
              <Edit2 size="14" color="#1E45E1" variant="Outline" />
              Edit
            </button>

            <button type="button">
              <ArrowUp2 size="14" color="#FF4D4F" variant="Bold" />
            </button>
          </div>
        </div>

        <div className="px-3 pb-3 space-y-2">
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <div
                key={index}
                className="border border-[#E3E3E3] rounded-lg p-2.5"
              >
                {/* Service Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-[#EEF2FF] flex items-center justify-center">
                      <Icon size="18" color="#3157E8" variant="Outline" />
                    </div>

                    <div>
                      <p className="text-[12px] font-medium text-[#292D32]">
                        {service.name}
                      </p>

                      <p className="text-[10px] text-[#8A8A8A]">
                        {service.description}
                      </p>
                    </div>
                  </div>

                  {/* Toggle */}
                  <button
                    type="button"
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

                {/* Frequency */}
                {service.frequency && (
                  <div className="mt-2">
                    <p className="text-[9px] text-[#718096] uppercase mb-1.5">
                      Frequency
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {service.frequency.map((item, itemIndex) => (
                        <button
                          key={itemIndex}
                          type="button"
                          className={`px-2.5 py-1 rounded-full border text-[9px] ${
                            item.selected
                              ? "border-[#3157E8] text-[#3157E8] bg-[#F5F7FF]"
                              : "border-[#E5E5E5] text-[#999999]"
                          }`}
                        >
                          {item.selected && <span className="mr-1">✓</span>}
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Food Includes / Additional */}
                {service.includes && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <div>
                      <p className="text-[9px] text-[#718096] uppercase mb-1.5">
                        Includes in Rent
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {service.includes.map((item, itemIndex) => (
                          <button
                            key={itemIndex}
                            type="button"
                            className={`px-2.5 py-1 rounded-full border text-[9px] ${
                              item.selected
                                ? "border-[#3157E8] text-[#3157E8] bg-[#F5F7FF]"
                                : "border-[#E5E5E5] text-[#999999]"
                            }`}
                          >
                            {item.selected && <span className="mr-1">✓</span>}
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-[9px] text-[#718096] uppercase mb-1.5">
                        Additional
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {service.additional?.map((item, itemIndex) => (
                          <button
                            key={itemIndex}
                            type="button"
                            className={`px-2.5 py-1 rounded-full border text-[9px] ${
                              item.selected
                                ? "border-[#3157E8] text-[#3157E8] bg-[#F5F7FF]"
                                : "border-[#E5E5E5] text-[#999999]"
                            }`}
                          >
                            {item.selected && <span className="mr-1">✓</span>}
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
      </div>

      <div className="bg-white rounded-lg border border-[#EEEEEE] overflow-hidden">
        <div className="flex items-center justify-between px-3 py-2.5">
          <div className="flex items-center gap-2">
            <div className="w-[3px] h-5 bg-[#1E45E1] rounded-full" />

            <h3 className="text-[14px] font-medium text-[#292D32]">
              Property Rules
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex items-center gap-1 text-[#1E45E1] text-[12px] font-medium"
            >
              <Edit2 size="14" color="#1E45E1" variant="Outline" />
              Edit
            </button>

            <button type="button">
              <ArrowUp2 size="14" color="#FF4D4F" variant="Bold" />
            </button>
          </div>
        </div>

        <div className="px-3 pb-3 space-y-3">
          {/* Essential Rules */}
          <div className="border border-[#E3E3E3] rounded-lg p-2.5">
            <p className="text-[12px] font-medium text-[#3D4248] mb-2">
              Essential rules
            </p>

            <div className="flex flex-wrap gap-1.5">
              <button
                type="button"
                className="px-2.5 py-1 rounded-full border border-[#3157E8] bg-[#F5F7FF] text-[#3157E8] text-[9px]"
              >
                ✓ No Smoking
              </button>

              <button
                type="button"
                className="px-2.5 py-1 rounded-full border border-[#E5E5E5] text-[#999999] text-[9px]"
              >
                No Drinking
              </button>

              <button
                type="button"
                className="px-2.5 py-1 rounded-full border border-[#E5E5E5] text-[#999999] text-[9px]"
              >
                Non-Veg Allowed
              </button>

              <button
                type="button"
                className="px-2.5 py-1 rounded-full border border-[#E5E5E5] text-[#999999] text-[9px]"
              >
                No pets
              </button>
            </div>
          </div>

          {/* Guest Policy */}
          <div className="border border-[#E3E3E3] rounded-lg p-2.5">
            <p className="text-[12px] font-medium text-[#3D4248] mb-2">
              Guest Policy
            </p>

            <div className="flex flex-wrap gap-1.5 mb-3">
              <button
                type="button"
                className="px-2.5 py-1 rounded-full border border-[#3157E8] bg-[#F5F7FF] text-[#3157E8] text-[9px]"
              >
                ✓ No Guests
              </button>

              <button
                type="button"
                className="px-2.5 py-1 rounded-full border border-[#E5E5E5] text-[#999999] text-[9px]"
              >
                No overnight stay
              </button>

              <button
                type="button"
                className="px-2.5 py-1 rounded-full border border-[#E5E5E5] text-[#999999] text-[9px]"
              >
                Same gender only
              </button>
            </div>

            <p className="text-[9px] text-[#718096] uppercase mb-1.5">
              Visiting Hours Until
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="h-9 border border-[#E3E3E3] rounded-lg flex items-center gap-2 px-3">
                <Clock size="15" color="#7D8795" variant="Outline" />
                <span className="text-[10px] text-[#8993A1]">From</span>
              </div>

              <div className="h-9 border border-[#E3E3E3] rounded-lg flex items-center gap-2 px-3">
                <Clock size="15" color="#7D8795" variant="Outline" />
                <span className="text-[10px] text-[#8993A1]">to</span>
              </div>
            </div>
          </div>

          {/* Gate Opening Hours */}
          <div className="border border-[#E3E3E3] rounded-lg p-2.5">
            <p className="text-[12px] font-medium text-[#3D4248] mb-2">
              Gate Opening Hours
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="h-9 border border-[#E3E3E3] rounded-lg flex items-center gap-2 px-3">
                <Clock size="15" color="#7D8795" variant="Outline" />
                <span className="text-[10px] text-[#8993A1]">From</span>
              </div>

              <div className="h-9 border border-[#E3E3E3] rounded-lg flex items-center gap-2 px-3">
                <Clock size="15" color="#7D8795" variant="Outline" />
                <span className="text-[10px] text-[#8993A1]">to</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
