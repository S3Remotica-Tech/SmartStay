
import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

function Reports () {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (e.target.checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter(option => option !== value));
    }
  };

  return (
    <>
    <div>
     
      <DropdownButton title="Select Options" id="dropdown-menu-align-right">
        <div style={{ padding: '10px' }}>
          {options.map((option) => (
            <Form.Check
              type="checkbox"
              label={option}
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={handleCheckboxChange}
              key={option}
            />
          ))}
        </div>
      </DropdownButton>
      
    </div>


<div>
        <h2>Selected Options:</h2>
        <ul style={{color:"black"}}>
          {selectedOptions.map(option => (
            <li key={option}>{option}</li>
          ))}
        </ul>
      </div>


      </>
  );
}


export default Reports