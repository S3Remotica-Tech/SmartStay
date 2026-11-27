import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CameraIcon, CheckIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { DsAvatar, DsButton, DsDrawer, DsIcon } from "../../../../../DesignSystem";
import ButtonSpinner from "../../../../../Utils/ButtonSpinner";
import {
  fieldClass,
  fieldGroupClass,
  fieldHelperClass,
  fieldInnerInputClass,
  fieldLabelClass,
  fieldRequiredClass,
} from "../../../../../Utils/FieldStyles";
import { saveProfileExtras, splitName } from "../lib/myProfileService";
import { initialsOf, isValidEmail, localMobile } from "../lib/myProfileUtils";

const ERROR_CLASS = "mt-[6px] text-[12px] leading-[17px] text-[color:var(--ds-text-danger)]";
const MAX_PHOTO_BYTES = 5 * 1024 * 1024;
const SAVE_TIMEOUT_MS = 30000;

function photoCaption(file, hasPhoto) {
  if (file) return `${file.name} · ${Math.max(1, Math.round(file.size / 1024))} KB`;
  return hasPhoto ? "Current photo" : "No photo yet";
}

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Enter your full name";
  if (!values.mobile) errors.mobile = "Enter your mobile number";
  else if (!/^[6-9]\d{9}$/.test(values.mobile)) errors.mobile = "Enter a valid 10-digit mobile number";
  if (!values.email.trim()) errors.email = "Enter your email address";
  else if (!isValidEmail(values.email)) errors.email = "Enter a valid email address";
  if (values.alternateMobile && !/^[6-9]\d{9}$/.test(values.alternateMobile)) {
    errors.alternateMobile = "Enter a valid 10-digit mobile number";
  } else if (values.alternateMobile && values.alternateMobile === values.mobile) {
    errors.alternateMobile = "Use a different number from your mobile number";
  }
  return errors;
}

/**
 * Edit profile drawer for the signed-in Admin (Figma 153:2909): photo picker,
 * full name, mobile (+91, Verified while unchanged), email, alternate mobile
 * and residential address.
 *
 * Name / mobile / email / photo save through the existing PROFILE-UPDATE saga
 * (PUT /v2/profile), which also shows its own success toast and maps the
 * email / mobile conflicts. Alternate mobile and address have no API field
 * yet and go through the dummy saveProfileExtras (myProfileService.js).
 */
function EditProfileDrawer({ extras, onExtrasSaved, onClose }) {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.createAccount?.accountList) || {};
  const updateStatus = useSelector((state) => state.createAccount?.statuscodeforUpdateprofile);
  const emailConflict = useSelector((state) => state.createAccount?.profileUpdateEmailError);
  const mobileConflict = useSelector((state) => state.createAccount?.profileUpdateMobileError);
  const accessError = useSelector((state) => state.UsersList?.accessRestrictionError);
  const networkError = useSelector((state) => state.createAccount?.networkError);
  const fileRef = useRef(null);

  const savedPhoto = account.profilePic && account.profilePic !== "0" ? account.profilePic : "";
  const [values, setValues] = useState({
    name: [account.firstName, account.lastName].filter(Boolean).join(" "),
    mobile: localMobile(account.mobileNo),
    email: account.mailId || "",
    alternateMobile: localMobile(extras.alternateMobile),
    address: extras.address || "",
  });
  const [photo, setPhoto] = useState(null); // { file, url }
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const extrasSaved = useRef(null);

  const mobileUnchanged = values.mobile === localMobile(account.mobileNo);

  // Clear stale results from an earlier attempt (conflicts, a status code left
  // by a save that finished after the drawer closed, network/access errors),
  // so none of them ends or blocks this save.
  useEffect(() => {
    dispatch({ type: "REMOVE_UPDATE_PROFILE_ERROR" });
    dispatch({ type: "REMOVE_UPDATE_PROFILE_PHONE_NUM_ERROR" });
    dispatch({ type: "CLEAR_UPDATE_STATUS_CODE_ACCOUNT" });
    dispatch({ type: "CLEAR_NETWORK_ERROR" });
    dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
  }, [dispatch]);

  useEffect(() => () => photo && URL.revokeObjectURL(photo.url), [photo]);

  // PROFILE-UPDATE finished.
  useEffect(() => {
    if (!saving || !updateStatus) return;
    dispatch({ type: "ACCOUNTDETAILS" });
    dispatch({ type: "CLEAR_UPDATE_STATUS_CODE_ACCOUNT" });
    if (extrasSaved.current) onExtrasSaved(extrasSaved.current);
    setSaving(false);
    onClose();
  }, [saving, updateStatus, dispatch, onExtrasSaved, onClose]);

  // Email / mobile already used: the field shows the conflict. No permission
  // or no network: say so. Either way stop the spinner so the form can be
  // fixed or retried.
  useEffect(() => {
    if (!saving) return;
    if (accessError || networkError) {
      toast.error(`Your profile wasn't saved. ${String(accessError || networkError)}`);
      setSaving(false);
    } else if (emailConflict || mobileConflict) {
      setSaving(false);
    }
  }, [saving, emailConflict, mobileConflict, accessError, networkError]);

  // Any other failure (the saga reports e.g. a 400 / 413 as an empty email
  // error, so nothing above fires): give up after a while instead of
  // spinning forever.
  useEffect(() => {
    if (!saving) return undefined;
    const timer = setTimeout(() => {
      setSaving(false);
      toast.error("Your profile may not have been saved. Reopen it to check, then try again.");
    }, SAVE_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [saving]);

  const update = (field, value) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
    if (field === "email") dispatch({ type: "REMOVE_UPDATE_PROFILE_ERROR" });
    if (field === "mobile") dispatch({ type: "REMOVE_UPDATE_PROFILE_PHONE_NUM_ERROR" });
  };

  const choosePhoto = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, photo: "Choose an image file (JPG or PNG)" }));
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setErrors((prev) => ({ ...prev, photo: "Choose an image under 5 MB" }));
      return;
    }
    setErrors((prev) => ({ ...prev, photo: undefined }));
    setPhoto({ file, url: URL.createObjectURL(file) });
  };

  const removePhoto = () => {
    if (photo) {
      setPhoto(null);
      return;
    }
    // DUMMY: PUT /v2/profile can't clear a saved photo yet.
    toast.info("Removing a saved photo isn't available yet.");
  };

  const save = async (event) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    dispatch({ type: "CLEAR_NETWORK_ERROR" });
    dispatch({ type: "ACCESS_RESTRICTION_ERROR_REMOVE" });
    setSaving(true);
    try {
      extrasSaved.current = await saveProfileExtras({
        alternateMobile: values.alternateMobile,
        address: values.address.trim(),
      });
    } catch (err) {
      // Not via reportApiError: a global NETWORK_ERROR here would stop the
      // spinner while PROFILE-UPDATE is still in flight.
      toast.error(`Alternate mobile and address weren't saved. ${err?.message || ""}`.trim());
      extrasSaved.current = null;
    }
    const { firstName, lastName } = splitName(values.name);
    dispatch({
      type: "PROFILE-UPDATE",
      payload: {
        profilePic: photo?.file || null,
        payloads: { firstName, lastName, emailId: values.email.trim(), mobile: values.mobile },
      },
    });
  };

  const mobileError = errors.mobile || mobileConflict;
  const emailError = errors.email || emailConflict;

  return (
    <DsDrawer
      title="Edit profile"
      description="Your name, mobile and email appear on agreements and tenant messages."
      onClose={onClose}
      footer={
        <>
          <span className="flex-1" />
          <DsButton size="md" onClick={onClose}>
            Cancel
          </DsButton>
          <DsButton size="md" variant="primary" type="submit" form="edit-profile-form" disabled={saving}>
            {saving ? <ButtonSpinner label="Saving..." /> : "Save changes"}
          </DsButton>
        </>
      }
    >
      <form id="edit-profile-form" noValidate onSubmit={save} className="flex flex-col gap-[20px]">
        {/* Profile photo picker */}
        <div className="flex items-center gap-[20px]">
          <DsAvatar
            size={96}
            src={photo?.url || savedPhoto || undefined}
            initials={account.initial || initialsOf(values.name)}
            alt={values.name}
            action={
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={saving}
                aria-label="Change photo"
                className="flex size-[30px] items-center justify-center rounded-full border-[1px] border-solid border-[color:var(--ds-border-default)] bg-[var(--ds-bg-surface)] text-[color:var(--ds-text-default)] shadow-[var(--ds-shadow-xs)]"
              >
                <DsIcon src={PencilSquareIcon} size={16} />
              </button>
            }
          />
          <div className="flex min-w-0 flex-1 flex-col gap-[4px]">
            <span className="text-[16px] font-medium leading-[24px] text-[color:var(--ds-text-default)]">
              Profile photo
            </span>
            <span className="truncate text-[12px] leading-[16px] text-[color:var(--ds-text-secondary)]">
              {photoCaption(photo?.file, Boolean(savedPhoto))}
            </span>
            <div className="flex flex-wrap items-center gap-[8px] pt-[6px]">
              <DsButton onClick={() => fileRef.current?.click()} disabled={saving}>
                <DsIcon src={CameraIcon} size={16} />
                Change photo
              </DsButton>
              {(photo || savedPhoto) && (
                <button
                  type="button"
                  onClick={removePhoto}
                  disabled={saving}
                  className="h-[32px] rounded-[var(--ds-radius-sm)] px-[12px] text-[12px] font-medium leading-[16px] text-[color:var(--ds-text-danger)] hover:bg-[var(--ds-bg-surface-hover)]"
                >
                  Remove
                </button>
              )}
            </div>
            {errors.photo && <p className={ERROR_CLASS}>{errors.photo}</p>}
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={choosePhoto} />
          </div>
        </div>

        {/* Full name */}
        <div className="flex flex-col">
          <label htmlFor="edit-profile-name" className={fieldLabelClass}>
            Full name<span className={fieldRequiredClass}>*</span>
          </label>
          <input
            id="edit-profile-name"
            data-autofocus
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => update("name", event.target.value)}
            disabled={saving}
            aria-invalid={Boolean(errors.name) || undefined}
            aria-describedby="edit-profile-name-help"
            className={fieldClass(Boolean(errors.name))}
            placeholder="Enter your full name"
          />
          {errors.name ? (
            <p id="edit-profile-name-help" className={ERROR_CLASS}>{errors.name}</p>
          ) : (
            <p id="edit-profile-name-help" className={fieldHelperClass}>
              As per your government ID — printed on agreements.
            </p>
          )}
        </div>

        {/* Mobile number */}
        <div className="flex flex-col">
          <label htmlFor="edit-profile-mobile" className={fieldLabelClass}>
            Mobile number<span className={fieldRequiredClass}>*</span>
          </label>
          <div className={fieldGroupClass(Boolean(mobileError))}>
            <span className="shrink-0 border-r-[1px] border-solid border-[color:var(--ds-border-default)] pr-[10px] text-[14px] font-medium text-[color:var(--ds-text-default)]">
              +91
            </span>
            <input
              id="edit-profile-mobile"
              type="tel"
              inputMode="numeric"
              autoComplete="tel-national"
              maxLength={10}
              value={values.mobile}
              onChange={(event) => update("mobile", event.target.value.replace(/\D/g, ""))}
              disabled={saving}
              aria-invalid={Boolean(mobileError) || undefined}
              aria-describedby={mobileError ? "edit-profile-mobile-error" : undefined}
              className={fieldInnerInputClass}
              placeholder="98765 43210"
            />
            {mobileUnchanged && values.mobile && (
              <span className="flex shrink-0 items-center gap-[6px] text-[12px] font-medium leading-[16px] text-[color:var(--ds-text-success)]">
                <DsIcon src={CheckIcon} size={16} />
                Verified
              </span>
            )}
          </div>
          {mobileError && (
            <p id="edit-profile-mobile-error" className={ERROR_CLASS}>{mobileError}</p>
          )}
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="edit-profile-email" className={fieldLabelClass}>
            Email<span className={fieldRequiredClass}>*</span>
          </label>
          <input
            id="edit-profile-email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => update("email", event.target.value.toLowerCase())}
            disabled={saving}
            aria-invalid={Boolean(emailError) || undefined}
            aria-describedby="edit-profile-email-help"
            className={fieldClass(Boolean(emailError))}
            placeholder="name@example.com"
          />
          {emailError ? (
            <p id="edit-profile-email-help" className={ERROR_CLASS}>{emailError}</p>
          ) : (
            <p id="edit-profile-email-help" className={fieldHelperClass}>
              Used for sign-in and account notices.
            </p>
          )}
        </div>

        {/* Alternate mobile (no API field yet) */}
        <div className="flex flex-col">
          <label htmlFor="edit-profile-alt-mobile" className={fieldLabelClass}>
            Alternate mobile
          </label>
          <div className={fieldGroupClass(Boolean(errors.alternateMobile))}>
            <span className="shrink-0 border-r-[1px] border-solid border-[color:var(--ds-border-default)] pr-[10px] text-[14px] font-medium text-[color:var(--ds-text-default)]">
              +91
            </span>
            <input
              id="edit-profile-alt-mobile"
              type="tel"
              inputMode="numeric"
              autoComplete="off"
              maxLength={10}
              value={values.alternateMobile}
              onChange={(event) => update("alternateMobile", event.target.value.replace(/\D/g, ""))}
              disabled={saving}
              aria-invalid={Boolean(errors.alternateMobile) || undefined}
              aria-describedby={errors.alternateMobile ? "edit-profile-alt-mobile-error" : undefined}
              className={fieldInnerInputClass}
              placeholder="98765 43210"
            />
          </div>
          {!errors.alternateMobile && (
            <p className={fieldHelperClass}>A backup number for urgent tenant calls</p>
          )}
          {errors.alternateMobile && (
            <p id="edit-profile-alt-mobile-error" className={ERROR_CLASS}>{errors.alternateMobile}</p>
          )}
        </div>

        {/* Residential address (no API field yet) */}
        <div className="flex flex-col">
          <label htmlFor="edit-profile-address" className={fieldLabelClass}>
            Residential address
          </label>
          <textarea
            id="edit-profile-address"
            rows={3}
            value={values.address}
            onChange={(event) => update("address", event.target.value)}
            disabled={saving}
            className={`${fieldClass(false)} !h-auto min-h-[88px] resize-none py-[12px]`}
            placeholder="House no, street, area, city, PIN"
          />
        </div>
      </form>
    </DsDrawer>
  );
}

EditProfileDrawer.propTypes = {
  extras: PropTypes.shape({
    alternateMobile: PropTypes.string,
    address: PropTypes.string,
  }).isRequired,
  onExtrasSaved: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default EditProfileDrawer;
