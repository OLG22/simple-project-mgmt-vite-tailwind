import React, { useState, useContext } from 'react'

export default function Card({ subject, date, status, owner, cardId }) {
    const [expanded, setExpanded] = useState(false)
    const [notes, setNotes] = useState([])
    const [editableSubject, setEditableSubject] = useState(subject)
    const [editableDate, setEditableDate] = useState(date)
    const [editableStatus, setEditableStatus] = useState(status)
    const [editableOwner, setEditableOwner] = useState(owner)

    const toggleExpansion = async () => {
        if (!expanded) {

        }
        setExpanded(!expanded);
        console.log(expanded);
    }

    const updateCardInfo = () => {

    }

    return (
        <>
            <div className="w-full px-4 m-4 bg-white border border-gray-200 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] dark:bg-gray-800 dark:border-gray-700">
                <h5 className="leading-10 font-bold text-gray-900 dark:text-white" onClick={toggleExpansion}>{subject}</h5>
                {expanded && <p className="mb-5 text-base text-gray-500 sm:text-lg dark:text-gray-400">Historique : Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, earum voluptas. Nobis expedita voluptas ea optio, numquam quam molestiae culpa, minima, nostrum laborum libero eum repellat sunt odio. Odio tenetur earum aut provident laborum autem reiciendis dolorum, sunt ea quis asperiores ratione nobis animi voluptates similique labore vel placeat impedit in molestiae unde quam illum est. Rem quasi nobis expedita porro! Possimus, fuga ut deserunt, sint, hic nemo suscipit quibusdam eveniet fugiat quae ullam? Laboriosam alias velit exercitationem? Ipsa rem esse sunt suscipit deleniti eveniet alias modi accusantium! Iusto facilis ab aliquam explicabo enim cum adipisci quasi numquam ullam accusamus!</p>}
                <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">

                </div>
            </div>
        </>
    )
}