import React, { forwardRef } from "react"

const Input = forwardRef(function ({ type = "text", id, title, placeholder, defaultValue = "", required = false, addClass = "" }, ref) {

    return (
        <>
            <label
                htmlFor={id}
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
                {title}
            </label>
            <input
                ref={ref}
                type={type}
                name={id}
                id={id}
                defaultValue={defaultValue}
                className={`block w-full p-2.5 text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-primary-600 focus:border-primary-600  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${addClass}`}
                placeholder={placeholder}
                required={required}
            />
        </>
    )
})

export default Input