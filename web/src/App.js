import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import {
  UsersPage,
  LoginPage,
  PharmaciesPage,
  MedicinesPage,
  Dashboard,
  SinglePharmacyPage,
  SingleUserPage,
} from "./pages";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" exact element={<></>} />
          <Route path="pharmacies" exact element={<PharmaciesPage />} />
          <Route path="pharmacies/{id}" element={<SinglePharmacyPage />} />
          <Route path="users" exact element={<UsersPage />} />
          <Route path="users/{id}" element={<SingleUserPage />} />
          <Route path="medicies" element={<MedicinesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
