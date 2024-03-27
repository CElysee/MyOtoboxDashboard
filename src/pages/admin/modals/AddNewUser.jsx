import React, { useState } from "react";

function AddNewUser() {
  const [viewPassword, setViewPassword] = useState(false);
  const togglePassword = () => {
    setViewPassword(!viewPassword);
  };

  return (
    <>
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
              <form action="javascript:void(0);">
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
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <label htmlFor="genderInput" className="form-label">
                      Gender
                    </label>
                    <div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio1"
                          value="option1"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio1"
                        >
                          Male
                        </label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="inlineRadioOptions"
                          id="inlineRadio2"
                          value="option2"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="inlineRadio2"
                        >
                          Female
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="col-xxl-6">
                    <div>
                      <label htmlFor="emailInput" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="emailInput"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div className="col-xxl-6">
                    <div>
                      <label htmlFor="emailInput" className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="emailInput"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>
                  <div className="col-xxl-6">
                    <div>
                      <label htmlFor="emailInput" className="form-label">
                        Role
                      </label>
                      <select className="form-control">
                        <option>Select role</option>
                        <option>Admin</option>
                        <option>user</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xxl-6">
                    <div className="mb-3">
                      <label
                        htmlFor="choices-single-no-sorting"
                        className="form-label"
                      >
                        Country
                      </label>
                      <select className="form-control">
                        <option>Select country</option>
                        <option>Rwanda</option>
                        <option>Burundi</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xxl-6">
                    <div>
                      <label htmlFor="passwordInput" className="form-label">
                        Password
                      </label>
                      <div className="position-relative auth-pass-inputgroup mb-3">
                        <input
                          type={viewPassword ? "text" : "password"}
                          className="form-control pe-5 password-input"
                          placeholder="Enter password"
                          id="password-input"
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
                        type="button"
                        className="btn btn-dark"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="submit" className="btn btn-info text-dark">
                        Submit
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
