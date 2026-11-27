// Label + Heroicon for every row / card action (menus and drawer buttons).
import {
  ArrowPathIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowsRightLeftIcon,
  ClockIcon,
  KeyIcon,
  PaperAirplaneIcon,
  PencilSquareIcon,
  ShieldCheckIcon,
  TrashIcon,
  UserCircleIcon,
  UserGroupIcon,
  UserMinusIcon,
  UserPlusIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import { ACTION, PROPERTY_ACTION } from "./myProfilePermissions";

export const ACTION_META = {
  [ACTION.VIEW]: { label: "View profile", icon: UserCircleIcon },
  [ACTION.EDIT_DETAILS]: { label: "Edit details", icon: PencilSquareIcon },
  [ACTION.MANAGE_ACCESS]: { label: "Manage access", icon: KeyIcon },
  [ACTION.VIEW_ACTIVITY]: { label: "View activity", icon: ClockIcon },
  [ACTION.CHANGE_ROLE]: { label: "Change role", icon: ShieldCheckIcon },
  [ACTION.RESEND_INVITE]: { label: "Resend invite", icon: PaperAirplaneIcon },
  [ACTION.REVOKE_INVITE]: { label: "Revoke invite", icon: XCircleIcon },
  [ACTION.DEACTIVATE]: { label: "Deactivate", icon: UserMinusIcon },
  [ACTION.REACTIVATE]: { label: "Reactivate", icon: ArrowPathIcon },
  [ACTION.REMOVE]: { label: "Remove", icon: TrashIcon, danger: true },
};

export const PROPERTY_ACTION_META = {
  [PROPERTY_ACTION.SWITCH]: { label: "Switch to property", icon: ArrowsRightLeftIcon },
  [PROPERTY_ACTION.VIEW_TEAM]: { label: "View team", icon: UserGroupIcon },
  [PROPERTY_ACTION.INVITE_STAFF]: { label: "Invite staff to this property", icon: UserPlusIcon },
  [PROPERTY_ACTION.LEAVE_WORKSPACE]: {
    label: "Leave workspace",
    icon: ArrowRightStartOnRectangleIcon,
    danger: true,
  },
};
