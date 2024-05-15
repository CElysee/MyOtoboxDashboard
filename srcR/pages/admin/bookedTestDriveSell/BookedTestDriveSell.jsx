import React, { useEffect, useRef, useState } from "react";
import TopMenu from "../TopMenu";
import SideMenu from "../SideMenu";
import $ from "jquery"; // Import jQuery
import "datatables.net"; // Import DataTables library
import "datatables.net-bs5"; // Import DataTables Bootstrap 5 integration
import "datatables.net-buttons"; // Import DataTables Buttons
import "datatables.net-buttons-bs5"; // Import DataTables Buttons Bootstrap 5 integration
import "datatables.net-buttons/js/buttons.html5.min"; // HTML5 export button
import "datatables.net-buttons/js/buttons.print.min"; // Print button
import "datatables.net-buttons/js/buttons.colVis.min"; // Column visibility button
import "jszip/dist/jszip"; // JSZip for Excel export
import "datatables.net-buttons/js/buttons.flash.min"; // Flash export (optional)
import "datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css"; // Buttons Bootstrap 5 CSS
import axiosInstance from "../../../utils/AxiosInstance";
import { formatAmount, formatNumber } from "../../../utils/Helpers";
import Greetings from "../../../components/greetings/Greetings";
import ContentLoader from "react-content-loader";
import BookedTestDriveSellUpdate from "./BookedTestDriveSellUpdate";

function BookedTestDriveSell() {
  const tableRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bookedTestDrive, setBookedTestDrive] = useState([]); // Add this line
  const [countBookings, setCountBookings] = useState(0); // Add this line
  const [userRefresh, setUserRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState({});
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const booked_test_drive = await axiosInstance.get(
          "/book-a-test-drive/list"
        );
        setBookedTestDrive(booked_test_drive.data.booked_test_drive);
        setCountBookings(booked_test_drive.data.count_bookings);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDashboardStats();
  }, [userRefresh]);
  useEffect(() => {
    const table = $(tableRef.current).DataTable({
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
  const handleUpdates = (brand) => {
    setSelectedBooking(brand);
    setShowModal(true);
  };
  return (
    <div id="layout-wrapper">
      <TopMenu />
      <SideMenu />
      <div className="main-content">
        <div className="page-content">
          {isLoading ? (
            <div>
              <ContentLoader
                style={{ width: "50%", height: "500px", padding: "10px" }}
                speed={1}
                backgroundColor="#eee"
                foregroundColor="#e8e7e7"
              >
                <rect x="2" y="4" rx="8" ry="8" width="70" height="20" />
                <rect x="100" y="4" rx="8" ry="8" width="60" height="20" />
                <rect x="0" y="40" rx="5" ry="5" width="650" height="415" />
              </ContentLoader>
              <ContentLoader
                style={{ width: "50%", height: "500px", padding: "10px" }}
                speed={1}
                backgroundColor="#eee"
                foregroundColor="#e8e7e7"
              >
                <rect x="2" y="4" rx="8" ry="8" width="70" height="20" />
                <rect x="100" y="4" rx="8" ry="8" width="60" height="20" />
                <rect x="0" y="40" rx="5" ry="5" width="650" height="415" />
              </ContentLoader>
            </div>
          ) : (
            <div className="container-fluid">
              <Greetings />
              <div className="row">
                <div className="col-xl-3 col-md-3">
                  <div className="card card-animate">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1 overflow-hidden">
                          <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                            {" "}
                            Pending Booked Test Drive
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <h5 className="text-success fs-14 mb-0">
                            <i className="ri-arrow-right-up-line fs-13 align-middle"></i>{" "}
                            +16.24 %
                          </h5>
                        </div>
                      </div>
                      <div className="d-flex align-items-end justify-content-between mt-4">
                        <div>
                          <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                            <span
                              className="counter-value"
                              data-target={
                                countBookings.count_pending_booked_test_drive
                              }
                            >
                              {formatNumber(
                                countBookings.count_pending_booked_test_drive
                              )}
                            </span>
                          </h4>
                        </div>
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-primary-subtle rounded fs-3">
                            <i className="bx bx-dollar-circle text-primary"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-3">
                  <div className="card card-animate">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1 overflow-hidden">
                          <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                            Approved Booked Test Drive
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <h5 className="text-danger fs-14 mb-0">
                            <i className="ri-arrow-right-down-line fs-13 align-middle"></i>{" "}
                            -3.57 %
                          </h5>
                        </div>
                      </div>
                      <div className="d-flex align-items-end justify-content-between mt-4">
                        <div>
                          <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                            <span
                              className="counter-value"
                              data-target={
                                countBookings.count_approved_booked_test_drive
                              }
                            >
                              {formatNumber(
                                countBookings.count_approved_booked_test_drive
                              )}
                            </span>
                          </h4>
                        </div>
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-info-subtle rounded fs-3">
                            <i className="bx bx-shopping-bag text-info"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-xl-3 col-md-3">
                  <div className="card card-animate">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1 overflow-hidden">
                          <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                            Canceled Booked Test Drive
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <h5 className="text-success fs-14 mb-0">
                            <i className="ri-arrow-right-up-line fs-13 align-middle"></i>{" "}
                            +29.08 %
                          </h5>
                        </div>
                      </div>
                      <div className="d-flex align-items-end justify-content-between mt-4">
                        <div>
                          <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                            <span
                              className="counter-value"
                              data-target={
                                countBookings.count_canceled_booked_test_drive
                              }
                            >
                              {formatNumber(
                                countBookings.count_canceled_booked_test_drive
                              )}
                            </span>
                          </h4>
                        </div>
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-primary-subtle rounded fs-3">
                            <i className="bx bx-user-circle text-primary"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xl-3 col-md-3">
                  <div className="card card-animate">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="flex-grow-1 overflow-hidden">
                          <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                            Completed Booked Test Drive
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <h5 className="text-success fs-14 mb-0">
                            <i className="ri-arrow-right-up-line fs-13 align-middle"></i>{" "}
                            +29.08 %
                          </h5>
                        </div>
                      </div>
                      <div className="d-flex align-items-end justify-content-between mt-4">
                        <div>
                          <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                            <span
                              className="counter-value"
                              data-target={
                                countBookings.count_completed_booked_test_drive
                              }
                            >
                              {formatNumber(
                                countBookings.count_completed_booked_test_drive
                              )}
                            </span>
                          </h4>
                        </div>
                        <div className="avatar-sm flex-shrink-0">
                          <span className="avatar-title bg-primary-subtle rounded fs-3">
                            <i className="bx bx-user-circle text-primary"></i>
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
                      <h5 className="card-title mb-0">
                        Pending Booked Test Drive
                      </h5>
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
                            <th>No</th>
                            <th>User</th>
                            <th>Car</th>
                            <th>Stock Number</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Phone Number</th>
                            <th>Location</th>
                            <th>Booking Status</th>
                            <th>Create Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookedTestDrive.length > 0 &&
                            bookedTestDrive.map((testDrive, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  {testDrive.user.firstName}{" "}
                                  {testDrive.user.lastName}
                                </td>
                                <td>
                                  {testDrive.car_for_sale.car_year}{" "}
                                  {testDrive.car_for_sale.car_name_info}
                                </td>
                                <td>#{testDrive.car_for_sale.stock_number}</td>
                                <td>{testDrive.date}</td>
                                <td>{testDrive.time}</td>
                                <td>{testDrive.phone_number}</td>
                                <td>{testDrive.location_choice}</td>
                                <td>{testDrive.booking_status}</td>
                                <td>{testDrive.created_at}</td>
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
                                          className="dropdown-item edit-item-btn"
                                          type="button"
                                          data-bs-toggle="modal"
                                          data-bs-target="#updateBookingModal"
                                          onClick={() =>
                                            handleUpdates(testDrive)
                                          }
                                        >
                                          <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                          Edit
                                        </button>
                                      </li>
                                      <li>
                                        <button className="dropdown-item remove-item-btn">
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
                      <BookedTestDriveSellUpdate
                        userRefresh={setUserRefresh}
                        showModal={showModal}
                        booking={selectedBooking}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BookedTestDriveSell;
