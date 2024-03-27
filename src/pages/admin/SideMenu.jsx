import React from "react";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

function SideMenu() {
  return (
    <>
      <div
        id="removeNotificationModal"
        className="modal fade zoomIn"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="NotificationModalbtn-close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="mt-2 text-center">
                <lord-icon
                  src="https://cdn.lordicon.com/gsqxdxog.json"
                  trigger="loop"
                  colors="primary:#f7b84b,secondary:#f06548"
                  style={{ width: "100px", height: "100px" }}
                ></lord-icon>
                <div className="mt-4 pt-2 fs-15 mx-4 mx-sm-5">
                  <h4>Are you sure ?</h4>
                  <p className="text-muted mx-4 mb-0">
                    Are you sure you want to remove this Notification ?
                  </p>
                </div>
              </div>
              <div className="d-flex gap-2 justify-content-center mt-4 mb-2">
                <button
                  type="button"
                  className="btn w-sm btn-light"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn w-sm btn-danger"
                  id="delete-notification"
                >
                  Yes, Delete It!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="app-menu navbar-menu">
        <div className="navbar-brand-box">
          <a href="index.html" className="logo logo-dark">
            <span className="logo-sm">
              <img src="assets/images/logo-sm.png" alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src="assets/images/logo-dark.png" alt="" height="17" />
            </span>
          </a>

          <a href="index.html" className="logo logo-light">
            <span className="logo-sm">
              <img src="assets/images/logo-sm.png" alt="" height="22" />
            </span>
            <span className="logo-lg">
              <img src="assets/images/logo-light.png" alt="" height="17" />
            </span>
          </a>
          <button
            type="button"
            className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
            id="vertical-hover"
          >
            <i className="ri-record-circle-line"></i>
          </button>
        </div>
        <SimpleBar style={{ maxHeight: "100%" }}>
          <div className="container-fluid">
            <div id="two-column-menu"></div>
            <ul className="navbar-nav" id="navbar-nav">
              <li className="menu-title">
                <span data-key="t-menu">Menu</span>
              </li>
              <li className="nav-item">
                <a className="nav-link menu-link" href="#sidebarDashboards">
                  <i className="ri-dashboard-2-line"></i>{" "}
                  <span data-key="t-dashboards">Dashboard</span>
                </a>
              </li>

              <li className="menu-title">
                <i className="ri-more-fill"></i>{" "}
                <span data-key="t-pages">Accounts</span>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to={"/AdminUsers"}>
                  <i className=" ri-user-settings-line"></i>{" "}
                  <span data-key="t-widgets">Admin</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to={"/AllUsers"}>
                  <i className="ri-user-follow-line"></i>{" "}
                  <span data-key="t-widgets">Users</span>
                </Link>
              </li>

              <li className="menu-title">
                <i className="ri-more-fill"></i>{" "}
                <span data-key="t-components">Car Configurations</span>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link menu-link"
                  href="#sidebarAdvanceUI"
                  data-bs-toggle="collapse"
                  role="button"
                  aria-expanded="false"
                  aria-controls="sidebarAdvanceUI"
                >
                  <i className=" ri-car-fill"></i>{" "}
                  <span data-key="t-advance-ui">Cars</span>
                </a>
                <div className="collapse menu-dropdown" id="sidebarAdvanceUI">
                  <ul className="nav nav-sm flex-column">
                    <li className="nav-item">
                      <Link
                        to={"/CarBrands"}
                        className="nav-link"
                        data-key="t-sweet-alerts"
                      >
                        Brands
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"/CarModels"}
                        className="nav-link"
                        data-key="t-sweet-alerts"
                      >
                        Models
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link
                        to={"/CarTrims"}
                        className="nav-link"
                        data-key="t-sweet-alerts"
                      >
                        Trim
                      </Link>
                    </li>
                    <Link
                      to={"/CarStandardFeature"}
                      className="nav-link"
                      data-key="t-sweet-alerts"
                    >
                      Standard Features
                    </Link>
                  </ul>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link menu-link" href="widgets.html">
                  <i className=" ri-calculator-line"></i>{" "}
                  <span data-key="t-widgets">Tax calculator</span>
                </a>
              </li>
              <li className="menu-title">
                <i className="ri-more-fill"></i>{" "}
                <span data-key="t-pages">Database</span>
              </li>
              <li className="nav-item">
                <Link className="nav-link menu-link" to={"/CarsForSell"}>
                  <i className="ri-police-car-fill"></i>{" "}
                  <span data-key="t-widgets">Cars For Sell </span>
                </Link>
              </li>
              <li className="nav-item">
              <Link className="nav-link menu-link" to={"/CarsForRent"}>
                  <i className="ri-police-car-fill"></i>{" "}
                  <span data-key="t-widgets">Cars For Rent  </span>
                </Link>
              </li>

              <li className="menu-title">
                <i className="ri-more-fill"></i>{" "}
                <span data-key="t-components">Transactions</span>
              </li>
              <li className="nav-item">
                <a className="nav-link menu-link" href="widgets.html">
                  <i className="ri-police-car-fill"></i>{" "}
                  <span data-key="t-widgets">Cars For Sell </span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link menu-link" href="widgets.html">
                  <i className="ri-truck-line"></i>{" "}
                  <span data-key="t-widgets">Cars For Rent </span>
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link menu-link" href="widgets.html">
                  <i className=" ri-calculator-line"></i>{" "}
                  <span data-key="t-widgets">Tax calculator</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link menu-link" href="widgets.html">
                  <i className="ri-ship-line"></i>{" "}
                  <span data-key="t-widgets">Import on order</span>
                </a>
              </li>
            </ul>
          </div>
        </SimpleBar>
        <div id="scrollbar"></div>
        <div className="sidebar-background"></div>
      </div>
      <div className="vertical-overlay"></div>
    </>
  );
}

export default SideMenu;
