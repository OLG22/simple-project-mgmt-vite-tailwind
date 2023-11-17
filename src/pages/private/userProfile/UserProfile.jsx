import React, { useContext, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase-config";
import { doc, or, setDoc, updateDoc } from "firebase/firestore";
import Spinner from "../../../components/Spinner";
import InputText from "../../../components/Input"
import { UserContext } from '../../../context/userContext'


function useForceUpdate() {
    const [, setToggle] = useState(false);
    console.log("forceupdate")
    return () => setToggle(toggle => !toggle);
}

export default function UserProfile() {
    /*****************************************************************************************************
     *****************************************************************************************************
     * CONTEXT
     *****************************************************************************************************
    *****************************************************************************************************/
    const { currentUser, currentUserDataProfile, refreshUserDataProfile } = useContext(UserContext)

    /*****************************************************************************************************
     *****************************************************************************************************
     * STATES
     *****************************************************************************************************
    *****************************************************************************************************/
    const [addingCardToFirestore, setAddingCardToFirestore] = useState(false);
    const [addClass, setAddClass] = useState({ name: "", firstname: "" });

    /*****************************************************************************************************
     *****************************************************************************************************
     * STATES
     *****************************************************************************************************
    *****************************************************************************************************/
    useEffect(() => {
        refreshUserDataProfile()
        console.log(currentUserDataProfile)

    }, [])

    /*****************************************************************************************************
     *****************************************************************************************************
     * REFERENCES
     *****************************************************************************************************
    *****************************************************************************************************/
    const name = useRef("name");
    const firstname = useRef("firstname");
    //const pseudo = useRef("pseudo");

    /*****************************************************************************************************
     *****************************************************************************************************
     * NAVIGATE
     *****************************************************************************************************
    *****************************************************************************************************/
    const navigate = useNavigate();

    /*****************************************************************************************************
     *****************************************************************************************************
     * FUNCTIONS
     *****************************************************************************************************
    *****************************************************************************************************/

    //const forceUpdate = useForceUpdate();

    /**************************************************************************
    * Validation du formulaire d'inscription
    **************************************************************************/

    const updateProfile = async (e) => {
        e.preventDefault();

        let validationsOk = true

        name.current.value === "" ? validationsOk = false : true
        firstname.current.value === "" ? validationsOk = false : true
        if (validationsOk === false) { return }

        setAddingCardToFirestore(true);

        try {
            const docRef = await setDoc(doc(db, "users", currentUser.uid), {
                name: name.current.value,
                firstname: firstname.current.value,
            }, { merge: true });

            refreshUserDataProfile()

            navigate("./UserDashboard");
        } catch (error) {
            console.log("Une erreur est survenue : ", error.name);
            console.log("Une erreur est survenue : ", error.message);
        }

        setAddingCardToFirestore(false);
    };

    /*****************************************************************************************************
     *****************************************************************************************************
     * RENDER
     *****************************************************************************************************
    *****************************************************************************************************/

    return (


        <>

            <section className="flex">
                <div className="px-4 mx-auto my-8 sm:w-2/3 max-w-2xl w-72 border bg-white border-gray-200 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)]">
                    <h2 className="pb-2 my-4 text-xl font-bold border-b border-gray-200 text-gray-900 dark:text-white">
                        Votre profil
                    </h2>
                    {
                        //On met cela pour attendre que le contexte ai fini de charger les données de l'utilisareur
                        currentUserDataProfile.uid && (
                            <form action="#">
                                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                    <div className="w-full">
                                        <InputText id={"name"} ref={name} title={"Nom"} placeholder={"Votre nom"} defaultValue={currentUserDataProfile.name} required={true} addClass={addClass.name} />
                                    </div>
                                    <div className="w-full">
                                        <InputText id={"firstname"} ref={firstname} title={"Prénom"} placeholder={"Votre prénom"} defaultValue={currentUserDataProfile.firstname} required={true} addClass={addClass.firstname} />
                                    </div>
                                </div>

                                <div className="w-full flex justify-end items-center">
                                    <button type="button" className="w-28 flex font-medium rounded-lg text-[12px] px-5 py-2 my-5 text-center justify-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80" onClick={updateProfile}>
                                        {addingCardToFirestore && (
                                            <>
                                                <Spinner width={3} height={3} />
                                                <span>
                                                    Mise à jour ...
                                                </span>
                                            </>
                                        )}
                                        {!addingCardToFirestore && ("Mettre à jour")}
                                    </button>
                                </div>
                            </form>
                        )}
                    {!currentUserDataProfile.uid && (
                        <div className="flex justify-center mb-5">
                            <Spinner width={8} height={8} />
                        </div>
                    )}
                </div >
            </section >


        </>
    )
}