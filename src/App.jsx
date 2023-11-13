import { createContext, useEffect, useState } from "react";
import "./App.scss";
import Navbar from "./Components/Navbar";
import Bst from "./Components/Bst";

import { FiSun, FiMoon } from "react-icons/fi";

export const NavbarContext = createContext(null);

function App() {
    const [navbarFunctions, setNavbarFunctions] = useState({});
    const [themeMode, setThemeMode] = useState(
        window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"
    );
    console.log(themeMode)

    useEffect(function handleThemeChangeBySystem () {
        const colorSchemeMediaQuery = window.matchMedia("(prefers-color-scheme: light)");
        
        const handleChangeTheme = (event) => {
            setThemeMode(event.matches ? "light" : "dark");
          };
      
        colorSchemeMediaQuery.addEventListener("change", handleChangeTheme);

        return () => {
            colorSchemeMediaQuery.removeEventListener('change', handleChangeTheme);
        };
      }, []);

    const changeThemeButton = themeMode === "dark" ? <FiSun /> : <FiMoon />;

    return (
        <NavbarContext.Provider
            value={{
                navbarFunctions,
                setNavbarFunctions,
            }}
        >
            <div className="app" data-theme={themeMode}>
                <Navbar />
                <Bst />
                <footer className="switchMode">
                    <button onClick={() => themeMode === "light" ? setThemeMode("dark") : setThemeMode("light")}>
                        {changeThemeButton}
                    </button>
                </footer>
            </div>
        </NavbarContext.Provider>
    );
}

export default App;
