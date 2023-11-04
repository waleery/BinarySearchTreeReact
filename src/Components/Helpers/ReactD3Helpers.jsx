export const markLiksToNodesWithoutChildern = ({ target }) => {
    if (!target.children) {

        return "link__to-leaf";
    }

    //to mark path
    if(target.children && target.data.path === true) {
        return "link__to-branch path"
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
            <text class="rd3t-label__title" strokeWidth="1" x="20">
                {nodeDatum.name}
            </text>
        </>
    );
};
