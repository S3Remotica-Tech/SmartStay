/* eslint-disable react-hooks/exhaustive-deps */
// Route guard for the authenticated app (wraps <Sidebar /> in App.jsx).
// - VITE_ENABLE_ONBOARDING off: renders children untouched (app as before).
// - On: asks HOSTELLIST whether the account has a property. No property →
//   only /onboarding/* is reachable (any other URL redirects there, no
//   sidebar). Property found / setup finished → normal app, and /onboarding
//   redirects to the dashboard.
// If the check can't complete (network/API error), the app is shown as
// before rather than locking the user out.
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import OnboardingPage from "./OnboardingPage";
import { ONBOARDING_BASE_PATH, isOnboardingEnabled, stepPath } from "./onboardingConfig";
import { isOnboardingComplete, loadLastStep } from "./onboardingUtils";

const CHECK_TIMEOUT_MS = 15000;

function GateLoader() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-white"
      role="status"
      aria-live="polite"
    >
      <span className="h-[32px] w-[32px] animate-spin rounded-full border-[3px] border-solid border-primary-500 border-t-transparent" />
      <span className="sr-only">Loading your account…</span>
    </div>
  );
}

function OnboardingGateInner({ children }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const hostelList = useSelector((state) => state.UsersList?.hostelList);
  const hostelListCode = useSelector((state) => state.UsersList?.hosteListStatusCode);
  const noHostelCode = useSelector((state) => state.UsersList?.noHosteListStatusCode);
  const account = useSelector((state) => state.createAccount?.accountList);
  const [status, setStatus] = useState("checking"); // checking | required | complete

  useEffect(() => {
    dispatch({ type: "CLEAR_HOSTELLIST_STATUS_CODE" });
    dispatch({ type: "CLEAR_NO_HOSTEL_STATUS_CODE" });
    dispatch({ type: "HOSTELLIST" });
    dispatch({ type: "ACCOUNTDETAILS" });
    const timer = setTimeout(
      () => setStatus((s) => (s === "checking" ? "complete" : s)),
      CHECK_TIMEOUT_MS,
    );
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status !== "checking") return;
    let list = null;
    if (hostelListCode === 200) list = Array.isArray(hostelList) ? hostelList : [];
    else if (noHostelCode === 201) list = [];
    if (list === null) return;
    const done = isOnboardingComplete(account, { hostelList: list });
    setStatus(done === false ? "required" : "complete");
  }, [hostelListCode, noHostelCode, hostelList, account, status]);

  const handleComplete = () => {
    toast.success("Property setup completed", { position: "bottom-center", autoClose: 2000 });
    setStatus("complete");
  };

  if (status === "checking") return <GateLoader />;

  if (status === "required") {
    return (
      <Routes>
        <Route
          path={`${ONBOARDING_BASE_PATH}/:stepSlug`}
          element={<OnboardingPage onComplete={handleComplete} />}
        />
        <Route path="*" element={<Navigate to={stepPath(loadLastStep())} replace />} />
      </Routes>
    );
  }

  // Completed users never see onboarding again.
  if (location.pathname.startsWith(ONBOARDING_BASE_PATH)) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}

OnboardingGateInner.propTypes = { children: PropTypes.node };

function OnboardingGate({ children }) {
  if (!isOnboardingEnabled()) return children;
  return <OnboardingGateInner>{children}</OnboardingGateInner>;
}

OnboardingGate.propTypes = { children: PropTypes.node };

export default OnboardingGate;
