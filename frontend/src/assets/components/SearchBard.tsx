import { useState } from "react";

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export default function SearchBar({
    value,
    onChange,
}: Props) {

    const [focused, setFocused] = useState(false);

    const clearSearch = () => {
        onChange("");
    };

    return (
        <div
            className={`search-container ${
                focused ? "search-container-focused" : ""
            }`}
        >

            {/* Search icon */}

            <span
                className="search-icon"
                aria-hidden="true"
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle
                        cx="11"
                        cy="11"
                        r="7"
                    />

                    <path
                        d="m20 20-3.5-3.5"
                    />
                </svg>
            </span>


            {/* Search input */}

            <input
  id="skill-search"
  name="skill-search"
  className="search-input"
  type="text"
  value={value}
  placeholder="Search skills, technologies or categories..."
  onChange={(e) => onChange(e.target.value)}
  onFocus={() => setFocused(true)}
  onBlur={() => setFocused(false)}
  aria-label="Search skills"
  autoComplete="off"
/>


            {/* Clear button */}

            {value && (

                <button
                    type="button"
                    className="search-clear-button"
                    onClick={clearSearch}
                    aria-label="Clear search"
                    title="Clear search"
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </button>

            )}

        </div>
    );
}
