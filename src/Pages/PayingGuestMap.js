import React, { useState, useEffect, useRef } from 'react';
import Edit from '../Assets/Images/New_images/edit.png';
import Delete from '../Assets/Images/New_images/trash.png';
import { PiDotsThreeCircleVerticalThin } from "react-icons/pi";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Card from 'react-bootstrap/Card';
import Vendors from '../Assets/Images/New_images/profile-picture.png';
import Badge from 'react-bootstrap/Badge';
import Image from 'react-bootstrap/Image';
import Swal from 'sweetalert2';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { MdError } from "react-icons/md";



function PayingGuestMap(props) {

    const state = useSelector(state => state)
    const dispatch = useDispatch();

    const [showDots, setShowDots] = useState(false);

    const [activeHostel, setActiveHostel] = useState(null);

    const popupRef = useRef(null);



    console.log("popupRef", popupRef)




    const handleEdit = (item) => {
        console.log("item", item)
        props.OnEditHostel(item)
    };



    const handleDeletePG = (item) => {
        console.log("item", item)
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
    return (<>

        <Card className="h-100 animated-text" key={props.hostel && props.hostel.id} style={{ borderRadius: 16, border: "1px solid #E6E6E6" }} >
            <Card.Body style={{ padding: 20 }}>
                <div className="d-flex justify-content-between align-items-center flex-wrap" >
                    <div className='d-flex gap-2'>
                        <div className="">
                            <Image src={props.hostel && props.hostel.profile ? props.hostel.profile : Vendors} roundedCircle style={{ height: "60px", width: "60px" }} />
                        </div>
                        <div >
                            <div className='pb-2' onClick={() => handleSelectedHostel(props.hostel.id)} >
                                <label className='hover-hostel-name' style={{ fontSize: 16, color: "#222222", fontWeight: 600, fontFamily: "Gilroy" }}  >{props.hostel && props.hostel.Name}</label>
                            </div>
                            <div>
                                <div style={{ backgroundColor: "rgba(255, 239, 207, 1)", fontWeight: 500, width: "fit-content", padding: 5, borderRadius: 10, fontSize: 14, fontFamily: "Gilroy", color: 'rgba(34, 34, 34, 1)' }}>Paying Guest</div>
                            </div>
                        </div>
                    </div>

                    <div
                    //  onMouseEnter={handleMouseEnter}
                    //         onMouseLeave={handleMouseLeave}
                    >
                        <div style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: showDots ? 1000 : 'auto' }}
                            onClick={handleDotsClick}
                        // onClick={() => handleDotsClick(props.hostel.id)}
                        >
                            <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />

                            {showDots && <>

                                <div ref={popupRef} style={{ cursor: "pointer", backgroundColor: "#fff", position: "absolute", right: 0, top: 50, width: 163, height: 92, border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", padding: 15, alignItems: "center" }}>
                                    <div >
                                        <div className='mb-2'
                                            onClick={() => handleEdit(props.hostel)}
                                        >
                                            <img src={Edit} style={{ height: 16, width: 16 }} /> <label style={{ cursor: "pointer", fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", color: "#222222", cursor: "pointer" }} >Edit</label>
                                        </div>
                                        <div
                                            onClick={() => handleDelete(props.hostel)}
                                        >

                                            <img src={Delete} style={{ height: 16, width: 16 }} /> <label style={{ cursor: "pointer", fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", color: "#FF0000", cursor: "pointer" }}>Delete</label>
                                        </div>
                                    </div>
                                </div>


                            </>}

                        </div>
                    </div>
                </div>
                <hr style={{ border: "1px solid #E7E7E7" }} />

                <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">

                    <div className='mb-2'>
                        <div className='mb-1'>
                            <label style={{ color: "#939393", fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Email ID </label>
                        </div>
                        <div >
                            <label style={{ color: "#222222", fontSize: 16, fontWeight: 600, fontFamily: "Gilroy" }}>{props.hostel && props.hostel.email_id}</label>
                        </div>

                    </div>
                    <div className='mb-2'>
                        <div className='mb-1'>
                            <label style={{ color: "#939393", fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}>Contact Number</label>
                        </div>
                        <div>
                            <label style={{ color: "#222222", fontSize: 16, fontWeight: 600, fontFamily: "Gilroy" }}>
                                +{props.hostel && String(props.hostel.hostel_PhoneNo).slice(0, String(props.hostel.hostel_PhoneNo).length - 10)}
                                {' '}
                                {props.hostel && String(props.hostel.hostel_PhoneNo).slice(-10)}
                            </label>
                        </div>


                    </div>
                </div>

                <div className='mb-2'>
                    <div className='mb-1'>
                        <label style={{ color: "#939393", fontSize: 12, fontWeight: 500, fontFamily: "Gilroy" }}> Address</label>

                    </div>

                    <div>
                        <label style={{ color: "#222222", fontSize: 16, fontWeight: 600, fontFamily: "Gilroy" }}>{props.hostel && props.hostel.Address}</label>
                    </div>

                </div>




            </Card.Body>

        </Card>


        {show &&
            <Modal show={show} onHide={handleClose} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title style={{ fontSize: 18, fontWeight: 600, fontFamily: "Gilroy" }}>Delete PG ?</Modal.Title>
                </Modal.Header>

                {state.PgList?.deletePgError && (
                    <div className="d-flex align-items-center p-1 mb-2">
                        <MdError style={{ color: "red", marginRight: '5px' }} />
                        <label className="mb-0" style={{ color: "red", fontSize: "12px", fontFamily: "Gilroy", fontWeight: 500 }}>
                            {state.PgList?.deletePgError}
                        </label>
                    </div>
                )}

                <Modal.Body style={{ fontSize: 18, fontWeight: 600, fontFamily: "Gilroy" }}>
                    Are you sure you want to delete the Paying Guest?
                </Modal.Body>


                <Modal.Footer className='d-flex justify-content-center' style={{ border: "none" }}>
                    <Button onClick={handleClose} style={{ width: 160, height: 52, borderRadius: 8, padding: "16px, 45px, 16px, 45px", border: "1px solid rgba(36, 0, 255, 1)", backgroundColor: "#FFF", color: "rgba(36, 0, 255, 1)", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>
                        Cancel
                    </Button>
                    <Button style={{ width: 160, height: 52, borderRadius: 8, padding: "16px, 45px, 16px, 45px", border: "1px solid rgba(36, 0, 255, 1)", backgroundColor: "rgba(36, 0, 255, 1)", color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}
                        onClick={() => handleDeletePG(props.hostel)}
                    >
                        Delete
                    </Button>

                </Modal.Footer>
            </Modal>}
    </>
    )
}

export default PayingGuestMap