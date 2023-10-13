import { Routes, Route } from "react-router-dom";
import React, { useContext } from 'react'
import { UserContext } from './context/userContext'
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import InscriptionModal from "./components/InscriptionModal";

function App() {
  const { modalState } = useContext(UserContext)

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      {/* Les modales sont placées en bas pour que le CSS fonctionne si on utilise le portal pour les gérer */}
      {modalState.signUpModal &&
        <InscriptionModal></InscriptionModal>
      }
    </>
  )
}

export default App
