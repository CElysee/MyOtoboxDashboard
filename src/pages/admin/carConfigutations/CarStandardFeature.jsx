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
import AddNewStandardFeature from "../modals/AddNewStandardFeature";
import EditStandardFeature from "../modals/EditStandardFeature";
import { useSelector } from "react-redux";
import axiosInstance from "../../../utils/AxiosInstance";
import RiseLoader from "react-spinners/RiseLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Greetings from "../../../components/greetings/Greetings";

function CarStandardFeature() {
  const tableRef = useRef(null);
  const [dashboardCounts, setDashboardCounts] = useState("");
  const [allFeatures, setAllFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userRefresh, setUserRefresh] = useState(false);
  const [selectedFeature, setSelectFeature] = useState("");

  useEffect(() => {
    const fetchStandardFeatures = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/car_standard_features/list");
        setAllFeatures(res.data.standard_features);
        setDashboardCounts(res.data.counts);
        // setIsLoading(false);
        setUserRefresh(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchStandardFeatures();
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

  const handleSelectedFeature = (feature) => {
    setSelectFeature(feature);
    setShowModal(true);
  };

  const handleDeleteFeature = async (id) => {
    try {
      const response = await axiosInstance.delete(
        `/car_standard_features/delete/${id}`
      );
      setUserRefresh(true);
      notify(response.data.message, "success");
    } catch (error) {
      notify("Error deleting car trim", "error");
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

  return (
    <div id="layout-wrapper">
      <ToastContainer autoClose={3000} />
      <TopMenu />
      <SideMenu />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <Greetings />
            <div className="row">
              <div className="col-xl-3 col-md-6">
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
                          <span className="counter-value" data-target="559.25">
                            {dashboardCounts.brand_count}
                          </span>
                        </h4>
                      </div>
                      <div className="avatar-sm flex-shrink-0">
                        <span className="avatar-title bg-info rounded fs-3">
                          <i className="bx bx-car text-dark"></i>
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
                            {dashboardCounts.model_count}
                          </span>
                        </h4>
                      </div>
                      <div className="avatar-sm flex-shrink-0">
                        <span className="avatar-title bg-info rounded fs-3">
                          <i className="bx bxs-car-garage text-dark"></i>
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
                            {dashboardCounts.trim_count}
                          </span>
                        </h4>
                      </div>
                      <div className="avatar-sm flex-shrink-0">
                        <span className="avatar-title bg-info rounded fs-3">
                          <i className="bx bxs-car-mechanic text-dark"></i>
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
                          All Standard Features
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
                            {dashboardCounts.standard_features_count}
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
                    <h5 className="card-title mb-0">All Features</h5>
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
                          <th>Feature Name</th>
                          <th>Create Date</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {allFeatures.length > 0 &&
                          allFeatures.map((feature, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{feature.feature_name}</td>
                              <td>{feature.created_at}</td>
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
                                        data-bs-target="#editCarFeatureModal"
                                        onClick={() =>
                                          handleSelectedFeature(feature)
                                        }
                                      >
                                        <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                        Edit
                                      </button>
                                    </li>
                                    <li>
                                      <button
                                        className="dropdown-item remove-item-btn"
                                        onClick={() =>
                                          handleDeleteFeature(feature.id)
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
                    <EditStandardFeature
                      userRefresh={setUserRefresh}
                      showModal={showModal}
                      carFeature={selectedFeature}
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

export default CarStandardFeature;
