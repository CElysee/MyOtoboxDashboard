import React, { useState, useRef, useEffect } from "react";
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
function EditStandardFeature({ userRefresh, showModal, carFeature }) {
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#fff");
  const dismissButtonRef = useRef();
  const [feature_name, setFeatureName] = useState("");

  useEffect(() => {
    if (showModal === true) {
      setFeatureName(carFeature.feature_name);
    }
  }, [carFeature]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeatureName(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.put(
        `/car_standard_features/update/${carFeature.id}`,
        {
          feature_name: feature_name,
        }
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
        id="editCarFeatureModal"
        tabIndex="-1"
        aria-labelledby="editCarFeatureModalLabel"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {showModal && (
              <>
                <div className="modal-header">
                  <h5 className="modal-title" id="editCarFeatureModalLabel">
                    Edit Standard Feature - {carFeature.feature_name}
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
                      <div className="col-lg-12">
                        <div>
                          <label htmlFor="feature_name" className="form-label">
                            Feature Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="feature_name"
                            name="feature_name"
                            value={feature_name}
                            placeholder="Feature Name"
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
                              "Update feauture"
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

export default EditStandardFeature;
