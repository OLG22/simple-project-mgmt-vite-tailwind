import React, { useContext } from 'react'
import { Routes, Route } from "react-router-dom";
import { UserContext } from './context/userContext'

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import SignUpModal from "./components/SignUpModal";
import SignInModal from "./components/SignInModal";
import ForgotPasswordModal from "./components/ForgotPasswordModal";
import Private from "./pages/private/Private";
import PrivateHome from "./pages/private/privateHome/PrivateHome";
import Cards from "./pages/private/cards/Cards";
import UserProfile from "./pages/private/userProfile/UserProfile";
import UserDashboard from "./pages/private/userProfile/UserDashboard";
import AddCard from './pages/private/cards/AddCard';

export default function App() {
  const { modalState } = useContext(UserContext)

  return (
    <>
      <Navbar />
      {/* <Sidebar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="pages/private" element={<Private />}>
          <Route path="privateHome" element={<PrivateHome />} />
          <Route path="cards" element={<Cards />} />
          <Route path="addCard" element={<AddCard />} />
          <Route path="userProfile" element={<UserProfile />} />
          <Route path="userDashboard" element={<UserDashboard />} />
        </Route>
      </Routes>
      {/* Les modales sont placées en bas pour que le CSS fonctionne si on utilise le portal pour les gérer */}
      {modalState.signUpModal && <SignUpModal />}
      {modalState.signInModal && <SignInModal />}
      {modalState.forgotPwdModal && <ForgotPasswordModal />}
    </>
  )
}