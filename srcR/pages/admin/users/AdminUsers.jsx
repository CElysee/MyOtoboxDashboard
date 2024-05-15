import React, { useEffect, useRef, useState } from "react";
import TopMenu from "../TopMenu";
import SideMenu from "../SideMenu";
import $ from "jquery"; // Import jQuery
import "datatables.net"; // Import DataTables library
import "datatables.net-bs5"; // Import DataTables Bootstrap 5 integration
import "datatables.net-bs5/css/dataTables.bootstrap5.min.css"; // Import DataTables Bootstrap 5 CSS
import AddNewUser from "../modals/AddNewUser";
import EditAdminUser from "../modals/EditAdminUser";
import axiosInstance from "../../../utils/AxiosInstance";
import RiseLoader from "react-spinners/RiseLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import Greetings from "../../../components/greetings/Greetings";

function AdminUsers() {
  const tableRef = useRef(null);
  const [userCounts, setUserCounts] = useState("");
  const [allAdminUsers, setAllAdminUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userRefresh, setUserRefresh] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
    //fetch all admin users count
    const fetchAllAdminUsers = async () => {
      try {
        const allUsers = await axiosInstance.get("/auth/all_admin_users");
        setUserCounts(allUsers.data.counts);
        setAllAdminUsers(allUsers.data.users);
        setIsLoading(false); // Data fetching completed
        setUserRefresh(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false); // Data fetching completed
      }
    };
    fetchAllAdminUsers();
  }, [userRefresh]);

  useEffect(() => {
    const table = $(!isLoading && tableRef.current).DataTable({
      dom: "lBfrtip", // 'l' for length menu (entries per page dropdown)
      scrollX: true,
      buttons: [
        "excelHtml5", // Excel export button
        "csvHtml5", // CSV export button
        // 'pdfHtml5', // PDF export button
        // 'print', // Print button
      ],
      lengthMenu: [10, 25, 50, 100], // Entries per page options
      pageLength: 10, // Initial entries per page
      // Other DataTables configurations
    });
    return () => {
      table.destroy(); // Clean up DataTable when component unmounts
    };
  }, [isLoading]);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleUserDelete = async (userId) => {
    try {
      await axiosInstance.delete(`/auth/delete_user/${userId}`);
      setUserRefresh(true);
      notify("User deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting user: ", error);
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
  const greeting = useSelector((state) => state.greeting);
  return (
    <div id="layout-wrapper">
      <TopMenu />
      <SideMenu />
      <ToastContainer autoClose={4000} />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <Greetings />
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
                          <th>Last Login</th>
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
                              <td>{user.last_login}</td>
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
                                      <button
                                        type="button"
                                        data-bs-toggle="modal"
                                        data-bs-target="#editModal"
                                        className="dropdown-item edit-item-btn"
                                        onClick={() => handleEditUser(user)}
                                      >
                                        <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                        Edit
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="dropdown-item remove-item-btn"
                                        type="button"
                                        onClick={() =>
                                          handleUserDelete(user.id)
                                        }
                                      >
                                        <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                        Delete
                                      </button>
                                    </li>
                                  </ul>
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    {}
                    <EditAdminUser
                      user={selectedUser}
                      showModal={showModal}
                      userRefresh={setUserRefresh}
                    />
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
