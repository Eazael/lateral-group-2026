import './../App.css'

function Layout({ children }) {
    return (
        <>
            <header>
                <h1>Task scheduler</h1>
            </header>
            <main>
                {children}
            </main>
            <footer>
                <p>Developed and presented by Christian Virreira on 22. March 2026</p>
            </footer>
        </>
    )
}

export default Layout