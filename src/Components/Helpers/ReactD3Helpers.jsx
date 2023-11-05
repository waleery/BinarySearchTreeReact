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
                <circle r="20" fill="red" />
                <text strokeWidth="1" x="25">
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

export const shakeTree = () => {
    const treeContainer = document.querySelector(".rd3t-tree-container");

    if (treeContainer) {
        if (document.querySelector(".shake")) {
            treeContainer.classList.remove("shake");
            treeContainer.classList.add("shakeAgain");

            setTimeout(() => {
                treeContainer.classList.remove("shakeAgain");
            }, 500);
        } else {
            treeContainer.classList.remove("shakeAgain");
            treeContainer.classList.add("shake");

            setTimeout(() => {
                treeContainer.classList.remove("shake");
            }, 500);
        }
    }
};
