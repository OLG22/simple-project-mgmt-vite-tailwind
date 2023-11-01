import React, { useState, useEffect } from 'react';
import Card from '../../../components/Card';
import { useNavigate } from 'react-router-dom';
// import { collection, getDocs } from "firebase/firestore";
// import firebase from 'firebase/app';
// import 'firebase/firestore';



{/* export default Card; */ }

export default function Cards() {

    const cardsList = [
        { subject: "Sujet 1 : Lorem ipsum dolor sit amet.", date: "31/01/1980", status: "En cours", owner: "UID1", cardId: 1 },
        { subject: "Sujet 2 : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati amet repellendus doloremque! Voluptatibus voluptas doloribus tempore aperiam numquam vel velit.", date: "31/01/1980", status: "A faire", owner: "UID2", cardId: 2 },
        { subject: "Sujet 3 : Lorem ipsum dolor ", date: "31/01/1980", status: "En pause", owner: "UID1", cardId: 3 },
        { subject: "Sujet 4 : Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati amet repellendus doloremque! Voluptatibus.", date: "31/01/1980", status: "Terminé", owner: "UID2", cardId: 4 },
    ]

    const navigate = useNavigate()

    return (
        <>
        <div className="flex justify-end items-center py-5 px-10">
        <button type="button" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center" onClick={() => navigate("../addCard")}>Ajouter un sujet</button>
        </div>
        <div className="px-10 w-full ">
            {cardsList.map((card, index) => <Card {...card} key={card.cardId} />)}
        </div>
        </>
    )
}