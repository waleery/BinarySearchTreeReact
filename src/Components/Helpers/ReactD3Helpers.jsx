export const markLiksToNodesWithoutChildern = ({ target }) => {
    if (!target.children) {
        return "link__to-leaf";
    }
    return "link__to-branch";
};