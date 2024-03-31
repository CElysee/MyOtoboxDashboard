import React, { useEffect, useState, useRef } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import RiseLoader from "react-spinners/RiseLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#e55812",
  paddingRight: "10px",
};
function EditCarModel({ carModel, userRefresh, showModal }) {
  const [allBrands, setAllBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#fff");
  const dismissButtonRef = useRef();
  const imageBaseUrl = import.meta.env.VITE_REACT_APP_API;
  const [inputValues, setInputValues] = useState({
    brand_model_name: "",
    brand_id: "",
    production_years: "",
    brand_model_image: "",
  });

  useEffect(() => {
    if (showModal === true) {
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        brand_model_name: carModel.brand_model_name || "",
        brand_id: carModel.brand_id || "",
        production_years: carModel.production_years || "",
      }));
    }
  }, [carModel]);

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
    if (name === "brand_model_image") {
      const selectedFile = e.target.files[0];
      setInputValues({ ...inputValues, brand_model_image: selectedFile });
    } else {
      setInputValues({ ...inputValues, [name]: value });
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
      formData.append("id", carModel.id);

      try {
        const response = await axiosInstance.put(
          "/car_model/update",
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
        id="editCarModelModal"
        tabIndex="-1"
        aria-labelledby="editCarModelModalLabel"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editCarModelModalLabel">
                Add New Model - {carModel.brand_model_name}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-xxl-6">
                    <div>
                      <label htmlFor="brand_id" className="form-label">
                        Brand Name
                      </label>
                      <select
                        name="brand_id"
                        id="brand_id"
                        className="form-control"
                        value={inputValues.brand_id}
                        onChange={handleInputChange}
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
                      <label htmlFor="brand_model_name" className="form-label">
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
                      />
                    </div>
                  </div>
                  <div className="col-xxl-6">
                    <div>
                      <label htmlFor="production_years" className="form-label">
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
                      />
                    </div>
                  </div>
                  <div className="col-xxl-6">
                    <div>
                      <label htmlFor="formFile" className="form-label">
                        Upload Model Image
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="formFile"
                        name="brand_model_image"
                        onChange={handleInputChange}
                      />
                      <img
                            src={`${imageBaseUrl}${carModel.brand_model_image}`}
                            width={""}
                            style={{ paddingTop: "10px", width: "50px" }}
                          ></img>
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
                      <button type="submit" className="btn btn-info text-dark">
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
      </div>
    </>
  );
}

export default EditCarModel;
