import React, { useRef, useState, useEffect, useContext } from "react";
import { db } from "../../firebase-config";
import { doc, getDocs, collection, addDoc, query, orderBy, deleteDoc } from "firebase/firestore";
import Spinner from "../Spinner";
import { UserContext } from '../../context/userContext'

export default function SubjectTodo({ subjectId, setVisibility }) {
  /*****************************************************************************************************
   *****************************************************************************************************
   * CONTEXT
   *****************************************************************************************************
  *****************************************************************************************************/
   const { currentUser, currentUserDataProfile } = useContext(UserContext);

  /*****************************************************************************************************
   *****************************************************************************************************
   * STATES
   *****************************************************************************************************
  *****************************************************************************************************/
  const [tasks, setTasks] = useState([]);
  const [addingTaskForm, setAddingTaskForm] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [loading, setLoading] = useState(false);

  /*****************************************************************************************************
   *****************************************************************************************************
   * REFERENCES
   *****************************************************************************************************
  *****************************************************************************************************/
  const newTaskContent = useRef("newTaskContent")

  /*****************************************************************************************************
   *****************************************************************************************************
   * EFFECT
   *****************************************************************************************************
  *****************************************************************************************************/
  useEffect(() => {
    getTasks()
    //console.log("tasks :", tasks);
    //Par défaut si la liste des tâches est vide on affiche le formulaire de saisie
    if (tasks.length === 0) {
      setAddingTaskForm(true)
      setVisibility(true)
      console.log("render of todo : if")
    }
    else {
      setAddingTaskForm(false)
      setVisibility(true)
      console.log("render of todo : else")
    }

  }, []);

  /*****************************************************************************************************
   *****************************************************************************************************
   * FUNCTIONS
   *****************************************************************************************************
  *****************************************************************************************************/

  /**************************************************************************
  * Ajouter une tache
  **************************************************************************/
  const toggleAddingTaskForm = () => {
    setAddingTaskForm(!addingTaskForm)
  }

  /**************************************************************************
  * Obtenir l'historique
  **************************************************************************/
  const getTasks = async () => {
    setLoading(true);

    try {
      //Les 3 étapes pour obtenir les document d'une sous-collection
      const docRef = doc(db, "subjects", subjectId);
      const colTasks = query(collection(docRef, "tasks"), orderBy("createdDate", "asc"))
      const tasksDocs = await getDocs(colTasks)
        .then((QueryDocumentSnapshot) => setTasks(QueryDocumentSnapshot.docs))
    }
    catch (error) {
      console.log("Une erreur est survenue : ", error.name);
      console.log("Une erreur est survenue : ", error.message);
    }

    setLoading(false);
  }

  /**************************************************************************
  * Ajouter une tache
  **************************************************************************/
  const addTask = async (e) => {
    e.preventDefault();

    if (newTaskContent.current.value !== "") {

      setUpdating(true);

      try {
        const docRef = await addDoc(collection(doc(db, "subjects", subjectId), "tasks"), {
          description: newTaskContent.current.value,
          userId: currentUser.uid,
          createdDate: new Date(),
          done: false
        });
        newTaskContent.current.value = ""
        await getTasks()
      } catch (error) {
        console.log("Une erreur est survenue : ", error.name);
        console.log("Une erreur est survenue : ", error.message);
      }

      setUpdating(false);
    }
  };

  /**************************************************************************
  * Supprimer une tache
  **************************************************************************/
  const deleteTask = async (taskId) => {

    try {
      await deleteDoc(doc(db, "subjects", subjectId, "tasks", taskId))
      await getTasks()
    }
    catch (error) {
      console.log("Une erreur est survenue : ", error.name);
      console.log("Une erreur est survenue : ", error.message);
    }
  };

  /**************************************************************************
  * Coche une tache comme faite
  **************************************************************************/
  const toggleDoneTask = async (taskId) => {



      try {
        await updateDoc(doc(db, "subjects", subjectId, "tasks", taskId), {
          done: true
      })

        await getTasks()
      } catch (error) {
        console.log("Une erreur est survenue : ", error.name);
        console.log("Une erreur est survenue : ", error.message);
      }


  };

  /*****************************************************************************************************
   *****************************************************************************************************
   * RENDER
   *****************************************************************************************************
   *****************************************************************************************************/
  return (
    <>
      <div className="hidden mx-auto mb-5 w-2/3 border-t border-gray-200 group-hover:border-gray-100" ></div>
      <div className={`relative group mb-5 p-2 text-base text-gray-700 dark:text-gray-400 border rounded-lg border-yellow-200 bg-yellow-100 text-justify font-normal`}>
        <ul>
          {tasks.map((task) => (
            //console.log(task)
            <li key={task.id} className="flex group/li items-center mr-4 hover:bg-yellow-50 ">
              <input id={`${task.id}`} type="checkbox" value="" className="w-4 h-4 text-yellow-400 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500 dark:focus:ring-yellow-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
              <label htmlFor={`${task.id}`} className="w-full ml-2 text-sm text-gray-900 dark:text-gray-300">{task.data().description}</label>
              <button className="group/me ml-2" onClick={() => deleteTask(task.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 20" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4  text-transparent group-hover/li:text-red-500 group-hover/me:text-red-700">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h16M7 8v8m4-8v8M7 1h4a1 1 0 0 1 1 1v3H6V2a1 1 0 0 1 1-1ZM3 5h12v13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5Z" />
                </svg>
              </button>
            </li>
          )
          )}
        </ul>
        <div className="absolute right-2 -top-3 group-hover:border-t group-hover:border-x rounded-t-lg group-hover:border-yellow-200 group-hover:bg-yellow-50 w-6 h-3 "></div>
        <button className="absolute group/edit right-3 -top-2" onClick={() => toggleAddingTaskForm()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4  text-transparent group-hover:text-yellow-500 group-hover/edit:text-yellow-700">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 5.757v8.486M5.757 10h8.486M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
        {loading && (
          <div className="flex w-full justify-center ">

            <Spinner width={8} height={8} />
          </div>
        )}
        {!loading && addingTaskForm && (
          <form action="" className="flex w-full justify-between text-right my-3" onSubmit={(e) => addTask(e, subjectId)}>
            <input ref={newTaskContent} defaultValue={""} id="description" className="w-full py-1 px-2 mr-5 text-[14px] text-gray-900 bg-gray-50 rounded-lg border border-sky-200 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nouvelle tâche" />
            <button type="submit" className="flex w-auto font-medium rounded-lg text-[12px] px-3 py-1 text-center justify-center text-white bg-gradient-to-r from-yellow-500 via-yellow-600 to-yellow-700 hover:bg-gradient-to-br focus:ring-1 focus:outline-none focus:ring-yellow-300 dark:focus:ring-yellow-800 shadow-lg shadow-yellow-500/50 dark:shadow-lg dark:shadow-yellow-800/80">
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

      </div >
    </>
  )
}
