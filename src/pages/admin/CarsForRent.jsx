import React, { useEffect, useRef, useState } from "react";
import TopMenu from "./TopMenu";
import SideMenu from "./SideMenu";
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
import AddNewCarRent from "./modals/AddNewCarRent";
import EditCarForRent from "./modals/EditCarForRent";
import Greetings from "../../components/greetings/Greetings";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/AxiosInstance";
import "react-toastify/dist/ReactToastify.css";
import ContentLoader from "react-content-loader";
import { formatAmount, formatDate, truncateText, capitalizeFirstLetter, formatNumber, roundNumbers} from "../../utils/Helpers";
import { ToastContainer, toast } from "react-toastify";

function CarsForRent() {
  const [dashboardCounts, setDashboardCounts] = useState("");
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userRefresh, setUserRefresh] = useState(false);
  const imageBaseUrl = import.meta.env.VITE_REACT_APP_API;
  const greeting = useSelector((state) => state.greeting);
  const [selectCar, setSelectCar] = useState({});


  const tableRef = useRef(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/car_for_rent/car_brands/");
        const carlist_response = await axiosInstance.get("/car_for_rent/list");
        setAllCars(carlist_response.data.cars_for_rent);
        setDashboardCounts(response.data.counts);
        setUserRefresh(false);
        setIsLoading(false);
      } catch (error) {
        console.log("Error fetching data", error);
        setLoading(false);
      }
    };
    fetchData();
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
  const handleEditCarForRent = (car) => {
    setSelectCar(car);
    setShowModal(true);
    console.log("Selected Car", car);

  };
  const handleCarDelete = async (car_id) => {
    try {
      const response = await axiosInstance.delete(
        `/car_for_rent/delete/${car_id}`
      );
      setUserRefresh(true);
      notify(response.data.message, "success");
    } catch (error) {
      console.log("Error deleting car", error);
      notify("Error deleting car", "danger");
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
          <div className="row mb-3 pb-1">
              <div className="col-12">
                <div className="d-flex align-items-lg-center flex-lg-row flex-column">
                  <Greetings />
                  <div className="mt-3 mt-lg-0">
                    <div className="row g-3 mb-0 align-items-center">
                      <div className="col-auto">
                        <button
                          type="button"
                          className="btn btn-info text-dark"
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModalgrid"
                        >
                          <i className="ri-add-circle-line align-middle me-1"></i>{" "}
                          Add new car for rent
                        </button>
                      </div>
                      <div className="col-auto">
                        <button
                          type="button"
                          className="btn btn-soft-info btn-icon waves-effect waves-light layout-rightside-btn"
                        >
                          <i className="ri-pulse-line"></i>
                        </button>
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
                          Stock
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
                            {dashboardCounts.car_for_rent}
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
                          {" "}
                          Rented
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
                            {dashboardCounts.cars_rented}
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
                          {" "}
                          Brands
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
                          Models
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
                          Features
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
              <div className="row">
                <div className="col-lg-12">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0">Cars For Rent</h5>
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
                            <th>Action</th>
                            <th>Trim Image</th>
                            <th>Stock Number</th>
                            <th>Car Info/Name</th>
                            <th>Price / Day</th>
                            <th>Kilometers/Mileage</th>
                            <th>Vin/Chassic Number</th>
                            <th>Transmission</th>
                            <th>Fuel type</th>
                            <th>Engine Capacity</th>
                            <th>Interior Color</th>
                            <th>Exterior Color</th>
                            <th>Location</th>
                            <th>Create Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {allCars.length > 0 &&
                            allCars.map((car, index) => (
                              <tr key={index}>
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
                                          data-bs-target="#editCarForRent"
                                          onClick={() =>
                                            handleEditCarForRent(car)
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
                                            handleCarDelete(car.id)
                                          }
                                        >
                                          <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                          Delete
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                </td>
                                <td>
                                  <img
                                    src={`${imageBaseUrl}${car.cover_image}`}
                                    alt="Car Cover Image"
                                    width={"80px"}
                                  ></img>
                                </td>
                                <td>{car.stock_number}</td>
                                <td>{car.car_name_info}</td>
                                <td>{formatAmount(car.car_price_per_day)} Rwf</td>
                                <td>{formatAmount(car.car_mileage)} kms</td>
                                <td>{car.car_vin_number}</td>
                                <td>
                                  {car.car_transmission ==
                                  "Automatic Transmission"
                                    ? "Auto"
                                    : "Manul"}
                                </td>
                                <td>{car.car_fuel_type}</td>
                                <td>{car.car_engine_capacity}</td>
                                <td>{car.car_interior_color}</td>
                                <td>{car.car_exterior_color}</td>
                                <td>{car.car_location}</td>
                                

                                <td>{car.created_at}</td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                      <AddNewCarRent userRefresh={setUserRefresh} />
                      <EditCarForRent
                        userRefresh={setUserRefresh}
                        showModal={showModal}
                        car={selectCar}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CarsForRent;
