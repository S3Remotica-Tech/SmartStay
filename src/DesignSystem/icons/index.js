// Heroicons v2 (24px outline) via @heroicons/react, wrapped so each DsIcons
// entry keeps the size, colour and stroke the "New design System" Figma uses.
// Every entry is a React component; render it with <DsIcon src={DsIcons.x} />.
import React from "react";
import PropTypes from "prop-types";
import {
  ArrowRightIcon,
  ArrowRightStartOnRectangleIcon,
  BanknotesIcon,
  BellIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  CameraIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ClockIcon,
  Cog6ToothIcon,
  DevicePhoneMobileIcon,
  DocumentDuplicateIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  LockClosedIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PhoneIcon,
  Squares2X2Icon,
  UserIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const BASE_CLASS = "block shrink-0 max-w-none";

// Heroicons are drawn on a 24px grid at stroke 1.5. The Figma icons are
// `size` px with stroke `strokeWidth`, so scale the stroke to the 24px grid.
function heroIcon(Icon, size, color, strokeWidth = 1.1) {
  function DsHeroIcon({ className = "" }) {
    return React.createElement(Icon, {
      "aria-hidden": "true",
      width: size,
      height: size,
      strokeWidth: +((strokeWidth * 24) / size).toFixed(3),
      style: { color },
      className: `${BASE_CLASS} ${className}`,
    });
  }
  DsHeroIcon.propTypes = { className: PropTypes.string };
  DsHeroIcon.displayName = `DsHeroIcon(${Icon.displayName || Icon.name || "icon"})`;
  return DsHeroIcon;
}

// Heroicons has no filled dot, so the two status dots are plain circles.
function dotIcon(size, color) {
  function DsDot({ className = "" }) {
    return React.createElement("span", {
      "aria-hidden": "true",
      style: { width: size, height: size, backgroundColor: color },
      className: `${BASE_CLASS} rounded-full ${className}`,
    });
  }
  DsDot.propTypes = { className: PropTypes.string };
  DsDot.displayName = "DsDot";
  return DsDot;
}

export const DsIcons = {
  arrowRight: heroIcon(ArrowRightIcon, 14, "#2563EB"),
  arrowRightStartOnRectangle: heroIcon(ArrowRightStartOnRectangleIcon, 20, "#DC2626", 1.25),
  banknotes: heroIcon(BanknotesIcon, 20, "#6B7280"),
  bell: heroIcon(BellIcon, 16, "#6B7280"),
  buildingOffice: heroIcon(BuildingOfficeIcon, 20, "#6B7280"),
  calendar: heroIcon(CalendarIcon, 16, "#6B7280"),
  camera: heroIcon(CameraIcon, 16, "#374151"),
  checkCircle: heroIcon(CheckCircleIcon, 16, "#16A34A"),
  chevronDown: heroIcon(ChevronDownIcon, 16, "#111827"),
  chevronRight: heroIcon(ChevronRightIcon, 20, "#6B7280"),
  clock: heroIcon(ClockIcon, 16, "#6B7280"),
  cog6Tooth: heroIcon(Cog6ToothIcon, 20, "#374151"),
  cogNav: heroIcon(Cog6ToothIcon, 20, "#6B7280"),
  copy: heroIcon(DocumentDuplicateIcon, 14, "#1E1E1E"),
  devicePhoneMobile: heroIcon(DevicePhoneMobileIcon, 20, "#6B7280"),
  dotWarning: dotIcon(6, "#EAB308"),
  dotWhite: dotIcon(4.8, "#FFFFFF"),
  envelope: heroIcon(EnvelopeIcon, 16, "#6B7280"),
  globeAlt: heroIcon(GlobeAltIcon, 20, "#6B7280", 1.25),
  lockClosed: heroIcon(LockClosedIcon, 20, "#6B7280", 1.25),
  lockNav: heroIcon(LockClosedIcon, 20, "#6B7280", 1.25),
  magnifyingGlass: heroIcon(MagnifyingGlassIcon, 16, "#6B7280"),
  pencilSquare: heroIcon(PencilSquareIcon, 20, "#6B7280"),
  pencilSquareWhite: heroIcon(PencilSquareIcon, 16, "#FFFFFF"),
  phone: heroIcon(PhoneIcon, 16, "#6B7280"),
  squares2x2: heroIcon(Squares2X2Icon, 20, "#6B7280"),
  user: heroIcon(UserIcon, 20, "#1E45E1"),
  xMark: heroIcon(XMarkIcon, 16, "#EF4444"),
};
