import React, { useState } from 'react'
import '../Pages/Dashboard.css';
import { FaSearch } from 'react-icons/fa';

function Dashboard() {


    const [activePage, setActivePage] = useState(true)

    return (
        <>
            {activePage &&

                <>
                    <div className="p-3">

                        <div className="d-flex justify-content-between">

                            <div>
                                <h4 className="p-3">Dashboard</h4>
                                <p className="ps-3">Hi, Welcome to Business Dashboard</p>
                            </div>
                            <div className="" style={{ backgroundColor: "#F8F9FA", borderRadius: "50%", height: "30px", width: "30px" }}>
                                <FaSearch className="p-2" style={{ color: "lightgray" }} size={30} />
                            </div>
                        </div>



                    </div>


                </>

            }


        </>
    )
}

export default Dashboard;