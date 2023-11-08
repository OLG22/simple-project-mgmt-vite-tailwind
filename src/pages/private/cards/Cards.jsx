import React, { useState, useEffect } from "react";
import SubjectCard from "../../../components/SubjectCard";
import { useNavigate } from "react-router-dom";
import { db } from "../../../firebase-config";
import { doc, getDocs, collection } from "firebase/firestore";
import Spinner from "../../../components/Spinner";

{
  /* export default Card; */
}

export default function Cards() {
  const [loading, setLoading] = useState(false);
  const [cardsData, setCardsData] = useState([]);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  {/**************************************************************************
    * INITIALISATION
   **************************************************************************/}
  useEffect(() => {
    const getAllCards = async () => {
      setLoading(true);

      try {

        await getDocs(collection(db, "subjects")).then((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => ({
            title: doc.data().title,
            eventDate: doc.data().eventDate,
            status: doc.data().status,
            owner: doc.data().owner,
            description: doc.data().description,
            cardId: doc.id,
          }));
          setCardsData([...data]); // Il faut déstructurer le tableau pour le restructurer dans un tableau afin que le state fonctionne, on ne peut pas utiliser directement data
        });

        //await delay(1000);

        //console.log("1. cardsData :", cardsData);

        setLoading(false);
      }

      catch (error) {
        console.log("Une erreur est survenue : ", error.name);
        console.log("Une erreur est survenue : ", error.message);
      }
    }

    getAllCards();

    //console.log(cardsData);
    //console.log(cardsList);

    //console.log("2. cardsData :", cardsData);
  }, []);

  {/**************************************************************************
   * NAVIGATE
   **************************************************************************/}
  const navigate = useNavigate();

  {/**************************************************************************
   * RENDER
   **************************************************************************/}

  return (
    <>
      <div className="flex justify-end items-center py-5 px-10">
        <button type="button" className="rounded-lg text-[14px] px-5 py-1.5 text-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium " onClick={() => navigate("../addCard")}>
          Ajouter un sujet
        </button>
      </div>
      {loading && (
        <div className="flex justify-center items-center">
          <Spinner width={8} height={8} />
        </div>
      )}
      {!loading && (
        <div className="px-10 w-full ">
          {cardsData.map((card) => (
            <SubjectCard {...card} key={card.cardId} />
          ))}
        </div>
      )}
    </>
  );
}
