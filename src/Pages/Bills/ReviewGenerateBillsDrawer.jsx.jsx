import React, { useEffect, useMemo, useState } from "react";
import {
  CloseCircle,
  SearchNormal1,
  // Grid2,
  // Menu,
  Refresh2,
  // TickCircle,
  // Warning2,
  DocumentText,
  ArrowDown2,
  ArrowUp2,
  Edit2,
  Trash,
  // Eye,
  // Firstline,
  Add,
} from "iconsax-react";
import { TiTick } from "react-icons/ti";
import SingleInvoiceGenerate from "./SingleInvoiceGenerate";

const invoiceData = [
  {
    id: 1,
    name: "Arun Kumar",
    initials: "AK",
    room: "G2 / B-204",
    amount: 8000,
    status: "READY",
    isEdited: false,
    billingPeriod: "01 Sep – 30 Sep 2026",
    invoiceType: "Rent",
    genDate: "01 Sep 2026",
    monthlyRent: 8000,
    applicableDays: 30,
    proratedRent: 8000,
    discount: 0,
    tax: 0,
    reviewMessage: "",
    invoiceItems: [
      {
        description: "Rent",
        amount: 5000,
      },
      {
        description: "ADDITIONAL_ADVANCE",
        amount: 2000,
      },
      {
        description: "EB",
        amount: 500,
      },
    ],
  },
  {
    id: 2,
    name: "Rahul Sharma",
    initials: "RS",
    room: "G1 / B-102",
    amount: 6667,
    status: "READY",
    isEdited: true,
    billingPeriod: "01 Sep – 30 Sep 2026",
    invoiceType: "Rent",
    genDate: "01 Sep 2026",
    monthlyRent: 8000,
    applicableDays: 25,
    proratedRent: 6667,
    discount: 0,
    tax: 0,
    reviewMessage:
      "Tenant joined during the billing period. Please verify the prorated amount before generating.",
  },
  {
    id: 3,
    name: "Karthik Raj",
    initials: "KR",
    room: "G3 / B-301",
    amount: 8000,
    status: "READY",
    isEdited: false,
    billingPeriod: "01 Sep – 30 Sep 2026",
    invoiceType: "Rent",
    genDate: "01 Sep 2026",
    monthlyRent: 8000,
    applicableDays: 30,
    proratedRent: 8000,
    discount: 0,
    tax: 0,
  },
  {
    id: 4,
    name: "Dinesh Kumar",
    initials: "DK",
    room: "G2 / B-205",
    amount: 0,
    status: "READY",
    isEdited: false,
    billingPeriod: "01 Sep – 30 Sep 2026",
    invoiceType: "Rent",
    genDate: "01 Sep 2026",
    monthlyRent: 8000,
    applicableDays: 30,
    proratedRent: 8000,
    discount: 0,
    tax: 0,
  },
  {
    id: 5,
    name: "Suresh Babu",
    initials: "SB",
    room: "G1 / B-103",
    amount: 7500,
    status: "READY",
    isEdited: false,
    billingPeriod: "01 Sep – 30 Sep 2026",
    invoiceType: "Rent",
    genDate: "01 Sep 2026",
    monthlyRent: 7500,
    applicableDays: 30,
    proratedRent: 7500,
    discount: 0,
    tax: 0,
  },
];

// const tabs = [
//   {
//     key: "ALL",
//     label: "All",
//   },
//   {
//     key: "READY",
//     label: "Ready",
//   },
//   {
//     key: "NEEDS_REVIEW",
//     label: "Needs Review",
//   },
//   {
//     key: "GENERATED",
//     label: "Generated",
//   },
//   {
//     key: "EDITED",
//     label: "Edited",
//   },
// ];

const formatAmount = (amount) => {
  if (!amount) return "–";

  return `₹${Number(amount).toLocaleString("en-IN")}`;
};

const getStatusConfig = (status) => {
  switch (status) {
    case "READY":
      return {
        label: "Ready",
        className: "bg-[#ECFDF3] text-[#12B76A] border-[#A6F4C5] border-1",
        dotClass: "bg-[#12B76A]",
      };

    case "NEEDS_REVIEW":
      return {
        label: "Needs Review",
        className: "bg-[#FFF8E8] text-[#F79009] border-[#FEDF89]",
        dotClass: "bg-[#F79009]",
      };

    case "GENERATED":
      return {
        label: "Generated",
        className: "bg-[#EFF8FF] text-[#2E90FA] border-[#B2DDFF]",
        dotClass: "bg-[#2E90FA]",
      };

    case "EXCLUDED":
      return {
        label: "Excluded",
        className: "bg-[#F2F4F7] text-[#667085] border-[#EAECF0]",
        dotClass: "bg-[#98A2B3]",
      };

    default:
      return {
        label: status,
        className: "bg-[#F2F4F7] text-[#667085] border-[#EAECF0]",
        dotClass: "bg-[#98A2B3]",
      };
  }
};

const StatusBadge = ({ status }) => {
  const config = getStatusConfig(status);

  return (
    <span
      className={`inline-flex items-center gap-1.5 border-1 rounded-full px-2 py-1 text-[10px] font-semibold whitespace-nowrap ${config.className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`} />

      {config.label}
    </span>
  );
};

const ReviewGenerateBillsDrawer = ({ open, onClose }) => {
  // const [activeTab, setActiveTab] = useState("ALL");
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  // const [viewMode, setViewMode] = useState("LIST");
  const [items, setItems] = useState(invoiceData);
  const [editingField, setEditingField] = useState(null);
  const [editingValue, setEditingValue] = useState("");
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);

  const handleGenerateSelected = () => {
    if (selectedIds.length === 0) {
      return;
    }

    setShowGenerateModal(true);
  };

  const handleAddInvoiceItem = (item) => {
    setItems((prev) =>
      prev.map((invoice) => {
        if (invoice.id !== item.id) {
          return invoice;
        }

        const currentInvoiceItems = Array.isArray(invoice.invoiceItems)
          ? invoice.invoiceItems
          : [];

        const newItem = {
          description: "",
          amount: "",
          isNew: true,
        };

        return {
          ...invoice,
          invoiceItems: [...currentInvoiceItems, newItem],
        };
      }),
    );
  };

  const handleDeleteInvoiceItem = (item, index) => {
    setItems((prev) =>
      prev.map((invoice) => {
        if (invoice.id !== item.id) {
          return invoice;
        }

        const currentInvoiceItems = Array.isArray(invoice.invoiceItems)
          ? invoice.invoiceItems
          : [];

        const updatedInvoiceItems = currentInvoiceItems.filter(
          (_, itemIndex) => itemIndex !== index,
        );

        const updatedAmount = updatedInvoiceItems.reduce(
          (total, invoiceItem) => total + Number(invoiceItem.amount || 0),
          0,
        );

        return {
          ...invoice,
          invoiceItems: updatedInvoiceItems,
          amount: updatedAmount,
        };
      }),
    );

    setEditingField(null);
    setEditingValue("");
  };

  const handleSaveInvoiceItem = (item, index) => {
    setItems((prev) =>
      prev.map((invoice) => {
        if (invoice.id !== item.id) {
          return invoice;
        }

        const currentInvoiceItems = Array.isArray(invoice.invoiceItems)
          ? invoice.invoiceItems
          : [];

        const updatedInvoiceItems = currentInvoiceItems.map(
          (invoiceItem, itemIndex) => {
            if (itemIndex !== index) {
              return invoiceItem;
            }

            const rowKey = `${invoice.id}-${index}`;

            const isAmountEditing =
              editingField?.id === rowKey && editingField?.field === "amount";

            return {
              ...invoiceItem,
              description: invoiceItem.description?.trim() || "OTHER",
              amount: isAmountEditing
                ? Number(editingValue) || 0
                : Number(invoiceItem.amount) || 0,
              isNew: false,
            };
          },
        );

        const updatedAmount = updatedInvoiceItems.reduce(
          (total, invoiceItem) => total + Number(invoiceItem.amount || 0),
          0,
        );

        return {
          ...invoice,
          invoiceItems: updatedInvoiceItems,
          amount: updatedAmount,
          isEdited: true,
        };
      }),
    );

    setEditingField(null);
    setEditingValue("");
  };

  const handleCancelField = () => {
    setEditingField(null);
    setEditingValue("");
  };

  const counts = useMemo(() => {
    return {
      all: invoiceData.length,
      ready: invoiceData.filter((item) => item.status === "READY").length,
      needsReview: invoiceData.filter((item) => item.status === "NEEDS_REVIEW")
        .length,
      generated: invoiceData.filter((item) => item.status === "GENERATED")
        .length,
      edited: invoiceData.filter((item) => item.isEdited).length,
      excluded: invoiceData.filter((item) => item.status === "EXCLUDED").length,
    };
  }, []);

  // const filteredData = useMemo(() => {
  //   let data = [...items];

  //   if (search.trim()) {
  //     const searchValue = search.toLowerCase();

  //     data = data.filter(
  //       (item) =>
  //         item.name.toLowerCase().includes(searchValue) ||
  //         item.room.toLowerCase().includes(searchValue) ||
  //         String(item.id).includes(searchValue),
  //     );
  //   }

  //   return data;
  // }, [items, activeTab, search]);

  const readyInvoices = items.filter((item) => item.status === "READY");

  //   console.log("filteredData", filteredData);

  // const handleTabChange = (tab) => {
  //   setActiveTab(tab);
  //   setExpandedId(null);
  //   setSelectedIds([]);
  // };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(
        items
          .filter((item) => item.status !== "EXCLUDED")
          .map((item) => item.id),
      );
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleGenerateAll = () => {
    // console.log("Generate ", readyInvoices);
  };

  // const handleKeepReady = (item) => {
  //   console.log(" ready", item);
  // };

  // const handleExclude = (item) => {
  //   console.log("Exclude invoice", item);
  // };

  // const handleEditAmount = (item) => {
  //   console.log("Edit amount", item);
  // };

  const allSelected =
    items.filter((item) => item.status !== "EXCLUDED").length > 0 &&
    items
      .filter((item) => item.status !== "EXCLUDED")
      .every((item) => selectedIds.includes(item.id));

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-50" />

      <div className="fixed  font-gilroy top-0 right-0 bottom-0 w-full max-w-[700px] bg-white z-[1000] shadow-2xl flex flex-col font-gilroy">
        <div className="px-3 pt-4 pb-1">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-[18px] font-bold text-[#081021]">
                Review & Generate Bills
              </h2>

              <p className="text-[12px] text-[#6B7280] my-1">
                Review calculated invoices before generating them for tenants.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-[#F2F4F7]"
            >
              <CloseCircle size="20" color="#667085" />
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-[12px] text-[#4B4B4B]">
            <span className="">
              Period:{" "}
              <strong className="text-[#344054]">01 Sep – 30 Sep 2026</strong>
            </span>

            <span>
              Gen. Date: <strong className="text-[#344054]">01 Sep 2026</strong>
            </span>

            {/* <span className="ml-auto flex items-center gap-1 border-1 border-[#FEE685] bg-[#FFFBEB] text-[#BB4D00] rounded-full px-2 py-1">
              <Warning2 size="11" />
              Review Required
            </span> */}
          </div>
        </div>

        {/* <div className="px-3 py-2">
          <div className="flex gap-2">
            <div className="flex-1 min-w-[105px] border-1 border-[#BFDBFE] rounded-lg px-2 py-1 text-center bg-blue-100">
              <div className="text-[18px] font-bold text-[#1E45E1]">
                {counts.all}
              </div>

              <div className="text-[10px] text-[#6B7280] mt-1">
                Total Invoices
              </div>
            </div>

            <div className="flex-1 min-w-[105px] border-1 border-[#BBF7D0] rounded-lg px-2 py-1 text-center bg-green-100">
              <div className="text-[18px] font-bold text-[#12B76A]">
                {counts.ready}
              </div>

              <div className="text-[10px] text-[#6B7280] mt-1">Ready</div>
            </div>

            <div className="flex-1 min-w-[105px] border-1 border-[#FED7AA] rounded-lg px-2 py-1 text-center bg-orange-100">
              <div className="text-[18px] font-bold text-[#F79009]">
                {counts.needsReview}
              </div>

              <div className="text-[10px] text-[#6B7280] mt-1">
                Needs Review
              </div>
            </div>

            <div className="flex-1 min-w-[105px] border-1 border-[#D1D5DB] rounded-lg px-2 py-1 text-center bg-gray-100">
              <div className="text-[18px] font-bold text-[#667085]">
                {counts.excluded}
              </div>

              <div className="text-[10px] text-[#6B7280] mt-1">Excluded</div>
            </div>
          </div>
        </div> */}

        <div className="px-3 pb-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <SearchNormal1
                size="17"
                color="#98A2B3"
                className="absolute left-3 top-1/2 -translate-y-1/2"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tenant, room or invoice..."
                className="w-full h-9 pl-9 pr-3 rounded-lg border border-[#D0D5DD] text-[11px] outline-none focus:border-[#1E45E1]"
              />
            </div>

            {/* <div className="flex  border border-[#D0D5DD] rounded-lg overflow-hidden px-2 py-1 ">
              <button
                type="button"
                onClick={() => setViewMode("LIST")}
                className={`px-2 flex items-center gap-1 text-[11px]  rounded-l shadow ${
                  viewMode === "LIST"
                    ? "bg-[#F2F4F7] text-[#1E45E1]"
                    : "text-[#667085]"
                }`}
              >
                <Firstline size="14" /> List
              </button>

              <button
                // disabled
                type="button"
                onClick={() => setViewMode("ROOM")}
                className={`px-2 flex items-center gap-1 text-[11px]   rounded-r shadow ${
                  viewMode === "ROOM"
                    ? "bg-[#F2F4F7] text-[#1E45E1]"
                    : "text-[#667085]"
                }`}
              >
                <Menu size="14" />
                Room
              </button>
            </div> */}

            <button
              type="button"
              onClick={handleGenerateAll}
              disabled={readyInvoices.length === 0}
              className="h-9 px-3 rounded-lg bg-[#1E45E1] text-white text-[11px] font-semibold flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Refresh2 size="14" />
              Generate All
            </button>
          </div>
        </div>

        {/* <div className="px-3 border-b border-[#EAECF0]">
          <div className="flex items-center gap-5 overflow-x-auto">
            {tabs.map((tab) => {
              const count =
                tab.key === "ALL"
                  ? counts.all
                  : tab.key === "READY"
                    ? counts.ready
                    : tab.key === "NEEDS_REVIEW"
                      ? counts.needsReview
                      : tab.key === "GENERATED"
                        ? counts.generated
                        : counts.edited;

              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => handleTabChange(tab.key)}
                  className={`relative flex items-center gap-1.5 px-2 py-2 text-[12px] whitespace-nowrap ${
                    activeTab === tab.key
                      ? "text-[#1E45E1] font-semibold"
                      : "text-[#667085]"
                  }`}
                >
                  {tab.label}

                  <span
                    className={`min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center text-[9px] ${
                      activeTab === tab.key
                        ? "bg-[#1E45E1] text-white"
                        : "bg-[#F2F4F7] text-[#667085]"
                    }`}
                  >
                    {count}
                  </span>

                  {activeTab === tab.key && (
                    <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-[#1E45E1] rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div> */}

        {selectedIds.length > 0 ? (
          <div className="px-3 py-1.5 border-b border-[#EAECF0] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setSelectedIds([])}
                className="w-5 h-5 flex items-center justify-center text-[#667085] hover:text-[#344054]"
              >
                <CloseCircle size="16" />
              </button>

              <span className="text-[12px] font-semibold text-[#344054]">
                {selectedIds.length} invoices selected
              </span>
            </div>

            <button
              type="button"
              onClick={handleGenerateSelected}
              disabled={selectedIds.length === 0}
              className="
        h-7 px-3
        rounded-lg
        bg-[#1E45E1]
        text-white
        text-[10px]
        font-semibold
        flex items-center justify-center
        disabled:opacity-50
        disabled:cursor-not-allowed
      "
            >
              Generate Selected ({selectedIds.length})
            </button>
          </div>
        ) : (
          <div className="px-3 py-2 border-b border-[#EAECF0] flex items-center justify-between">
            <label className="flex items-center gap-2 text-[12px] text-[#4B4B4B] cursor-pointer">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="w-4 h-4 accent-[#1E45E1]"
              />
              Select All Eligible
            </label>

            <span className="text-[12px] text-[#6B7280]">
              {counts.ready} of {counts.all} ready
            </span>
          </div>
        )}

        <div className="flex-1 overflow-y-auto bg-[#F8FAFF] show-scrolls ">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <DocumentText size="38" color="#98A2B3" />

              <p className="text-[13px] font-semibold text-[#475467] mt-3">
                No invoices found
              </p>

              <p className="text-[11px] text-[#98A2B3] mt-1">
                Try another tab or search term.
              </p>
            </div>
          ) : (
            items.map((item, index) => {
              const isExpanded = expandedId === item.id;
              const isExcluded = item.status === "EXCLUDED";

              return (
                <div
                  key={item.id}
                  className="bg-white border-b border-[#EAECF0]"
                >
                  <div
                    className={`px-3 py-2 flex items-center gap-3 ${
                      isExpanded ? "bg-[#F8FAFF]" : "hover:bg-[#FAFBFC]"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(item.id)}
                      disabled={isExcluded}
                      onChange={() => handleSelect(item.id)}
                      className="w-4 h-4 accent-[#1E45E1] shrink-0"
                    />

                    <div className="w-8 h-8 rounded-full bg-[#172B9E] text-white flex items-center justify-center text-[10px] font-semibold shrink-0">
                      {item.initials}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-[14px] font-semibold text-[#081021] truncate mb-1">
                          {item.name}
                        </p>

                        {item.isEdited && (
                          <span className="border border-[#FDB022] bg-[#FFFAEB] text-[#F79009] rounded px-1.5 py-0.5 text-[8px] font-semibold">
                            EDITED
                          </span>
                        )}
                      </div>

                      <p className="text-[12px] text-[#6B7280] mt-0.5">
                        {item.room} · Rent · Sep 2026
                      </p>
                    </div>

                    <div className="text-[12px] font-bold text-[#081021] min-w-[58px] text-right">
                      {formatAmount(item.amount)}
                    </div>

                    <StatusBadge status={item.status} />

                    {/* {item.status === "GENERATED" ? (
                      <button
                        type="button"
                        onClick={() => handleExpand(item.id)}
                        className="h-7 px-2.5 rounded-lg border-1 border-[#B2DDFF] text-[#1E45E1] text-[10px] flex items-center gap-1"
                      >
                        View Invoice
                        {isExpanded ? (
                          <ArrowUp2 size="12" />
                        ) : (
                          <ArrowDown2 size="12" />
                        )}
                      </button>
                    ) : isExcluded ? (
                      <button
                        type="button"
                        onClick={() => handleExpand(item.id)}
                        className="h-7 px-2.5 rounded-lg border-1 border-[#D0D5DD] text-[#667085] text-[10px] flex items-center gap-1"
                      >
                        View Reason
                        <ArrowDown2 size="12" />
                      </button>
                    ) : item.status === "NEEDS_REVIEW" ? (
                      <button
                        type="button"
                        onClick={() => handleExpand(item.id)}
                        className={`h-7 px-2.5 rounded-lg border-1 text-[10px] flex items-center gap-1 ${
                          isExpanded
                            ? "border-[#1E45E1] text-[#1E45E1] bg-[#EFF6FF]"
                            : "border-[#1E45E1] text-[#1E45E1] bg-[#EFF6FF]"
                        }`}
                      >
                        Review
                        {isExpanded ? (
                          <ArrowUp2 size="12" />
                        ) : (
                          <ArrowDown2 size="12" />
                        )}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleExpand(item.id)}
                        className="h-7 px-2.5 rounded-lg border-1 border-[#A6F4C5] text-[#12B76A] text-[10px] flex items-center gap-1"
                      >
                        View
                        {isExpanded ? (
                          <ArrowUp2 size="12" />
                        ) : (
                          <ArrowDown2 size="12" />
                        )}
                      </button>
                    )} */}

                    <button
                      type="button"
                      onClick={() => handleExpand(item.id)}
                      className="h-7 px-2.5 rounded-lg border-1 border-[#A6F4C5] text-[#12B76A] text-[10px] flex items-center gap-1"
                    >
                      View
                      {isExpanded ? (
                        <ArrowUp2 size="12" />
                      ) : (
                        <ArrowDown2 size="12" />
                      )}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="px-3 pb-2 bg-[#F5F8FF]">
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div className="bg-white border border-[#EAECF0] rounded-lg px-3 py-2">
                          <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase mb-0">
                            BILLING PERIOD
                          </p>

                          <p className="text-[12px] font-semibold text-[#081021] mb-0">
                            {item.billingPeriod}
                          </p>
                        </div>

                        <div className="bg-white border border-[#EAECF0] rounded-lg px-3 py-2.5">
                          <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase  mb-0">
                            INVOICE TYPE
                          </p>

                          <p className="text-[12px] font-semibold text-[#081021] mb-0">
                            {item.invoiceType}
                          </p>
                        </div>

                        <div className="bg-white border border-[#EAECF0] rounded-lg px-3 py-2.5">
                          <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase  mb-0">
                            ROOM / BED
                          </p>

                          <p className="text-[12px] font-semibold text-[#081021] mb-0">
                            {item.room}
                          </p>
                        </div>

                        <div className="bg-white border border-[#EAECF0] rounded-lg px-3 py-2.5">
                          <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase  mb-0">
                            GEN. DATE
                          </p>

                          <p className="text-[12px] font-semibold text-[#081021] mb-0">
                            {item.genDate}
                          </p>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg border border-[#EAECF0] overflow-hidden">
                        <div className="px-3 py-2.5 bg-[#F7F8FC] border-b border-[#EAECF0] flex items-center justify-between">
                          <span className="text-[12px] font-semibold text-[#98A2B3]">
                            CALCULATION BREAKDOWN
                          </span>

                          {item.isEdited && (
                            <span className="flex items-center gap-1 border-1 border-[#FDB022] bg-[#FFFAEB] text-[#F79009] rounded-full px-2 py-1 text-[9px]">
                              <Edit2 size="10" />
                              Manually Edited
                            </span>
                          )}
                        </div>

                        <div className="px-2 py-3 space-y-2.5">
                          {Array.isArray(item.invoiceItems) &&
                            item.invoiceItems.map((invoiceItem, index) => {
                              const rowKey = `${item.id}-${index}`;

                              const isEditing =
                                editingField?.id === rowKey &&
                                editingField?.field === "amount";

                              return (
                                <div
                                  key={rowKey}
                                  className={`flex items-center justify-between group relative min-h-[30px] ${invoiceItem?.isNew ? "hover:bg-white" : "hover:bg-blue-100"} hover:rounded-lg px-2`}
                                >
                                  {!invoiceItem?.isNew && (
                                    <span className="text-[14px] text-[#6B7280]">
                                      {invoiceItem?.description}
                                    </span>
                                  )}

                                  {invoiceItem?.isNew ? (
                                    <div className="flex items-center gap-2 w-full">
                                      <input
                                        type="text"
                                        value={invoiceItem.description || ""}
                                        onChange={(e) => {
                                          const value = e.target.value;

                                          setItems((prev) =>
                                            prev.map((invoice) => {
                                              if (invoice.id !== item.id) {
                                                return invoice;
                                              }

                                              return {
                                                ...invoice,
                                                invoiceItems:
                                                  invoice.invoiceItems.map(
                                                    (invoiceRow, rowIndex) =>
                                                      rowIndex === index
                                                        ? {
                                                            ...invoiceRow,
                                                            description: value,
                                                          }
                                                        : invoiceRow,
                                                  ),
                                              };
                                            }),
                                          );
                                        }}
                                        placeholder="Enter description"
                                        autoFocus
                                        className="flex-1 px-2 py-1.5 border border-[#D0D5DD] 
                                        rounded-md text-[12px] text-[#344054] outline-none focus:border-[#1E45E1]"
                                      />

                                      <div
                                        className="flex items-center  border border-[#1E45E1] bg-white 
                                      rounded-md overflow-hidden"
                                      >
                                        <span className="pl-2 text-[11px] text-[#98A2B3]">
                                          ₹
                                        </span>

                                        <input
                                          type="number"
                                          min="0"
                                          value={invoiceItem.amount ?? ""}
                                          onChange={(e) => {
                                            const value = e.target.value;

                                            setItems((prev) =>
                                              prev.map((invoice) => {
                                                if (invoice.id !== item.id) {
                                                  return invoice;
                                                }

                                                return {
                                                  ...invoice,
                                                  invoiceItems:
                                                    invoice.invoiceItems.map(
                                                      (invoiceRow, rowIndex) =>
                                                        rowIndex === index
                                                          ? {
                                                              ...invoiceRow,
                                                              amount: value,
                                                            }
                                                          : invoiceRow,
                                                    ),
                                                };
                                              }),
                                            );
                                          }}
                                          placeholder="0"
                                          className="w-[70px]  px-1 py-1.5 text-[11px] text-right text-[#344054] outline-none"
                                        />
                                      </div>

                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleSaveInvoiceItem(item, index)
                                        }
                                        className="w-[24px] h-[24px] rounded-full bg-[#1E45E1] text-white flex items-center justify-center"
                                      >
                                        <TiTick className="text-[12px]" />
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleDeleteInvoiceItem(item, index)
                                        }
                                        className="w-[24px] h-[24px] rounded-full bg-[#F2F4F7] text-[#667085] flex items-center justify-center"
                                      >
                                        <Add className="rotate-45" size="16" />
                                      </button>
                                    </div>
                                  ) : isEditing ? (
                                    <div className="flex items-center gap-1">
                                      <div className="flex items-center h-[26px] border border-[#1E45E1] bg-white rounded-md overflow-hidden">
                                        <span className="pl-2 text-[11px] text-[#98A2B3]">
                                          ₹
                                        </span>

                                        <input
                                          type="number"
                                          min="0"
                                          value={editingValue}
                                          onChange={(e) =>
                                            setEditingValue(e.target.value)
                                          }
                                          onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                              handleSaveInvoiceItem(
                                                item,
                                                index,
                                              );
                                            }

                                            if (e.key === "Escape") {
                                              handleCancelField();
                                            }
                                          }}
                                          autoFocus
                                          className="w-[58px] h-[24px] px-1 text-[11px] text-right text-[#344054]
                                           outline-none"
                                        />
                                      </div>

                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleSaveInvoiceItem(item, index)
                                        }
                                        className="w-[24px] h-[24px] rounded-full bg-[#1E45E1] text-white flex items-center justify-center"
                                      >
                                        <TiTick className="text-[12px]" />
                                      </button>

                                      <button
                                        type="button"
                                        onClick={handleCancelField}
                                        className="w-[24px] h-[24px] rounded-full bg-[#F2F4F7] text-[#667085] flex items-center justify-center"
                                      >
                                        <Add className="rotate-45" size="16" />
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-3">
                                      <div className="absolute right-16 inset-y-0 hidden group-hover:flex items-center gap-2">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setEditingField({
                                              id: rowKey,
                                              field: "amount",
                                            });
                                            setEditingValue(
                                              String(invoiceItem.amount ?? ""),
                                            );
                                          }}
                                          className="inline-flex items-center justify-center gap-1 h-6 text-[12px] font-medium text-[#1E45E1] leading-none"
                                        >
                                          <Edit2 size={11} />
                                          <span className="leading-none mt-1">
                                            Edit
                                          </span>
                                        </button>

                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleDeleteInvoiceItem(item, index)
                                          }
                                          className="inline-flex items-center justify-center gap-1 h-6 text-[12px] font-medium text-[#EF4444] leading-none"
                                        >
                                          <Trash size={11} />
                                          <span className="leading-none mt-1">
                                            Delete
                                          </span>
                                        </button>
                                      </div>

                                      <span className="text-[14px] font-medium text-[#222222]">
                                        {formatAmount(invoiceItem.amount)}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          <div className=" flex items-center justify-end">
                            <button
                              type="button"
                              onClick={() => handleAddInvoiceItem(item)}
                              className="flex items-center justify-end px-2 gap-1.5 h-[32px] border-1   
                            border-[#1E45E1] rounded-lg text-[12px] font-medium text-white bg-[#1E45E1]"
                            >
                              <Add size="14" color="#FFFFFF" />
                              Add New Row
                            </button>
                          </div>

                          <div className="border-t border-[#EAECF0] pt-2.5 flex items-center justify-between">
                            <span className="text-[14px] text-[#081021] font-semibold">
                              Invoice Total
                            </span>

                            <span className="text-[16px] font-bold text-[#1E45E1]">
                              {formatAmount(item.amount)}
                            </span>
                          </div>
                        </div>

                        <div className="px-3 pb-3 text-center">
                          <span className="text-[10px] text-[#98A2B3]">
                            Calculated automatically · Hover any row to edit or
                            remove
                          </span>
                        </div>
                      </div>

                      {/* {item.status === "NEEDS_REVIEW" && (
                        <>
                          <div className="mt-3 border-1  border-[#FEDF89] bg-[#FFFBEB] rounded-lg px-3 py-2.5 flex gap-2">
                            <Warning2
                              size="16"
                              color="#F79009"
                              className="shrink-0 mt-0.5"
                            />

                            <div>
                              <p className="text-[12px] font-semibold text-[#973C00] mb-1">
                                Needs Review
                              </p>

                              <p className="text-[10px] text-[#B54708] mt-1 leading-4 mb-0">
                                {item.reviewMessage}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-3">
                            <button
                              type="button"
                              onClick={() => handleKeepReady(item)}
                              className="flex-1 h-8 rounded-lg bg-[#1E45E1] text-white text-[13px] 
                              font-semibold flex items-center justify-center gap-1"
                            >
                              Keep Amount & Mark Ready
                            </button>

                            <button
                              type="button"
                              onClick={() => handleExclude(item)}
                              className="w-[95px] h-8 rounded-lg border-1 border-[#FFCECE] text-[#D92D20] bg-[#FFF6F6] text-[13px] font-semibold flex items-center justify-center gap-1"
                            >
                              Exclude
                            </button>

                            <button
                              type="button"
                              onClick={() => handleEditAmount(item)}
                              className="w-[105px] h-8 rounded-lg border-1 border-[#D0D5DD] text-[#667085] bg-[#E5E7EB] 
                              text-[13px] font-semibold flex items-center justify-center gap-1"
                            >
                              Edit Amount
                            </button>
                          </div>
                        </>
                      )} */}

                      <div className="flex w-full mt-3">
                        <button
                          onClick={() => setIsGeneratingInvoice(true)}
                          type="button"
                          className="h-8 w-full px-4 rounded-lg bg-[#1E45E1] border-1 border-[#1E45E1] 
                            text-white text-[12px] font-semibold flex justify-center 
                            items-center gap-1.5"
                        >
                          Generate Invoice
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <div className="px-3 py-3 bg-white border-t border-[#EAECF0] flex items-center justify-between gap-3">
          <div>
            <p className="text-[15px] font-semibold text-[#081021] mb-0">
              {counts.ready} invoices ready to generate
            </p>

            <p className="text-[12px] text-[#E17100] mt-0.5 mb-0">
              {counts.needsReview} invoices need your attention.
            </p>
          </div>

          <button
            type="button"
            onClick={handleGenerateAll}
            disabled={readyInvoices.length === 0}
            className="h-9 px-4 rounded-lg bg-[#1E45E1] text-white text-[14px] font-semibold flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Refresh2 size="14" />
            Generate All Eligible
          </button>
        </div>
      </div>

      {showGenerateModal && (
        <SingleInvoiceGenerate
          selectedIds={selectedIds}
          onClose={() => setShowGenerateModal(false)}
        />
      )}
      {isGeneratingInvoice && (
        <div className="fixed  font-gilroy top-0 right-0 bottom-0 w-full max-w-[700px] bg-white z-[1000] shadow-2xl flex flex-col font-gilroy">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center mb-4">
              <div className="w-6 h-6 border-4 border-[#D0D5DD] border-t-[#1E45E1] rounded-full animate-spin" />
            </div>

            <span className="text-[18px] font-semibold text-[#081021]">
              Generating invoices...
            </span>

            <span className="text-[14px] text-[#98A2B3] mt-1">
              Processing counts for Sep 2026
            </span>

            <div className="w-[334px] max-w-[80vw] h-[5px] bg-[#EAECF0] rounded-full mt-4 overflow-hidden">
              <div className="h-full w-[70%] bg-[#1E45E1] rounded-full" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewGenerateBillsDrawer;
