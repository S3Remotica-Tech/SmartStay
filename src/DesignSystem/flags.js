// Design System v2 rollout switches. Each screen moves to v2 behind its own
// flag so it can be turned off without touching the screen code.
// Opt-in: Settings v2 renders only when VITE_SETTINGS_V2=true (e.g. in a local
// .env.development.local). Unset or anything else keeps the current screens.
export const SETTINGS_V2 = import.meta.env.VITE_SETTINGS_V2 === "true";
