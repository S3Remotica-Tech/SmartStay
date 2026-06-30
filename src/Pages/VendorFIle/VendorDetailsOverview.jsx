import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function VendorDetailsOverview({ handleSelected }) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  const VendorOverView = state.ComplianceList?.vendorOverview || {};

  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);

  const [selectedPeriod, setSelectedPeriod] = useState(
    VendorOverView?.filterOptions?.periods?.[0],
  );

  const [showVendorInfo, setShowVendorInfo] = useState(true);
  const [showAddressInfo, setShowAddressInfo] = useState(false);
  const [showBusinessInfo, setShowBusinessInfo] = useState(false);

  useEffect(() => {
    const firstPeriod = VendorOverView?.filterOptions?.periods?.[0];

    if (firstPeriod) {
      setSelectedPeriod(firstPeriod);
      handleSelected(firstPeriod);
    }
  }, []);

  const chartData =
    VendorOverView?.monthSummary?.map((item) => ({
      month: item.month,
      paid: item.paidAmount,
      unPaid: item.balanceAmount,
    })) || [];

  const vendorInfoFields = [
    {
      label: "Vendor Name",
      value: VendorOverView.fullName || "---",
      icon: <Building size={16} />,
    },
    {
      label: "Category",
      value: VendorOverView.vendorCategoryName || "---",
      icon: <Category size={16} />,
    },
    {
      label: "Business Mobile No",
      value:
        ` ${VendorOverView.businessMobileCode} ${VendorOverView.mobile}` ||
        "---",
      icon: <Call size={16} />,
    },
    {
      label: "Proprietor / Contact Person",
      value: VendorOverView.contactPerson || "---",
      icon: <ProfileCircle size={16} />,
    },
    {
      label: "Contact Person Mobile",
      value:
        VendorOverView.contactPersonMobileCode &&
        VendorOverView.contactPersonMobile
          ? `${VendorOverView.contactPersonMobileCode} ${VendorOverView.contactPersonMobile}`
          : "---",
      icon: <Call size={16} />,
    },
    {
      label: "Mail ID",
      value: VendorOverView.emailId || "---",
      icon: <Sms size={16} />,
    },
    {
      label: "Description",
      value: VendorOverView.description || "---",
      icon: null,
    },
  ];

  const addressInfoFields = [
    {
      label: "Address",
      value: [
        VendorOverView.houseNo,
        VendorOverView.area,
        VendorOverView.landMark,
        VendorOverView.city,
        VendorOverView.state,
        VendorOverView.pinCode,
        VendorOverView.country,
      ]
        .filter(Boolean)
        .join(", "),
    },
  ];
  const businessInfoFields = [
    {
      label: "GSTIN",
      value: VendorOverView.gst || "---",
    },
    {
      label: "PAN No",
      value: VendorOverView.pan || "---",
    },
    {
      label: "Vendor Code",
      value: VendorOverView.vendorCode || "---",
    },
    {
      label: "Credit Limit",
      value: VendorOverView.allowCredit
        ? `₹${VendorOverView.creditLimit}`
        : "--",
    },
    {
      label: "Credit Period",
      value: VendorOverView.allowCredit
        ? `${VendorOverView.creditPeriod} Days`
        : "---",
    },
  ];
  return (
    <div className="bg-white rounded-xl px-4 h-full my-3">
      <div className="grid grid-cols-[300px_1fr] gap-4 h-full">
        <div className="pr-1 overflow-y-auto show-scrolls h-[500px] mb-[50px] ">
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
                Paid vs Unpaid amounts for month
              </p>
            </div>

            <div className="relative">
              <button
                onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
                className="flex items-center gap-2 px-3 py-2 border border-[#E5E7EB] rounded-lg text-[12px] text-[#374151]"
              >
                <Calendar size="16" />
                {selectedPeriod?.name}
                <ArrowDown2 size="16" />
              </button>

              {showPeriodDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E5E7EB] rounded-lg shadow-lg z-20">
                  {VendorOverView?.filterOptions?.periods?.map((period) => (
                    <button
                      key={period.type}
                      onClick={() => {
                        setSelectedPeriod(period);
                        setShowPeriodDropdown(false);
                        handleSelected(period);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        selectedPeriod.type === period.type
                          ? "bg-blue-50 text-blue-600 font-medium"
                          : ""
                      }`}
                    >
                      {period.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
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
                  dataKey="paid"
                  fill="#43CB73"
                  radius={[4, 4, 0, 0]}
                  barSize={18}
                />

                <Bar
                  dataKey="unPaid"
                  fill="#E7D468"
                  radius={[4, 4, 0, 0]}
                  barSize={18}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-center gap-8 mt-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#43CB73]" />
              <span className="text-[12px] text-[#43CB73]">Paid</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E7D468]" />
              <span className="text-[12px] text-[#E7D468]">Unpaid</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VendorDetailsOverview;
