import React, { useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { ArrowLeft, DocumentText, Edit2 } from "iconsax-react";
import ErrorMessage from "../../Components/ErrorMessage";
import {
  TENANT_BTN_PRIMARY,
  TENANT_BTN_SECONDARY,
  TENANT_BTN_TERTIARY,
  TENANT_FOOTER_CLASS,
  formatMoney,
} from "./tenantDraftUtils";

// Step 4 "Preview Details": the last check before the booking / check-in is
// created. Read-only; each section's Edit goes back to the step that owns the
// data. Only the Confirm button submits. (No Figma frame exists for this step;
// it reuses the drawer's section header, card, tag and summary-card styles.)

const EMPTY = "—";

function Section({ title, onEdit, children, aside }) {
  return (
    <section className="overflow-hidden rounded-[12px] border-[1px] border-solid border-[#EAECF0] bg-white">
      <header className="flex items-center justify-between gap-[12px] border-b-[1px] border-solid border-[#F2F4F7] px-[16px] py-[12px]">
        <h6 className="m-0 flex items-center gap-[10px] font-gilroy text-[16px] font-semibold leading-[24px] text-[#222222]">
          <span className="h-[20px] w-[3px] rounded-[12px] bg-[#0038AC]" />
          {title}
          {aside}
        </h6>
        {onEdit && (
          <button data-testid="tenant-preview-edit-btn"
            type="button"
            onClick={onEdit}
            aria-label={`Edit ${title}`}
            className="flex items-center gap-[6px] rounded-[6px] px-[8px] py-[4px] font-gilroy text-[13px] font-medium text-[#1E45E1] transition-colors hover:bg-[#EBEFFF]"
          >
            <Edit2 size="14" color="#1E45E1" />
            Edit
          </button>
        )}
      </header>
      <div className="px-[16px] py-[14px]">{children}</div>
    </section>
  );
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  onEdit: PropTypes.func,
  children: PropTypes.node,
  aside: PropTypes.node,
};

function Fields({ children }) {
  return (
    <dl className="m-0 grid grid-cols-1 gap-x-[24px] gap-y-[14px] sm:grid-cols-2">
      {children}
    </dl>
  );
}

Fields.propTypes = { children: PropTypes.node };

// Fields left empty or skipped are not shown at all.
function Field({ label, value, wide }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div className={`min-w-0 ${wide ? "sm:col-span-2" : ""}`}>
      <dt className="font-gilroy text-[12px] font-medium leading-[16px] text-[#6A7282]">
        {label}
      </dt>
      <dd className="m-0 mt-[4px] break-words font-gilroy text-[14px] font-semibold leading-[20px] text-[#222222]">
        {value}
      </dd>
    </div>
  );
}

Field.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.node,
  wide: PropTypes.bool,
};

const TAG_STYLES = {
  refundable: "bg-[#ECFDF5] text-[#007A55]",
  nonRefundable: "bg-[#FFF4E5] text-[#B54708]",
  oneTime: "bg-[#F2F4F7] text-[#344054]",
  estimate: "bg-[#EEF1FD] text-[#1E45E1]",
};

function Tag({ tone, children }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-[8px] py-[2px] font-gilroy text-[11px] font-medium leading-[16px] ${TAG_STYLES[tone]}`}
    >
      {children}
    </span>
  );
}

Tag.propTypes = {
  tone: PropTypes.oneOf(Object.keys(TAG_STYLES)).isRequired,
  children: PropTypes.node,
};

// One line of a charges list: label + tag on the left, amount on the right.
function ChargeRow({ label, tag, tone, amount, sub }) {
  return (
    <li className="flex items-start justify-between gap-[12px] py-[10px]">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-[8px]">
          <span className="inline-block break-words font-gilroy text-[14px] font-medium text-[#222222] first-letter:uppercase">
            {label}
          </span>
          {tag && <Tag tone={tone}>{tag}</Tag>}
        </div>
        {sub && (
          <p className="m-0 mt-[2px] font-gilroy text-[12px] text-[#6A7282]">{sub}</p>
        )}
      </div>
      <span className="shrink-0 font-gilroy text-[14px] font-semibold text-[#222222]">
        {amount}
      </span>
    </li>
  );
}

ChargeRow.propTypes = {
  label: PropTypes.node.isRequired,
  tag: PropTypes.string,
  tone: PropTypes.string,
  amount: PropTypes.node,
  sub: PropTypes.node,
};

const isImage = (file) =>
  file instanceof File
    ? file.type.startsWith("image/")
    : typeof file === "string" && /\.(jpe?g|jfif|pjpeg|pjp|png|webp|gif|bmp|svg|avif)([?#]|$)/i.test(file);

const fileName = (file, fallback) => {
  if (!file) return "";
  if (typeof file === "string") {
    return decodeURIComponent(file.split("/").pop().split("?")[0]) || fallback;
  }
  return file.name || fallback;
};

function DocumentTile({ title, file }) {
  const preview = useMemo(() => {
    if (!file || !isImage(file)) return "";
    return file instanceof File ? URL.createObjectURL(file) : file;
  }, [file]);

  useEffect(
    () => () => {
      if (preview && file instanceof File) URL.revokeObjectURL(preview);
    },
    [preview, file],
  );

  if (!file) {
    return (
      <div className="flex items-center gap-[12px] rounded-[10px] border-[1px] border-dashed border-[#D0D5DD] bg-[#F9FAFB] p-[12px]">
        <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[8px] bg-white">
          <DocumentText size="20" color="#98A2B3" />
        </div>
        <div className="min-w-0">
          <p className="m-0 font-gilroy text-[14px] font-semibold text-[#344054]">{title}</p>
          <p className="m-0 font-gilroy text-[12px] text-[#6A7282]">
            Not uploaded · optional, can be added from the tenant profile
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-[12px] rounded-[10px] border-[1px] border-solid border-[#EAECF0] bg-white p-[12px]">
      {preview ? (
        <img
          src={preview}
          alt={title}
          className="h-[44px] w-[44px] shrink-0 rounded-[8px] object-cover"
        />
      ) : (
        <div className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-[8px] bg-[#EBEFFF]">
          <DocumentText size="20" color="#1E45E1" />
        </div>
      )}
      <div className="min-w-0">
        <p className="m-0 font-gilroy text-[14px] font-semibold text-[#344054]">{title}</p>
        <p className="m-0 truncate font-gilroy text-[12px] text-[#6A7282]">
          {fileName(file, "Uploaded")}
        </p>
      </div>
    </div>
  );
}

DocumentTile.propTypes = { title: PropTypes.string.isRequired, file: PropTypes.any };

const initialsOf = (name) =>
  (name || "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("") || "T";

const RENT_MODE_LABEL = {
  custom: "Custom rent for the first month",
  full: "Full rent for the first month",
  prorated: "Pro-rated from the joining date",
};

function TenantPreview({
  flow,
  property,
  personal,
  stay,
  docs,
  confirmed,
  onConfirmChange,
  onEdit,
  onBack,
  onSaveDraft,
  onConfirm,
  draftSaving,
  submitting,
  canSubmit,
  error,
}) {
  const isBooking = flow === "booking";
  const amenities = stay.amenities || [];

  const deposit = stay.isAdvanceRefused ? 0 : Number(stay.advanceAmount) || 0;
  const oneTimeTotal = stay.oneTime.reduce((sum, c) => sum + Number(c.amount || 0), 0);
  const amenityTotal = amenities.reduce((sum, a) => sum + Number(a.estimate || 0), 0);
  const rentFirst = Number(stay.rentFirst) || 0;
  const upfront = deposit + rentFirst + amenityTotal + oneTimeTotal;

  return (
    <div className="flex flex-col gap-[16px] font-gilroy">
      {/* Tenant header */}
      <div className="flex items-center gap-[14px] rounded-[12px] bg-[#F4F8FF] p-[16px]">
        <div className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#1E45E1] font-gilroy text-[18px] font-semibold text-white">
          {initialsOf(personal.name)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="m-0 break-words font-gilroy text-[18px] font-semibold leading-[24px] text-[#222222]">
            {personal.name || EMPTY}
          </p>
          <p className="m-0 mt-[2px] break-words font-gilroy text-[13px] text-[#505F76]">
            {[personal.mobile, personal.email].filter(Boolean).join(" · ") || EMPTY}
          </p>
        </div>
        <span
          className={`shrink-0 rounded-full px-[12px] py-[4px] font-gilroy text-[12px] font-semibold ${
            isBooking ? "bg-[#EBEFFF] text-[#1E45E1]" : "bg-[#ECFDF5] text-[#007A55]"
          }`}
        >
          {isBooking ? "Booking" : "Check-in"}
        </span>
      </div>

      <Section title="Personal Details" onEdit={() => onEdit(1)}>
        <Fields>
          <Field label="Tenant Name" value={personal.name} />
          <Field label="Mobile Number" value={personal.mobile} />
          <Field label="Email ID" value={personal.email} />
          <Field label="ID Proof" value={personal.idProof} />
          {!personal.addressLater && (
            <Field label="Address" wide value={personal.address} />
          )}
          {personal.guardians?.length > 0 && (
            <Field
              label="Guardian"
              wide
              value={personal.guardians
                .map((g) => [g.name, g.mobile].filter(Boolean).join(" · "))
                .join(", ")}
            />
          )}
        </Fields>
      </Section>

      <Section
        title={isBooking ? "Booking Details" : "Accommodation"}
        onEdit={() => onEdit(2)}
      >
        <Fields>
          <Field label="Property" value={property} wide />
          <Field label="Floor" value={stay.floor} />
          <Field label="Room / Bed" value={[stay.room, stay.bed].filter(Boolean).join(" · ")} />
          {isBooking ? (
            <>
              <Field label="Booking Date" value={stay.bookingDate} />
              <Field label="Joining Date (Tentative)" value={stay.joiningDate} />
            </>
          ) : (
            <>
              <Field label="Joining Date" value={stay.joiningDate} />
              <Field
                label="Stay Type"
                value={stay.stayType === "SHORT" ? "Short Stay" : "Long Stay"}
              />
            </>
          )}
        </Fields>
      </Section>

      {isBooking ? (
        <Section title="Booking Payment" onEdit={() => onEdit(2)}>
          <Fields>
            <Field label="Booking Amount" value={formatMoney(stay.bookingAmount)} />
            <Field label="Mode of Transaction" value={stay.modeOfPayment} />
            <Field label="Transaction ID" value={stay.transactionId} wide />
          </Fields>
        </Section>
      ) : (
        <Section title="Rental & Billing" onEdit={() => onEdit(2)}>
          <Fields>
            <Field label="Rental Amount (Base)" value={`${formatMoney(stay.rentAmount)} / month`} />
            <Field label="First Month" value={RENT_MODE_LABEL[stay.rentMode]} />
          </Fields>
          <ul className="m-0 mt-[12px] list-none divide-y divide-[#F2F4F7] border-t-[1px] border-solid border-[#F2F4F7] p-0">
            {!stay.isAdvanceRefused && Number(stay.advanceAmount) > 0 && (
              <ChargeRow
                label="Security deposit"
                tag="Refundable"
                tone="refundable"
                amount={formatMoney(stay.advanceAmount)}
              />
            )}
            {stay.nonRefundable.map((c) => (
              <ChargeRow
                key={`nr-${c.type}`}
                label={c.type}
                tag="Non-refundable"
                tone="nonRefundable"
                amount={formatMoney(c.amount)}
                sub="Deducted from the deposit"
              />
            ))}
            {stay.oneTime.map((c) => (
              <ChargeRow
                key={`ot-${c.type}`}
                label={c.type}
                tag="One-time"
                tone="oneTime"
                amount={formatMoney(c.amount)}
              />
            ))}
          </ul>
        </Section>
      )}

      {!isBooking && amenities.length > 0 && (
        <Section
          title="Amenities"
          onEdit={() => onEdit(2)}
          aside={
            amenities.length > 0 && (
              <span className="rounded-full bg-[#EEF1FD] px-[8px] py-[2px] text-[11px] font-medium text-[#1E45E1]">
                {amenities.length}
              </span>
            )
          }
        >
          {(
            <ul className="m-0 list-none divide-y divide-[#F2F4F7] p-0">
              {amenities.map((a) => (
                <ChargeRow
                  key={a.key}
                  label={a.name}
                  tag={a.oneTime ? "One-time" : a.prorated ? "Prorated" : a.frequency}
                  tone={a.oneTime ? "oneTime" : "estimate"}
                  sub={`${a.planName} · ${a.price}`}
                  amount={
                    <span className="flex flex-col items-end">
                      {formatMoney(a.estimate)}
                      <span className="text-[11px] font-medium text-[#6A7282]">
                        first charge (est.)
                      </span>
                    </span>
                  }
                />
              ))}
            </ul>
          )}
        </Section>
      )}

      {!isBooking && (docs.aadhaar || docs.pan) && (
        <Section title="Documents" onEdit={() => onEdit(3)}>
          <div className="grid grid-cols-1 gap-[12px] sm:grid-cols-2">
            {docs.aadhaar && <DocumentTile title="Aadhaar Card" file={docs.aadhaar} />}
            {docs.pan && <DocumentTile title="PAN Card" file={docs.pan} />}
          </div>
        </Section>
      )}

      {/* Billing summary (estimates; the backend calculates the invoices) */}
      <div className="rounded-[12px] bg-[#132197] p-[16px] text-white shadow-md">
        <p className="m-0 font-gilroy text-[11px] font-medium uppercase tracking-[0.8px] opacity-80">
          {isBooking ? "Booking summary" : "Billing summary · estimate"}
        </p>
        <p className="m-0 mt-[4px] font-gilroy text-[26px] font-semibold leading-[32px]">
          {isBooking ? formatMoney(stay.bookingAmount) : formatMoney(upfront)}
        </p>
        {!isBooking && (
          <ol className="m-0 mt-[12px] flex list-none flex-col gap-[6px] border-t-[1px] border-solid border-white/20 p-0 pt-[12px] font-gilroy text-[13px]">
            {deposit > 0 && (
              <li className="flex justify-between gap-[12px]">
                <span className="opacity-90">Security deposit (refundable)</span>
                <span>{formatMoney(deposit)}</span>
              </li>
            )}
            <li className="flex justify-between gap-[12px]">
              <span className="opacity-90">
                Base rent ({stay.rentMode === "prorated" ? "pro-rata, current month" : stay.rentMode === "custom" ? "custom" : "full"})
              </span>
              <span>{formatMoney(rentFirst)}</span>
            </li>
            {amenities.length > 0 && (
              <li className="flex justify-between gap-[12px]">
                <span className="opacity-90">Amenities (first charges)</span>
                <span>{formatMoney(amenityTotal)}</span>
              </li>
            )}
            {oneTimeTotal > 0 && (
              <li className="flex justify-between gap-[12px]">
                <span className="opacity-90">One-time payments</span>
                <span>{formatMoney(oneTimeTotal)}</span>
              </li>
            )}
          </ol>
        )}
      </div>
      {!isBooking && (
        <p className="m-0 -mt-[8px] px-[2px] font-gilroy text-[12px] text-[#6A7282]">
          Estimates only. The system calculates the final amounts on confirmation
          and raises separate invoices for the advance, base rent and amenities.
          Non-refundable charges are deducted from the deposit.
        </p>
      )}

      <label
        htmlFor="tenant-confirm"
        className="m-0 flex cursor-pointer items-center gap-[10px] rounded-[10px] bg-[#F9FAFB] px-[14px] py-[12px] font-gilroy text-[14px] font-medium text-[#0A090B]"
      >
        <input data-testid="tenant-preview-tenant-confirm-checkbox"
          id="tenant-confirm"
          type="checkbox"
          checked={confirmed}
          disabled={submitting}
          onChange={(e) => onConfirmChange(e.target.checked)}
          className="h-4 w-4 cursor-pointer accent-[#00A32E]"
        />
        {isBooking
          ? "Everything is Correct – Proceed to Book"
          : "Everything is Correct – Proceed to Check-in"}
      </label>

      {error && <ErrorMessage message={error} type="error" />}

      <div className={TENANT_FOOTER_CLASS}>
        <div className="flex items-center gap-[12px]">
          <button data-testid="tenant-preview-back-btn"
            type="button"
            onClick={onBack}
            disabled={submitting}
            className={TENANT_BTN_TERTIARY}
          >
            <ArrowLeft size="16" color="#344054" /> Back
          </button>
          <button data-testid="tenant-preview-save-draft-btn"
            type="button"
            onClick={onSaveDraft}
            disabled={submitting || draftSaving}
            className={TENANT_BTN_SECONDARY}
          >
            {draftSaving ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#1E45E1] border-t-transparent" />
                Saving...
              </>
            ) : (
              "Save Draft"
            )}
          </button>
        </div>
        <button data-testid="tenant-preview-confirm-btn"
          type="button"
          onClick={onConfirm}
          disabled={!confirmed || submitting || draftSaving || !canSubmit}
          className={TENANT_BTN_PRIMARY}
        >
          {submitting ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              {isBooking ? "Booking..." : "Checking in..."}
            </>
          ) : isBooking ? (
            "Confirm Booking"
          ) : (
            "Confirm Check-in"
          )}
        </button>
      </div>
    </div>
  );
}

TenantPreview.propTypes = {
  flow: PropTypes.oneOf(["checkin", "booking"]).isRequired,
  property: PropTypes.string,
  personal: PropTypes.shape({
    name: PropTypes.string,
    mobile: PropTypes.string,
    email: PropTypes.string,
    idProof: PropTypes.string,
    address: PropTypes.string,
    addressLater: PropTypes.bool,
    guardians: PropTypes.array,
  }).isRequired,
  // From Step 2 getSummary(): floor, room, bed, dates, rent, deposit, charges,
  // rentMode / rentFirst and amenities [{ key, name, planName, frequency, price,
  // oneTime, prorated, estimate }].
  stay: PropTypes.object.isRequired,
  docs: PropTypes.shape({ aadhaar: PropTypes.any, pan: PropTypes.any }).isRequired,
  confirmed: PropTypes.bool.isRequired,
  onConfirmChange: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onSaveDraft: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  draftSaving: PropTypes.bool,
  submitting: PropTypes.bool,
  canSubmit: PropTypes.bool,
  error: PropTypes.string,
};

export default TenantPreview;
