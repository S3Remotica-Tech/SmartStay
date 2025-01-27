import React, { useState, useEffect, useRef } from 'react';
// import Edit from '../Assets/Images/New_images/edit.png';
import Delete from '../../Assets/Images/New_images/trash.png';
import { PiDotsThreeCircleVerticalThin } from "react-icons/pi";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Card from 'react-bootstrap/Card';
import Vendors from '../../Assets/Images/New_images/profile-picture.png';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { MdError } from "react-icons/md";
import { ArrowUp2, ArrowDown2, CloseCircle, SearchNormal1, Sort, Edit, Trash } from 'iconsax-react';
import EmptyState from "../../Assets/Images/New_images/empty_image.png";



function PayingHostel(props) {

    const state = useSelector(state => state)
    const dispatch = useDispatch();

    const [showDots, setShowDots] = useState(false);

    const [activeHostel, setActiveHostel] = useState(null);
    const [hoverPgCard, setHoverPgCard] = useState(false)
    const popupRef = useRef(null);

    const [selectedHostel, setSelectedHostel] = useState(null);
    const [selectedHostelHover, setSelectedHostelHover] = useState(false)
    const [SaveHostel, setSaveHostel] = useState([])





    const handleEdit = (item) => {
        props.OnEditHostel(item)
    };



    const handleDeletePG = (item) => {
        if (item) {
            dispatch({ type: 'DELETEPG', payload: { hostel_Id: item.id } })
        }

    }

    const handleSelectedHostel = (selectedHostel) => {
        props.OnSelectHostel(selectedHostel)
        props.onRowVisiblity(false)
    }

    const handleDotsClick = () => {
        setShowDots(!showDots);
    };



    const handleClickOutside = (event) => {
        if (popupRef.current && !popupRef.current.contains(event.target)) {
            setShowDots(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    useEffect(() => {
        const appearOptions = {
            threshold: 0.5
        };
        const faders = document.querySelectorAll('.fade-in');
        const appearOnScro1l = new IntersectionObserver(function (entries, appearOnScrool) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    return;
                }
                else {
                    entry.target.classList.add('appear');
                    appearOnScro1l.unobserve(entry.target);
                }
            })
        }, appearOptions)
        faders.forEach(fader => {
            appearOnScro1l.observe(fader);
        })
    });

    const [show, setShow] = useState(false)

    const handleDelete = () => {
        setShow(true)


    }





    const handleClose = () => {
        setShow(false)
    }


    useEffect(() => {
        if (state.PgList.deletePgSuccessStatusCode == 200) {
            setShow(false)
        }
    }, [state.PgList.deletePgSuccessStatusCode])


    useEffect(() => {
        if (state.PgList?.deletePgError) {
            setTimeout(() => {
                dispatch({ type: 'CLEAR_DELETE_PG_ERROR' })
            }, 3000);
        }
    }, [state.PgList?.deletePgError]);


    const handleMouseEnter = () => {
        setHoverPgCard(true)
    }

    const handleMouseLeave = () => {
        setHoverPgCard(false)
    }


    const handleSelectCard = (hostel) => {



        setSelectedHostel(hostel);


        setSaveHostel((prevHostel) => {

            const isHostelAlreadyAdded = prevHostel.some((h) => h.id === props.filteredData[0]?.id);


            if (!isHostelAlreadyAdded) {
                return [...prevHostel, props.filteredData[0]];
            }


            return prevHostel;
        });


        setSelectedHostelHover(true);
    };











    return (<>





        {
            props.filteredData[0] && (
                <Card className="animated-text ms-0 h-100 " style={{
                    borderRadius: 16, border: selectedHostelHover ? " 1px solid #1E45E1" : hoverPgCard ? "1px solid #9C9C9C" : "1px solid #E6E6E6", transition: "border 0.3s ease",
                    height: "auto",
                }}

                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                // onClick={() => handleSelectCard(props.hostel)}

                >
                    <Card.Body style={{ padding: 10 }}>
                        <div className="d-flex justify-content-between align-items-center flex-wrap" >
                            <div className='d-flex gap-2 align-items-center'>
                                <div className="">
                                    <Image src={
                                        props.filteredData[0] && (props.filteredData[0].profile !== undefined && props.filteredData[0].profile !== null && props.filteredData[0].profile !== "0")
                                            ? props.filteredData[0].profile
                                            : Vendors
                                    } roundedCircle
                                        style={{ height: "60px", width: "60px" }} />
                                </div>
                                <div >
                                    <div className='pb-2' onClick={() => handleSelectedHostel(props.filteredData[0]?.id)} >
                                        <label className='hover-hostel-name' style={{ fontSize: 16, color: "#1E45E1", fontWeight: 600, fontFamily: "Gilroy", textDecoration: 'underline' }}  >{props.filteredData[0] && props.filteredData[0].Name}</label>
                                    </div>
                                    <div>
                                        <div style={{ backgroundColor: "rgba(255, 239, 207, 1)", fontWeight: 500, width: "fit-content", padding: 5, borderRadius: 10, fontSize: 14, fontFamily: "Gilroy", color: 'rgba(34, 34, 34, 1)' }}>Paying Guest</div>
                                    </div>
                                </div>
                            </div>

                            <div

                            >
                                <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: showDots ? 1000 : 'auto' }}
                                    onClick={handleDotsClick}
                                // onClick={() => handleDotsClick(props.hostel.id)}
                                >
                                    <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />

                                    {showDots && <>

                                        <div ref={popupRef} style={{ cursor: "pointer", backgroundColor: "#F9F9F9", position: "absolute", right: 0, top: 50, width: 163, height: 92, border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", padding: 15, alignItems: "center" }}>
                                            <div >
                                                {/* <div className='d-flex gap-2 mb-2 align-items-center'
                                            onClick={() => handleEdit(props.hostel)} 
                                        >
                                           
                                            <div><Edit size="16" color="#1E45E1" />
                                            </div>
                                            <div>
                                                <label style={{ cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy", color: "#222222", cursor: "pointer" }} >Edit</label>

                                            </div>
                                        </div> */}
                                                <div
                                                    className="d-flex gap-2 mb-2 align-items-center"
                                                    onClick={!props.editPermissionError ? () => handleEdit(props.filteredData[0]) : undefined}
                                                    style={{
                                                        pointerEvents: props.editPermissionError ? "none" : "auto", // Disables interaction
                                                        opacity: props.editPermissionError ? 0.5 : 1, // Visual indication
                                                        // cursor: props.editPermissionError ? "not-allowed" : "pointer",

                                                    }}
                                                >
                                                    <div style={{ cursor: "pointer" }}>
                                                        <Edit size="16" color={props.editPermissionError ? "#A0A0A0" : "#1E45E1"} />
                                                    </div>
                                                    <div>
                                                        <label
                                                            style={{
                                                                fontSize: 14,
                                                                fontWeight: 600,
                                                                fontFamily: "Gilroy",
                                                                color: props.editPermissionError ? "#A0A0A0" : "#222222",
                                                                cursor: "pointer"
                                                            }}
                                                        >
                                                            Edit
                                                        </label>
                                                    </div>
                                                </div>

                                                {/* <div className='d-flex gap-2 mb-2 align-items-center'
                                            onClick={() => handleDelete(props.hostel)}
                                        >

                                            <div><Trash size="16"
                                                color="red"
                                            /></div> 
                                            <div>
                                            <label style={{ cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy", color: "#FF0000", cursor: "pointer" }}>Delete</label>

                                            </div>
                                        </div> */}
                                                <div
                                                    className="d-flex gap-2 mb-2 align-items-center"
                                                    onClick={!props.editPermissionError ? () => handleDelete(props.filteredData[0]) : undefined}
                                                    style={{
                                                        pointerEvents: props.editPermissionError ? "none" : "auto", // Disables interaction
                                                        opacity: props.editPermissionError ? 0.5 : 1, // Dims element when disabled
                                                        // cursor: props.editPermissionError ? "not-allowed" : "pointer", 
                                                        cursor: "pointer"
                                                    }}
                                                >
                                                    {/* Trash Icon */}
                                                    <div style={{ cursor: "pointer" }}>
                                                        <Trash
                                                            size="16"
                                                            color={props.editPermissionError ? "#A0A0A0" : "red"} // Gray when disabled
                                                        />
                                                    </div>

                                                    {/* Delete Label */}
                                                    <div>
                                                        <label
                                                            style={{
                                                                fontSize: 14,
                                                                fontWeight: 600,
                                                                fontFamily: "Gilroy",
                                                                color: props.editPermissionError ? "#A0A0A0" : "#FF0000", // Gray when disabled
                                                                cursor: "pointer"
                                                            }}
                                                        >
                                                            Delete
                                                        </label>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>


                                    </>}

                                </div>
                            </div>
                        </div>
                        <hr style={{ border: "1px solid #E7E7E7", margin: "0.5rem 0" }} />

                        <div className='row g-2  d-flex justify-content-between m-0'>
                            <div className='col-lg-4 col-md-4 col-xs-12 col-sm-12 h-100'>
                                <Card className='pt-2 ps-3  m-0' style={{ border: "1px solid  rgba(220, 220, 220, 1)", borderRadius: 12 }}>
                                    <label style={{ color: "#222", fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Available Beds</label>
                                    <div className=''>
                                        <label style={{ color: "#222222", fontSize: 24, fontWeight: 600, fontFamily: "Gilroy", textAlign: "center" }}>{props.filteredData[0] && props.filteredData[0].Bed}</label>
                                    </div>
                                </Card>
                            </div>
                            <div className='col-lg-4 col-md-4 col-xs-12 col-sm-12 h-100'>
                                <Card className='pt-2 ps-3 m-0' style={{ border: "1px solid  rgba(220, 220, 220, 1)", borderRadius: 12 }}>
                                    <label style={{ color: "#222", fontSize: 12, fontWeight: 500, fontFamily: "Gilroy", }}>Total Rooms</label>
                                    <div className=''>
                                        <label style={{ color: "#222222", fontSize: 24, fontWeight: 600, fontFamily: "Gilroy", textAlign: "center" }}>{props.filteredData[0] && props.filteredData[0].roomCount}</label>
                                    </div>
                                </Card>
                            </div>
                            <div className='col-lg-4 col-md-4 col-xs-12 col-sm-12 h-100'>
                                <Card className='pt-2 ps-3 m-0' style={{ border: "1px solid  rgba(220, 220, 220, 1)", borderRadius: 12 }}>
                                    <label style={{ color: "#222", fontSize: 12, fontWeight: 500, fontFamily: "Gilroy", }}>Occupied Beds</label>
                                    <div className=''>
                                        <label style={{ color: "#222222", fontSize: 24, fontWeight: 600, fontFamily: "Gilroy", textAlign: "center" }}> {props.filteredData[0] && props.filteredData[0].occupied_Bed}</label>
                                    </div>
                                </Card>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-1 mt-1 flex-wrap" >

                            <div className='pb-1' style={{ lineHeight: 1 }} >
                                <div className='pb-1'>
                                    <label style={{ color: "#939393", fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Email ID </label>
                                </div>
                                <div >
                                    <label style={{ color: "#222222", fontSize: 16, fontWeight: 600, fontFamily: "Gilroy" }}>{props.filteredData[0]?.email_id && props.filteredData[0]?.email_id !== "undefined" ? props.filteredData[0]?.email_id : "N/A"}
                                    </label>
                                </div>

                            </div>

                            <div className='pb-1' style={{ lineHeight: 1 }}>
                                <div className=''>
                                    <label style={{ color: "#939393", fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Floor</label>
                                </div>
                                <div className='text-center' >
                                    <label style={{ color: "#222222", fontSize: 16, fontWeight: 600, fontFamily: "Gilroy" }}> {props.filteredData[0] && props.filteredData[0].floorcount}
                                    </label>
                                </div>

                            </div>

                            <div className='pb-1' style={{ lineHeight: 1 }}>
                                <div className=''>
                                    <label style={{ color: "#939393", fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Contact Number</label>
                                </div>
                                <div>
                                    <label style={{ color: "#222222", fontSize: 16, fontWeight: 600, fontFamily: "Gilroy" }}>
                                        +{props.filteredData[0] && String(props.filteredData[0].hostel_PhoneNo).slice(0, String(props.filteredData[0].hostel_PhoneNo).length - 10)}
                                        {' '}
                                        {props.filteredData[0] && String(props.filteredData[0].hostel_PhoneNo).slice(-10)}
                                    </label>
                                </div>


                            </div>
                        </div>

                        <div className='mb-2' style={{ lineHeight: 1 }}>
                            <div className='mb-1' style={{}}>
                                <label style={{ color: "#939393", fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}> Address</label>

                            </div>

                            <div style={{ lineHeight: 1.5 }}>
                                <label style={{ color: "#222222", fontSize: 16, fontWeight: 600, fontFamily: "Gilroy" }}>{props.filteredData[0] && props.filteredData[0].Address}</label>
                            </div>

                        </div>




                    </Card.Body>

                </Card>
            )

            // : 
            //     <>
            //         <div
            //             style={{
            //                 display: "flex",
            //                 flexDirection: "column",
            //                 alignItems: "center",
            //                 justifyContent: "center",
            //                 //   height: "100vh",
            //             }}
            //         >
            //             {/* Image */}
            //             <img
            //                 src={EmptyState}
            //                 alt="Empty State"
            //                 style={{ maxWidth: "100%", height: "auto" }}
            //             />

            //             {/* Permission Error */}

            //             <div>
            //                 <Button
            //                     onClick={props.handleShowsettingsPG}
            //                     //   disabled={addPermissionError}
            //                     style={{
            //                         fontFamily: "Gilroy",
            //                         fontSize: 14,
            //                         backgroundColor: "#1E45E1",
            //                         color: "white",
            //                         fontWeight: 600,
            //                         borderRadius: 8,
            //                         padding: "16px 20px 16px 20px",
            //                     }}
            //                 >
            //                     {" "}
            //                     + Manage PG
            //                 </Button>
            //             </div>

            //         </div>
            //     </>
        }




        {show &&
            <Modal show={show} onHide={handleClose} centered backdrop="static"
                style={{
                    width: 388,
                    height: 250,
                    marginLeft: "500px",
                    marginTop: "200px",
                }}>
                <Modal.Header style={{
                    borderBottom: "none",
                    justifyContent: "center",
                    display: "flex"
                }}>
                    <Modal.Title style={{
                        fontSize: 18,
                        fontWeight: 600,
                        fontFamily: "Gilroy"
                    }}>Delete paying guest?</Modal.Title>


                    {/* <CloseCircle size="24" color="#000"  onClick={handleClose}/> */}
                </Modal.Header>

                {state.PgList?.deletePgError && (
                    <div className="d-flex align-items-center p-1 mb-2">
                        <MdError style={{ color: "red", marginRight: '5px' }} />
                        <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                            {state.PgList?.deletePgError}
                        </label>
                    </div>
                )}

                <Modal.Body style={{ fontSize: 14, fontWeight: 600, fontFamily: "Gilroy", textAlign: "center", marginTop: "-20px" }}>
                    Are you sure you want to delete this paying guest?
                </Modal.Body>


                <Modal.Footer className='d-flex justify-content-center' style={{ border: "none" }}>
                    <Button onClick={handleClose} style={{ borderRadius: 8, padding: "16px 45px", border: "1px solid rgba(36, 0, 255, 1)", backgroundColor: "#FFF", color: "rgba(36, 0, 255, 1)", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>
                        Cancel
                    </Button>
                    <Button style={{ borderRadius: 8, padding: "16px 45px", border: "1px solid rgba(36, 0, 255, 1)", backgroundColor: "rgba(36, 0, 255, 1)", color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}
                        onClick={() => handleDeletePG(props.filteredData[0])}
                    >
                        Delete
                    </Button>

                </Modal.Footer>
            </Modal>}
    </>
    )
}

export default PayingHostel;