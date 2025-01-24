import React, { useState, useEffect } from 'react';
import { FormControl, InputGroup, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import VendorListMap from './VendorListMap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Profile2 from '../../Assets/Images/New_images/profile-picture.png'
import Image from 'react-bootstrap/Image';
import AddVendor from './AddVendor';
import Spinner from 'react-bootstrap/Spinner';
import 'react-toastify/dist/ReactToastify.css';
import EmptyState from '../../Assets/Images/New_images/empty_image.png';
import { ArrowLeft2, ArrowRight2, ArrowUp2, ArrowDown2, CloseCircle, SearchNormal1, Sort, Edit, Trash } from 'iconsax-react';
import { MdError } from "react-icons/md";


function Vendor() {

  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  // const [itemsPerPage] = useState(10);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const [searchQuery, setSearchQuery] = useState('')
  const [loader, setLoader] = useState(true)


  const [vendorrolePermission, setVendorRolePermission] = useState("");

  const [vendorpermissionError, setVendorPermissionError] = useState("");
  const [vendorAddPermission, setVendorAddPermission] = useState("")
  const [vendorDeletePermission, setVendorDeletePermission] = useState("")
  const [vendorEditPermission, setVendorEditPermission] = useState("")



  useEffect(() => {
    setVendorRolePermission(state.createAccount.accountList);
  }, [state.createAccount.accountList]);

  useEffect(() => {
    if (
      vendorrolePermission[0]?.is_owner == 1 ||
      vendorrolePermission[0]?.role_permissions[9]?.per_view == 1
    ) {
      setVendorPermissionError("");
    } else {
      setVendorPermissionError("Permission Denied");
    }
  }, [vendorrolePermission]);



  useEffect(() => {
    if (
      vendorrolePermission[0]?.is_owner == 1 ||
      vendorrolePermission[0]?.role_permissions[9]?.per_create == 1
    ) {
      setVendorAddPermission("");
    } else {
      setVendorAddPermission("Permission Denied");
    }
  }, [vendorrolePermission]);


  useEffect(() => {
    if (
      vendorrolePermission[0]?.is_owner == 1 ||
      vendorrolePermission[0]?.role_permissions[9]?.per_delete == 1
    ) {
      setVendorDeletePermission("");
    } else {
      setVendorDeletePermission("Permission Denied");
    }
  }, [vendorrolePermission]);
  useEffect(() => {
    if (
      vendorrolePermission[0]?.is_owner == 1 ||
      vendorrolePermission[0]?.role_permissions[9]?.per_edit == 1
    ) {
      setVendorEditPermission("");
    } else {
      setVendorEditPermission("Permission Denied");
    }
  }, [vendorrolePermission]);

  useEffect(() => {
    setLoader(true)
    dispatch({ type: 'VENDORLIST', payload: { hostel_id: state.login.selectedHostel_Id } })
  
  }, [state.login.selectedHostel_Id])

  useEffect(() => {
    if (state.ComplianceList.getVendorStatusCode === 200) {
      setFilteredData(state.ComplianceList.VendorList)
      setLoader(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_GET_VENDOR_STATUS_CODE' })
      }, 1000)
    }
  }, [state.ComplianceList.getVendorStatusCode])



  useEffect(() => {
    if (state.ComplianceList.noVendorStatusCode === 201) {
      setFilteredData([])
      setLoader(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_ERROR_VENDOR_LIST' })
      }, 1000)
    }
  }, [state.ComplianceList.noVendorStatusCode])















  const toastStyle = {

    backgroundColor: 'green',
    color: 'white',
    width: "100%"
  };

  useEffect(() => {
    if (state.ComplianceList.addVendorSuccessStatusCode === 200 || state.ComplianceList.deleteVendorStatusCode === 200) {
      setShow(false);
      setShowDeleteVendor(false)
      setTimeout(() => {
        dispatch({ type: 'VENDORLIST', payload: { hostel_id: state.login.selectedHostel_Id } })

      }, 100)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_ADD_VENDOR_STATUS_CODE' })
      }, 5000)

      setTimeout(() => {
        dispatch({ type: 'CLEAR_DELETE_VENDOR_STATUS_CODE' })
      }, 5000)


    }


    // setCheck(null)
  }, [state.ComplianceList.addVendorSuccessStatusCode, state.ComplianceList.deleteVendorStatusCode])




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
    if (searchItem != '') {
      const filteredItems = state.ComplianceList.VendorList && state.ComplianceList.VendorList.filter((user) =>
        user.Vendor_Name && user.Vendor_Name.toLowerCase().includes(searchItem.toLowerCase())
      );

      setFilteredData(filteredItems);
      setShowDropDown(true)
    }
    else {
      setFilteredData(state.ComplianceList.VendorList)
    }
    setCurrentPage(1);
  };

  const handleDropDown = (value) => {
    const searchItem = value;
    setSearchQuery(searchItem);
    if (searchItem != '') {
      const filteredItems = state.ComplianceList.VendorList && state.ComplianceList.VendorList.filter((user) =>
        user.Vendor_Name && user.Vendor_Name.toLowerCase().includes(searchItem.toLowerCase())
      );

      setFilteredData(filteredItems);

    }
    else {
      setFilteredData(state.ComplianceList.VendorList)
    }
    setCurrentPage(1);
    setShowDropDown(false)
  }

  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
    setCurrentItem('')

  }
  const handleClose = () => {
    setShow(false);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const [currentItem, setCurrentItem] = useState('')

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
  };

  // const renderPagination = () => {
  //   const pageNumbers = [];
  //   let startPage = Math.max(1, currentPage - 2);
  //   let endPage = Math.min(totalPages, currentPage + 2);

  //   if (startPage > 1) {
  //     pageNumbers.push(
  //       <Pagination.Item key={1} active={1 === currentPage} onClick={() => paginate(1)}>
  //         1
  //       </Pagination.Item>
  //     );
  //     if (startPage > 2) {
  //       pageNumbers.push(<Pagination.Ellipsis key="start-ellipsis" />);
  //     }
  //   }

  //   for (let i = startPage; i <= endPage; i++) {
  //     pageNumbers.push(
  //       <Pagination.Item key={i} active={i === currentPage} onClick={() => paginate(i)}>
  //         {i}
  //       </Pagination.Item>
  //     );
  //   }

  //   if (endPage < totalPages) {
  //     if (endPage < totalPages - 1) {
  //       pageNumbers.push(<Pagination.Ellipsis key="end-ellipsis" />);
  //     }
  //     pageNumbers.push(
  //       <Pagination.Item key={totalPages} active={totalPages === currentPage} onClick={() => paginate(totalPages)}>
  //         {totalPages}
  //       </Pagination.Item>
  //     );
  //   }

  //   return pageNumbers;
  // };




  const handleEditVendor = (vendorData) => {
    setCurrentItem(vendorData)
    setShow(true)
  };


  //   const handleDeleteVendor = (item) =>{
  //     console.log("delete item",item)
  // if(item){
  //     Swal.fire({
  //       icon: 'warning',
  //       title: 'Do you want to delete the Vendor ?',
  //       confirmButtonText: 'Yes',
  //       cancelButtonText: 'No',
  //       showCancelButton: true,
  //   }).then((result) => {
  //       if (result.isConfirmed) {
  //           dispatch({
  //               type: 'DELETEVENDOR',
  //               payload: {
  //                   id: item.id,
  //                   Status: 0
  //               },
  //           });
  //           Swal.fire({
  //               icon: 'success',
  //               title: 'Vendor deleted Successfully',
  //           })
  //       }
  //       setCurrentPage(1);
  //   });

  // }

  //   }

  const [showDeleteVendor, setShowDeleteVendor] = useState(false)
  const [showDeleteVendorDetails, setShowDeleteVendorDetails] = useState('')

  const handleDeleteVendor = (item) => {
    setShowDeleteVendor(true)
    setShowDeleteVendorDetails(item)
    // if (item) {
    //   toast(
    //     ({ closeToast }) => (
    //       <div >
    //         <p style={{ fontSize: 14, color: "#222222", fontFamily: "Gilroy", fontWeight: 500 }}>Do you want to delete the Vendor?</p>
    //         <div className='w-100 d-flex justify-content-center'>
    //           <button
    //             style={{ marginRight: '10px', backgroundColor: '#1E45E1', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer', fontSize: 14, color: "#fff", fontFamily: "Gilroy", fontWeight: 500 }}
    //             onClick={() => {

    //               dispatch({
    //                 type: 'DELETEVENDOR',
    //                 payload: {
    //                   id: item.id,
    //                   Status: 0,
    //                 },
    //               });

    //               setCurrentPage(1);
    //               closeToast();
    //             }}
    //           >
    //             Yes
    //           </button>
    //           {/* <button
    //           style={{ backgroundColor: '#5bc0de', color: '#fff', border: 'none', padding: '5px 10px', borderRadius: '5px', cursor: 'pointer' }}
    //           onClick={() => {
    //             // Cancel deletion
    //             // toast.info("Vendor deletion canceled", {
    //             //   position: 'top-center',
    //             //   autoClose: 1000,
    //             // });
    //             closeToast(); 
    //           }}
    //         >
    //           Cancel
    //         </button> */}
    //         </div>
    //       </div>
    //     ),
    //     {
    //       position: 'top-center',
    //       autoClose: false,
    //       closeOnClick: false,
    //       hideProgressBar: true,
    //       draggable: false,
    //       // style:toastStyle
    //     }
    //   );
    // }
  };

  const handleCloseForDeleteVendor = () => {
    setShowDeleteVendor(false)
  }


  const ConfirmDeleteVendor = () => {
    if (showDeleteVendorDetails) {
      dispatch({
        type: 'DELETEVENDOR',
        payload: {
          id: showDeleteVendorDetails.id,
          Status: 0,
        },
      });
      setCurrentPage(1);
    }
  }

  const stateAccount = useSelector(state => state.createAccount)


  const [profile, setProfile] = useState(stateAccount.accountList[0]?.user_details.profile)


  useEffect(() => {
    if (stateAccount.statusCodeForAccountList == 200) {
      const loginProfile = stateAccount.accountList[0].user_details.profile

      setProfile(loginProfile)
    }

  }, [stateAccount.statusCodeForAccountList])




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
      {
        vendorpermissionError ? (
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
              {/* Image */}
              <img
                src={EmptyState}
                alt="Empty State"
                style={{ maxWidth: "100%", height: "auto" }}
              />

              {/* Permission Error */}
              {vendorpermissionError && (
                <div
                  style={{
                    color: "red",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginTop: "1rem",
                  }}
                >
                  <MdError size={20} />
                  <span style={{ fontSize: '12px', color: 'red', fontFamily: "Gilroy", fontWeight: 500 }}>{vendorpermissionError}</span>
                </div>
              )}
            </div></>
        ) :
          <div style={{ width: "100%", fontFamily: "Gilroy", position: "relative" }} className='container'>

            <div className='container ' 

              style={{ marginTop:7,
                height: 83,
                position: "sticky",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                backgroundColor: "#fff"
              }}>




              <div className=" d-flex justify-content-between align-items-center flex-wrap  mb-3"
                style={{
                  position: 'sticky',
                  top: 25,
                  backgroundColor: 'white',
                  zIndex: 10,
                  padding: '10px',
                }}
              >

                <div>
                  <label style={{ fontSize: 18, color: "#000000", fontWeight: 600, fontFamily: "Gilroy" }}>Vendors</label>
                </div>

                <div className="d-flex justify-content-between align-items-center flex-wrap">



                  {
                    !showFilterData &&

                    <div className='me-3' onClick={handleShowSearch}>
                      <SearchNormal1
                        size="26"
                        color="#222"
                      />
                    </div>
                  }
                  {
                    showFilterData &&
                    <div className=' me-3  flex flex-wrap'
                      style={{ position: 'relative' }}
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
                              //  '::placeholder': { color: "#222", fontWeight: 500 } 
                            }}
                            placeholder="Search..."
                          />
                          <InputGroup.Text style={{ backgroundColor: "#ffffff", }}>
                            <CloseCircle size="24" color="#222" onClick={handleCloseSearch} />
                          </InputGroup.Text>
                        </InputGroup>
                      </div>


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
                                      handleDropDown(user.Vendor_Name);

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



                  {/* <div className='me-3'>
                    <Sort
                      Size="24"
                      color="#222"
                      variant="Outline"
                    />
                  </div> */}

                  <div>
                    <Button disabled={vendorAddPermission} onClick={handleShow}
                    //  style={{
                    //   fontFamily: "Gilroy", fontSize: 14, backgroundColor: "#1E45E1", color: "white",
                    //   fontWeight: 600, borderRadius: 12, padding: "12px 16"}}
                      style={{
                        fontFamily: "Gilroy",
                        fontSize: "14px",
                        backgroundColor: "#1E45E1",
                        color: "white",
                        fontWeight: 600,
                        borderRadius: "8px",
                        padding: "10px 12px",
                        width: "auto",
                        maxWidth: "100%",
                        marginBottom: "10px",
                        maxHeight: 45,
            
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
                    {filteredData.length} result{filteredData.length > 1 ? 's' : ''} found for <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(34, 34, 34, 1)" }}>"{searchQuery}"</span>
                  </span>
                ) : (
                  <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(100, 100, 100, 1)" }}>No results found for <span style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 16, color: "rgba(34, 34, 34, 1)" }}>"{searchQuery}"</span></span>
                )}
              </div>
            )}

            <div className='container'
              style={{
                maxHeight: "470px",
                overflowY: "auto",
              }}>

              <div className='row row-gap-3'>
                {currentItems && currentItems.map((vendor) => (
                  <div key={vendor.id} className='col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12'>
                    <VendorListMap vendor={vendor} onEditVendor={handleEditVendor}
                      onDeleteVendor={handleDeleteVendor} vendorDeletePermission={vendorDeletePermission} vendorAddPermission={vendorAddPermission} vendorEditPermission={vendorEditPermission}
                    />
                  </div>
                ))
                }

                {!loader && currentItems.length == 0 &&

                  <div className='d-flex align-items-center justify-content-center fade-in' style={{ width: "100%", height: "70vh", margin: "0px auto" }}>


                    <div>
                      <div className='d-flex  justify-content-center'><img src={EmptyState} style={{ height: 240, width: 240 }} alt="Empty state" /></div>
                      <div className="pb-1 mt-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 20, color: "rgba(75, 75, 75, 1)" }}>No vendor available</div>
                      <div className="pb-1 mt-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 16, color: "rgba(75, 75, 75, 1)" }}>There are no Vendors added.</div>

                    </div>
                    <div>

                    </div>
                  </div>
                  // <div style={{ width:"100%", fontWeight:600, fontFamily:"Gilroy" }} className='d-flex justify-content-center align-items-center fade-in'>
                  //   <Alert variant="warning"  >
                  //     Currently, no vendors are available.
                  //   </Alert>

                  // </div>
                }
                {loader &&
                  <div
                    style={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bottom: 0,
                      left: '200px',
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
                  </div>
                }





              </div>

            </div>
            {
              currentItems.length > 0 &&
              <nav className='position-fixed bottom-0 end-0 mb-4 me-3 d-flex justify-content-end align-items-center'
              // style={{
              //   marginBottom:20,
              //   display: "flex",
              //   alignItems: "center",
              //   justifyContent: "end", // Align dropdown and pagination
              //   padding: "10px",
              //   position:"sticky",

              //   right:0,

              // }}
              >
                {/* Dropdown for Items Per Page */}
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
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>
                </div>

                {/* Pagination Controls */}
                <ul
                  style={{
                    display: "flex",
                    alignItems: "center",
                    listStyleType: "none",
                    margin: 0,
                    padding: 0,
                  }}
                >
                  {/* Previous Button */}
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

                  {/* Current Page Indicator */}
                  <li style={{ margin: "0 10px", fontSize: "14px", fontWeight: "bold" }}>
                    {currentPage} of {totalPages}
                  </li>

                  {/* Next Button */}
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
            }

            {/* </div> */}

            {show &&
              <AddVendor show={show} handleClose={handleClose} currentItem={currentItem} />
            }



            <Modal show={showDeleteVendor} onHide={handleCloseForDeleteVendor} centered backdrop="static"
              style={{
                width: 388,
                height: 250,
                marginLeft: "500px",
                marginTop: "200px",
              }}>

              <Modal.Header style={{ borderBottom: "none", justifyContent: "center", display: "flex" }}>
                <Modal.Title style={{ fontSize: 18, fontWeight: 600, fontFamily: "Gilroy" }}>Delete Vendor?</Modal.Title>
                {/* <CloseCircle size="24" color="#000"  onClick={handleCloseForDeleteVendor}/> */}
              </Modal.Header>

              <Modal.Body style={{ fontSize: 14, fontWeight: 500, fontFamily: "Gilroy", textAlign: "center", marginTop: "-20px", }}>
                Are you sure you want to delete this vendor?
              </Modal.Body>


              <Modal.Footer className='d-flex justify-content-center' style={{ border: "none" }}>
                <Button onClick={handleCloseForDeleteVendor} style={{ borderRadius: 8, padding: "16px 45px", border: "1px solid rgba(36, 0, 255, 1)", backgroundColor: "#FFF", color: "rgba(36, 0, 255, 1)", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }}>
                  Cancel
                </Button>

                <Button style={{ borderRadius: 8, padding: "16px 45px ", border: "1px solid rgba(36, 0, 255, 1)", backgroundColor: "rgba(36, 0, 255, 1)", color: "#fff", fontSize: 14, fontWeight: 600, fontFamily: "Gilroy" }} onClick={ConfirmDeleteVendor}>
                  Delete
                </Button>

              </Modal.Footer>
            </Modal>

          </div>

      }

    </>



  )
}

export default Vendor;