import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import AdminDashboard from "../pages/admin/dashboard/Dashboard";
import AdminUsers from "../pages/admin/users/AdminUsers";
import AllUsers from "../pages/admin/users/AllUsers";
import CarBrands from "../pages/admin/carConfigutations/CarBrands";
import CarModels from "../pages/admin/carConfigutations/CarModels";
import CarStandardFeature from "../pages/admin/carConfigutations/CarStandardFeature";
import CarTrims from "../pages/admin/carConfigutations/CarTrims";
import CarsForSell from "../pages/admin/CarsForSell";
import CarsForRent from "../pages/admin/CarsForRent";
import CarBodyType from "../pages/admin/carConfigutations/CarBodyType";
import Home from "../pages/Home";
import PrivateRoutes from "../utils/PrivateRoutes";
import NotFound from "../pages/notFound/NotFound";
import BookedTestDriveSell from "../pages/admin/bookedTestDriveSell/BookedTestDriveSell";
import ImportOnOrderUpdate from "../pages/admin/importOnOrder/ImportOnOrder";
import TaxCalculator from "../pages/admin/taxCalculator/TaxCalculator";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/*" element={<PrivateRoutes />}>
        <Route index element={<AdminDashboard />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users_admin" element={<AdminUsers />} />
        <Route path="all_users" element={<AllUsers />} />
        <Route path="car_brands" element={<CarBrands />} />
        <Route path="car_models" element={<CarModels />} />
        <Route path="car_standard_feature" element={<CarStandardFeature />} />
        <Route path="car_trims" element={<CarTrims />} />
        <Route path="car_body_type" element={<CarBodyType />} />
        <Route path="cars_for_sell" element={<CarsForSell />} />
        <Route path="cars_for_rent" element={<CarsForRent />} />
        <Route
          path="booked_test_drive_sell"
          element={<BookedTestDriveSell />}
        />
        <Route path="import_on_order" element={<ImportOnOrderUpdate />} />
        <Route path="tax_calculator" element={<TaxCalculator />} />
      </Route>
      <Route path="*" element={<NotFound />} /> {/* 404 route */}
    </Routes>
  );
}
export default Router;
