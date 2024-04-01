import React, { useState, useEffect, useRef } from "react";
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

function EditCarTrim({ userRefresh, carTrim, showModal }) {
  const [loading, setLoading] = useState(false);
  const [allBrands, setAllBrands] = useState([]);
  const [allModels, setAllModels] = useState([]);
  const [color, setColor] = useState("#fff");
  const dismissButtonRef = useRef();
  const [inputValues, setInputValues] = useState({
    car_brand_id: "",
    car_model_id: "",
    trim_name: "",
    engine: "",
    curb_weight: "",
    trim_hp: "",
  });

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brand_models = await axiosInstance.get("/car_trim/brand_models");
        setAllBrands(brand_models.data);
      } catch (error) {
        console.log("Error fetching car brands", error);
      }
    };
    fetchBrands();
  }, []);

  useEffect(() => {
    if (showModal === true) {
      const selectedBrandId = carTrim.car_brand_id;
      const selectedBrand = allBrands.find(
        (brands) => brands.id === selectedBrandId
      );
      const selectedModelId = carTrim.car_model_id;
      const selectedModel = selectedBrand.models.find(
        (model) => model.id === selectedModelId
      );
      // console.log("Selected model", selectedModel);
      setAllModels(selectedModel);
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        car_brand_id: carTrim.car_brand_id || "",
        car_model_id: carTrim.car_model_id || "",
        trim_name: carTrim.trim_name || "",
        engine: carTrim.engine || "",
        curb_weight: carTrim.curb_weight || "",
        trim_hp: carTrim.trim_hp || "",
      }));
    }
  }, [carTrim]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "car_brand_id") {
      const selectedBrandId = parseInt(value);
      const selectedBrand = allBrands.find(
        (brand) => brand.id === selectedBrandId
      );
      if (selectedBrand) {
        setAllModels(selectedBrand.models);
      } else {
        setAllModels([]); // Reset models if selected brand not found
      }
      // console.log("Selected brand models", selectedBrand.models);
    }
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(inputValues);
    try {
      const response = await axiosInstance.put(
        `/car_trim/update/${carTrim.id}`,
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
        id="editCarTrimModal"
        tabIndex="-1"
        aria-labelledby="editCarTrimModalLabel"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {showModal && (
              <>
                <div className="modal-header">
                  <h5 className="modal-title" id="editCarTrimModalLabel">
                    Edit Trim - {carTrim.trim_name}
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
                          <label htmlFor="car_brand_id" className="form-label">
                            Brand Name
                          </label>
                          <select
                            className="form-control"
                            name="car_brand_id"
                            id="car_brand_id"
                            onChange={handleInputChange}
                            value={inputValues.car_brand_id}
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
                          <label htmlFor="car_model_id" className="form-label">
                            Model Name
                          </label>
                          <select
                            className="form-control"
                            name="car_model_id"
                            id="car_model_id"
                            onChange={handleInputChange}
                            value={inputValues.car_model_id}
                          >
                            <option value={allModels.id}>
                              {allModels.brand_model_name}
                            </option>
                          </select>
                        </div>
                      </div>
                      <div className="col-xxl-6">
                        <div>
                          <label htmlFor="trim_name" className="form-label">
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
                          />
                        </div>
                      </div>
                      <div className="col-xxl-6">
                        <div>
                          <label htmlFor="engine" className="form-label">
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
                          <label htmlFor="trim_hp" className="form-label">
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
                          <label htmlFor="curb_weight" className="form-label">
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
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default EditCarTrim;
