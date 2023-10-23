import React, { useEffect, useState } from "react";

const Navbar = () => {
    const [value, setValue] = useState();

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
                    <input
                    //onChange={(e) => setNumber(e.target.value)}
                    //value={number}
                    ></input>
                    <button>Insert</button>
                </div>

                <button>Random 30 values</button>
                <button>Random value</button>
            </div>
            <button className="clearButton">Clear</button>
        </nav>
    );
};

export default Navbar;
