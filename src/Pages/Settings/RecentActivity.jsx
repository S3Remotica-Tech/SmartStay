import React from 'react';
import { Row, Col } from "react-bootstrap";
import { RiMessage2Fill } from "react-icons/ri";

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
    <div style={{ marginTop: 10, width:"100%" , overflowX:"hidden"}}>
      {recentActivities.map((item, index) => (
        <StepItem
          key={index}
          isLast={index === recentActivities.length - 1}
        >
          <div style={{ fontWeight: 600, fontSize: 15 }}>
            {item.update}
          </div>

          <div style={{ fontSize: 14, marginTop: 4 }}>
            {item.description}
          </div>

          <div style={{ fontSize: 12, marginTop: 4 }}>
            Added at {item.updatedAt}, {item.updatedTime}
          </div>

          {Array.isArray(item.comments) && item?.comments?.length > 0 && (
                                <>
                                    {item?.comments.map((comment, i) => (
                                        <div key={i} style={{
                                            marginBottom: 14,
                                            paddingBottom: 10,
                                            borderBottom:
                                                i !== item.comments.length - 1
                                                    ? "1px dashed #E5E7EB"
                                                    : "none",
                                        }}>
                                            <Row className="mt-2 align-items-center g-1">
                                                <Col xs="auto" className="p-0">
                                                    {comment.profilePic ? (
                                                        <Image
                                                            src={comment.profilePic}
                                                            roundedCircle
                                                            width={37}
                                                            height={37}
                                                        />
                                                    ) : (
                                                        <div
                                                            style={{
                                                                width: 37,
                                                                height: 37,
                                                                borderRadius: "50%",
                                                                backgroundColor: "#E2E8F0",
                                                                color: "#44536A",
                                                                display: "flex",
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                fontSize: 13,
                                                                fontWeight: 600,
                                                            }}
                                                        >
                                                            {comment.initials || "-"}
                                                        </div>
                                                    )}
                                                </Col>

                                                <Col className="ps-2 d-flex gap-2">
                                                    <div style={{ fontSize: 12, fontWeight: 600 }}>
                                                        {comment.commentedBy}
                                                    </div>

                                                    <div style={{ fontSize: 12, color: "#3E3E3E", fontWeight: 400 }}>added a Comment</div>

                                                </Col>
                                            </Row>

                                            <div
                                                style={{
                                                    border: "1px solid #D1D5DB",
                                                    borderRadius: 8,
                                                    padding: 14,
                                                    marginTop: 8,
                                                    background: "#FFF",
                                                    fontSize: 12,
                                                }}
                                            >
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
