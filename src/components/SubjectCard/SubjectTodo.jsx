import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner";
import { db } from "../../firebase-config";
import { doc, getDocs, collection } from "firebase/firestore";

export default function SubjectTodo({ subjectId }) {
  /*****************************************************************************************************
   *****************************************************************************************************
   * STATES
   *****************************************************************************************************
  ******************************************************************************************************/
  const [taskDescription, setTaskDescription] = useState();
  const [addingTaskForm, setAddingTaskForm] = useState(false);
  const [updating, setUpdating] = useState(false);

  /*****************************************************************************************************
   *****************************************************************************************************
   * REFERENCES
   *****************************************************************************************************
  ******************************************************************************************************/
  const newTaskContent = useRef("newTaskContent")

  /*****************************************************************************************************
   *****************************************************************************************************
   * EFFECT
   *****************************************************************************************************
  ******************************************************************************************************/
  useEffect(() => {

    //console.log("subjectDescription rerender:", modifyingElement);
  }, []);

  /*****************************************************************************************************
   *****************************************************************************************************
   * FUNCTIONS
   *****************************************************************************************************
  ******************************************************************************************************/

  /**************************************************************************
  * Ajouter une tache
  **************************************************************************/
  const toggleAddingTaskForm = () => {
    setAddingTaskForm(!addingTaskForm)
  }

  /**************************************************************************
  * Ajouter une tache
  **************************************************************************/
  const addTask = async (e) => {
    e.preventDefault();



  };

  return (
    <>




      <div className="mx-auto mb-5 w-2/3 border-t border-gray-200 group-hover:border-gray-100" ></div>
      <div className={`relative group mb-5 p-2 text-base text-gray-700 dark:text-gray-400 border rounded-lg border-yellow-200 bg-yellow-50 text-justify font-normal`}>
        <ul>
          <li className="flex items-center mr-4">
            <input id="yellow-checkbox" type="checkbox" value="" className="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <label htmlFor="yellow-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Yellow</label>
          </li>
        </ul>
        <div className="absolute right-2 -top-3 group-hover:border-t group-hover:border-x rounded-t-lg group-hover:border-yellow-200 group-hover:bg-yellow-50 w-6 h-3 "></div>


        <button className="absolute group/edit right-3 -top-2" onClick={() => toggleAddingTaskForm()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4  text-transparent group-hover:text-yellow-500 group-hover/edit:text-yellow-700">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
        {addingTaskForm && (
          <form action="" className="flex w-full justify-between text-right my-3" onSubmit={(e) => addTask(e, subjectId)}>
            <input ref={newTaskContent} defaultValue={""} id="description" className="w-full p-1 mr-5 text-[14px] text-gray-900 bg-gray-50 rounded-lg border border-sky-200 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nouvelle tâche" />
            <button type="submit" className="flex font-medium rounded-lg text-[12px] px-3 py-1 text-center justify-center text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 shadow-lg shadow-yellow-500/50 dark:shadow-lg dark:shadow-yellow-800/80">
              {updating && (
                <>
                  <Spinner width={3} height={3} />
                  <span>
                    Mise à jour ...
                  </span>
                </>
              )}
              {!updating && ("Ajouter")}
            </button>

          </form>
        )}

      </div>
    </>
  )
}
