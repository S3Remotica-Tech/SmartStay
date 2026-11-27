import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  DsRoot,
  DsIcons,
  DsIcon,
  DsButton,
  DsSearchField,
  DsNavSection,
  DsNavItem,
  DsNavSubItem,
  DsPlanCard,
} from "../../../DesignSystem";
import Logout from "../../../Components/Logout";
import { PLAN_MOCK } from "./myProfileMock";

// Settings layout on Design System v2 (Figma 153:2496): top bar, grouped
// nav with the plan card + Log out pinned to the bottom, page in <Outlet/>.
// Routes are the same as SettingAllPages, so every existing settings page
// still opens inside this shell.

const isDevelopment = import.meta.env.MODE === "development";

// [label, route, extra routes that keep the item active]
const NAV_GROUPS = [
  {
    section: "Account",
    items: [{ id: "general", label: "My profile", icon: DsIcons.user, subs: [["My profile", "general"]] }],
  },
  {
    section: "Workspace",
    items: [
      {
        id: "organization",
        label: "Organization",
        icon: DsIcons.buildingOffice,
        subs: [
          ["Manage PG", "manage-pg"],
          ...(isDevelopment ? [["Manage PG New", "manage-pg-new"]] : []),
          ["Security", "security"],
          ["Integration", "integration"],
        ],
      },
      {
        id: "pg-configuration",
        label: "PG configuration",
        icon: DsIcons.cogNav,
        subs: [
          ["Electricity", "electricity", ["electricity-rule"]],
          ["Billing rule", "billing-rule", ["long-stay-recurring"]],
          ["Notifications", "notifications"],
          ["Bill templates", "invoice"],
          ...(isDevelopment ? [["Bill templates new", "bill-templates"]] : []),
          ["Agreements & policies", "agreement", ["add-template"]],
        ],
      },
      {
        id: "lists-categories",
        label: "Lists & categories",
        icon: DsIcons.squares2x2,
        subs: [
          ["Expense category", "expenses"],
          ["Vendor categories", "vendor-category"],
          ["Complaints category", "complaints"],
          ["Amenities", "amenities"],
        ],
      },
      {
        id: "user-management",
        label: "Roles & permissions",
        icon: DsIcons.lockNav,
        subs: [
          ["Staff", "user"],
          ["Roles & permissions", "role"],
        ],
      },
      {
        id: "tenant-app-controls",
        label: "Tenant app controls",
        icon: DsIcons.devicePhoneMobile,
        subs: [["Tenant app controls", "tenant-app-controls"]],
      },
    ],
  },
  {
    section: "Billing",
    items: [
      {
        id: "billing",
        label: "Subscription & billing",
        icon: DsIcons.banknotes,
        subs: [["Subscription", "subscription", ["allplans"]]],
      },
    ],
  },
];

const ALL_ITEMS = NAV_GROUPS.flatMap((g) => g.items);

const subMatches = ([, route, extra = []], segment) => route === segment || extra.includes(segment);

function SettingsShellV2() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = useSelector((state) => state);

  const [search, setSearch] = useState("");
  const [activeMenu, setActiveMenu] = useState("general");
  const [showLogout, setShowLogout] = useState(false);

  const lastSegment = location.pathname.split("/").filter(Boolean).pop();
  const isBillTemplatesNew = location.pathname.endsWith("/bill-templates");

  useEffect(() => {
    if (!lastSegment) return;
    const owner = ALL_ITEMS.find((item) => item.subs.some((sub) => subMatches(sub, lastSegment)));
    if (owner) setActiveMenu(owner.id);
  }, [lastSegment]);

  const goTo = (route) => {
    const hostelId = state.login?.selectedHostel_Id;
    navigate(hostelId ? `/settings/${hostelId}/${route}` : `/settings/${route}`);
  };

  useEffect(() => {
    if (state.PgList?.isManageEnable) {
      goTo("manage-pg");
    }
    // Run only when the "open Manage PG" request flips, as SettingAllPages does.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.PgList?.isManageEnable]);

  const handleClose = () => {
    const hostelId = state.login?.selectedHostel_Id;
    navigate(hostelId ? `/dashboard/${hostelId}` : "/dashboard", { replace: true });
  };

  // Search matches a group label or any of its sub-page labels.
  const query = search.trim().toLowerCase();
  const visibleGroups = useMemo(() => {
    if (!query) return NAV_GROUPS;
    return NAV_GROUPS.map((group) => ({
      ...group,
      items: group.items.filter(
        (item) =>
          item.label.toLowerCase().includes(query) ||
          item.subs.some(([label]) => label.toLowerCase().includes(query)),
      ),
    })).filter((group) => group.items.length > 0);
  }, [query]);

  // Same rule as SettingAllPages: the full-width bill template editor hides the nav.
  const showNav = !isBillTemplatesNew;

  return (
    <DsRoot className="flex h-screen flex-col overflow-hidden bg-[var(--ds-bg-canvas)]">
      {/* Top bar */}
      <header className="z-40 flex h-[56px] w-full shrink-0 items-center gap-[12px] border-b-[1px] border-solid border-[color:var(--ds-border-default)] bg-[var(--ds-bg-surface)] px-[16px] lg:px-[24px]">
        <div className="flex shrink-0 items-center gap-[6px]">
          <span className="flex h-[36px] w-[33px] items-center justify-center">
            <DsIcon src={DsIcons.cog6Tooth} />
          </span>
          <span className="text-[18px] font-semibold leading-[26px] text-[color:var(--ds-text-default)]">Settings</span>
        </div>
        <span className="flex-1" />
        <DsSearchField
          value={search}
          onChange={setSearch}
          placeholder={'Search settings — try "late fee" or "m-PIN"'}
          label="Search settings"
          className="hidden w-[400px] md:block"
        />
        <span className="flex-1" />
        <DsButton variant="secondary" leadingIcon={DsIcons.xMark} onClick={handleClose}>
          Close settings
        </DsButton>
      </header>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        {showNav && (
          <nav
            aria-label="Settings"
            className="flex w-[232px] shrink-0 flex-col gap-[2px] overflow-y-auto border-r-[1px] border-solid border-[color:var(--ds-border-default)] bg-[var(--ds-bg-surface)] px-[16px] pb-[20px] lg:w-[264px]"
          >
            {visibleGroups.map((group) => (
              <React.Fragment key={group.section}>
                <DsNavSection>{group.section}</DsNavSection>
                {group.items.map((item) => {
                  const isActive = activeMenu === item.id;
                  const expanded = item.subs.length > 1 && (isActive || Boolean(query));
                  return (
                    <React.Fragment key={item.id}>
                      <DsNavItem
                        icon={item.icon}
                        label={item.label}
                        active={isActive}
                        onClick={() => {
                          setActiveMenu(item.id);
                          goTo(item.subs[0][1]);
                        }}
                      />
                      {expanded &&
                        item.subs.map((sub) => (
                          <DsNavSubItem
                            key={sub[1]}
                            label={sub[0]}
                            active={subMatches(sub, lastSegment)}
                            onClick={() => {
                              setActiveMenu(item.id);
                              goTo(sub[1]);
                            }}
                          />
                        ))}
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            ))}
            {visibleGroups.length === 0 && (
              <p className="px-[12px] pt-[16px] text-[13px] leading-[19px] text-[color:var(--ds-text-placeholder)]">
                No settings match “{search}”.
              </p>
            )}

            <span className="min-h-[24px] w-full flex-1" />

            <div className="flex w-full shrink-0 flex-col gap-[6px]">
              <DsPlanCard {...PLAN_MOCK} onManage={() => goTo("subscription")} />
              <DsNavItem
                icon={DsIcons.arrowRightStartOnRectangle}
                label="Log out"
                tone="danger"
                onClick={() => setShowLogout(true)}
              />
            </div>
          </nav>
        )}

        <main className="min-h-0 min-w-0 flex-1 overflow-y-auto bg-[var(--ds-bg-surface)]">
          <Outlet />
        </main>
      </div>

      {showLogout && <Logout show={showLogout} handleClose={() => setShowLogout(false)} />}
    </DsRoot>
  );
}

export default SettingsShellV2;
