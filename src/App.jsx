// App.jsx is the parent. It holds all the state,
// fetches the exchange rates, and passes data down to the children.

// useState stores values that change what the user sees.
// useEffect runs code after the page renders (here: fetching data).
import { useState, useEffect } from 'react'
import Header from './components/Header.jsx'
import CurrencySelect from './components/CurrencySelect.jsx'
import SearchBar from './components/SearchBar.jsx'
import CurrencyCard from './components/CurrencyCard.jsx'
import StatusMessage from './components/StatusMessage.jsx'

// All the styling for the app
import './App.css'

// Intl.DisplayNames is built into the browser: it turns a code (like "BRL")
// into a name like "Brazilian Real", so no extra API request is needed.
const currencyNames = new Intl.DisplayNames(['en'], { type: 'currency' })

function App() {
  // STATE
  const [base, setBase] = useState('USD') // the home currency the user picked
  const [rates, setRates] = useState({}) // the rates from the API
  const [date, setDate] = useState('') // the date of those rates
  const [loading, setLoading] = useState(true) // true while the request is running
  const [error, setError] = useState('') // an error message if the request fails
  const [search, setSearch] = useState('') // what the user typed in the search box

  // SIDE EFFECT: FETCH THE RATES
  // This runs once when the page first loads, and again every time "base" changes
  // "base" is in the dependency array because the request URL uses it:
  // a new home currency means we need new rates.
  // "search" is NOT in the array: typing only filters the rates we already have,
  // so there is no reason to call the API again
  useEffect(() => {
    // useEffect cannot be async itself, so we create an async function inside it
    async function fetchRates() {
      setLoading(true) // shows the loading message
      setError('') // clear any old error

      try {
        // Ask the Frankfurter API for the latest rates for our base currency
        const response = await fetch(`https://api.frankfurter.dev/v1/latest?base=${base}`)

        // fetch only throws on network failures, so we check the HTTP status ourselves
        if (!response.ok) {
          throw new Error('Request failed with status ' + response.status)
        }

        // Turn the response body into a JavaScript object
        const data = await response.json()

        // Save the parts we need in state, which makes React re-render the page
        setRates(data.rates)
        setDate(data.date)
      } catch {
        // Any failure (no internet, server error) ends up here
        setError('Could not load exchange rates. Please check your connection and try again.')
      } finally {
        // Whether it worked or not, the request is over
        setLoading(false)
      }
    }

    fetchRates()
  }, [base])

  // DATA FOR THE DROPDOWN
  // The currencies we work with are the ones the API returned
  const currencyCodes = Object.keys(rates)
  // and the base itself
  if (!currencyCodes.includes(base)) {
    currencyCodes.push(base)
  }
  currencyCodes.sort() // sorts in alphabetical order

  // SEARCH FILTER
  // Keep only the currencies whose code or name contains the search text
  // toLowerCase() makes the search ignore capital letters.
  const searchText = search.toLowerCase()
  const filteredCodes = Object.keys(rates).filter((code) => {
    const name = currencyNames.of(code).toLowerCase()
    return code.toLowerCase().includes(searchText) || name.includes(searchText)
  })

  // CONDITIONAL RENDERING
  // Decide what to show in the results area, depending on the state
  let content
  if (loading) {
    content = <StatusMessage type="loading" text="Loading exchange rates..." />
  } else if (error) {
    content = <StatusMessage type="error" text={error} />
  } else if (filteredCodes.length === 0) {
    content = <StatusMessage type="empty" text={`No currencies match "${search}".`} />
  } else {
    // One CurrencyCard per currency, each with different prompts
    content = (
      <div className="card-list">
        {filteredCodes.map((code) => (
          <CurrencyCard
          key={code}
          code={code}
          name={currencyNames.of(code)}
          rate={rates[code]}
          base={base}
          />
        ))}
      </div>
    )
  }

  // WHAT THE PAGE LOOKS LIKE
  return (
    <div className="page">
      <Header />

      <main>
        {/* Controls: the parent's state (base, search) is passed down as props,
        together with the setter functions so the children can update it */}
        <section className="controls">
          <CurrencySelect value={base} options={currencyCodes} onChange={setBase} />
          <SearchBar value={search} onChange={setSearch} />
        </section>

        {/* Results: the title, the rate date and the content chosen above */}
        <section className="results">
          <h2>Rates for 1 {base}</h2>
          {/* Only show the date once we have one, and not when there is an error */}
          {date && !error && <p className="rate-date">Official reference rates from {date}</p>}
          {content}
        </section>
      </main>

      <footer>
        Data: European Central Bank reference rates via the Frankfurter API.
        Rates update once per working day.
      </footer>
    </div>
  )
}

export default App

