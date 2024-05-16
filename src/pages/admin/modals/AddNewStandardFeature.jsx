import React, { useState, useRef } from "react";
import axiosInstance from "../../../utils/AxiosInstance";
import RiseLoader from "react-spinners/RiseLoader";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "#e55812",
  paddingRight: "10px",
};
function AddNewStandardFeature({ userRefresh }) {
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#fff");
  const dismissButtonRef = useRef();
  const [error, setError] = useState(null)
  const [inputValue, setInputValue] = useState([
    {
      feature_name: "",
    },
  ]);
  const [featureExcel, setFeatureExcel] = useState(null);

  const addItemList = () => {
    setInputValue([...inputValue, { feature_name: "" }]);
  };

  const removeItemList = (index) => {
    const list = [...inputValue];
    list.splice(index, 1);
    setInputValue(list);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputValue];
    list[index][name] = value;
    setInputValue(list);
  };
  const handleInputExcelChange = (e) => {
    setFeatureExcel(e.target.files[0]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.log(inputValue);
    try {
      const response = await axiosInstance.post(
        "/car_standard_features/create",
        { features: inputValue }
      );
      // console.log(response.data);
      notify(response.data.message, "success");
      setLoading(false);
      userRefresh(true);
      dismissButtonRef.current.click();
    } catch (error) {
      console.log("Error adding new standard feature", error);
    }
  };

  const handleExcelUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", featureExcel);
    // console.log(...formData.entries());
    try {
      const response = await axiosInstance.post(
        "/car_standard_features/create_excel",
        formData
      );
      console.log(response.data);
      notify(response.data.message, "success");
      setLoading(false);
      userRefresh(true);
      dismissButtonRef.current.click();
      setError(null)
    } catch (error) {
      console.log("Error adding new standard feature", error);
      setError(error.message)
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
                Add New Standard Feature
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
                              {inputValue.map((item, index) => (
                                <div className="col-lg-12" key={index}>
                                  <div>
                                    <label
                                      htmlFor="feature_name"
                                      className="form-label"
                                    >
                                      Feature Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="feature_name"
                                      name="feature_name"
                                      value={inputValue[index].feature_name}
                                      placeholder="Feature Name"
                                      onChange={(e) =>
                                        handleInputChange(e, index)
                                      }
                                    />
                                  </div>
                                  <div
                                    className="py-2"
                                    style={{ display: "flex", gap: "10px" }}
                                  >
                                    {inputValue.length > 1 ? (
                                      <button
                                        type="button"
                                        onClick={() => removeItemList(index)}
                                        className="btn btn-dark"
                                      >
                                        -
                                      </button>
                                    ) : null}

                                    {inputValue.length - 1 === index ? (
                                      <button
                                        type="button"
                                        onClick={addItemList}
                                        className="btn btn-soft-info"
                                      >
                                        +
                                      </button>
                                    ) : null}
                                  </div>
                                </div>
                              ))}

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
                                      "Add new feautures"
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
                          <form onSubmit={handleExcelUpload}>
                            <div className="row g-3">
                              <div className="col-xxl-6">
                                <div>
                                  <label
                                    htmlFor="feature_excel"
                                    className="form-label"
                                  >
                                    Upload Excel File
                                  </label>
                                  <input
                                    className="form-control"
                                    type="file"
                                    id="feature_excel"
                                    name="feature_excel"
                                    onChange={handleInputExcelChange}
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
                                      "Upload Excel File"
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

export default AddNewStandardFeature;
