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
function AddNewBrand({userRefresh}) {
  const [countries, setCountries] = useState("");
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#fff");
  const dismissButtonRef = useRef();
  const [inputValues, setInputValues] = useState({
    brand_name: "",
    brand_logo: "",
    origin_country_id: "",
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axiosInstance.get("/country/list");
        setCountries(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCountries();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "brand_logo") {
      const selectedFile = e.target.files[0];
      setInputValues({ ...inputValues, brand_logo: selectedFile });
    } else {
      setInputValues({ ...inputValues, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("brand_name", inputValues.brand_name);
      formData.append("country_id", inputValues.origin_country_id);
      formData.append("brand_logo", inputValues.brand_logo);

      console.log(...formData.entries());
      try {
        const response = await axiosInstance.post(
          "/car_brand/create",
          formData,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Submission successful:", response.data);
        // console.log(response.data);
        notify(response.data.message, "success");
        setLoading(false);
        userRefresh(true);
      } catch (error) {
        console.error("Submission failed:", error);
      }

      dismissButtonRef.current.click();
    } catch (error) {
      console.error("Error:", error);
      notify(error.data.message, "error");
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
      <ToastContainer autoClose={false} />
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
                Add New Brand
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
                      <label htmlFor="brand_name" className="form-label">
                        Brand Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="brand_name"
                        value={inputValues.brand_name}
                        placeholder="Enter firstname"
                        name="brand_name"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xxl-6">
                    <div>
                      <label htmlFor="brand_logo" className="form-label">
                        Upload Brand Logo
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="brand_logo"
                        name="brand_logo"
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-xxl-6">
                    <div className="mb-3">
                      <label htmlFor="origin_country_id" className="form-label">
                        Origin Country
                      </label>
                      <select
                        className="form-control"
                        value={inputValues.origin_country_id}
                        name="origin_country_id"
                        required
                        onChange={handleChange}
                      >
                        <option>Select country</option>
                        {countries &&
                          countries.map((country, index) => (
                            <option key={index} value={country.name}>
                              {country.name}
                            </option>
                          ))}
                      </select>
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
                          "Save"
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

export default AddNewBrand;
