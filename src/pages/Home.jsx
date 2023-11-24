import React, { useContext, useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase-config";
import { doc, or, setDoc, updateDoc } from "firebase/firestore";
import Spinner from "../components/Spinner";
import InputText from "../components/Input"
import { UserContext } from '../context/userContext'
import SubjectCard from '../components/SubjectCard/SubjectCard'


export default function Home() {
    /*****************************************************************************************************
     *****************************************************************************************************
     * CONTEXT
     *****************************************************************************************************
    *****************************************************************************************************/
    //const { currentUser, currentUserDataProfile, refreshUserDataProfile } = useContext(UserContext)

    /*****************************************************************************************************
     *****************************************************************************************************
     * STATES
     *****************************************************************************************************
    *****************************************************************************************************/
    const [loading, setLoading] = useState(false);

    /*****************************************************************************************************
     *****************************************************************************************************
     * STATES
     *****************************************************************************************************
    *****************************************************************************************************/
    useEffect(() => {
        const getAllCards = async () => {
            setLoading(true);

            try {
                await getDocs(collection(db, "subjects")).then((querySnapshot) => {
                    const data = querySnapshot.docs.map((doc) => doc.id);
                    setCardsData([...data]); // Il faut déstructurer le tableau pour le restructurer dans un tableau afin que le state fonctionne, on ne peut pas utiliser directement data
                });

                //await delay(1000)
                //console.log("1. cardsData :", cardsData);
            }
            catch (error) {
                console.log("Une erreur est survenue : ", error.name);
                console.log("Une erreur est survenue : ", error.message);
            }

            setLoading(false);
        }

        getAllCards();
    }, [])

    /*****************************************************************************************************
     *****************************************************************************************************
     * REFERENCES
     *****************************************************************************************************
    *****************************************************************************************************/


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


    return (
        <div className="py-5 px-10 w-full ">
            <h1 className="title"> Liste des cartes publiques</h1>
            {loading && (
                <div className="flex justify-center items-center">
                    <Spinner width={8} height={8} />
                </div>
            )}
            {!loading && (
                <div className="px-10 w-full ">
                    {/* {cardsData.map((subjectId) => <SubjectCard subjectId={subjectId} key={subjectId} />)} */}
                </div>
            )}
        </div>
    )
}
