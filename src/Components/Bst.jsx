import React, { useState } from 'react'
import Tree from "react-d3-tree";
import initialBstData from "../data/initialBstData.json"

const Bst = () => {
    const [bstData, setBstData] = useState(initialBstData);

    const getDynamicPathClass = ({ target }) => {
        if (!target.children) {
            return "link__to-leaf";
        }
        return "link__to-branch";
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
}

export default Bst