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
            <div className="w-full px-4 m-2 bg-white border border-gray-200 rounded-lg shadow-[5px_5px_10px_0px_rgba(0,0,0,0.3)] dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-center items-center">
                    <div className="text-[14px] leading-10 w-full font-bold truncate text-gray-900 dark:text-white" onClick={toggleExpansion}>{subject}</div>
                    <div className="relative max-w-sm">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                            <svg className="w-3 h-3 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                            </svg>
                        </div>
                        <input type="text" className="font-bold text-[12px] rounded-lg block w-[100px] pl-7 bg-gray-50 border border-gray-300 text-gray-900  focus:ring-blue-500 focus:border-blue-500  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date" />

                    </div>
                    <button type="button" className="text-[12px] w-7 h-7 ml-1 rounded-full hover:ring-1 ring-gray-500 bg-gray-100 focus:ring-gray-300 dark:focus:ring-gray-600">
                        <span className="sr-only">Open user menu</span>
                        {owner}
                    </button>
                </div>
                {expanded &&
                    <>
                        <div className="border-b border-gray-200 m-auto"></div>
                        <p className="mb-5 text-[10px] text-gray-500 dark:text-gray-400">Historique : Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, earum voluptas. Nobis expedita voluptas ea optio, numquam quam molestiae culpa, minima, nostrum laborum libero eum repellat sunt odio. Odio tenetur earum aut provident laborum autem reiciendis dolorum, sunt ea quis asperiores ratione nobis animi voluptates similique labore vel placeat impedit in molestiae unde quam illum est. Rem quasi nobis expedita porro! Possimus, fuga ut deserunt, sint, hic nemo suscipit quibusdam eveniet fugiat quae ullam? Laboriosam alias velit exercitationem? Ipsa rem esse sunt suscipit deleniti eveniet alias modi accusantium! Iusto facilis ab aliquam explicabo enim cum adipisci quasi numquam ullam accusamus!</p>
                    </>
                }
                <div className="items-center justify-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">

                </div>
            </div >
        </>
    )
}