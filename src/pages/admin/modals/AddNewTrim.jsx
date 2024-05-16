import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../utils/AxiosInstance";
import RiseLoader from "react-spinners/RiseLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#e55812",
  paddingRight: "10px",
};

function AddNewTrim({ userRefresh }) {
  const [loading, setLoading] = useState(false);
  const [allBrandsModels, setAllBrandsModels] = useState([]);
  const [allModels, setAllModels] = useState([]);
  const [color, setColor] = useState("#fff");
  const dismissButtonRef = useRef();
  const [error, setError] = useState(null);
  const [inputValues, setInputValues] = useState({
    car_brand_id: "",
    car_model_id: "",
    trim_name: "",
    engine: "",
    curb_weight: "",
    trim_hp: "",
    trim_production_years: "",
    trim_excel: "",
  });

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brand_models = await axiosInstance.get("/car_trim/brand_models");
        setAllBrandsModels(brand_models.data);
      } catch (error) {
        console.log("Error fetching car brands", error);
      }
    };
    fetchBrands();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "car_brand_id") {
      const selectedBrandId = parseInt(value);
      const selectedBrand = allBrandsModels.find(
        (brand) => brand.id === selectedBrandId
      );
      if (selectedBrand) {
        setAllModels(selectedBrand.models);
      } else {
        setAllModels([]); // Reset models if selected brand not found
      }
      // console.log("Selected brand models", selectedBrand.models);
    }
    if (name === "trim_excel") {
      setInputValues({ ...inputValues, [name]: e.target.files[0] });
      return;
    }
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(inputValues);
    try {
      const response = await axiosInstance.post(
        "/car_trim/create",
        inputValues
      );
      notify(response.data.message, "success");
      setLoading(false);
      userRefresh(true);
      dismissButtonRef.current.click();
    } catch (error) {
      console.log("Error adding new trim", error);
    }
  };
  const handleExcelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("car_brand_id", inputValues.car_brand_id);
    formData.append("file", inputValues.trim_excel);
    console.log(...formData.entries());
    try {
      const response = await axiosInstance.post(
        "/car_trim/create_excel",
        formData
      );
      console.log(response.data);
      notify(response.data.message, "success");
      setLoading(false);
      userRefresh(true);
      dismissButtonRef.current.click();
      setError(null);
    } catch (error) {
      console.log("Error adding new trim", error);
      setError(error.message);
      setLoading(false);
    }
  }
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
    <>
      <div
        className="modal fade fadeInRight"
        id="exampleModalgrid"
        tabIndex="-1"
        aria-labelledby="exampleModalgridLabel"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalgridLabel">
                Add New Trim
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {" "}
              <div className="card">
                <div className="card-body">
                  <ul
                    className="nav nav-tabs nav-tabs-custom nav-info nav-justified mb-3"
                    role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        data-bs-toggle="tab"
                        href="#manual-upload"
                        role="tab"
                      >
                        Manual Upload
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className="nav-link"
                        data-bs-toggle="tab"
                        href="#profile1"
                        role="tab"
                      >
                        With Excel File
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content text-muted">
                    <div
                      className="tab-pane active"
                      id="manual-upload"
                      role="tabpanel"
                    >
                      <div className="d-flex">
                        <div className="flex-grow-1 ms-2">
                          <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                              <div className="col-xxl-6">
                                <div>
                                  <label
                                    htmlFor="car_brand_id"
                                    className="form-label"
                                  >
                                    Brand Name
                                  </label>
                                  <select
                                    className="form-control"
                                    name="car_brand_id"
                                    id="car_brand_id"
                                    onChange={handleInputChange}
                                    value={inputValues.car_brand_id}
                                    required
                                  >
                                    <option>Select brand</option>
                                    {allBrandsModels.length > 0 &&
                                      allBrandsModels.map((brand, index) => (
                                        <option key={index} value={brand.id}>
                                          {brand.name}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                              </div>
                              <div className="col-xxl-6">
                                <div>
                                  <label
                                    htmlFor="car_model_id"
                                    className="form-label"
                                  >
                                    Model Name
                                  </label>
                                  <select
                                    className="form-control"
                                    name="car_model_id"
                                    id="car_model_id"
                                    onChange={handleInputChange}
                                    value={inputValues.car_model_id}
                                    required
                                  >
                                    <option>Select model</option>
                                    {allModels.length > 0 &&
                                      allModels.map((model, index) => (
                                        <option key={index} value={model.id}>
                                          {model.brand_model_name}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                              </div>
                              <div className="col-xxl-6">
                                <div>
                                  <label
                                    htmlFor="trim_name"
                                    className="form-label"
                                  >
                                    Trim Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="trim_name"
                                    placeholder="Trim name"
                                    name="trim_name"
                                    value={inputValues.trim_name}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-xxl-6">
                                <div>
                                  <label
                                    htmlFor="engine"
                                    className="form-label"
                                  >
                                    Trim Engine CC
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="engine"
                                    placeholder="Trim engine cc"
                                    name="engine"
                                    value={inputValues.engine}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                              <div className="col-xxl-6">
                                <div>
                                  <label
                                    htmlFor="trim_hp"
                                    className="form-label"
                                  >
                                    Trim Horse Power
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="trim_hp"
                                    placeholder="Trim Horse Power"
                                    name="trim_hp"
                                    value={inputValues.trim_hp}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                              <div className="col-xxl-6">
                                <div>
                                  <label
                                    htmlFor="curb_weight"
                                    className="form-label"
                                  >
                                    Trim Curb Weight
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="curb_weight"
                                    placeholder="Trim curb weight"
                                    name="curb_weight"
                                    value={inputValues.curb_weight}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                              <div className="col-xxl-6">
                                <div>
                                  <label
                                    htmlFor="curb_weight"
                                    className="form-label"
                                  >
                                    Trim Production Year
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="trim_production_years"
                                    placeholder="Trim Production Year"
                                    name="trim_production_years"
                                    value={inputValues.trim_production_years}
                                    onChange={handleInputChange}
                                  />
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="hstack gap-2 justify-content-end">
                                  <button
                                    ref={dismissButtonRef}
                                    type="button"
                                    className="btn btn-dark"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="submit"
                                    className="btn btn-info text-dark"
                                  >
                                    {loading ? (
                                      <RiseLoader
                                        color={color}
                                        loading={loading}
                                        cssOverride={override}
                                        size={10}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                      />
                                    ) : (
                                      "Save new trim"
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="profile1" role="tabpanel">
                      <div className="d-flex">
                        <div className="flex-grow-1 ms-2">
                          <form onSubmit={handleExcelSubmit}>
                            <div className="row g-3">
                              <div className="col-xxl-6">
                                <div>
                                  <label
                                    htmlFor="car_brand_id"
                                    className="form-label"
                                  >
                                    Brand Name
                                  </label>
                                  <select
                                    className="form-control"
                                    name="car_brand_id"
                                    id="car_brand_id"
                                    onChange={handleInputChange}
                                    value={inputValues.car_brand_id}
                                    required
                                  >
                                    <option>Select brand</option>
                                    {allBrandsModels.length > 0 &&
                                      allBrandsModels.map((brand, index) => (
                                        <option key={index} value={brand.id}>
                                          {brand.name}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                              </div>
                              <div className="col-xxl-6">
                                <div>
                                  <label
                                    htmlFor="trim_excel"
                                    className="form-label"
                                  >
                                    Upload Excel File
                                  </label>
                                  <input
                                    className="form-control"
                                    type="file"
                                    id="trim_excel"
                                    name="trim_excel"
                                    onChange={handleInputChange}
                                    required
                                  />
                                </div>
                              </div>
                              <p className="text-danger">{error}</p>
                              <div className="col-lg-12">
                                <div className="hstack gap-2 justify-content-end">
                                  <button
                                    ref={dismissButtonRef}
                                    type="button"
                                    className="btn btn-dark"
                                    data-bs-dismiss="modal"
                                  >
                                    Close
                                  </button>
                                  <button
                                    type="submit"
                                    className="btn btn-info text-dark"
                                  >
                                    {loading ? (
                                      <RiseLoader
                                        color={color}
                                        loading={loading}
                                        cssOverride={override}
                                        size={10}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                      />
                                    ) : (
                                      "Uplaod Excel File"
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          </form>
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
    </>
  );
}

export default AddNewTrim;
