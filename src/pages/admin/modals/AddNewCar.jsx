import React, { useCallback, useEffect, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import axiosInstance from "../../../utils/axiosInstance";
import RiseLoader from "react-spinners/RiseLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#e55812",
  paddingRight: "10px",
};
function AddNewCar() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [carData, setCarData] = useState({});
  const [color, setColor] = useState("#fff");
  const [allBrands, setAllBrands] = useState([]);
  const [allModels, setAllModels] = useState([]);
  const [allTrims, setAllTrims] = useState([]);
  const editorRef = useRef(null);
  const tinymce = import.meta.env.VITE_TINYMCE_API;

  const [inputValues, setInputValues] = useState({
    car_name_info: "",
    car_brand_id: "",
    car_model_id: "",
    car_trim_id: "",
    car_year: "",
    car_mileage: "",
    car_price: "",
    car_currency: "",
    car_location: "",
    car_exterior_color: "",
    car_interior_color: "",
    car_fuel_type: "",
    car_transmission: "",
    car_engine_capacity: "",
    car_fuel_consumption: "",
    car_drive_train: "",
    car_body_type: "",
    car_vin_number: "",
    car_registration_number: "",
    car_insurance: "",
    car_control_technique: "",
    car_user_type: "",
    car_accident_history: "",
    car_status: "",
    featured: "",
    seller_note: "",
    cover_image: "",
    seller_type: "",
    seller_phone_number: "",
    seller_email: "",
    seller_address: "",
  });

  const onDrop = useCallback((acceptedFiles) => {
    // Handle dropped files here
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
  }, []);

  const removeImage = (indexToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((image, index) => index !== indexToRemove)
    );
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brand_response = await axiosInstance.get(
          "/car_for_sale/car_brands"
        );
        setAllBrands(brand_response.data.car_brand);
        setCarData(brand_response.data.car_brand);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  // console.log(allBrands);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "car_brand_id") {
      const selectedBrand = allBrands.filter(
        (brand) => brand.id === Number(value)
      )[0];
      const selectModels = selectedBrand.models;
      setAllModels(selectModels);
    }
    if (name === "car_model_id") {
      const selectedModel = allModels.filter(
        (model) => model.id === Number(value)
      )[0];
      const selectTrims = selectedModel.trims;
      setAllTrims(selectTrims);
    }
    setInputValues({ ...inputValues, [name]: value });
  };
  // console.log(carData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputValues);
  }
  return (
    <>
      <div
        className="modal fade fadeInRight"
        id="exampleModalgrid"
        tabIndex="-1"
        aria-labelledby="exampleModalgridLabel"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalgridLabel">
                Add a New Car
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
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="car_name_info" className="form-label">
                        Car Info(Name)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="car_name_info"
                        name="car_name_info"
                        placeholder="2024 Toyota RAV4 Prime XSE"
                        value={inputValues.car_name_info}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="car_year" className="form-label">
                        Manufacture Year
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="car_year"
                        name="car_year"
                        placeholder="2024"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="emailInput" className="form-label">
                        Brand Name
                      </label>
                      <select
                        className="form-control"
                        name="car_brand_id"
                        id="car_brand_id"
                        value={inputValues.car_brand_id}
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
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="car_model_id" className="form-label">
                        Model Name
                      </label>
                      <select
                        className="form-control"
                        id="car_model_id"
                        name="car_model_id"
                        value={inputValues.car_model_id}
                        onChange={handleInputChange}
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
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="car_trim_id" className="form-label">
                        Trim Name
                      </label>
                      <select
                        className="form-control"
                        id="car_trim_id"
                        name="car_trim_id"
                        value={inputValues.car_trim_id}
                        onChange={handleInputChange}
                        required
                      >
                        <option>Select trim</option>
                        {allTrims.length > 0 &&
                          allTrims.map((trim, index) => (
                            <option key={index} value={trim.id}>
                              {trim.trim_name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="car_price" className="form-label">
                        Price( 15,000,000)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="car_price"
                        name="car_price"
                        placeholder="15000000"
                        onChange={handleInputChange}
                        value={inputValues.car_price}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="car_mileage" className="form-label">
                        Kilometers/Mileage
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="car_mileage"
                        name="car_mileage"
                        placeholder="15000"
                        onChange={handleInputChange}
                        value={inputValues.car_mileage}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="car_vin_number" className="form-label">
                        Vin/Chassic Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="car_vin_number"
                        name="car_vin_number"
                        placeholder="1C4RJFBG0LC218153"
                        value={inputValues.car_vin_number}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="car_transmission" className="form-label">
                        Transmission
                      </label>
                      <select
                        className="form-control"
                        name="car_transmission"
                        id="car_transmission"
                        value={inputValues.car_transmission}
                        onChange={handleInputChange}
                        required
                      >
                        <option>Select transmission</option>
                        <option>Manual Transmission</option>
                        <option>Automatic Transmission</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="car_drive_train" className="form-label">
                        Drivetrain
                      </label>
                      <select
                        className="form-control"
                        name="car_drive_train"
                        id="car_drive_train"
                        value={inputValues.car_drive_train}
                        onChange={handleInputChange}
                        required
                      >
                        <option>Select model</option>
                        <option>4WD/AWD</option>
                        <option>RWD</option>
                        <option>FWD</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label
                        htmlFor="FuelType"
                        className="form-label"
                        name="car_fuel_type"
                        id="car_fuel_type"
                        onChange={handleInputChange}
                        required
                      >
                        Fuel type
                      </label>
                      <select className="form-control">
                        <option>Select fuel type</option>
                        <option>Petrol</option>
                        <option>Diesel</option>
                        <option>Hybrid</option>
                        <option>Electric</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label
                        htmlFor="car_fuel_consumption"
                        className="form-label"
                      >
                        Fuel Consumption
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="car_fuel_consumption"
                        name="car_fuel_consumption"
                        placeholder="18km/L city / 25km/L highway"
                        value={inputValues.car_fuel_consumption}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label
                        htmlFor="car_engine_capacity"
                        className="form-label"
                      >
                        Engine Capacity
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="car_engine_capacity"
                        name="car_engine_capacity"
                        value={inputValues.car_engine_capacity}
                        placeholder="3.6L V-6 Gas"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label
                        htmlFor="car_interior_color"
                        className="form-label"
                      >
                        Interior Color
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="car_interior_color"
                        placeholder="Black"
                        name="car_interior_color"
                        value={inputValues.car_interior_color}
                        onChange={handleInputChange}
                        
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label
                        htmlFor="car_exterior_color"
                        className="form-label"
                      >
                        Exterior Color
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="car_exterior_color"
                        placeholder="Black"
                        name="car_exterior_color"
                        value={inputValues.car_exterior_color}
                        onChange={handleInputChange}
                        
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="car_body_type" className="form-label">
                        Body Type
                      </label>
                      <select
                        className="form-control"
                        name="car_body_type"
                        id="car_body_type"
                        value={inputValues.car_body_type}
                        onChange={handleInputChange}
                        required
                      >
                        <option>Select body type</option>
                        <option>SUV</option>
                        <option>Coupe</option>
                        <option>Sedan</option>
                        <option>Crossover</option>
                        <option>Sedan</option>
                        <option>Hard Top Convertible</option>
                        <option>Pick Up Truck</option>
                        <option>Hatchback</option>
                        <option>Van</option>
                        <option>Wagon</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="car_location" className="form-label">
                        Location
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="car_location"
                        placeholder="KK 215st, Kicukiro"
                        name="car_location"
                        value={inputValues.car_location}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label
                        htmlFor="car_registration_number"
                        className="form-label"
                      >
                        Registration Number / Plate Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="car_registration_number"
                        placeholder="KK 215st, Kicukiro"
                        name="car_registration_number"
                        value={inputValues.car_registration_number}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="car_insurance" className="form-label">
                        Insurance Expiry Date
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="car_insurance"
                        placeholder="31/10/2024"
                        name="car_insurance"
                        value={inputValues.car_insurance}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label
                        htmlFor="car_control_technique"
                        className="form-label"
                      >
                        Control technique Expiry Date
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="car_control_technique"
                        placeholder="31/10/2024"
                        name="car_control_technique"
                        value={inputValues.car_insurance}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label
                        htmlFor="seller_phone_number"
                        className="form-label"
                      >
                        Seller Phone Number
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="seller_phone_number"
                        placeholder="0782378433"
                        name="seller_phone_number"
                        value={inputValues.seller_phone_number}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label
                        htmlFor="seller_phone_number"
                        className="form-label"
                      >
                        Seller Email
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="seller_email"
                        placeholder="email@myotobox.rw"
                        name="seller_email"
                        value={inputValues.seller_email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <Editor
                      apiKey="xnd39f6aiczpogl36kpm15h9cmzy7n4rs3ds86q3jyyu9wm9"
                      onInit={(evt, editor) => (editorRef.current = editor)}
                      value={inputValues.seller_note}
                      onChange={handleInputChange}
                      init={{
                        height: 200,
                        menubar: false,
                        plugins: [
                          "advlist autolink lists link image charmap print preview anchor",
                          "searchreplace visualblocks code fullscreen",
                          "insertdatetime media table paste code help wordcount",
                        ],
                        toolbar:
                          "undo redo | formatselect | " +
                          "bold italic backcolor | alignleft aligncenter " +
                          "alignright alignjustify | bullist numlist outdent indent | " +
                          "removeformat | help",
                        content_style:
                          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                      }}
                    />
                  </div>
                  <div className="col-lg-12">
                    <div className="dropzone">
                      <div {...getRootProps()} className="dropzone-inner">
                        <input {...getInputProps()} />
                        <div className="dz-message needsclick">
                          <div className="mb-3">
                            <i className="display-4 text-muted ri-upload-cloud-2-fill"></i>
                          </div>

                          <h4>Drop images here or click to upload.</h4>
                        </div>
                      </div>
                      <div className="image-preview">
                        {images.map((image, index) => (
                          <div key={index} className="image-item">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${index}`}
                            />
                            <button onClick={() => removeImage(index)}>
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="hstack gap-2 justify-content-end">
                      <button
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
                          "Add new car"
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

export default AddNewCar;
