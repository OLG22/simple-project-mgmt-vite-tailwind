import React, { useState, useEffect } from 'react';
// import { collection, getDocs } from "firebase/firestore";
// import firebase from 'firebase/app';
// import 'firebase/firestore';

const Card = ({ subject, date, status, owner, cardId }) => {
    const [expanded, setExpanded] = useState(false);
    const [notes, setNotes] = useState([]);
    const [editableSubject, setEditableSubject] = useState(subject);
    const [editableDate, setEditableDate] = useState(date);
    const [editableStatus, setEditableStatus] = useState(status);
    const [editableOwner, setEditableOwner] = useState(owner);

    const toggleExpansion = async () => {
        if (!expanded) {
            // const notesRef = firebase.firestore().collection('notes').where('subjectId', '==', cardId);
            // const notesSnapshot = await notesRef.get();
            // const notesData = notesSnapshot.docs.map((doc) => doc.data());
            // setNotes(notesData);
        }
        setExpanded(!expanded);
        console.log(expanded);
    };

    const updateCardInfo = () => {
        // Mettre à jour les informations du sujet
        // Insérer une note pour chaque modification

        // const batch = firebase.firestore().batch();
        // const cardRef = firebase.firestore().collection('cards').doc(cardId);
        // const noteRef = firebase.firestore().collection('notes');

        // batch.update(cardRef, {
        //     subject: editableSubject,
        //     date: editableDate,
        //     status: editableStatus,
        //     owner: editableOwner,
        // });

        // Insérer une note pour chaque champ modifié

        // const fields = ['subject', 'date', 'status', 'owner'];
        // fields.forEach((field) => {
        //     const originalValue = eval(`subject`);
        //     const updatedValue = eval(`editable${field}`);
        //     if (originalValue !== updatedValue) {
        //         batch.set(noteRef.doc(), {
        //             subjectId: cardId,
        //             field,
        //             oldValue: originalValue,
        //             newValue: updatedValue,
        //             timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        //         });
        //     }
        // });

        // batch.commit();
    };

    return (

        <>
            <div className="w-full p-4 m-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white" onClick={toggleExpansion}>{subject}</h5>
                {expanded && <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Historique : Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, earum voluptas. Nobis expedita voluptas ea optio, numquam quam molestiae culpa, minima, nostrum laborum libero eum repellat sunt odio. Odio tenetur earum aut provident laborum autem reiciendis dolorum, sunt ea quis asperiores ratione nobis animi voluptates similique labore vel placeat impedit in molestiae unde quam illum est. Rem quasi nobis expedita porro! Possimus, fuga ut deserunt, sint, hic nemo suscipit quibusdam eveniet fugiat quae ullam? Laboriosam alias velit exercitationem? Ipsa rem esse sunt suscipit deleniti eveniet alias modi accusantium! Iusto facilis ab aliquam explicabo enim cum adipisci quasi numquam ullam accusamus!</p>}
                <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">

                </div>
            </div>
        </>








        // <div className={`card ${expanded ? 'expanded' : ''}`} onClick={toggleExpansion}>
        //     <div className="card-header">
        //         {expanded ? (
        //             <div>
        //                 <input type="text" value={editableSubject} onChange={(e) => setEditableSubject(e.target.value)} />
        //                 <input type="text" value={editableDate} onChange={(e) => setEditableDate(e.target.value)} />
        //                 <input type="text" value={editableStatus} onChange={(e) => setEditableStatus(e.target.value)} />
        //                 <input type="text" value={editableOwner} onChange={(e) => setEditableOwner(e.target.value)} />
        //             </div>
        //         ) : (
        //             <div>
        //                 <h2>{editableSubject}</h2>
        //                 <p>Date: {editableDate}</p>
        //                 <p>Statut: {editableStatus}</p>
        //                 <p>Propriétaire: {editableOwner}</p>
        //             </div>
        //         )}
        //     </div>
        //     {expanded && (
        //         <div className="card-notes">
        //             <h3>Historique des Notes</h3>
        //             <ul>
        //                 {notes.map((note, index) => (
        //                     <li key={index}>{note.text}</li>
        //                 ))}
        //             </ul>
        //             <button onClick={updateCardInfo}>Enregistrer</button>
        //         </div>
        //     )}
        // </div>

    );
};

{/* export default Card; */ }

export default function Cards() {

    const cardsList = [
        { subject: "Sujet 1", date: "31/01/1980", status: "En cours", owner: "UID1", cardId: 1 },
        { subject: "Sujet 2", date: "31/01/1980", status: "A faire", owner: "UID2", cardId: 2 },
        { subject: "Sujet 3", date: "31/01/1980", status: "En pause", owner: "UID1", cardId: 3 },
        { subject: "Sujet 4", date: "31/01/1980", status: "Terminé", owner: "UID2", cardId: 4 },
    ]

    return (
        <div className="py-5 px-10 w-full ">
            {cardsList.map((card, index) => <Card {...card} key={card.cardId} />)}
        </div>
    )
}