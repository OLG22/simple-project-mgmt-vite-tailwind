import { createContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth"
import { auth } from "../firebase-config"
import { useNavigate } from 'react-router-dom'

export const UserContext = createContext()

export function UserContextProvider(props) {

    const [currentUser, setCurrentUser] = useState();
    const [persistenceMode, setPersistenceMode] = useState(false);
    const [loadingData, setLoadingData] = useState(true);

    const togglePersistenceMode = () => {
        setPersistenceMode(!persistenceMode)
    }

    const signUp = (email, pwd) => {
        if (persistenceMode) {
            setPersistence(auth, browserLocalPersistence)
                .then(() =>
                    createUserWithEmailAndPassword(auth, email, pwd)
                )
        }
        else {
            setPersistence(auth, browserSessionPersistence)
                .then(() =>
                    createUserWithEmailAndPassword(auth, email, pwd)
                )
        }

    }

    const signIn = (email, pwd) => {
        if (persistenceMode) {
            setPersistence(auth, browserLocalPersistence)
                .then(() =>
                    signInWithEmailAndPassword(auth, email, pwd)
                )
        }
        else {
            setPersistence(auth, browserSessionPersistence)
                .then(() =>
                    signInWithEmailAndPassword(auth, email, pwd)
                )
        }
        //signInWithEmailAndPassword(auth, email, pwd)
    }

    const navigate = useNavigate()

    const logOut = async () => {
        console.log("Tentative de deconnexion")
        try {
            await signOut(auth)
            navigate("/")
            console.log("Deconnexion réussie")
            //console.log("currentUser : ", currentUser)
        }
        catch (error) {
            console.log(error.name)
            console.log(error.message)
            alert("Une erreur est survenue lors de la deconnexion.\nVeuillez reessayer.")
        }
    }

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

    //Ne s'execute qu'une fois car [] en 2e paramètre
    useEffect(() => {

        // onAuthStateChanged retourne une fonction de désabonnement à l'evennement
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser)
            setLoadingData(false)
        })

        // executé à la "destruction"
        return unsubscribe;

    }, [])

    return (
        <UserContext.Provider value={{ signUp, signIn, toggleModals, modalState, currentUser, logOut, persistenceMode, togglePersistenceMode }}>
            {props.children}
        </UserContext.Provider>
    )
}