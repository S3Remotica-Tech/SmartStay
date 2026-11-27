import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import { Offcanvas } from "react-bootstrap";
import { DatePicker } from "antd";
import { Filter, SearchNormal1 } from "iconsax-react";
import { IoCloseOutline } from "react-icons/io5";
// Imported back from the table file (circular import): only read these inside
// the component / at call time, never at module level.
import {
  DEFAULT_CONSOLIDATED_FILTERS,
  periodToRange,
} from "./ConsolidatedInvoiceTable";

const { RangePicker } = DatePicker;

const sectionLabel =
  "block mb-0 font-gilroy font-medium text-[14px] leading-[20px] text-[#364153]";

const optionLabel =
  "flex items-center gap-2 mb-0 cursor-pointer font-gilroy text-[14px] leading-[20px] text-[#364153]";

// Advanced Filters drawer for the Consolidated View (Figma node 7072-173655).
// Edits a draft; nothing changes until "Apply Filters". Closing discards the draft.
function ConsolidatedFilterDrawer({
  show,
  onClose,
  filters,
  period,
  floorOptions,
  // API filters.paymentStatus [{ key, label }], like floorOptions from filters.floors.
  statusOptions = [],
  onApply,
}) {
  const [draft, setDraft] = useState(filters);
  const [draftRange, setDraftRange] = useState(periodToRange(period));

  useEffect(() => {
    if (show) {
      setDraft({ ...DEFAULT_CONSOLIDATED_FILTERS, ...filters });
      setDraftRange(periodToRange(period));
    }
    // Re-seed only when the drawer opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const toggleInList = (field, value) => {
    setDraft((prev) => {
      const list = prev[field] || [];
      return {
        ...prev,
        [field]: list?.includes(value)
          ? list?.filter((item) => item !== value)
          : [...list, value],
      };
    });
  };

  const handleReset = () => {
    setDraft(DEFAULT_CONSOLIDATED_FILTERS);
    setDraftRange([dayjs().startOf("month"), dayjs().endOf("month")]);
  };

  const handleApply = () => {
    onApply({
      filters: { ...draft, search: draft?.search?.trim() },
      range: draftRange,
    });
  };

  return (
    <Offcanvas
      show={show}
      onHide={onClose}
      placement="end"
      style={{ width: 432, maxWidth: "100vw" }}
      aria-labelledby="consolidated-filter-title"
    >
      <div className="flex flex-col h-full bg-white font-gilroy">
        <div className="flex items-center justify-between p-6 border-b border-[#E5E7EB]">
          <div className="flex items-center gap-[10px]">
            <Filter size="20" color="#16151C" />
            <h2
              id="consolidated-filter-title"
              className="m-0 font-semibold text-[18px] leading-[23px] text-[#16151C]"
            >
              Advanced Filters
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close filters"
            className="bg-transparent border-0 p-0"
          >
            <IoCloseOutline size={22} color="#FF0000" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 show-scrolls">
          <label htmlFor="consolidated-filter-search" className={sectionLabel}>
            Search
          </label>
          <div className="mt-2 flex items-center gap-2 h-[42px] pl-[10px] pr-4 border-[1px] border-[#D1D5DC] rounded-[12px]">
            <SearchNormal1 size="18" color="#98A2B3" />
            <input
              id="consolidated-filter-search"
              value={draft?.search}
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, search: e?.target?.value }))
              }
              placeholder="Search by tenant name"
              className="w-full text-[14px] text-[#101828] outline-none placeholder:text-[rgba(16,24,40,0.5)]"
            />
          </div>

          <div className="pt-6">
            <span className={sectionLabel}>
              Period - <span className="font-normal">Custom date range</span>
            </span>
            <div className="mt-2">
              <RangePicker
                allowClear={false}
                format="MMM DD, YYYY"
                value={draftRange}
                onChange={(dates) => setDraftRange(dates)}
                disabledDate={(current) =>
                  current && current > dayjs().endOf("day")
                }
                style={{
                  width: "100%",
                  height: 42,
                  borderRadius: 12,
                  borderColor: "#D9D9D9",
                  fontFamily: "Gilroy",
                }}
              />
            </div>
          </div>

          <fieldset className="pt-6">
            <legend className={sectionLabel}>Collection Status</legend>
            <div className="pt-2 flex flex-col gap-2">
              {statusOptions?.map((status) => (
                <label key={status?.key} className={optionLabel}>
                  <input
                    type="checkbox"
                    checked={draft?.statuses?.includes(status?.key)}
                    onChange={() => toggleInList("statuses", status?.key)}
                    className="w-4 h-4 accent-[#1E45E1]"
                  />
                  {status?.label}
                </label>
              ))}
              <label className={optionLabel}>
                <input
                  type="checkbox"
                  checked={draft?.overdueOnly}
                  onChange={() =>
                    setDraft((prev) => ({ ...prev, overdueOnly: !prev?.overdueOnly }))
                  }
                  className="w-4 h-4 accent-[#1E45E1]"
                />
                Overdue
              </label>
            </div>
          </fieldset>

          <fieldset className="pt-6">
            <legend className={sectionLabel}>Floors</legend>
            <div className="pt-2 grid grid-cols-2 gap-2">
              {floorOptions?.map((floor) => (
                <label key={floor} className={optionLabel}>
                  <input
                    type="checkbox"
                    checked={draft?.floors?.includes(floor)}
                    onChange={() => toggleInList("floors", floor)}
                    className="w-4 h-4 accent-[#1E45E1]"
                  />
                  {floor}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <div className="flex gap-[12px] p-6 bg-[#F9FAFB] border-t border-[#E5E7EB]">
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 h-[42px] rounded-[12px] border-[1px] border-[#D1D5DC] bg-white font-medium text-[16px] text-[#364153]"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleApply}
            className="flex-1 h-[42px] rounded-[12px] bg-[#1E45E1] font-medium text-[16px] text-white"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </Offcanvas>
  );
}

ConsolidatedFilterDrawer.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    search: PropTypes.string,
    statuses: PropTypes.arrayOf(PropTypes.string),
    overdueOnly: PropTypes.bool,
    floors: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  period: PropTypes.shape({
    from: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.object]),
    to: PropTypes.oneOfType([PropTypes.instanceOf(Date), PropTypes.object]),
  }),
  floorOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  statusOptions: PropTypes.arrayOf(
    PropTypes.shape({ key: PropTypes.string, label: PropTypes.string }),
  ),
  onApply: PropTypes.func.isRequired,
};

export default ConsolidatedFilterDrawer;
