import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import UsersPage from "./pages/users";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UsersPage />}>
          {/* 
          <Route path="faicel" element={<p>faicel</p>} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
