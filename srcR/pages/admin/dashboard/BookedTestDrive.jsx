import React from "react";

function BookedTestDrive({ tableRef, bookedTestDrive }) {
  return (
    <div className="row">
      <div className="col-lg-12">
        <div className="card">
          <div className="card-header">
            <h5 className="card-title mb-0">Pending Booked Test Drive</h5>
          </div>
          <div className="card-body">
            <table
              ref={tableRef}
              id="scroll-horizontal"
              className="table nowrap align-middle"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th>No</th>
                  <th>User</th>
                  <th>Car</th>
                  <th>Stock Number</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Phone Number</th>
                  <th>Location</th>
                  <th>Booking Status</th>
                  <th>Create Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bookedTestDrive.length > 0 &&
                  bookedTestDrive.map((testDrive, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {testDrive.user.firstName} {testDrive.user.lastName}
                      </td>
                      <td>
                        {testDrive.car_for_sale.car_year}{" "}
                        {testDrive.car_for_sale.car_name_info}
                      </td>
                      <td>#{testDrive.car_for_sale.stock_number}</td>
                      <td>{testDrive.date}</td>
                      <td>{testDrive.time}</td>
                      <td>{testDrive.phone_number}</td>
                      <td>{testDrive.location_choice}</td>
                      <td>{testDrive.booking_status}</td>
                      <td>{testDrive.created_at}</td>
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookedTestDrive;
