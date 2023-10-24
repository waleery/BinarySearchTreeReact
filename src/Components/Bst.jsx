import React, { useState } from "react";
import Tree from "react-d3-tree";
import initialBstData from "../data/initialBstData.json";

const Bst = () => {
    const [bstData, setBstData] = useState(initialBstData);

    const getDynamicPathClass = ({ target }) => {
        if (!target.children) {
            return "link__to-leaf";
        }
        return "link__to-branch";
    };

    const insertNode = (root, valueToInsert) => {
        if (!root || Object.keys(root).length === 0) {
            return (root = { name: valueToInsert, children: [{}, {}] });
        }

        if (root.name == valueToInsert) {
            console.log("Liczba jest juz w drzewie");
        }

        if (valueToInsert < root.name)
            root.children[0] = insertNode(root.children[0], valueToInsert);
        else if (valueToInsert > root.name)
            root.children[1] = insertNode(root.children[1], valueToInsert);

        return root
    };

    return (
        <>
            <Tree
                data={bstData}
                orientation="vertical"
                rootNodeClassName="node__root"
                branchNodeClassName="node__branch"
                leafNodeClassName="node__leaf"
                pathClassFunc={getDynamicPathClass}
                translate={{ x: 800, y: 100 }}
            />
        </>
    );
};

export default Bst;
