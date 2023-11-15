import React, { useContext, useRef, useState } from 'react'
import { UserContext } from '../context/userContext'
import { validEmail } from './Regex'

export default function ForgotPasswordModal() {
    /*****************************************************************************************************
     *****************************************************************************************************
     * CONTEXT
     *****************************************************************************************************
    *****************************************************************************************************/
    const { toggleModals, sendPasswordReset } = useContext(UserContext)

    /*****************************************************************************************************
     *****************************************************************************************************
     * STATES
     *****************************************************************************************************
    *****************************************************************************************************/
    const [validationMail, setValidationMail] = useState("")
    const [signInEmailAddClass, setSignInEmailAddClass] = useState("")
    /*****************************************************************************************************
     *****************************************************************************************************
     * REFERENCES
     *****************************************************************************************************
    *****************************************************************************************************/
    const signInEmail = useRef('signInEmail')
    const formRef = useRef('formRef')

    /*****************************************************************************************************
     *****************************************************************************************************
     * EFFECT
     *****************************************************************************************************
    *****************************************************************************************************/

    /*****************************************************************************************************
     *****************************************************************************************************
     * FUNCTIONS
     *****************************************************************************************************
    *****************************************************************************************************/

    /**************************************************************************
    * Validation du formulaire de connexion
    **************************************************************************/
    const onSubmitForm = async (e) => {
        e.preventDefault()

        if (!validEmail.rule.test(signInEmail.current.value)) {
            setValidationMail(validEmail.ruleLabel)
            setSignInEmailAddClass("border-red-500 dark:border-red-500")
            return;
        }
        else {
            setValidationMail("")
            setSignInEmailAddClass("")
        }

        // Envoi du formulaire coté serveur
        try {
            const cred = await sendPasswordReset(signInEmail.current.value);
            //console.log(cred);
            formRef.current.reset()
            toggleModals("close");
        }
        catch (error) {
            console.log(error.name)
            console.log(error.message)
        }
    }

    return (
        <>
            <div id="connexion-modal-backdrop" tabIndex="-1" aria-hidden="true" className="fixed top-[40px] z-50 w-full h-full backdrop-blur flex justify-center items-center" onClick={() => toggleModals("close")}>
            </div >

            <div id="connexion-modal" className="mx-auto w-96 top-60 fixed inset-x-0 items-center z-[51] h-auto bg-white rounded-lg shadow dark:bg-gray-700 p-4">

                <div className="mb-4 w-full flex pb-4 border-b dark:border-gray-500">
                    <h3 className="text-xl w-max font-medium text-gray-900 dark:text-white">Récupération de mot de passe</h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 aspect-square ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => toggleModals("close")}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Fermer</span>
                    </button>
                </div>

                {/* Le bloc suivant pourrait être dynamique */}
                <form ref={formRef} className="space-y-6" onSubmit={onSubmitForm} noValidate>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre email</label>
                        <input ref={signInEmail} type="email" name="email" id="email" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${signInEmailAddClass}`} placeholder="votre.mail@mail.com" required />
                        <p className="text-xs text-red-600 dark:text-red-400 ">{validationMail}</p>
                    </div>

                    {/* <div className="border-b dark:border-gray-500 m-auto"></div> */}

                    <button type="submit" className="w-full text-white font-medium bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Envoyer un mail de récupération</button>
                </form>
                {/* Fin du bloc dynamique */}

            </div >
        </>
    )
}
