import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase-config";
import { doc, addDoc, getDoc, getDocs, collection, query, orderBy, deleteDoc, updateDoc } from "firebase/firestore";
import Spinner, { delay } from "./Spinner";
import Todo from "./Todo";

export default function SubjectCard({ subjectId }) {
  /**************************************************************************
  * States
  **************************************************************************/
  const [subjectInfo, setSubjectInfo] = useState({});
  const [expanded, setExpanded] = useState(false);
  const [historical, setHistorical] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [modifyingElement, setModifyingElement] = useState();

  /**************************************************************************
  * Ref
  **************************************************************************/
  const updateContent = useRef("updateContent")
  const updateContentHistorical = useRef("updateContentHistorical")
  const updateContentSubject = useRef("updateContentSubject")

  /**************************************************************************
  * Effect
  **************************************************************************/
  useEffect(() => {
    getSubjectMainData()
    console.log("subjectInfo :", subjectInfo);
  }, []);

  /**************************************************************************
  * Obtenir les données princpales du sujet
  **************************************************************************/
  async function getSubjectMainData() {
    try {
      const response = await getDoc(doc(db, "subjects", subjectId));
      setSubjectInfo(response.data())
    }
    catch (error) {
      console.log("Une erreur est survenue : ", error.name);
      console.log("Une erreur est survenue : ", error.message);
    }
  }

  /**************************************************************************
  * Obtenir l'historique
  **************************************************************************/
  const getHistorical = async () => {
    setLoading(true);

    try {
      //Les 3 étapes pour obtenir les document d'une sous-collection
      const docRef = doc(db, "subjects", subjectId);
      const colHist = query(collection(docRef, "historical"), orderBy("updateDate", "asc"))
      const historicalDocs = await getDocs(colHist)
        .then((QueryDocumentSnapshot) => setHistorical(QueryDocumentSnapshot.docs))
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

    if (updateContent.current.value !== "") {

      setUpdating("addHistorical");

      try {
        const docRef = await addDoc(collection(doc(db, "subjects", subjectId), "historical"), {
          description: updateContent.current.value,
          userId: "Virginie",
          updateDate: new Date()
        });
        await getHistorical()
      } catch (error) {
        console.log("Une erreur est survenue : ", error.name);
        console.log("Une erreur est survenue : ", error.message);
      }

      setUpdating(undefined);
    }
  };

  /**************************************************************************
  * Effacer une note de l'historique
  **************************************************************************/
  const deleteHistorical = async (docId) => {
    try {
      await deleteDoc(doc(db, "subjects", subjectId, "historical", docId))
      await getHistorical()
    }
    catch (error) {
      console.log("Une erreur est survenue : ", error.name);
      console.log("Une erreur est survenue : ", error.message);
    }
  }

  /**************************************************************************
  * Modifier une note de l'historique
  **************************************************************************/
  const modifyHistorical = async (e, docId) => {
    e.preventDefault();
    setUpdating(docId);

    try {
      await updateDoc(doc(db, "subjects", subjectId, "historical", docId), {
        description: updateContentHistorical.current.value
      })
      console.log("updateContentHistorical.current.value : ", updateContentHistorical.current.value);
      await getHistorical()
    }
    catch (error) {
      console.log("Une erreur est survenue : ", error.name);
      console.log("Une erreur est survenue : ", error.message);
    }

    setModifyingElement(undefined)
    setUpdating(undefined);
  }

  /**************************************************************************
  * Modifier une descripion de sujet
  **************************************************************************/
  const modifyDescription = async (e, subjectId) => {
    e.preventDefault();
    setUpdating(subjectId);

    try {
      await updateDoc(doc(db, "subjects", subjectId), {
        description: updateContentSubject.current.value
      })
      await getHistorical()
      getSubjectMainData()
    }
    catch (error) {
      console.log("Une erreur est survenue : ", error.name);
      console.log("Une erreur est survenue : ", error.message);
    }

    setModifyingElement(undefined)
    setUpdating(undefined);
  }

  /**************************************************************************
  * Ouvrir ou ferme le forumlaire de modification d'une note de l'historique
  **************************************************************************/
  const toggleModifyingElement = (docId) => {
    modifyingElement !== docId ? setModifyingElement(docId) : setModifyingElement(undefined)
  }

  /**************************************************************************
  * Gérer l'expansion de la carte
  **************************************************************************/
  const toggleExpansion = async () => {
    // A la première expansion, on charge l'historique
    if (historical.length === 0) {
      try {
        await getHistorical().then(() => console.log("historical :", historical))
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


  /**************************************************************************
  * RENDER
  **************************************************************************/

  return (
    <>
      <div className="w-auto mx-auto max-w-5xl px-4 my-2 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">

        <div className="flex justify-center items-center">
          {/* Titre */}
          <div className="text-base leading-10 w-full font-bold truncate text-gray-900 dark:text-white" onClick={toggleExpansion} >
            {subjectInfo.title}
          </div>
          {/* Date */}
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input defaultValue={subjectInfo.eventDate} type="text" className="font-bold text-[12px] rounded-lg block w-[100px] pl-6 bg-gray-50 border border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Aucune date" />
          </div>
          {/* Owner */}
          <button type="button" className="text-[12px] w-7 h-7 ml-1 rounded-full hover:ring-1 ring-gray-500 bg-gray-100 focus:ring-gray-300 dark:focus:ring-gray-600">
            <span className="sr-only">Open user menu</span>
            {subjectInfo.owner}
          </button>
        </div>

        {/**************************************************************************
         * EXPANSION : Description + Historique + Formulaire
        **************************************************************************/}
        {expanded && (
          <>

            {/* Description */}
            {modifyingElement !== subjectId && (
              <>
                <p className="pt-5 border-t border-gray-200"></p>
                <div className="relative group mb-5 p-2 text-base text-gray-700 dark:text-gray-400 border rounded-lg border-sky-200 bg-sky-50 text-justify font-normal">
                  {subjectInfo.description}
                  <div className="absolute right-2 -top-3 group-hover:border-t group-hover:border-x rounded-t-lg group-hover:border-sky-200 group-hover:bg-sky-50 w-6 h-3 ">
                  </div>
                  <button className="absolute group/edit right-3 -top-2" onClick={() => toggleModifyingElement(subjectId)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4  text-transparent group-hover:text-blue-500 group-hover/edit:text-blue-700">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                    </svg>
                  </button>
                </div>
              </>
            )}
            {modifyingElement === subjectId && (
              <div className="my-1">
                <form action="" className="flex w-full flex-wrap justify-end text-right" onSubmit={(e) => modifyDescription(e, subjectId)}>
                  <textarea ref={updateContentSubject} defaultValue={subjectInfo.description} id="description" row={`${subjectInfo.description.split("\r\n|\r|\n").length}`} className="p-3 w-full text-base text-gray-900 bg-gray-50 rounded-lg border border-sky-200 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ecrivez içi les nouvelles informations"></textarea>
                  <button type="cancel" className="flex font-medium rounded-lg text-[12px] px-3 py-1 my-2 mr-3 text-center justify-center text-white bg-gradient-to-r from-slate-500 via-slate-600 to-slate-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 shadow-lg shadow-slate-500/50 dark:shadow-lg dark:shadow-slate-800/80" onClick={() => toggleModifyingElement(subjectId)}>Annuler</button>
                  <button type="submit" className="flex font-medium rounded-lg text-[12px] px-3 py-1 my-2 text-center justify-center text-white bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-sky-300 dark:focus:ring-sky-800 shadow-lg shadow-sky-500/50 dark:shadow-lg dark:shadow-sky-800/80">
                    {updating === subjectId && (
                      <>
                        <Spinner width={3} height={3} />
                        <span>
                          Mise à jour ...
                        </span>
                      </>
                    )}
                    {updating !== subjectId && ("Mettre à jour cette note")}
                  </button>

                </form>
              </div>
            )}

            {/* Todo */}
            <Todo color={"yellow"} subjectId={"1"}/>

            {/* Historique */}
            {!loading && (
              historical.map((historicalDoc) => (
                <div className="w-full px-3 py-1 group hover:bg-gray-100 rounded-lg" key={historicalDoc.id}>
                  {/* <div className="block w-full pl-3"> */}
                  <div className="m-auto w-1/3 border-t border-gray-200 group-hover:border-gray-100" ></div>
                  <div className="flex justify-between items-center">

                    <span className="text-[12px] px-3 rounded bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-[1px] border-blue-200 ">
                      {new Date(historicalDoc.data().updateDate.seconds * 1000).toLocaleDateString("fr-FR")} - {historicalDoc.data().userId} a écrit :
                    </span>

                    <div className="mr-2">
                      {/* Bouton MODIFY */}
                      <button className="group/edit ml-2" onClick={() => toggleModifyingElement(historicalDoc.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4  text-transparent group-hover:text-blue-500 group-hover/edit:text-blue-700">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                      </button>

                      {/* Bouton DELETE */}
                      <button className="group/delete ml-2" onClick={() => deleteHistorical(historicalDoc.id)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4  text-transparent group-hover:text-red-500 group-hover/delete:text-red-700">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                        </svg>
                      </button>
                    </div>

                  </div>

                  {/* MODIFY HISTORICAL */}
                  <div className="">
                    {modifyingElement !== historicalDoc.id && (
                      <p className="w-full pb-2 px-2.5 text-sm text-justify text-gray-500 dark:text-gray-400">
                        {historicalDoc.data().description}
                      </p>
                    )}
                    {modifyingElement === historicalDoc.id && (

                      <div className="my-1">
                        <form action="" className="flex w-full flex-wrap justify-end text-right" onSubmit={(e) => modifyHistorical(e, historicalDoc.id)}>
                          <textarea ref={updateContentHistorical} defaultValue={historicalDoc.data().description} id="description" className="p-3 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ecrivez içi les nouvelles informations"></textarea>
                          <button type="cancel" className="flex font-medium rounded-lg text-[12px] px-3 py-1 my-2 mr-3 text-center justify-center text-white bg-gradient-to-r from-slate-500 via-slate-600 to-slate-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-slate-300 dark:focus:ring-slate-800 shadow-lg shadow-slate-500/50 dark:shadow-lg dark:shadow-slate-800/80" onClick={() => toggleModifyingElement(historicalDoc.id)}>Annuler</button>
                          <button type="submit" className="flex font-medium rounded-lg text-[12px] px-3 py-1 my-2 text-center justify-center text-white bg-gradient-to-r from-sky-500 via-sky-600 to-sky-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-sky-300 dark:focus:ring-sky-800 shadow-lg shadow-sky-500/50 dark:shadow-lg dark:shadow-sky-800/80">
                            {updating === historicalDoc.id && (
                              <>
                                <Spinner width={3} height={3} />
                                <span>
                                  Mise à jour ...
                                </span>
                              </>
                            )}
                            {updating !== historicalDoc.id && ("Mettre à jour cette note")}
                          </button>

                        </form>
                      </div>
                    )}
                  </div>

                  {/* </div> */}
                </div>
              ))
            )}

            {/* Formulaire */}
            {!loading && (
              <>

                <div className="m-auto w-2/3 border-t my-3 border-gray-300"></div>
                <div className="px-3 mt-5">
                  <form action="" className="flex w-full flex-wrap justify-end text-right" onSubmit={addHistorical}>
                    <textarea ref={updateContent} id="description" className="p-3 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ecrivez içi les nouvelles informations"></textarea>
                    <button type="submit" className="flex font-medium rounded-lg text-[12px] px-5 py-2 my-5 text-center justify-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80">
                      {updating === "addHistorical" && (
                        <>
                          <Spinner width={3} height={3} />
                          <span>
                            Mise à jour ...
                          </span>
                        </>
                      )}
                      {updating !== "addHistorical" && ("Mettre à jour le sujet")}
                    </button>

                  </form>
                </div>
              </>
            )}

          </>
        )}
      </div>
    </>
  );
}
