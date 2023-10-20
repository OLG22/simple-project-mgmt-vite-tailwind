import React, { useContext, useRef, useState } from 'react'
import { UserContext } from '../context/userContext'
import { validPassword, validEmail } from './Regex'


export default function InscriptionModal() {

    const { signUp, toggleModals, persistenceMode, togglePersistenceMode } = useContext(UserContext)

    const rememberMeRef = useRef('rememberMeRef')
    const signUpEmail = useRef('signUpEmail')
    const signUpPwd = useRef('signUpPwd')
    const repeatPwd = useRef('repeatPwd')
    const formRef = useRef('formRef')

    const [validationMail, setValidationMail] = useState("")
    const [validationPwd, setValidationPwd] = useState("")
    const [signUpEmailAddClass, setSignUpEmailAddClass] = useState("")
    const [signUpPwdAddClass, setSignUpPwdAddClass] = useState("")


    const onSubmitForm = async (e) => {
        e.preventDefault()

        // Validation coté client
        if (!validEmail.rule.test(signUpEmail.current.value)) {
            setValidationMail(validEmail.ruleLabel)
            setSignUpEmailAddClass("border-red-500 dark:border-red-500")
            return;
        }
        else {
            setValidationMail("")
            setSignUpEmailAddClass("")
        }

        if (!validPassword.rule.test(signUpPwd.current.value)) {
            setValidationPwd(validPassword.ruleLabel)
            setSignUpPwdAddClass("border-red-500 dark:border-red-500")
            return;
        }
        else if (signUpPwd.current.value !== repeatPwd.current.value) {
            setValidationPwd("Les mots de passe ne sont pas identiques")
            setSignUpPwdAddClass("border-red-500 dark:border-red-500")
            return;
        }

        //Si la validation de l'adresse mail et du mot de passe est bonne alors on demande la création du compte
        else {
            setValidationPwd("")
            setSignUpPwdAddClass("")

            // Envoi du formulaire coté serveur
            try {
                const cred = await signUp(
                    signUpEmail.current.value,
                    signUpPwd.current.value
                );
                console.log(cred);
                formRef.current.reset()
                toggleModals("close");
            }
            catch {
                console.log("Une erreur est survenue lors de la creation de votre compte !")
            }
        }
    }

    return (
        <>
            <div id="inscription-modal" tabIndex="-1" aria-hidden="true" className="fixed top-[68px] z-50 w-full h-full backdrop-blur flex justify-center items-center" onClick={() => toggleModals("close")}>
            </div >

            <div className="mx-auto w-96 top-60 fixed inset-x-0 items-center z-[51] h-auto bg-white rounded-lg shadow dark:bg-gray-700 p-4">

                <div className="mb-4 w-full flex pb-4 border-b dark:border-gray-500">
                    <h3 className="text-xl w-max font-medium text-gray-900 dark:text-white">S'inscrire sur notre plateforme</h3>
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
                        <input ref={signUpEmail} type="email" name="email" id="email" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${signUpEmailAddClass}`} placeholder="votre.mail@mail.com" required />
                        <p className="text-xs text-red-600 dark:text-red-400 ">{validationMail}</p>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre mot de passe</label>
                        <input ref={signUpPwd} type="password" name="password" id="password" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${signUpPwdAddClass}`} placeholder="••••••••" required />
                    </div>
                    <div>
                        <label htmlFor="repeatPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Répéter votre mot de passe</label>
                        <input ref={repeatPwd} type="password" name="repeatPassword" id="repeatPassword" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${signUpPwdAddClass}`} placeholder="••••••••" required />
                        <p className="text-xs text-red-600 dark:text-red-400 ">{validationPwd}</p>
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input ref={rememberMeRef} id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" onChange={() => togglePersistenceMode()} checked={persistenceMode} required />
                        </div>
                        <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Se rappeler de moi</label>
                    </div>

                    <div className='border-b dark:border-gray-500 m-auto'></div>

                    <button type="submit" className="w-full  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Créer votre compte</button>
                </form>
                {/* Fin du bloc dynamique */}

            </div >
        </>
    )
}
