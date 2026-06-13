import React, { useState } from "react";
import {
  Building,
  Category,
  Call,
  ProfileCircle,
  Sms,
  ArrowUp2,
  Calendar,
  ArrowDown2,
} from "iconsax-react";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function VendorDetailsOverview() {
  const [showVendorInfo, setShowVendorInfo] = useState(true);
  const [showAddressInfo, setShowAddressInfo] = useState(false);
  const [showBusinessInfo, setShowBusinessInfo] = useState(false);

  const vendorData = {
    vendorName: "Vinayaka Electricals",
    category: "Electrical",
    businessMobile: "+91 9876543210",
    proprietor: "Charles Jebin S",
    mobile: "+91 98765 43287",
    email: "---",
    description: "Electrical purchase Only",
  };

  const chartData = [
    { month: "Aug", vendor: 12, nonVendor: 1 },
    { month: "Sep", vendor: 13, nonVendor: 0.8 },
    { month: "Oct", vendor: 14, nonVendor: 1.2 },
    { month: "Nov", vendor: 13.5, nonVendor: 1 },
    { month: "Dec", vendor: 15, nonVendor: 0.9 },
    { month: "Jan", vendor: 3, nonVendor: 12 },
  ];

  const vendorInfoFields = [
    {
      label: "Vendor Name",
      value: vendorData.vendorName,
      icon: <Building size={16} />,
    },
    {
      label: "Category",
      value: vendorData.category,
      icon: <Category size={16} />,
    },
    {
      label: "Business Mobile No",
      value: vendorData.businessMobile,
      icon: <Call size={16} />,
    },
    {
      label: "Proprietor / Contact person Name",
      value: vendorData.proprietor,
      icon: <ProfileCircle size={16} />,
    },
    {
      label: "Mobile No",
      value: vendorData.mobile,
      icon: <Call size={16} />,
    },
    {
      label: "Mail ID",
      value: vendorData.email,
      icon: <Sms size={16} />,
    },
    {
      label: "Description",
      value: vendorData.description,
      icon: null,
    },
  ];

  const addressInfoFields = [
    {
      label: "Address",
      value:
        "No,125, South street, Rama Nagar, 6th Avenue, Chennai , Tamilnadu-658989",
    },
  ];

  const businessInfoFields = [
    {
      label: "GSTIN",
      value: "GSDF526584585878",
    },
    {
      label: "PAN No",
      value: "785585888",
    },
    {
      label: "Vendor Code",
      value: "VEN001",
    },
    {
      label: "Credit Limit",
      value: "₹15000/ month",
    },
    {
      label: "Credit Period",
      value: "10th of month",
    },
  ];

  return (
    <div className="bg-white rounded-xl px-4 h-full">
      <div className="grid grid-cols-[300px_1fr] gap-4 h-full">
        <div className="pr-1 overflow-y-auto show-scrolls h-[500px] mb-10 ">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowVendorInfo(!showVendorInfo)}
          >
            <h5 className="flex items-center text-[18px] font-semibold text-[#222222]">
              <span className="w-1 h-5 bg-[#0038AC] rounded mr-2"></span>
              Vendor Information
            </h5>

            <button>
              <ArrowUp2
                className={`cursor-pointer transition-transform duration-200 ${
                  !showVendorInfo ? "rotate-180" : ""
                }`}
                color="#28303F"
                size="16"
              />
            </button>
          </div>

          {showVendorInfo && (
            <div className="space-y-5">
              {vendorInfoFields.map((item, index) => (
                <div key={index}>
                  <p className="text-[11px] text-[#9CA3AF] mb-2">
                    {item.label}
                  </p>

                  {item.icon ? (
                    <div className="flex items-center gap-2">
                      <span className="text-[#6B7280]">{item.icon}</span>
                      <span className="text-[13px] text-[#111827] font-medium">
                        {item.value || "---"}
                      </span>
                    </div>
                  ) : (
                    <p className="text-[13px] text-[#222222]">
                      {item.value || "---"}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div
            className="flex items-center justify-between  my-4 cursor-pointer "
            onClick={() => setShowAddressInfo(!showAddressInfo)}
          >
            <h5 className="flex items-center text-[18px] font-semibold text-[#222222]">
              <span className="w-1 h-5 bg-[#0038AC] rounded mr-2"></span>
              Address Details
            </h5>

            <button>
              <ArrowUp2
                className={`cursor-pointer transition-transform duration-200 ${
                  !showAddressInfo ? "rotate-180" : ""
                }`}
                color="#28303F"
                size="16"
              />
            </button>
          </div>
          {showAddressInfo && (
            <div className="space-y-5">
              {addressInfoFields.map((item, index) => (
                <div key={index}>
                  <label className="text-[13px] text-[#222222]">
                    {item.value}
                  </label>
                </div>
              ))}
            </div>
          )}
          <div
            className="flex items-center justify-between my-4 cursor-pointer"
            onClick={() => setShowBusinessInfo(!showBusinessInfo)}
          >
            <h5 className="flex items-center text-[18px] font-semibold text-[#222222]">
              <span className="w-1 h-5 bg-[#0038AC] rounded mr-2"></span>
              Business Details
            </h5>

            <button>
              <ArrowUp2
                className={`cursor-pointer transition-transform duration-200 ${
                  !showBusinessInfo ? "rotate-180" : ""
                }`}
                color="#28303F"
                size="16"
              />
            </button>
          </div>
          {showBusinessInfo && (
            <div className="space-y-5 ">
              {businessInfoFields.map((item, index) => (
                <div key={index}>
                  <p className="text-[11px] text-[#9CA3AF] mb-2">
                    {item.label}
                  </p>
                  <label className="text-[13px] text-[#222222]">
                    {item.value}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border border-[#E5E7EB] rounded-md min-w-0 h-fit">
          <div className="flex items-center justify-between m-4">
            <div>
              <h3 className="text-[15px] font-semibold text-[#222222]">
                Expense Breakdown
              </h3>

              <p className="text-[11px] text-[#4A5565]">
                Vendor vs Non Vendor amounts for month
              </p>
            </div>

            <button className="flex items-center gap-2 px-3 py-2 border border-[#E5E7EB] rounded-lg text-[12px] text-[#374151]">
              <Calendar size="16" />
              Last 6 Month <ArrowDown2 size="16" />
            </button>
          </div>

          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={10}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />

                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <YAxis
                  tick={{ fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <Tooltip />

                <Bar
                  dataKey="vendor"
                  fill="#E7D468"
                  radius={[4, 4, 0, 0]}
                  barSize={18}
                />

                <Bar
                  dataKey="nonVendor"
                  fill="#43CB73"
                  radius={[4, 4, 0, 0]}
                  barSize={18}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-8 mt-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#43CB73]" />
              <span className="text-[12px] text-[#43CB73]">Non Vendor</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E7D468]" />
              <span className="text-[12px] text-[#E7D468]">Vendor</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorDetailsOverview;
