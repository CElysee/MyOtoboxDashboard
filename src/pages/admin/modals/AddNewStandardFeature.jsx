import React, { useState } from "react";

function AddNewStandardFeature() {
  const [viewPassword, setViewPassword] = useState(false);
  const togglePassword = () => {
    setViewPassword(!viewPassword);
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
              <form action="javascript:void(0);">
                <div className="row g-3">
                  <div className="col-xxl-6">
                    <div>
                      <label htmlFor="firstName" className="form-label">
                        Feature Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="Enter firstname"
                      />
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
                        Save
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
