// CurrencySelect: the dropdown where the user picks their home currency.
// Props (all come from App, the parent):
//  value -> the currency currently selected (App's "base state")
//  options -> the list of currency codes to show
//  onChange -> a function to call when the user picks a new currency

function CurrencySelect({ value, options, onChange }) {
    return (
    // Wrapping the <select> in a <label> links the text to the dropdown
    <label>
        Your currency
        {/* Controlled input: React decides what is selected (value), and every change is reported back to the parent (onChange) */}
        <select value={value} onChange={(event) => onChange(event.target.value)}>
            {/* Turn each code in the list into an <option>. "key" helps React tell the options apart */}
            {options.map((code) => (
                <option key={code} value={code}>
                    {code}
                </option>
                ))}
        </select>
    </label>
    )
}

export default CurrencySelect