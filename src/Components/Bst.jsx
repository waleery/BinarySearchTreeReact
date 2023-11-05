import React, { useContext, useEffect, useState } from "react";
import Tree from "react-d3-tree";
import initialBstData from "../data/initialBstData.json";
import { NavbarContext } from "../App";
import { markLiksToNodesWithoutChildern, markSearchedValue, shakeTree } from "./Helpers/ReactD3Helpers";

const Bst = () => {
    const [bstData, setBstData] = useState(initialBstData);
    const [bstDataWithoutPath, setBstDataWithouPath] = useState();
    const { setNavbarFunctions } = useContext(NavbarContext);

    useEffect(() => {
        setNavbarFunctions({
            name: "Binary Search Treee",
            value: {
                insertValue: handleInsertValue,
                label0: "Insert",
                findValue: bstDataWithoutPath ? clearPath : handleFindValue, // Używamy funkcji opakowującej
                label1: bstDataWithoutPath ? "Clear path" : "Find" 
            },
            functions: [
                {
                    function: insertRandomValues.bind(null, 50),
                    label: "Random 30 values",
                },
                {
                    function: insertRandomValues,
                    label: "Random value",
                },
            ],
            clear: {
                clearFunction: clearTree,
                label: "Clear",
            },
        });
    }, [bstData]);

    const clearPath = () => {
        setBstData(bstDataWithoutPath)
        setBstDataWithouPath()
    }

    const clearTree = () => {
        let randomValue = Math.floor(Math.random() * (100 - 1)) + 1;
        const updatedBstData = { name: randomValue, path: false, children: [{}, {}] };
        setBstData(updatedBstData);
        setBstDataWithouPath();
    };

    const handleFindValue = (valueToFind) => {
        if(!valueToFind){
            return
        }

        const bstDataCopy = (JSON.parse(JSON.stringify(bstData)))
        let isValue = findValue(parseInt(valueToFind), bstDataCopy)
        if(isValue){
            setBstDataWithouPath(JSON.parse(JSON.stringify(bstData)))
            setBstData(bstDataCopy);
        } else {
            shakeTree()
        }
    }

    const findValue = (valueToFind, root = {...bstData}) => {
        if(root.name === null || Object.keys(root).length === 0){
            return false
        }

        if(root.name === valueToFind){
            root.path = true; // Mark the node as part of the path
            root.searchedValue = true
            return true;
        }

        if( valueToFind > root.name){
            root.path = true
            return findValue(valueToFind, root.children[1])
        } else {
            root.path = true
            return findValue(valueToFind, root.children[0])
        }
    }

    const insertNode = (root, valueToInsert) => {
        if (!root || Object.keys(root).length === 0) {
            return (root = { name: valueToInsert,path: false, children: [{}, {}] });
        }

        if (root.name == valueToInsert) {
            console.log("Liczba jest juz w drzewie");
        }

        if (valueToInsert < root.name)
            root.children[0] = insertNode(root.children[0], valueToInsert);
        else if (valueToInsert > root.name)
            root.children[1] = insertNode(root.children[1], valueToInsert);

        return root;
    };

    const handleInsertValue = (valueToInsert) => {
        const updatedBstData = insertNode({ ...bstData }, parseInt(valueToInsert));
        setBstData(updatedBstData);

        if(bstDataWithoutPath){
            const updatedBstDataWithoutPath = insertNode({ ...bstDataWithoutPath }, parseInt(valueToInsert));
            setBstDataWithouPath(updatedBstDataWithoutPath);
        }
    };

    const insertRandomValues = (count = 1, maxValue = 100) => {
        for (let i = 0; i < count; i++) {
            let randomNumber = Math.floor(Math.random() * (maxValue - 1) + 1);

            handleInsertValue(randomNumber);
        }
    };

    return (
        <>
            <Tree
                data={bstData}
                orientation="vertical"
                rootNodeClassName="node__root"
                branchNodeClassName="node__branch"
                leafNodeClassName="node__leaf"
                pathClassFunc={markLiksToNodesWithoutChildern}
                renderCustomNodeElement={markSearchedValue}
                translate={{ x: 800, y: 100 }}
                collapsible={false}
                scaleExtent={{max:1, min:0.05}}
            />
        </>
    );
};

export default Bst;
