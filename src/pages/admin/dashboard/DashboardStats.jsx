import React from "react";
import { formatAmount, formatNumber } from "../../../utils/helpers";

function DashboardStats({dashboardStats}) {
  return (
    <>
      <div className="row">
        <div className="col-xl-3 col-md-6">
          <div className="card card-animate">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                    {" "}
                    Weekly Bookings - Cars
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
                      data-target={dashboardStats.weekly_booked_test_drive}
                    >
                      {formatNumber(dashboardStats.weekly_booked_test_drive)}
                    </span>
                  </h4>
                  <a href="" className="">
                    View booked test drive
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
                    <span className="counter-value" data-target="36894">
                      0
                    </span>
                  </h4>
                  <a href="" className="">
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
                    Weekly Tax Calculator
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
                      data-target={dashboardStats.weekly_tax_calculation}
                    >
                      {formatNumber(dashboardStats.weekly_tax_calculation)}
                    </span>
                  </h4>
                  <a href="" className="">
                    View weekly calculated tax
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
                    Weekly New Users
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <h5 className="text-muted fs-14 mb-0">+0.00 %</h5>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-22 fw-semibold ff-secondary mb-4">
                    <span
                      className="counter-value"
                      data-target={dashboardStats.weekly_new_user}
                    >
                      {formatNumber(dashboardStats.weekly_new_user)}
                    </span>
                  </h4>
                  <a href="" className="">
                    View weekly new users
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
                    Weekly New cars
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
                      data-target={dashboardStats.weekly_new_car_for_sale}
                    >
                      {formatNumber(dashboardStats.weekly_new_car_for_sale)}
                    </span>
                  </h4>
                  <a href="" className="">
                    View new cars for sale
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
                    <span className="counter-value" data-target="36894">
                      0
                    </span>
                  </h4>
                  <a href="" className="">
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
                      data-target={dashboardStats.all_cars_for_sale}
                    >
                      {formatNumber(dashboardStats.all_cars_for_sale)}
                    </span>
                  </h4>
                  <a href="" className="">
                    View all cars for sale
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
                    <span className="counter-value" data-target="165.89">
                      0
                    </span>
                    k{" "}
                  </h4>
                  <a href="" className="">
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
    </>
  );
}

export default DashboardStats;
