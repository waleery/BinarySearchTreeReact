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

    const changeThemeButton = themeMode === "dark" ? <FiSun aria-label="Switch to light mode"/> : <FiMoon aria-label="Switch to dark mode"/>;

    return (
        <NavbarContext.Provider
            value={{
                navbarFunctions,
                setNavbarFunctions,
            }}
        >
            <div className="app" data-theme={themeMode} aria-live="polite" aria-atomic="true">
                <Navbar aria-label="Navigation bar"/>
                <Bst aria-label="Binary Search Tree"/>
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
