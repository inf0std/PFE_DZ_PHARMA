import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import {
  UsersPage,
  LoginPage,
  MedicinesPage,
  Dashboard,
  SinglePharmacyPage,
  SingleUserPage,
  SignupPage,
  HomePage,
  Map,
} from "./pages";
import Profil from "./pages/user/Profil";
import Pharma from "./pages/pharmacies/Pharmacie";
function App() {
  const notify = ({ type, message, delay, callback }) => {
    NotificationManager[type](
      message,
      "",
      delay || 3000,
      callback || (() => {})
    );
  };

  return (
    <BrowserRouter>
      <NotificationContainer />
      <Routes>
        <Route path="/" element={<LoginPage notify={notify} />} />
        <Route path="/Map" element={<Map notify={notify} />} />
        <Route path="/Profil/:id" element={<Profil notify={notify} />} />
        <Route path="/SingleUserPage/:id" component={SingleUserPage} />
        <Route path="/Pharma" element={<Pharma notify={notify} />} />

        <Route path="/signup" element={<SignupPage notify={notify} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
