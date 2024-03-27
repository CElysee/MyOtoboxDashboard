import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

function AddNewCarRent() {
  const [images, setImages] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    // Handle dropped files here
    setImages((prevImages) => [...prevImages, ...acceptedFiles]);
  }, []);

  const removeImage = (indexToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((image, index) => index !== indexToRemove)
    );
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
  });

  return (
    <>
      <div
        className="modal fade fadeInRight"
        id="exampleModalgrid"
        tabIndex="-1"
        aria-labelledby="exampleModalgridLabel"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalgridLabel">
                Add a New Car
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
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="firstName" className="form-label">
                        Car Info(Name)
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="2024 Toyota RAV4 Prime XSE"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="manufactureYear" className="form-label">
                        Manufacture Year
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="manufactureYear"
                        placeholder="2024"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="emailInput" className="form-label">
                        Brand Name
                      </label>
                      <select className="form-control">
                        <option>Select brand</option>
                        <option>Admin</option>
                        <option>user</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="emailInput" className="form-label">
                        Model Name
                      </label>
                      <select className="form-control">
                        <option>Select model</option>
                        <option>Admin</option>
                        <option>user</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="emailInput" className="form-label">
                        Trim Name
                      </label>
                      <select className="form-control">
                        <option>Select model</option>
                        <option>Admin</option>
                        <option>user</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="firstName" className="form-label">
                        Price - Inside KGL( 15,000)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        placeholder="15000"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="firstName" className="form-label">
                        Price - Outside KGL( 400,000)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        placeholder="400000"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="firstName" className="form-label">
                        Kilometers/Mileage
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        placeholder="15000"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="VinNumber" className="form-label">
                        Vin/Chassic Number
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="VinNumber"
                        placeholder="1C4RJFBG0LC218153"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="Transmission" className="form-label">
                        Transmission
                      </label>
                      <select className="form-control">
                        <option>Select transmission</option>
                        <option>Manual Transmission</option>
                        <option>Automatic Transmission</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="Drivetrain" className="form-label">
                        Drivetrain
                      </label>
                      <select className="form-control">
                        <option>Select model</option>
                        <option>4WD/AWD</option>
                        <option>RWD</option>
                        <option>FWD</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="FuelType" className="form-label">
                        Fuel type
                      </label>
                      <select className="form-control">
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
                      <label htmlFor="fuelConsumption" className="form-label">
                        Fuel Consumption
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="fuelConsumption"
                        placeholder="18km/L city / 25km/L highway"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="engineCapacity" className="form-label">
                        Engine Capacity
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="engineCapacity"
                        placeholder="3.6L V-6 Gas"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="interiorColor" className="form-label">
                        Interior Color
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="interiorColor"
                        placeholder="Black"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="exteriorColor" className="form-label">
                        Exterior Color
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exteriorColor"
                        placeholder="Black"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="FuelType" className="form-label">
                        Body Type
                      </label>
                      <select className="form-control">
                        <option>Select body type</option>
                        <option>SUV</option>
                        <option>Coupe</option>
                        <option>Sedan</option>
                        <option>Crossover</option>
                        <option>Sedan</option>
                        <option>Hard Top Convertible</option>
                        <option>Pick Up Truck</option>
                        <option>Hatchback</option>
                        <option>Van</option>
                        <option>Wagon</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="exteriorColor" className="form-label">
                        Location
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="exteriorColor"
                        placeholder="KK 215st, Kicukiro"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="rentingPeriodMin" className="form-label">
                        Renting Period Min (Days)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="rentingPeriodMin"
                        placeholder="5"
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div>
                      <label htmlFor="rentingPeriodMax" className="form-label">
                        Renting Period Max (Days)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="rentingPeriodMax"
                        placeholder="100"
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
                        {images.map((image, index) => (
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

export default AddNewCarRent;
