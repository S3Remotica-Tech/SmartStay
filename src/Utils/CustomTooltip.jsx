import React from "react";
import { createPortal } from "react-dom";
import { useRef, useState } from "react";
import PropTypes from "prop-types";

function CustomTooltip({
    children,
    text,
    direction = "top-full",
    usePortal = false,
}) {
    const wrapperRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ top: 0, left: 0 });

    const handleMouseEnter = () => {
        if (usePortal && wrapperRef.current) {
            const rect = wrapperRef.current.getBoundingClientRect();

            const positions = {
                "top-full": {
                    top: rect.bottom + 8,
                    left: rect.left + rect.width / 2,
                    transform: "translateX(-50%)",
                },
                "bottom-full": {
                    top: rect.top - 8,
                    left: rect.left + rect.width / 2,
                    transform: "translate(-50%, -100%)",
                },
                "left-full": {
                    top: rect.top + rect.height / 2,
                    left: rect.right + 8,
                    transform: "translateY(-50%)",
                },
                "right-full": {
                    top: rect.top + rect.height / 2,
                    left: rect.left - 8,
                    transform: "translate(-100%, -50%)",
                },
            };

            setPosition(positions[direction] || positions["top-full"]);
        }

        setIsVisible(true);
    };

    const marginClass =
        direction === "top-full"
            ? "mt-2"
            : direction === "bottom-full"
                ? "mb-2"
                : direction === "left-full"
                    ? "mr-2"
                    : direction === "right-full"
                        ? "ml-3"
                        : "";

    const tooltipContent = (
        <span
            className="whitespace-nowrap rounded-md bg-[#1E3A8A] text-white px-2 py-1 text-xs font-gilroy shadow-md"
            style={
                usePortal
                    ? {
                        position: "fixed",
                        top: position.top,
                        left: position.left,
                        transform: position.transform,
                        zIndex: 99999,
                        pointerEvents: "none",
                    }
                    : {}
            }
        >
            {text}
        </span>
    );

    return (
        <div
            ref={wrapperRef}
            className="relative group flex items-center justify-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}

            {usePortal ? (
                isVisible && createPortal(tooltipContent, document.body)
            ) : (
                <span
                    className={`absolute ${direction} ${marginClass} font-gilroy
                    whitespace-nowrap rounded-md bg-[#1E3A8A] text-white px-2 py-1 text-xs
                    hidden group-hover:block z-[9999]`}
                >
                    {text}
                </span>
            )}
        </div>
    );
}
CustomTooltip.propTypes = {
    children: PropTypes.node.isRequired,
    text: PropTypes.string.isRequired,
    direction: PropTypes.oneOf([
        "top-full",
        "bottom-full",
        "left-full",
        "right-full",
    ]),
    usePortal: PropTypes.bool,
};
export default CustomTooltip;





// function CustomTooltip({ children, text, direction = "top-full" }) {
//     const marginClass =
//         direction === "top-full"
//             ? "mt-2"
//             : direction === "bottom-full"
//                 ? "mb-2"
//                 : direction === "left-full"
//                     ? "mr-2"
//                     : direction === "right-full"
//                         ? "ml-3"
//                         : "";
//     return (
//         <div className="relative group flex items-center justify-center">
//             {children}

//             <span
//                 className={`absolute ${direction} ${marginClass} mt-14 mb-2 font-gilroy
//   whitespace-nowrap rounded-md bg-[#1E3A8A] text-white px-2 py-1 text-xs
//   hidden group-hover:block z-[9999]`}
//             >
//                 {text}
//             </span>
//         </div>
//     );
// }

// export default CustomTooltip;