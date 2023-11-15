import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, setPersistence, browserLocalPersistence, browserSessionPersistence, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from "firebase/auth"
import { auth, db } from "../firebase-config"
import { setDoc, doc, getDoc } from "firebase/firestore";

export const UserContext = createContext()

export function UserContextProvider(props) {
    /*****************************************************************************************************
     *****************************************************************************************************
     * STATES
     *****************************************************************************************************
    *****************************************************************************************************/
    const [currentUser, setCurrentUser] = useState();
    const [currentUserDataProfile, setCurrentUserDataProfile] = useState([]);
    const [persistenceMode, setPersistenceMode] = useState(false);
    const [loadingData, setLoadingData] = useState(true);
    const [modalState, setModalState] = useState({
        signUpModal: false,
        signInModal: false,
        forgotPwdModal: false
    })

    /*****************************************************************************************************
     *****************************************************************************************************
     * REFERENCES
     *****************************************************************************************************
    *****************************************************************************************************/

    /*****************************************************************************************************
     *****************************************************************************************************
     * EFFECT
     *****************************************************************************************************
    *****************************************************************************************************/
    //Ne s'execute qu'une fois car [] en 2e paramètre
    useEffect(() => {

        // onAuthStateChanged retourne une fonction de désabonnement à l'evennement
        const unsubscribe = onAuthStateChanged(auth, (currUser) => {
            setCurrentUser(currUser)
            setLoadingData(false)
            console.log("onAuthStateChanged")
            console.log("currentUser.uid :", currUser.uid)

            if (currUser) {
                //refreshUserDataProfile() -> ne fonctionne pas je ne comprends pas pourquoi ... le state currentUser n'a probablement pas le temps te de se mettre à jour
                const userData = getDoc(doc(db, "users", currUser.uid))
                    .then((userProfle) => { setCurrentUserDataProfile(userProfle.data()) })
            }
            else {
                setCurrentUserDataProfile([])
            }

        })

        // executé à la "destruction"
        return unsubscribe;
    }, [])

    /*****************************************************************************************************
     *****************************************************************************************************
     * NAVIGATE
     *****************************************************************************************************
    *****************************************************************************************************/
    const navigate = useNavigate()

    /*****************************************************************************************************
     *****************************************************************************************************
     * FUNCTIONS
     *****************************************************************************************************
    *****************************************************************************************************/

    /**************************************************************************
    * Recharge les informations de profile du user
    **************************************************************************/
    const refreshUserDataProfile = () => {
        const userData = getDoc(doc(db, "users", currentUser.uid))
            .then((userProfle) => { setCurrentUserDataProfile(userProfle.data()) })
    }

    /**************************************************************************
    * Gestion du mode persistent ("se rappeler de moi")
    **************************************************************************/
    const togglePersistenceMode = () => {
        setPersistenceMode(!persistenceMode)
    }

    /**************************************************************************
    * Inscription
    **************************************************************************/
    const signUp = async (email, pwd) => {
        try {
            await setPersistence(auth, persistenceMode ? browserLocalPersistence : browserSessionPersistence)
            //.then(() => createUserWithEmailAndPassword(auth, email, pwd))
            //.then(() => navigate("/pages/private/privateHome"))

            const res = await createUserWithEmailAndPassword(auth, email, pwd)
            const user = res.user;

            await setDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                authProvider: "google",
                email: user.email,
            }, { merge: true })

            //console.log("res", res)
            //console.log("user.uid", user.uid)
            //doc(db, "users", user.uid).then((doc) => console.log("doc", doc))

            navigate("/pages/private/userProfile")
        }
        catch (error) {
            console.log("Une erreur est survenue : ", error.name);
            console.log("Une erreur est survenue : ", error.message);
        }
    }

    /**************************************************************************
    * Connexion
    **************************************************************************/
    const signIn = (email, pwd) => {
        setPersistence(auth, persistenceMode ? browserLocalPersistence : browserSessionPersistence)
            .then(() => signInWithEmailAndPassword(auth, email, pwd))
            .then(() => navigate("/pages/private/privateHome"))
    }

    /**************************************************************************
    * Mot de passe oublié
    **************************************************************************/
    const sendPasswordReset = async (email) => {
        try {
            await sendPasswordResetEmail(auth, email);
            //alert("Password reset link sent!");
            toggleModals("close")
        }
        catch (error) {
            console.log("Une erreur est survenue : ", error.name);
            console.log("Une erreur est survenue : ", error.message);
        }
    };

    /**************************************************************************
    * Deconnexion
    **************************************************************************/
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

    /**************************************************************************
    * Gestion des modales d'inscription, connexion
    **************************************************************************/
    const toggleModals = (modal) => {
        switch (modal) {
            case "signUp":
                setModalState({
                    signUpModal: true,
                    signInModal: false,
                    forgotPwdModal: false
                })
                break;
            case "signIn":
                setModalState({
                    signUpModal: false,
                    signInModal: true,
                    forgotPwdModal: false
                })
                break;
            case "forgotPwd":
                setModalState({
                    signUpModal: false,
                    signInModal: false,
                    forgotPwdModal: true
                })
                break;
            case "close":
                setModalState({
                    signUpModal: false,
                    signInModal: false,
                    forgotPwdModal: false
                })
                break;
        }
    }

    /**************************************************************************
    * Inscription / connexion par google
    **************************************************************************/
    const googleProvider = new GoogleAuthProvider();
    const signInWithGooglePopup = async () => {

        try {
            const res = await signInWithPopup(auth, googleProvider);
            const user = res.user;
            // const q = query(collection(db, "users"), where("uid", "==", user.uid));
            // const docs = await getDocs(q);
            // if (docs.docs.length === 0) {
            //     await addDoc(collection(db, "users"), {
            //         authProvider: "google",
            //         email: user.email,
            //     });
            // }
            console.log("user.uid", user.uid)
            doc(db, "users", user.uid).then((doc) => console.log("doc", doc))

            await addDoc(doc(db, "users", user.uid), {
                uid: user.uid,
                authProvider: "google",
                email: user.email,
            })

            toggleModals("close")
            navigate("/pages/private/userProfile")
        } catch (error) {
            console.log("Une erreur est survenue : ", error.name);
            console.log("Une erreur est survenue : ", error.message);
            //console.log("Email utilisé : ", error.customData.email);
            //console.log("The AuthCredential type that was used : ", GoogleAuthProvider.credentialFromError(error));
        }


        // VERSION DE GOOGLE (permet d'acceder à l'API mais je n'en vois pas l'utilité pour le moment)
        // signInWithPopup(auth, provider)
        //     .then((result) => {
        //         // This gives you a Google Access Token. You can use it to access the Google API.
        //         const credential = GoogleAuthProvider.credentialFromResult(result);
        //         const token = credential.accessToken;
        //         // The signed-in user info.
        //         const user = result.user;
        //         // IdP data available using getAdditionalUserInfo(result)
        //         // ...
        //     }).catch((error) => {

        //         console.log("Une erreur est survenue : ", error.name);
        //         console.log("Une erreur est survenue : ", error.message);
        //         console.log("Email utilisé : ", error.customData.email);
        //         console.log("The AuthCredential type that was used : ", GoogleAuthProvider.credentialFromError(error));
        //     });
    }

    /*****************************************************************************************************
     *****************************************************************************************************
     * RENDER
     *****************************************************************************************************
    *****************************************************************************************************/
    return (
        <UserContext.Provider value={{ signUp, signIn, signInWithGooglePopup, toggleModals, modalState, currentUser, currentUserDataProfile, logOut, persistenceMode, togglePersistenceMode, sendPasswordReset, refreshUserDataProfile }}>
            {!loadingData && props.children}
        </UserContext.Provider>
    )
}