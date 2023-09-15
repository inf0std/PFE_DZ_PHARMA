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
  PharmaciesPage,
  ProfilePage,
} from "./pages";
//import Profil from "./pages/user/Profil";
import Pharma from "./pages/pharmacies/Pharmacie";
import CreatePharmacyModal from "./pages/profile/components/createPharmacy";
import AddStockModal from "./pages/profile/components/AddStockModal";
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
        <Route path="/dashboard" element={<Dashboard notify={notify} />}>
          <Route
            path="pharmacies"
            element={<PharmaciesPage notify={notify} />}
          />
          <Route path="medicines" element={<MedicinesPage notify={notify} />} />
        </Route>
        <Route path="/login" element={<LoginPage notify={notify} />} />
        <Route path="/Map" element={<Map notify={notify} />} />
        <Route path="/Profile" element={<ProfilePage notify={notify} />} />
        <Route path="/SingleUserPage/:id" component={SingleUserPage} />
        <Route path="/Parma" element={<Pharma notify={notify} />} />
        <Route path="/" element={<CreatePharmacyModal />} />
        <Route
          path="test"
          element={<AddStockModal notify={notify} close={() => {}} />}
          // element={<CreatePharmacyModal notify={notify} close={() => {}} />}
        />
        <Route path="/signup" element={<SignupPage notify={notify} />} />
        <Route
          path="/pharmapage"
          element={<PharmaciesPage notify={notify} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
