import React, { useEffect, useRef } from "react";
import TopMenu from "./TopMenu";
import SideMenu from "./SideMenu";
import $ from "jquery"; // Import jQuery
import 'datatables.net'; // Import DataTables library
import 'datatables.net-bs5'; // Import DataTables Bootstrap 5 integration
import 'datatables.net-buttons'; // Import DataTables Buttons
import 'datatables.net-buttons-bs5'; // Import DataTables Buttons Bootstrap 5 integration
import 'datatables.net-buttons/js/buttons.html5.min'; // HTML5 export button
import 'datatables.net-buttons/js/buttons.print.min'; // Print button
import 'datatables.net-buttons/js/buttons.colVis.min'; // Column visibility button
import 'jszip/dist/jszip'; // JSZip for Excel export
import 'datatables.net-buttons/js/buttons.flash.min'; // Flash export (optional)
import 'datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css'; // Buttons Bootstrap 5 CSS
import AddNewBrand from "./modals/AddNewBrand";

function CarBrands() {
  const tableRef = useRef(null);
  useEffect(() => {
    const table = $(tableRef.current).DataTable({
      dom: 'lBfrtip', // 'l' for length menu (entries per page dropdown)
      buttons: [
        'excelHtml5', // Excel export button
        'csvHtml5', // CSV export button
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
  }, []);
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
                          Add new brand
                        </button>
                        <AddNewBrand />
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
                          All Brands
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
                          <span className="counter-value" data-target="559.25">
                            0
                          </span>
                          k{" "}
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

              <div className="col-xl-4 col-md-6">
                <div className="card card-animate">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1 overflow-hidden">
                        <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                          All Models
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

              <div className="col-xl-4 col-md-6">
                <div className="card card-animate">
                  <div className="card-body">
                    <div className="d-flex align-items-center">
                      <div className="flex-grow-1 overflow-hidden">
                        <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                          All Trims
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
                          <span className="counter-value" data-target="183.35">
                            0
                          </span>
                          M{" "}
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
                    <h5 className="card-title mb-0">All Brands</h5>
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
                          <th>Brand Name</th>
                          <th>Logo</th>
                          <th>Create Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>01</td>
                          <td>Joseph Parker</td>
                          <td>Alexis Clarke</td>
                          <td>03 Oct, 2021</td>
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

export default CarBrands;
