import React, { useState } from "react";
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Ellipse5 from '../Assets/Images/Group 1.png';
import like from '../Assets/Images/like.png';
import message from '../Assets/Images/message.png';
import { CloseCircle } from 'iconsax-react';
import Search_Team from '../Assets/Images/Search Team.png'
import { MdError } from "react-icons/md";
import Emptystate from '../Assets/Images/Empty-State.jpg'

const cardData = [
    {
        date: "01 September 2024",
        title: "August 2024 . Monthly Report",
        author: "Akash Rathod",
        likes: 11565,
        comments: 986
    },
    {
        date: "01 September 2024",
        title: "August 2024 . Monthly Report",
        author: "Akash Rathod",
        likes: 11565,
        comments: 986
    },
    {
        date: "01 September 2024",
        title: "August 2024 . Monthly Report",
        author: "Akash Rathod",
        likes: 11565,
        comments: 986
    },
    {
        date: "01 September 2024",
        title: "August 2024 . Monthly Report",
        author: "Akash Rathod",
        likes: 11565,
        comments: 986
    },
    {
        date: "01 September 2024",
        title: "August 2024 . Monthly Report",
        author: "Akash Rathod",
        likes: 11565,
        comments: 986
    }
];

function DashboardAnnouncement(props) {
    const [showMainModal, setShowMainModal] = useState(false);
    const [showLikeModal, setShowLikeModal] = useState(false);
    const [showCommentModal, setShowCommentModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    //  card click 
    const handleCardClick = (card) => {
        setSelectedCard(card);
        setShowMainModal(true);
    };

    //  modal close
    const handleCloseMain = () => setShowMainModal(false);
    const handleCloseLike = () => setShowLikeModal(false);
    const handleCloseComment = () => setShowCommentModal(false);

    //  like and comment clicks
    const handleLikeClick = (card) => {
        setSelectedCard(card);
        setShowLikeModal(true);
    };

    const handleCommentClick = (card) => {
        setSelectedCard(card);
        setShowCommentModal(true);
    };

    return (
<>
{


props.announcePermissionError ?(
<div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
  {/* Image */}
  <img src={Emptystate} alt="Empty State" style={{ maxWidth: "100%", height: "auto" }} />

  {/* Permission Error */}
  {props.announcePermissionError && (
    <div style={{ color: "red", display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "1rem" }}>
      <MdError size={20} />
      <span>{props.announcePermissionError}</span>
    </div>
  )}
</div>
):

<div>
            {cardData.map((data, index) => (
                <Card
                    key={index}
                    style={{
                        borderRadius: "16px",
                        borderColor: "#DCDCDC",
                        marginBottom: "20px",
                        cursor: "pointer"
                    }}

                >
                    <Card.Body>
                        <div className='d-flex bd-highlight'>
                            <div className="p-2 flex-grow-1 bd-highlight">
                                <p style={{
                                    fontFamily: "Gilroy",
                                    fontWeight: 500,
                                    fontSize: "12px",
                                    color: "#4B4B4B",
                                    marginBottom: "0px"
                                }}>
                                    {data.date}
                                </p>
                                <p style={{
                                    fontFamily: "Gilroy",
                                    fontWeight: 600,
                                    fontSize: "16px",
                                    color: "#222222",
                                    marginBottom: "0px"
                                }}>
                                    {data.title}
                                </p>
                                <p style={{ marginBottom: "0px" }}>
                                    <img src={Ellipse5} alt="Ellipse5" width={20} height={20} onClick={() => handleCardClick(data)} />
                                    <span style={{
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                        fontSize: "12px",
                                        color: "#222222",
                                        paddingLeft: "6px"
                                    }}>
                                        {data.author}
                                    </span>
                                </p>
                            </div>
                            <div className="bd-highlight" style={{
                                border: "1px solid #DCDCDC",
                                borderRadius: "60px",
                                height: "36px",
                                width: "83px",
                                marginTop: "6px",
                                marginRight: "6px",
                                cursor: "pointer"
                            }} onClick={(e) => { e.stopPropagation(); handleLikeClick(data); }}>
                                <p style={{ padding: "4px 10px" }}>
                                    <img src={like} alt="like" width={20} height={20} />
                                    <span style={{
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                        fontSize: "12px",
                                        color: "#222222",
                                        paddingLeft: "4px"
                                    }}>
                                        {data.likes.toLocaleString()}
                                    </span>
                                </p>
                            </div>
                            <div className="bd-highlight" style={{
                                border: "1px solid #DCDCDC",
                                borderRadius: "60px",
                                height: "36px",
                                width: "72px",
                                marginTop: "6px",
                                cursor: "pointer"
                            }} onClick={(e) => { e.stopPropagation(); handleCommentClick(data); }}>
                                <p style={{ padding: "4px 10px" }}>
                                    <img src={message} alt="message" width={20} height={20} />
                                    <span style={{
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                        fontSize: "12px",
                                        color: "#222222",
                                        paddingLeft: "4px"
                                    }}>
                                        {data.comments}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
            ))}

            {/* Main Modal */}
            {selectedCard && (
                <Modal show={showMainModal} onHide={handleCloseMain} centered>

                    <Modal.Header className="d-flex justify-content-between align-items-center" style={{ border: "none" }}>
                        <p style={{
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                            fontSize: "18px",
                            marginBottom: "0px"
                        }}>August 2024 . Monthly Report</p>
                        <CloseCircle size="32" color="#222222" onClick={handleCloseMain} style={{ cursor: 'pointer' }} />
                    </Modal.Header>
                    <Modal.Body>
                        <div className="d-flex justify-content-between">
                            <p style={{ marginBottom: "0px" }}>
                                <img src={Ellipse5} alt="Ellipse5" width={20} height={20} />
                                <span style={{
                                    fontFamily: "Gilroy",
                                    fontWeight: 500,
                                    fontSize: "12px",
                                    color: "#222222",
                                    paddingLeft: "6px"
                                }}>
                                    Akash Rathod
                                </span>
                            </p>
                            <p style={{
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                                fontSize: "12px",
                                color: "#4B4B4B",
                                paddingLeft: "6px"
                            }}>01 September 2024</p>
                        </div>

                        <p tyle={{
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            fontSize: "14px",
                            color: "#222222"
                        }}> Lorem ipsum dolor sit amet consectetur. Tellus sed libero commodo leo scelerisque turpis in gravida. Et facilisi eget id consequat maecenas diam velit eget accumsan. Nam suspendisse lectus vitae elementum integer. Velit sem nec eget id ac. Sagittis sit mauris massa eget vel integer mattis pulvinar. Eget aliquet </p>

                        <div className="d-flex justify-content-start">
                            <div style={{
                                border: "1px solid #DCDCDC",
                                borderRadius: "60px",
                                height: "36px",
                                width: "69px",
                                marginTop: "6px",
                                marginRight: "6px"
                            }}>
                                <p style={{ padding: "4px 10px" }}>
                                    <img src={like} alt="like" width={20} height={20} />
                                    <span style={{
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                        fontSize: "12px",
                                        color: "#222222",
                                        paddingLeft: "4px"
                                    }}>
                                        Like
                                    </span>
                                </p>
                            </div>
                            <div className="" style={{
                                border: "1px solid #DCDCDC",
                                borderRadius: "60px",
                                height: "36px",
                                width: "103px",
                                marginTop: "6px"
                            }}>
                                <p style={{ padding: "4px 10px" }}>
                                    <img src={message} alt="message" width={20} height={20} />
                                    <span style={{
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                        fontSize: "12px",
                                        color: "#222222",
                                        paddingLeft: "4px"
                                    }}>
                                        Comment
                                    </span>
                                </p>
                            </div>
                        </div>
                    </Modal.Body>

                </Modal>
            )}

            {/* Like Modal */}
            {selectedCard && (
                <Modal show={showLikeModal} onHide={handleCloseLike} centered>
                    <Modal.Header className="d-flex justify-content-between align-items-center" style={{ border: "none" }}>
                        <p style={{
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                            fontSize: "18px",
                            marginBottom: "0px"
                        }}>August 2024 . Monthly Report</p>
                        <CloseCircle size="32" color="#222222" onClick={handleCloseLike} style={{ cursor: 'pointer' }} />
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="d-flex justify-content-between" >
                                <p style={{ marginBottom: "0px" }}>
                                    <img src={Ellipse5} alt="Ellipse5" width={20} height={20} />
                                    <span style={{
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                        fontSize: "12px",
                                        color: "#222222",
                                        paddingLeft: "6px"
                                    }}>
                                        Akash Rathod
                                    </span>
                                </p>
                                <p style={{
                                    fontFamily: "Gilroy",
                                    fontWeight: 500,
                                    fontSize: "12px",
                                    color: "#4B4B4B",
                                    paddingLeft: "6px"
                                }}>01 September 2024</p>
                            </div>

                            <p tyle={{
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                                fontSize: "14px",
                                color: "#222222"
                            }}> Lorem ipsum dolor sit amet consectetur. Tellus sed libero commodo leo scelerisque turpis in gravida. Et facilisi eget id consequat maecenas diam velit eget accumsan. Nam suspendisse lectus vitae elementum integer. Velit sem nec eget id ac. Sagittis sit mauris massa eget vel integer mattis pulvinar. Eget aliquet </p>

                            <div className="d-flex justify-content-start" style={{ borderBottom: "1px solid #DCDCDC", paddingBottom: "10px" }}>
                                <div style={{
                                    border: "1px solid #DCDCDC",
                                    borderRadius: "60px",
                                    height: "36px",
                                    width: "69px",
                                    marginTop: "6px",
                                    marginRight: "6px"
                                }}>
                                    <p style={{ padding: "4px 10px" }}>
                                        <img src={like} alt="like" width={20} height={20} />
                                        <span style={{
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                            fontSize: "12px",
                                            color: "#222222",
                                            paddingLeft: "4px"
                                        }}>
                                            Like
                                        </span>
                                    </p>
                                </div>
                                <div className="" style={{
                                    border: "1px solid #DCDCDC",
                                    borderRadius: "60px",
                                    height: "36px",
                                    width: "103px",
                                    marginTop: "6px"
                                }}>
                                    <p style={{ padding: "4px 10px" }}>
                                        <img src={message} alt="message" width={20} height={20} />
                                        <span style={{
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                            fontSize: "12px",
                                            color: "#222222",
                                            paddingLeft: "4px"
                                        }}>
                                            Comment
                                        </span>
                                    </p>
                                </div>
                            </div>
                            {/* --- */}
                            <div className="" >
                                <p style={{ marginBottom: "0px" }}>
                                    <img src={Ellipse5} alt="Ellipse5" width={20} height={20} />
                                    <span style={{
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                        fontSize: "12px",
                                        color: "#222222",
                                        paddingLeft: "6px"
                                    }}>
                                        Akash Rathod
                                    </span>
                                </p>

                            </div>

                            <p tyle={{
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                                fontSize: "14px",
                                color: "#222222"
                            }}> Lorem ipsum dolor sit amet consectetur. Tellus sed libero commodo leo scelerisque turpis in gravida. Et facilisi eget id consequat maecenas diam velit eget accumsan. Nam suspendisse lectus vitae elementum integer. Velit sem nec eget id ac. Sagittis sit mauris massa eget vel integer mattis pulvinar. Eget aliquet </p>

                            <div className="d-flex justify-content-start">
                                <div>
                                    <p style={{ padding: "4px 10px" }}>
                                        <img src={like} alt="like" width={20} height={20} />

                                    </p>
                                </div>
                                <div className="">
                                    <p style={{ padding: "4px 10px" }}>
                                        <img src={message} alt="message" width={20} height={20} />

                                    </p>
                                </div>
                            </div>

                            <div className="" >
                                <p style={{ marginBottom: "0px" }}>
                                    <img src={Ellipse5} alt="Ellipse5" width={20} height={20} />
                                    <span style={{
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                        fontSize: "12px",
                                        color: "#222222",
                                        paddingLeft: "6px"
                                    }}>
                                        Akash Rathod
                                    </span>
                                </p>

                            </div>

                            <p tyle={{
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                                fontSize: "14px",
                                color: "#222222"
                            }}> Lorem ipsum dolor sit amet consectetur. Tellus sed libero commodo leo scelerisque turpis in gravida. Et facilisi eget id consequat maecenas diam velit eget accumsan. Nam suspendisse lectus vitae elementum integer. Velit sem nec eget id ac. Sagittis sit mauris massa eget vel integer mattis pulvinar. Eget aliquet </p>

                            <div className="d-flex justify-content-start">
                                <div>
                                    <p style={{ padding: "4px 10px" }}>
                                        <img src={like} alt="like" width={20} height={20} />

                                    </p>
                                </div>
                                <div className="">
                                    <p style={{ padding: "4px 10px" }}>
                                        <img src={message} alt="message" width={20} height={20} />

                                    </p>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            )}

            {/* Comment Modal  */}
            {selectedCard && (
                <Modal show={showCommentModal} onHide={handleCloseComment} centered>
                    <Modal.Header className="d-flex justify-content-between align-items-center" style={{ border: "none" }}>
                        <p style={{
                            fontFamily: "Gilroy",
                            fontWeight: 600,
                            fontSize: "18px",
                            marginBottom: "0px"
                        }}>August 2024 . Monthly Report</p>
                        <CloseCircle size="32" color="#222222" onClick={handleCloseComment} style={{ cursor: 'pointer' }} />
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            <div className="d-flex justify-content-between">
                                <p style={{ marginBottom: "0px" }}>
                                    <img src={Ellipse5} alt="Ellipse5" width={20} height={20} />
                                    <span style={{
                                        fontFamily: "Gilroy",
                                        fontWeight: 500,
                                        fontSize: "12px",
                                        color: "#222222",
                                        paddingLeft: "6px"
                                    }}>
                                        Akash Rathod
                                    </span>
                                </p>
                                <p style={{
                                    fontFamily: "Gilroy",
                                    fontWeight: 500,
                                    fontSize: "12px",
                                    color: "#4B4B4B",
                                    paddingLeft: "6px"
                                }}>01 September 2024</p>
                            </div>

                            <p tyle={{
                                fontFamily: "Gilroy",
                                fontWeight: 500,
                                fontSize: "14px",
                                color: "#222222"
                            }}> Lorem ipsum dolor sit amet consectetur. Tellus sed libero commodo leo scelerisque turpis in gravida. Et facilisi eget id consequat maecenas diam velit eget accumsan. Nam suspendisse lectus vitae elementum integer. Velit sem nec eget id ac. Sagittis sit mauris massa eget vel integer mattis pulvinar. Eget aliquet </p>

                            <div className="d-flex justify-content-start" style={{ borderBottom: "1px solid #DCDCDC", paddingBottom: "10px" }} >
                                <div style={{
                                    border: "1px solid #DCDCDC",
                                    borderRadius: "60px",
                                    height: "36px",
                                    width: "69px",
                                    marginTop: "6px",
                                    marginRight: "6px"
                                }}>
                                    <p style={{ padding: "4px 10px" }}>
                                        <img src={like} alt="like" width={20} height={20} />
                                        <span style={{
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                            fontSize: "12px",
                                            color: "#222222",
                                            paddingLeft: "4px"
                                        }}>
                                            Like
                                        </span>
                                    </p>
                                </div>
                                <div className="" style={{
                                    border: "1px solid #DCDCDC",
                                    borderRadius: "60px",
                                    height: "36px",
                                    width: "103px",
                                    marginTop: "6px"
                                }}>
                                    <p style={{ padding: "4px 10px" }}>
                                        <img src={message} alt="message" width={20} height={20} />
                                        <span style={{
                                            fontFamily: "Gilroy",
                                            fontWeight: 500,
                                            fontSize: "12px",
                                            color: "#222222",
                                            paddingLeft: "4px"
                                        }}>
                                            Comment
                                        </span>
                                    </p>
                                </div>
                            </div>
                            <div style={{ marginTop: "10px", position: "relative" }}>
                                <input
                                    type="text"
                                    placeholder="Post your reply here..."
                                    style={{
                                        width: "100%",
                                        padding: "8px 40px 8px 8px",
                                        borderRadius: "8px",
                                        border: "1px solid #DCDCDC",
                                        fontFamily: "Gilroy",
                                        fontSize: "14px",
                                        outline: "none",
                                    }}
                                />
                                <img
                                    src={Search_Team}
                                    alt="Search_Team"
                                    style={{
                                        position: "absolute",
                                        right: "10px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        width: "20px",
                                        height: "20px"
                                    }}
                                />
                            </div>

                        </div>
                    </Modal.Body>
                </Modal>
            )}
        </div>
}

        
        </>
    );
}

export default DashboardAnnouncement;
