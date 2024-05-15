import React, { useState } from "react";

function ImportOnOrder({ importOnOrderRef, importOnOrder }) {
  const [orderNote, setOrderNote] = useState("");
  const handleOrderNote = (note) => {
    setOrderNote(note);
  };
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">Pending Import On Orders</h5>
          </div>
          <div className="card-body">
            <table
              ref={importOnOrderRef}
              id="scroll-horizontal"
              className="table nowrap align-middle"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th>No</th>
                  <th>User</th>
                  <th>Car</th>
                  <th>Budget</th>
                  <th>Fuel Type</th>
                  <th>Transmission</th>
                  <th>Year</th>
                  <th>Kilometers</th>
                  <th>Color</th>
                  <th>Note</th>
                  <th>Create Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {importOnOrder.length > 0 &&
                  importOnOrder.map((order, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {order.user.firstName} {order.user.lastName}
                      </td>
                      <td>
                        {order.car_brand.name} -
                        {order.car_model.brand_model_name} -{" "}
                        {order.car_trim.trim_name}
                      </td>
                      <td>#{order.price_range}</td>
                      <td>{order.fuel_type}</td>
                      <td>{order.transmission_type}</td>
                      <td>
                        {order.manufacture_year_from} -{" "}
                        {order.manufacture_year_to}{" "}
                      </td>
                      <td>
                        {order.kilometers_from} - {order.kilometers_to}{" "}
                      </td>
                      <td>{order.car_color}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdrop"
                          onClick={() => handleOrderNote(order.order_note)}
                        >
                          View Note
                        </button>
                      </td>
                      <td>{order.created_at}</td>
                      <td>
                        <div className="dropdown d-inline-block">
                          <button
                            className="btn btn-soft-secondary btn-sm dropdown"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i className="ri-more-fill align-middle"></i>
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                              <button
                                className="dropdown-item edit-item-btn"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#editCarBrandModal"
                              >
                                <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                                Edit
                              </button>
                            </li>
                            <li>
                              <button className="dropdown-item remove-item-btn">
                                <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                                Delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <div
              className="modal fade"
              id="staticBackdrop"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-body text-center p-5">
                    <lord-icon
                      src="https://cdn.lordicon.com/lupuorrc.json"
                      trigger="loop"
                      colors="primary:#121331,secondary:#08a88a"
                      style={{ width: "120px", height: "120px" }}
                    ></lord-icon>

                    <div className="mt-4">
                      <h4 className="mb-3">Order Note</h4>
                      <p className="text-muted mb-4">
                        {orderNote === "" ? (
                          "No note"
                        ) : (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: orderNote,
                            }}
                          />
                        )}
                      </p>
                      <div className="hstack gap-2 justify-content-center">
                        <a
                          className="btn btn-link link-success fw-medium"
                          data-bs-dismiss="modal"
                        >
                          <i className="ri-close-line me-1 align-middle"></i>{" "}
                          Close
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
  );
}

export default ImportOnOrder;
