import React, { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Offcanvas } from "react-bootstrap";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import {
  ArrowDown2,
  DocumentDownload,
  DocumentText,
  InfoCircle,
  Lock1,
  Refresh2,
  TickCircle,
  Warning2,
} from "iconsax-react";
import { IoCloseOutline } from "react-icons/io5";
import ErrorMessage from "../../Components/ErrorMessage";
import {
  CONSOLIDATED_COLUMNS,
  getDefaultExportColumnKeys,
  isExportColumnLocked,
  normaliseExportColumnKeys,
} from "./consolidatedColumns";
import {
  COLLECTION_STATUS_OPTIONS,
  DEFAULT_CONSOLIDATED_FILTERS,
  DEFAULT_EXPORT_PDF_SETTINGS,
  EXPORT_GROUP_BY,
  EXPORT_GROUP_BY_OPTIONS,
  buildExportData,
  countActiveFilters,
  periodToRange,
} from "./consolidatedHelpers";

const { RangePicker } = DatePicker;

const OVERDUE_OPTION = "Overdue";

const STEP = {
  CONFIGURE: "configure",
  PREPARING: "preparing",
  ERROR: "error",
};

const fieldLabel =
  "block mb-[6px] font-semibold text-[11px] leading-[16.5px] tracking-[0.88px] uppercase text-[#62748E]";

const fieldBox =
  "w-full h-[40px] flex items-center justify-between gap-2 px-[12px] bg-white border-[1px] border-[#E2E8F0] rounded-[12px] font-medium text-[14px] text-[#1D293D]";

const sectionCard =
  "bg-white border-[1px] border-[#E2E8F0] rounded-[16px] p-[14px] sm:p-[20px]";

function SectionTitle({ number, title, description, children }) {
  return (
    <div className="flex items-start justify-between gap-[12px]">
      <div>
        <div className="flex items-center gap-2">
          <span className="w-[24px] h-[24px] rounded-[10px] bg-[#0F172B] text-white text-[12px] font-semibold flex items-center justify-center">
            {number}
          </span>
          <h3 className="m-0 font-semibold text-[16px] leading-[24px] text-[#020618]">
            {title}
          </h3>
        </div>
        <p className="mb-0 pl-8 pt-1 text-[12px] leading-[16px] text-[#62748E]">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
}

SectionTitle.propTypes = {
  number: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node,
};

function SettingToggle({ id, checked, onChange, disabled = false, label }) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-[24px] w-[44px] flex-shrink-0 items-center rounded-full transition-colors ${
        checked ? "bg-[#1E45E1]" : "bg-[#CAD5E2]"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-[16px] w-[16px] rounded-full bg-white shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] transition-transform ${
          checked ? "translate-x-[24px]" : "translate-x-[4px]"
        }`}
      />
    </button>
  );
}

SettingToggle.propTypes = {
  id: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
};

// Small multi-select with checkboxes for the Report Scope fields.
function ScopeMultiSelect({ id, options, selected, onChange, emptyLabel }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const toggleOption = (value) => {
    onChange(
      selected.includes(value)
        ? selected.filter((item) => item !== value)
        : [...selected, value],
    );
  };

  const summary = selected.length > 0 ? selected.join(", ") : emptyLabel;

  return (
    <div ref={wrapperRef} className="relative">
      <button
        id={id}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className={fieldBox}
      >
        <span className="truncate">{summary}</span>
        <ArrowDown2 size="14" color="#1D293D" />
      </button>
      {isOpen && (
        <div
          role="listbox"
          aria-multiselectable="true"
          className="absolute left-0 right-0 z-50 mt-1 bg-white border-[1px] border-[#E2E8F0] rounded-[12px] shadow-lg py-2"
        >
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 px-[12px] py-1.5 mb-0 cursor-pointer text-[14px] text-[#314158] hover:bg-[#F1F5FF]"
            >
              <input
                type="checkbox"
                checked={selected.includes(option)}
                onChange={() => toggleOption(option)}
                className="w-4 h-4 accent-[#1E45E1]"
              />
              {option}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

ScopeMultiSelect.propTypes = {
  id: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onChange: PropTypes.func.isRequired,
  emptyLabel: PropTypes.string.isRequired,
};

// Export Pending Collection Sheet – settings panel (Figma node 7072-173297).
// Scope (filters, period, All Tenants) is copied from the current view each
// time the panel opens. Columns and PDF settings start from the visible table
// columns, are then independent, and are remembered after a successful export.
function ConsolidatedExportSettings({
  show,
  onClose,
  beds,
  scope,
  visibleTableKeys,
  savedPrefs,
  onSavePrefs,
  floorOptions,
  propertyName,
  onPrepared,
  isBehindPreview = false,
}) {
  const [range, setRange] = useState(null);
  const [statuses, setStatuses] = useState([]);
  const [floors, setFloors] = useState([]);
  const [search, setSearch] = useState("");
  const [includeAllTenants, setIncludeAllTenants] = useState(false);
  const [columnKeys, setColumnKeys] = useState([]);
  const [pdfSettings, setPdfSettings] = useState(DEFAULT_EXPORT_PDF_SETTINGS);
  const [step, setStep] = useState(STEP.CONFIGURE);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (!show) return;
    const filters = { ...DEFAULT_CONSOLIDATED_FILTERS, ...scope.filters };
    setRange(periodToRange(scope.period));
    setStatuses(
      filters.overdueOnly
        ? [...filters.statuses, OVERDUE_OPTION]
        : [...filters.statuses],
    );
    setFloors([...filters.floors]);
    setSearch(filters.search || "");
    setIncludeAllTenants(Boolean(scope.includeAllTenants));
    setColumnKeys(
      savedPrefs?.columnKeys
        ? normaliseExportColumnKeys(savedPrefs.columnKeys)
        : getDefaultExportColumnKeys(visibleTableKeys),
    );
    setPdfSettings(savedPrefs?.pdfSettings || DEFAULT_EXPORT_PDF_SETTINGS);
    setStep(STEP.CONFIGURE);
    setErrors([]);
    // Seed only when the panel opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  const exportFilters = useMemo(
    () => ({
      search,
      statuses: statuses.filter((status) => status !== OVERDUE_OPTION),
      overdueOnly: statuses.includes(OVERDUE_OPTION),
      floors,
    }),
    [search, statuses, floors],
  );

  const exportPeriod = useMemo(
    () =>
      range?.[0] && range?.[1]
        ? { from: range[0].toDate(), to: range[1].toDate() }
        : null,
    [range],
  );

  const exportScope = useMemo(
    () => ({ filters: exportFilters, period: exportPeriod, includeAllTenants }),
    [exportFilters, exportPeriod, includeAllTenants],
  );

  const exportSettings = useMemo(
    () => ({ ...pdfSettings, columnKeys: normaliseExportColumnKeys(columnKeys) }),
    [pdfSettings, columnKeys],
  );

  // Live count so the user sees what will be exported before preparing.
  const liveData = useMemo(
    () => (show ? buildExportData(beds, exportScope, exportSettings) : null),
    [show, beds, exportScope, exportSettings],
  );

  const hasFilters = countActiveFilters(exportFilters) > 0;
  const groupsByFloor = pdfSettings.groupBy !== EXPORT_GROUP_BY.ROOM_BED;

  const toggleColumn = (key) => {
    if (isExportColumnLocked(key)) return;
    setColumnKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  const updatePdf = (field, value) =>
    setPdfSettings((prev) => ({ ...prev, [field]: value }));

  const validate = () => {
    const messages = [];
    if (!exportPeriod) {
      messages.push("Select a date range for the export.");
    }
    if (exportPeriod && liveData?.rowCount === 0) {
      messages.push(
        "No tenant stays match this scope. Change the filters or include fully paid tenants and empty beds.",
      );
    }
    return messages;
  };

  const handlePrepare = () => {
    const messages = validate();
    setErrors(messages);
    if (messages.length > 0) return;

    setStep(STEP.PREPARING);
    // Let the Preparing state render before building the export data.
    setTimeout(() => {
      try {
        const data = buildExportData(beds, exportScope, exportSettings);
        onSavePrefs({
          columnKeys: exportSettings.columnKeys,
          pdfSettings,
        });
        setStep(STEP.CONFIGURE);
        // Hand over to the PDF preview, with the report details it prints.
        onPrepared({
          ...data,
          meta: {
            propertyName,
            period: exportPeriod,
            includeAllTenants,
            filters: exportFilters,
            generatedAt: new Date(),
          },
        });
      } catch {
        setStep(STEP.ERROR);
      }
    }, 0);
  };

  const footerSummary = [
    `${liveData?.occupiedCount ?? 0} tenant stays`,
    liveData?.vacantCount > 0 ? `${liveData.vacantCount} empty beds` : null,
    `${exportSettings.columnKeys.length} columns`,
    "A4 landscape",
  ]
    .filter(Boolean)
    .join(" · ");

  const scopeSummary = includeAllTenants
    ? `${liveData?.occupiedCount ?? 0} tenant stays and ${liveData?.vacantCount ?? 0} empty beds will be exported.`
    : `${liveData?.occupiedCount ?? 0} tenant stays with pending balances will be exported.`;

  const renderConfigure = () => (
    <div className="flex flex-col gap-[12px] sm:gap-[16px]">
      {/* 1. Report Scope */}
      <section className={sectionCard} aria-label="Report Scope">
        <SectionTitle
          number={1}
          title="Report Scope"
          description="Your current Invoice Register filters are carried into this export."
        >
          {hasFilters && (
            <span className="flex items-center gap-[6px] px-[12px] py-[6px] rounded-full bg-[#EFF6FF] text-[12px] font-semibold text-[#1E45E1] whitespace-nowrap">
              <TickCircle size="14" color="#1E45E1" />
              Filters applied
            </span>
          )}
        </SectionTitle>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px] sm:gap-[16px] pt-[12px]">
          <div>
            <span className={fieldLabel}>Date Range · Invoice Date</span>
            <RangePicker
              allowClear={false}
              format="MMM DD, YYYY"
              value={range}
              onChange={(dates) => setRange(dates)}
              disabledDate={(current) => current && current > dayjs().endOf("day")}
              style={{
                width: "100%",
                height: 40,
                borderRadius: 12,
                borderColor: "#E2E8F0",
                fontFamily: "Gilroy",
              }}
            />
          </div>
          <div>
            <label htmlFor="export-status" className={fieldLabel}>
              Collection Status
            </label>
            <ScopeMultiSelect
              id="export-status"
              options={[...COLLECTION_STATUS_OPTIONS, OVERDUE_OPTION]}
              selected={statuses}
              onChange={setStatuses}
              emptyLabel="All statuses"
            />
          </div>
          <div>
            <label htmlFor="export-floor" className={fieldLabel}>
              Floor
            </label>
            <ScopeMultiSelect
              id="export-floor"
              options={floorOptions}
              selected={floors}
              onChange={setFloors}
              emptyLabel="All Floors"
            />
          </div>
          {search && (
            <div>
              <span className={fieldLabel}>Tenant Search</span>
              <div className={`${fieldBox} bg-[#F8FAFC]`}>
                <span className="truncate">{search}</span>
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Remove tenant search from export"
                  className="bg-transparent border-0 p-0"
                >
                  <IoCloseOutline size={16} color="#62748E" />
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-[12px] flex gap-2 px-[12px] py-[10px] rounded-[12px] border-[1px] border-[#DBEAFE] bg-[rgba(239,246,255,0.6)]">
          <InfoCircle size="16" color="#1E45E1" className="mt-[2px] flex-shrink-0" />
          <div>
            <p className="mb-0 font-semibold text-[14px] leading-[20px] text-[#1D293D]">
              {includeAllTenants
                ? "All tenants and empty beds"
                : "Pending tenants only"}
            </p>
            <p className="mb-0 pt-[2px] text-[12px] leading-[20px] text-[#62748E]">
              {includeAllTenants
                ? `Fully paid tenants and empty beds for ${propertyName || "this property"} are included with ₹0 outstanding. Empty beds are not counted in totals.`
                : `This sheet includes unpaid, partially paid and overdue balances for ${propertyName || "this property"}. Fully paid tenants are not included.`}
            </p>
            <p
              className="mb-0 pt-1 text-[12px] leading-[16px] font-semibold text-[#1D293D]"
              data-testid="export-scope-count"
            >
              {scopeSummary}
            </p>
          </div>
        </div>

        <div className="mt-[12px] flex items-center justify-between gap-[12px] min-h-[56px] px-[12px] py-[10px] bg-white border-[1px] border-[#E2E8F0] rounded-[12px]">
          <div>
            <label
              htmlFor="export-include-all"
              className="block mb-0 font-semibold text-[14px] leading-[20px] text-[#1D293D] cursor-pointer"
            >
              Include Fully Paid Tenants &amp; Empty beds
            </label>
            <p className="mb-0 pt-[2px] text-[12px] leading-[16px] text-[#62748E]">
              Add matching tenant stays with no outstanding balance.
            </p>
          </div>
          <SettingToggle
            id="export-include-all"
            label="Include Fully Paid Tenants & Empty beds"
            checked={includeAllTenants}
            onChange={setIncludeAllTenants}
          />
        </div>
      </section>

      {/* 2. Choose What to Include */}
      <section className={sectionCard} aria-label="Choose What to Include">
        <SectionTitle
          number={2}
          title="Choose What to Include"
          description="Select the details you want to show in your collection sheet."
        >
          <div className="flex items-center gap-[12px] whitespace-nowrap">
            <button
              type="button"
              onClick={() =>
                setColumnKeys(CONSOLIDATED_COLUMNS.map((column) => column.key))
              }
              className="bg-transparent border-0 p-0 text-[12px] font-semibold text-[#1E45E1]"
            >
              Select All
            </button>
            <button
              type="button"
              onClick={() =>
                setColumnKeys(getDefaultExportColumnKeys(visibleTableKeys))
              }
              className="flex items-center gap-1 bg-transparent border-0 p-0 text-[12px] font-semibold text-[#62748E]"
            >
              <Refresh2 size="12" color="#62748E" />
              Reset to Default
            </button>
          </div>
        </SectionTitle>

        <div className="grid grid-cols-2 gap-2 pt-[12px]">
          {CONSOLIDATED_COLUMNS.map((column) => {
            const locked = isExportColumnLocked(column.key);
            const checked = locked || columnKeys.includes(column.key);
            return (
              <label
                key={column.key}
                className={`flex items-center justify-between min-h-[36px] px-[12px] py-[6px] mb-0 rounded-[10px] border-[1px] border-[#DBEAFE] bg-[rgba(239,246,255,0.6)] ${
                  locked ? "cursor-not-allowed" : "cursor-pointer"
                }`}
              >
                <span className="flex items-center gap-[10px]">
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={locked}
                    onChange={() => toggleColumn(column.key)}
                    className="w-4 h-4 accent-[#1E45E1]"
                  />
                  <span className="font-medium text-[13px] sm:text-[14px] leading-[18px] sm:leading-[20px] text-[#314158]">
                    {column.label}
                  </span>
                </span>
                {locked && (
                  <span title="Always included" className="inline-flex">
                    <Lock1 size="14" color="#90A1B9" aria-hidden="true" />
                  </span>
                )}
              </label>
            );
          })}
        </div>
        <p className="sm:hidden mb-0 pt-[10px] text-[11px] leading-[16px] text-[#62748E]">
          Actual Rent is shown as reference and is not added to Total Pending.
        </p>
      </section>

      {/* 3. PDF Settings */}
      <section className={sectionCard} aria-label="PDF Settings">
        <SectionTitle
          number={3}
          title="PDF Settings"
          description="Choose how the collection sheet is grouped and totalled."
        />

        <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-[16px] pt-[12px]">
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px] sm:gap-[16px]">
              <div>
                <label htmlFor="export-group-by" className={fieldLabel}>
                  Group By
                </label>
                <select
                  id="export-group-by"
                  value={pdfSettings.groupBy}
                  onChange={(e) => updatePdf("groupBy", e.target.value)}
                  className={`${fieldBox} cursor-pointer`}
                >
                  {EXPORT_GROUP_BY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="mb-0 pt-[6px] text-[11px] leading-[16px] text-[#62748E]">
                  The PDF automatically follows this order, so a separate Sort By
                  setting is not needed.
                </p>
              </div>
              <div>
                <span className={fieldLabel}>Page Orientation</span>
                <div className={`${fieldBox} bg-[#F8FAFC] font-semibold`}>
                  Landscape
                  <span className="px-2 py-[2px] rounded-[4px] bg-[#E2E8F0] text-[10px] font-semibold tracking-[0.25px] uppercase text-[#45556C]">
                    Fixed
                  </span>
                </div>
                <p className="mb-0 pt-[6px] text-[11px] leading-[16px] text-[#62748E]">
                  Fixed to A4 landscape so financial columns remain readable when
                  printed.
                </p>
              </div>
            </div>

            <div className="pt-[12px] flex flex-col gap-[10px]">
              {[
                {
                  field: "includeFloorSubtotals",
                  label: "Include Floor-wise Subtotals",
                  disabled: !groupsByFloor,
                },
                { field: "includeGrandTotal", label: "Include Grand Total" },
                {
                  field: "includePropertyAndPeriod",
                  label: "Include Property Name and Report Period",
                },
              ].map((item) => (
                <div
                  key={item.field}
                  className="flex items-center justify-between pb-2 border-b border-[#F1F5F9]"
                >
                  <span className="font-medium text-[14px] leading-[20px] text-[#314158]">
                    {item.label}
                    {item.disabled && (
                      <span className="block text-[11px] text-[#62748E]">
                        Available when grouped by floor.
                      </span>
                    )}
                  </span>
                  <SettingToggle
                    label={item.label}
                    checked={Boolean(pdfSettings[item.field]) && !item.disabled}
                    disabled={item.disabled}
                    onChange={(value) => updatePdf(item.field, value)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block p-[12px] rounded-[12px] border-[1px] border-[#E2E8F0] bg-[#F1F5F9]">
            <p className="mb-2 font-semibold text-[10px] leading-[15px] tracking-[0.5px] uppercase text-[#62748E]">
              Layout preview
            </p>
            <div
              className="bg-white rounded-[8px] p-[12px] shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)]"
              aria-hidden="true"
            >
              {pdfSettings.includePropertyAndPeriod && (
                <>
                  <div className="h-[6px] w-[64px] rounded bg-[#1D293D]" />
                  <div className="mt-2 h-[4px] w-[96px] rounded bg-[#CAD5E2]" />
                </>
              )}
              <div className="mt-[12px] h-[10px] w-full rounded-[8px] bg-[#DBEAFE]" />
              {[0, 1, 2].map((line) => (
                <div
                  key={line}
                  className="flex items-center gap-2 py-[6px] border-b border-[#F1F5F9]"
                >
                  <div className="h-[4px] flex-1 rounded bg-[#CAD5E2]" />
                  <div className="h-[4px] w-[20px] rounded bg-[#90A1B9]" />
                </div>
              ))}
              {pdfSettings.includeFloorSubtotals && groupsByFloor && (
                <div className="flex justify-end py-[6px]">
                  <div className="h-[4px] w-[48px] rounded bg-[#90A1B9]" />
                </div>
              )}
              {pdfSettings.includeGrandTotal && (
                <div className="flex justify-end pt-2">
                  <div className="h-[6px] w-[64px] rounded bg-[#314158]" />
                </div>
              )}
            </div>
            <p className="mb-0 pt-2 text-[10px] leading-[16px] text-[#62748E]">
              A4 landscape · headings repeat on each page
            </p>
          </div>
        </div>
      </section>

      {errors.length > 0 && (
        <div role="alert">
          <ErrorMessage message={errors} type="error" />
        </div>
      )}
    </div>
  );

  const renderPreparing = () => (
    <div
      className="flex flex-col items-center justify-center gap-[12px] py-16"
      role="status"
      aria-live="polite"
    >
      <div className="w-10 h-10 border-t-4 border-t-[#1E45E1] border-r-4 border-r-transparent rounded-full animate-spin" />
      <p className="mb-0 font-semibold text-[14px] text-[#1D293D]">
        Preparing your collection sheet…
      </p>
    </div>
  );

  const renderError = () => (
    <div
      className={`${sectionCard} flex flex-col items-center gap-[12px] text-center`}
      role="alert"
    >
      <Warning2 size="28" color="#C10007" />
      <p className="mb-0 font-semibold text-[14px] text-[#1D293D]">
        We couldn&apos;t prepare the collection sheet.
      </p>
      <button
        type="button"
        onClick={handlePrepare}
        className="px-[16px] py-2 rounded-[12px] bg-[#1E45E1] text-white text-[14px] font-semibold"
      >
        Try again
      </button>
    </div>
  );

  const isPreparing = step === STEP.PREPARING;

  return (
    <Offcanvas
      show={show}
      onHide={isPreparing || isBehindPreview ? undefined : onClose}
      enforceFocus={!isBehindPreview}
      keyboard={!isBehindPreview}
      placement="end"
      style={{ width: 720, maxWidth: "100vw" }}
      aria-labelledby="export-settings-title"
    >
      <div className="flex flex-col h-full bg-[#F7F8FC] font-gilroy">
        <div className="flex items-start justify-between gap-[12px] px-[16px] sm:px-[28px] py-[14px] sm:py-[18px] bg-white border-b border-[#E2E8F0]">
          <div className="flex items-start gap-[14px]">
            <span className="mt-[2px] w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] rounded-[14px] sm:rounded-[16px] bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
              <DocumentText size="20" color="#1E45E1" />
            </span>
            <div>
              <h2
                id="export-settings-title"
                className="m-0 font-semibold text-[18px] sm:text-[20px] leading-[24px] sm:leading-[28px] tracking-[-0.4px] text-[#020618]"
              >
                Export Pending Collection Sheet
              </h2>
              <p className="hidden sm:block mb-0 pt-1 text-[14px] leading-[20px] text-[#62748E] max-w-[558px]">
                Get a floor-wise list of tenants with pending payments from the
                Invoice Register. Download and print it to help your staff
                collect payments.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isPreparing}
            aria-label="Close export"
            className="p-2 rounded-[12px] bg-transparent border-0"
          >
            <IoCloseOutline size={20} color="#62748E" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-[16px] sm:px-[28px] py-[14px] sm:py-[20px] show-scrolls">
          {step === STEP.CONFIGURE && renderConfigure()}
          {isPreparing && renderPreparing()}
          {step === STEP.ERROR && renderError()}
        </div>

        {/* The summary stays visible while scrolling, so the scope and column
            count are never out of sight when pressing Preview. */}
        <div className="flex flex-col gap-[10px] sm:flex-row sm:items-center sm:gap-[16px] px-[16px] sm:px-[28px] py-[12px] bg-white border-t border-[#E2E8F0]">
          <div className="flex-1 min-w-0">
            <p
              className="mb-0 font-semibold text-[13px] leading-[18px] text-[#1D293D]"
              data-testid="export-footer-summary"
            >
              {footerSummary}
            </p>
            <p className="hidden sm:flex mb-0 items-start gap-[6px] text-[11px] leading-[16px] text-[#62748E]">
              <InfoCircle size="14" color="#62748E" className="flex-shrink-0" />
              <span>
                Actual Rent is shown as reference and is not added to Total
                Pending.
              </span>
            </p>
          </div>
          <div className="flex gap-[10px]">
            <button
              type="button"
              onClick={onClose}
              disabled={isPreparing}
              className="h-[44px] px-[20px] rounded-[12px] border-[1px] border-[#CAD5E2] bg-white font-semibold text-[14px] text-[#314158] disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handlePrepare}
              disabled={isPreparing}
              className="h-[44px] flex-1 sm:flex-none sm:w-[240px] flex items-center justify-center gap-2 px-[16px] rounded-[12px] bg-[#1E45E1] font-semibold text-[14px] text-white shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <DocumentDownload size="18" color="#FFFFFF" />
              {isPreparing ? "Preparing…" : "Preview & Export PDF"}
            </button>
          </div>
        </div>
      </div>
    </Offcanvas>
  );
}

ConsolidatedExportSettings.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  beds: PropTypes.arrayOf(PropTypes.object).isRequired,
  scope: PropTypes.shape({
    filters: PropTypes.object,
    period: PropTypes.object,
    includeAllTenants: PropTypes.bool,
  }).isRequired,
  visibleTableKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  savedPrefs: PropTypes.shape({
    columnKeys: PropTypes.arrayOf(PropTypes.string),
    pdfSettings: PropTypes.object,
  }),
  onSavePrefs: PropTypes.func.isRequired,
  floorOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  propertyName: PropTypes.string,
  onPrepared: PropTypes.func.isRequired,
  isBehindPreview: PropTypes.bool,
};

export default ConsolidatedExportSettings;
