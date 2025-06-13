/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from 'react';
import { Card, Container, Form } from 'react-bootstrap';
import { BsWhatsapp } from 'react-icons/bs';
import { Message } from 'iconsax-react';
import { ArrowLeft } from 'iconsax-react';
import "./SettingsNotifications.css";



const SettingsNotifications = () => {

    const [showWhatsAppSettings, setShowWhatsAppSettings] = useState(false);

    const notifications = [
        {
            id: 0,
            title: 'Advance Generation Message',
            description: 'Send WhatsApp message automatically when Advance is generated.',
        },
        {
            id: 1,
            title: 'Bill Generation',
            description: 'Notify tenant via WhatsApp when monthly bill is generated.',
        },
        {
            id: 2,
            title: 'Payment Receipt',
            description: 'Auto-send payment confirmation receipt to tenant.',
        },
        {
            id: 3,
            title: 'User Onboarding',
            description: 'Send welcome/onboarding WhatsApp message when new tenant is added.',
        },
    ];

    const [toggleStatus, setToggleStatus] = useState({
        0: false,
        1: true,
        2: true,
        3: true,
    });

    const handleToggle = (id) => {
        setToggleStatus((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <Container className="py-4">
            {!showWhatsAppSettings ? (
                <>
                    <h3
                        style={{
                            fontFamily: 'Gilroy',
                            fontSize: 16,
                            color: '#222',
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                            marginBottom: '17px',
                        }}
                    >
                        Notifications
                    </h3>

                    <Card
                        onClick={() => setShowWhatsAppSettings(true)}
                        style={{ border: '1px solid #8080802E', borderRadius: '6px', cursor: 'pointer' }}
                    >
                        <Card.Body className="d-flex align-items-center gap-2 py-2 px-3">
                            <div
                                className="d-flex align-items-center justify-content-center rounded-circle"
                                style={{
                                    backgroundColor: '#E8F5E9',
                                    width: '30px',
                                    height: '30px',
                                    flexShrink: 0,
                                }}
                            >
                                <BsWhatsapp color="#25D366" size={17} />
                            </div>
                            <div className="d-flex flex-column justify-content-center">
                                <div
                                    className="fw-semibold"
                                    style={{ fontSize: '14px', lineHeight: '1.2', marginBottom: '4px',fontFamily:"Gilroy" }}
                                >
                                    Whatsapp
                                </div>
                                <div className="text-muted" style={{ fontSize: '10px', lineHeight: '1.3',fontFamily:"Gilroy" }}>
                                    Manage and automate Whatsapp message alerts for key tenant activities.
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </>
            ) : (
                <>
                    <h3
                        style={{
                            fontFamily: 'Gilroy',
                            fontSize: 15,
                            color: '#222',
                            fontWeight: 600,
                            whiteSpace: 'nowrap',
                            marginBottom: '20px',
                        }}
                    >
                        Notifications
                    </h3>

                    <div className="d-flex align-items-center mb-4 mt-2">

                        <ArrowLeft size="18" color="#1E45E1" className="me-2 mt-1"
                            style={{ cursor: 'pointer' }}
                            onClick={() => setShowWhatsAppSettings(false)} />
                        <p className="mb-0 fw-semibold" >Whatsapp</p>
                    </div>

                    {notifications.map((item) => (
                        <Card
                            key={item.id}
                            className="mb-2"
                            style={{ border: '1px solid #8080802E', borderRadius: '8px' }}
                        >
                            <Card.Body className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center py-2 px-3 gap-3">

                                <div> <Message size="18" color="#1E45E1" /> </div>

                                <div className="d-flex flex-column flex-grow-1 mb-1 mb-md-0">
                                    <h5 className="mb-1" style={{ fontSize: '14px',fontFamily:"Gilroy" }}>{item.title}</h5>

                                    <p
                                        className="text-muted mb-0"
                                        style={{
                                            fontSize: '10px',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            fontFamily:"Gilroy",
                                        }}
                                    >
                                        {item.description}
                                    </p>

                                </div>


                                <div className="text-md-end w-100 w-md-auto d-flex justify-content-between justify-content-md-end align-items-center mt-2 mt-md-0">
                                    <small className="text-muted me-2" style={{ fontSize: '12px' }}>Automation Status</small>

                                    <div className="d-flex align-items-center">
                                        <span className="me-2" style={{fontFamily:"Gilroy", fontSize: '12px', color: toggleStatus[item.id] ? 'blue' : 'text-muted' }}>
                                            {toggleStatus[item.id] ? 'On' : 'Off'}
                                        </span>
                                        <Form.Check
                                            type="switch"
                                            id={`switch-${item.id}`}
                                            checked={toggleStatus[item.id]}
                                            onChange={() => handleToggle(item.id)}
                                            className="mb-0 custom-switch position-relative"
                                            label=""
                                        />
                                    </div>
                                </div>


                            </Card.Body>
                        </Card>


                    ))}
                </>
            )}
        </Container>
    );
};

export default SettingsNotifications;
