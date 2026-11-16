// main.jsx is the entry point: index.html loads this file first.

// createRoot connects React to a real element on the page
import { createRoot } from 'react-dom/client'

// App is the top-level (parent) component
import App from './App.jsx'

// Find the <div id="root"> in index.html and draw <App /> inside it
createRoot(document.getElementById('root')).render(<App />)