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

function TaxCalculator() {
  const [isLoading, setIsLoading] = useState(true);
  const [taxCalculator, setTaxCalculator] = useState([]); // Add this line
  const [countBookings, setCountBookings] = useState(0); // Add this line
  const [userRefresh, setUserRefresh] = useState(false);

  const tableRef = useRef(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const booked_test_drive = await axiosInstance.get(
          "/tax-calculator/list"
        );
        setTaxCalculator(booked_test_drive.data.tax_calculations);
        setCountBookings(booked_test_drive.data.counts);
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
                            Tax Calculations
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
                              data-target={countBookings.count_tax_calculations}
                            >
                              {formatNumber(
                                countBookings.count_tax_calculations
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
                            Brands
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
                              data-target={countBookings.count_brands}
                            >
                              {formatNumber(countBookings.count_brands)}
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
                            Models
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
                              data-target={countBookings.count_models}
                            >
                              {formatNumber(countBookings.count_models)}
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
                            Trims
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
                              data-target={countBookings.count_trims}
                            >
                              {formatNumber(countBookings.count_trims)}
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
                        ref={tableRef}
                        id="scroll-horizontal"
                        className="table nowrap align-middle"
                        style={{ width: "100%" }}
                      >
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>User</th>
                            <th>Brand - Model - Trim</th>
                            <th>Price when new (MSRP - USD)</th>
                            <th>Current (Residual) Value - USD</th>
                            <th>CIF Kigali</th>
                            <th>Current Value in Rfw</th>
                            <th>Importy Duty</th>
                            <th>Excise Duty</th>
                            <th>VAT</th>
                            <th>Withholding Tax</th>
                            <th>AUL</th>
                            <th>IDL</th>
                            <th>Plate </th>
                            <th>Year of Manufucture</th>
                            <th>Amortisation Period</th>
                            <th>Quitus fiscal? (YES or NO)</th>
                            <th>Vehicle Category</th>
                            <th>Weight</th>
                            <th>Engine Capacity (CC)</th>
                            <th>Freight</th>
                            <th>Insurance</th>
                            <th>Create Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {taxCalculator.length > 0 &&
                            taxCalculator.map((tax, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                  {tax.user.firstName} {tax.user.lastName}
                                </td>
                                <td>
                                  {tax.car_brand.name} -
                                  {tax.car_model.brand_model_name} -{" "}
                                  {tax.car_trim.trim_name}
                                </td>
                                <td>{formatAmount(tax.price_when_new)} USD</td>
                                <td>
                                  {formatAmount(tax.current_residual_value)} USD
                                </td>
                                <td>{formatAmount(tax.cif_kigali)} USD</td>
                                <td>{formatAmount(tax.current_value)} RWF</td>
                                <td>{formatAmount(tax.import_duty_tax)} RWF</td>
                                <td>{formatAmount(tax.excise_duty_tax)} RWF</td>
                                <td>{formatAmount(tax.vat_tax)} RWF</td>
                                <td>{formatAmount(tax.withholding_tax)} RWF</td>
                                <td>{formatAmount(tax.aul_tax)} RWF</td>
                                <td>{formatAmount(tax.idl_tax)} RWF</td>
                                <td>{formatAmount(tax.plate_fee)} RWF</td>
                                <td>{tax.year_of_manufacture}</td>
                                <td>{tax.amortisation_period}</td>
                                <td>{tax.quitus_fiscal}</td>
                                <td>{tax.vehicle_category}</td>
                                <td>{formatAmount(tax.weight)}</td>
                                <td>{formatAmount(tax.engine_cc)}</td>
                                <td>{formatAmount(tax.freight_cost)} USD</td>
                                <td>{formatAmount(tax.insurance)} USD</td>
                                <td>{tax.created_at}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
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

export default TaxCalculator;
