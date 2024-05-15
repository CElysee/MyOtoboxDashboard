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
  const [inputValue, setInputValue] = useState([
    {
      feature_name: "",
    },
  ]);

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
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  {inputValue.map((item, index) => (
                    <div className="col-lg-12" key={index}>
                      <div>
                        <label htmlFor="feature_name" className="form-label">
                          Feature Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="feature_name"
                          name="feature_name"
                          value={inputValue[index].feature_name}
                          placeholder="Feature Name"
                          onChange={(e) => handleInputChange(e, index)}
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
      </div>
    </>
  );
}

export default AddNewStandardFeature;
