/* eslint-disable react-hooks/exhaustive-deps */
// /onboarding/:stepSlug — the 4-step Property Setup. Each step has its own URL
// so the browser Back/Forward buttons move between steps; a step can only be
// opened once every earlier step is valid.
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "universal-cookie";
import CryptoJS from "crypto-js";
import { OnboardingProvider, useOnboarding } from "./OnboardingContext";
import OnboardingLayout from "./OnboardingLayout";
import Step1BasicDetails from "./Step1BasicDetails";
import Step2TaxInformation from "./Step2TaxInformation";
import Step3Media from "./Step3Media";
import Step4ServicesRules from "./Step4ServicesRules";
import { MAX_PROPERTY_IMAGES, MIN_PROPERTY_IMAGES, STEPS, stepPath } from "./onboardingConfig";
import { clearDraft, saveLastStep } from "./onboardingUtils";
import withErrorBoundary from "../../Hoc/WithErrorBountry";

const STEP_COPY = {
  basic: {
    title: "Let’s get Started with Property Setup",
    subtitle: "Tell us a bit about your Property",
  },
  tax: {
    title: "Provide your Tax information",
    subtitle: "If you collect a rent included with tax, Lets fill this....!",
  },
  media: {
    title: "List your Property Images",
    subtitle:
      MIN_PROPERTY_IMAGES > 0
        ? `Add at least ${MIN_PROPERTY_IMAGES} general images of the property`
        : `Add up to ${MAX_PROPERTY_IMAGES} general images of the property`,
  },
  services: {
    title: "Services & Rules",
    subtitle: "List the excess facilities & rules on your property",
  },
};

function OnboardingFlow() {
  const { stepSlug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { maxReachableStep, submit } = useOnboarding();
  const index = STEPS.findIndex((s) => s.slug === stepSlug);

  useEffect(() => {
    if (index >= 0 && index <= maxReachableStep) saveLastStep(index);
  }, [index, maxReachableStep]);

  // Logout from the onboarding header. Sidebar (which normally does this
  // cleanup) is not mounted here, so the same steps run locally.
  useEffect(() => {
    if (state.login?.logoutAdminStatusCode === 200) {
      const cookies = new Cookies();
      clearDraft();
      dispatch({ type: "LOG_OUT" });
      dispatch({ type: "RESET_ALL" });
      const encryptData = CryptoJS.AES.encrypt(JSON.stringify(false), "abcd");
      localStorage.setItem("login", encryptData.toString());
      cookies.remove("selected_hostelId", { path: "/" });
      cookies.remove("v2-token", { path: "/" });
      cookies.remove("token", { path: "/" });
      localStorage.setItem("loginId", "");
      localStorage.setItem("phoneId", "");
      localStorage.setItem("emilidd", "");
      localStorage.setItem("selectedHostelName", "");
      localStorage.removeItem("lastPage");
      localStorage.removeItem("currentPage");
      navigate("/hostel-management-login", { replace: true });
      setTimeout(() => {
        dispatch({ type: "REMOVE_LOGOUT_ADMIN" });
      }, 1000);
    }
  }, [state.login?.logoutAdminStatusCode]);

  if (index < 0) return <Navigate to={stepPath(0)} replace />;
  if (index > maxReachableStep) return <Navigate to={stepPath(maxReachableStep)} replace />;

  const goTo = (i) => navigate(stepPath(i));
  const next = () => goTo(index + 1);
  const back = () => goTo(index - 1);
  const copy = STEP_COPY[STEPS[index].key];

  let content;
  switch (STEPS[index].key) {
    case "basic":
      content = <Step1BasicDetails key="basic" onNext={next} />;
      break;
    case "tax":
      content = <Step2TaxInformation key="tax" onNext={next} onBack={back} />;
      break;
    case "media":
      // Last step outside development (Services & Rules is dev only), so it
      // submits instead of moving on.
      content = (
        <Step3Media
          key="media"
          onNext={next}
          onBack={back}
          onFinish={index === STEPS.length - 1 ? submit : undefined}
        />
      );
      break;
    default:
      content = <Step4ServicesRules key="services" onFinish={submit} onBack={back} />;
  }

  return (
    <OnboardingLayout
      activeIndex={index}
      maxReachable={maxReachableStep}
      onStepSelect={goTo}
      userName={state.createAccount?.accountList?.firstName || ""}
      onLogout={() => dispatch({ type: "LOGOUTADMINSAGA", payload: { source: "WEB" } })}
      loggingOut={Boolean(state.login?.logoutLoading)}
      title={copy.title}
      subtitle={copy.subtitle}
    >
      {content}
    </OnboardingLayout>
  );
}

function OnboardingPage({ onComplete }) {
  return (
    <OnboardingProvider onCompleted={onComplete}>
      <OnboardingFlow />
    </OnboardingProvider>
  );
}

OnboardingPage.propTypes = { onComplete: PropTypes.func.isRequired };

export default withErrorBoundary(OnboardingPage);
