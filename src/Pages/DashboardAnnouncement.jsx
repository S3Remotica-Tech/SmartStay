/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import Card from "react-bootstrap/Card";
import { useDispatch, useSelector } from "react-redux";
import Ellipse5 from "../Assets/Images/Profile.jpg";
import like from "../Assets/Images/like.png";
import message from "../Assets/Images/message.png";

import { MdError } from "react-icons/md";
import Emptystate from "../Assets/Images/Empty-State.jpg";
import { Modal, Button, Form, FormControl, Image } from "react-bootstrap";
import "./DashboardAnnouncement.css";
import Profile from "../Assets/Images/New_images/profile-picture.png";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Delete from '../Assets/Images/New_images/trash.png';
import { ArrowLeft2, ArrowRight2, CloseCircle, Edit } from 'iconsax-react';
import LoaderComponent from "./LoaderComponent";
import send from "../Assets/Images/send.svg";
function DashboardAnnouncement() {


  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [formLoading, setFormLoading] = useState(false)
const [formCommentsLoading, setFormCommentsLoading] = useState(false)
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData?.length / itemsPerPage);

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
  const [errorMessage, setErrorMessage] = useState("");
  const [showDots, setShowDots] = useState(null);
  const [editDetails, setEditDetails] = useState('')
  const [deletedID, setDeletedID] = useState('')
  const [displayDeletePopUP, setDisplayDeletePopUP] = useState(false)
  const popupRef = useRef(null);
  const [Comments, setComments] = useState('')
  const [commentsList, setCommentsList] = useState([])
  const [displayError, setDisplayError] = useState("");
  const [selectTitleCard, setSelectedTitleCard] = useState('')
  const [loading, setLoading] = useState(true)
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });



const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };
  const handleCommentsChange = (e) => {
    setComments(e.target.value)
    setDisplayError('')
  }


  const handleSendComments = () => {
    if (!Comments) {
      setDisplayError('Please Enter Comments')
      return
    }
    if (Comments) {
      dispatch({ type: 'CREATECOMMENTS', payload: { an_id: selectedCard, comment: Comments } })
      setFormCommentsLoading(true)
    }
    setComments("");
       setCommentsList([]);

  }







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
    setDisplayError('')
    dispatch({ type: 'CLEAR_SAME_TITLE' });
    dispatch({ type: 'CLEAR_TITTLE_UNIQUE' });
  }



  const handleCardTittleClick = (card) => {
    setSelectedTitleCard(card);
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

    if (hostel_id) {
      setLoading(true)
      dispatch({
        type: "ANNOUNCEMENTLIST",
        payload: { hostel_id: hostel_id },
      });
    } else {
      setLoading(false)
    }
  }, [hostel_id]);



  useEffect(() => {
    if (state.PgList.statuscodeForAnnounceMentList === 200) {
      setFilteredData(state.PgList?.announcementList?.announcements)
      setTimeout(() => {
        dispatch({ type: "CLEAR_ANNOUNCEMENT_LIST" });
      }, 1000);
    }
  }, [state.PgList.statuscodeForAnnounceMentList]);


  const handleCloseMain = () => setShowMainModal(false);
  const handleCloseLike = () => setShowLikeModal(false);

  const handleCloseComment = () => {
    setDisplayError('')
    setShowCommentModal(false)

    setCommentsList([]);
  }

  const handleCloseTittle = () => setshowTittleModal(false);



  const handleCommentClick = (card) => {

    if (card.id) {
      dispatch({ type: 'GETCOMMENTS', payload: { an_id: card.id } })
    }
    setSelectedCard(card.id);
    setShowCommentModal(true);
  };


  useEffect(() => {
    if (state.PgList?.addCommentsSuccessStatus === 200) {
      setFormCommentsLoading(false)
      setShowCommentModal(false);
      if (selectedCard) {
        dispatch({ type: 'GETCOMMENTS', payload: { an_id: selectedCard } })
      }
      dispatch({
        type: "ANNOUNCEMENTLIST",
        payload: { hostel_id: hostel_id },
      });
      setComments('')
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'REMOVE_CREATE_COMMENTS' })
      }, 1000)
    }
  }, [state.PgList?.addCommentsSuccessStatus])


  useEffect(() => {
    if (state.PgList?.getCommentsSuccessStatus === 200) {
      setCommentsList(state.PgList?.CommentsList)

      setTimeout(() => {
        dispatch({ type: 'REMOVE_GET_COMMENTS' })
      })
    }

  }, [state.PgList?.getCommentsSuccessStatus])



  useEffect(() => {
    if (state.PgList?.addSubCommentsSuccessStatus === 200) {
 setFormCommentsLoading(false)
      if (selectedCard) {
        dispatch({ type: 'GETCOMMENTS', payload: { an_id: selectedCard } })
      }
      dispatch({
        type: "ANNOUNCEMENTLIST",
        payload: { hostel_id: hostel_id },
      });

      setTimeout(() => {
        dispatch({ type: 'REMOVE_CREATE_SUB_COMMENTS' })
      }, 1000)

    }


  }, [state.PgList?.addSubCommentsSuccessStatus])







  const validateField = (value, fieldName) => {
    if (!value || (typeof value === "string" && value.trim() === "")) {
      switch (fieldName) {

        case "title":
          setTitleError("Title is Required");
          break;
        case "description":
          setDescriptionError("Description is Required");
          break;
        default:
          break;
      }
      return false;
    }
    return true;
  };

  const handleSaveAnnonce = () => {
     dispatch({ type: 'CLEAR_SAME_TITLE' });
    dispatch({ type: 'CLEAR_TITTLE_UNIQUE' });
    if (!validateField(title, "title"));
    if (!validateField(description, "description"));

    const noChanges =
      editDetails &&
      title === editDetails.title &&
      description === editDetails.description;

    if (noChanges) {
      setErrorMessage("No Changes Detected")
      return;
    }

    if (title && description) {
      if (editDetails) {
        dispatch({
          type: "ADDANNOUNCEMENT",
          payload: { id: editDetails.id, hostel_id: hostel_id, title: title, description: description },
        });
        setFormLoading(true)

      } else {
        dispatch({
          type: "ADDANNOUNCEMENT",
          payload: { hostel_id: hostel_id, title: title, description: description },
        });
        setFormLoading(true)
      }

    }
  };

  useEffect(() => {
    if (state.PgList.statuscodeForAddAnnouncement === 200 || state.PgList?.deleteAnnounmentSuccessStatus === 200) {
      handleCloseAnnouncement();
      setFormLoading(false)
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
    const { top, left, height } = event.target.getBoundingClientRect();
    const popupTop = top + height / 2;
    const popupLeft = left - 150;

    setPopupPosition({ top: popupTop, left: popupLeft });
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

    setShowAnnouncement(true);
    setEditDetails(editedItem)


  }

  const handleDelete = (DeletedItem) => {

    setDeletedID(DeletedItem.id)
    setDisplayDeletePopUP(true)

  }



  useEffect(() => {
    if (editDetails) {
      setTitle(editDetails.title)
      setDescrption(editDetails.description)
    }

  }, [editDetails])




  useEffect(() => {
    if (state.PgList?.announcementList !== undefined) {
      setLoading(false);
    }
  }, [state.PgList?.announcementList]);


  useEffect(() => {
    if (state.PgList?.announcementErrorStatus === 201) {
      setLoading(false);
      setTimeout(() => {
        dispatch({ type: "CLEAR_ERROR_ANNOUNCEMENT_LIST" });
      }, 500);
    }
  }, [state.PgList?.announcementErrorStatus]);


  useEffect(() => {
    if (
      filteredData.length > 0 &&
      currentItems.length === 0 &&
      currentPage > 1
    ) {
      setCurrentPage(currentPage - 1);
    }
  }, [filteredData])

useEffect(() => {
  if (
    state.PgList.TitleAlready !== "" ||
    state.PgList.TittleUnique !== ""
  ) {
    setFormLoading(false);
  }
}, [state.PgList.TitleAlready, state.PgList.TittleUnique]);



  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end"


        }}
      >
        <Button

          style={{
            fontFamily: "Gilroy",
            fontSize: "14px",
            backgroundColor: "#1E45E1",
            color: "white",
            fontWeight: 600,
            borderRadius: "8px",
            padding: "12px 16px",
            width: "auto",
            maxWidth: "100%",
            marginBottom: "10px",
            maxHeight: 50,
            marginTop: "20px",
            marginRight: 10
          }}
          onClick={handleShowAnnouncement}
          className="responsive-button"
        >
          +  Announcement
        </Button>
      </div>

      {loading ? (
        <LoaderComponent />

      ) : currentItems?.length > 0 ? (


        <div
          style={{ maxHeight: "400px", overflowY: "auto", overflowX: 'hidden' }}
        >
          <div className="row announcement-card" >
            {currentItems?.length > 0 ? (
              currentItems?.map((data) => (
                <div key={data.id} className="col-lg-6 col-md-12 col-sm-12 col-xs-12 col-12 mb-3">

                  <Card
                    className="card"
                    key={data.id}
                    style={{
                      borderRadius: "16px",
                      borderColor: "#DCDCDC",
                      cursor: "pointer",

                    }}
                  >
                    <Card.Body>
                      <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center">

                        <div className="flex-grow-1 mb-2 mb-sm-0">
                          <p
                            style={{
                              fontFamily: "Gilroy",
                              fontWeight: 500,
                              fontSize: "12px",
                              color: "#4B4B4B",
                              marginBottom: "0px",
                            }}
                          >
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
                              cursor: "pointer",
                            }}
                            onClick={() => handleCardTittleClick(data)}
                          >
                            {data.title}
                          </p>
                          <p style={{ marginBottom: "0px" }}>
                            <Image
                              roundedCircle
                              src={
                                !data.profile || ["0", "", "undefined", "null", "NULL", null, undefined, 0].includes(String(data.profile).trim())
                                  ? Profile
                                  : data.profile
                              }

                              alt="Ellipse5"
                              width={25}
                              height={25}
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
                        <div className="d-flex flex-column flex-sm-row align-items-start align-items-sm-center mt-2 mt-sm-0">
                          <div
                            className="bd-highlight mb-2 mb-sm-0 me-sm-2"
                            style={{
                              border: "1px solid #DCDCDC",
                              borderRadius: "60px",
                              height: "36px",
                              width: "83px",
                              cursor: "pointer",
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
                                {data?.like_count}
                              </span>
                            </p>
                          </div>


                          <div

                            className="bd-highlight mb-2 mb-sm-0 me-sm-2"
                            style={{
                              border: "1px solid #DCDCDC",
                              borderRadius: "60px",
                              height: "36px",
                              width: "72px",

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
                                {data?.comment_count}
                              </span>
                            </p>
                          </div>



                          <div
                            className="ms-sm-0 ms-md-2 card-popup-container"
                            style={{
                              cursor: "pointer", height: 40, width: 40, borderRadius: 100,
                              border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center",
                              position: "relative", zIndex: showDots ? 1000 : 'auto'
                              , backgroundColor: showDots === data.id ? "#E7F1FF" : "white",
                            }} onClick={() => handleShowDots(data.id)}>
                            <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />

                            {showDots === data.id && (
                              <div
                                className="card-popup"
                                ref={popupRef}
                                style={{
                                  cursor: "pointer",
                                  backgroundColor: "#fff",
                                  position: "fixed",
                                  top: popupPosition.top,
                                  left: popupPosition.left,
                                  marginRight: 30,
                                  width: 140,
                                  height: "auto",
                                  border: "1px solid #E0E0E0",
                                  borderRadius: 10,
                                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "start",
                                  zIndex: 1001,
                                  alignItems: "flex-start",
                                }}
                              >

                                <div
                                  className="d-flex gap-2 align-items-center "
                                  style={{
                                    width: "100%",
                                    padding: "8px 12px",
                                    transition: "background 0.2s ease-in-out",
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                  }}
                                  onClick={() => handleEdit(data)}
                                  onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor = "#F0F4FF")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor = "transparent")
                                  }
                                >
                                  <Edit size="16" color="#1E45E1" />
                                  <label
                                    style={{
                                      fontSize: 14,
                                      fontWeight: 600,
                                      fontFamily: "Gilroy",
                                      color: "#1E45E1",
                                      marginBottom: 0,
                                      cursor: "pointer",
                                    }}
                                  >
                                    Edit
                                  </label>
                                </div>


                                <div style={{ height: 1, backgroundColor: "#F0F0F0", width: "100%" }} />


                                <div
                                  className="d-flex gap-2 align-items-center "
                                  style={{
                                    width: "100%",
                                    padding: "8px 12px",
                                    transition: "background 0.2s ease-in-out",
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10,
                                  }}
                                  onClick={() => handleDelete(data)}
                                  onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor = "#FFF3F3")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor = "transparent")
                                  }
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
                                      marginBottom: 0,
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



                      </div>
                    </Card.Body>
                  </Card>
                </div>

              ))
            ) : (

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "60vh"
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

                  }}
                >
                  No announcements available.
                </div>
                <div className="pb-1" style={{
                  textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 16,
                  color: "rgba(75, 75, 75, 1)"
                }}>There are no Announcement added.</div>


              </div>

            )
            }







          </div>
        </div>


      ) : (

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "60vh",
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
            }}
          >
            No announcements available.
          </div>
          <div
            className="pb-1"
            style={{
              textAlign: "center",
              fontWeight: 500,
              fontFamily: "Gilroy",
              fontSize: 16,
              color: "rgba(75, 75, 75, 1)",
            }}
          >
            There are no announcements added.
          </div>
        </div>
      )}


      <div>
        {filteredData.length >= 5 && (
          <nav className="position-fixed bottom-0 end-0 mb-4 me-3 d-flex justify-content-end align-items-center">

            <div>
              <select
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                style={{
                  padding: "5px",
                  border: "1px solid #1E45E1",
                  borderRadius: "5px",
                  color: "#1E45E1",
                  fontWeight: "bold",
                  cursor: "pointer",
                  outline: "none",
                  boxShadow: "none",
                }}
              >
                <option value={6}>6</option>
                <option value={10}>10</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>


            <ul
              style={{
                display: "flex",
                alignItems: "center",
                listStyleType: "none",
                margin: 0,
                padding: 0,
              }}
            >

              <li style={{ margin: "0 10px" }}>
                <button
                  style={{
                    padding: "5px",
                    textDecoration: "none",
                    color: currentPage === 1 ? "#ccc" : "#1E45E1",
                    cursor: currentPage === 1 ? "not-allowed" : "pointer",
                    borderRadius: "50%",
                    display: "inline-block",
                    minWidth: "30px",
                    textAlign: "center",
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <ArrowLeft2 size="16" color={currentPage === 1 ? "#ccc" : "#1E45E1"} />
                </button>
              </li>


              <li style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}>
                {currentPage} of {totalPages}
              </li>


              <li style={{ margin: "0 10px" }}>
                <button
                  style={{
                    padding: "5px",
                    textDecoration: "none",
                    color: currentPage === totalPages ? "#ccc" : "#1E45E1",
                    cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                    borderRadius: "50%",
                    display: "inline-block",
                    minWidth: "30px",
                    textAlign: "center",
                    backgroundColor: "transparent",
                    border: "none",
                  }}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <ArrowRight2
                    size="16"
                    color={currentPage === totalPages ? "#ccc" : "#1E45E1"}
                  />
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>


      <Modal show={showMainModal} onHide={handleCloseMain} centered backdrop="static">
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
              <img src={Profile} alt="Ellipse5" width={20} height={20} />
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
            style={{
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




      <Modal show={showLikeModal} onHide={handleCloseLike} centered backdrop="static">
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
              style={{
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
              style={{
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
              style={{
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



      {
        showCommentModal &&

        <Modal show={showCommentModal} onHide={handleCloseComment} centered backdrop="static">
          <Modal.Header className="d-flex justify-content-between align-items-center" style={{ borderBottom: "none" }}>
            <div className="d-flex align-items-center">

              <div className="ms-2">
                <p className="mb-0 fw-bold" style={{fontFamily:"Gilroy"}}>Monthly</p>

              </div>
            </div>
            <CloseCircle size="24" color="#222" onClick={handleCloseComment} style={{ cursor: "pointer" }} />
          </Modal.Header>

          <Modal.Body style={{ maxHeight: "290px", overflowY: "auto" }}>
            {commentsList && commentsList.length > 0 ? (
              commentsList.map((comment, index) => (
                <div key={index} className="p-2 rounded mb-2" style={{ background: "#F8F9FA" }}>
                  <div className="d-flex align-items-center">
                    <img src={
                      !comment.profile || ["0", "", "undefined", "null", "NULL", null, undefined, 0].includes(String(comment.profile).trim())
                        ? Profile
                        : comment.profile
                    } width={30} height={30} alt="profile" />
                    <div className="ms-2">
                      <p className="mb-0 fw-bold" style={{ fontSize: "14px" ,fontFamily:"Gilroy"}}>{comment.name}</p>
                      <p className="mb-0 text-muted" style={{ fontSize: "12px",fontFamily:"Gilroy" }}>{new Date(comment.created_at).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" })}</p>
                    </div>
                  </div>
                  <p className="mt-2 mb-1" style={{ fontSize: "14px", color: "#222",fontFamily:"Gilroy" }}>{comment.comment}</p>
                </div>
              ))
            ) : (
              <div
                style={{
                  textAlign: "center",
                  color: "red",
                  fontSize: "16px",
                  padding: "20px",
                  fontFamily: "Gilroy",
                  background: "#F8F9FA"
                }}
              >
                No Comments Available
              </div>
            )}
          </Modal.Body>

 {formCommentsLoading && <div
            style={{
              position: 'absolute',
              top: 100,
              right: 0,
              bottom: 0,
              left: 0,
              display: 'flex',
                           alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              opacity: 0.75,
              zIndex: 10,
            }}
          >
            <div
              style={{
                borderTop: '4px solid #1E45E1',
                borderRight: '4px solid transparent',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                animation: 'spin 1s linear infinite',
              }}
            ></div>
          </div>}


          <Modal.Footer style={{ border: "none" }}>
            <div
              style={{
                marginTop: 15,
                position: "relative",
                display: "inline-block",
                width: "100%",
              }}
            >
              <Form.Control
                type="text"
                value={Comments}
                onChange={(e) => handleCommentsChange(e)}
                className="input-field"
                style={{
                  border: "1px solid #E7E7E7",
                  paddingTop: 6,
                  paddingBottom: 6,
                  paddingLeft: 16,
                  width: "100%",
                  height: "52px",
                  fontFamily: "Gilroy",
                  borderRadius: "12px",
                }}
                placeholder="Post your reply here"
              />
              <div className="input-field"
                style={{

                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "#1E45E1",
                  border: "1px solid #E7E7E7",
                  borderRadius: "60px",
                  padding: "12px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={handleSendComments} >
                <img
                  src={send}
                  alt="Send"
                  style={{
                    width: "16px",
                    height: "16px",
                  }}

                />
              </div>
            </div>
          </Modal.Footer>

          {displayError && (
            <div className="ms-3" style={{ color: "red", marginBottom: 20, textAlign: "center" }}>
              <MdError />
              <span style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{displayError}</span>
            </div>
          )}

        </Modal>
      }




      <Modal
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
            {selectTitleCard?.title}
          </p>
          <CloseCircle
            size="24"
            color="#222222"
            onClick={handleCloseTittle}
            style={{ cursor: "pointer" }}
          />
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-between">
            <p style={{ marginTop: -20 }}>
              <Image roundedCircle src={createprofile?.profile || Profile} width={20} height={20} />
              <span
                style={{
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                  fontSize: "12px",
                  color: "#222222",
                  paddingLeft: "6px",
                }}
              >


                {createprofile?.first_name} {createprofile?.last_name}
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
              {new Date(selectTitleCard?.createdat).toLocaleDateString("en-GB", {
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
            {selectTitleCard?.description}
          </p>
        </Modal.Body>
      </Modal>









      <Modal
        show={showAnnouncement}
        onHide={handleCloseAnnouncement}
        centered
        backdrop="static"
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
              right: "15px",
              top: "20px",
              border: "1px solid black",
              background: "transparent",
              cursor: "pointer",
              padding: "0",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "24px",
              height: "24px",
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
        <Modal.Body style={{position:"relative"}}>

  {formLoading && <div
            style={{
              position: 'absolute',
              top: 100,
              right: 0,
              bottom: 0,
              left: 0,
              display: 'flex',
                           alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              opacity: 0.75,
              zIndex: 10,
            }}
          >
            <div
              style={{
                borderTop: '4px solid #1E45E1',
                borderRight: '4px solid transparent',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                animation: 'spin 1s linear infinite',
              }}
            ></div>
          </div>}



          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12" style={{ marginTop: -20 }}>

              <Form.Label
                style={{
                  fontSize: 14,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                Title <span style={{ color: "red", fontSize: "20px" }}>*</span>
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


            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 mt-2">
              <Form.Label
                style={{
                  fontSize: 14,
                  color: "#222222",
                  fontFamily: "Gilroy",
                  fontWeight: 500,
                }}
              >
                Description<span style={{ color: "red", fontSize: "20px" }}>*</span>
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
          {errorMessage && (
            <div style={{ color: "red", textAlign: "center", paddingTop: "8px" }}>
              <MdError />
              <span className="ms-2" style={{ color: "red", fontSize: 12, fontFamily: "Gilroy", fontWeight: 500 }}>{errorMessage}</span>
            </div>
          )}
          <Button
            className="col-lg-6 col-md-6 col-sm-12 col-xs-12"
            style={{
              backgroundColor: "#1E45E1",
              fontWeight: 600,
              height: 50,
              borderRadius: 12,
              fontSize: 16,
              fontFamily: "Gilroy",
              marginTop: 20,
              width: "100%",
            }}
            onClick={handleSaveAnnonce}
          >
            {editDetails ? 'Save Changes' : 'Add Announcement'}
          </Button>

        </Modal.Body>
      </Modal>






      <Modal
        show={displayDeletePopUP}
        onHide={handleCloseDeletePopUP}
        centered
        backdrop="static"
        dialogClassName="custom-delete-modal"
      >
        <Modal.Header style={{ borderBottom: 'none' }}>
          <Modal.Title
            className="w-100 text-center delete-card"
            style={{
              fontSize: '18px',
              fontFamily: 'Gilroy',

              fontWeight: 600,
              color: '#222222',
            }}
          >
            Delete Announcement?
          </Modal.Title>
        </Modal.Header>

        <Modal.Body
          className="text-center"
          style={{
            fontSize: 14,
            fontWeight: 500,
            fontFamily: 'Gilroy',
            color: '#646464',

            marginTop: '-30px'
          }}
        >
          Are you sure you want Delete Announcement?
        </Modal.Body>

        <Modal.Footer
          className="d-flex justify-content-center"
          style={{ borderTop: 'none', marginTop: '-10px' }}>
          <Button
            className="me-2"
            style={{
              width: "100%",
              maxWidth: 160,
              height: 52,
              borderRadius: 8,
              padding: '12px 20px',
              background: '#fff',
              color: '#1E45E1',
              border: '1px solid #1E45E1',
              fontWeight: 600,
              fontFamily: 'Gilroy',
              fontSize: '14px',
            }}
            onClick={handleCloseDeletePopUP}
          >
            Cancel
          </Button>
          <Button
            style={{
              width: "100%",
              maxWidth: 160,
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
