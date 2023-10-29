import React, { useContext } from 'react'
import { Routes, Route } from "react-router-dom";
import { UserContext } from './context/userContext'

import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import InscriptionModal from "./components/InscriptionModal";
import ConnexionModal from "./components/ConnexionModal";
import PrivateHome from "./pages/private/privateHome/PrivateHome";
import Cards from "./pages/private/cards/Cards";
import UserProfile from "./pages/private/userProfile/UserProfile";

function App() {
  const { modalState } = useContext(UserContext)

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/private" element={<Private />}>
          <Route path="/private/privateHome" element={<PrivateHome />} />
          <Route path="/private/userProfile" element={<UserProfile />} />
          <Route path="/private/cards" element={<Cards />} />
        </Route>
      </Routes>
      {/* Les modales sont placées en bas pour que le CSS fonctionne si on utilise le portal pour les gérer */}
      {modalState.signUpModal && <InscriptionModal />}
      {modalState.signInModal && <ConnexionModal />}
    </>
  )
}

export default App
