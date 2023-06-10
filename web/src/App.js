import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="world"
          element={
            <div>
              <p>hello world</p>
              <Outlet />
            </div>
          }
        >
          <Route path="faicel" element={<p>faicel</p>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
