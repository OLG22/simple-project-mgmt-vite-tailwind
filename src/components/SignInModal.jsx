import React, { useContext, useRef, useState } from 'react'
import { UserContext } from '../context/userContext'
import { validEmail } from './Regex'

export default function SignInModal() {
    /*****************************************************************************************************
     *****************************************************************************************************
     * CONTEXT
     *****************************************************************************************************
    *****************************************************************************************************/
    const { signIn, signInWithGooglePopup, toggleModals, persistenceMode, togglePersistenceMode } = useContext(UserContext)

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
    const rememberMeRef = useRef('rememberMeRef')
    const signInEmail = useRef('signInEmail')
    const signInPwd = useRef('signInPwd')
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
            const cred = await signIn(
                signInEmail.current.value,
                signInPwd.current.value
            );
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
                    <h3 className="text-xl w-max font-medium text-gray-900 dark:text-white">Se connecter sur notre plateforme</h3>
                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 aspect-square ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={() => toggleModals("close")}>
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span className="sr-only">Fermer</span>
                    </button>
                </div>

                {/* bouton google */}
                <a href="#" onClick={signInWithGooglePopup} className="flex text-sm justify-center align-middle border px-2 py-2 rounded 
                hover:bg-slate-100">
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.3081 10.2303C20.3081 9.55056 20.253 8.86711 20.1354 8.19836H10.7031V12.0492H16.1046C15.8804 13.2911 15.1602 14.3898 14.1057 15.0879V17.5866H17.3282C19.2205 15.8449 20.3081 13.2728 20.3081 10.2303Z" fill="#3F83F8"></path><path d="M10.7019 20.0006C13.3989 20.0006 15.6734 19.1151 17.3306 17.5865L14.1081 15.0879C13.2115 15.6979 12.0541 16.0433 10.7056 16.0433C8.09669 16.0433 5.88468 14.2832 5.091 11.9169H1.76562V14.4927C3.46322 17.8695 6.92087 20.0006 10.7019 20.0006V20.0006Z" fill="#34A853"></path><path d="M5.08857 11.9169C4.66969 10.6749 4.66969 9.33008 5.08857 8.08811V5.51233H1.76688C0.348541 8.33798 0.348541 11.667 1.76688 14.4927L5.08857 11.9169V11.9169Z" fill="#FBBC04"></path><path d="M10.7019 3.95805C12.1276 3.936 13.5055 4.47247 14.538 5.45722L17.393 2.60218C15.5852 0.904587 13.1858 -0.0287217 10.7019 0.000673888C6.92087 0.000673888 3.46322 2.13185 1.76562 5.51234L5.08732 8.08813C5.87733 5.71811 8.09302 3.95805 10.7019 3.95805V3.95805Z" fill="#EA4335"></path>

                    </svg>
                    Se connecter avec Google
                </a>

                {/* séparateur */}
                <div className="flex justify-between items-center my-2">
                    <div className="h-[2px] w-full bg-slate-200"></div>
                    <div className="mx-5 mb-1">ou</div>
                    <div className="h-[2px] w-full bg-slate-200"></div>
                </div>

                {/* Le bloc suivant pourrait être dynamique */}
                <form ref={formRef} className="space-y-6" onSubmit={onSubmitForm} noValidate>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre email</label>
                        <input ref={signInEmail} type="email" name="email" id="email" className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white ${signInEmailAddClass}`} placeholder="votre.mail@mail.com" required />
                        <p className="text-xs text-red-600 dark:text-red-400 ">{validationMail}</p>
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Votre mot de passe</label>
                        <input ref={signInPwd} type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="••••••••" required />
                    </div>
                    <div className="flex justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input ref={rememberMeRef} id="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" onChange={() => togglePersistenceMode()} checked={persistenceMode} required />
                            </div>
                            <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Se rappeler de moi</label>
                        </div>
                        <a href="#" className="text-sm font-medium text-blue-700 hover:underline dark:text-blue-500" onClick={() => toggleModals("forgotPwd")}>Mot de passe oublié?</a>
                    </div>

                    <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Se connecter</button>
                </form>
                {/* Fin du bloc dynamique */}

                <div className="border-b dark:border-gray-500 m-auto my-6"></div>

                <div className="w-full flex justify-end">
                    <a href="#" className="text-sm text-blue-700 hover:underline dark:text-blue-500" onClick={() => toggleModals("signUp")}>Vous n'avez pas de compte ?</a>
                </div>



            </div >
        </>
    )
}
