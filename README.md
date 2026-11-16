# TrueRate

**See the real exchange rate before you pay.**

Live app: https://truerate-teal.vercel.app

TrueRate is a single-page React app that shows the official daily reference
exchange rates for about 30 currencies against a home currency you pick.

## Problem statement

- **Who it is for:** anyone who spends, earns or sends money across currencies:
  travelers, online shoppers, and people sending money to family abroad.
  It is especially for people like me, a Brazilian student living in the US
  who thinks in reais but pays in dollars.
- **The problem:** banks and other financial institutions rarely show the real
  exchange rate. They hide their fee inside a worse rate, so people cannot tell
  how much a conversion actually costs them.
- **Why it matters:** a markup of a few percent can go unnoticed on every
  purchase, transfer or payment. With the official reference rate in hand,
  you can compare it to your bank's offer and spot the hidden cost.

## Features

- Pick your home currency and see what 1 unit of it buys in every other currency
- Search by currency code or name (for example "BRL" or "real")
- Loading, error and "no results" messages
- Shows the date of the rates, since they update once per working day

## Data source

Rates come from the [Frankfurter API](https://frankfurter.dev), which serves
the European Central Bank's official reference rates. It is free and needs
no API key, so there are no secrets in this repository.

## How it is built

- React + Vite, deployed on Vercel from this GitHub repository
- `App.jsx` (parent) holds the state and fetches the rates in a `useEffect`
  that re-runs whenever the home currency changes
- Components in `src/components/`:
  - `Header`: app name, subtitle and the problem statement
  - `CurrencySelect`: dropdown for the home currency
  - `SearchBar`: search box that filters the results
  - `CurrencyCard`: one card per currency
  - `StatusMessage`: loading, error and empty messages

## Run it locally

npm install
npm run dev