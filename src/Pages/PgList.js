import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TotalPgList from './TotalPgList';
import { FaSearch } from 'react-icons/fa';
import Picture from '../Assets/Images/men.jpg'

function PgList() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log('executing useEffect');
    dispatch({ type: 'HOSTELLIST' });
  }, [state.UsersList.hostelList]);

  const filteredHostelList = state.UsersList.hostelList.filter((hostel) =>
    hostel.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div style={{ padding: '20px' }}>
        <div className='d-flex justify-content-between align-items-center'>
          <div>
            <h5>PG List</h5>
          </div>
          <div>
            <div className='input-group' >

              <input
                type='text'
                className='form-control'
                placeholder='Search by hostel name...'
                value={searchTerm}
                style={{ boxShadow: "none", border: "1px solid lightgray", fontSize: 14 }}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className='input-group-text' style={{ borderLeft: "none", backgroundColor: "white", border: "" }}>
                <FaSearch />
              </span>
            </div>
          </div>
        </div>
        <hr className='mb-1 mt-3' />

        <div>
          {filteredHostelList.map((hostel, index) => (
            <div key={hostel.id} className='row g-0 row-gap-2 d-flex align-items-center'>
              <div className='col-lg-2 p-2 mb-0' style={{ fontSize: '12px', color: 'black', fontWeight: '700' }}>

                <div className='d-flex justify-content-center  align-items-center'>
                  <div><img src={Picture} className='img-fluid' style={{ height: 40, width: 40, borderRadius: "100%" }} /></div>

                  <div>      {hostel.Name}   </div>

                </div>
              </div>

              {Array.from(Array(hostel.number_Of_Floor), (_, index) => (
                <div className='col-lg-2 d-flex justify-content-center  align-items-center'>
                  <TotalPgList key={index} floorID={index + 1} hostel_Id={hostel.id} />
                </div>
              ))}

              <div className='col-lg-12'>
                <hr className='m-0 mb-2 p-0' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default PgList;
