import React, { forwardRef, useState } from "react"

const InputText = forwardRef(function ({ id, title, placeholder, defaultValue = "", required = false, addClass = "" }, ref) {

    const [inputValue, setinputValue] = useState(defaultValue)

    const handleOnChange = () => { setinputValue(ref.current.value) }

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
                type="text"
                name={id}
                id={id}
                value={inputValue}
                className={`block w-full p-2.5 text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900
                ${(required && ref.current.value === "") ? "border-red-500 dark:border-red-500 focus:outline-none focus:ring focus:ring-red-100" : "focus:outline-none focus:ring focus:border-blue-500"}
                ${addClass}`}
                placeholder={placeholder}
                required={required}
                onChange={handleOnChange}
            //focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500

            />
        </>
    )
})

export default InputText