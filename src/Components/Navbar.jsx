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
                <span className="name">{navbarFunctions.name}</span>

                <div className="insert-value">
                    <input onChange={(e) => setValue(e.target.value)} value={value}></input>
                    <button
                        onClick={() => {
                            if(value != ""){
                                navbarFunctions.insertValue.insertFunction(value)
                                setValue("")
                            }
                        }}
                    >
                        Insert
                    </button>
                </div>
                {navbarFunctions && navbarFunctions.functions ? navbarFunctions.functions.map(f => (
                    <button onClick={() =>f.function()}>{f.label}</button>
                )) : null }

            </div>
            {navbarFunctions && navbarFunctions.clear ? 
            <button className="clearButton" onClick={() => navbarFunctions.clear.clearFunction()}>{navbarFunctions.clear.label}</button> : null}
        </nav>
    );
};

export default Navbar;
