import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserRegistrationForm = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform further actions here, such as sending the data to an API
  };

  const navigate = useNavigate();

  // const [loggedIn, setLoggedIn] = useState(true);
  // useEffect(() => {
  //   if (!loggedIn) auth.logout();
  // }, [loggedIn]);

  return (
    <div>
      <h2>User Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          onClick={() => {
            console.log("formData:", formData);
          }}
          type="submit"
        >
          Submit
        </button>
        <button
          onClick={() => {
            navigate("/logout");
          }}
          type="logout"
        >
          Logout
        </button>
      </form>
    </div>
  );
};

export default UserRegistrationForm;
