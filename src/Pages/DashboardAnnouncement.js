import React, { useEffect, useState, useRef } from "react";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import Ellipse5 from "../Assets/Images/Group 1.png";
import like from "../Assets/Images/like.png";
import message from "../Assets/Images/message.png";
import Search_Team from "../Assets/Images/Search Team.png";
import { MdError } from "react-icons/md";
import Emptystate from "../Assets/Images/Empty-State.jpg";
import { Modal, Button, Form, FormControl } from "react-bootstrap";
import "./DashboardAnnouncement.css";
import Profile from "../Assets/Images/New_images/profile-picture.png";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Delete from '../Assets/Images/New_images/trash.png';
import { ArrowUp2, ArrowDown2, CloseCircle, SearchNormal1, Sort, Edit, Trash, ProfileAdd } from 'iconsax-react';


function DashboardAnnouncement(props) {
  const state = useSelector((state) => state);


  const dispatch = useDispatch();
  const [showMainModal, setShowMainModal] = useState(false);
  const [showLikeModal, setShowLikeModal] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showAnnouncement, setShowAnnouncement] = useState(false);
  const [showTittleModal, setshowTittleModal] = useState(false);
  const [hostel_id, setHostel_Id] = useState("");
  const [createprofile, setCreateProfile] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescrption] = useState("");
  const [titleError, setTitleError] = useState("")
  const [descriptionError, setDescriptionError] = useState("")
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showDots, setShowDots] = useState(null);
  const [editDetails, setEditDetails] = useState('')
  const [deletedID, setDeletedID] = useState('')
  const [displayDeletePopUP, setDisplayDeletePopUP] = useState(false)
  const popupRef = useRef(null);

  const handleShowAnnouncement = () => {
    setShowAnnouncement(true);
    setEditDetails('')
    setDescrption('');
    setTitle('')
  }


  const handleCloseAnnouncement = () => {
    setShowAnnouncement(false)
    setDescriptionError("")
    setErrorMessage('')
    setTitleError("")
    dispatch({ type: 'CLEAR_SAME_TITLE' });
    dispatch({ type: 'CLEAR_TITTLE_UNIQUE' });
  }

  //  card click
  const handleCardClick = (card) => {
    setSelectedCard(card);
    setShowMainModal(true);
  };

  const handleCardTittleClick = (card) => {
    setSelectedCard(card);
    setshowTittleModal(true);
  };

  const handleTitle = (e) => {
    const inputValue = e.target.value;
    dispatch({ type: 'CLEAR_SAME_TITLE' });
    dispatch({ type: 'CLEAR_TITTLE_UNIQUE' });
    setTitle(inputValue);
    setTitleError("")
    setErrorMessage('')

  };



  const handleDescrpton = (e) => {
    setDescrption(e.target.value);
    setDescriptionError("")
    setErrorMessage('')
  };

  useEffect(() => {
    setCreateProfile(state.createAccount?.accountList[0]?.user_details);
  }, [state.createAccount.accountList[0]?.user_details]);

  useEffect(() => {
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

  const handleLikeClick = (card) => {
    setSelectedCard(card);
    setShowLikeModal(true);
  };

  const handleCommentClick = (card) => {
    setSelectedCard(card);
    setShowCommentModal(true);
  };



  const validateField = (value, fieldName) => {
    if (!value || (typeof value === "string" && value.trim() === "")) {
      switch (fieldName) {

        case "title":
          setTitleError("title is required");
          break;
        case "description":
          setDescriptionError("Description is required");
          break;
        default:
          break;
      }
      return false;
    }
    return true;
  };

  const handleSaveAnnonce = () => {
    if (!validateField(title, "title"));
    if (!validateField(description, "description"));

    const noChanges =
      editDetails &&
      title === editDetails.title &&
      description === editDetails.description;

    if (noChanges) {
      setErrorMessage("No changes made to the announcement")
      return;
    }

    if (title && description) {
      if (editDetails) {
        dispatch({
          type: "ADDANNOUNCEMENT",
          payload: { id: editDetails.id, hostel_id: hostel_id, title: title, description: description },
        });
      } else {
        dispatch({
          type: "ADDANNOUNCEMENT",
          payload: { hostel_id: hostel_id, title: title, description: description },
        });
      }

    }
  };

  useEffect(() => {
    if (state.PgList.statuscodeForAddAnnouncement === 200 || state.PgList?.deleteAnnounmentSuccessStatus == 200) {
      handleCloseAnnouncement();
      setDisplayDeletePopUP(false)
      dispatch({
        type: "ANNOUNCEMENTLIST",
        payload: { hostel_id: hostel_id },
      });
    }
    setTimeout(() => {
      dispatch({ type: "CLEAR_ADD_ANNOUNCEMENT" });
      dispatch({ type: 'REMOVE_DELETE_ANNOUNCEMENT' })

    }, 200);
  }, [state.PgList.statuscodeForAddAnnouncement, state.PgList?.deleteAnnounmentSuccessStatus]);





  const handleCloseDeletePopUP = () => {
    setDisplayDeletePopUP(false)
  }


  const handleDeleteConfirm = () => {
    if (deletedID) {
      dispatch({ type: 'DELETEANNOUNCEMENT', payload: { id: deletedID } })
    }
  }

  const handleShowDots = (id) => {
    setShowDots((prevId) => (prevId === id ? null : id));
  }

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




  const handleEdit = (editedItem) => {
    console.log("editedItem", editedItem)
    setShowAnnouncement(true);
    setEditDetails(editedItem)


  }

  const handleDelete = (DeletedItem) => {
    console.log("DeletedItem", DeletedItem)
    setDeletedID(DeletedItem.id)
    setDisplayDeletePopUP(true)

  }



  useEffect(() => {
    if (editDetails) {
      setTitle(editDetails.title)
      setDescrption(editDetails.description)
    }

  }, [editDetails])










  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
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
            maxHeight: 50,
            marginTop: "-20px",

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
          {state.PgList?.announcementList?.announcements?.length > 0 ? (
            state.PgList?.announcementList?.announcements?.map((data) => (
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
                  <div className="d-flex bd-highlight align-items-center">
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



                    <div className="ms-2 me-2" style={{ cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative", zIndex: showDots ? 1000 : 'auto' }} onClick={() => handleShowDots(data.id)}>
                      <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />

                      {showDots === data.id && (
                        <div
                          ref={popupRef}
                          style={{
                            cursor: "pointer",
                            backgroundColor: "#F9F9F9",
                            position: "absolute",
                            right: 0,
                            top: 50,
                            width: 163,
                            height: 92,
                            border: "1px solid #EBEBEB",
                            borderRadius: 10,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            padding: "15px",
                            alignItems: "flex-start"
                          }}
                        >
                          <div
                            className="mb-2 gap-2"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "20px",
                              cursor: "pointer",
                              pointerEvents: "auto",
                              // cursor: props.vendorEditPermission ? "not-allowed" : "pointer",
                              // pointerEvents: props.vendorEditPermission ? "none" : "auto",
                              // opacity: props.vendorEditPermission ? 0.5 : 1,
                            }}
                            onClick={() => {
                              // if (!props.vendorEditPermission) {
                              handleEdit(data);
                              // }
                            }}
                          >
                            <Edit size="16" color="#1E45E1" />
                            <label
                              style={{
                                fontSize: 14,
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                                color: "#222222",
                                cursor: "pointer",
                                // cursor: props.vendorEditPermission ? "not-allowed" : "pointer",
                              }}
                            >
                              Edit
                            </label>
                          </div>


                          <div
                            className="mb-2 gap-2"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "10px",
                              cursor: "pointer",
                              pointerEvents: "auto",

                              // cursor: props.vendorDeletePermission ? "not-allowed" : "pointer",
                              // pointerEvents: props.vendorDeletePermission ? "none" : "auto",
                              // opacity: props.vendorDeletePermission ? 0.5 : 1,
                            }}
                            onClick={() => {
                              // if (!props.vendorDeletePermission) {
                              handleDelete(data);
                              // }
                            }}
                          >
                            <img
                              src={Delete}
                              alt="Delete"
                              style={{ height: 16, width: 16 }}
                            />
                            <label
                              style={{
                                fontSize: 14,
                                fontWeight: 600,
                                fontFamily: "Gilroy",
                                color: "#FF0000",
                                cursor: "pointer",
                              }}
                            >
                              Delete
                            </label>
                          </div>

                        </div>
                      )}


                    </div>





                  </div>
                </Card.Body>
              </Card>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",

              }}
            >
              <div style={{ textAlign: "center" }}>
                <img src={Emptystate} alt="emptystate" />
              </div>
              <div
                className="pb-1"
                style={{
                  textAlign: "center",
                  fontWeight: 600,
                  fontFamily: "Gilroy",
                  fontSize: 20,
                  color: "rgba(75, 75, 75, 1)",
                  marginBottom: "16px", // Add some spacing between the text and button
                }}
              >
                No announcements available.
              </div>
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
                  alignItems: "center",
                  textAlign: "center",
                }}
                onClick={handleShowAnnouncement}
                className="responsive-button"
              >
                + Add Announcement
              </Button>
            </div>

          )
          }


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
                  August
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
                      Akash
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
                  Monthly Report
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
                  Monthly
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

          {

          }

          {selectedCard &&
            state.PgList?.announcementList?.announcements?.map((data, index) => (
              <Modal
                key={index}
                show={showTittleModal}
                onHide={handleCloseTittle}
                centered
              >
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
                    {data.title}
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
                      <img src={createprofile.profile || Profile} alt="Ellipse5" width={20} height={20} />
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
                    <p
                      style={{
                        fontFamily: "Gilroy",
                        fontWeight: 500,
                        fontSize: "12px",
                        color: "#4B4B4B",
                        paddingLeft: "6px",
                      }}
                    >
                      {new Date(data.createdat).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  <p
                    style={{
                      fontFamily: "Gilroy",
                      fontWeight: 500,
                      fontSize: "14px",
                      color: "#222222",
                    }}
                  >
                    {data.description}
                  </p>
                </Modal.Body>
              </Modal>
            ))}

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
            {editDetails ? 'Edit Announcement' : 'Add Announcement'}
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
        {errorMessage && (
          <div style={{ color: "red" }}>
            <MdError />
            <span className="ms-2" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{errorMessage}</span>
          </div>
        )}
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
                value={title}
                onChange={(e) => handleTitle(e)}
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
              {titleError && (
                <div style={{ color: "red" }}>
                  <MdError />
                  <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{titleError}</span>
                </div>
              )}
              {state.PgList.TitleAlready && (
                <label
                  style={{
                    color: "red",
                    fontSize: 12,
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  {state.PgList.TitleAlready}
                </label>
              )}
              {state.PgList.TittleUnique && (
                <label
                  style={{
                    color: "red",
                    fontSize: 12,
                    fontFamily: "Gilroy",
                    fontWeight: 500,
                  }}
                >
                  {state.PgList.TittleUnique}
                </label>
              )}

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
                value={description}
                onChange={(e) => handleDescrpton(e)}
                rows={4}
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
              {descriptionError && (
                <div style={{ color: "red" }}>
                  <MdError />
                  <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{descriptionError}</span>
                </div>
              )}
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
              fontFamily: "Montserrat",
              marginTop: 20,
              width: "100%",
            }}
            onClick={handleSaveAnnonce}
          >
            {editDetails ? 'Save Changes' : 'Add Announcement'}
          </Button>
        </Modal.Footer>
      </Modal>






      <Modal
        show={displayDeletePopUP}
        onHide={handleCloseDeletePopUP}
        centered
        backdrop="static"
        style={{ width: 388, height: 250, marginLeft: '500px', marginTop: '200px' }}
      >
        <Modal.Header style={{ borderBottom: 'none' }}>
          <Modal.Title
            style={{
              fontSize: '18px',
              fontFamily: 'Gilroy',
              textAlign: 'center',
              fontWeight: 600,
              color: '#222222',
              flex: 1
            }}
          >
            Delete Announcement?
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          style={{
            fontSize: 14,
            fontWeight: 500,
            fontFamily: 'Gilroy',
            color: '#646464',
            textAlign: 'center',
            marginTop: '-20px'
          }}
        >
          Are you sure you want Delete Announcement?
        </Modal.Body>

        <Modal.Footer style={{ justifyContent: 'center', borderTop: 'none', marginTop: '-10px' }}>
          <Button
            style={{
              width: 160,
              height: 52,
              borderRadius: 8,
              padding: '12px 20px',
              background: '#fff',
              color: '#1E45E1',
              border: '1px solid #1E45E1',
              fontWeight: 600,
              fontFamily: 'Gilroy',
              fontSize: '14px',
              marginRight: 10
            }}
            onClick={handleCloseDeletePopUP}
          >
            Cancel
          </Button>
          <Button
            style={{
              width: 160,
              height: 52,
              borderRadius: 8,
              padding: '12px 20px',
              background: '#1E45E1',
              color: '#FFFFFF',
              fontWeight: 600,
              fontFamily: 'Gilroy',
              fontSize: '14px'
            }}
            onClick={handleDeleteConfirm}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>






















    </>
  );
}

export default DashboardAnnouncement;
