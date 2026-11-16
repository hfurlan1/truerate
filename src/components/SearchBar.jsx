// SearchBar: the text box that filters the list of currencies.
// Props (both come from App, the parent):
//  value -> what is currently typed (App's "search" state)
//  onChange -> a function to call every time the user types

function SearchBar({ value, onChange }) {
    return (
        <label>
            Search
            {/* Controlled input: the text shown always comes from state (value),
            and each keystroke sends the new text back up (onChange) */}
            <input
            type="search"
            placeholder="Code or name, e.g. BRL or real"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            />
        </label>
    )
}

export default SearchBar