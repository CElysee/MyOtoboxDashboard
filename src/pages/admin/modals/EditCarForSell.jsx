import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  useMemo,
} from "react";
import { useDropzone } from "react-dropzone";
import axiosInstance from "../../../utils/AxiosInstance";
import RiseLoader from "react-spinners/RiseLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@tinymce/tinymce-react";
import Select from "react-select";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#e55812",
  paddingRight: "10px",
};
function AddNewCar({ userRefresh, car, showModal }) {
  const [car_images, setCarImages] = useState([]);
  const [cover_image, setCoverImage] = useState("");
  const [addedCarImages, setAddedCarImages] = useState([]);
  const [bodyTypeList, setBodyTypeList] = useState("");
  const [loading, setLoading] = useState(false);
  const [carData, setCarData] = useState({});
  const [color, setColor] = useState("#fff");
  const [allBrands, setAllBrands] = useState([]);
  const [allModels, setAllModels] = useState([]);
  const dismissButtonRef = useRef();
  const [allTrims, setAllTrims] = useState([]);
  const [allStandardFeatures, setAllStandardFeatures] = useState([]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [addedFeatures, setAddedFeatures] = useState([]);
  const editorRef = useRef(null);
  const tinymce = import.meta.env.VITE_TINYMCE_API;
  const imageBaseUrl = import.meta.env.VITE_REACT_APP_API;

  const [inputValues, setInputValues] = useState({
    car_name_info: "",
    car_brand_id: "",
    car_model_id: "",
    car_trim_id: "",
    car_year: "",
    car_mileage: "",
    car_price: "",
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
    seller_note: "",
    cover_image: "",
    seller_type: "",
    seller_phone_number: "",
    seller_email: "",
    car_standard_features_id: [],
    car_condition: "",
    car_seller_name: "",
  });

  // Include 'features' in the dependencies array
  const savedFeatures = useMemo(() => {
    if (showModal) {
      return car.features.map((feature) => ({
        value: feature.id,
        label: feature.feature_name,
      }));
    }
  }, [car]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const brand_response = await axiosInstance.get(
          "/car_for_sale/car_brands"
        );
        const body_type_response = await axiosInstance.get(
          "/car_body_type/list"
        );
        setAllBrands(brand_response.data.car_brand);
        setBodyTypeList(body_type_response.data.car_body);
        setCarData(brand_response.data.car_brand);
        setAllStandardFeatures(brand_response.data.car_standard_features);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (showModal === true) {
      console.log(car);
      // console.log("Car data", inputValues);
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        car_name_info: car.car_name_info || "",
        car_brand_id: car.car_brand_id || "",
        car_model_id: car.car_model_id || "",
        car_trim_id: car.car_trim_id || "",
        car_year: car.car_year || "",
        car_mileage: car.car_mileage || "",
        car_price: car.car_price || "",
        car_location: car.car_location || "",
        car_exterior_color: car.car_exterior_color || "",
        car_interior_color: car.car_interior_color || "",
        car_fuel_type: car.car_fuel_type || "",
        car_transmission: car.car_transmission || "",
        car_engine_capacity: car.car_engine_capacity || "",
        car_fuel_consumption: car.car_fuel_consumption || "",
        car_drive_train: car.car_drive_train || "",
        car_body_type: car.car_body_type || "",
        car_vin_number: car.car_vin_number || "",
        car_registration_number: car.car_registration_number || "",
        car_insurance: car.car_insurance || "",
        car_control_technique: car.car_control_technique || "",
        seller_note: car.seller_note || "",
        // cover_image: car.cover_image || "",
        seller_type: car.seller_type || "",
        seller_phone_number: car.seller_phone_number || "",
        seller_email: car.seller_email || "",
        car_standard_features_id: car.features_ids || "",
        car_condition: car.car_condition || "",
        car_seller_name: car.car_seller_name || "",
      }));
      const selectedBrand = allBrands.filter(
        (brand) => brand.id === Number(car.car_brand_id)
      )[0];
      const selectModels = selectedBrand.models;
      setAllModels(selectModels);
      const selectTrims = selectModels.filter(
        (model) => model.id === Number(car.car_model_id)
      )[0].trims;
      setAllTrims(selectTrims);
      setAddedCarImages(car.car_images);
      setAddedFeatures(savedFeatures);
      setCoverImage(car.cover_image);
    }
  }, [car]);

  const standaFeaturesOptions = allStandardFeatures.map((feature) => ({
    value: feature.id,
    label: feature.feature_name,
  }));

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
    if (name === "cover_image") {
      const selectedImage = e.target.files[0];
      setInputValues({ ...inputValues, cover_image: selectedImage });
      // console.log(inputValues.cover_image);
    } else {
      setInputValues({ ...inputValues, [name]: value });
    }
  };

  const handleStandardFeatureChange = (selectedOptions) => {
    setAddedFeatures(selectedOptions);
    const selectedFeatures = selectedOptions.map((option) => option.value);
    setInputValues({
      ...inputValues,
      car_standard_features_id: selectedFeatures,
    });
  };

  const handleEditorChange = (content, editor) => {
    // Update the content state whenever the editor content changes
    setInputValues((prevValues) => ({
      ...prevValues,
      seller_note: content,
    }));
  };

  const onDrop = useCallback((acceptedFiles) => {
    // Handle dropped files here
    // setCarImages((prevImages) => [...prevImages, ...acceptedFiles]);
    setCarImages([...car_images, ...acceptedFiles]);
  }, []);

  const removeImage = (indexToRemove) => {
    setCarImages((prevImages) =>
      prevImages.filter((image, index) => index !== indexToRemove)
    );
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(inputValues);
    // console.log(car_images);
    try {
      const formData = new FormData();
      formData.append("user_id", "1");
      formData.append("car_id", car.id);
      formData.append("car_name_info", inputValues.car_name_info);
      formData.append("car_brand_id", inputValues.car_brand_id);
      formData.append("car_model_id", inputValues.car_model_id);
      formData.append("car_trim_id", inputValues.car_trim_id);
      formData.append("car_year", inputValues.car_year);
      formData.append("car_mileage", inputValues.car_mileage);
      formData.append("car_price", inputValues.car_price);
      formData.append("car_vin_number", inputValues.car_vin_number);
      formData.append("car_transmission", inputValues.car_transmission);
      formData.append("car_drive_train", inputValues.car_drive_train);
      formData.append("car_fuel_type", inputValues.car_fuel_type);
      formData.append("car_fuel_consumption", inputValues.car_fuel_consumption);
      formData.append("car_engine_capacity", inputValues.car_engine_capacity);
      formData.append("car_fuel_consumption", inputValues.car_fuel_consumption);
      formData.append("car_exterior_color", inputValues.car_exterior_color);
      formData.append("car_interior_color", inputValues.car_interior_color);
      formData.append("car_body_type", inputValues.car_body_type);
      formData.append("car_location", inputValues.car_location);
      formData.append("car_condition", inputValues.car_condition);
      formData.append("car_seller_name", inputValues.car_seller_name);
      formData.append(
        "car_registration_number",
        inputValues.car_registration_number
      );
      formData.append("car_insurance", inputValues.car_insurance);
      formData.append(
        "car_control_technique",
        inputValues.car_control_technique
      );
      formData.append("seller_phone_number", inputValues.seller_phone_number);
      formData.append("seller_email", inputValues.seller_email);
      formData.append("seller_note", inputValues.seller_note);
      formData.append("cover_image", inputValues.cover_image);
      formData.append(
        "car_standard_features",
        inputValues.car_standard_features_id
      );
      car_images.forEach((file) => {
        formData.append("car_images", file); // Make sure 'file' is an UploadFile object
      });

      console.log(...formData.entries());
      const response = await axiosInstance.put(
        "/car_for_sale/update",
        formData,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Submission successful:", response.data);
      notify(response.data.message, "success");
      setLoading(false);
      userRefresh(true);
      dismissButtonRef.current.click();
    } catch (error) {
      console.log("Error adding new car", error);
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
  // console.log(car_images);
  return (
    <>
      <div
        className="modal fade fadeInRight"
        id="editCarForSell"
        tabIndex="-1"
        aria-labelledby="editCarForSellLabel"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            {showModal && (
              <>
                <div className="modal-header">
                  <h5 className="modal-title" id="editCarForSellLabel">
                    Edit - {car.car_name_info}
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
                            value={inputValues.car_year}
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
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div>
                          <label
                            htmlFor="car_vin_number"
                            className="form-label"
                          >
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
                          <label
                            htmlFor="car_transmission"
                            className="form-label"
                          >
                            Transmission
                          </label>
                          <select
                            className="form-control"
                            name="car_transmission"
                            id="car_transmission"
                            value={inputValues.car_transmission}
                            onChange={handleInputChange}
                          >
                            <option>Select transmission</option>
                            <option>Manual Transmission</option>
                            <option>Automatic Transmission</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div>
                          <label
                            htmlFor="car_drive_train"
                            className="form-label"
                          >
                            Drivetrain
                          </label>
                          <select
                            className="form-control"
                            name="car_drive_train"
                            id="car_drive_train"
                            value={inputValues.car_drive_train}
                            onChange={handleInputChange}
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
                          <label htmlFor="car_fuel_type" className="form-label">
                            Fuel type
                          </label>
                          <select
                            className="form-control"
                            name="car_fuel_type"
                            id="car_fuel_type"
                            onChange={handleInputChange}
                            value={inputValues.car_fuel_type}
                          >
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
                            {bodyTypeList.length > 0 &&
                              bodyTypeList.map((body) => (
                                <option key={body.id} value={bodyTypeList.id}>
                                  {body.body_type_name}
                                </option>
                              ))}
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
                            placeholder="RAG400D"
                            name="car_registration_number"
                            value={inputValues.car_registration_number}
                            onChange={handleInputChange}
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
                            value={inputValues.car_control_technique}
                            onChange={handleInputChange}
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
                            type="email"
                            className="form-control"
                            id="seller_email"
                            placeholder="email@myotobox.rw"
                            name="seller_email"
                            value={inputValues.seller_email}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div>
                          <label
                            htmlFor="seller_phone_number"
                            className="form-label"
                          >
                            Cover Image
                          </label>
                          <input
                            type="file"
                            className="form-control"
                            id="cover_image"
                            name="cover_image"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div>
                          <label
                            htmlFor="seller_phone_number"
                            className="form-label"
                          >
                            Car Condition
                          </label>
                          <select
                            className="form-control"
                            name="car_condition"
                            id="car_condition"
                            value={inputValues.car_condition}
                            onChange={handleInputChange}
                          >
                            <option>Select condition</option>
                            <option>Used</option>
                            <option>Brand New</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <img
                          src={`${imageBaseUrl}${cover_image}`}
                          alt="Car Cover Image"
                          width={"100px"}
                        ></img>
                      </div>
                      <div className="col-lg-6">
                        <div>
                          <label
                            htmlFor="seller_phone_number"
                            className="form-label"
                          >
                            Seller Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="car_seller_name"
                            placeholder="Akagera Motors or Private Seller"
                            name="car_seller_name"
                            value={inputValues.car_seller_name}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <Editor
                          apiKey="xnd39f6aiczpogl36kpm15h9cmzy7n4rs3ds86q3jyyu9wm9"
                          onInit={(evt, editor) => (editorRef.current = editor)}
                          initialValue={inputValues.seller_note}
                          name="seller_note"
                          onEditorChange={handleEditorChange}
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
                        <div>
                          <label
                            htmlFor="seller_phone_number"
                            className="form-label"
                          >
                            Standard features
                          </label>
                          <Select
                            name="industry"
                            isMulti
                            options={standaFeaturesOptions}
                            value={addedFeatures}
                            onChange={handleStandardFeatureChange}
                          />
                        </div>
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
                            {car_images.map((image, index) => (
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
                        <div className="added-image-preview">
                          {addedCarImages.map((image, index) => (
                            <div key={index} className="added-image-item">
                              <img
                                src={`${imageBaseUrl}/CarSellImages/${image.image_name}`}
                                alt={`Preview ${index}`}
                              />
                              <button
                                className="btn btn-info text-dark"
                                onClick={() => removeImage(index)}
                              >
                                Remove
                              </button>
                            </div>
                          ))}
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
                              "Update car info"
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

export default AddNewCar;
