export const markLiksToNodesWithoutChildern = ({ target }) => {
    if (!target.children) {
        return "link__to-leaf";
    }

    //to mark path
    if (target.children && target.data.path === true) {
        return "link__to-branch path";
    }
    return "link__to-branch";
};

export const markSearchedValue = ({ nodeDatum }) => {
    if (nodeDatum.searchedValue) {
        return (
            <>
                <circle r="15" fill="red" className="searchedValue"/>
                <text className="rd3t-label__title" strokeWidth="1" x="25">
                    {nodeDatum.name}
                </text>
            </>
        );
    } else if(nodeDatum.path){
        return (
            <>
                <circle r="15" className="pointsOnPath" fill="sandybrown" />
                <text className="rd3t-label__title" strokeWidth="1" x="25">
                    {nodeDatum.name}
                </text>
            </>
        );
    }

    return (
        <>
            <circle r="15" />
            <text className="rd3t-label__title" strokeWidth="1" x="20">
                {nodeDatum.name}
            </text>
        </>
    );
};

export const shakeElement = (element) => {
    
    const elementToShake = document.querySelector(element=== "tree" ? ".rd3t-tree-container" : element === "input" ? ".inputValue" : null);

    if (elementToShake) {
        if (document.querySelector(".shake")) {
            elementToShake.classList.remove("shake");
            elementToShake.classList.add("shakeAgain");

            setTimeout(() => {
                elementToShake.classList.remove("shakeAgain");
            }, 500);
        } else {
            elementToShake.classList.remove("shakeAgain");
            elementToShake.classList.add("shake");

            setTimeout(() => {
                elementToShake.classList.remove("shake");
            }, 500);
        }
    }
};
