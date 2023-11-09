import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { db } from "../firebase-config";
import { doc, getDocs, collection } from "firebase/firestore";

export default function Todo({subjectId}) {




  /**************************************************************************
  * Ajouter une tache
  **************************************************************************/
  const loadTasks = async (e) => {

  }

  /**************************************************************************
  * Ajouter une tache
  **************************************************************************/
  const addTask = async (e) => {
    e.preventDefault();

  };

  return (
    <>
    <p className={`pt-5 border-t border-grey-200`}></p>
    <div className={`relative group mb-5 p-2 text-base text-gray-700 dark:text-gray-400 border rounded-lg border-yellow-200 bg-yellow-50 text-justify font-normal`}>
      <ul>
      <li>Toto 1</li>
      <li>Toto 2</li>
      <li>Toto 3</li>
      <li>Toto 4</li>
      <li>Toto 5</li>
      <li>Toto 6</li>
      </ul>
    </div>
  </>
  )
}
