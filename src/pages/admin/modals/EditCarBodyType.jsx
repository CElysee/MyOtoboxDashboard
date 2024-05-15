import React, { useState, useEffect, useRef } from "react";
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
function AddCarBodyType({ userRefresh, list, showModal }) {
  const [countries, setCountries] = useState("");
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#fff");
  const [updateImage, setUpdateImage] = useState("");
  const dismissButtonRef = useRef();
  const [inputValues, setInputValues] = useState({
    body_type_name: "",
    body_type_image: "",
  });
  const imageBaseUrl = import.meta.env.VITE_REACT_APP_API;

  useEffect(() => {
    if (showModal === true) {
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        body_type_name: list.body_type_name || "",
        body_type_image: list.body_type_image || "",
      }));
    }
  }, [list]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "body_type_image") {
      const selectedFile = e.target.files[0];
      setUpdateImage(selectedFile);
    } else {
      setInputValues({ ...inputValues, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("body_type_name", inputValues.body_type_name);
      formData.append("body_type_image", updateImage);

      console.log(...formData.entries());
      const response = await axiosInstance.put(
        `/car_body_type/update/${list.id}`,
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
      dismissButtonRef.current.click();
      setInputValues({
        body_type_name: "",
        body_type_image: "",
      });
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
        id="editBodyType"
        tabIndex="-1"
        aria-labelledby="editBodyTypeModal"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="editBodyTypeModal">
                Edit {list.body_type_name}
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
                      <label htmlFor="body_type_name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="body_type_name"
                        value={inputValues.body_type_name}
                        placeholder="Enter the name"
                        name="body_type_name"
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-xxl-6">
                    <div>
                      <label htmlFor="body_type_image" className="form-label">
                        Upload Image
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="body_type_image"
                        name="body_type_image"
                        onChange={handleChange}
                      />
                    </div>
                    <img
                      src={`${imageBaseUrl}/BodyTypeImage/${list.body_type_image}`}
                      width={"50px"}
                      style={{ paddingTop: "10px" }}
                    ></img>
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
                          "Edit Body Type"
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

export default AddCarBodyType;
