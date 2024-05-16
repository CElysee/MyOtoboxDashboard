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
function AddNewBrand({ userRefresh }) {
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
      const response = await axiosInstance.post("/car_brand/create", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Submission successful:", response.data);
      // console.log(response.data);
      notify(response.data.message, "success");
      setLoading(false);
      userRefresh(true);
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
      {/* <ToastContainer autoClose={4000} /> */}
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
                                    htmlFor="brand_name"
                                    className="form-label"
                                  >
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
                                  <label
                                    htmlFor="brand_logo"
                                    className="form-label"
                                  >
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
                                  <label
                                    htmlFor="origin_country_id"
                                    className="form-label"
                                  >
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
                                        <option
                                          key={index}
                                          value={country.name}
                                        >
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
                                      "Save new brand"
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
                          <form onSubmit={handleSubmit}>
                            <div className="row g-3">
                              <div className="col-xxl-6">
                                <div>
                                  <label
                                    htmlFor="brand_logo"
                                    className="form-label"
                                  >
                                    Upload Excel File
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
                                  <label
                                    htmlFor="origin_country_id"
                                    className="form-label"
                                  >
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
                                        <option
                                          key={index}
                                          value={country.name}
                                        >
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
                    <div className="tab-pane" id="messages1" role="tabpanel">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <i className="ri-checkbox-multiple-blank-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                          Etsy mixtape wayfarers, ethical wes anderson tofu
                          before they sold out mcsweeney's organic lomo retro
                          fanny pack lo-fi farm-to-table readymade. Messenger
                          bag gentrify pitchfork tattooed craft beer, iphone
                          skateboard locavore carles etsy salvia banksy hoodie
                          helvetica. DIY synth PBR banksy irony.
                          <div className="mt-2">
                            <a
                              href="javascript:void(0);"
                              className="btn btn-sm btn-soft-primary"
                            >
                              Read More{" "}
                              <i className="ri-arrow-right-line ms-1 align-middle"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="tab-pane" id="settings1" role="tabpanel">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <i className="ri-checkbox-multiple-blank-fill text-success"></i>
                        </div>
                        <div className="flex-grow-1 ms-2">
                          when darkness overspreads my eyes, and heaven and
                          earth seem to dwell in my soul and absorb its power,
                          like the form of a beloved mistress, then I often
                          think with longing, Oh, would I could describe these
                          conceptions, could impress upon paper all that is
                          living so full and warm within me, that it might be
                          the.
                          <div className="mt-2">
                            <a
                              href="javascript:void(0);"
                              className="btn btn-sm btn-soft-primary"
                            >
                              Read More{" "}
                              <i className="ri-arrow-right-line ms-1 align-middle"></i>
                            </a>
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
      </div>
    </>
  );
}

export default AddNewBrand;
