import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEmployee } from '../api.js';
import { Link } from 'react-router-dom';
const AddEmployee = () => {
  const navigate  = useNavigate();
  const [name, setName] = useState('');
  const [address, setAddress] = useState({
    line1: '',
    city: '',
    country: '',
    zip: '',
  });
  const [contactMethods, setContactMethods] = useState([{ contact_method: '', value: '' }]);
  const [successMessage, setSuccessMessage] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEmployee = { name, address, contact_methods: contactMethods };

    try {
      await createEmployee(newEmployee);
      setSuccessMessage('Employee added successfully');
      setTimeout(() => {
        navigate('/');
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Error creating employee:", error);
      setErrorMessage('Failed to add employee. Please try again.'); 
    }
  };
  const handleContactMethodChange = (index, key, value) => {
    const updatedMethods = [...contactMethods];
    updatedMethods[index][key] = value;
    setContactMethods(updatedMethods);
  };

  return (
    <div>
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label>Address Line 1:</label>
          <input type="text" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} required />
        </div>
        <div>
          <label>City:</label>
          <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} required />
        </div>
        <div>
          <label>Country:</label>
          <input type="text" value={address.country} onChange={(e) => setAddress({ ...address, country: e.target.value })} required />
        </div>
        <div>
          <label>Zip Code:</label>
          <input type="text" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} required />
        </div>
        {contactMethods.map((method, index) => (
          <div key={index}>
            <label>Contact Method:</label>
            <select value={method.contact_method} onChange={(e) => handleContactMethodChange(index, 'contact_method', e.target.value)} required>
              <option value="">Select</option>
              <option value="EMAIL">Email</option>
              <option value="PHONE">Phone</option>
            </select>
            <input type="text" value={method.value} onChange={(e) => handleContactMethodChange(index, 'value', e.target.value)} required />
          </div>
        ))}
        <button type="button" onClick={() => setContactMethods([...contactMethods, { contact_method: '', value: '' }])}>
          Add Another Contact Method
        </button>
        <button type="submit">Add Employee</button>
      </form>
      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <Link to="/">Back to List</Link>
    </div>
  );
};

export default AddEmployee;