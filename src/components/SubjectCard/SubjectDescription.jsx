import React, { useState, useEffect, useRef } from "react";
import { db } from "../../firebase-config";
import { doc, getDoc, getDocs, collection, query, orderBy, updateDoc } from "firebase/firestore";
import Spinner from "../Spinner";


export default function SubjectDescription({ subjectId, modifyingElement, toggleModifyingElement }) {
    /*****************************************************************************************************
     *****************************************************************************************************
     * STATES
     *****************************************************************************************************
    *****************************************************************************************************/
    const [subjectDescription, setSubjectDescription] = useState();
    const [updating, setUpdating] = useState(false);

    /*****************************************************************************************************
     *****************************************************************************************************
     * REFERENCES
     *****************************************************************************************************
    *****************************************************************************************************/
    const descriptionContent = useRef("descriptionContent")

    /*****************************************************************************************************
     *****************************************************************************************************
     * EFFECT
     *****************************************************************************************************
    *****************************************************************************************************/
    useEffect(() => {
        getSubjectDescription()
        //console.log("subjectDescription rerender:", modifyingElement);
    }, []);

    /*****************************************************************************************************
     *****************************************************************************************************
     * FUNCTIONS
     *****************************************************************************************************
    *****************************************************************************************************/

    /**************************************************************************
    * Obtenir les données princpales du sujet
    **************************************************************************/
    async function getSubjectDescription() {
        try {
            const response = await getDoc(doc(db, "subjects", subjectId));
            setSubjectDescription(response.data().description)
        }
        catch (error) {
            console.log("Une erreur est survenue : ", error.name);
            console.log("Une erreur est survenue : ", error.message);
        }
    }


    /**************************************************************************
    * Modifier une descripion de sujet
    **************************************************************************/
    const modifyDescription = async (e, subjectId) => {
        e.preventDefault();
        setUpdating(true);

        try {
            await updateDoc(doc(db, "subjects", subjectId), {
                description: descriptionContent.current.value
            })
            setSubjectDescription(descriptionContent.current.value)
        }
        catch (error) {
            console.log("Une erreur est survenue : ", error.name);
            console.log("Une erreur est survenue : ", error.message);
        }

        toggleModifyingElement(undefined)
        setUpdating(false);
    }


    /*****************************************************************************************************
     *****************************************************************************************************
     * RENDER
     *****************************************************************************************************
    *****************************************************************************************************/
    return (
        <>
            {/* Description */}
            {modifyingElement !== subjectId + "_description" && (
                <>
                    <p className="pt-5 border-t border-gray-200"></p>
                    <div className="relative group mb-5 p-2 text-base text-gray-700 dark:text-gray-400 border rounded-lg border-sky-200 bg-sky-50 text-justify font-medium">
                        {subjectDescription}
                        <div className="absolute right-2 -top-3 group-hover:border-t group-hover:border-x rounded-t-lg group-hover:border-sky-200 group-hover:bg-sky-50 w-6 h-3 ">
                        </div>
                        <button className="absolute group/edit right-3 -top-2" onClick={() => toggleModifyingElement(subjectId + "_description")}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4  text-transparent group-hover:text-blue-500 group-hover/edit:text-blue-700">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                            </svg>
                        </button>
                    </div>
                </>
            )}
            {modifyingElement === subjectId + "_description" && (
                <div className="my-1">
                    <form action="" className="flex w-full flex-wrap justify-end text-right" onSubmit={(e) => modifyDescription(e, subjectId)}>
                        <textarea ref={descriptionContent} defaultValue={subjectDescription} id="description" row={`${subjectDescription.split("\r\n|\r|\n").length}`} className="p-3 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-sky-200 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ecrivez içi les nouvelles informations"></textarea>
                        <button type="button" value="Cancel" className="flex font-medium rounded-lg text-[12px] px-3 py-1 my-2 mr-3 text-center justify-center text-white bg-gradient-to-r from-slate-500 via-slate-600 to-slate-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 shadow-lg shadow-slate-500/50 dark:shadow-lg dark:shadow-slate-800/80" onClick={() => toggleModifyingElement(subjectId)}>Annuler</button>
                        <button type="submit" className="flex font-medium rounded-lg text-[12px] px-3 py-1 my-2 text-center justify-center text-white bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-sky-300 dark:focus:ring-sky-800 shadow-lg shadow-sky-500/50 dark:shadow-lg dark:shadow-sky-800/80">
                            {updating && (
                                <>
                                    <Spinner width={3} height={3} />
                                    <span>
                                        Mise à jour ...
                                    </span>
                                </>
                            )}
                            {!updating && ("Mettre à jour cette note")}
                        </button>

                    </form>
                </div>
            )}
        </>
    )
}