import React from "react";
import TopMenu from "./TopMenu";
import SideMenu from "./SideMenu";
import { useSelector } from "react-redux";

function Dashboard() {
  const greeting = useSelector(state => state.greeting);
  return (
    <div id="layout-wrapper">
      <TopMenu />
      <SideMenu />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="h-100">
                  <div className="row mb-3 pb-1">
                    <div className="col-12">
                      <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                        <div className="flex-grow-1">
                          <h4 className="fs-16 mb-1">{greeting.greeting_time}, Anna!</h4>
                          <p className="text-muted mb-0">
                            Here's what's happening with MyOtobox today.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-xl-3 col-md-6">
                      <div className="card card-animate">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                              <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                {" "}
                                Daily Bookings - Cars
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
                                $
                                <span
                                  className="counter-value"
                                  data-target="559.25"
                                >
                                  0
                                </span>
                                k{" "}
                              </h4>
                              <a href="" className="text-decoration-underline">
                                View net earnings
                              </a>
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

                    <div className="col-xl-3 col-md-6">
                      <div className="card card-animate">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                              <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                              Daily Bookings - Rent
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
                                  data-target="36894"
                                >
                                  0
                                </span>
                              </h4>
                              <a href="" className="text-decoration-underline">
                                View all orders
                              </a>
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

                    <div className="col-xl-3 col-md-6">
                      <div className="card card-animate">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                              <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                Tax Calculator Earnings
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
                                  data-target="183.35"
                                >
                                  0
                                </span>
                                M{" "}
                              </h4>
                              <a href="" className="text-decoration-underline">
                                See details
                              </a>
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

                    <div className="col-xl-3 col-md-6">
                      <div className="card card-animate">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                              <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                {" "}
                                New Users
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <h5 className="text-muted fs-14 mb-0">+0.00 %</h5>
                            </div>
                          </div>
                          <div className="d-flex align-items-end justify-content-between mt-4">
                            <div>
                              <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                                $
                                <span
                                  className="counter-value"
                                  data-target="165.89"
                                >
                                  0
                                </span>
                                k{" "}
                              </h4>
                              <a href="" className="text-decoration-underline">
                                Withdraw money
                              </a>
                            </div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title bg-info-subtle rounded fs-3">
                                <i className="bx bx-wallet text-info"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-3 col-md-6">
                      <div className="card card-animate">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                              <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                {" "}
                                New cars
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
                                $
                                <span
                                  className="counter-value"
                                  data-target="559.25"
                                >
                                  0
                                </span>
                                k{" "}
                              </h4>
                              <a href="" className="text-decoration-underline">
                                View net earnings
                              </a>
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

                    <div className="col-xl-3 col-md-6">
                      <div className="card card-animate">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                              <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                              New - Rental
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
                                  data-target="36894"
                                >
                                  0
                                </span>
                              </h4>
                              <a href="" className="text-decoration-underline">
                                View all orders
                              </a>
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

                    <div className="col-xl-3 col-md-6">
                      <div className="card card-animate">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                              <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                All Cars
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
                                  data-target="183.35"
                                >
                                  0
                                </span>
                                M{" "}
                              </h4>
                              <a href="" className="text-decoration-underline">
                                See details
                              </a>
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

                    <div className="col-xl-3 col-md-6">
                      <div className="card card-animate">
                        <div className="card-body">
                          <div className="d-flex align-items-center">
                            <div className="flex-grow-1 overflow-hidden">
                              <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                                {" "}
                                All Rentals
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <h5 className="text-muted fs-14 mb-0">+0.00 %</h5>
                            </div>
                          </div>
                          <div className="d-flex align-items-end justify-content-between mt-4">
                            <div>
                              <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                                $
                                <span
                                  className="counter-value"
                                  data-target="165.89"
                                >
                                  0
                                </span>
                                k{" "}
                              </h4>
                              <a href="" className="text-decoration-underline">
                                Withdraw money
                              </a>
                            </div>
                            <div className="avatar-sm flex-shrink-0">
                              <span className="avatar-title bg-info-subtle rounded fs-3">
                                <i className="bx bx-wallet text-info"></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-xl-12">
                      <div className="card">
                        <div className="card-header border-0 align-items-center d-flex">
                          <h4 className="card-title mb-0 flex-grow-1">
                            Revenue
                          </h4>
                          <div>
                            <button
                              type="button"
                              className="btn btn-soft-secondary btn-sm"
                            >
                              ALL
                            </button>
                            <button
                              type="button"
                              className="btn btn-soft-secondary btn-sm"
                            >
                              1M
                            </button>
                            <button
                              type="button"
                              className="btn btn-soft-secondary btn-sm"
                            >
                              6M
                            </button>
                            <button
                              type="button"
                              className="btn btn-soft-primary btn-sm"
                            >
                              1Y
                            </button>
                          </div>
                        </div>

                        <div className="card-header p-0 border-0 bg-light-subtle">
                          <div className="row g-0 text-center">
                            <div className="col-6 col-sm-3">
                              <div className="p-3 border border-dashed border-start-0">
                                <h5 className="mb-1">
                                  <span
                                    className="counter-value"
                                    data-target="7585"
                                  >
                                    0
                                  </span>
                                </h5>
                                <p className="text-muted mb-0">Orders</p>
                              </div>
                            </div>

                            <div className="col-6 col-sm-3">
                              <div className="p-3 border border-dashed border-start-0">
                                <h5 className="mb-1">
                                  $
                                  <span
                                    className="counter-value"
                                    data-target="22.89"
                                  >
                                    0
                                  </span>
                                  k
                                </h5>
                                <p className="text-muted mb-0">Earnings</p>
                              </div>
                            </div>

                            <div className="col-6 col-sm-3">
                              <div className="p-3 border border-dashed border-start-0">
                                <h5 className="mb-1">
                                  <span
                                    className="counter-value"
                                    data-target="367"
                                  >
                                    0
                                  </span>
                                </h5>
                                <p className="text-muted mb-0">Refunds</p>
                              </div>
                            </div>

                            <div className="col-6 col-sm-3">
                              <div className="p-3 border border-dashed border-start-0 border-end-0">
                                <h5 className="mb-1 text-success">
                                  <span
                                    className="counter-value"
                                    data-target="18.92"
                                  >
                                    0
                                  </span>
                                  %
                                </h5>
                                <p className="text-muted mb-0">
                                  Conversation Ratio
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card-body p-0 pb-2">
                          <div className="w-100">
                            <div
                              id="customer_impression_charts"
                              data-colors='["--vz-info", "--vz-primary", "--vz-danger"]'
                              className="apex-charts"
                              dir="ltr"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-xl-6">
                      <div className="card">
                        <div className="card-header align-items-center d-flex">
                          <h4 className="card-title mb-0 flex-grow-1">
                            Cars for sell recent transactions
                          </h4>
                          <div className="flex-shrink-0">
                            <div className="dropdown card-header-dropdown">
                              <a
                                className="text-reset dropdown-btn"
                                href="#"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <span className="fw-semibold text-uppercase fs-12">
                                  Sort by:
                                </span>
                                <span className="text-muted">
                                  Today
                                  <i className="mdi mdi-chevron-down ms-1"></i>
                                </span>
                              </a>
                              <div className="dropdown-menu dropdown-menu-end">
                                <a className="dropdown-item" href="#">
                                  Today
                                </a>
                                <a className="dropdown-item" href="#">
                                  Yesterday
                                </a>
                                <a className="dropdown-item" href="#">
                                  Last 7 Days
                                </a>
                                <a className="dropdown-item" href="#">
                                  Last 30 Days
                                </a>
                                <a className="dropdown-item" href="#">
                                  This Month
                                </a>
                                <a className="dropdown-item" href="#">
                                  Last Month
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card-body">
                          <div className="table-responsive table-card">
                            <table className="table table-hover table-centered align-middle table-nowrap mb-0">
                              <tbody>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="avatar-sm bg-light rounded p-1 me-2">
                                        <img
                                          src="assets/images/products/img-1.png"
                                          alt=""
                                          className="img-fluid d-block"
                                        />
                                      </div>
                                      <div>
                                        <h5 className="fs-14 my-1">
                                          <a
                                            href="apps-ecommerce-product-details.html"
                                            className="text-reset"
                                          >
                                            Branded T-Shirts
                                          </a>
                                        </h5>
                                        <span className="text-muted">
                                          24 Apr 2021
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      $29.00
                                    </h5>
                                    <span className="text-muted">Price</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">62</h5>
                                    <span className="text-muted">Orders</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      510
                                    </h5>
                                    <span className="text-muted">Stock</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      $1,798
                                    </h5>
                                    <span className="text-muted">Amount</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="avatar-sm bg-light rounded p-1 me-2">
                                        <img
                                          src="assets/images/products/img-2.png"
                                          alt=""
                                          className="img-fluid d-block"
                                        />
                                      </div>
                                      <div>
                                        <h5 className="fs-14 my-1">
                                          <a
                                            href="apps-ecommerce-product-details.html"
                                            className="text-reset"
                                          >
                                            Bentwood Chair
                                          </a>
                                        </h5>
                                        <span className="text-muted">
                                          19 Mar 2021
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      $85.20
                                    </h5>
                                    <span className="text-muted">Price</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">35</h5>
                                    <span className="text-muted">Orders</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      <span className="badge bg-danger-subtle text-danger">
                                        Out of stock
                                      </span>{" "}
                                    </h5>
                                    <span className="text-muted">Stock</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      $2982
                                    </h5>
                                    <span className="text-muted">Amount</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="avatar-sm bg-light rounded p-1 me-2">
                                        <img
                                          src="assets/images/products/img-3.png"
                                          alt=""
                                          className="img-fluid d-block"
                                        />
                                      </div>
                                      <div>
                                        <h5 className="fs-14 my-1">
                                          <a
                                            href="apps-ecommerce-product-details.html"
                                            className="text-reset"
                                          >
                                            Borosil Paper Cup
                                          </a>
                                        </h5>
                                        <span className="text-muted">
                                          01 Mar 2021
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      $14.00
                                    </h5>
                                    <span className="text-muted">Price</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">80</h5>
                                    <span className="text-muted">Orders</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      749
                                    </h5>
                                    <span className="text-muted">Stock</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      $1120
                                    </h5>
                                    <span className="text-muted">Amount</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="avatar-sm bg-light rounded p-1 me-2">
                                        <img
                                          src="assets/images/products/img-4.png"
                                          alt=""
                                          className="img-fluid d-block"
                                        />
                                      </div>
                                      <div>
                                        <h5 className="fs-14 my-1">
                                          <a
                                            href="apps-ecommerce-product-details.html"
                                            className="text-reset"
                                          >
                                            One Seater Sofa
                                          </a>
                                        </h5>
                                        <span className="text-muted">
                                          11 Feb 2021
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      $127.50
                                    </h5>
                                    <span className="text-muted">Price</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">56</h5>
                                    <span className="text-muted">Orders</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      <span className="badge bg-danger-subtle text-danger">
                                        Out of stock
                                      </span>
                                    </h5>
                                    <span className="text-muted">Stock</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      $7140
                                    </h5>
                                    <span className="text-muted">Amount</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="avatar-sm bg-light rounded p-1 me-2">
                                        <img
                                          src="assets/images/products/img-5.png"
                                          alt=""
                                          className="img-fluid d-block"
                                        />
                                      </div>
                                      <div>
                                        <h5 className="fs-14 my-1">
                                          <a
                                            href="apps-ecommerce-product-details.html"
                                            className="text-reset"
                                          >
                                            Stillbird Helmet
                                          </a>
                                        </h5>
                                        <span className="text-muted">
                                          17 Jan 2021
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      $54
                                    </h5>
                                    <span className="text-muted">Price</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">74</h5>
                                    <span className="text-muted">Orders</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      805
                                    </h5>
                                    <span className="text-muted">Stock</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      $3996
                                    </h5>
                                    <span className="text-muted">Amount</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div className="align-items-center mt-4 pt-2 justify-content-between row text-center text-sm-start">
                            <div className="col-sm">
                              <div className="text-muted">
                                Showing <span className="fw-semibold">5</span>{" "}
                                of <span className="fw-semibold">25</span>{" "}
                                Results
                              </div>
                            </div>
                            <div className="col-sm-auto  mt-3 mt-sm-0">
                              <ul className="pagination pagination-separated pagination-sm mb-0 justify-content-center">
                                <li className="page-item disabled">
                                  <a href="#" className="page-link">
                                    ←
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a href="#" className="page-link">
                                    1
                                  </a>
                                </li>
                                <li className="page-item active">
                                  <a href="#" className="page-link">
                                    2
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a href="#" className="page-link">
                                    3
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a href="#" className="page-link">
                                    →
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-6">
                      <div className="card card-height-100">
                        <div className="card-header align-items-center d-flex">
                          <h4 className="card-title mb-0 flex-grow-1">
                            Top requested cars for sell
                          </h4>
                          <div className="flex-shrink-0">
                            <div className="dropdown card-header-dropdown">
                              <a
                                className="text-reset dropdown-btn"
                                href="#"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <span className="text-muted">
                                  Report
                                  <i className="mdi mdi-chevron-down ms-1"></i>
                                </span>
                              </a>
                              <div className="dropdown-menu dropdown-menu-end">
                                <a className="dropdown-item" href="#">
                                  Download Report
                                </a>
                                <a className="dropdown-item" href="#">
                                  Export
                                </a>
                                <a className="dropdown-item" href="#">
                                  Import
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card-body">
                          <div className="table-responsive table-card">
                            <table className="table table-centered table-hover align-middle table-nowrap mb-0">
                              <tbody>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="flex-shrink-0 me-2">
                                        <img
                                          src="assets/images/companies/img-1.png"
                                          alt=""
                                          className="avatar-sm p-2"
                                        />
                                      </div>
                                      <div>
                                        <h5 className="fs-14 my-1 fw-medium">
                                          <a
                                            href="apps-ecommerce-seller-details.html"
                                            className="text-reset"
                                          >
                                            iTest Factory
                                          </a>
                                        </h5>
                                        <span className="text-muted">
                                          Oliver Tyler
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="text-muted">
                                      Bags and Wallets
                                    </span>
                                  </td>
                                  <td>
                                    <p className="mb-0">8547</p>
                                    <span className="text-muted">Stock</span>
                                  </td>
                                  <td>
                                    <span className="text-muted">$541200</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 mb-0">
                                      32%
                                      <i className="ri-bar-chart-fill text-success fs-16 align-middle ms-2"></i>
                                    </h5>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="flex-shrink-0 me-2">
                                        <img
                                          src="assets/images/companies/img-2.png"
                                          alt=""
                                          className="avatar-sm p-2"
                                        />
                                      </div>
                                      <div className="flex-grow-1">
                                        <h5 className="fs-14 my-1 fw-medium">
                                          <a
                                            href="apps-ecommerce-seller-details.html"
                                            className="text-reset"
                                          >
                                            Digitech Galaxy
                                          </a>
                                        </h5>
                                        <span className="text-muted">
                                          John Roberts
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="text-muted">Watches</span>
                                  </td>
                                  <td>
                                    <p className="mb-0">895</p>
                                    <span className="text-muted">Stock</span>
                                  </td>
                                  <td>
                                    <span className="text-muted">$75030</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 mb-0">
                                      79%
                                      <i className="ri-bar-chart-fill text-success fs-16 align-middle ms-2"></i>
                                    </h5>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="flex-shrink-0 me-2">
                                        <img
                                          src="assets/images/companies/img-3.png"
                                          alt=""
                                          className="avatar-sm p-2"
                                        />
                                      </div>
                                      <div className="flex-gow-1">
                                        <h5 className="fs-14 my-1 fw-medium">
                                          <a
                                            href="apps-ecommerce-seller-details.html"
                                            className="text-reset"
                                          >
                                            Nesta Technologies
                                          </a>
                                        </h5>
                                        <span className="text-muted">
                                          Harley Fuller
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="text-muted">
                                      Bike Accessories
                                    </span>
                                  </td>
                                  <td>
                                    <p className="mb-0">3470</p>
                                    <span className="text-muted">Stock</span>
                                  </td>
                                  <td>
                                    <span className="text-muted">$45600</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 mb-0">
                                      90%
                                      <i className="ri-bar-chart-fill text-success fs-16 align-middle ms-2"></i>
                                    </h5>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="flex-shrink-0 me-2">
                                        <img
                                          src="assets/images/companies/img-8.png"
                                          alt=""
                                          className="avatar-sm p-2"
                                        />
                                      </div>
                                      <div className="flex-grow-1">
                                        <h5 className="fs-14 my-1 fw-medium">
                                          <a
                                            href="apps-ecommerce-seller-details.html"
                                            className="text-reset"
                                          >
                                            Zoetic Fashion
                                          </a>
                                        </h5>
                                        <span className="text-muted">
                                          James Bowen
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="text-muted">Clothes</span>
                                  </td>
                                  <td>
                                    <p className="mb-0">5488</p>
                                    <span className="text-muted">Stock</span>
                                  </td>
                                  <td>
                                    <span className="text-muted">$29456</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 mb-0">
                                      40%
                                      <i className="ri-bar-chart-fill text-success fs-16 align-middle ms-2"></i>
                                    </h5>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="flex-shrink-0 me-2">
                                        <img
                                          src="assets/images/companies/img-5.png"
                                          alt=""
                                          className="avatar-sm p-2"
                                        />
                                      </div>
                                      <div className="flex-grow-1">
                                        <h5 className="fs-14 my-1 fw-medium">
                                          <a
                                            href="apps-ecommerce-seller-details.html"
                                            className="text-reset"
                                          >
                                            Meta4Systems
                                          </a>
                                        </h5>
                                        <span className="text-muted">
                                          Zoe Dennis
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="text-muted">
                                      Furniture
                                    </span>
                                  </td>
                                  <td>
                                    <p className="mb-0">4100</p>
                                    <span className="text-muted">Stock</span>
                                  </td>
                                  <td>
                                    <span className="text-muted">$11260</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 mb-0">
                                      57%
                                      <i className="ri-bar-chart-fill text-success fs-16 align-middle ms-2"></i>
                                    </h5>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div className="align-items-center mt-4 pt-2 justify-content-between row text-center text-sm-start">
                            <div className="col-sm">
                              <div className="text-muted">
                                Showing <span className="fw-semibold">5</span>{" "}
                                of <span className="fw-semibold">25</span>{" "}
                                Results
                              </div>
                            </div>
                            <div className="col-sm-auto  mt-3 mt-sm-0">
                              <ul className="pagination pagination-separated pagination-sm mb-0 justify-content-center">
                                <li className="page-item disabled">
                                  <a href="#" className="page-link">
                                    ←
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a href="#" className="page-link">
                                    1
                                  </a>
                                </li>
                                <li className="page-item active">
                                  <a href="#" className="page-link">
                                    2
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a href="#" className="page-link">
                                    3
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a href="#" className="page-link">
                                    →
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-xl-6">
                      <div className="card">
                        <div className="card-header align-items-center d-flex">
                          <h4 className="card-title mb-0 flex-grow-1">
                            Cars for rent recent transactions
                          </h4>
                          <div className="flex-shrink-0">
                            <div className="dropdown card-header-dropdown">
                              <a
                                className="text-reset dropdown-btn"
                                href="#"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <span className="fw-semibold text-uppercase fs-12">
                                  Sort by:
                                </span>
                                <span className="text-muted">
                                  Today
                                  <i className="mdi mdi-chevron-down ms-1"></i>
                                </span>
                              </a>
                              <div className="dropdown-menu dropdown-menu-end">
                                <a className="dropdown-item" href="#">
                                  Today
                                </a>
                                <a className="dropdown-item" href="#">
                                  Yesterday
                                </a>
                                <a className="dropdown-item" href="#">
                                  Last 7 Days
                                </a>
                                <a className="dropdown-item" href="#">
                                  Last 30 Days
                                </a>
                                <a className="dropdown-item" href="#">
                                  This Month
                                </a>
                                <a className="dropdown-item" href="#">
                                  Last Month
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card-body">
                          <div className="table-responsive table-card">
                            <table className="table table-hover table-centered align-middle table-nowrap mb-0">
                              <tbody>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="avatar-sm bg-light rounded p-1 me-2">
                                        <img
                                          src="assets/images/products/img-1.png"
                                          alt=""
                                          className="img-fluid d-block"
                                        />
                                      </div>
                                      <div>
                                        <h5 className="fs-14 my-1">
                                          <a
                                            href="apps-ecommerce-product-details.html"
                                            className="text-reset"
                                          >
                                            Branded T-Shirts
                                          </a>
                                        </h5>
                                        <span className="text-muted">
                                          24 Apr 2021
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      $29.00
                                    </h5>
                                    <span className="text-muted">Price</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">62</h5>
                                    <span className="text-muted">Orders</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      510
                                    </h5>
                                    <span className="text-muted">Stock</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      $1,798
                                    </h5>
                                    <span className="text-muted">Amount</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="avatar-sm bg-light rounded p-1 me-2">
                                        <img
                                          src="assets/images/products/img-2.png"
                                          alt=""
                                          className="img-fluid d-block"
                                        />
                                      </div>
                                      <div>
                                        <h5 className="fs-14 my-1">
                                          <a
                                            href="apps-ecommerce-product-details.html"
                                            className="text-reset"
                                          >
                                            Bentwood Chair
                                          </a>
                                        </h5>
                                        <span className="text-muted">
                                          19 Mar 2021
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      $85.20
                                    </h5>
                                    <span className="text-muted">Price</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">35</h5>
                                    <span className="text-muted">Orders</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      <span className="badge bg-danger-subtle text-danger">
                                        Out of stock
                                      </span>{" "}
                                    </h5>
                                    <span className="text-muted">Stock</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      $2982
                                    </h5>
                                    <span className="text-muted">Amount</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="avatar-sm bg-light rounded p-1 me-2">
                                        <img
                                          src="assets/images/products/img-3.png"
                                          alt=""
                                          className="img-fluid d-block"
                                        />
                                      </div>
                                      <div>
                                        <h5 className="fs-14 my-1">
                                          <a
                                            href="apps-ecommerce-product-details.html"
                                            className="text-reset"
                                          >
                                            Borosil Paper Cup
                                          </a>
                                        </h5>
                                        <span className="text-muted">
                                          01 Mar 2021
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      $14.00
                                    </h5>
                                    <span className="text-muted">Price</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">80</h5>
                                    <span className="text-muted">Orders</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      749
                                    </h5>
                                    <span className="text-muted">Stock</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      $1120
                                    </h5>
                                    <span className="text-muted">Amount</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="avatar-sm bg-light rounded p-1 me-2">
                                        <img
                                          src="assets/images/products/img-4.png"
                                          alt=""
                                          className="img-fluid d-block"
                                        />
                                      </div>
                                      <div>
                                        <h5 className="fs-14 my-1">
                                          <a
                                            href="apps-ecommerce-product-details.html"
                                            className="text-reset"
                                          >
                                            One Seater Sofa
                                          </a>
                                        </h5>
                                        <span className="text-muted">
                                          11 Feb 2021
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      $127.50
                                    </h5>
                                    <span className="text-muted">Price</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">56</h5>
                                    <span className="text-muted">Orders</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      <span className="badge bg-danger-subtle text-danger">
                                        Out of stock
                                      </span>
                                    </h5>
                                    <span className="text-muted">Stock</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      $7140
                                    </h5>
                                    <span className="text-muted">Amount</span>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="avatar-sm bg-light rounded p-1 me-2">
                                        <img
                                          src="assets/images/products/img-5.png"
                                          alt=""
                                          className="img-fluid d-block"
                                        />
                                      </div>
                                      <div>
                                        <h5 className="fs-14 my-1">
                                          <a
                                            href="apps-ecommerce-product-details.html"
                                            className="text-reset"
                                          >
                                            Stillbird Helmet
                                          </a>
                                        </h5>
                                        <span className="text-muted">
                                          17 Jan 2021
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      $54
                                    </h5>
                                    <span className="text-muted">Price</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">74</h5>
                                    <span className="text-muted">Orders</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      805
                                    </h5>
                                    <span className="text-muted">Stock</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 my-1 fw-normal">
                                      $3996
                                    </h5>
                                    <span className="text-muted">Amount</span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div className="align-items-center mt-4 pt-2 justify-content-between row text-center text-sm-start">
                            <div className="col-sm">
                              <div className="text-muted">
                                Showing <span className="fw-semibold">5</span>{" "}
                                of <span className="fw-semibold">25</span>{" "}
                                Results
                              </div>
                            </div>
                            <div className="col-sm-auto  mt-3 mt-sm-0">
                              <ul className="pagination pagination-separated pagination-sm mb-0 justify-content-center">
                                <li className="page-item disabled">
                                  <a href="#" className="page-link">
                                    ←
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a href="#" className="page-link">
                                    1
                                  </a>
                                </li>
                                <li className="page-item active">
                                  <a href="#" className="page-link">
                                    2
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a href="#" className="page-link">
                                    3
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a href="#" className="page-link">
                                    →
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="col-xl-6">
                      <div className="card card-height-100">
                        <div className="card-header align-items-center d-flex">
                          <h4 className="card-title mb-0 flex-grow-1">
                            Top requested cars for rent
                          </h4>
                          <div className="flex-shrink-0">
                            <div className="dropdown card-header-dropdown">
                              <a
                                className="text-reset dropdown-btn"
                                href="#"
                                data-bs-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                <span className="text-muted">
                                  Report
                                  <i className="mdi mdi-chevron-down ms-1"></i>
                                </span>
                              </a>
                              <div className="dropdown-menu dropdown-menu-end">
                                <a className="dropdown-item" href="#">
                                  Download Report
                                </a>
                                <a className="dropdown-item" href="#">
                                  Export
                                </a>
                                <a className="dropdown-item" href="#">
                                  Import
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="card-body">
                          <div className="table-responsive table-card">
                            <table className="table table-centered table-hover align-middle table-nowrap mb-0">
                              <tbody>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="flex-shrink-0 me-2">
                                        <img
                                          src="assets/images/companies/img-1.png"
                                          alt=""
                                          className="avatar-sm p-2"
                                        />
                                      </div>
                                      <div>
                                        <h5 className="fs-14 my-1 fw-medium">
                                          <a
                                            href="apps-ecommerce-seller-details.html"
                                            className="text-reset"
                                          >
                                            iTest Factory
                                          </a>
                                        </h5>
                                        <span className="text-muted">
                                          Oliver Tyler
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="text-muted">
                                      Bags and Wallets
                                    </span>
                                  </td>
                                  <td>
                                    <p className="mb-0">8547</p>
                                    <span className="text-muted">Stock</span>
                                  </td>
                                  <td>
                                    <span className="text-muted">$541200</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 mb-0">
                                      32%
                                      <i className="ri-bar-chart-fill text-success fs-16 align-middle ms-2"></i>
                                    </h5>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="flex-shrink-0 me-2">
                                        <img
                                          src="assets/images/companies/img-2.png"
                                          alt=""
                                          className="avatar-sm p-2"
                                        />
                                      </div>
                                      <div className="flex-grow-1">
                                        <h5 className="fs-14 my-1 fw-medium">
                                          <a
                                            href="apps-ecommerce-seller-details.html"
                                            className="text-reset"
                                          >
                                            Digitech Galaxy
                                          </a>
                                        </h5>
                                        <span className="text-muted">
                                          John Roberts
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="text-muted">Watches</span>
                                  </td>
                                  <td>
                                    <p className="mb-0">895</p>
                                    <span className="text-muted">Stock</span>
                                  </td>
                                  <td>
                                    <span className="text-muted">$75030</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 mb-0">
                                      79%
                                      <i className="ri-bar-chart-fill text-success fs-16 align-middle ms-2"></i>
                                    </h5>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="flex-shrink-0 me-2">
                                        <img
                                          src="assets/images/companies/img-3.png"
                                          alt=""
                                          className="avatar-sm p-2"
                                        />
                                      </div>
                                      <div className="flex-gow-1">
                                        <h5 className="fs-14 my-1 fw-medium">
                                          <a
                                            href="apps-ecommerce-seller-details.html"
                                            className="text-reset"
                                          >
                                            Nesta Technologies
                                          </a>
                                        </h5>
                                        <span className="text-muted">
                                          Harley Fuller
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="text-muted">
                                      Bike Accessories
                                    </span>
                                  </td>
                                  <td>
                                    <p className="mb-0">3470</p>
                                    <span className="text-muted">Stock</span>
                                  </td>
                                  <td>
                                    <span className="text-muted">$45600</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 mb-0">
                                      90%
                                      <i className="ri-bar-chart-fill text-success fs-16 align-middle ms-2"></i>
                                    </h5>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="flex-shrink-0 me-2">
                                        <img
                                          src="assets/images/companies/img-8.png"
                                          alt=""
                                          className="avatar-sm p-2"
                                        />
                                      </div>
                                      <div className="flex-grow-1">
                                        <h5 className="fs-14 my-1 fw-medium">
                                          <a
                                            href="apps-ecommerce-seller-details.html"
                                            className="text-reset"
                                          >
                                            Zoetic Fashion
                                          </a>
                                        </h5>
                                        <span className="text-muted">
                                          James Bowen
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="text-muted">Clothes</span>
                                  </td>
                                  <td>
                                    <p className="mb-0">5488</p>
                                    <span className="text-muted">Stock</span>
                                  </td>
                                  <td>
                                    <span className="text-muted">$29456</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 mb-0">
                                      40%
                                      <i className="ri-bar-chart-fill text-success fs-16 align-middle ms-2"></i>
                                    </h5>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <div className="d-flex align-items-center">
                                      <div className="flex-shrink-0 me-2">
                                        <img
                                          src="assets/images/companies/img-5.png"
                                          alt=""
                                          className="avatar-sm p-2"
                                        />
                                      </div>
                                      <div className="flex-grow-1">
                                        <h5 className="fs-14 my-1 fw-medium">
                                          <a
                                            href="apps-ecommerce-seller-details.html"
                                            className="text-reset"
                                          >
                                            Meta4Systems
                                          </a>
                                        </h5>
                                        <span className="text-muted">
                                          Zoe Dennis
                                        </span>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    <span className="text-muted">
                                      Furniture
                                    </span>
                                  </td>
                                  <td>
                                    <p className="mb-0">4100</p>
                                    <span className="text-muted">Stock</span>
                                  </td>
                                  <td>
                                    <span className="text-muted">$11260</span>
                                  </td>
                                  <td>
                                    <h5 className="fs-14 mb-0">
                                      57%
                                      <i className="ri-bar-chart-fill text-success fs-16 align-middle ms-2"></i>
                                    </h5>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>

                          <div className="align-items-center mt-4 pt-2 justify-content-between row text-center text-sm-start">
                            <div className="col-sm">
                              <div className="text-muted">
                                Showing <span className="fw-semibold">5</span>{" "}
                                of <span className="fw-semibold">25</span>{" "}
                                Results
                              </div>
                            </div>
                            <div className="col-sm-auto  mt-3 mt-sm-0">
                              <ul className="pagination pagination-separated pagination-sm mb-0 justify-content-center">
                                <li className="page-item disabled">
                                  <a href="#" className="page-link">
                                    ←
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a href="#" className="page-link">
                                    1
                                  </a>
                                </li>
                                <li className="page-item active">
                                  <a href="#" className="page-link">
                                    2
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a href="#" className="page-link">
                                    3
                                  </a>
                                </li>
                                <li className="page-item">
                                  <a href="#" className="page-link">
                                    →
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
                                    src="assets/images/products/img-8.png"
                                    alt=""
                                    className="img-fluid d-block"
                                  />
                                </a>
                                <a
                                  href="apps-ecommerce-product-details.html"
                                  className="bg-light rounded p-1"
                                >
                                  <img
                                    src="assets/images/products/img-2.png"
                                    alt=""
                                    className="img-fluid d-block"
                                  />
                                </a>
                                <a
                                  href="apps-ecommerce-product-details.html"
                                  className="bg-light rounded p-1"
                                >
                                  <img
                                    src="assets/images/products/img-10.png"
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
                                src="assets/images/users/avatar-2.jpg"
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
                                <a
                                  href=""
                                  className="link-warning text-decoration-underline"
                                >
                                  Reports Builder
                                </a>
                              </p>
                              <small className="mb-0 text-muted">15 Oct</small>
                            </div>
                          </div>
                          <div className="acitivity-item d-flex">
                            <div className="flex-shrink-0">
                              <img
                                src="assets/images/users/avatar-3.jpg"
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

        <footer className="footer">
          <div className="container-fluid">
            <div className="row">
              <div className="col-sm-6">
                <script>document.write(new Date().getFullYear())</script> ©
                Velzon.
              </div>
              <div className="col-sm-6">
                <div className="text-sm-end d-none d-sm-block">
                  Design & Develop by Themesbrand
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;
