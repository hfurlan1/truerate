// Header: the top of the page.
// It shows the app name, the subtitle and the problem statement (About).
// It receives no props, becuase its content never changes.

function Header() {
    return (
        // <header> is a semantic element: it tells the browser this is the page headder
        <header>
            <h1>TrueRate</h1>
            <p className="subtitle">See the real exchange rate before you pay.</p>

            {/* About section: the problem statement (Week 1 framework) */}
            <section className="about">
                <h2>About</h2>
                <p>
                    <strong>Who is it for:</strong> anyone who spends, earns or sends money across currencies: travelers, online shoppers, and people sending money to family abroad. It is specially for people like me, a Brazilian student living in the US who constantly thinks in reais but pays in dollars.
                </p>
                <p>
                    <strong>The problem:</strong> banks and other financial institutions rarely show the real exchange rate. They hide their fee inside a worse rate, so people cannot tell how much a conversion actually costs them.
                </p>
                <p>
                    <strong>Why it matters:</strong> a markup of few percent can go unnoticed on every purchase, transfer or payment. With the official reference rate in hand, you can compare it to your bank's offer and spot the hidden cost.
                </p>
            </section>
        </header>
    )
}

// Export the comment so App.jsx can import it
export default Header