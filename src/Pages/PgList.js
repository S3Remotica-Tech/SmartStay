import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Plus from '../Assets/Images/Create-button.png';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import CreatePG from '../Components/CreatePG';
import '../Pages/Dashboard.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import Filter from '../Assets/Images/New_images/Group 13.png';
import PayingGuest from '../Pages/PayingGuestMap'
import Alert from 'react-bootstrap/Alert';
import ParticularHostelDetails from '../Pages/ParticularHostelDetails'
import AddPg from "./AddPg"
import AddFloor from './AddFloor';
import './PgList.css';
import Nav from 'react-bootstrap/Nav';
import AddRoom from './AddRoom';
import { IoIosArrowDropleft } from "react-icons/io";
import { ArrowLeft } from 'iconsax-react';
import { FormControl, InputGroup, Pagination, Dropdown } from 'react-bootstrap';
import { CiSearch } from "react-icons/ci";
import Notify from '../Assets/Images/New_images/notify.png';
import Profile from '../Assets/Images/New_images/profile.png';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ArrowUp2, ArrowDown2, CloseCircle, SearchNormal1, Sort ,Edit, Trash} from 'iconsax-react';
import { Tab, Row, Col } from 'react-bootstrap';
import Delete from '../Assets/Images/New_images/trash.png';
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import DeleteFloor from './DeleteFloor';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Edit from '../Assets/Images/New_images/edit.png';
import EmptyState from '../Assets/Images/New_images/empty_image.png';


// function getFloorName(floor_Id) {

//   const numberToWord = {
//     1: 'Ground',
//     2: 'First',
//     3: 'Second',
//     4: 'Third',
//     5: 'Fourth',
//     6: 'Fifth',
//     7: 'Sixth',
//     8: 'Seventh',
//     9: 'Eighth',
//     10: 'Ninth',
//     11: 'Tenth',
//     12: 'Eleventh',
//     13: 'Twelfth',
//     14: 'Thirteenth',
//   };

//   if (floor_Id === 1) {
//     return 'Ground Floor';
//   } else if (numberToWord[floor_Id]) {
//     return `${numberToWord[floor_Id]} Floor`;
//   } else {

//     const lastDigit = floor_Id % 10;
//     let suffix = 'th';

//     if (floor_Id % 100 < 11 || floor_Id % 100 > 13) {
//       switch (lastDigit) {
//         case 1:
//           suffix = 'st';
//           break;
//         case 2:
//           suffix = 'nd';
//           break;
//         case 3:
//           suffix = 'rd';
//           break;
//       }
//     }

//     return `${floor_Id}${suffix} Floor`;
//   }
// }

function getFloorName(floor_Id) {


  const adjustedFloorNumber = floor_Id;


  if (adjustedFloorNumber === 0) {
    return 'Ground Floor';
  } else {

    const lastDigit = adjustedFloorNumber % 10;
    let suffix = 'th';


    if (adjustedFloorNumber % 100 < 11 || adjustedFloorNumber % 100 > 13) {
      switch (lastDigit) {
        case 1:
          suffix = 'st';
          break;
        case 2:
          suffix = 'nd';
          break;
        case 3:
          suffix = 'rd';
          break;
      }
    }

    return `${adjustedFloorNumber}${suffix} Floor`;
  }
}


function PgList() {

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [showHostelDetails, setShowHostelDetails] = useState('')

  console.log("state for pgList", state)

  const popupRef = useRef(null);


  const [pgList, setPgList] = useState({
    Name: '',
    phoneNumber: '',
    email_Id: '',
    location: '',
    // number_Of_Floor: '',
    // number_Of_Rooms: '',
    // floorDetails: [],

  })




  const [hostelIndex, setHostelIndex] = useState(0)
  const [roomDetails, setRoomDetails] = useState('')


  const [selectedHostel, setSelectedHostel] = useState(false);

  console.log("selectedHostel", selectedHostel)


  // const handleHostelSelect = (hostelName) => {
  //   const selected = state.UsersList.hostelList?.find((item, index) => {
  //     setHostelIndex(index)
  //     return item.id == hostelName
  //   });
  //   setSelectedHostel(selected);
  //   handleRowVisibilityChange(true);
  //   handleBedVisibilityChange(false)
  // };

  const [filteredData, setFilteredData] = useState([])

  const [loader, setLoader] = useState(true)

  const toastStyle = {

    backgroundColor: 'green',
    color: 'white',
    width: "100%"
  };

  useEffect(() => {

    setFloorClick(showHostelDetails?.floorDetails?.[0]?.floor_id)
    setFloorName(showHostelDetails?.floorDetails?.[0]?.floor_name)

  }, [showHostelDetails])

  useEffect(() => {
    if (state.UsersList?.hosteListStatusCode == 200) {
      setLoader(false)
      setFilteredData(state.UsersList.hostelList)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_HOSTELLIST_STATUS_CODE' })
      }, 4000)
    }

  }, [state.UsersList?.hosteListStatusCode])

  

useEffect(()=>{
  if(state.UsersList?.noHosteListStatusCode == 201){
    setFilteredData([])
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NO_HOSTEL_STATUS_CODE' })
    }, 4000)
  }

},[state.UsersList?.noHosteListStatusCode])




  useEffect(() => {
    if (filteredData) {
      setFloorClick(showHostelDetails?.floorDetails?.[0]?.floor_id)
    }
  }, [filteredData])

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
    if (state.UsersList?.noHosteListStatusCode == 201) {
      setLoader(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_NO_HOSTEL_STATUS_CODE' })
      }, 1000)
    }

  }, [state.UsersList?.noHosteListStatusCode])











  const [floorDetails, setFloorDetails] = useState([{ number_of_floor: '' }
    // , { number_of_floor: '' }, { number_of_floor: '' }
  ]);





  const LoginId = localStorage.getItem("loginId")


  console.log("@@@@@@@@@@@@@@@@@@PMJ", state.UsersList?.hostelList)


  useEffect(() => {
    const timeout = setTimeout(() => {
      let tempArry = [];
      for (let i = 0; i < pgList.number_Of_Floor; i++) {
        var a = {}
        tempArry.push(a)
      }
      setPgList({ ...pgList, floorDetails: tempArry })
    }, 1000);
    return () => clearTimeout(timeout)
  }, [pgList.number_Of_Floor])


  useEffect(() => {
    const timeout = setTimeout(() => {
      let tempArray = [];
      for (let i = 0; i < pgList.number_Of_Rooms; i++) {
        let newRoom = {
          roomNumber: i + 1,
          number_Of_Bed: '',
          price: ''
        };
        tempArray.push(newRoom);
      }
      setPgList((prevPgList) => ({
        ...prevPgList,
        floorDetails: [tempArray],
      }));
    }, 1000);
    return () => clearTimeout(timeout);
  }, [pgList.number_Of_Rooms]);


  useEffect(() => {
    if (state.UsersList.createFloorSuccessStatusCode == 200 || state.PgList.updateFloorSuccessStatusCode == 200) {
      dispatch({ type: 'HOSTELLIST' })
      setShowFloor(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_FLOOR_STATUS_CODE' })
        dispatch({ type: 'CLEAR_UPDATE_FLOOR_STATUS_CODE' })
      }, 4000)
    }

  }, [state.UsersList.createFloorSuccessStatusCode, state.PgList.updateFloorSuccessStatusCode])




  useEffect(() => {
    if (state.UsersList.deleteFloorSuccessStatusCode == 200) {
      dispatch({ type: 'HOSTELLIST' })
      setShowDelete(false)

      // setFloorClick(showHostelDetails?.floorDetails?.[0])


      setTimeout(() => {
        dispatch({ type: 'CLEAR_DELETE_FLOOR' })
      }, 4000)

    }
  }, [state.UsersList.deleteFloorSuccessStatusCode])

  useEffect(() => {
    if (state.PgList.deletePgSuccessStatusCode == 200 || state.PgList.dleteHostelImagesStatusCode == 200) {
      dispatch({ type: 'HOSTELLIST' })
      setShowAddPg(false);
      setTimeout(() => {
        dispatch({ type: 'CLEAR_DELETE_HOSTEL_IMAGES' })
      }, 4000)
    
      setTimeout(() => {
        dispatch({ type: 'CLEAR_DELETE_PG_STATUS_CODE' })
      }, 4000)
    }

  },[state.PgList.deletePgSuccessStatusCode, state.PgList.dleteHostelImagesStatusCode])

  useEffect(() => {
    if (state.PgList.createPgStatusCode == 200) {
      dispatch({ type: 'HOSTELLIST' })

      setShowAddPg(false);
      setTimeout(() => {
        dispatch({ type: 'CLEAR_PG_STATUS_CODE' })
      }, 4000);


      setPgList({
        Name: '',
        phoneNumber: '',
        email_Id: '',
        location: '',

      });






    }
  }, [state.PgList.createPgStatusCode])


  useEffect(() => {
    if (selectedHostel) {
      const selected = state.UsersList.hostelList?.find(item => item.id === showHostelDetails.id);
      setShowHostelDetails(selected);
    }
  }, [state.UsersList.hostelList]);





  const [show, setShow] = useState(false);
  const handleClose = () => {
    setFloorDetails([{ number_of_floor: '' }])
    setShow(false);
  }
  const handleShow = () => setShow(true);

  const handleCancels = () => {
    handlecloseHostelForm();
  };
  const [addhostelForm, setAddhostelForm] = useState(false)
  const handleshowHostelForm = () => {
    setAddhostelForm(true)
  }
  const handlecloseHostelForm = () => {
    setPgList({
      Name: '',
      phoneNumber: '',
      email_Id: '',
      location: '',

    });
    setEmailError('')
    setAddhostelForm(false)
  }







  const [decrypt, setDecrypt] = useState('')

  const loginId = localStorage.getItem('loginId');

  useEffect(() => {
    dispatch({ type: 'HOSTELLIST' })
  }, []);




  const handleSubmitPgList = () => {
    if (!pgList.Name || !pgList.phoneNumber || !pgList.email_Id || !pgList.location
      // || !pgList.number_Of_Floor 
    ) {
      Swal.fire({
        icon: 'warning',
        title: 'Please Enter All Required Fields',
      });
    } else if (pgList.phoneNumber.length !== 10) {
      Swal.fire({
        icon: 'warning',
        text: 'Please Enter a valid 10-digit Phone Number',
      });
    }
    else if (!validateEmail(pgList.email_Id)) {
      Swal.fire({
        icon: 'warning',
        text: "Please Enter a valid Email_id"
      });
    }
    else {
      dispatch({
        type: 'PGLIST',
        payload: {
          name: pgList.Name,
          phoneNo: pgList.phoneNumber,
          email_Id: pgList.email_Id,
          location: pgList.location,
          // number_of_floors: pgList.number_Of_Floor,
          // number_Of_Rooms: pgList.number_Of_Rooms,
          // floorDetails: pgList.floorDetails,
          // created_by: decrypt
        }
      });

      handlecloseHostelForm()


    }

  }



  const handleFloorChange = (value, index) => {
    setFloorDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails[index].number_of_floor = value;
      return updatedDetails;
    });
  };


  // const handleCreateFloor = (hostel_Id) => {



  //   // Swal.fire({
  //   //   icon: 'warning',
  //   //   title: 'Do you want create one floor ?',
  //   //   confirmButtonText: 'Yes',
  //   //   cancelButtonText: 'No',
  //   //   showCancelButton: true,
  //   // }).then((result) => {
  //   //   if (result.isConfirmed) {
  //   //     const floors = floorDetails.map((floor) => (
  //   //       { number_of_floors: 1 }));
  //   //     const hostel_ID = hostel_Id.toString()
  //   //     dispatch({
  //   //       type: 'CREATEFLOOR',
  //   //       payload: {
  //   //         hostel_Id: hostel_ID,
  //   //         hostelDetails: floors,
  //   //       },
  //   //     });
  //   //     Swal.fire({
  //   //       icon: 'success',
  //   //       title: 'Create Floor details saved Successfully',
  //   //     })
  //   //   }
  //   // });



  //   // const floors = floorDetails.map((floor) => (
  //   //   { number_of_floors: parseInt(floor.number_of_floor) }));
  //   // const phoneNumber = selectedHostel.hostel_PhoneNo.toString()
  //   // dispatch({
  //   //   type: 'CREATEFLOOR',
  //   //   payload: {
  //   //     phoneNo: phoneNumber,
  //   //     hostelDetails: floors,
  //   //   },
  //   // });

  //   // Swal.fire({
  //   //   icon: 'success',
  //   //   title: 'Create Floor details saved Successfully',
  //   // })
  //   setFloorDetails([])
  //   handleClose();
  // };

  const handleAddFloor = () => {
    setFloorDetails([...floorDetails, { number_of_floor: '' }])
  }


  const handleDeleteFloor = (index) => {
    setFloorDetails((prevDetails) => {
      const updatedDetails = [...prevDetails];
      updatedDetails.splice(index, 1);
      return updatedDetails;
    });
  };


  const handleCancel = () => {
    handleClose();
  };













  // useEffect(() => {
  //   const selected = state.UsersList.hostelList.find(item => item.Name === selectedHostel?.Name);
  //   setSelectedHostel(selected);
  // }, [state.UsersList.hostelList[hostelIndex]?.number_Of_Floor])

  const [isRowVisible, setIsRowVisible] = useState(true);
  const [bedDetailShow, setBedDetailShow] = useState(false)
  const [bedDetailsPage, setBedDetailsPage] = useState('')
  const [hidePgList, setHidePgList] = useState(true)
  const [bedDetailsDisplay, setBedDetailsDisplay] = useState(false)
  const [usersBed, setUsersBed] = useState('')
  const [hosteID, setHosteID] = useState('')
  const [floorID, setFloorID] = useState('')
  const [roomID, setRoomID] = useState('')

  const handleRowVisibilityChange = (isVisible) => {
    setIsRowVisible(isVisible);
  };

  const handlehidePgList = (isVisible) => {
    setHidePgList(isVisible);
  };



  const handleDisplayBed = (isVisible, userBeds) => {
    setBedDetailsDisplay(isVisible)

  }

  const userBedId = (bedId) => {
    setUsersBed(bedId)
  }

  const Hostel_Id = (Hostel_Id) => {
    setHosteID(Hostel_Id)
  }

  const floorId = (floorId) => {
    setFloorID(floorId)
  }

  const roomId = (roomId) => {
    setRoomID(roomId)
  }


  const handleBedVisibilityChange = (isVisible, BedDetails) => {
    setBedDetailShow(isVisible)
    setBedDetailsPage(BedDetails)
    setBedDetailsDisplay(false)

  }

  const handleBackToFloors = () => {
    setIsRowVisible(true)
    setBedDetailShow(false)
    setMouseEnter(false)
    setMouseEnter(false)
  }

  const handlehidePgListForUser = (isVisible) => {
    setHidePgList(isVisible);
    setBedDetailShow(isVisible)

  }

  const handleDisplayBedDetails = (isVisible) => {
    setBedDetailsDisplay(isVisible)
  }






  const [mouseEnter, setMouseEnter] = useState(false)


  const handleMouseEnter = () => {
    setMouseEnter(true)
  }


  const handleMouseLeave = () => {
    setMouseEnter(false)
  }

  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (pattern.test(email)) {
      setEmailError('');
      return true;
    } else {
      setEmailError('Please Enter a Valid Email');
      return false;
    }
  };


  const handleChangeEmail = (e) => {
    const { value } = e.target;
    setPgList({ ...pgList, email_Id: value });
    validateEmail(value);
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const validValue = value.replace(/[^0-9]/g, '');
    console.log("validValue", validValue)
    setPgList({ ...pgList, phoneNumber: validValue });
  };

  //  new Ui changes 

  console.log("showHostelDetails", showHostelDetails)

  const handleSelectedHostel = (selectedHostelId) => {
    const selected = state.UsersList.hostelList?.find((item, index) => {
      setHostelIndex(index)
      return item.id == selectedHostelId
    });
    setSelectedHostel(true);
    setShowHostelDetails(selected)
  }


  const [showAddPg, setShowAddPg] = useState(false);

  const handleCloses = () => {
    setShowAddPg(false);
  }
  const handleShowAddPg = () => {
    setShowAddPg(true);
    setEditHostelDetails('')
  }



  const handleDisplayPgList = (isVisible) => {
    setHidePgList(isVisible);
  }

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const [currentItem, setCurrentItem] = useState('')

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  }


  console.log("@@@@@@@@@@MATHU", showHostelDetails?.floorDetails?.[0])
  console.log("filteredData", filteredData)







  const renderPagination = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (startPage > 1) {
      pageNumbers.push(
        <Pagination.Item key={1} active={1 === currentPage} onClick={() => paginate(1)}>
          1
        </Pagination.Item>
      );
      if (startPage > 2) {
        pageNumbers.push(<Pagination.Ellipsis key="start-ellipsis" />);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={() => paginate(i)}>
          {i}
        </Pagination.Item>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<Pagination.Ellipsis key="end-ellipsis" />);
      }
      pageNumbers.push(
        <Pagination.Item key={totalPages} active={totalPages === currentPage} onClick={() => paginate(totalPages)}>
          {totalPages}
        </Pagination.Item>
      );
    }

    return pageNumbers;
  };



  const [showFloor, setShowFloor] = useState(false)
  const [showRoom, setShowRoom] = useState(false)
  const [hostelFloor, setHostelFloor] = useState('')
  const [hostelDetails, setHostelDetails] = useState({ room: null, selectedFloor: null });
  const [editFloor, setEditFloor] = useState({ hostel_Id: null, floor_Id: null, floorName: null });

  const handleAddFloors = (hostel_Id) => {
    setShowFloor(true)
    setHostelFloor(hostel_Id)
    setUpdate(false)
    setEditFloor({ hostel_Id: null, floor_Id: null, floorName: null })

  }

  const handleCloseFloor = () => {
    setShowFloor(false)

  }

  const handleShowAddRoom = (room, selectedFloor) => {
    setShowRoom(true)
    console.log("add room", room, selectedFloor)
    setHostelDetails({ room, selectedFloor });
  }

  const handlecloseRoom = () => {
    setShowRoom(false)
  }

  const [floorClick, setFloorClick] = useState(showHostelDetails?.floorDetails?.[0]?.floor_id)

  const [floorName, setFloorName] = useState(showHostelDetails?.floorDetails?.[0]?.floor_name)



  console.log("floorClick& floorName", floorClick)
  console.log("showHostelDetails?.floorDetails?.[0]?.floor_name", showHostelDetails?.floorDetails?.[0]?.floor_name);


  const handlebackToPG = () => {
    setSelectedHostel(false)
    setFloorClick(showHostelDetails?.floorDetails?.[0]?.floor_id)
    setHidePgList(true);

  }


  const handleDIsplayFloorClick = (floorNo) => {
    setFloorClick(showHostelDetails?.floorDetails?.[0]?.floor_id)

  }




  const stateAccount = useSelector(state => state.createAccount)


  const [profile, setProfile] = useState(stateAccount.accountList[0]?.user_details.profile)


  useEffect(() => {
    if (stateAccount.statusCodeForAccountList == 200) {
      const loginProfile = stateAccount.accountList[0].user_details.profile

      setProfile(loginProfile)
    }

  }, [stateAccount.statusCodeForAccountList])


  const [searchQuery, setSearchQuery] = useState("");

const [showDropDown, setShowDropDown] = useState(false)

console.log("filteredData *********", filteredData)


  const handleInputChange = (e) => {
    const searchItem = e.target.value
    setSearchQuery(searchItem);
    if (searchItem != '') {
      const filteredItems = state.UsersList.hostelList && state.UsersList.hostelList.filter((user) =>
        user.Name && user.Name.toLowerCase().includes(searchItem.toLowerCase())
      );

      setFilteredData(filteredItems);
      setShowDropDown(true)
    }
    else {
      setFilteredData(state.UsersList.hostelList)
    }
    setCurrentPage(1);
  };



const handleDropDown = (value)=>{
  const searchItem = value;
  setSearchQuery(searchItem);
  if (searchItem != '') {
    const filteredItems = state.UsersList.hostelList && state.UsersList.hostelList.filter((user) =>
      user.Name && user.Name.toLowerCase().includes(searchItem.toLowerCase())
    );

    setFilteredData(filteredItems);
    setShowDropDown(true)
  }
  else {
    setFilteredData(state.UsersList.hostelList)
  }
  setCurrentPage(1);
  setShowDropDown(false)
}


  const [showMore, setShowMore] = useState(false);
  const [editHostelDetails, setEditHostelDetails] = useState('')

  const handleMoreClick = () => setShowMore(!showMore);

  const visibleFloors = showHostelDetails.number_Of_Floor > 5 ? 5 : showHostelDetails.number_Of_Floor;
  const remainingFloors = showHostelDetails.number_Of_Floor - visibleFloors;

  // console.log("visiblefloor", visibleFloors)
  // console.log("remainingFloors", remainingFloors)

  const handleEditHostel = (hostelDetails) => {
    setShowAddPg(true);
    setEditHostelDetails(hostelDetails)
  }




  const [key, setKey] = useState('1');


  const [visibleRange, setVisibleRange] = useState([0, 3]);


  console.log("showHostelDetails", showHostelDetails)


  const numberOfFloors = showHostelDetails && showHostelDetails?.floorDetails?.length;
  const floorsPerPage = 5;

  const handlePrev = () => {
    if (visibleRange[0] > 0) {
      setVisibleRange([visibleRange[0] - 1, visibleRange[1] - 1]);
    }
  };

  const handleNext = () => {
    if (visibleRange[1] < numberOfFloors - 1) {
      setVisibleRange([visibleRange[0] + 1, visibleRange[1] + 1]);
    }
  };

  const handleFloorClick = (floorNumber, floorName) => {
    console.log("floorNumber", floorNumber, floorName)
    setFloorClick(floorNumber);
    setKey(floorNumber.toString());
    setFloorName(floorName)
  };


  console.log("floorName", floorName)


  useEffect(() => {
    if (state.PgList.statusCodeForDeleteRoom == 200) {
      dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: floorClick, hostel_Id: showHostelDetails.id } })

      dispatch({ type: 'HOSTELLIST' })

      setTimeout(() => {
        dispatch({ type: 'CLEAR_DELETE_ROOM' })
      }, 4000);
    }
  }, [state.PgList.statusCodeForDeleteRoom])


  const [showDots, setShowDots] = useState(false);


  useEffect(() => {

    if (state.PgList.statusCodeCreateRoom === 200) {
      setShowRoom(false)
    }
  }, [state.PgList.statusCodeCreateRoom])


  const handleShowDots = (id) => {
    setShowDots(!showDots);
  };



  // useEffect(() => {

  //   if (state.PgList.createRoomMessage != null && state.PgList.createRoomMessage != "") {
  //       dispatch({ type: 'ROOMCOUNT', payload: { floor_Id: props.floorID, hostel_Id: props.hostel_Id } })

  //       setTimeout(() => {
  //           dispatch({ type: 'UPDATE_MESSAGE_AFTER_CREATION', message: null })
  //       }, 100)
  //   }
  // }, [state.PgList.createRoomMessage]) 




  const [showDelete, setShowDelete] = useState(false);
  const [deleteFloor, setDeleteFloor] = useState({ floor_Id: null, hostel_Id: null })
  const [showFilter, setShowFilter] = useState(false)


  const handleShowSearch = () => {
    setShowFilter(!showFilter)
  }

  const handleCloseSearch = () => {
    setShowFilter(false)
    setFilteredData(state.UsersList.hostelList)
    setSearchQuery('');
  }


  const handleCloseDelete = () => setShowDelete(false);

  const handleShowDelete = (FloorNumber, hostel_Id) => {
    setShowDelete(true)
    setDeleteFloor({ floor_Id: FloorNumber, hostel_Id: hostel_Id })
    // setFloorClick(1)

  }


  const [update, setUpdate] = useState(false)


  const handleEditFloor = (floor_Id, hostel_Id, floorName) => {

    setShowFloor(true)
    setEditFloor({ hostel_Id, floor_Id, floorName })
    setUpdate(true)

  }





  console.log("key", key)
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

  return (
    <>

      <div className='container'>

        {hidePgList && <>
        <div className='container justify-content-between d-flex align-items-center' style={{height:83}}>
          {/* <div className="d-flex justify-content-between align-items-center"> */}

            <div>
              <label style={{ fontSize: 18, color: "rgba(34, 34, 34, 1)", fontWeight: 600, fontFamily: "Gilroy" }}>Paying Guest</label>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              {
                !showFilter &&

                <div className='me-3' onClick={handleShowSearch}>
                  <SearchNormal1
                    size="26"
                    color="#222"
                  />
                </div>
              }
              {
                showFilter &&
                <div className='me-3 'style={{position:'relative'}}>
                  <InputGroup>

                    <FormControl size="lg"
                      value={searchQuery}
                      onChange={handleInputChange}

                      style={{width:235, boxShadow: "none", borderColor: "lightgray", borderRight: "none", fontSize: 15, fontWeight: 500,color: "#222",
                        //  '::placeholder': { color: "#222", fontWeight: 500 } 
                        }}
                      placeholder="Search..."
                    />
                    <InputGroup.Text style={{ backgroundColor: "#ffffff", }}>
                      <CloseCircle size="24" color="#222" onClick={handleCloseSearch} />
                    </InputGroup.Text>
                  </InputGroup>



                  {
            filteredData.length > 0 && searchQuery !== '' && showDropDown && (
            
                          <div style={{ border: '1px solid #d9d9d9 ', position: "absolute", top: 50, left: 0, zIndex: 1000, padding: 10, borderRadius: 8, backgroundColor: "#fff" }}>
                            <ul className='show-scroll' style={{
                              // position: 'absolute',
                              // top: '50px',
                              // left: 0,
                              width: 260,
                              backgroundColor: '#fff',
                              // border: '1px solid #D9D9D9',
                              borderRadius: '4px',
                              maxHeight: 174,
                              minHeight: 100,
                              overflowY: 'auto',
                              padding: '5px 10px',
                              margin: '0',
                              listStyleType: 'none',

                              borderRadius: 8,
                              boxSizing: 'border-box'
                            }}>
                              {
                                filteredData.map((user, index) => (
                                  <li
                                    key={index}
                                    onClick={() => {
                                      handleDropDown(user.Name);

                                    }}
                                    style={{
                                      padding: '10px',
                                      cursor: 'pointer',
                                      borderBottom: '1px solid #dcdcdc',
                                      fontSize: '14px',
                                      fontFamily: 'Gilroy',
                                      fontWeight: 500,

                                    }}
                                  >
                                    {user.Name}
                                  </li>
                                ))
                              }
                            </ul>
                          </div>
                        )
          }










                </div>


              }



              <div className='me-3'>
                <Sort
                  Size="24"
                  color="#222"
                   variant="Outline"
                />
              </div>

              <div>
                <Button
                  onClick={handleShowAddPg}
                  style={{ fontFamily: "Gilroy", fontSize: 14, backgroundColor: "#1E45E1", color: "white",  fontWeight: 600, borderRadius: 8,  padding: "16px 20px 16px 20px" }}> + Add new PG</Button>
              </div>
            </div>
          {/* </div> */}
          </div>

          {searchQuery && (
        <div  className='container ms-4 mb-4'   style={{ marginTop: '20px', fontWeight: 600, fontSize: 16 }}>
          {filteredData.length > 0 ? (
            <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(100, 100, 100, 1)" }}>
              {filteredData.length} result{filteredData.length > 1 ? 's' : ''} found for <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(34, 34, 34, 1)" }}>"{searchQuery}"</span>
            </span>
          ) : (
            <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(100, 100, 100, 1)" }}>No results found for <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(34, 34, 34, 1)" }}>"{searchQuery}"</span></span>
          )}
        </div>
      )}
<div className='container'>
          <div className='row row-gap-3'>
            {currentItems.length > 0 && currentItems.map((hostel) => {
              return (<>
                <div key={hostel.id} className='col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12'>
                  <PayingGuest hostel={hostel} key={hostel.id} OnSelectHostel={handleSelectedHostel} onRowVisiblity={handleDisplayPgList} OnEditHostel={handleEditHostel} />
                </div>
              </>)
            })}


            {!loader && filteredData.length == 0 &&

              <div className='d-flex align-items-center justify-content-center fade-in' style={{ width: "100%",margin: "0px auto", backgroundColor:"" }}>

                <div>
                  <div className='d-flex  justify-content-center'><img src={EmptyState} style={{ height: 240, width: 240 }} alt="Empty state" /></div>
                  <div className="pb-1 mt-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 20, color: "rgba(75, 75, 75, 1)" }}>No Paying Guest available</div>
                  <div className="pb-1 mt-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 16, color: "rgba(75, 75, 75, 1)" }}>There are no Paying Guest added.</div>
                  <div className='d-flex justify-content-center pb-1 mt-3'>                   <Button style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white",  fontWeight: 600, borderRadius: 12, padding: "20px 40px", fontFamily: "Gilroy" }}
                    onClick={handleShowAddPg}
                  > + Add new PG</Button>
                  </div>
                </div>
                <div>

                </div>
              </div>
            }



            <div className='mt-2 mb-2 d-flex justify-content-center w-100'>
              {loader &&
                //  <Spinner animation="grow" variant="primary" size="sm" />

                <div className="d-flex justify-content-center align-items-start gap-3" style={{ height: "100%" }}><Spinner animation="grow" style={{ color: "rgb(30, 69, 225)" }} /> <div style={{ color: "rgb(30, 69, 225)", fontWeight: 600 }}>Loading.....</div></div>

              }
            </div>


          </div>
          </div>
          {
            currentItems.length > 0 &&
            <Pagination className="mt-4 d-flex justify-content-end align-items-center">
              <Pagination.Prev style={{ visibility: "visible", color: "#1E45E1" }}
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              >
              </Pagination.Prev>

              {renderPagination()}

              <Pagination.Next style={{ visibility: "visible", color: "#1E45E1" }}
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
              </Pagination.Next>
            </Pagination>
          }


          {/* <Pagination className="mt-4 d-flex justify-content-end">
          {[...Array(Math.ceil(filteredData.length / itemsPerPage)).keys()].map(number => (
            <Pagination.Item key={number + 1} active={number + 1 === currentPage} onClick={() => paginate(number + 1)}>
              {number + 1}
            </Pagination.Item>
          ))}
        </Pagination> */}








        </>}

        {selectedHostel && (
          <div className='container mt-3'>

            <div className="d-flex justify-content-between align-items-center mb-3">

              <div className='d-flex align-items-center' >
                <ArrowLeft size="32" color="#222222" onClick={handlebackToPG} style={{ cursor: "pointer" }} />

                <label className='ms-4' style={{ fontSize: 18, color: "rgba(34, 34, 34, 1)", fontWeight: 600, fontFamily: "Gilroy" }}>{showHostelDetails.Name}</label>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className='me-3'>
                <Sort
                  Size="24"
                  color="#222"
                   variant="Outline"
                />
                  {/* <Image src={Filter} roundedCircle style={{ height: "30px", width: "30px" }} /> */}
                </div>

                <div>
                  <Button style={{ fontSize: 14, backgroundColor: "#1E45E1", color: "white",  fontWeight: 600, borderRadius: 12,  padding: "16px 20px 16px 20px", fontFamily: "Gilroy"}} onClick={() => handleAddFloors(showHostelDetails.id)}>+ Add  floor</Button>
                </div>
              </div>
            </div>

            {
              showHostelDetails?.floorDetails?.length > 0 ?


                <Tab.Container activeKey={key} onSelect={(k) => setKey(k)} id="vertical-tabs-example">
                  <Row className="g-0">
                    <Col sm={12} xs={12} md={2} lg={2} className='d-flex justify-content-start'>
                      <div>
                        <div className='d-flex justify-content-center'>
                          <div onClick={handlePrev} disabled={visibleRange[0] === 0} style={{ border: "1px solid rgba(239, 239, 239, 1)", width: "fit-content", borderRadius: 50, cursor: 'pointer', padding: 3 }}>
                            <ArrowUp2 size="32" color={visibleRange[0] === 0 ? "rgba(156, 156, 156, 1)" : "#000000"} variant="Bold" />
                          </div>
                        </div>

                        <Nav variant="" className="flex-column">
                          {showHostelDetails.floorDetails.map((floor, index) => (

                            index >= visibleRange[0] && index <= visibleRange[1] &&
                            <Nav.Item
                              key={floor.floor_id}
                              onClick={() => handleFloorClick(floor.floor_id, floor.floor_name)}
                              className={`mb-3 mt-2 d-flex justify-content-center a
                                lign-items-center  ${Number(floorClick) == Number(floor.floor_id) ? 'active-floor' : 'Navs-Item'}`}
                              style={{
                                border: "1px solid rgba(156, 156, 156, 1)", borderRadius: 16, height: 95, width: 95,
                                overflowY: 'auto',
                              }}




                            >
                              <Nav.Link className='text-center Paying-Guest' style={{padding:"unset"}}>
                                <div className={Number(floorClick) == Number(floor.floor_id) ? 'ActiveNumberFloor' : 'UnActiveNumberFloor'} style={{ fontSize: 32, fontFamily: "Gilroy", fontWeight: 600, textTransform: "capitalize", height: "fit-content" }}>
                                  {/* {floor.floor_id == 1 ? 'G' : floor.floor_id - 1} */}
                                  {(floor.floor_name ? floor.floor_name.charAt(0) : floor.floor.id)}
                                </div>
                                <div
                                  className={Number(floorClick) == Number(floor.floor_id) ? 'ActiveFloortext' : 'UnActiveFloortext'}
                                  style={{
                                    fontSize: 14, fontFamily: "Gilroy", fontWeight: 600, textTransform: "capitalize",
                                    wordBreak: "break-word",
                                    whiteSpace: "normal",
                                    overflowWrap: "break-word",
                                    width: "100%",
                                    textAlign: "center",
                                    padding: "1px 16px "


                                  }}
                                >
                                  {/* {floor.floor_id === 1
                                    ? "Ground Floor"
                                    : (!floor.floor_name || floor.floor_name.trim() === "" || floor.floor_name === "null")
                                      ? getFloorName(floor.floor_id)
                                      : floor.floor_name} */}
                                  {/* {
                                    floor.floor_name && floor.floor_name.trim() !== "" && floor.floor_name !== "null"
                                      ? floor.floor_name
                                      : floor.floor_id === 1
                                        ? "Ground Floor"
                                        : getFloorName(floor.floor_id)
                                  } */}

                                  {/* {
                                    typeof floor.floor_name === "string" && floor.floor_name.trim() !== "" && floor.floor_name !== "null"
                                      ? isNaN(floor.floor_name)
                                        ? floor.floor_name
                                        : getFloorName(Number(floor.floor_name))
                                      : floor.floor_id
                                  } */}

                                  {
                                    typeof floor.floor_name === "string" &&
                                      floor.floor_name.trim() !== "" &&
                                      floor.floor_name !== "null"
                                      ? isNaN(floor.floor_name)
                                        ? floor.floor_name
                                        : floor.floor_name
                                      : floor.floor_id
                                  }


                                </div>



                                {/* <div className={floorClick === floor.floor_id ? 'ActiveFloortext' : 'UnActiveFloortext'} style={{ fontSize: 14, fontFamily: "Gilroy", fontWeight: 600, textTransform:"capitalize" }}>{floor.floor_id ==  1  ? "Ground Floor" :  floor.floor_name ? floor.floor_name : getFloorName(floor.floor_id)}</div> */}
                              </Nav.Link>
                            </Nav.Item>
                          ))}
                        </Nav>

                        <div className='d-flex justify-content-center'>
                          <div onClick={handleNext} disabled={key === (showHostelDetails.number_Of_Floor - 1).toString()} style={{ border: "1px solid rgba(239, 239, 239, 1)", width: "fit-content", borderRadius: 50, padding: 3 }}>
                            <ArrowDown2 size="32" color={visibleRange[1] === numberOfFloors - 1 ? "rgba(156, 156, 156, 1)" : "#000000"} variant="Bold" />
                          </div>
                        </div>
                      </div>
                    </Col>
                    <Col sm={12} xs={12} md={10} lg={10}>
                     
<div className='container'>
                      <div className='d-flex justify-content-between align-items-center'>
                        <div style={{ fontSize: 20, fontFamily: "Gilroy", fontWeight: 600 , textTransform:'capitalize'}}>{
                          floorName !== null && floorName !== undefined && floorName.trim() !== ""
                            ? isNaN(floorName)
                              ? floorName
                              : floorName
                            : floorClick
                        }
                        </div>
                        <div>
                          <div style={{
                            cursor: "pointer", height: 40, width: 40, borderRadius: 100, border: "1px solid #EFEFEF", display: "flex", justifyContent: "center", alignItems: "center", position: "relative",
                            zIndex: showDots ? 1000 : 'auto'
                          }}
                            onClick={() => handleShowDots()}>
                            <PiDotsThreeOutlineVerticalFill style={{ height: 20, width: 20 }} />

                            {showDots && <>
                              <div ref={popupRef}  style={{ cursor: "pointer", backgroundColor: "#f9f9f9", position: "absolute", right: 0, top: 50, width: 163, height: "auto", border: "1px solid #EBEBEB", borderRadius: 10, display: "flex", justifyContent: "start", padding: 15, alignItems: "center" }}>
                                <div>


                                  <div className='d-flex gap-2 mb-2 align-items-center'
                                    onClick={() => handleEditFloor(floorClick, showHostelDetails.id, floorName)}
                                  >
                                    <div><Edit size="16" color="#1E45E1" />
                                    </div>
                                    <div>
                                    <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Outfit, sans-serif", color: "#222222", cursor: "pointer" }}>Edit</label>

                                    </div>
                                    
                                  </div>

                                  <div className='d-flex gap-2 mb-2 align-items-center' onClick={() => handleShowDelete(floorClick, showHostelDetails.id, showHostelDetails)}>
                                   
                                  <div><Trash size="16"
                                                color="red"
                                            /></div> 
                                   <div>
                                   <label style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", color: "#FF0000", cursor: "pointer" }}>Delete</label>

                                   </div>
                                   
                                  </div>
                                </div>
                              </div>


                            </>}

                          </div>
                        </div>
                      </div>
                    
                      </div>
                      <Tab.Content>
                        <ParticularHostelDetails
                          floorID={floorClick}
                          hostel_Id={showHostelDetails.id}
                          phoneNumber={showHostelDetails.hostel_PhoneNo}

                        />




                      </Tab.Content>
                    </Col>
                  </Row>
                </Tab.Container>
                :

                <div className='d-flex align-items-center justify-content-center animated-text mt-5' style={{ width: "100%", margin: "0px auto", backgroundColor:"" }}>

                  <div>
                    <div className='d-flex  justify-content-center'><img src={EmptyState} style={{ height: 240, width: 240 }} alt="Empty state" /></div>
                    <div className="pb-1 mt-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 20, color: "rgba(75, 75, 75, 1)" }}>No floors available</div>
                    <div className="pb-1 mt-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 16, color: "rgba(75, 75, 75, 1)" }}>There is no floor added to this paying guest.</div>
                    <div className='d-flex justify-content-center pb-1 mt-3'>                   <Button style={{ fontSize: 16, backgroundColor: "#1E45E1", color: "white",  fontWeight: 600, borderRadius: 12,  padding: "20px 40px", fontFamily: "Gilroy" }}
                      onClick={() => handleAddFloors(showHostelDetails.id)}
                    > + Add floor</Button>
                    </div>
                  </div>
                  <div>

                  </div>
                </div>

            }


          </div>
        )}






        {showAddPg && <AddPg show={showAddPg} handleClose={handleCloses} currentItem={editHostelDetails} />}
        {showDelete && <DeleteFloor show={showDelete} handleClose={handleCloseDelete} currentItem={deleteFloor} />}
        {showFloor && <AddFloor updateFloor={update} show={showFloor} handleClose={handleCloseFloor} hostelFloor={hostelFloor} openFloor={handleDIsplayFloorClick} editFloor={editFloor} />}
        {showRoom && <AddRoom show={showRoom} handleClose={handlecloseRoom} hostelDetails={hostelDetails} />}
      </div>
    </>
  );
}

export default PgList;
