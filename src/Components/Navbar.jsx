import React, { useContext, useEffect, useState } from "react";
import { NavbarContext } from "../App";
import DropdownButton from "./DropdownButton";
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

        window.addEventListener("resize", handleResize);

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <nav className="navbar" aria-label="Navigation bar">
            <div className="logo-and-buttons">
                <span className="name">{navbarFunctions.name}</span>

                <div className="insert-value" aria-label="Insert/find value section">
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
                        aria-label="Input value"
                    ></input>

                    <button
                        onClick={() => {
                            navbarFunctions.value.findValue(value);
                        }}
                        aria-label={navbarFunctions?.value?.label1}

                    >
                        {navbarFunctions?.value?.label1}
                    </button>
                </div>
                {/* function buttons */}
                {!optionsVisible ? (
                    <div className="functionButtons" aria-label="Function buttons">
                        {navbarFunctions && navbarFunctions.functions
                            ? navbarFunctions.functions.map((f, i) => (
                                  <button key={i} onClick={() => f.function()} aria-label={f?.label}>
                                      {f.label}
                                  </button>
                              ))
                            : null}
                    </div>
                ) : null}

                {/* Clear/Dropdown button */}
                <div className="specialButtonContener" aria-label="Special button container">
                    {optionsVisible ? (
                        <DropdownButton/>
                    ) : navbarFunctions && navbarFunctions.clear ? (
                        <button
                            className="clearButton"
                            onClick={() =>
                                navbarFunctions.clear.clearFunction()
                            }
                            aria-label={navbarFunctions.clear.label}
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
