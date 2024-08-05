import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getEmployeeById } from '../api.js';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployeeDetails();
  }, [id]);

  const fetchEmployeeDetails = async () => {
    try {
      const response = await getEmployeeById(id);
      setEmployee(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employee details:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Employee Details</h1>
      {employee ? (
        <div>
          <p>Name: {employee.name}</p>
          <p>Employee ID: {employee.emp_id}</p>
          <p>Address: {employee.address.line1}, {employee.address.city}, {employee.address.country}, {employee.address.zip}</p>
          <p>Contact Methods:</p>
          <ul>
            {employee.contact_methods.map((method, index) => (
              <li key={index}>{method.contact_method}: {method.value}</li>
            ))}
          </ul>
          <Link to="/">Back to List</Link>
        </div>
      ) : (
        <p>Employee not found</p>
      )}
    </div>
  );
};

export default EmployeeDetails;