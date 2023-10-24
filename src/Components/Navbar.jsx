import React, { useContext, useEffect, useState } from "react";
import { NavbarContext } from "../App";

const Navbar = () => {
    const { navbarFunctions, setNavbarFunctions } = useContext(NavbarContext);
    const [value, setValue] = useState('');

    useEffect(() => {
        document.querySelector("input").addEventListener("input", function () {
            this.style.width = this.value.length + "ch";
        });
    }, []);

    return (
        <nav className="navbar">
            <div className="logo-and-buttons">
                <span className="name">Binary Search Tree </span>

                <div className="insert-value">
                    <input onChange={(e) => setValue(e.target.value)} value={value}></input>
                    <button
                        onClick={() => {
                            if(value != ""){
                                navbarFunctions.insertValue(value)
                                setValue("")
                            }
                        }}
                    >
                        Insert
                    </button>
                </div>

                <button onClick={() => navbarFunctions.insertRandomValues(30)}>Random 30 values</button>
                <button onClick={() => navbarFunctions.insertRandomValues()}>Random value</button>
            </div>
            <button className="clearButton">Clear</button>
        </nav>
    );
};

export default Navbar;
