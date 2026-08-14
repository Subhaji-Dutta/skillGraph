type Props = {
    value: string;
    onChange: (value: string) => void;
};

export default function SearchBar({
    value,
    onChange,
}: Props) {
    return (
        <div className="search-container">

            <input
                className="search-input"
                type="text"
                placeholder="Search skills..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />

        </div>
    );
}