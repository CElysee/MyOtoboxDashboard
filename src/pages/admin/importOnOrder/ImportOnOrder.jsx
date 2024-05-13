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
import axiosInstance from "../../../utils/axiosInstance";
import { formatAmount, formatNumber } from "../../../utils/helpers";
import Greetings from "../../../components/greetings/Greetings";
import ContentLoader from "react-content-loader";
import ImportOnOrderUpdate from "./ImportOnOrderUpdate";

function ImportOnOrder() {
  const importOnOrderRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [importOnOrder, setImportOnOrder] = useState([]); // Add this line
  const [countBookings, setCountBookings] = useState(0); // Add this line
  const [userRefresh, setUserRefresh] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [orderNote, setOrderNote] = useState("");
  const handleOrderNote = (note) => {
    setOrderNote(note);
  };
  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const booked_test_drive = await axiosInstance.get(
          "/import-on-order/list"
        );
        setImportOnOrder(booked_test_drive.data.orders);
        setCountBookings(booked_test_drive.data.count_orders);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDashboardStats();
  }, [userRefresh]);
  useEffect(() => {
    const table = $(importOnOrderRef.current).DataTable({
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
  const handleUpdates = (order) => {
    setSelectedOrder(order);
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
                              data-target={countBookings.count_pending_orders}
                            >
                              {formatNumber(countBookings.count_pending_orders)}
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
                              data-target={countBookings.count_approved_orders}
                            >
                              {formatNumber(
                                countBookings.count_approved_orders
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
                              data-target={countBookings.count_canceled_orders}
                            >
                              {formatNumber(
                                countBookings.count_canceled_orders
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
                              data-target={countBookings.count_completed_orders}
                            >
                              {formatNumber(
                                countBookings.count_completed_orders
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
                        Pending Import On Orders
                      </h5>
                    </div>
                    <div className="card-body">
                      <table
                        ref={importOnOrderRef}
                        id="scroll-horizontal"
                        className="table nowrap align-middle"
                        style={{ width: "100%" }}
                      >
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>User</th>
                            <th>Car</th>
                            <th>Budget</th>
                            <th>Fuel Type</th>
                            <th>Transmission</th>
                            <th>Year</th>
                            <th>Kilometers</th>
                            <th>Color</th>
                            <th>Note</th>
                            <th>Order Status</th>
                            <th>Create Date</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {importOnOrder.length > 0 &&
                            importOnOrder.map((order, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  {order.user.firstName} {order.user.lastName}
                                </td>
                                <td>
                                  {order.car_brand.name} -
                                  {order.car_model.brand_model_name} -{" "}
                                  {order.car_trim.trim_name}
                                </td>
                                <td>#{order.price_range}</td>
                                <td>{order.fuel_type}</td>
                                <td>{order.transmission_type}</td>
                                <td>
                                  {order.manufacture_year_from} -{" "}
                                  {order.manufacture_year_to}{" "}
                                </td>
                                <td>
                                  {order.kilometers_from} -{" "}
                                  {order.kilometers_to}{" "}
                                </td>
                                <td>{order.car_color}</td>
                                <td>
                                  <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop"
                                    onClick={() =>
                                      handleOrderNote(order.order_note)
                                    }
                                  >
                                    View Note
                                  </button>
                                </td>
                                <td>{order.order_status}</td>
                                <td>{order.created_at}</td>
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
                                          data-bs-target="#importOnOrderUpdate"
                                          onClick={() => handleUpdates(order)}
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
                      <ImportOnOrderUpdate
                        userRefresh={setUserRefresh}
                        showModal={showModal}
                        order={selectedOrder}
                      />

                      <div
                        className="modal fade"
                        id="staticBackdrop"
                        data-bs-backdrop="static"
                        data-bs-keyboard="false"
                        tabIndex="-1"
                        role="dialog"
                        aria-labelledby="staticBackdropLabel"
                        aria-hidden="true"
                      >
                        <div
                          className="modal-dialog modal-dialog-centered"
                          role="document"
                        >
                          <div className="modal-content">
                            <div className="modal-body text-center p-5">
                              <lord-icon
                                src="https://cdn.lordicon.com/lupuorrc.json"
                                trigger="loop"
                                colors="primary:#121331,secondary:#08a88a"
                                style={{ width: "120px", height: "120px" }}
                              ></lord-icon>

                              <div className="mt-4">
                                <h4 className="mb-3">Order Note</h4>
                                <p className="text-muted mb-4">
                                  {orderNote === "" ? (
                                    "No note"
                                  ) : (
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: orderNote,
                                      }}
                                    />
                                  )}
                                </p>
                                <div className="hstack gap-2 justify-content-center">
                                  <a
                                    className="btn btn-link link-success fw-medium"
                                    data-bs-dismiss="modal"
                                  >
                                    <i className="ri-close-line me-1 align-middle"></i>{" "}
                                    Close
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
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

export default ImportOnOrder;
