import React from 'react';
import { Row, Col, Image } from "react-bootstrap";
import { RiMessage2Fill } from "react-icons/ri";
import PropTypes from "prop-types";
function RecentActivity() {

  const StepItem = ({ children, isLast }) => {
    return (
      <Row className="mb-3">
        <Col xs="auto" className="d-flex flex-column align-items-center">
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#E2E8F0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <RiMessage2Fill color="#73839B" size={20} />
          </div>

          {!isLast && (
            <div
              style={{
                width: 2,
                flex: 1,
                background: "#D1D5DB",
                marginTop: 4
              }}
            />
          )}
        </Col>

        <Col style={{ paddingBottom: 20 }}>
          {children}
        </Col>
      </Row>
    );
  }
  StepItem.propTypes = {
    children: PropTypes.node.isRequired,
    isLast: PropTypes.bool,
  };

  StepItem.defaultProps = {
    isLast: false,
  };

  const recentActivities = [
    {
      update: "Created New User",
      description: "Added staff user “Nithin” with role: Support Executive",
      updatedAt: "25 Oct 2025",
      updatedTime: "1:00 PM",
      comments: []
    },
    {
      update: "Added New Booking",
      description: "Created booking #BK102 for tenant “Suresh Kumar”.",
      updatedAt: "25 Oct 2025",
      updatedTime: "12:30 PM",
      comments: []
    },
    {
      update: "Complaint #CMP112 In Progress",
      description: "Staff marked complaint as “In Progress”",
      updatedAt: "24 Oct 2025",
      updatedTime: "11:00 AM",
      comments: [
        {
          commentedBy: "Nagarajan - Admin",
          comment: "Complaint will resolve by tomorrow"
        }
      ]
    }
  ];

  return (
    <div class="mt-2 w-full overflow-x-hidden overflow-y-auto max-h-[400px]">
      {recentActivities.map((item, index) => (
        <StepItem
          key={index}
          isLast={index === recentActivities.length - 1}
        >

          <div class="text-sm md:text-xs lg:text-base">
            {item.update}
          </div>

          <div class="text-xs md:text-[11px] lg:text-sm mt-1">
            {item.description}
          </div>

          <div class="text-[11px] md:text-[10px] lg:text-xs mt-1">
            Added at {item.updatedAt}, {item.updatedTime}
          </div>

          {Array.isArray(item.comments) && item?.comments?.length > 0 && (
            <>
              {item?.comments.map((comment, i) => (
                <div key={i} className={`mb-3 pb-2.5 ${i !== item.comments.length - 1 ? "border-b border-dashed border-gray-200" : ""
                  }`}
                >

                  <div className="flex items-center gap-1 mt-2">
                    {comment.profilePic ? (
                      <img
                        src={comment.profilePic}
                        alt="profile"
                        className="w-9 h-9 rounded-full"
                      />
                    ) : (
                      <div className="w-9 h-9 rounded-full bg-gray-200 text-[#44536A] flex items-center justify-center text-[13px] font-semibold">
                        {comment.initials || "-"}
                      </div>
                    )}

                    <div className="flex gap-2 pl-2">
                      <div className="text-[11px] md:text-[10px] lg:text-[12px] font-semibold">
                        {comment.commentedBy}
                      </div>
                      <div className="text-[11px] md:text-[10px] lg:text-[12px] text-[#3E3E3E] font-normal">
                        added a Comment
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-300 rounded-md p-3 mt-2 bg-white text-xs">
                    {comment.comment}
                  </div>
                </div>
              ))}
            </>
          )}
        </StepItem>
      ))}
    </div>
  );
}

export default RecentActivity;
