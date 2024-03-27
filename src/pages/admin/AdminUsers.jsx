import React, { useEffect, useRef, useState } from "react";
import TopMenu from "./TopMenu";
import SideMenu from "./SideMenu";
import $ from "jquery"; // Import jQuery
import "datatables.net"; // Import DataTables library
import "datatables.net-bs5"; // Import DataTables Bootstrap 5 integration
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css"; // Import DataTables Bootstrap 5 CSS
import AddNewUser from "./modals/AddNewUser";
import axiosInstance from "../../utils/axiosInstance";

function AdminUsers() {
  const tableRef = useRef(null);
  const [userCounts, setUserCounts] = useState("");
  const [allAdminUsers, setAllAdminUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRefresh, setUserRefresh] = useState(false);
  useEffect(() => {
    //fetch all admin users count
    const fetchAllAdminUsers = async () => {
      try {
        const response = await axiosInstance.get("/auth/user_count");
        const allUsers = await axiosInstance.get("/auth/all_admin_users");
        setUserCounts(response.data);
        setAllAdminUsers(allUsers.data);
        setIsLoading(false); // Data fetching completed
        dismissButtonRef.current.click();
      } catch (error) {
        console.error(error);
        setIsLoading(false); // Data fetching completed
      }
    };
    fetchAllAdminUsers();
  }, [userRefresh]);
  useEffect(() => {
    if (!isLoading && tableRef.current) {
      // Initialize DataTable only when data fetching is completed and tableRef is available
      $(tableRef.current).DataTable();
    }
  }, [isLoading]);
  return (
    <div id="layout-wrapper">
      <TopMenu />
      <SideMenu />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row mb-3 pb-1">
              <div className="col-12">
                <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                  <div className="flex-grow-1">
                    <h4 className="fs-16 mb-1">Good Morning, Anna!</h4>
                    <p className="text-muted mb-0">
                      Here's what's happening with your store today.
                    </p>
                  </div>
                  <div className="mt-3 mt-lg-0">
                    <div className="row g-3 mb-0 align-items-center">
                      <div className="col-auto">
                        <button
                          className="btn btn-soft-info"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalgrid"
                        >
                          <i className="ri-add-circle-line align-middle me-1"></i>{" "}
                          Add new user
                        </button>
                        <AddNewUser userRefresh={setUserRefresh} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-4 col-md-6">
                <div className="card card-animate">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1 overflow-hidden">
                        <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                          {" "}
                          New users
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <h5 className="text-danger fs-14 mb-0">
                          <i className="ri-arrow-right-up-line fs-13 align-middle"></i>{" "}
                          +16.24 %
                        </h5>
                      </div>
                    </div>
                    <div className="d-flex align-items-end justify-content-between mt-4">
                      <div>
                        <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                          <span className="counter-value" data-target="559.25">
                            {userCounts.recently_registered}
                          </span>
                        </h4>
                      </div>
                      <div className="avatar-sm flex-shrink-0">
                        <span className="avatar-title bg-info rounded fs-3">
                          <i className="bx bx-user-plus text-dark"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-md-6">
                <div className="card card-animate">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1 overflow-hidden">
                        <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                          Active Users
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <h5 className="text-danger fs-14 mb-0">
                          <i className="bx bx-user-check fs-13 align-middle"></i>{" "}
                          -3.57 %
                        </h5>
                      </div>
                    </div>
                    <div className="d-flex align-items-end justify-content-between mt-4">
                      <div>
                        <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                          <span className="counter-value" data-target="36894">
                            {userCounts.active_users}
                          </span>
                        </h4>
                      </div>
                      <div className="avatar-sm flex-shrink-0">
                        <span className="avatar-title bg-info rounded fs-3">
                          <i className="bx bx-user-check text-dark"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-xl-4 col-md-6">
                <div className="card card-animate">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1 overflow-hidden">
                        <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                          All Users
                        </p>
                      </div>
                      <div className="flex-shrink-0">
                        <h5 className="text-danger fs-14 mb-0">
                          <i className="ri-arrow-right-up-line fs-13 align-middle"></i>{" "}
                          +29.08 %
                        </h5>
                      </div>
                    </div>
                    <div className="d-flex align-items-end justify-content-between mt-4">
                      <div>
                        <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                          <span className="counter-value" data-target="183.35">
                            {userCounts.user_count}
                          </span>
                        </h4>
                      </div>
                      <div className="avatar-sm flex-shrink-0">
                        <span className="avatar-title bg-info rounded fs-3">
                          <i className="bx bx-user-circle text-dark"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-12">
                <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">All admin users</h5>
                  </div>
                  <div className="card-body">
                    <table
                      ref={tableRef}
                      id="scroll-horizontal"
                      className="table nowrap align-middle"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Names</th>
                          <th>Email</th>
                          <th>Phone Number</th>
                          <th>Gender</th>
                          <th>Role</th>
                          <th>Status</th>
                          <th>Create Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allAdminUsers.length > 0 &&
                          allAdminUsers.map((user, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                {user.firstName} {user.lastName}
                              </td>
                              <td>{user.email}</td>
                              <td>{user.phone_number}</td>
                              <td>{user.gender}</td>
                              <td>{user.role}</td>
                              <td>
                                <span className="badge bg-info text-dark">
                                  {user.account_status == true
                                    ? "Active"
                                    : "Inactive"}
                                </span>
                              </td>
                              <td>{user.created_at}</td>
                              <td>
                                <div className="dropdown d-inline-block">
                                  <button
                                    className="btn btn-soft-secondary btn-sm dropdown"
                                    type="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                  >
                                    <i className="ri-more-fill align-middle"></i>
                                  </button>
                                  <ul className="dropdown-menu dropdown-menu-end">
                                    <li>
                                      <a className="dropdown-item edit-item-btn">
                                        <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                        Edit
                                      </a>
                                    </li>
                                    <li>
                                      <a className="dropdown-item remove-item-btn">
                                        <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                        Delete
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminUsers;
