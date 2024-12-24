import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import Ellipse5 from "../Assets/Images/Group 1.png";
import like from "../Assets/Images/like.png";
import message from "../Assets/Images/message.png";
import { CloseCircle } from "iconsax-react";
import Search_Team from "../Assets/Images/Search Team.png";
import { MdError } from "react-icons/md";
import Emptystate from "../Assets/Images/Empty-State.jpg";
import { Modal, Button, Form, FormControl } from "react-bootstrap";
import "./DashboardAnnouncement.css";
import Profile from "../Assets/Images/New_images/profile-picture.png";

function DashboardAnnouncement(props) {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log("DashboardAnnouncement", state);
  const [showMainModal, setShowMainModal] = useState(false);
  const [showLikeModal, setShowLikeModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [showTittleModal, setshowTittleModal] = useState(false);
  const [hostel_id, setHostel_Id] = useState("");
  const [createprofile, setCreateProfile] = useState("");
  const handleShowAnnouncement = () => setShowAnnouncement(true);
  const handleCloseAnnouncement = () => setShowAnnouncement(false);

  //  card click
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowMainModal(true);
  };

  const handleCardTittleClick = (card) => {
    setSelectedCard(card);
    setshowTittleModal(true);
  };
  console.log("state.createAccount.accountList.user_details", createprofile);
  useEffect(() => {
    setCreateProfile(state.createAccount.accountList[0].user_details);
  }, [state.createAccount.accountList[0].user_details]);

  useEffect(() => {
    console.log("Current_hostelid", state.login.selectedHostel_Id);
    setHostel_Id(state.login.selectedHostel_Id);
  }, [state?.login?.selectedHostel_Id]);
  useEffect(() => {
    dispatch({
      type: "ANNOUNCEMENTLIST",
      payload: { hostel_id: hostel_id },
    });
  }, [hostel_id]);

  useEffect(() => {
    if (state.PgList.statuscodeForAnnounceMentList === 200) {
      setTimeout(() => {
        dispatch({ type: "CLEAR_ANNOUNCEMENT_LIST" });
      }, 1000);
    }
  }, [state.PgList.statuscodeForAnnounceMentList]);

  //  modal close
  const handleCloseMain = () => setShowMainModal(false);
  const handleCloseLike = () => setShowLikeModal(false);
  const handleCloseComment = () => setShowCommentModal(false);
  const handleCloseTittle = () => setshowTittleModal(false);
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end", // Aligns content to the right
          marginBottom: "10px",
          marginTop: "-70px",
          zIndex: 10,
          position: "absolute",
          right: 0,
          marginRight: "50px",
        }}
      >
        <Button
          style={{
            fontFamily: "Gilroy",
            fontSize: "14px",
            backgroundColor: "#1E45E1",
            color: "white",
            fontWeight: 600,
            borderRadius: "12px",
            padding: "11px 24px",
            width: "auto",
            maxWidth: "100%",
            marginBottom: "10px",
          }}
          onClick={handleShowAnnouncement}
          className="responsive-button"
        >
          + Add Announcement
        </Button>
      </div>

      {props.announcePermissionError ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Image */}
          <img
            src={Emptystate}
            alt="Empty State"
            style={{ maxWidth: "100%", height: "auto" }}
          />

          {/* Permission Error */}
          {props.announcePermissionError && (
            <div
              style={{
                color: "red",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "1rem",
              }}
            >
              <MdError />
              <span
                style={{
                  fontSize: "12px",
                  color: "red",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                {props.announcePermissionError}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div>
          {state.PgList?.announcementList?.announcements?.map((data) => (
            <Card
              className="card"
              key={data.id}
              style={{
                borderRadius: "16px",
                borderColor: "#DCDCDC",
                marginBottom: "20px",
                cursor: "pointer",
              }}
            >
              <Card.Body>
                <div className="d-flex bd-highlight">
                  <div className="p-2 flex-grow-1 bd-highlight">
                    <p
                      style={{
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        fontSize: "12px",
                        color: "#4B4B4B",
                        marginBottom: "0px",
                      }}
                    >
                      {/* {data.createdat} */}
                      {new Date(data.createdat).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <p
                      style={{
                        fontFamily: "Gilroy",
                        fontWeight: 600,
                        fontSize: "16px",
                        color: "#222222",
                        marginBottom: "0px",
                      }}
                      onClick={() => handleCardTittleClick(data)}
                    >
                      {data.title}
                    </p>
                    <p style={{ marginBottom: "0px" }}>
                      <img
                        src={createprofile.profile || Profile}
                        alt="Ellipse5"
                        width={25}
                        height={25}
                        onClick={() => handleCardClick(data)}
                      />
                      <span
                        style={{
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          fontSize: "12px",
                          color: "#222222",
                          paddingLeft: "6px",
                        }}
                      >
                        {createprofile.first_name} {createprofile.last_name}
                      </span>
                    </p>
                  </div>
                  <div
                    className="bd-highlight"
                    style={{
                      border: "1px solid #DCDCDC",
                      borderRadius: "60px",
                      height: "36px",
                      width: "83px",
                      marginTop: "6px",
                      marginRight: "6px",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLikeClick(data);
                    }}
                  >
                    <p style={{ padding: "4px 10px" }}>
                      <img src={like} alt="like" width={20} height={20} />
                      <span
                        style={{
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          fontSize: "12px",
                          color: "#222222",
                          paddingLeft: "4px",
                        }}
                      >
                        {/* {data.likes.toLocaleString()} */}1
                      </span>
                    </p>
                  </div>
                  <div
                    className="bd-highlight"
                    style={{
                      border: "1px solid #DCDCDC",
                      borderRadius: "60px",
                      height: "36px",
                      width: "72px",
                      marginTop: "6px",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCommentClick(data);
                    }}
                  >
                    <p style={{ padding: "4px 10px" }}>
                      <img src={message} alt="message" width={20} height={20} />
                      <span
                        style={{
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          fontSize: "12px",
                          color: "#222222",
                          paddingLeft: "4px",
                        }}
                      >
                        {/* {data.comments} */}1
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
              <Modal.Header
                className="d-flex justify-content-between align-items-center"
                style={{ border: "none" }}
              >
                <p
                  style={{
                    fontFamily: "Gilroy",
                    fontWeight: 600,
                    fontSize: "18px",
                    marginBottom: "0px",
                  }}
                >
                  August 2024 . Monthly Report
                </p>
                <CloseCircle
                  size="32"
                  color="#222222"
                  onClick={handleCloseMain}
                  style={{ cursor: "pointer" }}
                />
              </Modal.Header>
              <Modal.Body>
                <div className="d-flex justify-content-between">
                  <p style={{ marginBottom: "0px" }}>
                    <img src={Ellipse5} alt="Ellipse5" width={20} height={20} />
                    <span
                      style={{
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        fontSize: "12px",
                        color: "#222222",
                        paddingLeft: "6px",
                      }}
                    >
                      Akash Rathod
                    </span>
                  </p>
                  <p
                    style={{
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      fontSize: "12px",
                      color: "#4B4B4B",
                      paddingLeft: "6px",
                    }}
                  >
                    01 September 2024
                  </p>
                </div>

                <p
                  tyle={{
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "#222222",
                  }}
                >
                  {" "}
                  Lorem ipsum dolor sit amet consectetur. Tellus sed libero
                  commodo leo scelerisque turpis in gravida. Et facilisi eget id
                  consequat maecenas diam velit eget accumsan. Nam suspendisse
                  lectus vitae elementum integer. Velit sem nec eget id ac.
                  Sagittis sit mauris massa eget vel integer mattis pulvinar.
                  Eget aliquet{" "}
                </p>

                <div className="d-flex justify-content-start">
                  <div
                    style={{
                      border: "1px solid #DCDCDC",
                      borderRadius: "60px",
                      height: "36px",
                      width: "69px",
                      marginTop: "6px",
                      marginRight: "6px",
                    }}
                  >
                    <p style={{ padding: "4px 10px" }}>
                      <img src={like} alt="like" width={20} height={20} />
                      <span
                        style={{
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          fontSize: "12px",
                          color: "#222222",
                          paddingLeft: "4px",
                        }}
                      >
                        Like
                      </span>
                    </p>
                  </div>
                  <div
                    className=""
                    style={{
                      border: "1px solid #DCDCDC",
                      borderRadius: "60px",
                      height: "36px",
                      width: "103px",
                      marginTop: "6px",
                    }}
                  >
                    <p style={{ padding: "4px 10px" }}>
                      <img src={message} alt="message" width={20} height={20} />
                      <span
                        style={{
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          fontSize: "12px",
                          color: "#222222",
                          paddingLeft: "4px",
                        }}
                      >
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
              <Modal.Header
                className="d-flex justify-content-between align-items-center"
                style={{ border: "none" }}
              >
                <p
                  style={{
                    fontFamily: "Gilroy",
                    fontWeight: 600,
                    fontSize: "18px",
                    marginBottom: "0px",
                  }}
                >
                  August 2024 . Monthly Report
                </p>
                <CloseCircle
                  size="32"
                  color="#222222"
                  onClick={handleCloseLike}
                  style={{ cursor: "pointer" }}
                />
              </Modal.Header>
              <Modal.Body>
                <div>
                  <div className="d-flex justify-content-between">
                    <p style={{ marginBottom: "0px" }}>
                      <img
                        src={Ellipse5}
                        alt="Ellipse5"
                        width={20}
                        height={20}
                      />
                      <span
                        style={{
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          fontSize: "12px",
                          color: "#222222",
                          paddingLeft: "6px",
                        }}
                      >
                        Akash Rathod
                      </span>
                    </p>
                    <p
                      style={{
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        fontSize: "12px",
                        color: "#4B4B4B",
                        paddingLeft: "6px",
                      }}
                    >
                      01 September 2024
                    </p>
                  </div>

                  <p
                    tyle={{
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      fontSize: "14px",
                      color: "#222222",
                    }}
                  >
                    {" "}
                    Lorem ipsum dolor sit amet consectetur. Tellus sed libero
                    commodo leo scelerisque turpis in gravida. Et facilisi eget
                    id consequat maecenas diam velit eget accumsan. Nam
                    suspendisse lectus vitae elementum integer. Velit sem nec
                    eget id ac. Sagittis sit mauris massa eget vel integer
                    mattis pulvinar. Eget aliquet{" "}
                  </p>

                  <div
                    className="d-flex justify-content-start"
                    style={{
                      borderBottom: "1px solid #DCDCDC",
                      paddingBottom: "10px",
                    }}
                  >
                    <div
                      style={{
                        border: "1px solid #DCDCDC",
                        borderRadius: "60px",
                        height: "36px",
                        width: "69px",
                        marginTop: "6px",
                        marginRight: "6px",
                      }}
                    >
                      <p style={{ padding: "4px 10px" }}>
                        <img src={like} alt="like" width={20} height={20} />
                        <span
                          style={{
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            fontSize: "12px",
                            color: "#222222",
                            paddingLeft: "4px",
                          }}
                        >
                          Like
                        </span>
                      </p>
                    </div>
                    <div
                      className=""
                      style={{
                        border: "1px solid #DCDCDC",
                        borderRadius: "60px",
                        height: "36px",
                        width: "103px",
                        marginTop: "6px",
                      }}
                    >
                      <p style={{ padding: "4px 10px" }}>
                        <img
                          src={message}
                          alt="message"
                          width={20}
                          height={20}
                        />
                        <span
                          style={{
                            fontFamily: "Gilroy",
                            fontWeight: 500,
                            fontSize: "12px",
                            color: "#222222",
                            paddingLeft: "4px",
                          }}
                        >
                          Comment
                        </span>
                      </p>
                    </div>
                  </div>
                  {/* --- */}
                  <div className="">
                    <p style={{ marginBottom: "0px" }}>
                      <img
                        src={Ellipse5}
                        alt="Ellipse5"
                        width={20}
                        height={20}
                      />
                      <span
                        style={{
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          fontSize: "12px",
                          color: "#222222",
                          paddingLeft: "6px",
                        }}
                      >
                        Akash Rathod
                      </span>
                    </p>
                  </div>

                  <p
                    tyle={{
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      fontSize: "14px",
                      color: "#222222",
                    }}
                  >
                    {" "}
                    Lorem ipsum dolor sit amet consectetur. Tellus sed libero
                    commodo leo scelerisque turpis in gravida. Et facilisi eget
                    id consequat maecenas diam velit eget accumsan. Nam
                    suspendisse lectus vitae elementum integer. Velit sem nec
                    eget id ac. Sagittis sit mauris massa eget vel integer
                    mattis pulvinar. Eget aliquet{" "}
                  </p>

                  <div className="d-flex justify-content-start">
                    <div>
                      <p style={{ padding: "4px 10px" }}>
                        <img src={like} alt="like" width={20} height={20} />
                      </p>
                    </div>
                    <div className="">
                      <p style={{ padding: "4px 10px" }}>
                        <img
                          src={message}
                          alt="message"
                          width={20}
                          height={20}
                        />
                      </p>
                    </div>
                  </div>

                  <div className="">
                    <p style={{ marginBottom: "0px" }}>
                      <img
                        src={Ellipse5}
                        alt="Ellipse5"
                        width={20}
                        height={20}
                      />
                      <span
                        style={{
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          fontSize: "12px",
                          color: "#222222",
                          paddingLeft: "6px",
                        }}
                      >
                        Akash Rathod
                      </span>
                    </p>
                  </div>

                  <p
                    tyle={{
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      fontSize: "14px",
                      color: "#222222",
                    }}
                  >
                    {" "}
                    Lorem ipsum dolor sit amet consectetur. Tellus sed libero
                    commodo leo scelerisque turpis in gravida. Et facilisi eget
                    id consequat maecenas diam velit eget accumsan. Nam
                    suspendisse lectus vitae elementum integer. Velit sem nec
                    eget id ac. Sagittis sit mauris massa eget vel integer
                    mattis pulvinar. Eget aliquet{" "}
                  </p>

                  <div className="d-flex justify-content-start">
                    <div>
                      <p style={{ padding: "4px 10px" }}>
                        <img src={like} alt="like" width={20} height={20} />
                      </p>
                    </div>
                    <div className="">
                      <p style={{ padding: "4px 10px" }}>
                        <img
                          src={message}
                          alt="message"
                          width={20}
                          height={20}
                        />
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
              <Modal.Header
                className="d-flex justify-content-between align-items-center"
                style={{ border: "none" }}
              >
                <p
                  style={{
                    fontFamily: "Gilroy",
                    fontWeight: 600,
                    fontSize: "18px",
                    marginBottom: "0px",
                  }}
                >
                  August 2024 . Monthly Report
                </p>
                <CloseCircle
                  size="32"
                  color="#222222"
                  onClick={handleCloseComment}
                  style={{ cursor: "pointer" }}
                />
              </Modal.Header>
              <Modal.Body>
                <div>
                  <div className="d-flex justify-content-between">
                    <p style={{ marginBottom: "0px" }}>
                      <img
                        src={Ellipse5}
                        alt="Ellipse5"
                        width={20}
                        height={20}
                      />
                      <span
                        style={{
                          fontFamily: "Gilroy",
                          fontWeight: 500,
                          fontSize: "12px",
                          color: "#222222",
                          paddingLeft: "6px",
                        }}
                      >
                        Akash Rathod
                      </span>
                    </p>
                    <p
                      style={{
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        fontSize: "12px",
                        color: "#4B4B4B",
                        paddingLeft: "6px",
                      }}
                    >
                      01 September 2024
                    </p>
                  </div>

                  <p
                    style={{
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      fontSize: "14px",
                      color: "#222222",
                      paddingRight: "10px",
                    }}
                  >
                    {" "}
                    Lorem ipsum dolor sit amet consectetur. Tellus sed libero
                    commodo leo scelerisque turpis in gravida. Et facilisi eget
                    id consequat maecenas diam velit eget accumsan. Nam
                    suspendisse lectus vitae elementum integer. Velit sem nec
                    eget id ac. Sagittis sit mauris massa eget vel integer
                    mattis pulvinar. Eget aliquet{" "}
                  </p>

                  <div
                    className="d-flex justify-content-start"
                    style={{
                      borderBottom: "1px solid #DCDCDC",
                      paddingBottom: "",
                    }}
                  ></div>

                  <div
                    style={{ marginTop: "10px" }}
                    className="d-flex justify-content-between"
                  >
                    <p style={{ marginBottom: "0px" }}>
                      <img
                        src={Ellipse5}
                        alt="Ellipse5"
                        width={30}
                        height={30}
                      />
                      <span
                        style={{
                          fontFamily: "Gilroy",
                          fontWeight: 600,
                          fontSize: "14px",
                          color: "#222222",
                          paddingLeft: "6px",
                        }}
                      >
                        Saravanan
                      </span>
                    </p>
                  </div>

                  <p
                    style={{
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      fontSize: "14px",
                      color: "#222222",
                      paddingLeft: "35px",
                    }}
                  >
                    {" "}
                    Lorem ipsum dolor sit amet consectetur. Tellus sed libero
                    commodo leo scelerisque turpis in gravida. Et facilisi eget
                    id consequat maecenas diam velit eget accumsan. Nam
                    suspendisse lectus vitae elementum integer. Velit sem nec
                    eget id ac. Sagittis sit mauris massa eget vel integer
                    mattis pulvinar. Eget aliquet{" "}
                  </p>

                  <div
                    className="d-flex justify-content-start"
                    style={{ paddingLeft: "35px" }}
                  >
                    <div>
                      <p style={{ padding: "0px 10px" }}>
                        <img src={like} alt="like" width={20} height={20} />
                      </p>
                    </div>
                    <div>
                      <p style={{ padding: "0px 10px" }}>
                        <img
                          src={message}
                          alt="message"
                          width={20}
                          height={20}
                        />
                      </p>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    <p style={{ marginBottom: "0px" }}>
                      <img
                        src={Ellipse5}
                        alt="Ellipse5"
                        width={30}
                        height={30}
                      />
                      <span
                        style={{
                          fontFamily: "Gilroy",
                          fontWeight: 600,
                          fontSize: "14px",
                          color: "#222222",
                          paddingLeft: "6px",
                        }}
                      >
                        Vijay
                      </span>
                    </p>
                  </div>

                  <p
                    style={{
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      fontSize: "14px",
                      color: "#222222",
                      paddingLeft: "35px",
                    }}
                  >
                    {" "}
                    Lorem ipsum dolor sit amet consectetur. Tellus sed libero
                    commodo leo scelerisque turpis in gravida. Et facilisi eget
                    id consequat maecenas diam velit eget accumsan. Nam
                    suspendisse lectus vitae elementum integer. Velit sem nec
                    eget id ac. Sagittis sit mauris massa eget vel integer
                    mattis pulvinar. Eget aliquet{" "}
                  </p>

                  <div
                    style={{
                      marginTop: "10px",
                      position: "relative",
                      paddingLeft: "35px",
                    }}
                  >
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
                        width: "30px",
                        height: "30px",
                      }}
                    />
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          )}

          {/* titlemodal */}

          {selectedCard && (
            <Modal show={showTittleModal} onHide={handleCloseTittle} centered>
              <Modal.Header
                className="d-flex justify-content-between align-items-center"
                style={{ border: "none" }}
              >
                <p
                  style={{
                    fontFamily: "Gilroy",
                    fontWeight: 600,
                    fontSize: "18px",
                    marginBottom: "0px",
                  }}
                >
                  August 2024 . Monthly Report
                </p>
                <CloseCircle
                  size="32"
                  color="#222222"
                  onClick={handleCloseTittle}
                  style={{ cursor: "pointer" }}
                />
              </Modal.Header>
              <Modal.Body>
                <div className="d-flex justify-content-between">
                  <p style={{ marginBottom: "0px" }}>
                    <img src={Ellipse5} alt="Ellipse5" width={20} height={20} />
                    <span
                      style={{
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        fontSize: "12px",
                        color: "#222222",
                        paddingLeft: "6px",
                      }}
                    >
                      Akash Rathod
                    </span>
                  </p>
                  <p
                    style={{
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      fontSize: "12px",
                      color: "#4B4B4B",
                      paddingLeft: "6px",
                    }}
                  >
                    01 September 2024
                  </p>
                </div>

                <p
                  tyle={{
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                    fontSize: "14px",
                    color: "#222222",
                  }}
                >
                  {" "}
                  Lorem ipsum dolor sit amet consectetur. Tellus sed libero
                  commodo leo scelerisque turpis in gravida. Et facilisi eget id
                  consequat maecenas diam velit eget accumsan. Nam suspendisse
                  lectus vitae elementum integer. Velit sem nec eget id ac.
                  Sagittis sit mauris massa eget vel integer mattis pulvinar.
                  Eget aliquet{" "}
                </p>
              </Modal.Body>
            </Modal>
          )}
        </div>
      )}
      <Modal
        show={showAnnouncement}
        onHide={handleCloseAnnouncement}
        centered
        dialogClassName="custom-modal"
      >
        <Modal.Header style={{ marginBottom: "10px", position: "relative" }}>
          <div
            style={{
              fontSize: 20,
              fontWeight: 600,
              fontFamily: "Gilroy",
            }}
          >
            Add Announcement
          </div>
          <button
            type="button"
            className="close"
            aria-label="Close"
            onClick={handleCloseAnnouncement}
            style={{
              position: "absolute",
              right: "10px",
              top: "16px",
              border: "1px solid black",
              background: "transparent",
              cursor: "pointer",
              padding: "0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "32px",
              height: "32px",
              borderRadius: "50%",
            }}
          >
            <span
              aria-hidden="true"
              style={{
                fontSize: "30px",
                paddingBottom: "6px",
              }}
            >
              &times;
            </span>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            {/* Title Field */}
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <Form.Label
                style={{
                  fontSize: 14,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                Title
              </Form.Label>

              <FormControl
                type="text"
                id="form-title"
                placeholder="Enter Title"
                style={{
                  fontSize: 16,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                  boxShadow: "none",
                  border: "1px solid #D9D9D9",
                  height: 50,
                  borderRadius: 8,
                }}
              />
            </div>

            {/* Description Field */}
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-4">
              <Form.Label
                style={{
                  fontSize: 14,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                Description
              </Form.Label>

              <FormControl
                as="textarea"
                id="form-description"
                placeholder="Enter Description"
                rows={4} // Adjust number of rows as needed
                style={{
                  fontSize: 16,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                  boxShadow: "none",
                  border: "1px solid #D9D9D9",
                  borderRadius: 8,
                }}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button
            className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={{
              backgroundColor: "#1E45E1",
              fontWeight: 600,
              height: 50,
              borderRadius: 12,
              fontSize: 16,
              fontFamily: "Montserrat, sans-serif",
              marginTop: 20,
              width: "100%",
            }}
            onClick={handleCloseAnnouncement}
          >
            Add Announcement
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DashboardAnnouncement;
