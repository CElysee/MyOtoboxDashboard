import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../../utils/AxiosInstance";
import RiseLoader from "react-spinners/RiseLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#e55812",
  paddingRight: "10px",
};
function AddNewUser({ userRefresh, user, showModal }) {
  const [countries, setCountries] = useState("");
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#fff");
  const [userValues, setUserValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone_number: "",
    role: "",
    country_id: "",
    password: "",
    gender: "",
    is_active: "",
  });

  const [viewPassword, setViewPassword] = useState(false);
  const dismissButtonRef = useRef();

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

  useEffect(() => {
    if (user) {
      setUserValues((prevUserValues) => ({
        ...prevUserValues,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone_number: user.phone_number || "",
        role: user.role || "",
        country_id: user.country_id || "",
        gender: user.gender || "",
        is_active: user.is_active || "",
      }));
    }
  }, [user]);

  const togglePassword = () => {
    setViewPassword((prevViewPassword) => !prevViewPassword);
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setUserValues((prevUserValues) => ({
      ...prevUserValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log("User Values:", userValues);
    console.log("User Values:", user);
    const update_url = `/auth/update_user/${user.id}`;
    try {
      const response = await axiosInstance.put(update_url, userValues);
      console.log("Response:", response);
      notify(response.data.message, "success");
      setLoading(false);
      userRefresh(true);
      dismissButtonRef.current.click();
    } catch (error) {
      console.error("Error:", error);
      notify(error.response.data.message || "An error occurred", "error");
      setLoading(false);
    }
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
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {showModal && (
              <>
                {" "}
                <div className="modal-header">
                  <h5 className="modal-title" id="editModalLabel">
                    Edit User - {user.firstName} {user.lastName}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <ul
                    className="nav nav-pills arrow-navtabs nav-info bg-light mb-3 custom-tabs"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-bs-toggle="tab"
                        href="#arrow-overview"
                        role="tab"
                      >
                        <span className="d-block d-sm-none">
                          <i className="mdi mdi-home-variant"></i>
                        </span>
                        <span className="d-none d-sm-block">Account Info</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-bs-toggle="tab"
                        href="#arrow-profile"
                        role="tab"
                      >
                        <span className="d-block d-sm-none">
                          <i className="mdi mdi-account"></i>
                        </span>
                        <span className="d-none d-sm-block">Password</span>
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content text-muted">
                    <div
                      className="tab-pane active"
                      id="arrow-overview"
                      role="tabpanel"
                    >
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
                                name="email"
                                value={userValues.email}
                                onChange={handleChange}
                                required
                              />
                            </div>
                          </div>
                          <div className="col-xxl-6">
                            <div>
                              <label
                                htmlFor="phone_number"
                                className="form-label"
                              >
                                Phone Number
                              </label>
                              <input
                                type="number"
                                className="form-control"
                                id="phone_number"
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
                                <option>Male</option>
                                <option>Female</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-xxl-6">
                            <div>
                              <label
                                htmlFor="emailInput"
                                className="form-label"
                              >
                                Role
                              </label>
                              <select
                                className="form-control"
                                name="role"
                                value={userValues.role}
                                onChange={handleChange}
                                required
                              >
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-xxl-6">
                            <div className="mb-3">
                              <label
                                htmlFor="country_id"
                                className="form-label"
                              >
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
                              <label htmlFor="is_active" className="form-label">
                                Is Active
                              </label>
                              <select
                                className="form-control"
                                name="is_active"
                                value={userValues.is_active}
                                onChange={handleChange}
                                required
                              >
                                <option value={true}>Yes</option>
                                <option value={false}>No</option>
                              </select>
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
                              <button
                                type="submit"
                                className="btn btn-info text-dark"
                              >
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
                                  "Update account"
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div
                      className="tab-pane"
                      id="arrow-profile"
                      role="tabpanel"
                    >
                      <form onSubmit={handleSubmit}>
                        <div className="row g-3">
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
                              <button
                                type="submit"
                                className="btn btn-info text-dark"
                              >
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
                                  "Update account"
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddNewUser;
