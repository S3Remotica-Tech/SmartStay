// Full-screen shell for the onboarding steps (no app sidebar, no close / skip).
// Figma "property Setup" frames: left step nav "Top" 5671:177042, welcome
// menu 5671:177036, background art (blobs, building line-art, puzzle piece),
// card "Initialize Record Final" 5671:178030.
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { STEPS } from "./onboardingConfig";
import { MENU_PANEL_CLASS, menuItemClass } from "../../Utils/MenuStyles";
import LogoMark from "../../Assets/Images/Onboarding/logo-mark.svg";
import LogoWordmark from "../../Assets/Images/Onboarding/logo-wordmark.svg";
import ChevronDown from "../../Assets/Images/Onboarding/chevron-down.svg";
import BgBlobs from "../../Assets/Images/Onboarding/bg-blobs.png";
import Buildings from "../../Assets/Images/Onboarding/backdrop-buildings.png";
import Puzzle from "../../Assets/Images/Onboarding/puzzle.png";

function Logo() {
  return (
    <div className="flex items-center gap-[9px]" aria-label="Smartstay">
      <img src={LogoMark} alt="" width="39" height="39" />
      <img src={LogoWordmark} alt="Smartstay" width="157" height="24" />
    </div>
  );
}

function WelcomeMenu({ userName, onLogout, loggingOut }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-[6px] rounded-[8px] border-0 bg-transparent px-[4px] py-[4px] font-gilroy text-[16px] leading-[17.5px] focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#0485F7] sm:text-[18px]"
      >
        <span className="font-light text-[#64748B]">Welcome</span>
        <span className="max-w-[160px] truncate font-medium text-[#222222]">
          {userName || "there"}
        </span>
        <img
          src={ChevronDown}
          alt=""
          width="11"
          height="5"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div role="menu" className={`${MENU_PANEL_CLASS} absolute right-0 top-[calc(100%+8px)] z-[20]`}>
          <button
            type="button"
            role="menuitem"
            disabled={loggingOut}
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className={menuItemClass({ danger: true })}
          >
            {loggingOut ? "Logging out…" : "Logout"}
          </button>
        </div>
      )}
    </div>
  );
}

WelcomeMenu.propTypes = {
  userName: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
  loggingOut: PropTypes.bool,
};

function StepNav({ activeIndex, maxReachable, onSelect }) {
  return (
    <nav aria-label="Property setup steps">
      <ol className="m-0 flex list-none flex-col gap-[5px] p-0">
        {STEPS.map((step, i) => {
          const active = i === activeIndex;
          const reachable = i <= maxReachable;
          return (
            <li key={step.key}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                disabled={!reachable || active}
                aria-current={active ? "step" : undefined}
                className={`flex min-h-[44px] w-full items-center rounded-[99px] border-0 bg-transparent px-[16px] py-[12px] text-left font-gilroy leading-[20px] transition-colors focus-visible:outline-none focus-visible:shadow-[0_0_0_2px_#0485F7] disabled:cursor-default ${
                  active
                    ? "text-[22px] font-semibold text-primary-500"
                    : `text-[18px] font-normal text-[#64748B] ${reachable ? "hover:text-primary-500" : "opacity-70"}`
                }`}
              >
                {step.label}
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

StepNav.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  maxReachable: PropTypes.number.isRequired,
  onSelect: PropTypes.func.isRequired,
};

function OnboardingLayout({
  activeIndex,
  maxReachable,
  onStepSelect,
  userName,
  onLogout,
  loggingOut,
  title,
  subtitle,
  children,
}) {
  const step = STEPS[activeIndex];
  const percent = ((activeIndex + 1) / STEPS.length) * 100;
  const scrollRef = useRef(null);

  // Only the form column scrolls, so a new step starts at its top.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [activeIndex]);

  return (
    // Viewport-high shell: the step nav, header and background art stay put
    // on every step; only the form column (scrollRef) scrolls.
    <div className="relative h-[100dvh] overflow-hidden bg-white font-gilroy">
      {/* Background art (decorative). */}
      <img
        src={BgBlobs}
        alt=""
        aria-hidden
        className="pointer-events-none fixed inset-0 h-full w-full select-none object-cover"
      />
      <img
        src={Buildings}
        alt=""
        aria-hidden
        className="pointer-events-none fixed bottom-0 left-0 w-full select-none"
      />
      <img
        src={Puzzle}
        alt=""
        aria-hidden
        width="123"
        height="146"
        className="pointer-events-none fixed right-[0px] top-[480px] hidden select-none xl:block"
      />

      <div className="relative z-[1] mx-[auto] flex h-full w-full max-w-[1573px]">
        <aside className="hidden w-[291px] shrink-0 flex-col gap-[46px] py-[24px] pl-[28px] pr-[24px] lg:flex">
          <Logo />
          <StepNav activeIndex={activeIndex} maxReachable={maxReachable} onSelect={onStepSelect} />
        </aside>

        <div className="flex h-full min-w-0 flex-1 flex-col">
          <header className="flex shrink-0 items-center justify-between gap-[12px] px-[16px] pt-[20px] sm:px-[24px] lg:justify-end lg:pr-[25px] lg:pt-[28px]">
            <div className="lg:hidden">
              <Logo />
            </div>
            <WelcomeMenu userName={userName} onLogout={onLogout} loggingOut={loggingOut} />
          </header>

          {/* Compact stepper below lg (the left nav is hidden there). */}
          <div className="shrink-0 px-[16px] pt-[16px] sm:px-[24px] lg:hidden">
            <p className="mb-[8px] font-gilroy text-[13px] font-medium text-[#64748B]">
              Step {activeIndex + 1} of {STEPS.length} ·{" "}
              <span className="text-primary-500">{step.label}</span>
            </p>
            <div className="h-[4px] w-full overflow-hidden rounded-[2px] bg-[#E5E7EB]" aria-hidden>
              <div className="h-full rounded-[2px] bg-primary-500 transition-[width]" style={{ width: `${percent}%` }} />
            </div>
          </div>

          {/* Scroll area. Bottom padding keeps the card's end clear of the
              fixed building art. */}
          <main
            ref={scrollRef}
            className="flex min-h-0 w-full flex-1 items-start justify-center overflow-y-auto px-[16px] pb-[140px] pt-[16px] sm:px-[24px] lg:justify-start lg:pl-[101px] lg:pr-[24px] lg:pt-[12px]"
          >
            <section
              aria-labelledby="onboarding-step-title"
              className="flex w-full max-w-[788px] flex-col gap-[22px] rounded-[10px] bg-white px-[16px] py-[20px] drop-shadow-[0px_0px_2px_rgba(0,0,0,0.25)] sm:px-[25px] sm:py-[25px]"
            >
              <div className="flex flex-col gap-[6px] sm:px-[4px]">
                <h1
                  id="onboarding-step-title"
                  className="mb-0 font-gilroy text-[20px] font-semibold leading-[28px] text-[#222222] sm:text-[24px]"
                >
                  {title}
                </h1>
                <p className="mb-0 pt-[2px] font-gilroy text-[14px] leading-[20px] text-[#64748B] sm:text-[16px]">
                  {subtitle}
                </p>
              </div>
              {children}
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

OnboardingLayout.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  maxReachable: PropTypes.number.isRequired,
  onStepSelect: PropTypes.func.isRequired,
  userName: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
  loggingOut: PropTypes.bool,
  title: PropTypes.node.isRequired,
  subtitle: PropTypes.node,
  children: PropTypes.node,
};

export default OnboardingLayout;
