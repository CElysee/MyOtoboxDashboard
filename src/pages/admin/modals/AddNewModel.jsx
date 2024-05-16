import React, { useEffect, useState, useRef } from "react";
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
function AddNewModel({ userRefresh }) {
  const [allBrands, setAllBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#fff");
  const dismissButtonRef = useRef();
  const [inputValues, setInputValues] = useState({
    brand_model_name: "",
    brand_id: "",
    production_years: "",
    brand_model_image: "",
    model_excel: "",
  });

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axiosInstance.get("/car_brand/list");
        setAllBrands(response.data.car_brand);
      } catch (error) {
        console.log("Error fetching car brands", error);
      }
    };
    fetchBrands();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "brand_model_image" || name === "model_excel") {
      const selectedFile = e.target.files[0];
      setInputValues((prevValues) => ({ ...prevValues, [name]: selectedFile }));
    } else {
      setInputValues((prevValues) => ({ ...prevValues, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("brand_model_name", inputValues.brand_model_name);
      formData.append("brand_id", inputValues.brand_id);
      formData.append("production_years", inputValues.production_years);
      formData.append("brand_model_image", inputValues.brand_model_image);
      // console.log(...formData.entries());
      try {
        const response = await axiosInstance.post(
          "/car_model/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        notify(response.data.message, "success");
        setLoading(false);
        userRefresh(true);
        dismissButtonRef.current.click();
      } catch (error) {
        console.log("Error creating new model", error);
      }
    } catch (error) {
      console.log("Error creating new model", error);
    }
  };
  const handleExcelSubmit = async (e) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData();
      formData.append("file", inputValues.model_excel);
      // console.log(...formData.entries());
    try{
      const response = await axiosInstance.post(
        "/car_model/create_excel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);
      notify(response.data.message, "success");
      setLoading(false);
      userRefresh(true);
      dismissButtonRef.current.click();
    }
    catch(error){
      console.log("Error creating new model", error);
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
                Add New Model
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
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
                                    htmlFor="brand_id"
                                    className="form-label"
                                  >
                                    Model Name
                                  </label>
                                  <select
                                    name="brand_id"
                                    id="brand_id"
                                    className="form-control"
                                    value={inputValues.brand_id}
                                    onChange={handleInputChange}
                                    required
                                  >
                                    <option>Select brand</option>
                                    {allBrands.length > 0 &&
                                      allBrands.map((brand, index) => (
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
                                    htmlFor="brand_model_name"
                                    className="form-label"
                                  >
                                    Model Name
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="brand_model_name"
                                    placeholder="Enter Brand Name"
                                    name="brand_model_name"
                                    value={inputValues.brand_model_name}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-xxl-6">
                                <div>
                                  <label
                                    htmlFor="production_years"
                                    className="form-label"
                                  >
                                    Production Years
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="production_years"
                                    placeholder="2001 - 2005"
                                    name="production_years"
                                    value={inputValues.production_years}
                                    onChange={handleInputChange}
                                    required
                                  />
                                </div>
                              </div>
                              <div className="col-xxl-6">
                                <div>
                                  <label
                                    htmlFor="formFile"
                                    className="form-label"
                                  >
                                    Upload Model Image
                                  </label>
                                  <input
                                    className="form-control"
                                    type="file"
                                    id="formFile"
                                    name="brand_model_image"
                                    onChange={handleInputChange}
                                    required
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
                                      "Save Car Model"
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
                                    htmlFor="model_excel"
                                    className="form-label"
                                  >
                                    Upload Excel File
                                  </label>
                                  <input
                                    className="form-control"
                                    type="file"
                                    id="model_excel"
                                    name="model_excel"
                                    onChange={handleInputChange}
                                    required
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
                                      "Upload Brands"
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

export default AddNewModel;
