import PropTypes from "prop-types";
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import ConfirmChangeBed from "./ConfirmChangeBed";

const BedStatusListView = ({ onHide }) => {
BedStatusListView.propTypes = {
  onHide: PropTypes.func.isRequired,
};
  const [selectedFloor, setSelectedFloor] = useState("Ground Floor");
  const [selectedBed, setSelectedBed] = useState(null);
  const [showConfirmChangeBed, setShowConfirmChangeBed] = useState(false);

  const floors = ["Ground Floor", "1st Floor", "2nd Floor", "3rd Floor"];
  const rooms = [
    {
      name: "Room no. G3",
      beds: [
        { id: 1, status: "notice" },
        { id: 2, status: "available" },
        { id: 3, status: "available" },
      ],
    },
    {
      name: "Room no. G4",
      beds: [
        { id: 1, status: "occupied" },
        { id: 2, status: "available" },
        { id: 3, status: "available" },
        { id: 4, status: "available" },
      ],
    },
    {
      name: "Room no. G5",
      beds: [
        { id: 1, status: "available" },
        { id: 2, status: "available" },
        { id: 3, status: "available" },
      ],
    },
  ];

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 16,
        padding: "20px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div className="d-flex align-items-center mb-3">
        <Button variant="link" onClick={onHide} className="p-0 me-3">
          ←
        </Button>
        <h5 style={{ fontFamily: "Gilroy", fontWeight: 600, margin: 0 }}>
          Change Bed
        </h5>
      </div>

      {/* Tenant Info */}
      <Card className="mb-3 p-3" style={{ borderRadius: 12 }}>
        <div className="d-flex align-items-center">
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "#eee",
              marginRight: 12,
            }}
          />
          <div>
            <div style={{ fontWeight: 600 }}>Xavier</div>
            <div style={{ fontSize: 13, color: "#666" }}>
              Ground Floor · Room G1 · Bed 03
            </div>
          </div>
        </div>
      </Card>

      <div className="d-flex flex-grow-1">
        {/* Sidebar - Floors */}
        <div className="d-flex flex-column me-3" style={{ minWidth: 100 }}>
          {floors.map((floor) => (
            <Button
              key={floor}
              variant={selectedFloor === floor ? "primary" : "outline-secondary"}
              className="mb-2"
              style={{ borderRadius: 8 }}
              onClick={() => setSelectedFloor(floor)}
            >
              {floor}
            </Button>
          ))}
        </div>

        {/* Main Content - Rooms */}
        <div className="flex-grow-1" style={{ overflowY: "auto" }}>
          <h6 className="mb-3">{selectedFloor}</h6>

          <div className="d-flex justify-content-end mb-2">
            <span className="me-3">
              <span
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 10,
                  background: "green",
                  borderRadius: "50%",
                  marginRight: 5,
                }}
              />
              Available
            </span>
            <span>
              <span
                style={{
                  display: "inline-block",
                  width: 10,
                  height: 10,
                  background: "red",
                  borderRadius: "50%",
                  marginRight: 5,
                }}
              />
              Notice Period
            </span>
          </div>

          <div className="d-flex flex-wrap gap-3">
            {rooms.map((room) => (
              <Card
                key={room.name}
                className="p-2 flex-fill"
                style={{ minWidth: 220, borderRadius: 12 }}
              >
                <div style={{ fontWeight: 600, marginBottom: 8 }}>
                  {room.name}
                </div>
                <div className="d-flex flex-wrap gap-2">
                  {room.beds.map((bed) => (
                    <Button
                      key={bed.id}
                      variant={
                        bed.status === "available"
                          ? selectedBed === bed.id
                            ? "primary"
                            : "outline-success"
                          : bed.status === "notice"
                          ? "outline-danger"
                          : "secondary"
                      }
                      style={{
                        flex: "1 0 45%",
                        borderRadius: 8,
                        fontSize: 13,
                      }}
                      onClick={() =>
                        bed.status === "available" && setSelectedBed(bed.id)
                      }
                    >
                      Bed {bed.id}
                    </Button>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-3 text-end">
        <Button
          variant="primary"
          disabled={!selectedBed}
          style={{
            borderRadius: 8,
            fontWeight: 600,
            padding: "8px 24px",
          }}
          onClick={() => setShowConfirmChangeBed(true)}
        >
          Continue →
        </Button>
      </div>

        {showConfirmChangeBed && (
        <ConfirmChangeBed
          show={showConfirmChangeBed}
          handleClose={() => setShowConfirmChangeBed(false)}
          
        />
      )}
    </div>
  );
};

export default BedStatusListView;
