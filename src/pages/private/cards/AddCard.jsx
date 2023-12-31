import React, { useContext, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase-config";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";
import Spinner from "../../../components/Spinner";

export default function AddCard() {
  /*****************************************************************************************************
   *****************************************************************************************************
   * CONTEXT
   *****************************************************************************************************
  *****************************************************************************************************/

  /*****************************************************************************************************
   *****************************************************************************************************
   * STATES
   *****************************************************************************************************
  *****************************************************************************************************/
  const [addingCardToFirestore, setAddingCardToFirestore] = useState(false);

  /*****************************************************************************************************
   *****************************************************************************************************
   * REFERENCES
   *****************************************************************************************************
  *****************************************************************************************************/
  const title = useRef("title");
  const description = useRef("description");
  const eventDate = useRef("eventDate");
  const owner = useRef("owner");

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

  const addCardToFirestore = async (e) => {
    e.preventDefault();

    setAddingCardToFirestore(true);

    try {
      const docRef = await addDoc(collection(db, "subjects"), {
        title: title.current.value,
        description: description.current.value,
        eventDate: eventDate.current.value,
        owner: owner.current.value,
        status: "todo",
      });
      // await delay(2000)
      navigate("../cards");
    } catch (error) {
      console.log("Une erreur est survenue : ", error.name);
      console.log("Une erreur est survenue : ", error.message);
    }

    setAddingCardToFirestore(false);
  };

  return (
    <>
      <section className="flex">
        <div className="px-4 mx-auto my-8 sm:w-2/3 max-w-2xl w-72 border bg-white border-gray-200 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)]">
          <h2 className="pb-2 my-4 text-xl font-bold border-b border-gray-200 text-gray-900 dark:text-white">
            Ajouter un nouveau sujet
          </h2>
          <form action="#">
            <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
              <div className="sm:col-span-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Titre
                </label>
                <input
                  ref={title}
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full p-2.5 text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Titre du sujet"
                  required=""
                />
              </div>
              <div className="w-full">
                <label
                  htmlFor="brand"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date
                </label>
                <input
                  ref={eventDate}
                  type="text"
                  name="brand"
                  id="brand"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Date de réalisation"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Porteur
                </label>
                <select
                  ref={owner}
                  id="category"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="NONE"></option>
                  <option value="TV">TV/Monitors</option>
                  <option value="PC">PC</option>
                  <option value="GA">Gaming/Console</option>
                  <option value="PH">Phones</option>
                </select>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  ref={description}
                  id="description"
                  rows="8"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Description générale du sujet"
                ></textarea>
              </div>
            </div>
            <div className="w-full flex justify-end items-center">

              {/* {!addingCardToFirestore && ( */}
              <button type="button" className="w-28 flex font-medium rounded-lg text-[12px] px-5 py-2 my-5 text-center justify-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80" onClick={addCardToFirestore}>
                {addingCardToFirestore && (
                  <>
                    <Spinner width={3} height={3} />
                    <span>
                      Ajout ...
                    </span>
                  </>
                )}
                {!addingCardToFirestore && ("Ajouter !")}
              </button>
              {/* )} */}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
