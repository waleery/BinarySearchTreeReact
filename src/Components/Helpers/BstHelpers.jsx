import { NavbarContext } from "../../App";

export const findValue = (valueToFind, root = {...bstData}) => {
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

export const insertNode = (root, valueToInsert) => {
    if (!root || Object.keys(root).length === 0) {
        return { name: valueToInsert,path: false, children: [{}, {}] };
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

export function balanceBST(bst) {
        
    const values = inOrderTraversal(bst);
    
    console.log(values)
    // Posortuj tablicę
    values.sort((a, b) => a - b);

    console.log(values)

    const balanced = balanceBstFromArray(values)
    console.log(balanced)

    return balanced
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