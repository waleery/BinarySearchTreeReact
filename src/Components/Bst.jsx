import React, { useContext, useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import initialBstData from "../data/initialBstData.json";
import { NavbarContext } from "../App";
import { markLiksToNodesWithoutChildern, markSearchedValue, shakeElement } from "./Helpers/ReactD3Helpers";
import { balanceBST, findValue, insertNode } from "./Helpers/BstHelpers";

const Bst = () => {
    const [bstData, setBstData] = useState(initialBstData);
    const [bstDataWithoutPath, setBstDataWithouPath] = useState();
    const [shouldFindPath, setShouldFindPath] = useState(false)
    const [searchedValue, setSearchedValue] = useState()

    const [translate, setTranslate] = useState();

    const { setNavbarFunctions } = useContext(NavbarContext);
    const treeContainerRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            const { width, height } = treeContainerRef.current.getBoundingClientRect();
            setTranslate({ width: width / 2, height: height / 5 });
        };
        handleResize()

        window.addEventListener("resize", handleResize);

        // Usuń nasłuchiwanie zdarzenia po odmontowaniu komponentu
        return () => {
            window.removeEventListener("resize", handleResize);
        };
        
    }, []);

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
                    function: () =>insertRandomValues(30, 100),
                    label: "Random 30 values",
                },
                {
                    function: insertRandomValues,
                    label: "Random value",
                },
                {
                    function: handleBalance,
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
        setSearchedValue()
    }

    const clearTree = () => {
        let randomValue = Math.floor(Math.random() * (100 - 1)) + 1;
        const updatedBstData = {}
        setBstData(updatedBstData);
        setBstDataWithouPath();
        setSearchedValue()
    };

    const handleFindValue = (valueToFind) => {
        if(!valueToFind){
            shakeElement("input")
            return
        }

        const bstDataCopy = (JSON.parse(JSON.stringify(bstData)))
        let isValue = findValue(parseInt(valueToFind), bstDataCopy)
        if(isValue){
            if(!searchedValue){
                setBstDataWithouPath(JSON.parse(JSON.stringify(bstData)))
                setShouldFindPath(false)
            }
            setBstData(bstDataCopy);
            setSearchedValue(valueToFind)
            setShouldFindPath(false)
        } else {
            shakeElement("tree")
        }
    }


    useEffect(() => {
        if(shouldFindPath && searchedValue){
            handleFindValue(searchedValue)
        }
    }, [bstData]);

    const handleBalance = () => {
        setBstData(balanceBST({...bstData}))
        setShouldFindPath(true)

        if(searchedValue){
            setBstDataWithouPath(balanceBST({...bstDataWithoutPath}))
        }
    }

    

    

    const handleInsertValue = (valueToInsert) => {
        if(!valueToInsert){
            shakeElement("input")
            return
        }
        setBstData(prevBstData => {
            const updatedBstData = insertNode({...prevBstData}, parseInt(valueToInsert));
            return updatedBstData;
        });

        if(searchedValue){
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
        <div style={{height:"100%"}} ref={treeContainerRef} aria-label="Binary search tree">
            {translate  ?
            <Tree
                data={bstData}
                orientation="vertical"
                rootNodeClassName="node__root"
                branchNodeClassName="node__branch"
                leafNodeClassName="node__leaf"
                pathClassFunc={markLiksToNodesWithoutChildern}
                renderCustomNodeElement={markSearchedValue}
                translate={{ x: translate.width, y: translate.height }}
                collapsible={false}
                scaleExtent={{max:1.6, min:0.05}}
            />
            :null}
        </div>
    );
};

export default Bst;
