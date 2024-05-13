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
function ImportOnOrderUpdate({ userRefresh, showModal, order }) {
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("#fff");
  const dismissButtonRef = useRef();
  const [inputValues, setInputValues] = useState({
    order_id: "",
    order_status: "",
  });

  useEffect(() => {
    if (showModal === true) {
      setInputValues((prevInputValues) => ({
        ...prevInputValues,
        order_id: order.id || "",
        order_status: order.order_status || "",
      }));
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log(inputValues);
      const response = await axiosInstance.put(
        `/import-on-order/update/${inputValues.order_id}`,
        inputValues,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
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
      <ToastContainer autoClose={5000} />
      <div
        className="modal fade fadeInRight"
        id="importOnOrderUpdate"
        tabIndex="-1"
        aria-labelledby="importOnOrderUpdateLabel"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {showModal && (
              <>
                <div className="modal-header">
                  <h5 className="modal-title" id="importOnOrderUpdateLabel">
                    Edit Order Status for {order.user.firstName}{" "}
                    {order.user.lastName} - {order.car_brand.name} -
                    {order.car_model.brand_model_name} -{" "}
                    {order.car_trim.trim_name}
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
                      <div className="col-md-12">
                        <div>
                          <label htmlFor="brand_name" className="form-label">
                            Order Status
                          </label>
                          <select
                            className="form-control"
                            value={inputValues.order_status}
                            name="order_status"
                            required
                            onChange={handleChange}
                          >
                            <option>Select status</option>
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Canceled">Canceled</option>
                            <option value="Completed">Completed</option>
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
                              "Update Order Status"
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

export default ImportOnOrderUpdate;
