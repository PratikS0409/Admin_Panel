import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./css/Style.css";
import "./charts/ChartjsConfig";

// Import pages
import Dashboard from "./pages/Dashboard";
import DashboardCardUser from "./pages/DashboardCardUser";
import FindUser from "./pages/FindUser";
import Advertisement from "./pages/Advertisement";
import Banner from "./pages/Banner";
import Offers from "./pages/Offers";
import Games from "./pages/Games";
import ContestList from "./pages/ContestList";
import Assets from "./pages/Assets";
import GameData from "./pages/GameData";
import Amount from "./pages/Amount";
import Trans from "./pages/Trans";
import AppData from "./pages/AppData";
import WithdrawList from "./pages/withdrawList";
import Kyc from "./pages/Kyc";
import UserKycData from "./pages/userKycData";
import Question from "./pages/Question";
import ChatBox from "./pages/ChatBox";
import UserDetails from "./pages/UserDeatils";
import TransactionHistory from "./pages/transactionHistory";
import WithdrawHistory from "./pages/withdrawHistory";
import Profile from "./pages/Profile";
import ProtectedRoute from "../ProtectedRoute";
function App() {
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <Routes>
        <Route exact path="/" element={<DashboardCardUser />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["admin", "accountant", "agent"]}>
              <FindUser />
            </ProtectedRoute>
          }
        />

        <Route
          path="/advertisement"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Advertisement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/banner"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Banner />
            </ProtectedRoute>
          }
        />

        <Route
          path="/offers"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Offers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/games"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Games />
            </ProtectedRoute>
          }
        />

        <Route
          path="/contestList"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <ContestList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/assets"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Assets />
            </ProtectedRoute>
          }
        />

        <Route
          path="/gameData"
          element={
            <ProtectedRoute allowedRoles={["admin", "agent", "accountant"]}>
              <GameData />
            </ProtectedRoute>
          }
        />

        <Route
          path="/amount"
          element={
            <ProtectedRoute allowedRoles={["admin", "accountant"]}>
              <Amount />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trans"
          element={
            <ProtectedRoute allowedRoles={["admin", "accountant"]}>
              <Trans />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appdata"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AppData />
            </ProtectedRoute>
          }
        />

        <Route
          path="/withdrawList"
          element={
            <ProtectedRoute allowedRoles={["admin", "agent", "accountant"]}>
              <WithdrawList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/kyc"
          element={
            <ProtectedRoute allowedRoles={["admin", "agent", "accountant"]}>
              <Kyc />
            </ProtectedRoute>
          }
        />

        <Route
          path="/userKycData"
          element={
            <ProtectedRoute allowedRoles={["admin", "agent"]}>
              <UserKycData />
            </ProtectedRoute>
          }
        />

        <Route
          path="/question"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <Question />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chatbox"
          element={
            <ProtectedRoute allowedRoles={["admin", "agent"]}>
              <ChatBox />
            </ProtectedRoute>
          }
        />

        <Route
          path="/userDetails"
          element={
            <ProtectedRoute allowedRoles={["admin", "agent", "accountant"]}>
              <UserDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/transactionHistory"
          element={
            <ProtectedRoute allowedRoles={["admin", "agent", "accountant"]}>
              <TransactionHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/withdrawHistory"
          element={
            <ProtectedRoute allowedRoles={["admin", "agent", "accountant"]}>
              <WithdrawHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute allowedRoles={["admin", "agent", "accountant"]}>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
