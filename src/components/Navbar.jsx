import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../context/userContext'


export default function Navbar() {

    const { currentUser, toggleModals, logOut } = useContext(UserContext)
    const menuNavBar = [
        { name: "Accueil", target: "/" },
        { name: "Mon profil", target: "/pages/private/userProfile" },
        { name: "Mon espace", target: "/pages/private/PrivateHome" },
        { name: "Les actions", target: "/pages/private/cards" },
        { name: "Contact", target: "/" },
    ]

    return (
        <>
            <nav className="fixed w-full z-20 top-0 left-0 shadow-md border-b bg-gray-300 dark:bg-gray-900 border-gray-400 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-nowrap items-center justify-between mx-auto p-1">

                    <div className="items-center justify-between w-auto md:flex md:w-auto md:order-1">
                        <button type="button" className="inline-flex items-center py-1 w-6 h-6 justify-center text-sm text-gray-500 rounded-sm md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            {/* <svg className="" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
                            </svg> */}
                            <svg className="" xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true" viewBox="0 0 17 14"    >
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"></path>
                            </svg>
                        </button>

                        <Link to="/">
                            {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" /> */}
                            <span className="ml-2 self-center text-2xl font-semibold whitespace-nowrap dark:text-white">GIPEL</span>
                        </Link>
                    </div>

                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-2" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:border-0  dark:bg-gray-800 dark:border-gray-700">
                            {menuNavBar.map((menuItem, index) => <li key={index}><Link to={menuItem.target} className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 text-gray-900 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">{menuItem.name}</Link></li>
                            )}
                        </ul>
                    </div>

                    <div className="md:order-3">
                        {(currentUser === null) && (
                            <button onClick={() => toggleModals("signUp")} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 mr-3  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-400">Insription</button>
                        )}
                        {(currentUser === null) && (
                            <button onClick={() => toggleModals("signIn")} type="button" className="text-white bg-blue-300 hover:bg-blue-400 focus:ring-2 focus:outline-none focus:ring-blue-100 font-medium rounded-lg text-sm px-4 py-1 mr-3 md:mr-0 dark:bg-blue-300 dark:hover:bg-blue-400 dark:focus:ring-blue-100">Connexion</button>
                        )}
                        {(currentUser !== null) && (
                            <button onClick={() => logOut()} type="button" className="text-white bg-red-500 hover:bg-red-600 focus:ring-2 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1 text-center mr-3 md:mr-0 dark:bg-red-500 dark:hover:bg-red-500 dark:focus:ring-red-300">Déconnexion</button>
                        )}
                    </div>

                </div>
            </nav>

        </>
    )
}
