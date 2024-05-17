import React, { useEffect, useState, useRef } from "react";
import TopMenu from "../TopMenu";
import SideMenu from "../SideMenu";
import { useSelector } from "react-redux";
import axiosInstance from "../../../utils/AxiosInstance";
import { formatAmount, formatNumber } from "../../../utils/Helpers";
import $ from "jquery"; // Import jQuery
import "datatables.net"; // Import DataTables library
import "datatables.net-bs5"; // Import DataTables Bootstrap 5 integration
import "datatables.net-buttons"; // Import DataTables Buttons
import "datatables.net-buttons-bs5"; // Import DataTables Buttons Bootstrap 5 integration
import "datatables.net-buttons/js/buttons.html5.min"; // HTML5 export button
import "datatables.net-buttons/js/buttons.print.min"; // Print button
import "datatables.net-buttons/js/buttons.colVis.min"; // Column visibility button
import "jszip/dist/jszip"; // JSZip for Excel export
import "datatables.net-buttons/js/buttons.flash.min"; // Flash export (optional)
import "datatables.net-buttons-bs5/css/buttons.bootstrap5.min.css"; // Buttons Bootstrap 5 CSS
import Greetings from "../../../components/greetings/Greetings";
import ContentLoader from "react-content-loader";
import DashboardStats from "./DashboardStats";
import Revenues from "./Revenues";
import BookedTestDrive from "./BookedTestDrive";
import ImportOnOrder from "./ImportOnOrder";
import Footer from "../../../components/footer/Footer";

function Dashboard() {
  const greeting = useSelector((state) => state.greeting);
  const [dashboardStats, setDashboardStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [bookedTestDrive, setBookedTestDrive] = useState([]); // Add this line
  const [importOnOrder, setImportOnOrder] = useState([]); // Add this line
  const tableRef = useRef(null);
  const importOnOrderRef = useRef(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await axiosInstance.get(
          "/dashboard-stats/get-vehicle-count"
        );
        const booked_test_drive = await axiosInstance.get(
          "/dashboard-stats/get-vehicle-count"
        );
        setDashboardStats(response.data);
        setBookedTestDrive(booked_test_drive.data.pending_booked_test_drive);
        setImportOnOrder(booked_test_drive.data.pending_import_orders);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchDashboardStats();
  }, []);
  useEffect(() => {
    const table = $(!isLoading && tableRef.current).DataTable({
      dom: "lBfrtip", // 'l' for length menu (entries per page dropdown)
      scrollX: true,
      buttons: [
        "excelHtml5", // Excel export button
        "csvHtml5", // CSV export button
        // 'pdfHtml5', // PDF export button
        // 'print', // Print button
      ],
      lengthMenu: [10, 25, 50, 100], // Entries per page options
      pageLength: 10, // Initial entries per page
      // Other DataTables configurations
    });
    return () => {
      table.destroy(); // Clean up DataTable when component unmounts
    };
  }, [isLoading]);
  useEffect(() => {
    const tableImportOnOrders = $(
      !isLoading && importOnOrderRef.current
    ).DataTable({
      dom: "lBfrtip", // 'l' for length menu (entries per page dropdown)
      scrollX: true,
      buttons: [
        "excelHtml5", // Excel export button
        "csvHtml5", // CSV export button
        // 'pdfHtml5', // PDF export button
        // 'print', // Print button
      ],
      lengthMenu: [10, 25, 50, 100], // Entries per page options
      pageLength: 10, // Initial entries per page
      // Other DataTables configurations
    });
    return () => {
      tableImportOnOrders.destroy(); // Clean up DataTable when component unmounts
    };
  }, [isLoading]);
  return (
    <div id="layout-wrapper">
      <TopMenu />
      <SideMenu />
      <div className="main-content">
        <div className="page-content">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                {isLoading ? (
                  <div>
                    <ContentLoader
                      style={{ width: "50%", height: "500px", padding: "10px" }}
                      speed={1}
                      backgroundColor="#eee"
                      foregroundColor="#e8e7e7"
                    >
                      <rect x="2" y="4" rx="8" ry="8" width="70" height="20" />
                      <rect
                        x="100"
                        y="4"
                        rx="8"
                        ry="8"
                        width="60"
                        height="20"
                      />
                      <rect
                        x="0"
                        y="40"
                        rx="5"
                        ry="5"
                        width="650"
                        height="415"
                      />
                    </ContentLoader>
                    <ContentLoader
                      style={{ width: "50%", height: "500px", padding: "10px" }}
                      speed={1}
                      backgroundColor="#eee"
                      foregroundColor="#e8e7e7"
                    >
                      <rect x="2" y="4" rx="8" ry="8" width="70" height="20" />
                      <rect
                        x="100"
                        y="4"
                        rx="8"
                        ry="8"
                        width="60"
                        height="20"
                      />
                      <rect
                        x="0"
                        y="40"
                        rx="5"
                        ry="5"
                        width="650"
                        height="415"
                      />
                    </ContentLoader>
                  </div>
                ) : (
                  <div className="h-100">
                    <Greetings />
                    <DashboardStats dashboardStats={dashboardStats} />
                    {/* <Revenues /> */}
                    <BookedTestDrive
                      tableRef={tableRef}
                      bookedTestDrive={bookedTestDrive}
                    />
                    <ImportOnOrder
                      importOnOrderRef={importOnOrderRef}
                      importOnOrder={importOnOrder}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Dashboard;
