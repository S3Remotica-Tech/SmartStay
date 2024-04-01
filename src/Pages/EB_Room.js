import React from "react";
import Image from 'react-bootstrap/Image';
import Logo from '../Assets/Images/menu.jpeg'


 const EBROOM = () => {

     return(
        <div className="container">
          <div className="d-flex row justify-content-between mt-2 ms-4 me-4 pt-3">
             <div className='col-lg-8 col-md-6 col-sm-12'>
              <h1 style={{ fontSize: "26px" }}>Equally divided by room based</h1>
              <p>Manage your account settings</p>
        </div>

        <div style={{backgroundColor:"#F6F7FB",borderRadius:'10px'}} className="col-5">
        <Image src={Logo} roundedCircle
                    style={{
                        height: 50,
                        width: 50,
                        borderRadius: '50%',
                        border: "1px solid lightgray"
                    }} />

                    <h3>Sky Boys Hostel</h3>
        </div>

        <div>
        <Form.Select
    aria-label="Select floor"
    className='custom-select'
    autoFocus
    style={{
        border: "1px solid lightgray",
        fontSize: 12,
        fontWeight: "530",
        opacity: 1,
        borderRadius: "4px",
        color: "gray"
    }}
>
    <option value="">Select Floor</option>
    <option value="floor1">Floor 1</option>
    <option value="floor2">Floor 2</option>
</Form.Select>


<Form.Select
    aria-label="Select room"
    className='custom-select'
    autoFocus
    style={{
        border: "1px solid lightgray",
        fontSize: 12,
        fontWeight: "530",
        opacity: 1,
        borderRadius: "4px",
        color: "gray"
    }}
>
    <option value="">Select Room</option>
    <option value="floor1">Room 1</option>
    <option value="floor2">Room 2</option>
</Form.Select>
        </div>
        <div>
        <Form.Control
                                    placeholder="123-098"
                                    aria-label="Recipient's username"
                                    className='custom-input'
                                    aria-describedby="basic-addon2"
                                    autoFocus
                                    value={prefix}
                                    onChange={(e) => handlePrefix(e)}
                                    style={{
                                        border: "1px solid lightgray",
                                        fontSize: 12,
                                        fontWeight: "530",
                                        opacity: 1,
                                        borderRadius: "4px",
                                        color: "gray",
                                        '::placeholder': { color: "gray", fontSize: 12 }
                                    }}

                                />

<Form.Control
                                    placeholder="123-098"
                                    aria-label="Recipient's username"
                                    className='custom-input'
                                    aria-describedby="basic-addon2"
                                    autoFocus
                                    value={prefix}
                                    onChange={(e) => handlePrefix(e)}
                                    style={{
                                        border: "1px solid lightgray",
                                        fontSize: 12,
                                        fontWeight: "530",
                                        opacity: 1,
                                        borderRadius: "4px",
                                        color: "gray",
                                        '::placeholder': { color: "gray", fontSize: 12 }
                                    }}

                                />

<button type="button" class="mb-2" style={{ backgroundColor: "#2E75EA", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "white", marginRight: '10px' }}  >Submitt</button>

        </div>


        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
           <h2>EB Detail</h2> 
           <button type="button" class="mb-2" style={{ backgroundColor: "#2E75EA", fontSize: "12px", fontWeight: "700", width: "100px", borderRadius: "5px", padding: "2px", border: "1px Solid #2E75EA", height: "30px", color: "white", marginRight: '10px' }}  >See All</button>

        </div>

        <div class="table-responsive mt-4" style={{ width: "100%" }}>
                <table class="table text-center" >
                    <thead style={{ backgroundColor: "#E6EDF5", color: "#91969E", fontSize: "10px" }}>
                        <tr >
                            <th scope="col">Customer</th>
                            <th scope="col">Room Number</th>
                            <th scope="col">Unit</th>
                            <th scope="col">EB Amount</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr>
                            <td className='text-center' style={{ fontSize: 14 }} >John Bushmill</td>
                            <td className='text-center' style={{ fontSize: 14 }} >G005-B02</td>
                            <td className='text-center' style={{ fontSize: 14 }} >245</td>
                            <td className='text-center' style={{ fontSize: 14 }} >300</td>
                            <td className='text-center' style={{ fontSize: 14 }} >delete</td>
                        </tr>
                    </tbody>
                </table>
            </div>



      </div>
        </div>
     )

 }
 export default EBROOM;