import { Container } from "react-bootstrap";
import DashNavbar from "./components/navbar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <Container fluid>
      <DashNavbar />
      <Outlet />
    </Container>
  );
};

export default Dashboard;
