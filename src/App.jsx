import { createContext, useState } from "react";
import "./App.scss";
import Navbar from "./Components/Navbar";
import Bst from "./Components/Bst";

export const NavbarContext = createContext(null);

function App() {
    const [navbarFunctions, setNavbarFunctions] = useState({});

    return (
        <NavbarContext.Provider
            value={{
                navbarFunctions,
                setNavbarFunctions,
            }}
        >
            <Navbar />
            <Bst />
        </NavbarContext.Provider>
    );
}

export default App;
