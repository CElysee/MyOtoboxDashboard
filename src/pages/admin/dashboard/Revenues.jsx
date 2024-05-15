import React from "react";

function Revenues() {
  return (
    <div className="row">
      <div className="col-xl-12">
        <div className="card">
          <div className="card-header border-0 align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1">Revenue</h4>
            <div>
              <button type="button" className="btn btn-soft-secondary btn-sm">
                ALL
              </button>
              <button type="button" className="btn btn-soft-secondary btn-sm">
                1M
              </button>
              <button type="button" className="btn btn-soft-secondary btn-sm">
                6M
              </button>
              <button type="button" className="btn btn-soft-primary btn-sm">
                1Y
              </button>
            </div>
          </div>

          <div className="card-header p-0 border-0 bg-light-subtle">
            <div className="row g-0 text-center">
              <div className="col-6 col-sm-3">
                <div className="p-3 border border-dashed border-start-0">
                  <h5 className="mb-1">
                    <span className="counter-value" data-target="7585">
                      0
                    </span>
                  </h5>
                  <p className="text-muted mb-0">Orders</p>
                </div>
              </div>

              <div className="col-6 col-sm-3">
                <div className="p-3 border border-dashed border-start-0">
                  <h5 className="mb-1">
                    $
                    <span className="counter-value" data-target="22.89">
                      0
                    </span>
                    k
                  </h5>
                  <p className="text-muted mb-0">Earnings</p>
                </div>
              </div>

              <div className="col-6 col-sm-3">
                <div className="p-3 border border-dashed border-start-0">
                  <h5 className="mb-1">
                    <span className="counter-value" data-target="367">
                      0
                    </span>
                  </h5>
                  <p className="text-muted mb-0">Refunds</p>
                </div>
              </div>

              <div className="col-6 col-sm-3">
                <div className="p-3 border border-dashed border-start-0 border-end-0">
                  <h5 className="mb-1 text-success">
                    <span className="counter-value" data-target="18.92">
                      0
                    </span>
                    %
                  </h5>
                  <p className="text-muted mb-0">Conversation Ratio</p>
                </div>
              </div>
            </div>
          </div>

          <div className="card-body p-0 pb-2">
            <div className="w-100">
              <div
                id="customer_impression_charts"
                data-colors='["--vz-info", "--vz-primary", "--vz-danger"]'
                className="apex-charts"
                dir="ltr"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Revenues;
