import React from "react"
import { Routes, Route } from "react-router-dom"
import Login from "../pages/auth/Login"
import AdminDashboard from "../pages/admin/Dashboard"
import AdminUsers from "../pages/admin/AdminUsers"
import AllUsers from "../pages/admin/AllUsers"
import CarBrands from "../pages/admin/CarBrands"
import CarModels from "../pages/admin/CarModels"
import CarStandardFeature from "../pages/admin/CarStandardFeature"
import CarTrims from "../pages/admin/CarTrims"
import CarsForSell from "../pages/admin/CarsForSell"
import CarsForRent from "../pages/admin/CarsForRent"

function Router() {
  return (
    <Routes>
      <Route path="/" element={<AdminDashboard />} />
      <Route path="/AdminUsers" element={<AdminUsers />} />
      <Route path="/AllUsers" element={<AllUsers />} />
      <Route path="/CarBrands" element={<CarBrands />} />
      <Route path="/CarModels" element={<CarModels />} />
      <Route path="/CarStandardFeature" element={<CarStandardFeature />} />
      <Route path="/CarTrims" element={<CarTrims />} />
      <Route path="/CarsForSell" element={<CarsForSell />} />
      <Route path="/CarsForRent" element={<CarsForRent />} />
    </Routes>
  )
}
export default Router