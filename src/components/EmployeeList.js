import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEmployees, deleteEmployee } from '../api.js';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const params = {limit: 5, offset: 5}

  const fetchEmployees = async () => {
    try {
      const response = await getEmployees(params);
      setEmployees(response.data);
      setLoading(false);
      console.log("The response is: ", response?.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Employees List</h1>
      <Link to="/add-employee">Add Employee</Link>
      {employees.data.length === 0 ? (
        <p>No Employees in the system</p>
      ) : (
        <ul>
          {employees?.map((employee) => (
            <li key={employee?.emp_id}>
              {employee?.name} - {employee.emp_id}
              <Link to={`/employee/${employee.emp_id}`}>Details</Link>
              <button onClick={() => handleDelete(employee.emp_id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmployeeList;
