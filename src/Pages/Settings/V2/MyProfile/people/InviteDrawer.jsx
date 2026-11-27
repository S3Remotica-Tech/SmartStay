import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { DsButton, DsDrawer } from "../../../../../DesignSystem";
import ButtonSpinner from "../../../../../Utils/ButtonSpinner";
import { fieldLabelClass } from "../../../../../Utils/FieldStyles";
import PersonDetailsFields from "./PersonDetailsFields";
import { PropertyPicker } from "../properties/PropertyList";
import { inviteMaster, inviteStaff, reportApiError } from "../lib/myProfileService";
import { validatePersonForm } from "../lib/myProfileUtils";

/**
 * Invite a master / Invite staff (Figma 154:3715). Sends an invite link that
 * expires in 7 days; the person sets their own password.
 */
function InviteDrawer({ kind, properties, roleOptions, seats, initialPropertyIds = [], onClose, onInvited }) {
  const dispatch = useDispatch();
  const isMaster = kind === "master";
  const [values, setValues] = useState({
    name: "",
    mobile: "",
    email: "",
    role: null,
    propertyIds: initialPropertyIds,
  });
  const [errors, setErrors] = useState({});
  const [busy, setBusy] = useState(false);
  const seatsLeft = seats ? seats.total - seats.used : null;
  const noSeats = isMaster && seatsLeft !== null && seatsLeft <= 0;

  const update = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const submit = async (event) => {
    event.preventDefault();
    const found = validatePersonForm(values, { needRole: !isMaster, needProperties: true });
    setErrors(found);
    if (Object.keys(found).length > 0 || noSeats) return;
    setBusy(true);
    try {
      const form = {
        name: values.name.trim(),
        mobile: values.mobile,
        email: values.email.trim(),
        propertyIds: values.propertyIds,
      };
      if (isMaster) await inviteMaster(form);
      else await inviteStaff({ ...form, roleId: values.role.value, roleName: values.role.label });
      toast.success(`Invite sent to ${form.email}`);
      onInvited();
    } catch (error) {
      toast.error(reportApiError(error, dispatch));
      setBusy(false);
    }
  };

  return (
    <DsDrawer
      title={isMaster ? "Invite a master" : "Invite staff"}
      description={
        isMaster
          ? "They'll run every module in the properties you pick. The invite link expires in 7 days."
          : "They'll get the role's module access in the properties you pick. The invite link expires in 7 days."
      }
      onClose={() => !busy && onClose()}
      footer={
        <>
          {isMaster && seats && (
            <span className="text-[12px] leading-[17px] text-[color:var(--ds-text-secondary)]">
              {noSeats
                ? `All ${seats.total} master seats are in use`
                : `Uses 1 of your ${seats.total} master seats`}
            </span>
          )}
          <span className="flex-1" />
          <DsButton size="md" onClick={onClose} disabled={busy}>
            Cancel
          </DsButton>
          <DsButton size="md" variant="primary" type="submit" form="invite-person-form" disabled={busy || noSeats}>
            {busy ? <ButtonSpinner label="Sending..." /> : "Send invite"}
          </DsButton>
        </>
      }
    >
      <form id="invite-person-form" noValidate onSubmit={submit} className="flex flex-col gap-[20px]">
        <PersonDetailsFields
          idPrefix="invite"
          values={values}
          errors={errors}
          onChange={update}
          disabled={busy}
          roleOptions={isMaster ? undefined : roleOptions}
        />
        <fieldset className="m-0 flex flex-col border-0 p-0">
          <legend className={fieldLabelClass}>Assign Properties</legend>
          <PropertyPicker
            properties={properties}
            selected={values.propertyIds}
            onChange={(ids) => update("propertyIds", ids)}
            disabled={busy}
            showMasterHint={isMaster}
          />
          {errors.propertyIds && (
            <p className="mt-[6px] text-[12px] leading-[17px] text-[color:var(--ds-text-danger)]">
              {errors.propertyIds}
            </p>
          )}
        </fieldset>
      </form>
    </DsDrawer>
  );
}

InviteDrawer.propTypes = {
  kind: PropTypes.oneOf(["master", "staff"]).isRequired,
  properties: PropTypes.array.isRequired,
  roleOptions: PropTypes.array,
  seats: PropTypes.shape({ used: PropTypes.number, total: PropTypes.number }),
  initialPropertyIds: PropTypes.arrayOf(PropTypes.string),
  onClose: PropTypes.func.isRequired,
  onInvited: PropTypes.func.isRequired,
};

export default InviteDrawer;
