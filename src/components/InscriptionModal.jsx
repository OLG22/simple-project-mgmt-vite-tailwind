import React, { useContext, useRef, useState } from 'react'
import { UserContext } from '../context/userContext'
import { validPassword, validEmail } from './Regex'


export default function InscriptionModal() {

    const { signUp, currentUser, toggleModals } = useContext(UserContext)

    const signUpEmail = useRef('signUpEmail')
    const signUpPwd = useRef('signUpPwd')
    const repeatPwd = useRef('repeatPwd')

    const [validationMail, setValidationMail] = useState("")
    const [validationPwd, setValidationPwd] = useState("")
    const [signUpEmailAddClass, setSignUpEmailAddClass] = useState("")
    const [signUpPwdAddClass, setSignUpPwdAddClass] = useState("")

    // console.log(props)

    const closeModal = (e) => {
        e.stopPropagation() // Permet la fermeture sur clic du backdrop mais pas sur ses enfants (donc la modale)
        e.nativeEvent.stopImmediatePropagation()
        //console.log(e)
        console.log("On ferme la modale")
        //toggleModals("close")
    }

    const onSubmitForm = async (e) => {
        e.preventDefault()

        // Valitation part

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
        else {
            setValidationPwd("")
            setSignUpPwdAddClass("")
        }

        // Envoi du formulaire coté serveur

        // coder içi les vérification coté front
        // try {
        //     const cred = await signUp()
        // }
        // catch {
        //fixed top-0 left-0 right-0 z-50 hidden
        // }

    }

    return (
        <>
            <div id="inscription-modal" tabIndex="-1" aria-hidden="true" className="fixed top-[68px] z-50 w-full h-full backdrop-blur flex justify-center items-center" onClick={closeModal}>
                {/* </div>
            <div id="inscription-modal" tabIndex="-1" aria-hidden="true" className="fixed top-[68px] z-50 w-full h-full flex justify-center items-center"> */}
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 max-w-md w-96 h-auto p-4 z-50" onClick={() => console.log("Test")}>

                    <div className="mb-4 flex pb-4 border-b dark:border-gray-500">
                        <h3 className="text-xl w-max font-medium text-gray-900 dark:text-white">S'inscrire sur notre plateforme</h3>
                        <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 aspect-square ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={closeModal}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>

                    {/* Le bloc suivant pourrait être dynamique */}
                    <form className="space-y-6" onSubmit={onSubmitForm} noValidate>
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
                        <div className='border-b dark:border-gray-500 m-auto'></div>
                        <button type="submit" className="w-full  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Créer votre compte</button>
                    </form>
                    {/* Fin du bloc dynamique */}

                </div >
            </div >
        </>
    )
}
