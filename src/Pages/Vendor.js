import React, { useState, useEffect } from 'react';
import Notify from '../Assets/Images/New_images/notify.png';
import Profile from '../Assets/Images/New_images/profile.png';
import Filter from '../Assets/Images/New_images/Group 13.png';
import { FaSearch } from 'react-icons/fa';
import { FormControl, InputGroup, Pagination } from 'react-bootstrap';
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import VendorListMap from './VendorListMap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Profile2 from '../Assets/Images/New_images/profile-picture.png'
import Image from 'react-bootstrap/Image';
import Plus from '../Assets/Images/New_images/add-circle.png'
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import imageCompression from 'browser-image-compression';
import AddVendor from './AddVendor';
import Spinner from 'react-bootstrap/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Vendor() {

  const state = useSelector(state => state)
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  

  const [ loader, setLoader] = useState(true)

  console.log("/////////state for VEndor/////////////", state)

  useEffect(() => {
    dispatch({ type: 'VENDORLIST' })
    setLoader(true)
  }, [])

  useEffect(() => {
    if (state.ComplianceList.getVendorStatusCode === 200) {
      setFilteredData(state.ComplianceList.VendorList)
      setLoader(false)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_GET_VENDOR_STATUS_CODE' })
      }, 1000)
    }
  }, [state.ComplianceList.getVendorStatusCode])

  const toastStyle = {
   
    backgroundColor: 'green', 
    color: 'white', 
    width:"100%"
  };

  useEffect(() => {
    if (state.ComplianceList.addVendorSuccessStatusCode === 200 || state.ComplianceList.deleteVendorStatusCode === 200) {
      setShow(false);
     
      setTimeout(() => {
        dispatch({ type: 'VENDORLIST' })
        toast.success('Succsessfully added  a new hostel', {
          position: 'top-center',
          autoClose: 2000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: toastStyle
        });





        console.log("get vendor list executed")
      }, 100)
      setTimeout(() => {
        dispatch({ type: 'CLEAR_ADD_VENDOR_STATUS_CODE' })
      }, 5000)

      setTimeout(()=>{
        dispatch({ type: 'CLEAR_DELETE_VENDOR_STATUS_CODE' })
      },5000)

      
    }


    // setCheck(null)
  }, [state.ComplianceList.addVendorSuccessStatusCode,state.ComplianceList.deleteVendorStatusCode])








  const handleInputChange = (e) => {
    const searchItem = e.target.value
    setQuery(searchItem);
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
  };



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


  const paginate = (pageNumber) =>{
    setCurrentPage(pageNumber);
  } 

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




  const handleEditVendor = (vendorData) => {
    console.log("Edited vendor data:", vendorData);
    setCurrentItem(vendorData)
    setShow(true)
  };


  const handleDeleteVendor = (item) =>{
    console.log("delete item",item)
if(item){
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to delete the Vendor ?',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showCancelButton: true,
  }).then((result) => {
      if (result.isConfirmed) {
          dispatch({
              type: 'DELETEVENDOR',
              payload: {
                  id: item.id,
                  Status: 0
              },
          });
          Swal.fire({
              icon: 'success',
              title: 'Vendor deleted Successfully',
          })
      }
      setCurrentPage(1);
  });

}

  }


  const stateAccount= useSelector(state => state.createAccount)


const [profile, setProfile] = useState(stateAccount.accountList[0]?.user_details.profile)


useEffect(() => {
  if (stateAccount.statusCodeForAccountList == 200) {
    const loginProfile = stateAccount.accountList[0].user_details.profile
      
        setProfile(loginProfile)
      }

}, [stateAccount.statusCodeForAccountList])




useEffect(() => {
  const appearOptions = {
    threshold : 0.5
  };
  const faders = document.querySelectorAll('.fade-in'); 
  const appearOnScro1l = new IntersectionObserver(function(entries,appearOnScrool){
    entries.forEach(entry =>{
      if(!entry.isIntersecting){
        return;
      }
      else{
        entry.target.classList.add('appear');
        appearOnScro1l.unobserve(entry.target);
      }
    })
  }, appearOptions)
  faders.forEach(fader =>{
    appearOnScro1l.observe(fader);
  })
});


  return (

    <div style={{ width: "100%", fontFamily: "Gilroy" }} className=''>

<ToastContainer />



      <div className='m-4'>
        {/* <div className='d-flex justify-content-end align-items-center mb-4'>

          <div>
            <InputGroup>
              <InputGroup.Text style={{ backgroundColor: "#ffffff", borderRight: "none" }}>
                <CiSearch style={{ fontSize: 20 }} />
              </InputGroup.Text>
              <FormControl size="lg" style={{ boxShadow: "none", borderColor: "#DCDCDC", borderLeft: "none", fontSize: 15, fontWeight: 600, '::placeholder': { color: "#4B4B4B", fontWeight: 600 } }}
                placeholder="Search..."
                value={query}
                onChange={handleInputChange}
              />
            </InputGroup>
          </div>
          <div className="mr-3">
            <img src={Notify} alt="notification" />
          </div>

          <div className="mr-3">
            <Image src={profile ? profile : Profile} roundedCircle style={{ height: "60px", width: "60px" }} />
          </div>
        </div> */}

        <div className="d-flex justify-content-between align-items-center ms-3 mb-3">
          <div>
            <label style={{ fontSize: 24, color: "#000000", fontWeight: 600 , fontFamily:"Gilroy"}}>Vendors</label>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            <div className='me-3'>
              <Image src={Filter} roundedCircle style={{ height: "30px", width: "30px" }} />
            </div>

            <div>
              <Button onClick={handleShow} style={{ fontFamily:"Montserrat",fontSize: 16, backgroundColor: "#1E45E1", color: "white", height: 56, fontWeight: 600, borderRadius: 12, width: 151, padding: "18px, 20px, 18px, 20px" }}> + Add Vendor</Button>
            </div>
          </div>
        </div>

        <div className='row row-gap-3'>
          {currentItems && currentItems.map((vendor) => (
            <div key ={vendor.id} className='col-lg-6 col-md-6 col-xs-12 col-sm-12 col-12'>
              <VendorListMap vendor={vendor} onEditVendor={handleEditVendor}  onDeleteVendor={handleDeleteVendor} />
                         </div>
          ))
          }

          {!loader && currentItems.length == 0 &&

<div className='d-flex align-items-center justify-content-center fade-in' style={{ width: "100%", height: 350, margin: "0px auto" }}>

<div>

  <div className="pb-1" style={{ textAlign: "center", fontWeight: 600, fontFamily: "Gilroy", fontSize: 24, color: "rgba(75, 75, 75, 1)" }}>No vendor available</div>
  <div className="pb-1" style={{ textAlign: "center", fontWeight: 500, fontFamily: "Gilroy", fontSize: 20, color: "rgba(75, 75, 75, 1)" }}>There are currently no vendors available</div>
 
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
<div className='mt-2 mb-2 d-flex justify-content-center w-100'>
      
    
        
        <div className="d-flex justify-content-center align-items-start gap-3" style={{height:"100%"}}><Spinner animation="grow" style={{color:"rgb(30, 69, 225)"}} /> <div style={{color:"rgb(30, 69, 225)", fontWeight:600}}>Loading.....</div></div> 

      
      </div>
}





        </div>
        {
          currentItems.length > 0 &&   <Pagination className="mt-4 d-flex justify-content-end align-items-center">
          <Pagination.Prev style={{ visibility:"visible"}}
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          />
         {/* <span style={{fontSize:8, color:"#1E45E1"}}>Previous</span> */}
          {renderPagination()}
          {/* <span style={{fontSize:8, color:"#1E45E1"}}>Next</span> */}
          <Pagination.Next style={{ visibility:"visible"}}
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
        }
      
      </div>

      {show &&
      <AddVendor   show={show} handleClose={handleClose} currentItem={currentItem}/>
      }





    </div>


  )
}

export default Vendor;