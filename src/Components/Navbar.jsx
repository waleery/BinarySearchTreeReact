import React, { useContext, useEffect, useState } from "react";
import { CgMore } from "react-icons/cg"; // Import ikonki, na przykład z react-icons
import { NavbarContext } from "../App";

const Navbar = () => {
    const { navbarFunctions, setNavbarFunctions } = useContext(NavbarContext);
    const [value, setValue] = useState("");
    const [optionsVisible, setOptionsVisible] = useState(false);

    useEffect(() => {
        document.querySelector("input").addEventListener("input", function () {
            this.style.width = this.value.length + "ch";
        });

        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setOptionsVisible(true);
            } else {
                setOptionsVisible(false);
            }
        };

        // Dodaj nasłuchiwanie na zdarzenie zmiany rozmiaru ekranu
        window.addEventListener("resize", handleResize);

        // Wywołaj funkcję handleResize na początku, aby ustawić stan na początku
        handleResize();

        // Usuń nasłuchiwanie po zakończeniu efektu ubocznego
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <nav className="navbar">
            <div className="logo-and-buttons">
                <span className="name">{navbarFunctions.name}</span>

                <div className="insert-value">
                    <button
                        onClick={() => {
                            navbarFunctions.value.insertValue(value);
                            setValue("");
                        }}
                    >
                        {navbarFunctions?.value?.label0}
                    </button>
                    <input
                        className="inputValue"
                        type="number"
                        onChange={(e) => setValue(parseInt(e.target.value))}
                        value={value}
                    ></input>

                    <button
                        onClick={() => {
                            navbarFunctions.value.findValue(value);
                        }}
                    >
                        {navbarFunctions?.value?.label1}
                    </button>
                </div>
                {!optionsVisible ? 
                <div className="functionButtons">
                    {navbarFunctions && navbarFunctions.functions
                        ? navbarFunctions.functions.map((f, i) => (
                              <button key={i} onClick={() => f.function()}>
                                  {f.label}
                              </button>
                          ))
                        : null}
                </div>
                : null}   
                <div className="specialButtonContener">
                    {optionsVisible ? (
                        <button className="optionsButton">
                            <CgMore />
                        </button>
                    ) : navbarFunctions && navbarFunctions.clear ? (
                        <button
                            className="clearButton"
                            onClick={() =>
                                navbarFunctions.clear.clearFunction()
                            }
                        >
                            {navbarFunctions.clear.label}
                        </button>
                    ) : null}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
