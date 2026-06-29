import React from "react";
import { PiWarningCircle } from "react-icons/pi";
import { IoIosCheckmark } from "react-icons/io";
import { MdWarningAmber } from "react-icons/md";
import PropTypes from "prop-types";

const Message = ({ message, type = "error" }) => {
  if (!message || (Array.isArray(message) && message.length === 0)) return null;

  const messages = Array.isArray(message) ? message : [message];

  const variants = {
    success: {
      icon: <IoIosCheckmark className="text-[#03A000] text-[18px]" />,
      text: "text-[#03A000]",
      bg: "bg-[rgba(230,255,230,0.7)]",
    },
    warning: {
      icon: <MdWarningAmber className="text-[#FF8C00] text-[18px]" />,
      text: "text-[#FF8C00]",
      bg: "bg-[rgba(255,140,0,0.15)]",
    },
    error: {
      icon: <PiWarningCircle className="text-[#FF0000] text-[16px]" />,
      text: "text-[#FF0000]",
      bg: "bg-[rgba(255,243,243,0.64)]",
    },
  };

  const { icon, text, bg } = variants[type] || variants.error;

  return (
    <div
      className={`${bg} mt-1 px-[10px] py-[6px] rounded w-fit flex flex-col gap-1 whitespace-nowrap`}
    >
      {messages.map((msg, index) => (
        <div key={index} className="flex items-center gap-[6px]">
          {icon}
          <span
            className={`${text} text-[12px] leading-4 font-gilroy font-medium whitespace-nowrap`}
          >
            {msg}
          </span>
        </div>
      ))}
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
    PropTypes.node,
  ]),
  type: PropTypes.string,
};

export default Message;
