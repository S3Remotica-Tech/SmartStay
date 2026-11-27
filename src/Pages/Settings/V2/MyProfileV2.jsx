import React, { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  DsIcons,
  DsButton,
  DsIconButton,
  DsBadge,
  DsAvatar,
  DsTabs,
  DsPageHeader,
  DsCard,
  DsSectionHeader,
  DsDescriptionItem,
  DsTimelineItem,
  DsLinkRow,
  DsProgress,
  DsTextLink,
  DsMetaItem,
  DsPopover,
  DsCopyButton,
  DsIcon,
} from "../../../DesignSystem";
import { useHasPermission } from "../../../Utils/Permission";
import PermissionDeniedMessage from "../../../Utils/PermissionDeniedMessage";
import withErrorBoundary from "../../../Hoc/WithErrorBountry";
import Skeleton from "../../../Utils/Skeleton";
import AdminChangePassword from "../AdminChangePassword";
import EditProfileDrawer from "./MyProfile/profile/EditProfileDrawer";
import MastersTab from "./MyProfile/tabs/MastersTab";
import StaffTab from "./MyProfile/tabs/StaffTab";
import PropertiesTab from "./MyProfile/tabs/PropertiesTab";
import PropertiesLoadState from "./MyProfile/tabs/PropertiesLoadState";
import ActivityDrawer from "./MyProfile/profile/ActivityDrawer";
import useMyProfileViewer from "./MyProfile/hooks/useMyProfileViewer";
import useTeamCounts from "./MyProfile/hooks/useTeamCounts";
import {
  PROFILE_EXTRAS_MOCK,
  ACCOUNT_SETTINGS_MOCK,
  RECENT_ACTIVITY_MOCK,
} from "./myProfileMock";

// My profile · Overview on Design System v2 (Figma 153:2496).
// Name / phone / email / photo / role come from the account API; the rest is
// placeholder data (see myProfileMock.js) until those APIs exist.

const comingSoon = () => toast.info("Coming soon");

function MyProfileV2() {
  const state = useSelector((state) => state);
  const account = state.createAccount?.accountList || {};
  // accountList starts as [] until ACCOUNTDETAILS (dispatched by Sidebar) returns.
  const accountLoaded = Boolean(account.firstName || account.mailId || account.mobileNo);
  // Alternate mobile / address have no API yet; Edit profile updates them here.
  const [extras, setExtras] = useState(PROFILE_EXTRAS_MOCK);
  const onExtrasSaved = useCallback((saved) => setExtras((prev) => ({ ...prev, ...saved })), []);

  const [activeTab, setActiveTab] = useState("overview");
  const [showEdit, setShowEdit] = useState(false);
  const closeEdit = useCallback(() => setShowEdit(false), []);
  const [showPassword, setShowPassword] = useState(false);
  const [showMyActivity, setShowMyActivity] = useState(false);
  // Masters / Managed staffs / Properties tabs (./MyProfile).
  const [teamVersion, setTeamVersion] = useState(0);
  const [teamPropertyFilter, setTeamPropertyFilter] = useState("");
  const { viewer, properties, propertiesStatus, propertiesError, reloadProperties } = useMyProfileViewer();
  const teamCounts = useTeamCounts(viewer, properties, teamVersion);
  const onTeamChanged = useCallback(() => setTeamVersion((version) => version + 1), []);
  const viewTeam = (propertyId) => {
    setTeamPropertyFilter(propertyId);
    setActiveTab("users");
  };

  const { canReadModule: canReadProfile, canUpdateModule: canUpdateProfile } = useHasPermission("User");

  const fullName = [account.firstName, account.lastName].filter(Boolean).join(" ");
  const initials =
    account.initial ||
    fullName
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2);
  const mobile = account.mobileNo
    ? [account.countryCode && `+${account.countryCode}`, account.mobileNo].filter(Boolean).join(" ")
    : "";

  const openEdit = () => canUpdateProfile && setShowEdit(true);

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "masters", label: "Masters", count: teamCounts.masters },
    { key: "users", label: "Managed staffs", count: teamCounts.users },
    {
      key: "properties",
      label: "Properties",
      count: propertiesStatus === "ready" ? teamCounts.properties : undefined,
    },
  ];
  const changeTab = (key) => {
    if (key !== "users") setTeamPropertyFilter("");
    setActiveTab(key);
  };

  if (!canReadProfile) {
    return <PermissionDeniedMessage />;
  }

  const accountSettingsMenu = (
    <DsPopover
      label="Account settings"
      trigger={({ open, toggle }) => (
        <DsButton
          variant="secondary"
          trailingIcon={DsIcons.chevronDown}
          onClick={toggle}
          aria-expanded={open}
          aria-haspopup="dialog"
        >
          Manage account
        </DsButton>
      )}
    >
      {({ close }) => (
        <>
          <DsSectionHeader title="Account settings" description="Things you set once and rarely change." />
          <div className="flex flex-col">
            <DsLinkRow
              icon={DsIcons.lockClosed}
              title="Sign-in & security"
              badge={
                ACCOUNT_SETTINGS_MOCK.securityActionNeeded && (
                  <DsBadge tone="warning" dot={DsIcons.dotWarning}>
                    Action needed
                  </DsBadge>
                )
              }
              description={ACCOUNT_SETTINGS_MOCK.passwordChanged}
              disabled={!canUpdateProfile}
              onClick={() => {
                close();
                setShowPassword(true);
              }}
            />
            <DsLinkRow
              icon={DsIcons.pencilSquare}
              title="E-signature"
              description={ACCOUNT_SETTINGS_MOCK.eSignature}
              onClick={() => {
                close();
                comingSoon();
              }}
            />
            <DsLinkRow
              icon={DsIcons.globeAlt}
              title="Preferences"
              description={ACCOUNT_SETTINGS_MOCK.preferences}
              last
              onClick={() => {
                close();
                comingSoon();
              }}
            />
          </div>
        </>
      )}
    </DsPopover>
  );

  return (
    <div className="flex min-h-full flex-col bg-[var(--ds-bg-canvas)]">
      <DsPageHeader
        title="My profile"
        description="Your details, the people who work with you and the properties you run."
        actions={
          <>
            {accountSettingsMenu}
            <DsButton
              variant="primary"
              leadingIcon={DsIcons.pencilSquareWhite}
              onClick={openEdit}
              disabled={!canUpdateProfile}
            >
              Edit profile
            </DsButton>
          </>
        }
        tabs={<DsTabs items={tabs} value={activeTab} onChange={changeTab} />}
        stickyTabs
      />

      <div
        role="tabpanel"
        id={`ds-tabpanel-${activeTab}`}
        aria-labelledby={`ds-tab-${activeTab}`}
        className="flex w-full flex-col gap-[12px] p-[16px] lg:p-[20px]"
      >
        {activeTab === "overview" && !accountLoaded && (
          <DsCard className="flex w-full items-center gap-[24px] px-[24px] py-[20px]" aria-busy="true">
            <Skeleton className="size-[88px]" rounded="rounded-full" />
            <div className="flex flex-1 flex-col gap-[10px]">
              <Skeleton className="h-[28px] w-[240px]" />
              <Skeleton className="h-[22px] w-[160px]" />
              <Skeleton className="h-[16px] w-[320px] max-w-full" />
              <Skeleton className="h-[16px] w-[280px] max-w-full" />
            </div>
          </DsCard>
        )}

        {activeTab === "overview" && accountLoaded && (
          <>
            {/* Profile summary */}
            <DsCard className="flex w-full flex-wrap items-center gap-[24px] px-[24px] py-[20px]">
              <DsAvatar
                size={88}
                src={account.profilePic && account.profilePic !== "0" ? account.profilePic : undefined}
                initials={initials}
                alt={fullName}
                action={
                  <DsIconButton
                    icon={DsIcons.camera}
                    label="Change photo"
                    onClick={openEdit}
                    disabled={!canUpdateProfile}
                  />
                }
              />

              <div className="flex min-w-[260px] flex-1 flex-col items-start gap-[10px]">
                <div className="flex flex-wrap items-center gap-[10px]">
                  <span className="text-[22px] font-semibold capitalize leading-[32px] text-[color:var(--ds-text-default)]">
                    {fullName || "—"}
                  </span>
                  {account.roleName && <DsBadge tone="warning">{account.roleName}</DsBadge>}
                  <DsBadge tone="neutral">Owner · {extras.orgName}</DsBadge>
                </div>

                <div className="flex items-center gap-[6px] rounded-[var(--ds-radius-sm)] border-[1px] border-solid border-[color:var(--ds-border-default)] bg-[var(--ds-bg-surface-subtle)] px-[8px] py-[4px]">
                  <span className="text-[12px] leading-[17px] text-[color:var(--ds-text-secondary)]">User ID</span>
                  <span className="text-[12px] font-semibold leading-[17px] text-[color:var(--ds-text-default)]">
                    {extras.userId}
                  </span>
                  <DsCopyButton value={extras.userId} label="Copy user ID" />
                </div>

                <div className="flex flex-wrap items-center gap-x-[20px] gap-y-[6px]">
                  {mobile && <DsMetaItem icon={DsIcons.phone} text={mobile} />}
                  {account.mailId && (
                    <DsMetaItem icon={DsIcons.envelope} text={account.mailId}>
                      {extras.emailVerified && (
                        <span className="flex shrink-0 items-center gap-[4px]">
                          <DsIcon src={DsIcons.checkCircle} />
                          <span className="text-[12px] font-medium leading-[17px] text-[color:var(--ds-text-success)]">
                            Verified
                          </span>
                        </span>
                      )}
                    </DsMetaItem>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-x-[20px] gap-y-[6px]">
                  <DsMetaItem icon={DsIcons.calendar} text={`Member since ${extras.memberSince}`} />
                  <DsMetaItem icon={DsIcons.clock} text={`Last login ${extras.lastLogin}`} />
                </div>
              </div>

              <div className="flex w-full flex-col items-start gap-[8px] rounded-[var(--ds-radius-md)] bg-[var(--ds-bg-surface-subtle)] p-[16px] lg:w-[280px]">
                <div className="flex w-full items-center">
                  <span className="text-[13px] font-medium leading-[19px] text-[color:var(--ds-text-default)]">
                    Profile strength
                  </span>
                  <span className="flex-1" />
                  <span className="text-[13px] font-semibold leading-[19px] text-[color:var(--ds-text-primary)]">
                    {extras.profileStrength}%
                  </span>
                </div>
                <DsProgress value={extras.profileStrength} label="Profile strength" />
                <p className="text-[12px] leading-[17px] text-[color:var(--ds-text-secondary)]">
                  {extras.profileStrengthHint}
                </p>
                <DsTextLink onClick={openEdit} disabled={!canUpdateProfile}>
                  Complete profile
                </DsTextLink>
              </div>
            </DsCard>

            <div className="flex w-full flex-col items-start gap-[12px] xl:flex-row">
              {/* Personal details */}
              <DsCard className="flex w-full min-w-0 flex-1 flex-col gap-[16px] px-[24px] py-[20px]">
                <DsSectionHeader
                  title="Personal details"
                  description="Shown on bills, agreements and receipts you issue."
                  divider
                  action={
                    <DsButton variant="secondary" onClick={openEdit} disabled={!canUpdateProfile}>
                      Edit
                    </DsButton>
                  }
                />
                <dl className="m-0 flex w-full flex-col">
                  <DsDescriptionItem label="Full name" value={fullName} />
                  <DsDescriptionItem
                    label="Mobile number"
                    value={mobile}
                    copyValue={mobile.replace(/\s/g, "")}
                    copyLabel="Copy mobile number"
                  />
                  <DsDescriptionItem
                    label="Email"
                    value={account.mailId}
                    copyValue={account.mailId}
                    copyLabel="Copy email"
                  />
                  <DsDescriptionItem
                    label="Alternate mobile"
                    value={extras.alternateMobile || "Not added"}
                    muted={!extras.alternateMobile}
                    copyValue={extras.alternateMobile}
                    copyLabel="Copy alternate mobile"
                  />
                  <DsDescriptionItem label="Residential address" value={extras.address} />
                  <DsDescriptionItem label="Government ID" value={extras.governmentId} />
                </dl>
              </DsCard>

              {/* Recent activity */}
              <DsCard className="flex w-full shrink-0 flex-col gap-[8px] p-[20px] xl:w-[360px]">
                <div className="h-[48px]">
                  <DsSectionHeader
                    title="Recent activity"
                    action={
                      <DsButton variant="secondary" onClick={() => setShowMyActivity(true)}>
                        View all
                      </DsButton>
                    }
                  />
                </div>
                <ol className="m-0 flex list-none flex-col p-0">
                  {RECENT_ACTIVITY_MOCK.map((item, index) => (
                    <DsTimelineItem
                      key={item.id}
                      icon={item.tone === "stage" ? DsIcons.arrowRight : DsIcons.bell}
                      tone={item.tone}
                      who={item.who}
                      what={item.what}
                      when={item.when}
                      last={index === RECENT_ACTIVITY_MOCK.length - 1}
                    />
                  ))}
                </ol>
              </DsCard>
            </div>
          </>
        )}

        {(activeTab === "masters" || activeTab === "users") && propertiesStatus !== "ready" && (
          <PropertiesLoadState status={propertiesStatus} error={propertiesError} onRetry={reloadProperties} />
        )}

        {activeTab === "masters" && propertiesStatus === "ready" && (
          <MastersTab viewer={viewer} properties={properties} onChanged={onTeamChanged} />
        )}

        {activeTab === "users" && propertiesStatus === "ready" && (
          <StaffTab
            key={teamPropertyFilter}
            viewer={viewer}
            properties={properties}
            initialPropertyId={teamPropertyFilter || undefined}
            onChanged={onTeamChanged}
          />
        )}

        {activeTab === "properties" && (
          <PropertiesTab
            viewer={viewer}
            properties={properties}
            status={propertiesStatus}
            error={propertiesError}
            onRetry={reloadProperties}
            onViewTeam={viewTeam}
            onChanged={onTeamChanged}
          />
        )}
      </div>

      {showMyActivity && <ActivityDrawer onClose={() => setShowMyActivity(false)} />}
      {showEdit && <EditProfileDrawer extras={extras} onExtrasSaved={onExtrasSaved} onClose={closeEdit} />}
      {showPassword && <AdminChangePassword show={showPassword} handleClose={() => setShowPassword(false)} />}
    </div>
  );
}

export default withErrorBoundary(MyProfileV2);
