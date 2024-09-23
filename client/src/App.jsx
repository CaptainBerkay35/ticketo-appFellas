import "./App.css";
import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./contexts/UserContext";
import AccountPage from "./pages/AccountPage";
import DiscoverPage from "./pages/DiscoverPage";
import { DestinationProvider } from "./contexts/DestinationContext";
import { AirlineProvider } from "./contexts/AirlineContext";

axios.defaults.baseURL = "http://localhost:4000";
axios.defaults.withCredentials = true;

function App() {
  return (
    <UserContextProvider>
      <DestinationProvider>
        <AirlineProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<IndexPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/account/:subpage?" element={<AccountPage />} />
              <Route path="/discover/:subpage?" element={<DiscoverPage />} />
            </Route>
          </Routes>
        </AirlineProvider>
      </DestinationProvider>
    </UserContextProvider>
  );
}

export default App;
