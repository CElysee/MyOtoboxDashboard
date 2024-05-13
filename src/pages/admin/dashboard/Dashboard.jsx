import React, { useEffect, useState, useRef } from "react";
import TopMenu from "../TopMenu";
import SideMenu from "../SideMenu";
import { useSelector } from "react-redux";
import axiosInstance from "../../../utils/axiosInstance";
import { formatAmount, formatNumber } from "../../../utils/helpers";
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
import Greetings from "../../../components/greetings/Greetings";
import ContentLoader from "react-content-loader";
import DashboardStats from "./DashboardStats";
import Revenues from "./Revenues";
import BookedTestDrive from "./BookedTestDrive";
import ImportOnOrder from "./ImportOnOrder";
import Footer from "../../../components/footer/Footer";

function Dashboard() {
  const greeting = useSelector((state) => state.greeting);
  const [dashboardStats, setDashboardStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookedTestDrive, setBookedTestDrive] = useState([]); // Add this line
  const [importOnOrder, setImportOnOrder] = useState([]); // Add this line
  const tableRef = useRef(null);
  const importOnOrderRef = useRef(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await axiosInstance.get(
          "/dashboard-stats/get-vehicle-count"
        );
        const booked_test_drive = await axiosInstance.get(
          "/dashboard-stats/get-vehicle-count"
        );
        setDashboardStats(response.data);
        setBookedTestDrive(booked_test_drive.data.pending_booked_test_drive);
        setImportOnOrder(booked_test_drive.data.pending_import_orders);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDashboardStats();
  }, []);
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
  useEffect(() => {
    const tableImportOnOrders = $(!isLoading && importOnOrderRef.current).DataTable({
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
      tableImportOnOrders.destroy(); // Clean up DataTable when component unmounts
    };
  }, [isLoading]);
  return (
    <div id="layout-wrapper">
      <TopMenu />
      <SideMenu />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                {isLoading ? (
                  <div>
                    <ContentLoader
                      style={{ width: "50%", height: "500px", padding: "10px" }}
                      speed={1}
                      backgroundColor="#eee"
                      foregroundColor="#e8e7e7"
                    >
                      <rect x="2" y="4" rx="8" ry="8" width="70" height="20" />
                      <rect
                        x="100"
                        y="4"
                        rx="8"
                        ry="8"
                        width="60"
                        height="20"
                      />
                      <rect
                        x="0"
                        y="40"
                        rx="5"
                        ry="5"
                        width="650"
                        height="415"
                      />
                    </ContentLoader>
                    <ContentLoader
                      style={{ width: "50%", height: "500px", padding: "10px" }}
                      speed={1}
                      backgroundColor="#eee"
                      foregroundColor="#e8e7e7"
                    >
                      <rect x="2" y="4" rx="8" ry="8" width="70" height="20" />
                      <rect
                        x="100"
                        y="4"
                        rx="8"
                        ry="8"
                        width="60"
                        height="20"
                      />
                      <rect
                        x="0"
                        y="40"
                        rx="5"
                        ry="5"
                        width="650"
                        height="415"
                      />
                    </ContentLoader>
                  </div>
                ) : (
                  <div className="h-100">
                    <Greetings />
                    <DashboardStats dashboardStats={dashboardStats} />
                    {/* <Revenues /> */}
                    <BookedTestDrive
                      tableRef={tableRef}
                      bookedTestDrive={bookedTestDrive}
                    />
                    <ImportOnOrder
                      importOnOrderRef={importOnOrderRef}
                      importOnOrder={importOnOrder}
                    />
                  </div>
                )}
              </div>

              <div className="col-auto layout-rightside-col">
                <div className="overlay"></div>
                <div className="layout-rightside">
                  <div className="card h-100 rounded-0">
                    <div className="card-body p-0">
                      <div className="p-3">
                        <h6 className="text-muted mb-0 text-uppercase fw-semibold">
                          Recent Activity
                        </h6>
                      </div>
                      <div
                        data-simplebar
                        style={{ maxHeight: "410px" }}
                        className="p-3 pt-0"
                      >
                        <div className="acitivity-timeline acitivity-main">
                          <div className="acitivity-item d-flex">
                            <div className="flex-shrink-0 avatar-xs acitivity-avatar">
                              <div className="avatar-title bg-success-subtle text-success rounded-circle">
                                <i className="ri-shopping-cart-2-line"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="mb-1 lh-base">
                                Purchase by James Price
                              </h6>
                              <p className="text-muted mb-1">
                                Product noise evolve smartwatch{" "}
                              </p>
                              <small className="mb-0 text-muted">
                                02:14 PM Today
                              </small>
                            </div>
                          </div>
                          <div className="acitivity-item py-3 d-flex">
                            <div className="flex-shrink-0 avatar-xs acitivity-avatar">
                              <div className="avatar-title bg-danger-subtle text-danger rounded-circle">
                                <i className="ri-stack-fill"></i>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="mb-1 lh-base">
                                Added new{" "}
                                <span className="fw-semibold">
                                  style collection
                                </span>
                              </h6>
                              <p className="text-muted mb-1">
                                By Nesta Technologies
                              </p>
                              <div className="d-inline-flex gap-2 border border-dashed p-2 mb-2">
                                <a
                                  href="apps-ecommerce-product-details.html"
                                  className="bg-light rounded p-1"
                                >
                                  <img
                                    src="/assets/images/products/img-8.png"
                                    alt=""
                                    className="img-fluid d-block"
                                  />
                                </a>
                                <a
                                  href="apps-ecommerce-product-details.html"
                                  className="bg-light rounded p-1"
                                >
                                  <img
                                    src="/assets/images/products/img-2.png"
                                    alt=""
                                    className="img-fluid d-block"
                                  />
                                </a>
                                <a
                                  href="apps-ecommerce-product-details.html"
                                  className="bg-light rounded p-1"
                                >
                                  <img
                                    src="/assets/images/products/img-10.png"
                                    alt=""
                                    className="img-fluid d-block"
                                  />
                                </a>
                              </div>
                              <p className="mb-0 text-muted">
                                <small>9:47 PM Yesterday</small>
                              </p>
                            </div>
                          </div>
                          <div className="acitivity-item py-3 d-flex">
                            <div className="flex-shrink-0">
                              <img
                                src="/assets/images/users/avatar-2.jpg"
                                alt=""
                                className="avatar-xs rounded-circle acitivity-avatar"
                              />
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="mb-1 lh-base">
                                Natasha Carey have liked the products
                              </h6>
                              <p className="text-muted mb-1">
                                Allow users to like products in your WooCommerce
                                store.
                              </p>
                              <small className="mb-0 text-muted">
                                25 Dec, 2021
                              </small>
                            </div>
                          </div>
                          <div className="acitivity-item py-3 d-flex">
                            <div className="flex-shrink-0">
                              <div className="avatar-xs acitivity-avatar">
                                <div className="avatar-title rounded-circle bg-secondary">
                                  <i className="mdi mdi-sale fs-14"></i>
                                </div>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="mb-1 lh-base">
                                Today offers by{" "}
                                <a
                                  href="apps-ecommerce-seller-details.html"
                                  className="link-secondary"
                                >
                                  Digitech Galaxy
                                </a>
                              </h6>
                              <p className="text-muted mb-2">
                                Offer is valid on orders of Rs.500 Or above for
                                selected products only.
                              </p>
                              <small className="mb-0 text-muted">
                                12 Dec, 2021
                              </small>
                            </div>
                          </div>
                          <div className="acitivity-item py-3 d-flex">
                            <div className="flex-shrink-0">
                              <div className="avatar-xs acitivity-avatar">
                                <div className="avatar-title rounded-circle bg-danger-subtle text-danger">
                                  <i className="ri-bookmark-fill"></i>
                                </div>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="mb-1 lh-base">Favoried Product</h6>
                              <p className="text-muted mb-2">
                                Esther James have favorited product.
                              </p>
                              <small className="mb-0 text-muted">
                                25 Nov, 2021
                              </small>
                            </div>
                          </div>
                          <div className="acitivity-item py-3 d-flex">
                            <div className="flex-shrink-0">
                              <div className="avatar-xs acitivity-avatar">
                                <div className="avatar-title rounded-circle bg-secondary">
                                  <i className="mdi mdi-sale fs-14"></i>
                                </div>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="mb-1 lh-base">
                                Flash sale starting{" "}
                                <span className="text-primary">Tomorrow.</span>
                              </h6>
                              <p className="text-muted mb-0">
                                Flash sale by{" "}
                                <a href="" className="link-secondary fw-medium">
                                  Zoetic Fashion
                                </a>
                              </p>
                              <small className="mb-0 text-muted">
                                22 Oct, 2021
                              </small>
                            </div>
                          </div>
                          <div className="acitivity-item py-3 d-flex">
                            <div className="flex-shrink-0">
                              <div className="avatar-xs acitivity-avatar">
                                <div className="avatar-title rounded-circle bg-info-subtle text-info">
                                  <i className="ri-line-chart-line"></i>
                                </div>
                              </div>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="mb-1 lh-base">
                                Monthly sales report
                              </h6>
                              <p className="text-muted mb-2">
                                <span className="text-danger">2 days left</span>{" "}
                                notification to submit the monthly sales report.{" "}
                                <a href="" className="link-warning ">
                                  Reports Builder
                                </a>
                              </p>
                              <small className="mb-0 text-muted">15 Oct</small>
                            </div>
                          </div>
                          <div className="acitivity-item d-flex">
                            <div className="flex-shrink-0">
                              <img
                                src="/assets/images/users/avatar-3.jpg"
                                alt=""
                                className="avatar-xs rounded-circle acitivity-avatar"
                              />
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <h6 className="mb-1 lh-base">
                                Frank Hook Commented
                              </h6>
                              <p className="text-muted mb-2 fst-italic">
                                " A product that has reviews is more likable to
                                be sold than a product. "
                              </p>
                              <small className="mb-0 text-muted">
                                26 Aug, 2021
                              </small>
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
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
