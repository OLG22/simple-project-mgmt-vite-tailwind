import { render } from "react-dom"


export default function Checkbox({ disabled, defaultChecked, id, label, missingMadatory, color }) {

    return (
        <div className="w-full flex">
            <input
                className="relative appearance-none shrink-0 w-4 h-4 border-2 border-blue-200 rounded-sm mt-1 bg-white
            focus:outline-none focus:ring-offset-0 focus:ring-1 focus:ring-blue-100
            checked:bg-blue-500 checked:border-0
            disabled:border-steel-400 disabled:bg-steel-400"
                type="checkbox"
                //{...props}
                disabled={disabled}
                defaultChecked={defaultChecked}
                id={id}
                label={label}
            />
            <svg
                className="absolute w-4 h-4 pointer-events-none hidden peer-checked:block stroke-white mt-1 outline-none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <label htmlFor={id} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                {label}
            </label>
        </div>
    )
}