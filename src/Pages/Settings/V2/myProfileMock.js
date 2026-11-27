// Placeholder data for the v2 My profile screen (Settings_my_profile branch).
// These fields have no API yet. Replace each block with the Redux state the
// API lands in; nothing else in the screen needs to change.

export const PROFILE_EXTRAS_MOCK = {
  userId: "SMPG11001",
  orgName: "SRK Homes",
  emailVerified: true,
  memberSince: "12 Mar 2024",
  lastLogin: "today, 9:42 AM · Chrome on Windows",
  alternateMobile: "",
  address: "12, 3rd Cross St, Navalur, Chennai 600130",
  governmentId: "Aadhaar ···· ···· 4821 (verified)",
  profileStrength: 80,
  profileStrengthHint: "Add an alternate number and turn on 2FA to reach 100%.",
};

export const ACCOUNT_SETTINGS_MOCK = {
  passwordChanged: "Password changed 42 days ago",
  securityActionNeeded: true,
  eSignature: "Added at 14 Aug 2025",
  preferences: "English · IST · WhatsApp + email alerts",
};

// tone: system (grey bell) | stage (blue arrow)
export const RECENT_ACTIVITY_MOCK = [
  { id: 1, tone: "system", who: "You", what: "signed in · Chennai", when: "9:42 AM" },
  { id: 2, tone: "stage", who: "You", what: "updated #CMP112", when: "9:30 AM" },
  { id: 3, tone: "system", who: "You", what: "recorded ₹6,000 rent", when: "8:10 AM" },
  { id: 4, tone: "system", who: "Nithin S.", what: "confirmed booking #BK102", when: "Yesterday" },
];

export const PLAN_MOCK = {
  planName: "Pro plan",
  status: "Active",
  usageText: "5 of 6 properties · 136 of 150 beds",
  usagePercent: 77,
  renewText: "Renews 12 Jan 2026",
};
