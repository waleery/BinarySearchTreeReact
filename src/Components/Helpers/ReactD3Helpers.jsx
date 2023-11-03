export const markLiksToNodesWithoutChildern = ({ target }) => {
    if (!target.children) {

        return "link__to-leaf";
    }

    if(target.children && target.data.path === true){
        return "link__to-branch path"
    }
    return "link__to-branch";
};