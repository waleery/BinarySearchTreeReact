export const markLiksToNodesWithoutChildern = ({ target }) => {
    if (!target.children) {

        return "link__to-leaf";
    }
    console.log(target.data.path, target.data.name)

    if(target.children && target.data.path === true){
        console.log(target.data.path, target.data.name)
        return "link__to-branch path"
    }
    return "link__to-branch";
};