import React from "react";
import { Table } from "react-bootstrap";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import {
    Shield
} from "iconsax-react";

function ManagedUsers() {

    const users = [
        {
            name: "Raja",
            role: "Co Admin",
            email: "raja@smartstay.com",
            mobile: "+91 78564 98322",
            description: "Manage all except Banking"
        },
        {
            name: "Priya M",
            role: "Warden",
            email: "priya@smartstay.com",
            mobile: "+91 78564 98322",
            description: "Read access for tenants and rooms"
        },
        {
            name: "Gowtham",
            role: "Receptionist",
            email: "gowtham@smartstay.com",
            mobile: "+91 78564 98322",
            description: "Can manage tenants, bookings"
        },
        {
            name: "Sanjay L",
            role: "Accountant",
            email: "sanjay@smartstay.com",
            mobile: "+91 78564 98322",
            description: "Manages billing, invoices, collections"
        }
    ];



    const ellipsisStyle = {
        maxWidth: 160,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
    };




    return (
        <div style={{
            width: "100%", overflowX: "hidden", overflowY: "auto",
            maxHeight: 400,
        }}>
            <div className="table-responsive " style={{
                fontFamily: "Gilroy", marginTop: 10, border: "1px solid #DCDCDC", borderRadius: 10,
                maxHeight: 320,
                overflowY: "auto"
            }}>
                <Table className="align-middle">
                    <thead style={{
                        background: "#F9FAFB", position: "sticky",
                        top: 0,
                        zIndex: 10,
                    }}>
                        <tr >
                            <th style={{ color: "#6B7280", fontSize: 12, fontWeight: 600 }}>USER NAME</th>
                            <th style={{ color: "#6B7280", fontSize: 12, fontWeight: 600 }}>ROLE ASSIGN</th>
                            <th style={{ color: "#6B7280", fontSize: 12, fontWeight: 600 }}>MAIL ID</th>
                            <th style={{ color: "#6B7280", fontSize: 12, fontWeight: 600 }}>MOBILE NO</th>
                            <th style={{ color: "#6B7280", fontSize: 12, fontWeight: 600 }}>DESCRIPTION</th>
                            <th className="text-center" style={{ color: "#6B7280", fontSize: 12, fontWeight: 600 }}>ACTION</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index} >
                                {/* USER NAME */}
                                <td style={{ ...ellipsisStyle, fontWeight: 600 }}
                                    title={user.name}>{user.name}</td>

                                {/* ROLE */}
                                <td style={{}}>

                                    <span
                                        style={{
                                            background: "#FFF7ED",
                                            color: "#FF9900",
                                            padding: "4px 8px",
                                            borderRadius: 8,
                                            fontSize: 13,
                                            fontWeight: 500,

                                        }}
                                    >
                                        <Shield size={14} color="#FF9900" />
                                    </span>
                                    <span className="ms-2" style={{ ...ellipsisStyle, fontWeight: 600 }}
                                        title={user.role}>{user.role}</span>
                                </td>

                                {/* EMAIL */}
                                <td style={{ ...ellipsisStyle, fontWeight: 400 }}
                                    title={user.email}>{user.email}</td>

                                {/* MOBILE */}
                                <td style={{ ...ellipsisStyle, fontWeight: 400 }}
                                    title={user.mobile}>{user.mobile}</td>

                                {/* DESCRIPTION */}
                                <td style={{
                                    ...ellipsisStyle,
                                    // maxWidth: 220,
                                    color: "#4B4B4B",
                                    fontWeight: 400
                                }}
                                    title={user.description}>
                                    {user.description}
                                </td>

                                {/* ACTION */}
                                <td className="text-center">
                                    <PiDotsThreeOutlineVerticalFill
                                        style={{ cursor: "pointer" }}
                                        size={20}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    )
}

export default ManagedUsers