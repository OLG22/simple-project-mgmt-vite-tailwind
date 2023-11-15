import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase-config";
import { doc, or, setDoc, updateDoc } from "firebase/firestore";
import Spinner from "../../../components/Spinner";
import Input from "../../../components/Input"
import { UserContext } from '../../../context/userContext'


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
    const [userProfileFields, setUserProfileFields] = useState({ name: "", firstname: "" });

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

    /**************************************************************************
    * Validation du formulaire d'inscription
    **************************************************************************/

    const updateProfile = async (e) => {
        e.preventDefault();

        let validationsOk = true

        if (name.current.value === "") {
            userProfileFields.name = "border-red-500 dark:border-red-500"
            validationsOk = false
        }
        else userProfileFields.name = ""

        if (firstname.current.value === "") {
            userProfileFields.firstname = "border-red-500 dark:border-red-500"
            validationsOk = false
        }
        else userProfileFields.firstname = ""


        console.log(userProfileFields);
        if (validationsOk === false) {
            return
        }

        name.current.value === "" ? userProfileFields.name = "border-red-500 dark:border-red-500" : true

        //         setUserProfileFields([...userProfileFields].push({ name: "border-red-500 dark:border-red-500" }))
        //     return;
        // }
        //     else {
        //     setValidationMail("")
        //     setSignUpEmailAddClass("")
        // }
        // if (name.current.value === "" || firstname.current.value === "") {
        //     setValidationMail(validEmail.ruleLabel)
        //     setSignUpEmailAddClass("border-red-500 dark:border-red-500")
        //     return;
        // }
        // else {
        //     setValidationMail("")
        //     setSignUpEmailAddClass("")
        // }

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
                    <form action="#">
                        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                            <div className="w-full">
                                <Input id={"name"} ref={name} title={"Nom"} placeholder={"Votre nom"} defaultValue={currentUserDataProfile.name} required={true} addClass={userProfileFields.name} />
                            </div>
                            <div className="w-full">
                                <Input id={"firstname"} ref={firstname} title={"Prénom"} placeholder={"Votre prénom"} defaultValue={currentUserDataProfile.firstname} required={true} addClass={userProfileFields.firstname} />
                            </div>
                            {/* <div className="w-full">
                                <Input id={"pseudo"} ref={pseudo} title={"Pseudonyme"} placeholder={"Votre pseudonyme"} />
                            </div> */}
                        </div>
                        <div className="w-full flex justify-end items-center">

                            {/* {!addingCardToFirestore && ( */}
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
                            {/* )} */}
                        </div>
                    </form>
                </div>
            </section>
        </>
    )
}