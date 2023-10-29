import { createContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth"
import { auth } from "../firebase-config"
import { useNavigate } from 'react-router-dom'

export const UserContext = createContext()

export function UserContextProvider(props) {

    const [currentUser, setCurrentUser] = useState();
    const [persistenceMode, setPersistenceMode] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const navigate = useNavigate()

    const togglePersistenceMode = () => {
        setPersistenceMode(!persistenceMode)
    }

    // Inscription
    const signUp = (email, pwd) => {
        setPersistence(auth, persistenceMode ? browserLocalPersistence : browserSessionPersistence)
            .then(() => createUserWithEmailAndPassword(auth, email, pwd))
            .then(() => navigate("/pages/private/privateHome"))
    }

    // Connexion
    const signIn = (email, pwd) => {
        setPersistence(auth, persistenceMode ? browserLocalPersistence : browserSessionPersistence)
            .then(() => signInWithEmailAndPassword(auth, email, pwd))
            .then(() => navigate("/pages/private/privateHome"))
    }

    // Deconnexion
    const logOut = async () => {
        console.log("Tentative de deconnexion")
        try {
            await signOut(auth)
            navigate("/")
            console.log("Deconnexion réussie")
        }
        catch (error) {
            console.log(error.name)
            console.log(error.message)
            alert("Une erreur est survenue lors de la deconnexion.\nVeuillez reessayer.")
        }
    }

    // Gestion des modales d'inscription, connexion
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
            {!loadingData && props.children}
        </UserContext.Provider>
    )
}