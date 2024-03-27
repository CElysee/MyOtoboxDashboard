import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import RiseLoader from "react-spinners/RiseLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#e55812",
  paddingRight: "10px",
};
function AddNewUser({ userRefresh }) {
  const [countries, setCountries] = useState("");
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#fff");
  const dismissButtonRef = useRef();
  const [userValues, setUserValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
    role: "",
    country_id: "",
    password: "",
    gender: "",
  });
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axiosInstance.get("/country/list");
        setCountries(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountries();
  }, []);
  const [viewPassword, setViewPassword] = useState(false);
  const togglePassword = () => {
    setViewPassword(!viewPassword);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserValues({ ...userValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(userValues);
    const params = {
      firstName: "John", // Replace 'John' with the actual first name
      lastName: "Doe", // Include other fields as needed
      gender: "Male",
      email: "johndoe@example.com",
      password: "securepassword",
      role: "admin",
      phone_number: "1234567890",
      country_id: "1",
      // Add other fields as needed
    };
    const customConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const postData = async () => {
      console.log("Request Payload:", JSON.stringify(userValues)); // Log the request payload before sending
      try {
        const response = await axiosInstance.post("/auth/create_admin", userValues, customConfig);
        console.log("Response:", response.data);
        notify(response.data.message, "success");
        setLoading(false);
        userRefresh(true);
        dismissButtonRef.current.click();
      } catch (error) {
        console.error("Error:", error);
        notify(error.data.message, "error");
      }
    };
    postData();
  };
  const notify = (message, type) => {
    if (type === "success") {
      toast.success(message, {
        icon: "👏",
      });
    } else if (type === "error") {
      toast.error(message, {
        icon: "😬",
      });
    }
  };
  return (
    <>
    <ToastContainer autoClose={false} />
      <div
        className="modal fade fadeInRight"
        id="exampleModalgrid"
        tabIndex="-1"
        aria-labelledby="exampleModalgridLabel"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalgridLabel">
                Add New User
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-xxl-6">
                    <div>
                      <label htmlFor="firstName" className="form-label">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="Enter firstname"
                        name="firstName"
                        value={userValues.firstName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xxl-6">
                    <div>
                      <label htmlFor="lastName" className="form-label">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="lastName"
                        placeholder="Enter lastname"
                        name="lastName"
                        value={userValues.lastName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xxl-6">
                    <div>
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Enter your email"
                        name="email"
                        value={userValues.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xxl-6">
                    <div>
                      <label htmlFor="phone_number" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="phone_number"
                        placeholder="0782384772"
                        name="phone_number"
                        value={userValues.phone_number}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xxl-6">
                    <div>
                      <label htmlFor="gender" className="form-label">
                        Gender
                      </label>
                      <select
                        className="form-control"
                        id="gender"
                        name="gender"
                        value={userValues.gender}
                        onChange={handleChange}
                        required
                      >
                        <option>Select gender</option>
                        <option>Male</option>
                        <option>Female</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xxl-6">
                    <div>
                      <label htmlFor="emailInput" className="form-label">
                        Role
                      </label>
                      <select
                        className="form-control"
                        name="role"
                        value={userValues.role}
                        onChange={handleChange}
                        required
                      >
                        <option>Select role</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xxl-6">
                    <div className="mb-3">
                      <label htmlFor="country_id" className="form-label">
                        Country
                      </label>
                      <select
                        className="form-control"
                        name="country_id"
                        value={userValues.country_id}
                        onChange={handleChange}
                        required
                      >
                        <option>Select country</option>
                        {countries &&
                          countries.map((country, index) => (
                            <option key={index} value={country.id}>
                              {country.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-xxl-6">
                    <div>
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <div className="position-relative auth-pass-inputgroup mb-3">
                        <input
                          type={viewPassword ? "text" : "password"}
                          className="form-control pe-5 password-input"
                          placeholder="Enter password"
                          id="password"
                          name="password"
                          value={userValues.password}
                          onChange={handleChange}
                          required
                        />
                        <button
                          className="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                          type="button"
                          id="password-addon"
                          onClick={togglePassword}
                        >
                          <i className="ri-eye-fill align-middle"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <div className="hstack gap-2 justify-content-end">
                      <button
                      ref={dismissButtonRef}
                        type="button"
                        className="btn btn-dark"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn-info text-dark">
                        {loading ? (
                          <RiseLoader
                            color={color}
                            loading={loading}
                            cssOverride={override}
                            size={10}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                          />
                        ) : (
                          "Create account"
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNewUser;
