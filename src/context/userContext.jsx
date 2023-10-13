import { createContext, useState, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import { auth } from "../firebase-config"

export const UserContext = createContext()

export function UserContextProvider(props) {

    const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd)
    const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd)

    const [currentUser, setCurrentUser] = useState();
    const [modalState, setModalState] = useState({
        signUpModal: false,
        signInModal: false
    })

    const toggleModals = modal => {
        switch (modal) {
            case "signUp":
                setModalState({
                    signUpModal: true,
                    signInModal: false
                })
                break;
            case "signIn":
                setModalState({
                    signUpModal: false,
                    signInModal: true
                })
                break;
            case "close":
                setModalState({
                    signUpModal: false,
                    signInModal: false
                })
                break;
        }
    }

    return (
        <UserContext.Provider value={{ signUp, signIn, currentUser, toggleModals, modalState }}>
            {props.children}
        </UserContext.Provider>
    )
}