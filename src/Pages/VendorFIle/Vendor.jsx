/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { FormControl, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import VendorListMap from './VendorListMap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Profile2 from '../../Assets/Images/New_images/profile-picture.png'
import Image from 'react-bootstrap/Image';
import AddVendor from './AddVendor';
import 'react-toastify/dist/ReactToastify.css';
import EmptyState from '../../Assets/Images/New_images/empty_image.png';
import { CloseCircle, SearchNormal1 } from 'iconsax-react';
// import { MdError } from "react-icons/md";
import { toast } from 'react-toastify';
import "./vendor.css";
import './VendorListMap.css';
import { useMediaQuery, useTheme } from '@mui/material'
import ErrorMessage from '../../Components/ErrorMessage';
import { useHasPermission } from '../../Utils/Permission';
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import SmarstayLogo from '../../Assets/Images/get.png'

function Vendor() {

  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState([])

  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentItem, setCurrentItem] = useState('')


  const {
    canWriteModule: canWriteVendor,
    canReadModule: canReadVendor,
    // canUpdateModule: canUpdateVendor,
    // canDeleteModule: canDeleteVendor,
  } = useHasPermission("Vendor");






  useEffect(() => {
    setLoading(!canReadVendor);
  }, [canReadVendor]);





  // const [vendorrolePermission, setVendorRolePermission] = useState("");

  // const [vendorpermissionError, setVendorPermissionError] = useState("");
  // const [vendorAddPermission, setVendorAddPermission] = useState("")
  // const [vendorDeletePermission, setVendorDeletePermission] = useState("")
  // const [vendorEditPermission, setVendorEditPermission] = useState("")
  const [hoveredIndex, setHoveredIndex] = useState(null);


  // useEffect(() => {
  //   setVendorRolePermission(state.createAccount.accountList);
  // }, [state.createAccount.accountList]);





  // useEffect(() => {
  //   const userType = vendorrolePermission[0]?.user_details?.user_type;
  //   const isAdmin = userType === "admin" || userType === "agent";
  //   if (isAdmin) {
  //     if (state?.login?.planStatus === 0) {
  //       setVendorPermissionError("");
  //       setVendorAddPermission("Permission Denied");
  //       setVendorEditPermission("Permission Denied");
  //       setVendorDeletePermission("Permission Denied");

  //     } else if (state?.login?.planStatus === 1) {
  //       setVendorPermissionError("");
  //       setVendorAddPermission("");
  //       setVendorEditPermission("");
  //       setVendorDeletePermission("");
  //     }
  //   }

  // }, [state?.login?.planStatus, state?.login?.selectedHostel_Id, vendorrolePermission])


  // useEffect(() => {
  //   const vendorPermission = vendorrolePermission[0]?.role_permissions?.find(
  //     (perm) => perm.permission_name === "Vendor"
  //   );

  //   const isOwner = vendorrolePermission[0]?.user_details?.user_type === "staff";
  //   const planActive = state?.login?.planStatus === 1;

  //   if (!vendorPermission || !isOwner) return;


  //   if (vendorPermission.per_view === 1 && planActive) {
  //     setVendorPermissionError("");
  //   } else {
  //     setVendorPermissionError("Permission Denied");
  //   }


  //   if (vendorPermission.per_create === 1 && planActive) {
  //     setVendorAddPermission("");
  //   } else {
  //     setVendorAddPermission("Permission Denied");
  //   }


  //   if (vendorPermission.per_edit === 1 && planActive) {
  //     setVendorEditPermission("");
  //   } else {
  //     setVendorEditPermission("Permission Denied");
  //   }

  //   if (vendorPermission.per_delete === 1 && planActive) {
  //     setVendorDeletePermission("");
  //   } else {
  //     setVendorDeletePermission("Permission Denied");
  //   }
  // }, [vendorrolePermission, state?.login?.planStatus, state?.login?.selectedHostel_Id]);





  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      // setLoading(true)
      dispatch({ type: 'VENDORLIST', payload: { hostelId: state.login.selectedHostel_Id } })
    }

  }, [state.login.selectedHostel_Id])

  useEffect(() => {
    if (state.ComplianceList.getVendorStatusCode === 200) {
      setFilteredData(state.ComplianceList.VendorList)
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_GET_VENDOR_STATUS_CODE' })
      }, 500)
    }
  }, [state.ComplianceList.getVendorStatusCode])



  useEffect(() => {
    if (state.ComplianceList.noVendorStatusCode === 201) {
      setFilteredData([])
      setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_ERROR_VENDOR_LIST' })
      }, 500)
    }
  }, [state.ComplianceList.noVendorStatusCode])



  useEffect(() => {
    if (state.ComplianceList.addVendorSuccessStatusCode === 201 || state.ComplianceList.deleteVendorStatusCode === 200 || state.ComplianceList.updateVendorSuccessStatusCode === 200) {
      setShow(false);
      setShowDeleteVendor(false)
      setTimeout(() => {
        dispatch({ type: 'VENDORLIST', payload: { hostelId: state.login.selectedHostel_Id } })

      }, 100)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_ADD_VENDOR_STATUS_CODE' })
        dispatch({ type: 'CLEAR_UPDATE_VENDOR_STATUS_CODE' })
        dispatch({ type: 'CLEAR_DELETE_VENDOR_STATUS_CODE' })
      }, 5000)

    }


  }, [state.ComplianceList.addVendorSuccessStatusCode, state.ComplianceList.deleteVendorStatusCode, state.ComplianceList.updateVendorSuccessStatusCode])




  const [showDropDown, setShowDropDown] = useState(false)
  const [showFilterData, setShowFilterData] = useState(false)


  const handleShowSearch = () => {
    setShowFilterData(!showFilterData)
  }

  const handleCloseSearch = () => {
    setShowFilterData(false)
    setFilteredData(state.ComplianceList.VendorList)
    setSearchQuery('');
  }



  const handleInputChange = (e) => {
    const searchItem = e.target.value;
    setSearchQuery(searchItem);
    if (searchItem !== '') {
      const filteredItems = state.ComplianceList.VendorList && state.ComplianceList.VendorList.filter((user) =>
        user.Vendor_Name && user.Vendor_Name.toLowerCase().includes(searchItem.toLowerCase())
      );

      setFilteredData(filteredItems);
      setShowDropDown(true)
    }
    else {
      setFilteredData(state.ComplianceList.VendorList)
    }
    // setCurrentPage(1);
  };

  const handleDropDown = (value) => {
    const searchItem = value;
    setSearchQuery(searchItem);
    if (searchItem !== '') {
      const filteredItems = state.ComplianceList.VendorList && state.ComplianceList.VendorList.filter((user) =>
        user.Vendor_Name && user.Vendor_Name.toLowerCase().includes(searchItem.toLowerCase())
      );

      setFilteredData(filteredItems);

    }
    else {
      setFilteredData(state.ComplianceList.VendorList)
    }
    // setCurrentPage(1);
    setShowDropDown(false)
  }

  const [show, setShow] = useState(false);

  const handleShow = () => {
    if (!state.login.selectedHostel_Id) {
      toast.error('Please add a hostel before adding vendor information.', {
        hideProgressBar: true, autoClose: 1500, style: { color: '#000', borderBottom: "5px solid red", fontFamily: "Gilroy" }
      });
      return;
    }
    setShow(true);
    setCurrentItem('')

  }


  //   const indexOfLastItem = currentPage * itemsPerPage;
  //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  //   const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);


  //   const handlePageChange = (pageNumber) => {
  //     setCurrentPage(pageNumber);
  //   };
  //  const handleItemsPerPageChange = (selectedOption) => {
  //   if (selectedOption) {
  //     setItemsPerPage(Number(selectedOption.value));
  //     setCurrentPage(1);
  //   }
  // };


  //   const totalPages = Math.ceil(filteredData?.length / itemsPerPage);






  const handleEditVendor = (vendorData) => {
    setCurrentItem(vendorData)
    setShow(true)
  };



  const [showDeleteVendor, setShowDeleteVendor] = useState(false)
  const [showDeleteVendorDetails, setShowDeleteVendorDetails] = useState('')

  const handleDeleteVendor = (item) => {
    setShowDeleteVendor(true)
    setShowDeleteVendorDetails(item)

  };

  const handleCloseForDeleteVendor = () => {
    setShowDeleteVendor(false)
  }


  const ConfirmDeleteVendor = () => {
    if (showDeleteVendorDetails) {
      dispatch({
        type: 'DELETEVENDOR',
        payload: {
          vendorId: showDeleteVendorDetails.id,
          // Status: 0,
        },
      });
      // setCurrentPage(1);
    }
  }









  useEffect(() => {
    const appearOptions = {
      threshold: 0.5
    };
    const faders = document.querySelectorAll('.fade-in');
    const appearOnScro1l = new IntersectionObserver(function (entries) {
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

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>

      <div style={{ width: "100%", fontFamily: "Gilroy", position: "relative", marginTop: 22 }} className='container'>


        <div

          style={{
            height: 53,
            position: "sticky",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: "#fff"
          }}>




          <div className="container d-flex justify-content-between align-items-center flex-wrap"
            style={{
              position: 'sticky',
              backgroundColor: 'white',
              zIndex: 10,

            }}
          >

            <div >
              <label style={{ fontSize: 18, color: "#000000", fontWeight: 600, fontFamily: "Gilroy" }}>Vendor</label>
            </div>

            <div className="d-flex justify-content-between align-items-center flex-wrap">



              {
                !showFilterData &&

                <div onClick={() => canReadVendor && handleShowSearch()} style={{ paddingRight: 30, cursor: "pointer" }}>
                  <SearchNormal1
                    size="26"
                    color="#222"
                    style={{
                      cursor: canReadVendor ? "pointer" : "not-allowed",
                      opacity: canReadVendor ? 1 : 0.4,
                      pointerEvents: canReadVendor ? "auto" : "none",
                      transition: "opacity 0.3s ease"
                    }}
                  />
                </div>
              }
              {
                showFilterData &&
                <div className=' me-3  flex flex-wrap'
                  style={{ position: 'relative', marginTop: "-4px", width: isSmallScreen && showFilterData ? '150px' : '240px' }}
                >

                  <div className=''>
                    <InputGroup
                      style={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        width: '100%',
                      }}>

                      <FormControl size="lg"
                        value={searchQuery}
                        onChange={handleInputChange}
                        style={{
                          width: 'auto', boxShadow: "none", borderColor: "lightgray", borderRight: "none", fontSize: 15, fontWeight: 500, color: "#222",

                        }}
                        placeholder="Search..."
                      />
                      <InputGroup.Text style={{ backgroundColor: "#ffffff", cursor: "pointer" }}>
                        <CloseCircle size="24" color="#222" onClick={handleCloseSearch} />
                      </InputGroup.Text>
                    </InputGroup>
                  </div>


                  {
                    filteredData.length > 0 && searchQuery !== '' && showDropDown && (

                      <div style={{ border: '1px solid #d9d9d9 ', position: "absolute", top: 50, left: 0, zIndex: 1000, padding: 10, borderRadius: 8, backgroundColor: "#fff" }}>
                        <ul className='show-scroll' style={{

                          width: 235,
                          backgroundColor: '#fff',
                          maxHeight: "174px",
                          minHeight: filteredData?.length > 1 ? "100px" : "auto",
                          overflowY: filteredData?.length > 2 ? "auto" : "hidden",
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
                                  handleDropDown(user.Vendor_Name);

                                }}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                style={{
                                  padding: '10px',
                                  cursor: 'pointer',
                                  borderBottom: '1px solid #dcdcdc',
                                  fontSize: '14px',
                                  fontFamily: 'Gilroy',
                                  fontWeight: 500,
                                  backgroundColor: hoveredIndex === index ? '#1E45E1' : 'transparent',
                                  color: hoveredIndex === index ? 'white' : 'black',

                                }}
                              >
                                <span>
                                  <Image
                                    src={user.Vendor_profile && user.Vendor_profile !== 'undefined' ? user.Vendor_profile : Profile2}
                                    style={{ height: 20, width: 20 }}
                                    roundedCircle
                                  />
                                </span>
                                <span className='ps-4'>{user.Vendor_Name}</span>
                              </li>


                            ))
                          }
                        </ul>
                      </div>
                    )
                  }
                </div>
              }





              <div >
                <Button disabled={!canWriteVendor} onClick={handleShow} className="vendor-button"
                  style={{
                    fontFamily: "Gilroy",
                    fontSize: "14px",
                    backgroundColor: "#1E45E1",
                    color: "white",
                    fontWeight: 600,
                    borderRadius: "8px",
                    padding: "12px",
                    marginBottom: "10px",
                    maxHeight: 45,
                    width: "146px",
                    whiteSpace: "nowrap"
                  }}
                > + Vendor</Button>
              </div>
            </div>
          </div>

        </div>

        {searchQuery && (
          <div className='container mb-4' style={{ marginTop: '20px', fontWeight: 600, fontSize: 16 }}>
            {filteredData.length > 0 ? (
              <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(100, 100, 100, 1)" }}>
                {filteredData.length} result{filteredData.length > 1 ? 's' : ''} found for <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(34, 34, 34, 1)" }}>&quot;{searchQuery}&quot;</span>
              </span>
            ) : (
              <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(100, 100, 100, 1)" }}>No results found for <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(34, 34, 34, 1)" }}>&quot;{searchQuery}&quot;</span></span>
            )}
          </div>
        )}

        {
          !canReadVendor ? (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "100vh",

                }}
              >
                <img
                  src={EmptyState}
                  alt="Empty State"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
                <ErrorMessage message={['You do not have access to view Vendor']} type="warning" />

              </div>
            </>
          ) :

            <div className='container show-scrolls-sidebar'
              style={{
                height: "500px",
                overflowY: "auto",
                position: "relative",
                paddingRight: 20

              }}
            >
              {loading && (
                <div
                  style={{
                    position: "fixed",
                    right: "40%",
                    top: "40%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 9999,
                  }}
                >
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      borderTop: "2px solid #1E45E1",
                      borderBottom: "2px solid #1E45E1",
                      borderRight: "2px solid transparent",
                      animation: "spin 1s linear infinite",
                      position: "relative",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                  <div style={{ display: "flex",
                      alignItems: "center",
                      justifyContent: "center"}}>
                    <img
                      src={SmarstayLogo}  
                      alt="logo"
                      style={{
                        width: "35px",
                        height: "35px",
                        position: "absolute",
                        transform: "rotate(0deg)", 
                             animation: "spinReverse 1s linear infinite",borderRadius:"50%"
                      }}
                    /> 
                    </div>
                  </div>
                </div>
              )}


              <div className='row row-gap-3 '>
                {filteredData && filteredData.length > 0 && filteredData.map((vendor) => (
                  <div key={vendor.id} className='col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12'>
                    <VendorListMap vendor={vendor} onEditVendor={handleEditVendor}
                      onDeleteVendor={handleDeleteVendor}
                    // vendorDeletePermission={vendorDeletePermission}
                    //  vendorAddPermission={vendorAddPermission}
                    //   vendorEditPermission={vendorEditPermission}
                    />
                  </div>
                ))
                }

                {!loading && filteredData?.length === 0 && (
                  <div className='d-flex align-items-center justify-content-center fade-in' style={{ width: "100%", height: "70vh", margin: "0px auto" }}>
                    <div>
                      <div className='d-flex justify-content-center'>
                        <img src={EmptyState} style={{ height: 240, width: 240 }} alt="Empty state" />
                      </div>
                      <div className="pb-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 18, color: "rgba(75, 75, 75, 1)" }}>
                        No vendor available
                      </div>
                      <div className="pb-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 14, color: "rgba(75, 75, 75, 1)" }}>
                        There are no Vendors added.
                      </div>
                    </div>
                  </div>
                )}





              </div>

            </div>

        }



        {show &&
          <AddVendor show={show} currentItem={currentItem} setShow={setShow} />
        }



        <Modal show={showDeleteVendor} onHide={handleCloseForDeleteVendor}
          centered backdrop="static" dialogClassName="custom-delete-modal">
          <Modal.Header style={{ borderBottom: "none" }}>
            <Modal.Title
              className="w-100 text-center"
              style={{
                fontSize: "18px", fontFamily: "Gilroy", fontWeight: 600, color: "#222222",
              }}>Delete Vendor?</Modal.Title>

          </Modal.Header>

          <Modal.Body
            className="text-center"
            style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", marginTop: "-10px", }}>
            Are you sure you want to delete this vendor?
          </Modal.Body>


          <Modal.Footer
            className="d-flex justify-content-center"
            style={{ borderTop: "none", marginTop: "-10px" }}>
            <Button
              className="me-2"
              onClick={handleCloseForDeleteVendor}
              style={{
                width: "100%",
                maxWidth: 160,
                height: 52,
                borderRadius: 8,
                padding: "12px 20px",
                background: "#fff",
                color: "#1E45E1",
                border: "1px solid #1E45E1",
                fontWeight: 600,
                fontFamily: "Gilroy",
                fontSize: "14px",
              }}
            >
              Cancel
            </Button>

            <Button

              style={{
                width: "100%",
                maxWidth: 160,
                height: 52,
                borderRadius: 8,
                padding: "12px 20px",
                background: "#1E45E1",
                color: "#FFFFFF",
                fontWeight: 600,
                fontFamily: "Gilroy",
                fontSize: "14px",
              }}
              onClick={ConfirmDeleteVendor}>
              Delete
            </Button>

          </Modal.Footer>
        </Modal>

      </div>



    </>



  )
}

export default withErrorBoundary(Vendor);