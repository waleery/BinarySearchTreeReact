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
                    function: () =>insertRandomValues(20, 100),
                    label: "Random 30 values",
                },
                {
                    function: insertRandomValues,
                    label: "Random value",
                },
                {
                    function: balanceBST,
                    label: "Balance",
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

    function balanceBST() {
        
        const values = inOrderTraversal({...bstData});
        
        console.log(values)
        // Posortuj tablicę
        values.sort((a, b) => a - b);
    
        console.log(values)

        const balanced = balanceBstFromArray(values)
        console.log(balanced)

        setBstData(balanced)
    }
    
    function inOrderTraversal(root) {
        const values = [];
        
        function traverse(node) {
            if (node) {
                if(Object.keys(node.children[0]).length !== 0)
                    traverse(node.children[0]);

                values.push(node.name);

                if(Object.keys(node.children[1]).length !== 0)
                    traverse(node.children[1]);
            }
        }
        traverse(root);
        return values;
    }
    
    const balanceBstFromArray = (sortedValues) => {
        if(sortedValues.length === 0){
            return {}
        }

        const middleIndex = Math.floor(sortedValues.length / 2)
        const rootValue = sortedValues[middleIndex]
        const leftValues = sortedValues.slice(0, middleIndex)
        const rightValues = sortedValues.slice(middleIndex+1)
        
        const root = {
            name: rootValue,
            children: [
                balanceBstFromArray(leftValues),
                balanceBstFromArray(rightValues)
            ]
        }
        
        return root
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
