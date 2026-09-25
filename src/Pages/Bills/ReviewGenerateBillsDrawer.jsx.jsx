import React, { useEffect, useMemo, useState } from "react";
import {
  CloseCircle,
  SearchNormal1,
  Refresh2,
  DocumentText,
  ArrowDown2,
  ArrowUp2,
  Edit2,
  Trash,
  Add,
} from "iconsax-react";
import { TiTick } from "react-icons/ti";
import SingleInvoiceGenerate from "./SingleInvoiceGenerate";
import GenerateAllInvoices from "./GenerateAllInvoices";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useHasPermission } from "../../Utils/Permission";
import PermissionDeniedMessage from "../../Utils/PermissionDeniedMessage";

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
StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};

const ReviewGenerateBillsDrawer = ({ open, onClose }) => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [items, setItems] = useState([]);
  const [editingField, setEditingField] = useState(null);
  const [editingValue, setEditingValue] = useState({
    itemName: "",
    amount: "",
  });
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [isGeneratingInvoice, setIsGeneratingInvoice] = useState(false);

  const [savingItem, setSavingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);

  const [generateType, setGenerateType] = useState(null);

  // const arrayData =
  //   state.InvoiceList?.getReviewGenerateRecurringbill?.invoicesList || [];

  const {
    canUpdateModule: canUpdateInvoice,
    canDeleteModule: canDeleteInvoice,
    canReadModule: canReadInvoice,
  } = useHasPermission("Invoice");

  const allSelected =
    items.length > 0 &&
    items.every((item) => selectedIds.includes(item.invoiceId));

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedIds(items.map((item) => item.invoiceId));
    } else {
      setSelectedIds([]);
    }
  };
  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
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
    const currentInvoice = items.find(
      (invoice) => invoice.invoiceId === item.invoiceId,
    );

    if (!currentInvoice) return;

    const currentInvoiceItems = Array.isArray(currentInvoice.invoiceItems)
      ? currentInvoice.invoiceItems
      : [];

    const invoiceItem = currentInvoiceItems[index];

    if (!invoiceItem) return;
    const rowKey = `${item.invoiceId}-${index}`;

    if (invoiceItem.isNew || !invoiceItem.itemId) {
      const updatedInvoiceItems = currentInvoiceItems.filter(
        (_, itemIndex) => itemIndex !== index,
      );

      const updatedAmount = updatedInvoiceItems.reduce(
        (total, invoiceRow) => total + Number(invoiceRow?.amount || 0),
        0,
      );

      setItems((prev) =>
        prev.map((invoice) =>
          invoice.invoiceId === item.invoiceId
            ? {
                ...invoice,
                invoiceItems: updatedInvoiceItems,
                invoiceAmount: updatedAmount,
                isEdited: true,
              }
            : invoice,
        ),
      );

      setEditingField(null);
      setEditingValue("");

      return;
    }
    setDeletingItem(rowKey);
    dispatch({
      type: "DELETE_REVIEW_BILLS_SAGA",
      payload: {
        hostelId: state.login?.selectedHostel_Id,
        invoiceId: item.invoiceId,
        itemId: invoiceItem.itemId,
      },
    });
  };

  const handleSaveInvoiceItem = (item, index) => {
    const currentInvoice = items.find(
      (invoice) => invoice.invoiceId === item.invoiceId,
    );

    if (!currentInvoice) return;

    const currentInvoiceItems = Array.isArray(currentInvoice.invoiceItems)
      ? currentInvoice.invoiceItems
      : [];

    const invoiceItem = currentInvoiceItems[index];

    if (!invoiceItem) return;
    const rowKey = `${item.invoiceId}-${index}`;

    const updatedItem = {
      ...invoiceItem,
      itemName: editingValue.itemName?.trim() || "OTHER",
      amount: Number(editingValue.amount) || 0,
      isNew: false,
    };

    const updatedInvoiceItems = currentInvoiceItems.map(
      (invoiceRow, rowIndex) => (rowIndex === index ? updatedItem : invoiceRow),
    );

    const updatedAmount = updatedInvoiceItems.reduce(
      (total, invoiceRow) => total + Number(invoiceRow?.amount || 0),
      0,
    );

    setItems((prev) =>
      prev.map((invoice) =>
        invoice.invoiceId === item.invoiceId
          ? {
              ...invoice,
              invoiceItems: updatedInvoiceItems,
              invoiceAmount: updatedAmount,
              isEdited: true,
            }
          : invoice,
      ),
    );

    setEditingField(null);
    setEditingValue({
      itemName: "",
      amount: "",
    });

    if (invoiceItem.itemId) {
      setSavingItem(rowKey);
      dispatch({
        type: "UPDATE_REVIEW_AND_GENERATE_BILL_SAGA",
        payload: {
          hostelId: state.login?.selectedHostel_Id,
          invoiceId: item.invoiceId,
          itemId: invoiceItem.itemId,
          name: updatedItem.itemName,
          draftAmount: Number(updatedItem.amount) || 0,
        },
      });
    }
  };

  const handleNewSaveInvoiceItem = (item, index) => {
    const currentInvoice = items.find(
      (invoice) => invoice.invoiceId === item.invoiceId,
    );

    if (!currentInvoice) return;

    const currentInvoiceItems = Array.isArray(currentInvoice.invoiceItems)
      ? currentInvoice.invoiceItems
      : [];

    const invoiceItem = currentInvoiceItems[index];

    if (!invoiceItem) return;
    const rowKey = `${item.invoiceId}-${index}`;

    const itemName = invoiceItem?.description?.trim() || "OTHER";
    const amount = Number(invoiceItem?.amount) || 0;

    const updatedItem = {
      ...invoiceItem,
      itemName,
      amount,
      isNew: true,
    };

    const updatedInvoiceItems = currentInvoiceItems.map(
      (invoiceRow, rowIndex) => (rowIndex === index ? updatedItem : invoiceRow),
    );

    const updatedAmount = updatedInvoiceItems.reduce(
      (total, invoiceRow) => total + Number(invoiceRow?.amount || 0),
      0,
    );

    setItems((prev) =>
      prev.map((invoice) =>
        invoice.invoiceId === item.invoiceId
          ? {
              ...invoice,
              invoiceItems: updatedInvoiceItems,
              invoiceAmount: updatedAmount,
              isEdited: true,
            }
          : invoice,
      ),
    );

    setEditingField(null);

    setEditingValue({
      itemName: "",
      amount: "",
    });
    setSavingItem(rowKey);
    dispatch({
      type: "ADD_NEW_REVIEW_BILL_SAGA",
      payload: {
        hostelId: state.login?.selectedHostel_Id,
        invoiceId: item.invoiceId,
        items: [
          {
            name: itemName,
            amount,
          },
        ],
      },
    });
  };

  const handleCancelField = () => {
    setEditingField(null);
    setEditingValue({
      itemName: "",
      amount: "",
    });
  };

  useEffect(() => {
    const invoices =
      state.InvoiceList?.getReviewGenerateRecurringbill?.invoicesList;

    if (Array.isArray(invoices)) {
      setItems(invoices);
    }
  }, [state.InvoiceList?.getReviewGenerateRecurringbill?.invoicesList]);

  const handleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleGenerateAll = () => {
    dispatch({ type: "REMOVE_REVIEW_GENERATE_BILL_ERROR" });
    if (state.login?.selectedHostel_Id) {
      setGenerateType("ALL");
      setShowGenerateModal(true);
    }
  };

  const handleGenerateSelectedOnly = () => {
    dispatch({ type: "REMOVE_REVIEW_GENERATE_BILL_ERROR" });
    if (!state.login?.selectedHostel_Id) return;
    if (!selectedIds.length) return;
    setGenerateType("SELECTED");
    setShowGenerateModal(true);
  };

  useEffect(() => {
    if (state.InvoiceList?.recurringReviewGenerateError) {
      setIsGeneratingInvoice(false);
    }
  }, [state.InvoiceList?.recurringReviewGenerateError]);

  useEffect(() => {
    if (state.InvoiceList?.reviewGenerateRecurringSuccess === 200) {
      onClose();
    }
  }, [state.InvoiceList?.reviewGenerateRecurringSuccess]);

  useEffect(() => {
    if (
      state.InvoiceList?.updateReviewGenerateRecurringSuccess === 200 ||
      state.InvoiceList?.addNewItemsInReviewSuccess === 200
    ) {
      setSavingItem(null);

      dispatch({
        type: "GET_REVIEW_GENERATE_RECURRING_SAGA",
        payload: { hostelId: state.login?.selectedHostel_Id },
      });

      dispatch({ type: "REMOVE_UPDATE_REVIEW_AND_GENERATE_BILL_REDUCER" });
      dispatch({ type: "REMOVE_ADD_NEW_REVIEW_BILL_REDUCER" });
    }
  }, [
    state.InvoiceList?.updateReviewGenerateRecurringSuccess,
    state.InvoiceList?.addNewItemsInReviewSuccess,
  ]);

  useEffect(() => {
    if (state.InvoiceList?.deleteReviewBillsSuccess === 204) {
      setDeletingItem(null);
      dispatch({
        type: "GET_REVIEW_GENERATE_RECURRING_SAGA",
        payload: { hostelId: state.login?.selectedHostel_Id },
      });

      dispatch({ type: "REMOVE_DELETE_REVIEW_BILLS_REDUCER" });
    }
  }, [state.InvoiceList?.deleteReviewBillsSuccess]);

  useEffect(() => {
    if (
      state.InvoiceList?.deleteReviewError ||
      state.InvoiceList?.updateReviewError
    ) {
      setSavingItem(null);
      setDeletingItem(null);
    }
  }, [
    state.InvoiceList?.deleteReviewError,
    state.InvoiceList?.updateReviewError,
  ]);

  const filteredItems = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    if (!searchValue) {
      return items;
    }

    return items.filter((item) => {
      const tenantName = item.customerInfo?.fullName || "";
      const roomName = item.stayInfo?.roomName || "";
      const bedName = item.stayInfo?.bedName || "";
      const invoiceId = item.invoiceId?.toString() || "";

      return (
        tenantName.toLowerCase().includes(searchValue) ||
        roomName.toLowerCase().includes(searchValue) ||
        bedName.toLowerCase().includes(searchValue) ||
        invoiceId.toLowerCase().includes(searchValue)
      );
    });
  }, [items, search]);

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
              <strong className="text-[#344054]">
                {
                  state.InvoiceList?.getReviewGenerateRecurringbill
                    ?.billingStartDate
                }{" "}
                –{" "}
                {
                  state.InvoiceList?.getReviewGenerateRecurringbill
                    ?.billingEndDate
                }
              </strong>
            </span>

            <span>
              Gen. Date:{" "}
              <strong className="text-[#344054]">
                {state.InvoiceList?.getReviewGenerateRecurringbill?.invoiceDate}
              </strong>
            </span>
          </div>
        </div>

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

            {/* <button
              type="button"
              onClick={handleGenerateAll}
              disabled={readyInvoices.length === 0}
              className="h-9 px-3 rounded-lg bg-[#1E45E1] text-white text-[11px] font-semibold flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Refresh2 size="14" />
              Generate All
            </button> */}
          </div>
        </div>
        {!canReadInvoice ? (
          <PermissionDeniedMessage />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto bg-[#F8FAFF] show-scrolls ">
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
                    onClick={handleGenerateSelectedOnly}
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
                    {items.length} invoices
                  </span>
                </div>
              )}

              {filteredItems?.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <DocumentText size="38" color="#98A2B3" />

                  <p className="text-[13px] font-semibold text-[#475467] mt-3">
                    No search data found
                  </p>
                </div>
              ) : (
                filteredItems?.map((item) => {
                  const isExpanded = expandedId === item.invoiceId;

                  return (
                    <div
                      key={item.invoiceId}
                      className="bg-white border-b border-[#EAECF0]"
                    >
                      <div
                        className={`px-3 py-2 flex items-center gap-3 ${
                          isExpanded ? "bg-[#F8FAFF]" : "hover:bg-[#FAFBFC]"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedIds.includes(item.invoiceId)}
                          // disabled={isExcluded}
                          onChange={() => handleSelect(item.invoiceId)}
                          className="w-4 h-4 accent-[#1E45E1] shrink-0"
                        />

                        <div className="w-8 h-8 rounded-full bg-[#172B9E] text-white flex items-center justify-center text-[10px] font-semibold shrink-0">
                          {item.customerInfo?.initials}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-[14px] font-semibold text-[#081021] truncate mb-1">
                              {item.customerInfo?.fullName}
                            </p>

                            {item.isEdited && (
                              <span className="border-1 border-[#FDB022] bg-[#FFFAEB] text-[#F79009] rounded px-1.5 py-0.5 text-[8px] font-semibold">
                                EDITED
                              </span>
                            )}
                          </div>

                          <p className="text-[12px] text-[#6B7280] mt-0.5 flex items-center gap-1.5">
                            {item.stayInfo?.roomName} / {item.stayInfo?.bedName}
                            <span className="h-1 w-1 rounded-full bg-gray-400 inline-block"></span>
                            Rent
                            <span className="h-1 w-1 rounded-full bg-gray-400 inline-block"></span>
                            {item.invoiceStartDate?.split("/")[1] &&
                              new Date(
                                `${item.invoiceStartDate.split("/")[2]}-${item.invoiceStartDate.split("/")[1]}-01`,
                              ).toLocaleString("en-US", {
                                month: "short",
                                year: "numeric",
                              })}
                          </p>
                        </div>

                        <div className="text-[12px] font-bold text-[#081021] min-w-[58px] text-right">
                          {formatAmount(item.invoiceAmount)}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleExpand(item.invoiceId)}
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
                                {item.invoiceStartDate} - {item.invoiceEndDate}
                              </p>
                            </div>

                            <div className="bg-white border border-[#EAECF0] rounded-lg px-3 py-2.5">
                              <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase  mb-0">
                                INVOICE TYPE
                              </p>

                              <p className="text-[12px] font-semibold text-[#081021] mb-0">
                                {item.invoiceItems?.[0]?.itemName || ""}
                              </p>
                            </div>

                            <div className="bg-white border border-[#EAECF0] rounded-lg px-3 py-2.5">
                              <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase  mb-0">
                                ROOM / BED
                              </p>

                              <p className="text-[12px] font-semibold text-[#081021] mb-0">
                                {item.stayInfo?.roomName} /{" "}
                                {item.stayInfo?.bedName}
                              </p>
                            </div>

                            <div className="bg-white border border-[#EAECF0] rounded-lg px-3 py-2.5">
                              <p className="text-[10px] font-semibold text-[#9CA3AF] uppercase  mb-0">
                                GEN. DATE
                              </p>

                              <p className="text-[12px] font-semibold text-[#081021] mb-0">
                                {
                                  state.InvoiceList
                                    ?.getReviewGenerateRecurringbill
                                    ?.invoiceDate
                                }
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
                                  const rowKey = `${item.invoiceId}-${index}`;
                                  const isEditing =
                                    editingField?.id === rowKey &&
                                    editingField?.field === "item";

                                  const isRentItem =
                                    invoiceItem?.itemName === "RENT";

                                  return (
                                    <div
                                      key={rowKey}
                                      className={`flex items-center justify-between group relative min-h-[30px] ${invoiceItem?.isNew ? "hover:bg-white" : "hover:bg-blue-100"} hover:rounded-lg px-2`}
                                    >
                                      {!invoiceItem?.isNew && !isEditing && (
                                        <span className="text-[14px] text-[#6B7280]">
                                          {invoiceItem?.itemName}
                                        </span>
                                      )}

                                      {invoiceItem?.isNew ? (
                                        <div className="flex items-center gap-2 w-full">
                                          <input
                                            type="text"
                                            value={
                                              invoiceItem.description || ""
                                            }
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
                                                        (
                                                          invoiceRow,
                                                          rowIndex,
                                                        ) =>
                                                          rowIndex === index
                                                            ? {
                                                                ...invoiceRow,
                                                                description:
                                                                  value,
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
                                                    if (
                                                      invoice.id !== item.id
                                                    ) {
                                                      return invoice;
                                                    }

                                                    return {
                                                      ...invoice,
                                                      invoiceItems:
                                                        invoice.invoiceItems.map(
                                                          (
                                                            invoiceRow,
                                                            rowIndex,
                                                          ) =>
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
                                            disabled={!canUpdateInvoice}
                                            type="button"
                                            onClick={() =>
                                              handleNewSaveInvoiceItem(
                                                item,
                                                index,
                                              )
                                            }
                                            className="disabled:opacity-100 w-[24px] h-[24px] rounded-full bg-[#1E45E1] text-white flex items-center justify-center"
                                          >
                                            <TiTick className="text-[12px]" />{" "}
                                          </button>

                                          <button
                                            disabled={!canDeleteInvoice}
                                            type="button"
                                            onClick={() =>
                                              handleDeleteInvoiceItem(
                                                item,
                                                index,
                                              )
                                            }
                                            className=" disabled:opacity-50 inline-flex items-center justify-center gap-1 h-6 text-[12px] font-medium text-[#EF4444] leading-none"
                                          >
                                            <Trash size={11} />
                                            <span className="leading-none mt-1">
                                              Delete
                                            </span>
                                          </button>
                                        </div>
                                      ) : isEditing ? (
                                        <div className="flex items-center gap-2 w-full">
                                          <input
                                            disabled={isRentItem}
                                            type="text"
                                            value={editingValue.itemName}
                                            onChange={(e) =>
                                              setEditingValue((prev) => ({
                                                ...prev,
                                                itemName: e.target.value,
                                              }))
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
                                            className="flex-1 h-[26px] px-2 py-2 border border-[#1E45E1] 
                                            rounded-md text-[11px] text-[#344054] outline-none disabled:bg-gray-200"
                                          />

                                          <div className="flex items-center h-[26px] border border-[#1E45E1] bg-white rounded-md overflow-hidden">
                                            <span className="pl-2 text-[11px] text-[#98A2B3]">
                                              ₹
                                            </span>

                                            <input
                                              onWheel={(e) => e.target.blur()}
                                              disabled={!canUpdateInvoice}
                                              type="number"
                                              min="0"
                                              value={editingValue.amount}
                                              onChange={(e) =>
                                                setEditingValue((prev) => ({
                                                  ...prev,
                                                  amount: e.target.value,
                                                }))
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
                                              className="w-[65px] h-[24px] px-1 py-2 text-[11px] text-right text-[#344054] outline-none disabled:opacity-50"
                                            />
                                          </div>

                                          <button
                                            disabled={!canUpdateInvoice}
                                            type="button"
                                            onClick={() =>
                                              handleSaveInvoiceItem(item, index)
                                            }
                                            className="w-[24px] h-[24px] rounded-full bg-[#1E45E1] text-white flex items-center justify-center disabled:opacity-50"
                                          >
                                            <TiTick className="text-[12px]" />
                                          </button>

                                          <button
                                            type="button"
                                            onClick={handleCancelField}
                                            className="w-[24px] h-[24px] rounded-full bg-[#F2F4F7] text-[#667085] flex items-center justify-center"
                                          >
                                            <Add
                                              className="rotate-45"
                                              size="16"
                                            />
                                          </button>
                                        </div>
                                      ) : (
                                        <div className="flex items-center gap-3">
                                          <div className="absolute right-16 inset-y-0 hidden group-hover:flex items-center gap-2">
                                            <button
                                              disabled={!canUpdateInvoice}
                                              type="button"
                                              onClick={() => {
                                                setEditingField({
                                                  id: rowKey,
                                                  field: "item",
                                                });

                                                setEditingValue({
                                                  itemName: String(
                                                    invoiceItem.itemName ?? "",
                                                  ),
                                                  amount: String(
                                                    invoiceItem.amount ?? "",
                                                  ),
                                                });
                                              }}
                                              className="disabled:opacity-40 inline-flex items-center justify-center gap-1 h-6 text-[12px] font-medium text-[#1E45E1] leading-none"
                                            >
                                              <Edit2 size={11} />
                                              <span className="leading-none mt-1">
                                                Edit
                                              </span>
                                            </button>

                                            <button
                                              disabled={
                                                !canDeleteInvoice || isRentItem
                                              }
                                              type="button"
                                              onClick={() =>
                                                handleDeleteInvoiceItem(
                                                  item,
                                                  index,
                                                )
                                              }
                                              className="disabled:opacity-50 inline-flex items-center justify-center gap-1 h-6 text-[12px] font-medium text-[#EF4444] leading-none"
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
                                  {formatAmount(item.invoiceAmount)}
                                </span>
                              </div>
                            </div>

                            <div className="px-3 pb-3 text-center">
                              <span className="text-[10px] text-[#98A2B3]">
                                Calculated automatically · Hover any row to edit
                                or remove
                              </span>
                            </div>
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
                  {
                    state.InvoiceList?.getReviewGenerateRecurringbill
                      .totalInvoices
                  }{" "}
                  invoices ready to generate
                </p>
              </div>

              <button
                type="button"
                onClick={handleGenerateAll}
                disabled={items.length === 0 || !canUpdateInvoice}
                className="h-9 px-4 rounded-lg bg-[#1E45E1] text-white text-[14px] font-semibold flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Refresh2 size="14" />
                Generate All Eligible
              </button>
            </div>
          </>
        )}
      </div>

      {showGenerateModal && generateType === "SELECTED" && (
        <SingleInvoiceGenerate
          selectedIds={selectedIds}
          items={items}
          onClose={() => {
            setShowGenerateModal(false);
            setGenerateType(null);
          }}
          onConfirmGenerate={(invoiceIds) => {
            dispatch({
              type: "REVIEW_AND_GENERATE_BILL_SAGA",
              payload: {
                hostelId: state.login.selectedHostel_Id,
                invoiceIds,
              },
            });

            setIsGeneratingInvoice(true);
            setShowGenerateModal(false);
            setGenerateType(null);
          }}
        />
      )}

      {showGenerateModal && generateType === "ALL" && (
        <GenerateAllInvoices
          items={items}
          onClose={() => {
            setShowGenerateModal(false);
            setGenerateType(null);
          }}
          onConfirmGenerate={() => {
            dispatch({
              type: "REVIEW_AND_GENERATE_BILL_SAGA",
              payload: {
                hostelId: state.login.selectedHostel_Id,
              },
            });

            setIsGeneratingInvoice(true);
            setShowGenerateModal(false);
            setGenerateType(null);
          }}
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

      {savingItem && (
        <div className="fixed  font-gilroy top-0 right-0 bottom-0 w-full max-w-[700px] bg-white z-[1000] shadow-2xl flex flex-col font-gilroy">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center mb-4">
              <div className="w-6 h-6 border-4 border-[#D0D5DD] border-t-[#1E45E1] rounded-full animate-spin" />
            </div>

            <span className="text-[18px] font-semibold text-[#081021]">
              Updating invoice...
            </span>

            <span className="text-[14px] text-[#98A2B3] mt-1">
              Please wait while the invoice item is being updated
            </span>

            <div className="w-[334px] max-w-[80vw] h-[5px] bg-[#EAECF0] rounded-full mt-4 overflow-hidden">
              <div className="h-full w-[70%] bg-[#1E45E1] rounded-full" />
            </div>
          </div>
        </div>
      )}

      {deletingItem && (
        <div className="fixed  font-gilroy top-0 right-0 bottom-0 w-full max-w-[700px] bg-white z-[1000] shadow-2xl flex flex-col font-gilroy">
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center mb-4">
              <div className="w-6 h-6 border-4 border-[#D0D5DD] border-t-[#1E45E1] rounded-full animate-spin" />
            </div>

            <span className="text-[18px] font-semibold text-[#081021]">
              Deleting invoice...
            </span>

            <span className="text-[14px] text-[#98A2B3] mt-1">
              Please wait while the invoice item is being updated
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
ReviewGenerateBillsDrawer.propTypes = {
  status: PropTypes.string,
  open: PropTypes.bool,
  onClose: PropTypes.func,
};

export default ReviewGenerateBillsDrawer;
