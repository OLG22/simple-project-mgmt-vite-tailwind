import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase-config";
import { doc, addDoc, getDocs, collection, query, orderBy, deleteDoc } from "firebase/firestore";
import Spinner, { delay } from "./Spinner";

export default function Card({ title, eventDate, status, owner, description, cardId }) {
  const [expanded, setExpanded] = useState(false);
  const [historical, setHistorical] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  //   const [notes, setNotes] = useState([]);
  //   const [editableSubject, setEditableSubject] = useState(title);
  //   const [editableDate, setEditableDate] = useState(eventDate);
  //   const [editableStatus, setEditableStatus] = useState(status);
  //   const [editableOwner, setEditableOwner] = useState(owner);

  const updateContent = useRef("updateContent")

  useEffect(() => {

  }, []);


  /**************************************************************************
  * Obtenir l'historique
  **************************************************************************/
  const getHistorical = async () => {
    setLoading(true);

    try {
      //Les 3 étapes pour obtenir les document d'une sous-collection
      const docRef = doc(db, "subjects", cardId);
      const colHist = query(collection(docRef, "historical"), orderBy("updateDate", "desc"))
      const historicalDocs = await getDocs(colHist)
        .then((QueryDocumentSnapshot) => setHistorical(QueryDocumentSnapshot.docs))
      //console.log(historicalDocs);
    }
    catch (error) {
      console.log("Une erreur est survenue : ", error.name);
      console.log("Une erreur est survenue : ", error.message);
    }

    setLoading(false);
  }

  /**************************************************************************
  * Ajouter une note à l'historique
  **************************************************************************/
  const addHistorical = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const docRef = await addDoc(collection(doc(db, "subjects", cardId), "historical"), {
        description: updateContent.current.value,
        userId: "Virginie",
        updateDate: new Date()
      });
      await delay(2000)
      await getHistorical()
    } catch (error) {
      console.log("Une erreur est survenue : ", error.name);
      console.log("Une erreur est survenue : ", error.message);
    }

    setUpdating(false);
  };

  /**************************************************************************
  * Effacer une note de l'historique
  **************************************************************************/
  const deleteHistorical = async (docId) => {
    try {
      await deleteDoc(doc(db, "subjects", cardId, "historical", docId))
      //console.log("Deleting : ", docId);
      await getHistorical()
    }
    catch (error) {
      console.log("Une erreur est survenue : ", error.name);
      console.log("Une erreur est survenue : ", error.message);
    }
  }

  /**************************************************************************
  * Gérer l'expansion de la carte
  **************************************************************************/
  const toggleExpansion = async () => {
    // A la première expansion, on charge l'historique
    if (historical.length === 0) {
      try {
        await getHistorical().then(() => console.log("historical :", historical))
        console.log("1. historical :", historical)
      }
      catch (error) {
        console.log("Une erreur est survenue : ", error.name);
        console.log("Une erreur est survenue : ", error.message);
      }
    }
    setExpanded(!expanded);
    //console.log("expanded :", expanded);
    //console.log("historical :", historical)
  };


  //   const updateCardInfo = () => {};

  return (
    <>
      <div className="w-auto mx-auto max-w-5xl px-4 my-2 bg-white border border-gray-200 rounded-lg shadow-lg  dark:bg-gray-800 dark:border-gray-700">

        <div className="flex justify-center items-center">
          {/* Titre */}
          <div className="text-base leading-10 w-full font-bold truncate text-gray-900 dark:text-white" onClick={toggleExpansion} >
            {title}
          </div>
          {/* Date */}
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input defaultValue={eventDate} type="text" className="font-bold text-[12px] rounded-lg block w-[100px] pl-6 bg-gray-50 border border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Aucune date" />
          </div>
          {/* Owner */}
          <button type="button" className="text-[12px] w-7 h-7 ml-1 rounded-full hover:ring-1 ring-gray-500 bg-gray-100 focus:ring-gray-300 dark:focus:ring-gray-600">
            <span className="sr-only">Open user menu</span>
            {owner}
          </button>
        </div>

        {/**************************************************************************
         * Description + Historique + Formulaire
        **************************************************************************/}
        {expanded && (
          <>

            {/* Description */}
            <p className="mb-5 pt-5 text-base text-gray-700 dark:text-gray-400 border-t border-gray-200">
              {description}
            </p>

            {/* Historique */}
            {!loading && (
              historical.map((historicalDoc, index) => (
                <>
                  <div className="flex group hover:bg-gray-100 rounded-lg items-center box-border" key={index}>
                    <div className="block w-full pl-3">
                      <div className="m-auto w-1/3 border-t border-gray-200"></div>
                      {/* <div className="text-xs text-gray-500 mt-2 ">12/11/2023 - Virginie a écrit :</div> */}
                      <span className="text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-blue-200 border-[1px] ">
                        {new Date(historicalDoc.data().updateDate.seconds * 1000).toLocaleDateString("fr-FR")} - {historicalDoc.data().userId} a écrit :
                      </span>
                      <p className="w-full mb-2 px-2.5 text-sm text-gray-500 dark:text-gray-400">
                        {historicalDoc.data().description}
                      </p>
                    </div>
                    <div className="flex-inline justify-between mr-1">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2 text-transparent group-hover:text-blue-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                      </svg>
                      <button className="" onClick={() => deleteHistorical(historicalDoc.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-2 text-transparent group-hover:text-red-500">
                          {/* <path d="M38.75 78.13V36.88A1.85 1.85 0 0036.88 35h-3.75a1.85 1.85 0 00-1.88 1.88v41.25A1.85 1.85 0 0033.13 80h3.75a1.85 1.85 0 001.87-1.87zm15 0V36.88A1.85 1.85 0 0051.88 35h-3.75a1.85 1.85 0 00-1.88 1.88v41.25A1.85 1.85 0 0048.13 80h3.75a1.85 1.85 0 001.87-1.87zm15 0V36.88A1.85 1.85 0 0066.88 35h-3.75a1.85 1.85 0 00-1.88 1.88v41.25A1.85 1.85 0 0063.13 80h3.75a1.85 1.85 0 001.87-1.87zM36.88 20h26.25l-2.82-6.85a2.35 2.35 0 00-1-.65H40.74a2 2 0 00-1 .65zm54.37 1.88v3.75a1.85 1.85 0 01-1.87 1.87h-5.63v55.55c0 6.44-4.22 12-9.37 12H25.63c-5.16 0-9.38-5.27-9.38-11.72V27.5h-5.62a1.85 1.85 0 01-1.88-1.83v-3.8A1.85 1.85 0 0110.63 20h18.1l4.1-9.78A9.12 9.12 0 0140.63 5h18.75a9.1 9.1 0 017.79 5.22l4.1 9.78h18.11a1.85 1.85 0 011.87 1.87z" /> */}
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                        </svg>
                      </button>

                    </div>
                  </div>
                </>
              ))
            )}

            {/* Formulaire */}
            {!loading && (
              <div className="px-3 text-right justify-end">
                <form action="" onSubmit={addHistorical}>
                  <textarea ref={updateContent} id="description" className="block p-3 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ecrivez içi les nouvelles informations"></textarea>
                  {!updating && (
                    <button type="submit" className="font-medium rounded-lg text-[12px] px-3 py-1.5 my-5 text-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80">
                      <svg className="block animate-spin h-5 w-5 mr-3 " viewBox="0 0 24 24">

                      </svg>
                      Mettre à jour le sujet
                    </button>

                  )}
                  {updating && (
                    <Spinner />
                  )}
                </form>
              </div>
            )}

          </>
        )}
      </div>
    </>
  );
}
