import React, { useContext } from "react";
import { NavbarContext } from "../App";
import { Dropdown } from "antd";
import { CgMore } from "react-icons/cg"; // Import ikonki, na przykład z react-icons

const DropdownButton = () => {
    const { navbarFunctions, setNavbarFunctions } = useContext(NavbarContext);

    const navButtons =
        navbarFunctions && navbarFunctions.functions
            ? navbarFunctions.functions.map((f, i) => ({
                  key: i,
                  label: (
                      <label key={i} onClick={() => f.function()}>
                          {f.label}
                      </label>
                  ),
              }))
            : null;

    const clearButton =
        navbarFunctions && navbarFunctions.functions && navbarFunctions.clear
            ? [
                  {
                      type: "divider",
                  },
                  {
                      key: navbarFunctions.functions.length,
                      label: (
                          <label
                              key={navbarFunctions.functions.length}
                              onClick={() =>
                                  navbarFunctions.clear.clearFunction()
                              }
                          >
                              {navbarFunctions.clear.label}
                          </label>
                      ),
                  },
              ]
            : null;

    const items = navButtons.concat(clearButton);
    
    return (
        <Dropdown menu={{ items }} placement="bottomRight">
            <button className="optionsButton" aria-label="More functions">
                <CgMore />
            </button>
        </Dropdown>
    );
};

export default DropdownButton;
