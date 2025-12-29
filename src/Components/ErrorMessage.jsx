import React from "react";
import { PiWarningCircle } from "react-icons/pi";
import { IoIosCheckmark } from "react-icons/io";
import { MdWarningAmber } from "react-icons/md";
import PropTypes from "prop-types";
const Message = ({ message, type = "error" }) => {
  if (!message || (Array.isArray(message) && message.length === 0)) return null;

  const messages = Array.isArray(message) ? message : [message];


  let icon, textColor, bgColor;

  switch (type) {
    case "success":
      icon = <IoIosCheckmark style={{ color: "#03A000", fontSize: 18 }} />;
      textColor = "#03A000";
      bgColor = "rgba(230, 255, 230, 0.7)";
      break;
    case "warning":
      icon = <MdWarningAmber style={{ color: "#FF8C00", fontSize: 18 }} />; 
      textColor = "#FF8C00"; 
      bgColor = "rgba(255, 140, 0, 0.15)"; 
      break;

    default:
      icon = <PiWarningCircle style={{ color: "#FF0000", fontSize: 16 }} />;
      textColor = "#FF0000";
      bgColor = "rgba(255, 243, 243, 0.64)";
  }

  return (
    <div className=""
      style={{
        backgroundColor: bgColor,
        marginTop: 4,
        padding: "6px 10px",
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        width: "fit-content",
        textWrap: "wrap"
      }}
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {icon}
          <span
            style={{
              fontSize: 12,
              lineHeight: "16px",
              color: textColor,
              fontFamily: "Gilroy",
              fontWeight: 500,
              whiteSpace: "wrap",
            }}
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
