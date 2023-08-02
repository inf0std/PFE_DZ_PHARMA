import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import {
  UsersPage,
  LoginPage,
  PharmaciesPage,
  MedicinesPage,
  Dashboard,
  SinglePharmacyPage,
  SingleUserPage,
  SignupPage,
  HomePage,
} from "./pages";
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
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<LoginPage notify={notify} />} />
        <Route path="/signup" element={<SignupPage notify={notify} />} />
        <Route path="/dashboard" element={<Dashboard notify={notify} />}>
          <Route path="" exact element={<></>} />
          <Route
            path="pharmacies"
            exact
            element={<PharmaciesPage notify={notify} />}
          />
          <Route
            path="pharmacies/{id}"
            element={<SinglePharmacyPage notify={notify} />}
          />
          <Route path="users" exact element={<UsersPage notify={notify} />} />
          <Route
            path="users/{id}"
            element={<SingleUserPage notify={notify} />}
          />
          <Route path="medicines" element={<MedicinesPage notify={notify} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
