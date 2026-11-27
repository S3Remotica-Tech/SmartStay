import React from "react";
import PropTypes from "prop-types";
import { TickCircle } from "iconsax-react";
import basicIcon from "../../Assets/Images/New_images/tenant-stepper/step-basic.svg";
import onboardIcon from "../../Assets/Images/New_images/tenant-stepper/step-onboard.svg";
import documentIcon from "../../Assets/Images/New_images/tenant-stepper/step-document.svg";

const ICONS = { basic: basicIcon, onboard: onboardIcon, docs: documentIcon };

// Sidebar stepper of the Add Tenant drawer (Figma "Add New Tenant" 4797:127446).
// `steps` come from getTenantSteps(). The number shown is the visible position, so
// Booking (no Documents) reads Step 1, 2, 3 while `current` is the wizard step id.
// States: current = filled brand circle, done = filled + green tick (clickable to go
// back), upcoming = outlined circle.
function TenantStepper({ steps, current, onSelect }) {
  const currentIndex = steps.findIndex((s) => s.id === current);

  return (
    <div className="flex w-[222px] flex-col items-start gap-[14px]">
      {steps.map((item, index) => {
        const isCurrent = index === currentIndex;
        const isDone = index < currentIndex;
        const isFilled = isCurrent || isDone;
        const canGoBack = isDone && typeof onSelect === "function";

        return (
          <React.Fragment key={item.id}>
            {index > 0 && (
              <div className="flex h-[30px] w-[47px] justify-center" aria-hidden>
                <div className="h-full w-[2px] bg-[#EAECF0]" />
              </div>
            )}
            <div data-testid={`tenant-stepper-step-action-${item.id}`}
              role={canGoBack ? "button" : undefined}
              tabIndex={canGoBack ? 0 : undefined}
              onClick={canGoBack ? () => onSelect(item.id) : undefined}
              onKeyDown={
                canGoBack
                  ? (e) => {
                      if (e.key === "Enter" || e.key === " ") onSelect(item.id);
                    }
                  : undefined
              }
              aria-current={isCurrent ? "step" : undefined}
              className={`flex w-full items-center gap-[14px] ${canGoBack ? "cursor-pointer" : ""}`}
            >
              <div
                className={`relative flex h-[47px] w-[47px] shrink-0 items-center justify-center rounded-full ${
                  isFilled
                    ? "bg-[#2031BB] shadow-[0px_1px_1px_rgba(16,24,40,0.05)]"
                    : "border-[1.2px] border-solid border-[#1E45E1] bg-transparent shadow-[0px_1px_2px_rgba(16,24,40,0.05)]"
                }`}
              >
                <img
                  src={ICONS[item.icon] || documentIcon}
                  alt=""
                  // The outline icons are brand blue; filled circles need them white.
                  className={isFilled && item.icon !== "basic" ? "brightness-0 invert" : ""}
                />
                {isDone && (
                  <TickCircle
                    size="15"
                    variant="Bold"
                    color="#16A34A"
                    className="absolute -top-[1px] left-[31px] rounded-full bg-white"
                  />
                )}
              </div>
              <div className="flex min-w-0 flex-1 flex-col font-gilroy text-[#344054]">
                <span className="text-[12px] font-medium leading-[20px]">
                  Step {index + 1}
                </span>
                <span className="text-[17px] font-semibold leading-[22px] break-words">
                  {item.title}
                </span>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

TenantStepper.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      icon: PropTypes.string,
    }),
  ).isRequired,
  current: PropTypes.number.isRequired,
  onSelect: PropTypes.func,
};

export default TenantStepper;
