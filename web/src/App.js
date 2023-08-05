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
          <Route
            exact
            path="pharmacies"
            element={<PharmaciesPage notify={notify} />}
          >
            <Route
              exact
              path="create"
              element={<CreatePharmacy notify={notify} />}
            />
            <Route
              path="edit/{id}"
              element={<EditPharmacy notify={notify} />}
            />
            <Route
              exact
              path="{id}"
              element={<SinglePharmacyPage notify={notify} />}
            />
          </Route>

          <Route path="users" exact element={<UsersPage notify={notify} />}>
            <Route path="{id}" element={<SingleUserPage notify={notify} />} />
            <Route
              exact
              path="create"
              element={<CreateUser notify={notify} />}
            />
            <Route path="edit/{id}" element={<EditUser notify={notify} />} />
          </Route>

          <Route path="medicines" element={<MedicinesPage notify={notify} />}>
            <Route
              exact
              path="create"
              element={<CreateMedicine notify={notify} />}
            />
            <Route
              path="edit/{id}"
              element={<EditMedicine notify={notify} />}
            />
            <Route path="{id}" element={<SingleMedicine notify={notify} />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
