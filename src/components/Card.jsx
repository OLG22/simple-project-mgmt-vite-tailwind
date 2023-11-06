import React, { useState, useEffect, useRef } from "react";
import { db } from "../firebase-config";
import { doc, addDoc, getDocs, collection } from "firebase/firestore";
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
    // console.log("title : ", title);
    // console.log("eventDate :", eventDate);
    // console.log("status :", status);
    // console.log("owner :", owner);
    // console.log("cardId :", cardId);
    // console.log("description :", description);

  }, []);

  const getHistorical = async () => {
    setLoading(true);

    try {
      const docRef = doc(db, "subjects", cardId);
      //console.log("docRef:", docRef);
      const colHist = collection(docRef, "historical")
      //console.log("colHist :", colHist);
      //const historicalDocs = await getDocs(colHist)
      //console.log("docs :", historicalDocs.docs[0].data());

      const historicalDocs = await getDocs(colHist)
        .then((QueryDocumentSnapshot) => setHistorical(QueryDocumentSnapshot.docs))

      //const docSnap = await getDoc(docRef).then(getDocs)
      //console.log("Document data:", docSnap.data());

      // if (docSnap.exists()) {
      //   console.log("Document data:", docSnap.data());
      //   setHistorical(docSnap.data())
      // } else {
      //   // docSnap.data() will be undefined in this case
      //   console.log("No such document!");
      // }
    }
    catch (error) {
      console.log("Une erreur est survenue : ", error.name);
      console.log("Une erreur est survenue : ", error.message);
    }

    setLoading(false);
  }

  const updateSubject = async (e) => {
    e.preventDefault();

    setUpdating(true);

    try {
      const docRef = await addDoc(collection(doc(db, "subjects", cardId), "historical"), {
        description: updateContent.current.value,
        userId: "Virginie",
        updateDate: new Date()
      });
      //console.log("Document written with ID: ", docRef.id);
      await delay(2000)

      getHistorical()




      // const docRef = await addDoc(collection(db, "subjects"), {
      //   title: title.current.value,
      //   description: description.current.value,
      //   eventDate: eventDate.current.value,
      //   owner: owner.current.value,
      //   status: "todo",
      // });
      // //await delay(5000);
      // navigate("../cards");
    } catch (error) {
      console.log("Une erreur est survenue : ", error.name);
      console.log("Une erreur est survenue : ", error.message);
    }



    setUpdating(false);
  };

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
    console.log("expanded :", expanded);
    console.log("historical :", historical)
  };


  //   const updateCardInfo = () => {};

  return (
    <>
      <div className="w-auto mx-auto max-w-5xl px-4 my-2 bg-white border border-gray-200 rounded-lg shadow-lg  dark:bg-gray-800 dark:border-gray-700">
        <div className="flex justify-center items-center">
          <div
            className="text-base leading-10 w-full font-bold truncate text-gray-900 dark:text-white"
            onClick={toggleExpansion}
          >
            {title}
          </div>
          <div className="relative max-w-sm">
            <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
              <svg
                className="w-3 h-3 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              value={eventDate}
              type="text"
              className="font-bold text-[12px] rounded-lg block w-[100px] pl-6 bg-gray-50 border border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Aucune date"
            />
          </div>
          <button
            type="button"
            className="text-[12px] w-7 h-7 ml-1 rounded-full hover:ring-1 ring-gray-500 bg-gray-100 focus:ring-gray-300 dark:focus:ring-gray-600"
          >
            <span className="sr-only">Open user menu</span>
            {owner}
          </button>
        </div>
        {expanded && (
          <p className="mb-5 pt-5 text-sm text-gray-700 dark:text-gray-400 border-t border-gray-200">
            {description}
          </p>
        )}
        <div className="items-center justify-center">
          {!loading && expanded && (
            historical.map((historicalDoc) => (
              <>
                <div className="m-auto w-1/3 border-t border-gray-200"></div>
                <div className="text-xs text-gray-500">12/11/2023 - Virginie a écrit :</div>

                <p className="w-full pl-3 mb-3 text-xs text-gray-500 dark:text-gray-400">
                  {historicalDoc.data().description}
                </p>
              </>
            ))
          )}
        </div>
        {!loading && expanded && (
          <div className="px-3 text-right justify-end">
            <form action="" onSubmit={updateSubject}>
              <textarea ref={updateContent} id="description" className="block p-3 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ecrivez içi les nouvelles informations"></textarea>
              {!updating && (
                <button type="submit" className="font-medium rounded-lg text-[12px] px-3 py-1.5 my-5 ml-full text-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80">Mettre à jour le sujet</button>
              )}
              {updating && (

                <Spinner />
              )}
            </form>
          </div>
        )}
      </div>
    </>
  );
}
