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
// import "./vendor.css";
// import './VendorListMap.css';
import { useMediaQuery, useTheme } from '@mui/material'
import ErrorMessage from '../../Components/ErrorMessage';
import { useHasPermission } from '../../Utils/Permission';
import withErrorBoundary from "../../Hoc/WithErrorBountry";
import SmarstayLogo from '../../Assets/Images/get.png'

function Vendor() {

  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const [filteredData, setFilteredData] = useState([])
  const [show, setShow] = useState(false);
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentItem, setCurrentItem] = useState('')
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const [showDropDown, setShowDropDown] = useState(false)
  const [showFilterData, setShowFilterData] = useState(false)

  const [showDeleteVendor, setShowDeleteVendor] = useState(false)
  const [showDeleteVendorDetails, setShowDeleteVendorDetails] = useState('')

  const {
    canWriteModule: canWriteVendor,
    canReadModule: canReadVendor,
    // canUpdateModule: canUpdateVendor,
    // canDeleteModule: canDeleteVendor,
  } = useHasPermission("Vendor");





  useEffect(() => {
    if (!canReadVendor) {
      setLoading(false);
    }
  }, [canReadVendor]);
useEffect(() => {
    if (state.UsersList?.accessRestrictionError) {
    setLoading(false)
      setTimeout(() => {
        dispatch({ type: 'ACCESS_RESTRICTION_ERROR_REMOVE' })
      }, 1000)
    }

  }, [state.UsersList?.accessRestrictionError])
  useEffect(() => {
    if (state.login.selectedHostel_Id) {
      setLoading(true)
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

    setLoading(false)

  }, [state.ComplianceList.VendorList])



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







  const handleEditVendor = (vendorData) => {
    setCurrentItem(vendorData)
    setShow(true)
  };




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
     
      <div className="sticky top-0 bg-white">
        <div>
          <div className="sticky top-0 z-10 bg-white p-2 flex justify-between items-center flex-wrap">

            <div>
              <label className="text-[18px] font-semibold font-gilroy text-black">
                Vendor
              </label>
            </div>

            <div className="flex justify-between items-center flex-wrap">

              {!showFilterData && (
                <div
                  onClick={() => canReadVendor && handleShowSearch()}
                  className="pr-[30px]"
                >
                  <SearchNormal1
                    size="26"
                    color="#222"
                    className={`transition-opacity duration-300 ${canReadVendor
                      ? "cursor-pointer opacity-100 pointer-events-auto"
                      : "cursor-not-allowed opacity-40 pointer-events-none"
                      }`}
                  />
                </div>
              )}

              {showFilterData && (
                <div
                  className={`relative me-3 flex flex-wrap mt-[-4px] ${isSmallScreen ? "w-[150px]" : "w-[240px]"
                    }`}
                >
                  <InputGroup className="flex flex-nowrap w-full">
                    <FormControl
                      size="lg"
                      value={searchQuery}
                      onChange={handleInputChange}
                      placeholder="Search..."
                      className="shadow-none border border-gray-300 border-r-0 text-[15px] font-medium text-[#222]"
                    />
                    <InputGroup.Text className="bg-white cursor-pointer">
                      <CloseCircle size="24" color="#222" onClick={handleCloseSearch} />
                    </InputGroup.Text>
                  </InputGroup>

                  {filteredData.length > 0 &&
                    searchQuery !== "" &&
                    showDropDown && (
                      <div className="absolute top-[50px] left-0 z-[1000] bg-white border border-[#d9d9d9] p-2 rounded-lg">
                        <ul
                          className={`bg-white rounded-lg box-border px-2 py-1
    w-[235px] max-h-[174px] overflow-y-auto
    ${filteredData.length > 1 ? "min-h-[100px]" : "min-h-[auto]"}
    ${filteredData.length > 2 ? "overflow-y-auto" : "overflow-y-hidden"}
  `}
                        >
                          {filteredData.map((user, index) => (
                            <li
                              key={index}
                              onClick={() =>
                                handleDropDown(user.Vendor_Name)
                              }
                              onMouseEnter={() => setHoveredIndex(index)}
                              onMouseLeave={() => setHoveredIndex(null)}
                              className={`flex items-center gap-4 p-[10px] text-[14px] font-gilroy font-medium border-b border-[#dcdcdc] cursor-pointer ${hoveredIndex === index
                                ? "bg-[#1E45E1] text-white"
                                : "bg-transparent text-black"
                                }`}
                            >
                              <Image
                                src={
                                  user.Vendor_profile &&
                                    user.Vendor_profile !== "undefined"
                                    ? user.Vendor_profile
                                    : Profile2
                                }
                                className="h-[20px] w-[20px]"
                                roundedCircle
                              />
                              <span>{user.Vendor_Name}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              )}

              <div>
                <button
                  disabled={!canWriteVendor}
                  onClick={handleShow}
                  className="bg-[#1E45E1] hover:bg-[#1E45E1] text-white text-[14px] font-semibold
             rounded-md px-4 py-2.5 w-[146px] whitespace-nowrap font-gilroy
             disabled:opacity-50 disabled:cursor-not-allowed "
                >
                  + Vendor
                </button>

              </div>

            </div>
          </div>
        </div>

        {searchQuery && (
          <div className="container mb-4 mt-5 text-[16px] font-semibold font-gilroy">
            {filteredData.length > 0 ? (
              <span className="text-[rgba(100,100,100,1)]">
                {filteredData.length} result{filteredData.length > 1 ? "s" : ""} found for{" "}
                <span className="text-[rgba(34,34,34,1)]">
                  &quot;{searchQuery}&quot;
                </span>
              </span>
            ) : (
              <span className="text-[rgba(100,100,100,1)]">
                No results found for{" "}
                <span className="text-[rgba(34,34,34,1)]">
                  &quot;{searchQuery}&quot;
                </span>
              </span>
            )}
          </div>
        )}


        {
          !canReadVendor ? (
            <>
              <div className="flex flex-col items-center justify-center">
                <img
                  src={EmptyState}
                  alt="Empty State"
                  className="max-w-full"
                />

                <ErrorMessage message={['You do not have access to view Vendor']} type="warning" />

              </div>
            </>
          ) :

            // <div className="relative overflow-y-auto pr-5 show-scroll h-[calc(100vh-80px)]">
            // <div className="relative h-[calc(100vh-80px)]">
            <div className="relative flex flex-col h-[calc(100vh-80px)]">
             
              {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-75 z-10">
                  <div className="w-[60px] h-[60px] rounded-full border-t-[2px] border-b-[2px] border-r-[2px] border-r-transparent border-[#1E45E1] animate-spin relative flex items-center justify-center">

                    <img
                      src={SmarstayLogo}
                      alt="logo"
                      className="w-[35px] h-[35px] rounded-full absolute animate-spin-reverse"
                    />
                  </div>
                </div>
              )}



              {/* <div className='row row-gap-3 '> */}
              {/* <div className="overflow-y-auto h-full pr-5 row row-gap-3"> */}
              <div className="flex-1 overflow-y-auto pr-5 row row-gap-3">
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
                   <div className="flex flex-col items-center justify-center flex-1 2xl:mt-52">
                    <div clasame="flex justify-center">
                      <img
                        src={EmptyState}
                        alt="Empty state"
                          />
                    </div>
                    <div className="text-center font-gilroy font-semibold text-lg text-[#4B4B4B] pb-1">
                      No vendor available
                    </div>
                    <div className="text-center font-gilroy font-medium text-base text-[#4B4B4B] pb-1">
                      There are no Vendors added.
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
          <Modal.Header className='border-0'>
            <Modal.Title className="w-full text-center !text-[18px] !font-gilroy !font-semibold text-[#222222]">
              Delete Vendor?
            </Modal.Title>

          </Modal.Header>

          <Modal.Body className="text-center !text-[14px] !font-medium !font-gilroy -mt-2">
            Are you sure you want to delete this vendor?
          </Modal.Body>



          <Modal.Footer className="flex justify-center border-0 -mt-2"
          >
            <Button
              onClick={handleCloseForDeleteVendor}
              className="me-2 w-full max-w-[160px] h-[52px] rounded-lg px-5 py-3 bg-white !text-[#1E45E1] !border !border-[#1E45E1] !font-gilroy !font-semibold !text-[14px]"
            >
              Cancel
            </Button>

            <Button
              onClick={ConfirmDeleteVendor}
              className="w-full max-w-[160px] h-[52px] rounded-lg px-5 py-3 !bg-[#1E45E1] text-white !font-gilroy !font-semibold !text-[14px]"
            >
              Delete
            </Button>


          </Modal.Footer>
        </Modal>

      </div>



    </>



  )
}

export default withErrorBoundary(Vendor);