// CurrencyCard: one card showing the rate for a single currency.
// This component is reused once per currency, each time with different props.
// Props:
//  code -> the currency code (ex.: BRL, USD)
//  name -> the currency's full name (ex.: Brazilian Real)
//  rate -> how many units of this currency 1 unit of the base buys
//  base -> the home currency the user picked (ex.: USD)

function CurrencyCard({ code, name, rate, base }) {
    return (
        // <article> is a semantic element for a self-contained piece of content
        <article className="card">
            <h3>{code}</h3>
            <p className="card-name">{name}</p>
            <p className="card-rate">
                1 {base} = {rate} {code}
            </p>
        </article>
    )
}

export default CurrencyCard